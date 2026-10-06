/**
 * Content for /vehicles/motorcycle-valeting-detailing.
 *
 * **Every sentence here is the client's own**, transcribed from the brief they
 * sent on 2026-10-06 ("Webite changes (1).pdf", 14 pages): "This page needs to
 * be fully changes please" — a new page copy, an SEO block, a ten-section
 * layout, mobile conversion rules, an image-SEO table and a list of services
 * that must no longer appear. The copy is used as written, straight
 * apostrophes and all. What the brief addressed to the developer (the layout
 * notes, "Do not keyword-stuff ALT text", the booking-system instructions) is
 * not copy and is not on the page; it decided the layout instead.
 *
 * **Nothing from the old page survives.** It sold three washes at £165 / £240
 * / £375 and twenty-five add-ons, and between them they carried every item
 * the brief's "IMPORTANT OPERATIONAL INSTRUCTIONS" orders removed — chain
 * tightening and lubrication, sprocket cleaning, fairing removal, oil and tyre
 * pressure checks, brake and caliper detailing, engine and fork re-painting.
 * "The website should never imply that Medusa's valeters are motorcycle
 * mechanics", so none of it is kept, not even as an add-on.
 *
 * One answer is reworded rather than transcribed, and it is marked
 * `ASSEMBLED` below: the brief's ceramic-coating answer ends "This should not
 * be advertised as a professional long-term ceramic coating", which is an
 * instruction to the developer sitting inside customer copy. The page says
 * the same thing to the customer instead.
 *
 * The comparison table is not new copy either: its rows are the packages'
 * own "What's Included" lines, verbatim, and its ticks are worked out from
 * those lists by `tiersWith()` — so a line moved between packages here moves
 * its tick, and a row that no package lists throws at build.
 */

import { BOOK_URL, CONTACT } from "@/lib/site";

export const SLUG = "vehicles/motorcycle-valeting-detailing";
export const PATH = `/${SLUG}`;

export type Photo = { src: string; alt: string; w: number; h: number };

/*
  The image-SEO table's filenames and alt text, on the two photographs that
  are genuinely Medusa's. The table also names a deep-clean shot, a
  protection-valet shot and a before & after — none exists yet, and the brief
  says "Do not use misleading stock photographs presented as Medusa's work",
  so none is faked and the before & after section waits for them.
*/
export const PHOTOS = {
  /* The bike from the site's one motorcycle photograph, cut clear of the
     poster text above and below it (rows 414–1050 of the 1024x1536 original),
     so the page no longer advertises "Ceramic Coating for Motorcycles" and
     "Mobile or Studio Service" in its own hero. */
  hero: {
    src: "/assets/2026/10/motorcycle-valeting-london.webp",
    alt: "Mobile motorcycle valeting in London by Medusa Auto Detailing",
    w: 1024,
    h: 636,
  },
  /* "Image of Medusa technician/van": the liveried van, a frame from Medusa's
     own promotional film (`/assets/2024/04/Medusa-Detailing-Promotional-
     Video.mp4`, 0:08), cropped clear of the film's captions. */
  van: {
    src: "/assets/2026/10/mobile-motorcycle-detailing-london.webp",
    alt: "Mobile motorcycle detailing service in London",
    w: 750,
    h: 500,
  },
} satisfies Record<string, Photo>;

export type Package = {
  /** The full name, as the package heading. */
  name: string;
  /** The name the "which should I choose?" section uses. */
  short: string;
  price: string;
  badge?: string;
  idealFor: string;
  body: string;
  included: string[];
  time: string;
  /** Short form for the comparison table and the prices table. */
  timeShort: string;
  bookLabel: string;
};

const PACKAGES: Package[] = [
  {
    name: "Motorcycle Maintenance Wash",
    short: "Maintenance Wash",
    price: "£75",
    idealFor: "Motorcycles that are regularly maintained and need a professional freshen-up.",
    body: "A safe and thorough exterior clean designed to remove everyday dirt, dust and road grime while leaving your motorcycle clean and presentable.",
    included: [
      "Pre-rinse",
      "pH-neutral snow foam",
      "Safe hand wash",
      "Painted exterior surfaces cleaned",
      "Wheels cleaned",
      "Exterior plastics cleaned",
      "Accessible exterior components cleaned",
      "Mirrors cleaned",
      "Windscreen/screen cleaned",
      "Tyres cleaned – no tyre dressing applied",
      "Thorough rinse",
      "Safe towel and/or air drying",
      "Final exterior wipe-down",
    ],
    time: "45–60 Minutes",
    timeShort: "45–60 mins",
    bookLabel: "Book Maintenance Wash",
  },
  {
    name: "Motorcycle Deep Valet",
    short: "Deep Valet",
    price: "£110",
    badge: "Most Popular",
    idealFor:
      "Motorcycles requiring a more thorough clean due to heavier road grime, bugs and contamination.",
    body: "Everything included in our Motorcycle Maintenance Wash with additional attention given to safely accessible intricate areas of the motorcycle.",
    included: [
      "Everything in the Motorcycle Maintenance Wash",
      "Detailed brush cleaning of safely accessible areas",
      "Deeper wheel cleaning",
      "Bug and road-grime removal",
      "Accessible engine casing exterior cleaned",
      "Exterior exhaust surfaces cleaned",
      "Light tar and contamination removal where safe",
      "Additional cleaning around intricate exterior areas",
      "Exterior plastics and rubber surfaces dressed where suitable",
      "Detailed finishing and final inspection",
    ],
    time: "75–90 Minutes",
    timeShort: "75–90 mins",
    bookLabel: "Book Deep Valet",
  },
  {
    name: "Motorcycle Protection Valet",
    short: "Protection Valet",
    price: "£150",
    idealFor:
      "Motorcycles that need a thorough clean followed by additional gloss and exterior protection.",
    body: "Our most comprehensive standard motorcycle package combines our Deep Valet with paint enhancement and protection to leave suitable exterior surfaces cleaner, glossier and better protected.",
    included: [
      "Everything in the Motorcycle Deep Valet",
      "Hand polish applied to suitable painted surfaces",
      "Chrome and exterior metal polishing where applicable",
      "Premium exterior plastic and rubber dressing where suitable",
      "Spray ceramic sealant applied to suitable exterior surfaces",
      "Enhanced gloss and water repellency",
      "Final detailed inspection and finishing",
    ],
    time: "1.5–2 Hours",
    timeShort: "1.5–2 hrs",
    bookLabel: "Book Protection Valet",
  },
];

/**
 * Which packages include a line, reading "Everything in the …" as the whole
 * of the package before it. Throws on a line no package lists, so the
 * comparison table can never tick something the cards do not say.
 */
export function tiersWith(line: string): boolean[] {
  const has: boolean[] = [];
  PACKAGES.forEach((p, i) => {
    const inherits = i > 0 && /^Everything in the /.test(p.included[0]);
    has.push(p.included.includes(line) || (inherits && has[i - 1]));
  });
  if (!has.some(Boolean)) throw new Error(`motorcycle page: no package includes "${line}"`);
  return has;
}

export const MOTORCYCLE = {
  book: BOOK_URL,
  whatsapp: CONTACT.whatsapp,

  seo: {
    title: "Motorcycle Valeting London | Mobile Motorbike Detailing | Medusa",
    description:
      "Professional mobile motorcycle valeting in London from £75. Maintenance, deep cleaning and protection packages delivered to your home or workplace. Book Medusa today.",
  },

  /* ── Section 1 — Hero ────────────────────────────────────────────────── */
  hero: {
    /* "H1: Motorcycle Valeting & Detailing London. Only ONE H1 should be
       used on the page." */
    h1: "Motorcycle Valeting & Detailing London",
    title: "Professional Mobile Motorcycle Valeting at Your Home or Workplace",
    lead: "Keep your motorcycle looking its best with professional mobile motorcycle valeting from Medusa Auto Detailing.",
    body: [
      "We provide convenient motorcycle cleaning and detailing across London, travelling directly to your home or workplace with our own professional equipment and products.",
      "Whether your bike needs a regular maintenance wash, a deeper clean or additional paintwork protection, our three straightforward motorcycle packages make it easy to choose the right service.",
    ],
    trust: [
      { icon: "van", label: "Fully Mobile Service" },
      { icon: "spark", label: "Professional Detailing Products" },
      { icon: "droplet", label: "Safe Cleaning Methods" },
      { icon: "shield", label: "Fully Insured" },
      { icon: "star", label: "5-Star Rated Service" },
      { icon: "pin", label: "Serving London & Surrounding Areas" },
    ],
    bookLabel: "Book Your Motorcycle Valet",
    whatsappLabel: "WhatsApp Us",
  },

  /* ── Section 2 — Three packages ──────────────────────────────────────── */
  packages: {
    heading: "Choose Your Motorcycle Valet",
    includedHeading: "What's Included",
    idealForLabel: "Ideal for:",
    timeLabel: "Estimated Time:",
    items: PACKAGES,
  },

  /* ── Section 3 — Which should I choose? + the comparison ─────────────── */
  choose: {
    heading: "Which Motorcycle Valet Should I Choose?",
    items: [
      {
        short: "Maintenance Wash",
        price: "£75",
        body: "Choose this if your motorcycle is already reasonably well maintained and simply needs a professional clean.",
      },
      {
        short: "Deep Valet",
        price: "£110",
        body: "Choose this if your motorcycle hasn't been professionally cleaned recently or has heavier road grime, bugs and dirt around more intricate areas.",
      },
      {
        short: "Protection Valet",
        price: "£150",
        body: "Choose this if you want the benefits of the Deep Valet together with additional polishing, gloss and exterior protection.",
      },
    ],
    /* "Create a clean comparison table showing the main differences between
       £75 / £110 / £150." The rows are the packages' own lines; the first two
       are what all three share, the rest are where they part. */
    compare: [
      "Safe hand wash",
      "Wheels cleaned",
      "Deeper wheel cleaning",
      "Bug and road-grime removal",
      "Accessible engine casing exterior cleaned",
      "Exterior exhaust surfaces cleaned",
      "Light tar and contamination removal where safe",
      "Exterior plastics and rubber surfaces dressed where suitable",
      "Hand polish applied to suitable painted surfaces",
      "Chrome and exterior metal polishing where applicable",
      "Spray ceramic sealant applied to suitable exterior surfaces",
      "Enhanced gloss and water repellency",
    ],
    notSure: {
      title: "Not sure which service you need?",
      body: "Send us a few photos of your motorcycle and our team can recommend the most suitable package.",
      whatsappLabel: "WhatsApp Us",
      bookLabel: "Book Online",
    },
  },

  /* ── Section 5 — Mobile service ──────────────────────────────────────── */
  mobile: {
    heading: "Mobile Motorcycle Valeting Across London",
    title: "We Come to You",
    body: [
      "There's no need to take your motorcycle to a detailing studio.",
      "Medusa Auto Detailing provides a fully mobile motorcycle valeting service, allowing your bike to be professionally cleaned at your home, workplace or another suitable location.",
      "Our technicians arrive with professional valeting equipment and products required to complete your chosen service.",
      "We cover locations throughout London and surrounding areas, subject to availability.",
    ],
    cta: "Check Availability",
  },

  /* ── Section 6 — Safe cleaning / exclusions ──────────────────────────── */
  safe: {
    heading: "Safe Motorcycle Cleaning",
    bodyHtml: [
      "Motorcycles contain numerous sensitive, mechanical and safety-critical components. For this reason, our motorcycle packages concentrate on <strong>cosmetic exterior cleaning, presentation and protection</strong>.",
      "Our technicians clean areas that can be safely accessed without dismantling the motorcycle.",
    ],
    noteTitle: "Please Note",
    noteLeadHtml: "Our standard motorcycle valeting packages <strong>do not include:</strong>",
    exclusions: [
      "Chain cleaning, lubrication or adjustment",
      "Sprocket cleaning, removal or adjustment",
      "Brake disc or brake component detailing",
      "Mechanical servicing or adjustments",
      "Oil or other fluid checks",
      "Tyre pressure checks",
      "Tyre dressing",
      "Fairing or panel removal",
      "Seat or component removal",
      "Electrical work",
      "Mechanical component restoration",
      "Engine, fork or component repainting",
      "Rust repair or restoration",
      "Any dismantling of the motorcycle",
    ],
    after: [
      "We will not apply tyre shine or dressing to motorcycle tyres.",
      "If an area cannot be safely accessed without removing components, it will not be included within the valet.",
    ],
  },

  /* ── Section 7 — Why Medusa ──────────────────────────────────────────── */
  why: {
    heading: "Why Choose Medusa Auto Detailing?",
    title: "Professional Mobile Valeting Without the Hassle",
    items: [
      {
        icon: "van",
        title: "We Come to You",
        body: "Have your motorcycle professionally valeted without travelling to a detailing studio.",
      },
      {
        icon: "spark",
        title: "Professional Products",
        body: "We use professional-quality cleaning and detailing products selected for the surfaces being treated.",
      },
      {
        icon: "layers",
        title: "Straightforward Packages",
        body: "Three clearly defined services make choosing the right level of motorcycle cleaning simple.",
      },
      {
        icon: "shield",
        title: "Safe Approach",
        body: "We concentrate on cosmetic cleaning and protection rather than mechanical servicing or dismantling.",
      },
      {
        icon: "star",
        title: "Trusted London Detailers",
        body: "Medusa Auto Detailing provides professional mobile vehicle valeting and detailing throughout London.",
      },
      {
        icon: "calendar",
        title: "Convenient Online Booking",
        body: "Choose your package and arrange your mobile appointment online.",
      },
    ],
    bookLabel: "Book Your Motorcycle Valet",
  },

  /* ── Motorcycle valeting prices ──────────────────────────────────────── */
  prices: {
    heading: "Motorcycle Valeting Prices",
    columns: ["Package", "From", "Approx. Time"],
    note: "Prices are starting prices and assume a motorcycle in a reasonable condition.",
    body: "Motorcycles with excessive mud, heavy contamination or unusually intensive cleaning requirements may require additional time and incur an additional charge. Where possible, this will be discussed before work begins.",
  },

  /* ── Section 9 — FAQ ─────────────────────────────────────────────────── */
  faq: {
    heading: "Motorcycle Valeting FAQ",
    items: [
      {
        q: "How much does motorcycle valeting cost in London?",
        a: [
          "Our motorcycle valeting packages start from £75 for a Maintenance Wash, £110 for a Deep Valet and £150 for a Protection Valet. Final pricing may vary for motorcycles requiring significantly more cleaning than normally expected.",
        ],
      },
      {
        q: "Do you come to my home to clean my motorcycle?",
        a: [
          "Yes. Medusa Auto Detailing provides mobile motorcycle valeting across London and surrounding areas. Our technicians travel to your home, workplace or another suitable location.",
        ],
      },
      {
        q: "Which motorcycle valet should I choose?",
        a: [
          "For a regularly maintained motorcycle, choose the Maintenance Wash. For heavier dirt and a more detailed clean, choose the Deep Valet. For cleaning plus additional gloss and exterior protection, choose the Protection Valet.",
        ],
      },
      {
        q: "Do you clean motorcycle chains?",
        a: [
          "Chain cleaning, lubrication and adjustment are not included within our standard motorcycle valeting packages.",
        ],
      },
      {
        q: "Do you clean motorcycle engines?",
        a: [
          "We can clean suitable and safely accessible exterior engine casing surfaces as part of our Deep and Protection Valets. We do not dismantle the motorcycle or carry out mechanical engine cleaning or servicing.",
        ],
      },
      {
        q: "Do you clean motorcycle wheels?",
        a: [
          "Yes. Wheel cleaning is included in all three motorcycle packages, with more detailed wheel cleaning included in our Deep and Protection Valets.",
        ],
      },
      {
        q: "Do you apply tyre shine to motorcycles?",
        a: ["No. We do not apply tyre dressing or tyre shine to motorcycle tyres."],
      },
      {
        q: "Do you remove motorcycle fairings?",
        a: [
          "No. Our motorcycle valeting service does not involve removing fairings, panels, seats or other components. We clean safely accessible areas only.",
        ],
      },
      {
        q: "Can you remove bugs and road grime?",
        a: [
          "Yes. More intensive bug and road-grime removal is included within our Motorcycle Deep Valet and Motorcycle Protection Valet.",
        ],
      },
      {
        q: "Does the Protection Valet include ceramic coating?",
        a: [
          /*
            ASSEMBLED. The brief's answer is "The standard Protection Valet
            includes a spray ceramic sealant applied to suitable exterior
            surfaces. This should not be advertised as a professional
            long-term ceramic coating." The second sentence is addressed to
            whoever builds the page, so it is said to the customer instead —
            same fact, nothing added.
          */
          "The standard Protection Valet includes a spray ceramic sealant applied to suitable exterior surfaces. It is not a professional long-term ceramic coating.",
        ],
      },
      {
        q: "How long does a motorcycle valet take?",
        a: [
          "The Maintenance Wash generally takes approximately 45–60 minutes, the Deep Valet approximately 75–90 minutes and the Protection Valet approximately 1.5–2 hours. Times are estimates and depend on the motorcycle's size and condition.",
        ],
      },
      {
        q: "Can you clean very dirty motorcycles?",
        a: [
          "Yes, subject to inspection. Motorcycles with excessive mud, contamination or unusually heavy soiling may require additional time and an additional charge.",
        ],
      },
      {
        q: "Where in London do you offer motorcycle valeting?",
        a: [
          "Medusa Auto Detailing provides mobile motorcycle valeting throughout London and surrounding service areas. Enter your location when booking or contact us to confirm availability.",
        ],
      },
    ],
  },

  /*
    ── Delivered to your door, and Section 10 — the final CTA ─────────────
    The copy closes on this section and its [BOOK ONLINE] [WHATSAPP US]; the
    layout notes then ask for a "strong full-width booking section" with
    [BOOK MOTORCYCLE VALET] [WHATSAPP US]. They are one band on the page —
    the copy, its three prices, then the booking panel — and the two pairs of
    buttons, which go to the same two places, are the panel's one pair.
  */
  closing: {
    heading: "Professional Motorcycle Valeting — Delivered to Your Door",
    body: [
      "Whether you're preparing your motorcycle for the weekend, keeping a regularly used bike clean or simply want to restore its presentation after weeks of London roads, Medusa Auto Detailing makes professional motorcycle valeting convenient.",
      "Choose from three straightforward packages and we'll come directly to you.",
    ],
  },
  finalCta: {
    heading: "Ready to get your motorcycle looking its best?",
    body: "Choose your motorcycle valet and let Medusa come to you.",
    bookLabel: "Book Motorcycle Valet",
    whatsappLabel: "WhatsApp Us",
  },
};
