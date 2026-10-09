/* The ONLY place an @id is constructed. Routes must import from here and never
   build an identifier by template: the area ids are not uniform (12 areas have their
   own page, 75 do not, and the id is the same either way), so a template that looks
   right for one page is wrong for another.

   An @id is a reconciliation key, not a URL that has to resolve. The area ids below
   deliberately name /our-locations/<area> pages that do not exist yet, so those pages
   can be built later without changing a single reference. */

export const SITE = 'https://medusaautodetailing.co.uk';

export const id = {
  business: () => `${SITE}/#business`,
  website: () => `${SITE}/#website`,
  logo: () => `${SITE}/#/schema/logo/image/`,

  webpage: (path: string) => `${SITE}${path}`,
  breadcrumb: (path: string) => `${SITE}${path}#breadcrumb`,

  /** an area, whether or not /our-locations/<slug> exists yet */
  area: (slug: string) => `${SITE}/our-locations/${slug}#area`,

  /** a category Service, e.g. /mobile-car-wash */
  categoryService: (slug: string) => `${SITE}/${slug}#service`,
  categoryCatalogue: (slug: string) => `${SITE}/${slug}#catalogue`,

  /** a named service package, e.g. /mobile-car-wash/gold-wash */
  packageService: (cat: string, slug: string) => `${SITE}/${cat}/${slug}#service`,
  packageOffer: (cat: string, slug: string) => `${SITE}/${cat}/${slug}#offer`,

  /** a category scoped to one area, e.g. /mobile-car-wash/watford */
  areaService: (cat: string, area: string) => `${SITE}/${cat}/${area}#service`,

  /** the list of services available in an area, on its own hub page */
  areaServiceList: (slug: string) => `${SITE}/our-locations/${slug}#services`,

  article: (path: string) => `${SITE}${path}#article`,
};

/* RETIRED. Do not emit. Collapsed into #business on 9 Oct 2026 and removed from the
   shipped files. Every publisher reference moved to id.business(). */
export const RETIRED_organization = `${SITE}/#organization`;
