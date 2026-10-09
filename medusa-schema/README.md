# Medusa schema, for the Next.js build

Measured against the live site on 8 and 9 October 2026. 353 URLs, every one fetched.

## What to read first

1. **`ids.ts`** — the only place an `@id` is constructed. Import from here; never build an
   identifier by template in a route. The area ids are not uniform (12 areas have their own
   page, 75 do not, and **the id is the same either way**), so a template that looks right on
   one page is wrong on another.
2. **`build.ts`** — one builder per page type. Each returns a complete document: one
   `<script type="application/ld+json">`, one `@context`, one `@graph`.
3. **`DO-NOT-EMIT.md`** — read before adding anything that isn't here. Six of those refusals
   came from checking what a property actually means rather than what it sounds like.

## The one rule everything rests on

A node is **DEFINED once**, on the page that page is about, and **REFERENCED** from every
other page that mentions it, **written out in full**.

A bare `{ "@id": "..." }` resolves only if the node it names is on the **same page**. Nothing
will fetch another page to resolve a pointer. So `businessRef()` exists and is not optional:
`#business` is defined on `/` and written out, thinner, on the other 352 pages.

An `@id` is a **reconciliation key, not a URL that has to resolve**. The area ids deliberately
name `/our-locations/<area>` pages that don't exist yet, so those 75 pages can be built later
without touching a single reference.

## Already shipped

`examples/Medusa-schema-home.jsonld` and `examples/Medusa-schema-sitewide.jsonld` fix five
defects in the markup that was live. Five changes, and one of them has a knock-on:

- the business node moved **into** the page `@graph` (it was a second script block, so nothing
  could reference it)
- its `@id` is now `/#business`, not the bare site root
- **`#organization` is retired and collapsed into `#business`.** Every `publisher` reference
  across 353 pages, plus the 21 `Article.publisher`, now points at `id.business()`. One
  template change, not 353 edits.
- `areaServed` is the 8 counties on `#business`, not `"GB"` on `contactPoint`
- `openingHoursSpecification` replaces an `openingHours` string that held two ranges and so
  did not parse

## Two corrections worth knowing before you write a line

Both were in an earlier draft of this spec and both would have validated as JSON while being
wrong:

- **`providerMobility` goes on `Service`, never on the business.** Its `domainIncludes` is
  `Service` only. It's the obvious property for a mobile operator, which is exactly why it
  ends up on the `LocalBusiness` by mistake.
- **`isPartOf` is `CreativeWork` only**, in both domain and range, so `Service isPartOf
  Service` is invalid. Use `isRelatedTo` upward; the real hierarchy is expressed **downward**
  through `hasOfferCatalog`. `WebPage isPartOf WebSite` is correct and untouched.

## What is NOT confirmed, and must not be invented

The builders omit these rather than guess. If you find yourself typing a value, stop.

| Thing | Count | Who decides |
|---|---|---|
| Service package names | 13 of 41 all-caps; the cleaned name is a reading | client |
| Offer prices | 31 pages state a price, 21 by vehicle size | read each page's own table |
| `about` on blog posts | 15 of 21 unresolved | an editor |
| Blog author type | all 21 say "Detailing Lifestyle" typed as `Person` | client |
| Anything on `/car-lovers-club` | page is live and selling; the plan records it as removed | client, decision D13 |

`data/packages.json` carries `nameConfirmed: false` and `offer.TODO` on the affected rows, and
`data/blog.json` carries a `TODO` on the 15. They're machine-readable on purpose.

## Two things that need page work before markup

- **No location hub links its own area pages.** 35 service pages exist across 12 hubs and zero
  are linked from a hub body. `areaHubPage()` takes `listServices` and defaults it off: don't
  turn it on until the links exist, or the `ItemList` names pages the page never mentions.
- **`/mobile-car-wash` doesn't link `bronze-wash`.** 8 of its 9. Pass
  `{ includeCatalogue: false }`, or link it and ship all 9. The other six categories are complete.

## Data

| File | Rows | Notes |
|---|---|---|
| `data/business.json` | 1 | the full node, already fixed |
| `data/areas.json` | 94 | 87 service areas + 7 parent-only boroughs. `type`, `parent`, `hasOwnPage` |
| `data/categories.json` | 7 | `serviceType` and the packages beneath each |
| `data/packages.json` | 41 | `nameConfirmed`, `offer`, `pricedByVehicleSize` |
| `data/area-services.json` | 253 | the name comes from each page's own H1 |
| `data/blog.json` | 21 | both `about` candidates and whether they agree |

Area typing: **74 `Place`, 7 `AdministrativeArea`, 6 `Place` with a name and no geometry.** The
six are the directional slugs — `north-london`, `central-london` and the rest — which have no
boundary in any gazetteer. Give them a name and nothing else; don't reach for `GeoShape`.

## Sanity checks worth keeping in CI

Three of these caught real errors during this work, and one caught an error in the checker
rather than the data, which is its own lesson.

1. **Envelope first.** `@context` is exactly `https://schema.org`, `@graph` is a non-empty
   array, no other top-level keys. A bare array parses and resolves nothing, and every
   node-level check passes on it.
2. **Assert the walk found something.** Print the node count per page and fail on zero. A pass
   that inspected nothing is indistinguishable from a clean one.
3. **Every bare pointer resolves on its own page.** The live site gets this right: 1,475
   pointers, none dangling.
4. **Compare `@id`s by equality, never substring.** A substring test reported two nodes as
   linked when nothing was, because the old business `@id` was the bare root and therefore a
   substring of another node's `url`.
5. **Validate properties, not just types.** For each `Type.property`, check the property's
   `domainIncludes` against the type's ancestors. The live site passes this on all 66 pairs it
   emits; this spec's first draft did not.

## Running the validator

```
curl -sL https://schema.org/version/latest/schemaorg-current-https.jsonld -o schemaorg.jsonld
node validate.mjs path/to/output.jsonld
```

It runs the five checks above plus the project rules (no `#organization`, no bare-root `@id`,
no `Product`, no `Offer` without a price, `providerMobility` on `Service` only). Without
`schemaorg.jsonld` beside it everything still runs except the property check, and it says so.
Both files in `examples/` pass.
