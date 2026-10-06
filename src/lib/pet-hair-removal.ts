/**
 * Content for /car-interior-cleaning/pet-hair-removal.
 *
 * **Every sentence here is the client's own**, transcribed from the brief they
 * sent on 2026-10-06 ("pet hair removal.pdf", 21 pages): "Replace/re-optimise
 * the existing Pet Hair Removal page with the content below. KEEP EXISTING
 * URL". Its thirteen sections, FAQ and SEO strings are used as written —
 * straight apostrophes, and bold wherever the brief sets a phrase in bold.
 * What the brief addressed to the developer ("WEBSITE DEVELOPER: …", the
 * recommended layout, the image-SEO table, the internal-linking and sticky-CTA
 * notes) is not copy and is not on the page; it decided the layout instead.
 *
 * The brief's headline change: "The existing page currently displays Pet Hair
 * Removal from £90. REMOVE THIS. Pet Hair Removal should now be displayed as:
 * +£20 ADD-ON. Must be booked with Triton Interior Valet." Nothing of the old
 * page survives — it promised "eliminating those unpleasant and lingering pet
 * odours" and listed steam cleaning and sanitation inside the package, both on
 * the brief's list of claims to remove.
 *
 * **One answer is reworded, and it is marked `ASSEMBLED` below**: the FAQ's
 * "Do you remove pet smells?" ends on two sentences addressed to the
 * developer — "Do not advertise odour removal as being included within this
 * £20 service. If the customer has a significant pet odour problem, direct
 * them to the appropriate Medusa odour-treatment service/add-on." The page
 * keeps the customer-facing first sentence and does what the second asks.
 *
 * Two parts of the brief are not built, both because what they need does not
 * exist here:
 *
 *   - **Section 8, Before & After** — "Add genuine Medusa before-and-after
 *     photographs here … Use a before/after slider where possible." There are
 *     none, and the brief's own rule elsewhere is genuine results only.
 *   - **The booking-system instructions** — the OPTIONAL EXTRA in the Triton
 *     flow, the condition question, the photo upload for Heavy or Excessive
 *     and the required acknowledgement checkbox all belong to
 *     book.medusaautodetailing.co.uk, which is not this repo — the same call
 *     the motorcycle and vomit cleaning pages made of their briefs. The
 *     acknowledgement's substance is on this page regardless, in Section 12,
 *     and the OPTIONAL EXTRA's two sentences are on the Triton page's own
 *     add-on card (`TRITON_EXTRA`).
 */

import { BOOK_URL, CONTACT } from "@/lib/site";

export const SLUG = "car-interior-cleaning/pet-hair-removal";
export const PATH = `/${SLUG}`;

/**
 * The service this add-on is sold with. "This page should prominently link to
 * the: Triton Interior Valet using natural anchor text such as: Book our
 * Triton Interior Valet."
 */
export const TRITON_PATH = "/car-interior-cleaning/interior-valet";

/**
 * The Triton page's side of the same instruction: "The Triton Interior Valet
 * page should also link back to this page from its optional extras section
 * using: Pet Hair Removal +£20". `content/overrides.ts` links that page's
 * "Pet Hair Removal" add-on card here, and gives the card the two sentences
 * the brief writes for the same OPTIONAL EXTRA in the Triton booking flow —
 * the card used to say "we ensure all pet hair is carefully removed", which
 * is the 100% promise this brief withdraws. The card's title is the anchor,
 * "Pet Hair Removal", beside the £20 it already carried.
 */
export const TRITON_EXTRA = {
  body: "Up to 90% removal of accessible pet hair. Additional charges apply for excessive or severely embedded pet hair.",
};

export type Photo = { src: string; alt: string; w: number; h: number };

/*
  The image-SEO table's filenames and alt text, on the photographs that fit
  them. All three are already the client's: the carpet is the picture the
  homepage's own Pet Hair Removal card has carried since 2024, and the two
  seats are the vacuuming shots `/car-interior-cleaning` and its pages
  already use. None is captioned as a particular customer's car or as a
  before & after. The table also names a boot photograph and a before &
  after; neither exists, and neither is faked.
*/
export const PHOTOS = {
  /* A crevice nozzle working along a seat edge — where the brief says hair
     collects. */
  hero: {
    src: "/assets/2026/10/car-pet-hair-removal-london.webp",
    alt: "Professional car pet hair removal in London",
    w: 1474,
    h: 983,
  },
  /* Hair matted into black carpet — beside "why pet hair needs extra
     attention". */
  carpet: {
    src: "/assets/2026/10/dog-hair-car-carpet-removal.webp",
    alt: "Dog hair removal from car carpet",
    w: 720,
    h: 960,
  },
  /* Vacuuming a driver's seat — beside the six steps. */
  seat: {
    src: "/assets/2026/10/pet-hair-car-seat-cleaning.webp",
    alt: "Pet hair removal from car seats",
    w: 1200,
    h: 1500,
  },
} satisfies Record<string, Photo>;

export type Step = { title: string; body: string[] };

export const PET_HAIR = {
  book: BOOK_URL,
  whatsapp: CONTACT.whatsapp,

  seo: {
    title: "Car Pet Hair Removal London | £20 Valet Add-On | Medusa",
    description:
      "Add pet hair removal to your Medusa Triton Interior Valet for £20. We aim to remove up to 90% of accessible dog and cat hair. Mobile across London.",
  },

  /**
   * "MOST IMPORTANT MESSAGE ACROSS THE PAGE — The customer should understand
   * these four points within seconds". They are the hero's first thing after
   * the h1, and the final call to action's card says them again.
   */
  points: {
    price: { label: "Pet Hair Removal", value: "+£20" },
    triton: "Only Available With Triton Interior Valet",
    aim: "We Aim for Up to 90% Removal",
    excessive: "Excessive Pet Hair = Additional Charge",
  },

  /* ── Section 1 — Hero ────────────────────────────────────────────────── */
  hero: {
    /* "Use ONE H1 only." */
    h1: "Car Pet Hair Removal London",
    title: "Add Professional Pet Hair Removal to Your Interior Valet",
    intro: [
      "Dog and cat hair can quickly become embedded within car seats, carpets, mats and other interior fabrics, making it difficult to remove with normal vacuuming alone.",
      /* Bold where the brief sets it bold; the Triton link is the internal
         link the brief asks for, laid on its own words. */
      `Medusa Auto Detailing offers <strong>Pet Hair Removal for just £20 when added to our <a href="${TRITON_PATH}">Triton Interior Valet</a>.</strong>`,
      "Our technicians use professional vacuuming, specialist brushes and pet-hair removal techniques to target hair trapped throughout the accessible interior.",
    ],
    addOn: {
      title: "Pet Hair Removal Add-On — £20",
      ticks: [
        "Up to 90% Pet Hair Removal",
        "Seats, Carpets & Mats",
        "Boot Area Where Applicable",
        "Specialist Pet Hair Removal Tools",
        "Added to Triton Interior Valet",
        "Mobile Service Across London",
      ],
      badge: "£20 Add-On",
      note: "Pet Hair Removal cannot be booked as a standalone £20 service and must be added to a Triton Interior Valet.",
    },
    bookLabel: "Book Triton Interior Valet + Pet Hair",
  },

  /* ── Section 2 — How it works ────────────────────────────────────────── */
  how: {
    heading: "How It Works",
    title: "Pet Hair Removal + Triton Interior Valet",
    leadHtml: [
      "Our £20 Pet Hair Removal service is an <strong>add-on to our Triton Interior Valet</strong>.",
      "It is not available as a standalone £20 appointment.",
    ],
    steps: [
      { title: "Book Your Triton Interior Valet", body: ["Select the Triton Interior Valet for your vehicle."] },
      { title: "Add Pet Hair Removal — £20", body: ["Select the Pet Hair Removal add-on during booking."] },
      {
        title: "We Come to You",
        body: [
          "Our mobile technician arrives at your home or workplace and completes your interior valet together with the additional pet-hair treatment.",
        ],
      },
    ] as Step[],
    /* "using natural anchor text such as: Book our Triton Interior Valet" —
       under the step that books it. */
    tritonLabel: "Book our Triton Interior Valet",
    bookLabel: "Book Now",
  },

  /* ── Section 3 — Why pet hair needs extra attention ──────────────────── */
  why: {
    heading: "Why Pet Hair Needs Extra Attention",
    title: "Normal Vacuuming Doesn't Always Remove Embedded Pet Hair",
    lead: "Pet hair behaves differently from normal dust and loose interior debris.",
    listLead: "Dog and cat hairs can become deeply embedded within:",
    places: [
      "Carpet fibres",
      "Fabric seats",
      "Floor mats",
      "Boot carpets",
      "Seat edges",
      "Footwells",
      "Fabric trim",
      "Other upholstered surfaces",
    ],
    body: [
      "Some types of short or coarse pet hair can become particularly embedded within automotive carpets and upholstery.",
      "For this reason, vehicles containing pet hair require additional time and specialist agitation beyond what is included within a standard interior valet.",
    ],
    conclusionHtml: "That's why Pet Hair Removal is offered as a separate <strong>£20 add-on</strong>.",
  },

  /* ── Section 4 — Our pet hair removal process ────────────────────────── */
  process: {
    heading: "Our Pet Hair Removal Process",
    title: "How We Remove Pet Hair From Your Car",
    steps: [
      {
        title: "Interior Assessment",
        body: [
          "Our technician assesses the amount of pet hair present and identifies the areas requiring additional attention.",
          "If the amount of pet hair is significantly greater than would reasonably be expected within our standard £20 add-on, the technician will advise you before carrying out chargeable additional work.",
        ],
      },
      {
        title: "Initial Vacuum",
        body: [
          "Loose hair, dirt and debris are removed during the interior-valeting process.",
          "This allows our technician to identify the more stubborn hair that has become embedded within carpets and upholstery.",
        ],
      },
      {
        title: "Specialist Agitation",
        body: [
          "Suitable specialist brushes and pet-hair removal tools are used on applicable surfaces to help release embedded hair from carpet and upholstery fibres.",
        ],
      },
      {
        title: "Detailed Vacuuming",
        body: [
          "Released pet hair is progressively vacuumed from the interior.",
          "Additional attention is given to areas where hair commonly collects, including seat edges, carpets, footwells and other accessible upholstered areas.",
        ],
      },
      {
        title: "Boot Area",
        body: [
          "Where applicable and accessible, pet hair within the boot area is also treated.",
          "This is particularly useful for customers who regularly transport dogs in the boot.",
        ],
      },
      {
        title: "Final Inspection",
        body: [
          "Once the pet-hair treatment and Triton Interior Valet have been completed, our technician carries out a final inspection of the interior.",
          "Our standard service aims to remove <strong>up to 90% of accessible pet hair</strong>, subject to the condition of the vehicle and severity of the pet hair.",
        ],
      },
    ] as Step[],
  },

  /* ── Section 5 — What's included? ────────────────────────────────────── */
  included: {
    heading: "What's Included?",
    title: "£20 Pet Hair Removal Add-On",
    lead: "When added to a Triton Interior Valet, the Pet Hair Removal add-on includes additional treatment of applicable and accessible:",
    areas: [
      "Fabric seats",
      "Carpets",
      "Floor mats",
      "Footwells",
      "Seat edges",
      "Boot carpet/area",
      "Upholstered interior surfaces",
      "Other areas containing accessible pet hair",
    ],
    target: {
      label: "Our Target",
      title: "Up to 90% Pet Hair Removal",
      bodyHtml: [
        "We aim to remove <strong>up to 90% of accessible pet hair</strong> as part of the service.",
        "Please read the condition and removal information below before booking.",
      ],
      bookLabel: "Add Pet Hair Removal",
    },
  },

  /* ── Section 6 — Important: up to 90% removal ────────────────────────── */
  ninety: {
    heading: "Important: Up to 90% Removal",
    title: "Why Don't We Promise 100% Pet Hair Removal?",
    lead: "Pet hair can become extremely difficult to remove from certain automotive materials.",
    factorsLead: "The final result depends on factors including:",
    factors: [
      "Amount of pet hair present",
      "Type of pet hair",
      "Length and coarseness of the hair",
      "How deeply the hair is embedded",
      "Type of carpet or upholstery",
      "How long the hair has accumulated",
      "Hair trapped underneath or between fixed components",
      "Hair caught within inaccessible areas",
      "Condition of the interior",
    ],
    conclusionHtml:
      "For these reasons, our service aims for <strong>up to 90% removal of accessible pet hair rather than guaranteeing 100% removal.</strong>",
    after:
      "Individual hairs may remain following treatment, particularly where hair is deeply embedded within carpet fibres or trapped in areas that cannot be safely accessed.",
  },

  /* ── Section 7 — Excessive pet hair ──────────────────────────────────── */
  excessive: {
    heading: "Excessive Pet Hair",
    title: "Heavily Contaminated Vehicles May Cost More",
    bodyHtml: [
      "The standard <strong>£20 Pet Hair Removal add-on is intended for vehicles with a normal to moderate amount of pet hair.</strong>",
      "Some vehicles can contain significantly more pet hair and require considerably more labour than can reasonably be included within a £20 add-on.",
    ],
    listLead: "Additional charges may apply where:",
    list: [
      "Pet hair is excessive throughout the vehicle",
      "Carpets are heavily covered",
      "Hair is deeply embedded within upholstery",
      "Multiple seats require intensive treatment",
      "The entire boot is heavily contaminated",
      "Pet hair has accumulated over a long period",
      "Considerably more time is required than a standard pet-hair treatment",
    ],
    important: {
      title: "Important",
      bodyHtml: [
        "<strong>If your vehicle has excessive or severely embedded pet hair, additional charges will apply based on the condition and additional time required.</strong>",
        "Where reasonably possible, this will be discussed with you <strong>before the additional work is carried out.</strong>",
      ],
      photos: "If you're unsure whether your vehicle would be considered excessive, send us photographs before your appointment.",
      whatsappLabel: "Send Photos on WhatsApp",
    },
  },

  /* ── Section 9 — Pet hair removal price ──────────────────────────────── */
  price: {
    heading: "Pet Hair Removal Price",
    /* "ONLY £20", set as a word and a number. */
    only: "Only",
    amount: "£20",
    when: "When Added to a Triton Interior Valet",
    bodyHtml: [
      "Pet Hair Removal is available as a <strong>£20 add-on</strong> to our Triton Interior Valet.",
      "It cannot be booked independently for £20.",
    ],
    /* "YOUR SERVICE — TRITON INTERIOR VALET + PET HAIR REMOVAL +£20 =
       COMPLETE INTERIOR VALET WITH ADDITIONAL PET HAIR TREATMENT". */
    sum: {
      label: "Your Service",
      base: "Triton Interior Valet",
      addOn: "Pet Hair Removal",
      addOnPrice: "+£20",
      result: "Complete Interior Valet With Additional Pet Hair Treatment",
    },
    bookLabel: "Book Triton + Pet Hair",
    excessive: {
      title: "Excessive Pet Hair",
      body: [
        "The £20 price applies to a standard level of pet hair.",
        "Vehicles with excessive, widespread or severely embedded pet hair may incur an additional charge based on the extra work and time required.",
      ],
    },
  },

  /* ── Section 10 — Why choose Medusa? ─────────────────────────────────── */
  whyMedusa: {
    heading: "Why Choose Medusa?",
    title: "Professional Mobile Interior Valeting",
    items: [
      {
        title: "We Come to You",
        bodyHtml: ["Our mobile technicians travel directly to your home or workplace within our London service area."],
      },
      {
        title: "Specialist Tools",
        bodyHtml: ["We use appropriate pet-hair removal tools and techniques alongside professional vacuuming."],
      },
      {
        title: "Interior Valet + Pet Hair",
        bodyHtml: [
          "Rather than simply removing some visible hair, the service is carried out alongside our Triton Interior Valet for a more comprehensive interior clean.",
        ],
      },
      {
        title: "Clear Pricing",
        bodyHtml: ["For a normal level of pet hair, simply add <strong>£20</strong> to your Triton Interior Valet."],
      },
      {
        title: "Realistic Results",
        bodyHtml: [
          "We don't promise that every individual hair will disappear.",
          "Instead, we aim for <strong>up to 90% removal of accessible pet hair</strong>, depending on the vehicle's condition.",
        ],
      },
      {
        title: "Professional Mobile Service",
        bodyHtml: ["Medusa Auto Detailing provides mobile car valeting and detailing throughout London."],
      },
    ],
    bookLabel: "Book Now",
  },

  /* ── Section 11 — FAQ ────────────────────────────────────────────────── */
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "How much does pet hair removal cost?",
        a: [
          "Pet Hair Removal costs <strong>£20 when added to a Triton Interior Valet</strong>.",
          "It cannot be booked as a standalone £20 service.",
          "Additional charges may apply for vehicles containing excessive or severely embedded pet hair.",
        ],
      },
      {
        q: "Can I book just Pet Hair Removal for £20?",
        a: [
          "No.",
          "Our £20 Pet Hair Removal service is an add-on and must be booked together with a Triton Interior Valet.",
        ],
      },
      {
        q: "Do you guarantee 100% pet hair removal?",
        a: [
          "No.",
          "We aim for <strong>up to 90% removal of accessible pet hair</strong>.",
          "The final result depends on the amount and type of hair, how deeply it is embedded and the type and condition of the vehicle's interior materials.",
        ],
      },
      {
        q: "Why can't you guarantee 100% removal?",
        a: [
          "Certain types of pet hair can become deeply embedded within automotive carpets and upholstery.",
          "Individual hairs can also become trapped underneath seats, between trim and in other areas that cannot be completely accessed during a valet.",
        ],
      },
      {
        q: "What happens if my car has a lot of dog hair?",
        a: [
          "Vehicles with excessive pet hair may require significantly more time and therefore incur an additional charge.",
          "If you're unsure, send us photographs before your appointment and our team can advise you.",
        ],
      },
      {
        q: "Is the boot included?",
        a: [
          "Accessible boot areas can be treated as part of the pet-hair service.",
          "If the boot is extremely heavily contaminated with pet hair, additional charges may apply.",
        ],
      },
      {
        q: "Does the £20 include the Triton Interior Valet?",
        a: [
          "No.",
          "The <strong>£20 is the additional charge for Pet Hair Removal</strong>.",
          `The <a href="${TRITON_PATH}">Triton Interior Valet</a> is charged separately at its normal price.`,
        ],
      },
      {
        q: "Do you remove dog hair and cat hair?",
        a: [
          "Yes.",
          "The service can be used for both dog and cat hair, although results vary depending on the type of hair and the material it has become embedded within.",
        ],
      },
      {
        q: "Will you remove pet hair underneath the seats?",
        a: [
          "We treat areas that can be safely accessed during the valet.",
          "We do not dismantle seats or interior components as part of the standard Pet Hair Removal add-on.",
        ],
      },
      {
        q: "Do you remove pet smells?",
        a: [
          "The £20 Pet Hair Removal add-on is specifically for <strong>pet hair</strong>.",
          /* ASSEMBLED — the brief's next two sentences are an instruction to
             the developer: "Do not advertise odour removal as being included
             within this £20 service. If the customer has a significant pet
             odour problem, direct them to the appropriate Medusa
             odour-treatment service/add-on." This is that direction, in the
             customer's second person, to the site's Odour Removal page. */
          'If you have a significant pet odour problem, please see our <a href="/car-interior-cleaning/odour-removal">Odour Removal</a> service.',
        ],
      },
    ],
  },

  /* ── Section 12 — Important service terms ────────────────────────────── */
  terms: {
    heading: "Important Service Terms",
    title: "Please Read Before Booking",
    lead: "The Pet Hair Removal add-on is designed to provide additional time and treatment for pet hair alongside a Triton Interior Valet.",
    listLead: "Please note:",
    list: [
      "Pet Hair Removal is £20 when added to a Triton Interior Valet.",
      "The £20 service cannot be booked independently.",
      "We aim for up to 90% removal of accessible pet hair.",
      "100% removal is not guaranteed.",
      "Results depend on the severity, type of hair and interior materials.",
      "Additional charges apply where pet hair is excessive or requires substantially more time than a standard treatment.",
      "Seats, carpets, trim or other interior components will not be dismantled to access trapped pet hair.",
    ],
    acknowledgement: "By booking the Pet Hair Removal add-on, the customer acknowledges these limitations.",
  },

  /* ── Section 13 — Final CTA ──────────────────────────────────────────── */
  finalCta: {
    heading: "Tired of Pet Hair All Over Your Car?",
    body: "Add our Pet Hair Removal service to your Triton Interior Valet and let Medusa tackle the stubborn hair your normal vacuum leaves behind.",
    card: {
      title: "Pet Hair Removal",
      price: "+£20",
      lines: [
        "When booked with a Triton Interior Valet",
        "Aim: Up to 90% Removal",
        "Excessive Pet Hair: Additional Charges May Apply",
      ],
    },
    bookLabel: "Book Triton + Pet Hair",
    whatsappLabel: "Send Photos on WhatsApp",
  },

  /* "MOBILE STICKY CTA — Use: BOOK TRITON + PET HAIR Rather than simply: BOOK
     PET HAIR REMOVAL. This reinforces that the £20 service is an add-on." */
  stickyLabel: "Book Triton + Pet Hair",
};
