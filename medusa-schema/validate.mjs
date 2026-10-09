#!/usr/bin/env node
/* Validate a JSON-LD file against the rules in CLAUDE.md.
   Usage: node validate.mjs path/to/file.jsonld [more.jsonld ...]
   Needs schemaorg.jsonld beside it: curl -sL https://schema.org/version/latest/schemaorg-current-https.jsonld -o schemaorg.jsonld */
import { readFileSync, existsSync } from 'node:fs';
const SITE = 'https://medusaautodetailing.co.uk';
const files = process.argv.slice(2);
if (!files.length) { console.error('usage: node validate.mjs <file.jsonld> ...'); process.exit(2); }

let V = null;
if (existsSync('schemaorg.jsonld')) {
  const doc = JSON.parse(readFileSync('schemaorg.jsonld', 'utf8'));
  /* ids are CURIEs (schema:address), and the graph carries external terms too */
  const short = s => String(s || '').replace(/^https?:\/\/schema\.org\//, '').replace(/^schema:/, '');
  const isS = s => { const t = String(s || ''); return t.startsWith('schema:') || t.startsWith('http'); };
  V = new Map();
  (doc['@graph'] || []).forEach(n => { if (isS(n['@id'])) V.set(short(n['@id']), n); });
  if (V.size < 2000) { console.error('schemaorg.jsonld did not parse: ' + V.size + ' terms'); process.exit(2); }
} else console.error('note: schemaorg.jsonld not found, skipping property validation\n');

const arr = x => x === undefined ? [] : (Array.isArray(x) ? x : [x]);
const short = s => String(s || '').replace(/^https?:\/\/schema\.org\//, '').replace(/^schema:/, '');
const supers = (t, seen = new Set()) => {
  if (seen.has(t) || !V) return seen;
  seen.add(t);
  const n = V.get(t);
  if (n) arr(n['rdfs:subClassOf']).forEach(x => supers(short(x['@id'] || x), seen));
  return seen;
};
let bad = 0;
for (const f of files) {
  console.log('\n=== ' + f + ' ===');
  const ck = (t, ok, d) => { console.log((ok ? '  PASS  ' : '  FAIL  ') + t + (d ? '   ' + d : '')); if (!ok) bad++; };
  let d;
  try { d = JSON.parse(readFileSync(f, 'utf8')); } catch (e) { ck('parses', false, e.message); continue; }

  /* 1. envelope FIRST */
  ck('@context is exactly https://schema.org', d['@context'] === 'https://schema.org', JSON.stringify(d['@context']));
  ck('@graph is a non-empty array', Array.isArray(d['@graph']) && d['@graph'].length > 0);
  ck('not a bare array', !Array.isArray(d), 'a bare array resolves nothing');
  ck('no unexpected top-level keys', Object.keys(d).every(k => k === '@context' || k === '@graph'), Object.keys(d).join(', '));
  if (!Array.isArray(d['@graph'])) continue;

  /* 2. assert the walk found something */
  let nodes = 0;
  const defined = new Set(), refs = [], pairs = [];
  const walk = n => {
    if (n === null || typeof n !== 'object') return;
    if (Array.isArray(n)) return n.forEach(walk);
    nodes++;
    const keys = Object.keys(n);
    if (n['@id']) {
      const pointerOnly = keys.filter(k => k !== '@id' && k !== '@type').length === 0;
      (pointerOnly ? refs : [...defined]) && (pointerOnly ? refs.push(n['@id']) : defined.add(n['@id']));
    }
    arr(n['@type']).forEach(ty => keys.filter(k => !k.startsWith('@')).forEach(k => pairs.push([String(ty), k])));
    Object.entries(n).forEach(([k, v]) => { if (k !== '@type' && k !== '@context') walk(v); });
  };
  d['@graph'].forEach(walk);
  ck('the walk found nodes', nodes > 0, nodes + ' nodes');

  /* 3. pointers resolve on this page */
  const dangling = [...new Set(refs)].filter(r => !defined.has(r));
  ck('every bare pointer resolves on this page', dangling.length === 0, dangling.join(' ') || refs.length + ' pointers');

  /* 4. properties valid on their type */
  if (V) {
    const invalid = [];
    [...new Set(pairs.map(p => p.join('.')))].forEach(key => {
      const [ty, prop] = key.split('.');
      if (!V.get(ty)) return invalid.push(key + ' (no such type)');
      const pn = V.get(prop);
      if (!pn) return invalid.push(key + ' (no such property)');
      const dom = arr(pn['schema:domainIncludes']).map(x => short(x['@id'] || x));
      const chain = supers(ty);
      if (!dom.some(x => chain.has(x))) invalid.push(key + ' (domain: ' + dom.slice(0, 4).join(', ') + ')');
    });
    ck('every property valid on its type', invalid.length === 0, invalid.join(' | ') || pairs.length + ' uses checked');
  }

  /* 5. the project-specific rules */
  const s = JSON.stringify(d);
  ck('no retired #organization', !s.includes('#organization'));
  ck('no bare-root @id', !d['@graph'].some(n => n['@id'] === SITE));
  ck('providerMobility only on a Service', d['@graph'].every(n =>
    !(n.providerMobility && String(n['@type']) !== 'Service')), 'domainIncludes is Service only');
  ck('no Service isPartOf Service', !/"isPartOf":\s*\{\s*"@id":\s*"[^"]*#service"/.test(s), 'use isRelatedTo');
  ck('no Product node', !/"@type":\s*"Product"/.test(s), 'the client sells services, not products');
  ck('no AggregateRating or Review on the business', !/aggregateRating|"review"\s*:/i.test(s));
  /* offers is an array wherever a page sells the service at more than one level
     (three motorcycle valets, four vomit-cleaning sizes, three ozone tiers), and
     an array has no .price, so reading one off it failed every priced page it
     was meant to pass. Check each Offer instead. */
  const priced = o => !!o && !!(o.price || o.lowPrice ||
    (o.priceSpecification && (o.priceSpecification.price || o.priceSpecification.lowPrice)));
  ck('no Offer without a price', !d['@graph'].some(n => {
    if (!n.offers) return false;
    return Array.isArray(n.offers) ? !n.offers.every(priced) : !priced(n.offers);
  }), 'omit offers entirely rather than emitting an empty one');
}
console.log('\n' + (bad ? bad + ' CHECKS FAILED' : 'all checks passed'));
process.exit(bad ? 1 : 0);
