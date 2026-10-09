/* One builder per page type. Each returns a complete JSON-LD document for that page:
   one <script type="application/ld+json">, one @context, one @graph.

   The rule the whole thing rests on: a node is DEFINED once, on the page that page is
   about, and REFERENCED from every other page that mentions it, written OUT IN FULL.
   A bare { "@id": "..." } only resolves if the node it names is on the SAME page, so
   cross-page references must carry enough properties to stand alone.

   Nothing here invents a value. Where a value needs a human, the builder omits the
   property rather than guessing: see businessRef, offerFor and articleAbout.           */

import { id, SITE } from './ids';
import business from './data/business.json';
import areas from './data/areas.json';
import categories from './data/categories.json';
import packages from './data/packages.json';

type Json = Record<string, unknown>;
const doc = (graph: Json[]): Json => ({ '@context': 'https://schema.org', '@graph': graph });

const logo = (): Json => ({
  '@type': 'ImageObject', '@id': id.logo(), inLanguage: 'en-GB',
  url: `${SITE}/assets/2021/12/4-e1639638656209.webp`,
  contentUrl: `${SITE}/assets/2021/12/4-e1639638656209.webp`,
  caption: 'Medusa Auto Detailing',
});

const website = (): Json => ({
  '@type': 'WebSite', '@id': id.website(), url: `${SITE}/`,
  name: 'Medusa Auto Detailing',
  description: 'Mobile Car Wash, Valeting, & Detailing in London',
  publisher: { '@id': id.business() },
  inLanguage: 'en-GB',
});

/** The full business node. Emit on / only. */
export const businessFull = (): Json => business as Json;

/** The business as a REFERENCE, for the other 352 pages. Thinner, never contradicting.
 *  It must be written out: a bare pointer to #business resolves to nothing off the home page. */
export const businessRef = (): Json => ({
  '@type': 'AutoWash', '@id': id.business(),
  name: 'Medusa Auto Detailing', url: `${SITE}/`,
  telephone: (business as Json).telephone,
  logo: { '@id': id.logo() }, image: { '@id': id.logo() },
  sameAs: (business as Json).sameAs,
});

const crumbs = (trail: { name: string; path?: string }[], path: string): Json => ({
  '@type': 'BreadcrumbList', '@id': id.breadcrumb(path),
  itemListElement: trail.map((t, i) => ({
    '@type': 'ListItem', position: i + 1, name: t.name,
    // the LAST crumb is the current page and carries no item: it is not a link
    ...(t.path ? { item: `${SITE}${t.path}` } : {}),
  })),
});

const areaNode = (slug: string, deep = true): Json | null => {
  const a = areas.find((x) => x.slug === slug);
  if (!a) return null;
  const node: Json = { '@type': a.type, '@id': id.area(slug), name: a.name };
  // a directional slug has a name and NO geometry. Never invent a boundary.
  if (deep && a.parent) {
    const p = areas.find((x) => x.slug === a.parent);
    if (p) node.containedInPlace = { '@type': p.type, '@id': id.area(p.slug), name: p.name };
  }
  return node;
};

/** An Offer, only where the page states a price. Returns null otherwise, and the
 *  caller must omit "offers" entirely rather than emitting an empty one. */
const offerFor = (cat: string, slug: string, price?: { low: string; high?: string; count?: number }): Json | null => {
  const p = packages.find((x) => x.category === cat && x.slug === slug);
  if (!p || !p.offer || !price) return null;         // no price confirmed -> no Offer
  return price.high
    ? { '@type': 'AggregateOffer', '@id': id.packageOffer(cat, slug), priceCurrency: 'GBP',
        lowPrice: price.low, highPrice: price.high,
        ...(price.count ? { offerCount: price.count } : {}),
        availability: 'https://schema.org/InStock' }
    : { '@type': 'Offer', '@id': id.packageOffer(cat, slug), priceCurrency: 'GBP',
        price: price.low, availability: 'https://schema.org/InStock' };
};

/* ─────────────── the page builders ─────────────── */

export function homePage(page: { name: string; description: string; dateModified: string }) {
  return doc([
    { '@type': 'WebPage', '@id': id.webpage('/'), url: `${SITE}/`, name: page.name,
      description: page.description, dateModified: page.dateModified, inLanguage: 'en-GB',
      isPartOf: { '@id': id.website() }, about: { '@id': id.business() } },
    website(), logo(), businessFull(),
  ]);
}

export function categoryPage(slug: string, opts: { includeCatalogue?: boolean } = {}) {
  const c = categories.find((x) => x.slug === slug);
  if (!c) throw new Error(`unknown category: ${slug}`);
  const service: Json = {
    '@type': 'Service', '@id': id.categoryService(slug), name: c.name,
    serviceType: c.serviceType, url: `${SITE}${c.path}`,
    providerMobility: 'dynamic',             // Service only. NOT valid on the business.
    provider: businessRef(),
  };
  // Only list what the page actually links. A catalogue naming a page the body never
  // mentions is a page problem dressed up as markup.
  if (opts.includeCatalogue !== false) {
    service.hasOfferCatalog = {
      '@type': 'OfferCatalog', '@id': id.categoryCatalogue(slug), name: `${c.name} packages`,
      itemListElement: c.packages.map((ps) => {
        const p = packages.find((x) => x.category === slug && x.slug === ps)!;
        return { '@type': 'Offer', itemOffered: { '@type': 'Service', '@id': id.packageService(slug, ps), name: p.name } };
      }),
    };
  }
  return doc([
    { '@type': 'WebPage', '@id': id.webpage(c.path), url: `${SITE}${c.path}`, name: c.name,
      inLanguage: 'en-GB', isPartOf: { '@id': id.website() },
      breadcrumb: { '@id': id.breadcrumb(c.path) }, about: { '@id': id.categoryService(slug) } },
    crumbs([{ name: 'Home', path: '/' }, { name: c.name }], c.path),
    website(), logo(), service,
  ]);
}

export function packagePage(cat: string, slug: string, price?: { low: string; high?: string; count?: number }) {
  const p = packages.find((x) => x.category === cat && x.slug === slug);
  const c = categories.find((x) => x.slug === cat);
  if (!p || !c) throw new Error(`unknown package: ${cat}/${slug}`);
  const offer = offerFor(cat, slug, price);
  const service: Json = {
    '@type': 'Service', '@id': id.packageService(cat, slug), name: p.name,
    serviceType: c.serviceType, providerMobility: 'dynamic',
    // isRelatedTo, NOT isPartOf: isPartOf is CreativeWork only, in domain and range
    isRelatedTo: { '@type': 'Service', '@id': id.categoryService(cat), name: c.name, url: `${SITE}${c.path}` },
    provider: businessRef(),
    ...(offer ? { offers: offer } : {}),
    // no areaServed here: it is inherited through provider. Restating it on all 41
    // packages passes every consistency check and adds nothing but fan-out.
  };
  return doc([
    { '@type': 'WebPage', '@id': id.webpage(p.path), url: `${SITE}${p.path}`, name: p.name,
      inLanguage: 'en-GB', isPartOf: { '@id': id.website() },
      breadcrumb: { '@id': id.breadcrumb(p.path) }, about: { '@id': id.packageService(cat, slug) } },
    crumbs([{ name: 'Home', path: '/' }, { name: c.name, path: c.path }, { name: p.name }], p.path),
    website(), logo(), service,
  ]);
}

export function areaServicePage(cat: string, area: string, name: string) {
  const c = categories.find((x) => x.slug === cat);
  const a = areaNode(area);
  if (!c || !a) throw new Error(`unknown area service: ${cat}/${area}`);
  return doc([
    { '@type': 'WebPage', '@id': id.webpage(`/${cat}/${area}`), url: `${SITE}/${cat}/${area}`,
      name, inLanguage: 'en-GB', isPartOf: { '@id': id.website() },
      breadcrumb: { '@id': id.breadcrumb(`/${cat}/${area}`) },
      about: { '@id': id.areaService(cat, area) } },
    crumbs([{ name: 'Home', path: '/' }, { name: c.name, path: c.path },
      { name: areas.find((x) => x.slug === area)!.name }], `/${cat}/${area}`),
    website(), logo(),
    { '@type': 'Service', '@id': id.areaService(cat, area), name,
      serviceType: c.serviceType, providerMobility: 'dynamic',
      areaServed: a,                     // the area in THIS page's URL, nothing wider
      isRelatedTo: { '@type': 'Service', '@id': id.categoryService(cat), name: c.name, url: `${SITE}${c.path}` },
      provider: businessRef() },
  ]);
}

/** A location hub. Pass listServices only once the page actually LINKS those pages:
 *  as of 9 Oct 2026 not one of the 19 hubs links a single service page for its own area. */
export function areaHubPage(slug: string, opts: { name: string; listServices?: boolean } = { name: '' }) {
  const a = areas.find((x) => x.slug === slug);
  if (!a) throw new Error(`unknown area: ${slug}`);
  const path = `/our-locations/${slug}`;
  const graph: Json[] = [
    { '@type': 'WebPage', '@id': id.webpage(path), url: `${SITE}${path}`,
      name: opts.name || `Mobile Car Valeting and Detailing in ${a.name}`, inLanguage: 'en-GB',
      isPartOf: { '@id': id.website() }, breadcrumb: { '@id': id.breadcrumb(path) },
      about: { '@id': id.area(slug) } },
    crumbs([{ name: 'Home', path: '/' }, { name: 'Our Locations', path: '/our-locations' }, { name: a.name }], path),
    website(), logo(), areaNode(slug)!, businessRef(),
  ];
  if (opts.listServices && a.services.length) {
    graph.push({
      '@type': 'ItemList', '@id': id.areaServiceList(slug), name: `Services available in ${a.name}`,
      itemListElement: a.services.map((cat, i) => {
        const c = categories.find((x) => x.slug === cat)!;
        return { '@type': 'ListItem', position: i + 1,
          item: { '@type': 'Service', '@id': id.areaService(cat, slug), name: `${c.name} in ${a.name}` } };
      }),
    });
  }
  return doc(graph);
}

/** A blog post. `about` is omitted unless an editor has supplied it: the links a post
 *  makes and the subject its headline implies agree on only 6 of the 21. */
export function blogPost(p: { path: string; headline: string; description: string;
  datePublished: string; dateModified: string; image: string; articleSection: string;
  author: { type: 'Organization' | 'Person'; name: string }; about?: string }) {
  return doc([
    { '@type': 'WebPage', '@id': id.webpage(p.path), url: `${SITE}${p.path}`,
      inLanguage: 'en-GB', isPartOf: { '@id': id.website() },
      breadcrumb: { '@id': id.breadcrumb(p.path) } },
    crumbs([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: p.headline }], p.path),
    website(), logo(), businessRef(),
    { '@type': 'Article', '@id': id.article(p.path), headline: p.headline,
      description: p.description, articleSection: p.articleSection,
      datePublished: p.datePublished, dateModified: p.dateModified, inLanguage: 'en-GB',
      image: p.image, isPartOf: { '@id': id.webpage(p.path) },
      mainEntityOfPage: { '@id': id.webpage(p.path) },
      publisher: { '@id': id.business() },
      author: { '@type': p.author.type, name: p.author.name },
      ...(p.about ? { about: { '@id': p.about } } : {}) },
  ]);
}
