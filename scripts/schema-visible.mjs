/**
 * Does every page SHOW what its JSON-LD says?
 *
 * Ahrefs validates the markup; it does not ask whether the page displays it,
 * and Google's guidelines say not to mark up what readers cannot see. This
 * crawls the sitemap on a running server, drops <script>/<style> first (Next
 * repeats the whole page inside script payloads, which would make every claim
 * look supported) and compares each claim with what is left:
 *
 *   - the BreadcrumbList against the rendered breadcrumb trail, name for name
 *   - Article headline, byline, dates against the post header
 *   - every Offer's price, every FAQ question and answer
 *   - OfferCatalog entries and Service names
 *   - the business node's address, areas and email (homepage)
 *   - a hub's Place and the area that contains it
 *
 * Plus the three text faults the content-gap list found: an h1 with a capital
 * after an apostrophe, the American "Neighborhood", and a page without
 * exactly one <h1>.
 *
 * Identifiers and classifications (@id, url, sameAs, geo, serviceType,
 * providerMobility, isRelatedTo) are not visible-content claims and are not
 * part of the test.
 *
 *   BASE=http://localhost:3000 node scripts/schema-visible.mjs
 */
import * as cheerio from 'cheerio';

const BASE = process.env.BASE || 'http://localhost:3000';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const longDate = (iso) => {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};
/* Quotes, dashes and nbsp unified, case and all whitespace dropped: a claim
   passes when its letters appear in order, however the page spaces them. */
const squash = (s) =>
  s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/ /g, ' ')
    .toLowerCase()
    .replace(/\s+/g, '');
const strip = (html) => html.replace(/<[^>]+>/g, ' ');

const failures = new Map();
const notes = new Map();
const add = (into) => (check, url, detail) => {
  if (!into.has(check)) into.set(check, []);
  into.get(check).push(`${url}  ${detail}`);
};
const fail = add(failures);
/* Worth a look, not a failure: a hand-built page's Service description is its
   meta description, which summarises the page rather than quoting it, so a
   sentence not found word for word is expected. A specific claim in one is
   what the content-gap list's B6 caught — read these when adding a page. */
const note = add(notes);

/* A page the source gives no h1 and writing one would invent copy (PROJECT.md
   §8.1); `verify.mjs` exempts it by name for the same reason. */
const H1_BY_DESIGN = new Set(['/commercial-valeting/aircraft-cleaning']);

const nodes = (graph, type) => graph.filter((n) => [].concat(n['@type']).includes(type));
function* deep(v) {
  if (Array.isArray(v)) for (const x of v) yield* deep(x);
  else if (v && typeof v === 'object') {
    yield v;
    for (const x of Object.values(v)) yield* deep(x);
  }
}

async function check(path) {
  const res = await fetch(BASE + path);
  if (res.status !== 200) return fail('http', path, String(res.status));
  const $ = cheerio.load(await res.text());

  const graphs = $('script[type="application/ld+json"]')
    .toArray()
    .map((el) => JSON.parse($(el).text()));
  if (graphs.length !== 1) fail('one-graph', path, `${graphs.length} JSON-LD blocks`);
  const graph = graphs.flatMap((g) => g['@graph'] ?? []);
  /* JSON-LD strings are not HTML: a literal &amp; or &#038; reaches a parser
     as those characters. */
  for (const n of deep(graph)) {
    for (const v of Object.values(n)) {
      if (typeof v === 'string' && /&(#d+|#x[0-9a-f]+|amp|nbsp|quot|apos|lt|gt);/i.test(v)) {
        fail('entity-in-json-ld', path, v.slice(0, 80));
      }
    }
  }

  const trail = $('nav[aria-label="Breadcrumb"] li')
    .toArray()
    .map((li) => $(li).text().replace(/›/g, '').trim());
  const h1s = $('h1');
  const h1 = h1s.first().text().replace(/ /g, ' ').trim();
  $('script, style, noscript, template').remove();
  const text = squash($('body').text());
  const has = (s) => text.includes(squash(String(s)));

  if (h1s.length !== 1 && !H1_BY_DESIGN.has(path)) fail('h1-count', path, `${h1s.length} <h1>`);
  if (/[’']S\b/.test(h1)) fail('h1-capital-s', path, h1);
  if (/neighborhood/i.test($('body').text())) {
    fail('american-spelling', path, 'Neighborhood');
  }

  /* A1: the schema's trail and the page's trail are one list. */
  const crumbs = nodes(graph, 'BreadcrumbList')[0];
  if (crumbs) {
    const names = crumbs.itemListElement.map((i) => i.name);
    if (JSON.stringify(names.map(squash)) !== JSON.stringify(trail.map(squash))) {
      fail('breadcrumb', path, `schema [${names.join(' > ')}] page [${trail.join(' > ')}]`);
    }
  } else if (trail.length) fail('breadcrumb', path, 'a visible trail with no BreadcrumbList');

  for (const a of nodes(graph, 'Article')) {
    if (squash(a.headline) !== squash(h1)) fail('article-headline', path, `"${a.headline}" vs h1 "${h1}"`);
    if (a.author?.name && !has(`By ${a.author.name}`)) fail('article-byline', path, a.author.name);
    if (a.datePublished && !has(longDate(a.datePublished))) fail('article-date', path, a.datePublished);
    if (a.dateModified && a.dateModified !== a.datePublished && !has(`Updated ${longDate(a.dateModified)}`)) {
      fail('article-updated', path, a.dateModified);
    }
  }

  for (const n of deep(graph)) {
    for (const k of ['price', 'minPrice']) {
      if (n[k] !== undefined && n['@type'] !== 'Question' && !has(`£${Number(n[k])}`)) {
        fail('price', path, `£${n[k]}`);
      }
    }
  }

  for (const faq of nodes(graph, 'FAQPage')) {
    for (const q of faq.mainEntity) {
      if (!has(q.name)) fail('faq-question', path, q.name.slice(0, 70));
      if (!has(strip(q.acceptedAnswer.text))) fail('faq-answer', path, q.name.slice(0, 70));
    }
  }

  for (const n of deep(graph)) {
    if (n['@type'] === 'OfferCatalog') {
      for (const item of n.itemListElement ?? []) {
        const name = item.itemOffered?.name;
        if (name && !has(name)) fail('catalogue-name', path, name);
      }
      if (n.name && !has(n.name)) fail('catalogue-heading', path, n.name);
    }
  }

  for (const s of nodes(graph, 'Service')) {
    if (s.name && !has(s.name)) fail('service-name', path, s.name);
    for (const sentence of (s.description ?? '').split(/(?<=[.!?])\s+/)) {
      if (sentence.length > 20 && !has(sentence)) note('service-description', path, sentence.slice(0, 80));
    }
    if (s.areaServed?.name && !has(s.areaServed.name)) fail('service-area', path, s.areaServed.name);
  }

  for (const t of ['Place', 'AdministrativeArea']) {
    for (const p of nodes(graph, t)) {
      if (p.name && !has(p.name)) fail('area-name', path, p.name);
      /* "Greater London" is how the schema names it and "London" is what the
         fifteen boroughs' pages say, which is the same place to a reader. */
      const parent = p.containedInPlace?.name;
      if (parent && !has(parent) && !(parent === 'Greater London' && has('London'))) {
        fail('area-parent', path, `${p.name} in ${parent}`);
      }
    }
  }

  for (const b of nodes(graph, 'AutoWash')) {
    if (b.address) {
      for (const f of ['streetAddress', 'postalCode', 'addressLocality']) {
        if (b.address[f] && !has(b.address[f])) fail('business-address', path, `${f}: ${b.address[f]}`);
      }
    }
    for (const a of b.areaServed ?? []) if (!has(a.name)) fail('business-area', path, a.name);
    if (b.contactPoint?.email && !has(b.contactPoint.email)) fail('business-email', path, b.contactPoint.email);
    if (b.priceRange) fail('business-price-range', path, b.priceRange);
  }
}

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
console.log(`schema-visible: ${paths.length} pages from ${BASE}/sitemap.xml`);

const queue = [...paths];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const p = queue.shift();
      try {
        await check(p);
      } catch (e) {
        fail('crash', p, String(e.message ?? e));
      }
    }
  }),
);

for (const [name, list] of [...notes].sort()) {
  console.log(`\nnote ${name}: ${list.length} (not a failure)`);
}

if (!failures.size) {
  console.log('\nALL CLEAN');
} else {
  for (const [name, list] of [...failures].sort()) {
    console.log(`\n${name}: ${list.length}`);
    for (const line of list.slice(0, 6)) console.log('  ' + line);
    if (list.length > 6) console.log(`  … ${list.length - 6} more`);
  }
  process.exitCode = 1;
}
