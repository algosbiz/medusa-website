/**
 * JSON-LD for every page, built to the rules in `medusa-schema/CLAUDE.md`.
 *
 * **One block, one `@graph`, per page.** A node is DEFINED once, on the page
 * that page is about, and REFERENCED from every other page **written out in
 * full** — a bare `{ "@id": … }` resolves only against the same page's graph,
 * and nothing fetches another page to follow a pointer. That is why
 * `businessRef()` exists and is not padding.
 *
 * Every `@id` comes from `medusa-schema/ids.ts`. Never build one by template
 * here: the area ids are not uniform, so a template that looks right on one
 * page is wrong on another.
 *
 * Replaced the Yoast-shaped graph on 2026-10-09. Five defects went with it:
 * `#organization` (collapsed into `#business`), the business node sitting in a
 * second script block where nothing could reference it, its bare-root `@id`,
 * an `openingHours` string holding two ranges and so not parsing, and
 * `areaServed: ["GB"]` on the contact point.
 */
import business from "@schema/data/business.json";
import { id } from "@schema/ids";

import type { Page } from "@/lib/blocks";
import { breadcrumbTrail } from "@/lib/breadcrumbs";
import { BUSINESS, SITE } from "@/lib/site";

type Json = Record<string, unknown>;

const abs = (path: string) => (path.startsWith("http") ? path : SITE + path);

/** "" -> "/", "car-valeting/mini-valet" -> "/car-valeting/mini-valet" */
const pathOf = (slug: string) => (slug ? `/${slug}` : "/");

/**
 * A page's Service `@id`, routed through `ids.ts` by shape: one segment is a
 * category hub, two is a package beneath it. Anything else has no category to
 * name, so it falls back to the page's own URL.
 */
function serviceId(slug: string) {
  const parts = slug.split("/").filter(Boolean);
  if (parts.length === 1) return id.categoryService(parts[0]);
  if (parts.length === 2) return id.packageService(parts[0], parts[1]);
  return `${id.webpage(pathOf(slug))}#service`;
}

const logo = (): Json => ({
  "@type": "ImageObject",
  "@id": id.logo(),
  inLanguage: "en-GB",
  url: abs(BUSINESS.logo),
  contentUrl: abs(BUSINESS.logo),
  caption: BUSINESS.name,
});

const website = (): Json => ({
  "@type": "WebSite",
  "@id": id.website(),
  url: `${SITE}/`,
  name: BUSINESS.name,
  description: BUSINESS.tagline,
  publisher: { "@id": id.business() },
  inLanguage: "en-GB",
});

/**
 * The full business node, from `medusa-schema/data/business.json`. Homepage only.
 *
 * The reservations number was the one field this repo and the handover
 * disagreed on — `site.ts` carried `+44-7434649960` and the measurement read
 * `+44-2033556435` off the live site — so it was overridden here while the
 * client decided. They settled it the same week: `site.ts` now carries the
 * number the handover read, the two agree, and the override is gone.
 */
export const businessFull = (): Json => business as Json;

/**
 * The business as a REFERENCE, for the other 382 pages. Thinner than the full
 * node, never contradicting it. Written out, because a bare pointer to
 * `#business` resolves to nothing off the homepage.
 */
export const businessRef = (): Json => ({
  "@type": "AutoWash",
  "@id": id.business(),
  name: BUSINESS.name,
  url: `${SITE}/`,
  telephone: BUSINESS.telephone,
  logo: { "@id": id.logo() },
  image: { "@id": id.logo() },
  sameAs: (business as Json).sameAs,
});

/**
 * Home > … > the page, from `lib/breadcrumbs.ts`. Every rung carries its
 * absolute URL, the page's own included — Google allows the last `item` to be
 * left off, but naming it costs nothing and cannot be misread.
 */
function breadcrumbList(page: Page): Json {
  return {
    "@type": "BreadcrumbList",
    "@id": id.breadcrumb(pathOf(page.slug)),
    itemListElement: breadcrumbTrail(page).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

/** Blog posts get an Article node on top of the WebPage, as on the source. */
function article(page: Page): Json {
  const pageId = id.webpage(pathOf(page.slug));
  const meta = page.article;
  const image = page.post?.hero ?? page.ogImage;
  return {
    "@type": "Article",
    "@id": id.article(pathOf(page.slug)),
    isPartOf: { "@id": pageId },
    headline: meta?.headline || page.h1,
    description: page.description,
    ...(page.published ? { datePublished: page.published } : {}),
    ...(page.modified ?? page.published
      ? { dateModified: page.modified ?? page.published }
      : {}),
    mainEntityOfPage: { "@id": pageId },
    /* #organization is retired; every publisher points at the business. */
    publisher: { "@id": id.business() },
    ...(meta?.author ? { author: { "@type": "Person", name: meta.author } } : {}),
    ...(meta?.section?.length ? { articleSection: meta.section } : {}),
    ...(image ? { image: abs(image) } : {}),
    inLanguage: "en-GB",
  };
}

/**
 * A page's own questions.
 *
 * `DO-NOT-EMIT.md` says FAQPage earns no rich result outside government and
 * health sites and is not to be rolled out further. These thirteen pages were
 * built with one before that guidance arrived; keeping them is harmless for
 * entity understanding, so they stay, inside the page's one graph rather than
 * in an island of their own. Do not add a fourteenth without asking.
 *
 * Answers are joined as plain text — the ones that carry markup have it
 * stripped, since `text` is not HTML.
 */
function faqPage(slug: string, items: { q: string; a: string[] }[]): Json {
  return {
    "@type": "FAQPage",
    "@id": `${id.webpage(pathOf(slug))}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a.map((p) => p.replace(/<[^>]+>/g, "")).join(" "),
      },
    })),
  };
}

export type ServiceInput = {
  slug: string;
  name: string;
  serviceType: string;
  description: string;
  image?: string;
  /** One price, where the page states one. */
  offer?: { price: string; currency: string; description: string };
  /** One Offer per package, where the page sells the service at several levels. */
  offers?: { name: string; price: string; currency: string; description: string }[];
};

/**
 * A Service node for a page that sells one thing.
 *
 * Three properties a schema pass reaches for and this one does not emit:
 *
 * - **`brand`**, to name WHEELUV™ or Autoglym. On a Service it means "the
 *   brand the service is associated with", so it would claim an affiliation
 *   nobody has confirmed. The product name stays copy.
 * - **`areaServed`**. It is inherited through `provider` -> `#business`,
 *   which carries the eight counties. Restating it on 41 service pages passes
 *   every consistency check and adds nothing but fan-out.
 * - **`isPartOf`**, upward to the category. `isPartOf` is CreativeWork only,
 *   in domain and range. The hierarchy runs downward via `hasOfferCatalog`.
 *
 * `providerMobility` goes HERE and never on the business: its `domainIncludes`
 * is `Service` alone, which is exactly why it ends up on the LocalBusiness.
 */
function serviceNode(service: ServiceInput): Json {
  const url = id.webpage(pathOf(service.slug));
  const offers = service.offer
    ? {
        "@type": "Offer",
        price: service.offer.price,
        priceCurrency: service.offer.currency,
        description: service.offer.description,
        url,
      }
    : service.offers?.length
      ? service.offers.map((o) => ({
          "@type": "Offer",
          name: o.name,
          price: o.price,
          priceCurrency: o.currency,
          description: o.description,
          url,
        }))
      : null;

  return {
    "@type": "Service",
    "@id": serviceId(service.slug),
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url,
    providerMobility: "dynamic",
    provider: businessRef(),
    ...(service.image ? { image: abs(service.image) } : {}),
    ...(offers ? { offers } : {}),
  };
}

/**
 * The one graph a page emits.
 *
 * `service` and `faq` are folded in here rather than rendered as their own
 * `<script>` blocks: a node outside the page graph is an island nothing can
 * reference, which is how the business node came to be unreachable.
 */
export function pageSchema(
  page: Page,
  extra: { service?: ServiceInput; faq?: { q: string; a: string[] }[] } = {},
): Json {
  const isHome = !page.slug;
  const pageId = id.webpage(pathOf(page.slug));
  const service = extra.service ? serviceNode(extra.service) : null;

  const webPage: Json = {
    "@type": "WebPage",
    "@id": pageId,
    url: pageId,
    name: page.title,
    isPartOf: { "@id": id.website() },
    /* What the page is about: the business on the homepage, the service it
       sells where it sells one. */
    ...(isHome
      ? { about: { "@id": id.business() } }
      : service
        ? { about: { "@id": service["@id"] } }
        : {}),
    description: page.description,
    /* The homepage is the root of every trail, so a list of its own would be
       one item long and say nothing. Yoast emits one; Google ignores it. */
    ...(isHome ? {} : { breadcrumb: { "@id": id.breadcrumb(pathOf(page.slug)) } }),
    ...(page.published ? { datePublished: page.published } : {}),
    ...(page.modified ? { dateModified: page.modified } : {}),
    inLanguage: "en-GB",
    potentialAction: [{ "@type": "ReadAction", target: [pageId] }],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage,
      ...(page.article ? [article(page)] : []),
      ...(isHome ? [] : [breadcrumbList(page)]),
      website(),
      logo(),
      /* Defined in full on the homepage, written out thinner everywhere else. */
      isHome ? businessFull() : businessRef(),
      ...(service ? [service] : []),
      ...(extra.faq?.length ? [faqPage(page.slug, extra.faq)] : []),
    ],
  };
}
