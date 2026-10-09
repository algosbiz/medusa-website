/**
 * The menu-group hubs: one spec per column of the Services mega-menu that the
 * client has asked for a page behind. `lib/hub.ts` is the machinery that turns
 * one of these into a page's worth of content; `components/HubPage.tsx` lays
 * it out. Everything either of them shows is read back out of the pages the
 * column links to — see the note at the top of `lib/hub.ts`.
 *
 * Adding a third is this file plus a four-line route: give the NAV group an
 * `href`, add the slug to `app/sitemap.ts` and to `EXTRA_ROUTES` in
 * `scripts/verify.mjs`, and the rest follows.
 */

import { HEADLIGHT } from "@/lib/headlight";
import type { HubSpec } from "@/lib/hub";

/** Client, 2026-09-15. Four services, two of which quote a price. */
export const REPAIRS: HubSpec = {
  slug: "repairs",
  title: "Repairs & Restoration",
  menuLabel: "Repairs & Restoration",
  /*
    A technician sanding a body panel — the old paint overspray page's
    photograph. That page became Interior Paint Spill Removal on 2026-10-06
    and no longer shows it, but repair and restoration work on a panel is
    still this group's subject as a whole; the interior page itself is never
    illustrated with it. It is also the group's only header-sized landscape
    photograph that reads as repair work rather than cleaning.
  */
  heroImage:
    "/assets/2025/02/polishing-the-surface-repairman-is-working-with-c-2024-02-28-19-11-55-utc-1.webp",
  /* A machine polisher on a panel, from the page the reasons come from. */
  whyImage:
    "/assets/elementor/thumbs/close-up-of-the-hands-of-a-car-mechanic-at-a-servi-2024-12-02-11-55-00-utc-1-r1e9o8d56eqisnmplho9bfo70eb8lujn6d3l6oh2kg.webp",
  /*
    The graffiti page's "Why Choose Medusa?" — since the client's brief of
    2026-10-06 rebuilt it, a run of the company's reasons (local, assessed
    before work starts, realistic about results) rather than one service's.
    `content/overrides.ts` writes them back into the page as "Label: text"
    items, which is what `hubReasons` reads.
  */
  why: {
    slug: "repairs/car-graffiti-removal",
    heading: "Why Choose Medusa?",
    dropLead: 0,
  },
  /*
    No introduction. Until 2026-10-06 the header borrowed two paragraphs — the
    graffiti page's opener about damage costing a car its value, and the
    engine bay page's about upkeep and resale. The client's briefs rebuilt all
    four pages that day, and every paragraph they write is about its own
    service; none speaks for the group, and rule 8.1 forbids writing one. The
    header carries the title and the four services' chips, and the cards
    below say what each one is.

    The accordion needs no fallback either: all four pages carry a real FAQ
    now, so `hubQuestions` reads those and the old `questionHeadings` went.
  */
  intro: [],
  cardImages: {
    /* Headlight restoration is a hand-built route and the photograph it
       runs is in `lib/headlight.ts` — since the 2026-10-06 rebuild a 3:2 cut
       of the old page's own close-up, which is the card's shape already. */
    "repairs/headlight-restoration": HEADLIGHT.hero.image,
  },
  /* Four across only from `xl`: at `lg` the shell is 834px and four columns
     are 193px each, narrower than the add-on cards' 220px floor. */
  cardCols: "sm:grid-cols-2 xl:grid-cols-4",
};

/** Client, 2026-09-16: "one more master page to create, with links on the
 *  master page going to its childs". Eight services, four of which quote a
 *  price — nine and five until Premium Interior Wash moved to Car Wash on
 *  2026-09-26. */
export const INTERIOR: HubSpec = {
  slug: "car-interior-cleaning",
  title: "Interior Cleaning",
  menuLabel: "Interior Cleaning",
  /* A technician steam-cleaning a seat, from `/car-interior-cleaning/
     steam-cleaning`. Landscape and the largest interior photograph the group
     has that is not a portrait crop. */
  heroImage:
    "/assets/2025/02/servise-specialist-doing-car-seats-dry-cleaning-wi-2024-10-20-10-15-55-utc-1.webp",
  /* Vacuuming a driver's seat, from the page the reasons come from. */
  whyImage:
    "/assets/2025/02/partial-view-of-car-cleaner-vacuuming-drivers-seat-2024-11-17-07-05-45-utc-1.webp",
  /*
    Every list in this group names its own service somewhere in the bodies —
    there is no fully general one to take. This is the least specific of the
    eight: past the lead, "Convenience on Your Terms" and "Professional and
    Fully Insured Service" say nothing about leather at all, and the other two
    mention it only in passing. The alternatives are worse: `interior-valet`'s
    second reason points at "the booking form on this page", which this page
    does not have, and `steam-cleaning`'s fourth is entirely about steam.
  */
  why: {
    slug: "car-interior-cleaning/leather-cleaning",
    heading: "Why Choose Medusa Auto Detailing?",
    dropLead: 1,
  },
  /*
    One paragraph, and it needs no help: the interior valet page opens on two
    sentences about car interiors in general — dirt on the carpet, stains on
    the upholstery, smells inside the vehicle — without naming a package until
    the paragraph after it. That is this hub's subject exactly. Every other
    opener in the group is about its own service, so a second would only
    narrow it.
  */
  intro: [["car-interior-cleaning/interior-valet", "It’s often said that it’s what’s on the inside"]],
  /* Two of the eight carry real `faq` blocks — sixteen questions between
     them — so `hubQuestions` never reaches a fallback here. */
  /* Eight cards: three across from `lg`, which is what `CardRow` uses. */
  cardCols: "sm:grid-cols-2 lg:grid-cols-3",
};

/**
 * Client, 2026-09-22: "We need to create a page for Other Vehicles as well,
 * which will include the children" — the third menu column to get a page, and
 * the smallest: two services. The caravan card carries the quote button; the
 * motorcycle card has quoted "From £75" since its page was rebuilt from the
 * client's brief on 2026-10-06, which is also the hub's entry price now.
 *
 * Both of this group's pages are hand-built routes since the client's briefs
 * of 2026-10-06, and each names its card's picture in `cardImages`. The
 * caravan page used to write its reasons as one `<br>`-joined paragraph, which
 * is why `hubReasons` grew `runTogether`; the rebuilt page hands them over as
 * a list.
 */
export const VEHICLES: HubSpec = {
  slug: "vehicles",
  title: "Other Vehicles",
  menuLabel: "Other Vehicles",
  /* Caravans on a campsite, the caravan page's own header photograph — the
     only landscape file of header size the group has. */
  heroImage:
    "/assets/2024/05/various-rv-caravans-camping-on-campsites-at-the-ca-2023-11-27-04-52-08-utc-1.webp",
  /* The photograph the caravan page already sets beside these same reasons. */
  whyImage: "/assets/2024/11/caravan-2718561_1280-1280x770.webp",
  /*
    The caravan page's "Why Choose Medusa?", as the client's brief of
    2026-10-06 rewrote it. The old list it replaced promised "100% customer
    satisfaction" and an on-time guarantee, which that brief told the page to
    stop saying — and this hub said it too, until the page changed.
  */
  why: {
    slug: "vehicles/caravan-cleaning",
    heading: "Why Choose Medusa?",
    dropLead: 0,
  },
  /*
    One paragraph from each page, which between them are the group: what a
    caravan is to the people who own one, and what this company does to a
    motorcycle. With two services there is no paragraph about "other vehicles"
    in general to borrow, and rule 8.1 forbids writing one.
  */
  intro: [
    /* The rebuilt caravan page's own statement of the service (2026-10-06). */
    ["vehicles/caravan-cleaning", "Medusa Auto Detailing provides professional mobile caravan"],
    ["vehicles/motorcycle-valeting-detailing", "Keep your motorcycle looking its best"],
  ],
  cardImages: {
    /* The two pages shared an OG image until the motorcycle rebuild, so
       neither card could be photographed by rule without printing the same
       picture twice. */
    "vehicles/caravan-cleaning": "/assets/2026/10/caravan-cleaning-london.webp",
    /*
      The bike from the site's one motorcycle photograph, cut clear of the
      poster text it was printed under (`lib/motorcycle.ts`, 2026-10-06). The
      poster itself needed a 30% crop point here to keep "OUR MOTORCYCLE
      VALETING & DETAILING SER-" off the foot of the card; the cut-out does
      not, and it no longer advertises the ceramic coating the rebuilt page
      stopped selling.
    */
    "vehicles/motorcycle-valeting-detailing": "/assets/2026/10/motorcycle-valeting-london.webp",
  },
  /* "Our Other Vehicles Services" is two determiners deep. */
  servicesHeading: "Our Services for Other Vehicles",
  /* Two services: two across from `sm` and no wider split to make. */
  cardCols: "sm:grid-cols-2",
};
