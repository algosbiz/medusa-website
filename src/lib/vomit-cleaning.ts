/**
 * Content for /car-interior-cleaning/vomit-cleaning.
 *
 * **Every sentence here is the client's own**, transcribed from the brief they
 * sent on 2026-10-06 ("vomit cleaning.pdf", 20 pages): "This document
 * replaces/restructures the existing Vomit Cleaning page. KEEP EXISTING URL".
 * Its thirteen sections, FAQ and SEO strings are used as written — straight
 * apostrophes and all. What the brief addressed to the developer ("WEBSITE
 * DEVELOPER: …", the mobile requirements, the image-SEO table) is not copy and
 * is not on the page; it decided the layout instead.
 *
 * **One number is reconciled rather than transcribed**, and it is marked
 * `ASSEMBLED` below: the brief prices the XL car at £240 in its pricing
 * section and at £230 in three other places — the FAQ, the closing price list
 * and the booking-system list. The page cannot quote both, so it quotes the
 * three, from `XL_PRICE`, which is the one string to change if the client
 * says £240.
 *
 * **Section 12, the old page's DIY guide, is not in this file.** "The useful
 * educational/DIY information currently on the existing page can remain …
 * move it underneath" — so it stays in `pages.json`, word for word, and
 * `content/overrides.ts` carries it below the brief's own sections. `GUIDE`
 * here only names which of the old rows that is.
 *
 * Two sections are not built, both because the brief says what they need and
 * it does not exist yet:
 *
 *   - **Section 6, Before & After** — "Add genuine Medusa before-and-after
 *     images … when available. Do not use stock photographs and represent
 *     them as Medusa customer vehicles." There are none.
 *   - **The booking-system instructions** — four vehicle sizes, the "Where is
 *     the vomit/sickness located?" question, the incident date, the photo
 *     upload and the required acknowledgement checkbox all belong to
 *     book.medusaautodetailing.co.uk, which is not this repo — the same call
 *     `/vehicles/motorcycle-valeting-detailing` made of its brief's
 *     "BOOKING SYSTEM" section. The acknowledgement's substance is on this
 *     page regardless, in Section 7.
 */

import { BOOK_URL, CONTACT } from "@/lib/site";

export const SLUG = "car-interior-cleaning/vomit-cleaning";
export const PATH = `/${SLUG}`;

/**
 * ASSEMBLED — the XL price. £240 in the brief's Section 2, £230 in its FAQ,
 * its Section 13 price list and its booking-system list. Three of four, and
 * the booking system is what a customer is actually charged. Change it here
 * and every place on the page that names it follows.
 */
const XL_PRICE = "£230";

export type Photo = { src: string; alt: string; w: number; h: number };

/*
  The image-SEO table's filenames and alt text, on the photographs that fit
  them. All three are already the client's — they illustrate the site's own
  interior-cleaning posts of April 2026 — and none is presented as a
  particular customer's car. The table also names an ozone image and a before
  & after; neither exists, and the one fogging photograph the site has shows a
  technician inside the car, which is exactly what the brief's ozone step
  forbids, so it is the hero rather than the ozone picture.
*/
export const PHOTOS = {
  /* A Medusa technician treating a fabric interior. */
  hero: {
    src: "/assets/2026/10/car-vomit-cleaning-london.webp",
    alt: "Professional car vomit cleaning service in London",
    w: 1536,
    h: 1024,
  },
  /* Extraction on a dark fabric seat — beside the eight steps. */
  process: {
    src: "/assets/2026/10/car-seat-vomit-cleaning.webp",
    alt: "Professional cleaning and extraction of car upholstery",
    w: 1536,
    h: 1024,
  },
  /* Extraction on a light fabric seat — beside what's included. */
  extraction: {
    src: "/assets/2026/10/car-upholstery-extraction-london.webp",
    alt: "Car upholstery deep cleaning and extraction in London",
    w: 1536,
    h: 1024,
  },
} satisfies Record<string, Photo>;

export type Size = { name: string; short: string; price: string; examples: string };

/* Section 2's four sizes. "Examples:" is the label each line opens with in
   the brief; the page sets it as a label, so it is not repeated here. */
const SIZES: Size[] = [
  {
    name: "Small Car",
    short: "Small",
    price: "£180",
    examples: "Fiat 500, MINI Cooper, Toyota Yaris and similar-sized vehicles.",
  },
  {
    name: "Medium Car",
    short: "Medium",
    price: "£210",
    examples: "VW Golf, Audi A3, BMW 1 Series and similar-sized vehicles.",
  },
  {
    name: "Large Car",
    short: "Large",
    price: "£220",
    examples: "BMW 5 Series, Tesla Model S, Porsche Macan and similar-sized vehicles.",
  },
  {
    name: "XL Car",
    short: "XL",
    price: XL_PRICE,
    examples: "BMW X5, Volvo XC90, Porsche Cayenne and similar-sized vehicles.",
  },
];

export type Step = {
  title: string;
  body: string[];
  /** Step 7's own sub-section — the one step the brief writes a heading inside. */
  inner?: { title: string; body: string[]; emphasis: string };
};

export const VOMIT = {
  book: BOOK_URL,
  whatsapp: CONTACT.whatsapp,

  seo: {
    title: "Car Vomit Cleaning London | Ozone Treatment Included | Medusa",
    description:
      "Professional mobile car vomit cleaning in London from £180. Deep cleaning, extraction, odour treatment and ozone treatment included. We come to you.",
  },

  /* ── Section 1 — Hero ────────────────────────────────────────────────── */
  hero: {
    /* "USE ONE H1 ONLY." */
    h1: "Car Vomit Cleaning Service London",
    title: "Professional Vomit, Sickness & Odour Treatment — We Come to You",
    intro: [
      "Accidents happen. When someone has been sick inside a vehicle, simply wiping the area or using an air freshener is often not enough.",
      "Vomit can penetrate seats, carpets and other interior materials, potentially leaving behind staining, contamination and persistent unpleasant odours.",
    ],
    /* The brief's third paragraph, bold where the brief sets it bold. */
    serviceHtml:
      "Medusa Auto Detailing provides a professional mobile <strong>Vomit Cleaning &amp; Sanitisation Service</strong> across London, combining deep cleaning, extraction, appropriate sanitisation, professional odour treatment and <strong>ozone treatment</strong>.",
    from: "From £180",
    ticks: [
      "Deep Cleaning",
      "Shampoo & Extraction",
      "Steam Cleaning Where Suitable",
      "Odour Treatment",
      "Ozone Treatment Included",
      "Fully Mobile — We Come to You",
    ],
    bookLabel: "Book Vomit Cleaning",
    whatsappLabel: "Send Photos on WhatsApp",
  },

  /* ── Section 2 — Pricing ─────────────────────────────────────────────── */
  pricing: {
    heading: "Car Vomit Cleaning Prices",
    lead: "Our pricing is based on vehicle size and covers a standard vomit/sickness cleaning appointment.",
    examplesLabel: "Examples:",
    sizes: SIZES,
    bookLabel: "Book Now",
    note: {
      title: "Important Pricing Note",
      body: [
        "The above prices cover a standard vomit-cleaning appointment.",
        "Additional charges may apply for severe or widespread contamination, multiple affected areas, excessive soiling or contamination that has travelled into difficult-to-access areas.",
        "Where possible, please send us photographs of the affected area before booking so we can assess the condition.",
      ],
      whatsappLabel: "Send Photos on WhatsApp",
    },
  },

  /* ── Section 3 — What's included? ────────────────────────────────────── */
  included: {
    heading: "What's Included?",
    title: "One Complete Cleaning & Odour Treatment Service",
    lead: "Your Vomit Cleaning & Sanitisation Service includes:",
    ticks: [
      "Initial inspection of affected areas",
      "Removal of remaining surface contamination",
      "Deep cleaning of affected areas",
      "Shampoo and extraction where suitable",
      "Steam cleaning where suitable",
      "Cleaning of affected surrounding surfaces",
      "Professional odour treatment",
      "Ozone treatment included",
      "Final inspection",
      "Mobile service at your home or workplace",
    ],
    /* The one tick the brief sets in bold. */
    strong: "Ozone treatment included",
    after:
      "The exact cleaning method used will depend on the materials affected and the condition of the vehicle.",
  },

  /* ── Section 4 — Our vomit cleaning process ──────────────────────────── */
  process: {
    heading: "Our Vomit Cleaning Process",
    title: "How We Professionally Treat Vomit & Sickness Inside Your Vehicle",
    intro: [
      "Removing vomit from a vehicle isn't simply a matter of cleaning what can be seen.",
      "Liquids can penetrate upholstery, carpets and other absorbent materials. Our process therefore focuses on physically cleaning the source of the contamination before treating any remaining odour.",
    ],
    steps: [
      {
        title: "Inspection",
        body: [
          "Our technician begins by inspecting the affected area and surrounding interior.",
          "This allows us to identify the extent of the contamination, which materials have been affected and whether liquid appears to have travelled into surrounding areas.",
        ],
      },
      {
        title: "Removal of Contamination",
        body: [
          "Any remaining accessible surface contamination is carefully removed.",
          "The affected area is then prepared for deeper cleaning using a method appropriate for the material being treated.",
        ],
      },
      {
        title: "Deep Clean & Agitation",
        body: [
          "Professional interior-cleaning products are applied to the affected surfaces.",
          "Where appropriate, the area is carefully agitated to help loosen contamination, staining and residue trapped within the material.",
        ],
      },
      {
        title: "Shampoo & Extraction",
        body: [
          "Affected fabric seats, carpets and mats are shampooed and professionally extracted where suitable.",
          "Extraction helps remove contamination, residue and cleaning solution from within the fibres rather than simply cleaning the visible surface.",
          "Leather and other sensitive materials will be treated using an appropriate alternative cleaning method.",
        ],
      },
      {
        title: "Steam Cleaning",
        body: [
          "Suitable affected surfaces may be steam cleaned as part of the treatment process.",
          "Steam will only be used where our technician considers it safe and appropriate for the material being treated.",
        ],
      },
      {
        title: "Odour Treatment",
        body: [
          "Once the physical contamination has been cleaned, professional odour-treatment products are used on the affected areas where appropriate.",
          "Our aim is to treat the source of the smell rather than simply covering it with fragrance.",
        ],
      },
      {
        title: "Ozone Treatment",
        body: [],
        inner: {
          title: "Ozone Treatment Is Included as Standard",
          body: [
            "After the physical cleaning process has been completed, the unoccupied vehicle receives an ozone treatment to help treat residual odours within the cabin.",
            "No customers, technicians, pets or other occupants are permitted inside the vehicle while ozone treatment is taking place.",
            "The vehicle is ventilated following treatment before being returned to normal use.",
          ],
          emphasis:
            "Ozone is an additional odour-treatment stage and does not replace physically cleaning the source of the contamination.",
        },
      },
      {
        title: "Final Inspection",
        body: [
          "Our technician carries out a final inspection of the treated areas.",
          "Where applicable, you will also be advised about drying, ventilation and any further recommendations following the appointment.",
        ],
      },
    ] as Step[],
  },

  /* ── Section 5 — Why we include ozone treatment ──────────────────────── */
  ozone: {
    heading: "Why We Include Ozone Treatment",
    title: "Cleaning the Visible Stain Isn't Always Enough",
    body: [
      "One of the most difficult problems following sickness inside a vehicle can be the odour left behind.",
      "Even when visible contamination has been removed, odours may remain within absorbent interior materials and other areas of the cabin.",
    ],
    standardHtml:
      "That's why <strong>ozone treatment is included as standard with our Vomit Cleaning &amp; Sanitisation Service.</strong>",
    notJust: "We don't simply put an ozone machine inside a dirty vehicle and hope it removes the smell.",
    orderLead: "Our process follows the correct order:",
    /* "REMOVE → DEEP CLEAN → EXTRACT → TREAT → OZONE → VENTILATE" */
    flow: ["Remove", "Deep Clean", "Extract", "Treat", "Ozone", "Ventilate"],
    after:
      "Physical cleaning comes first. Ozone treatment is then used as an additional treatment for residual cabin odours.",
  },

  /* ── Section 7 — Important odour & stain removal disclaimer ──────────── */
  disclaimer: {
    heading: "Important Odour & Stain Removal Disclaimer",
    title: "Please Read Before Booking",
    leadHtml:
      "While our Vomit Cleaning &amp; Sanitisation Service includes professional deep cleaning, extraction, odour treatment and ozone treatment, <strong>complete removal of all stains and odours cannot be guaranteed.</strong>",
    factorsLead: "The final result can depend on circumstances outside of our control, including:",
    factors: [
      "How long the vomit has been present before treatment",
      "The type and amount of contamination",
      "Previous cleaning products or chemicals used on the affected area",
      "The material and condition of the affected upholstery or carpet",
      "Liquid penetrating deep into seat foam",
      "Liquid reaching carpet underlay or sound insulation",
      "Contamination travelling underneath seats, trim or panels",
      "Contamination entering difficult or inaccessible areas",
      "Contamination entering air vents or the vehicle's ventilation system",
      "Existing stains or odours that were present before our service",
      "Areas that cannot be safely accessed without dismantling parts of the vehicle",
    ],
    effort:
      "Our technicians will make every reasonable effort to achieve the best possible result using professional cleaning, extraction and odour-treatment methods.",
    paymentHtml:
      "However, <strong>payment is for the professional cleaning and treatment service carried out and is not conditional upon complete stain or odour removal.</strong>",
    notes: [
      {
        title: "Ozone Treatment",
        bodyHtml: [
          "Ozone treatment is included to assist with residual odours. However, <strong>ozone treatment does not guarantee permanent or complete odour removal</strong>, particularly where the original source of an odour remains within inaccessible materials or components.",
        ],
      },
      {
        title: "Inaccessible Contamination",
        bodyHtml: [
          "If vomit or liquid has penetrated underneath carpets, deeply into seat foam, behind trim or into another inaccessible area, cleaning the visible surface may not completely eliminate the source.",
          "In some circumstances, further specialist work, dismantling or replacement of affected components may be required.",
          "This is <strong>not included</strong> within the standard Vomit Cleaning &amp; Sanitisation Service.",
        ],
      },
      {
        title: "Cabin/Pollen Filter",
        bodyHtml: [
          "Where a persistent odour remains or contamination may have affected the vehicle's ventilation system, we may recommend replacing the vehicle's cabin/pollen filter.",
          "Cabin-filter replacement is not included within the standard service.",
        ],
      },
    ],
    acknowledgement: {
      title: "Customer Acknowledgement",
      body: "By booking this service, the customer acknowledges that stain and odour-removal results can vary and that Medusa Auto Detailing cannot guarantee complete removal where circumstances are outside of our reasonable control.",
    },
  },

  /* ── Section 8 — Severe or widespread contamination ──────────────────── */
  severe: {
    heading: "Severe or Widespread Contamination",
    title: "Please Send Us Photos Before Booking",
    lead: "If the contamination is extensive, please send us clear photographs before booking.",
    listLead: "Additional charges may apply where:",
    list: [
      "Vomit has spread across multiple areas",
      "Multiple seats are affected",
      "Large sections of carpet are affected",
      "Contamination has travelled underneath seats",
      "Contamination has entered difficult-to-access areas",
      "The vehicle has excessive additional interior soiling",
      "There have been multiple separate sickness incidents",
      "Additional cleaning time is required beyond a standard appointment",
    ],
    after: "Where reasonably possible, we will advise you of additional charges before carrying out additional work.",
    whatsappLabel: "Send Photos on WhatsApp",
  },

  /* ── Section 9 — Why choose Medusa Auto Detailing? ───────────────────── */
  why: {
    heading: "Why Choose Medusa Auto Detailing?",
    title: "Professional Mobile Interior Cleaning Across London",
    items: [
      {
        icon: "van",
        title: "We Come to You",
        body: [
          "There's no need to drive a contaminated vehicle to a detailing centre.",
          "Our mobile technicians travel directly to your home or workplace within our London service area.",
        ],
      },
      {
        icon: "gauge",
        title: "Professional Equipment",
        body: [
          "We use professional interior-cleaning equipment and products to tackle difficult interior contamination.",
        ],
      },
      {
        icon: "droplet",
        title: "Deep Cleaning",
        body: [
          "We don't simply wipe the visible area and spray an air freshener.",
          "The service is designed to physically clean and extract affected materials where possible.",
        ],
      },
      {
        icon: "spark",
        title: "Ozone Included",
        body: ["Ozone treatment is included as the final odour-treatment stage following physical cleaning."],
      },
      {
        icon: "star",
        title: "Experienced Mobile Valeting Team",
        body: [
          "Medusa Auto Detailing provides professional mobile car valeting and detailing services throughout London.",
        ],
      },
      {
        icon: "shield",
        title: "Fully Insured",
        body: ["Your vehicle is being treated by a professional mobile valeting and detailing company."],
      },
    ],
    bookLabel: "Book Now",
  },

  /* ── Section 10 — Customer reviews ───────────────────────────────────── */
  reviews: {
    /* "SECTION 10 — CUSTOMER REVIEWS" is the brief's label for the section,
       not a heading for it; this is. The quotes are the site's own four,
       word for word — "Do not alter the wording of genuine customer
       reviews" — and none is presented as a vomit-cleaning review. */
    heading: "Trusted By Customers Across London",
    /* "★★★★★ Rated by Medusa Auto Detailing customers [SEE OUR REVIEWS]". */
    rating: "Rated by Medusa Auto Detailing customers",
    cta: {
      label: "See Our Reviews",
      /* The reviews page the WordPress site linked its Facebook review
         badge to, on every location page and the homepage. The brief asks
         for Google reviews; no Google Business Profile link exists anywhere
         on the site or in the mirror to point at. */
      href: "https://www.facebook.com/medusadetailing/reviews/",
    },
  },

  /* ── Section 11 — FAQ ────────────────────────────────────────────────── */
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "How much does car vomit cleaning cost?",
        a: [
          "Our Vomit Cleaning &amp; Sanitisation Service starts from <strong>£180</strong>.",
          `Small cars are £180, medium cars £210, large cars £220 and XL vehicles ${XL_PRICE}.`,
          "Additional charges may apply for severe or widespread contamination or where additional cleaning time is required.",
        ],
      },
      {
        q: "Is ozone treatment included?",
        a: [
          "Yes.",
          "Ozone treatment is included as standard within our Vomit Cleaning &amp; Sanitisation Service and is carried out after the physical cleaning and odour-treatment process.",
        ],
      },
      {
        q: "Will you shampoo the affected seat or carpet?",
        a: [
          "Where appropriate, affected fabric upholstery, carpets and mats will be shampooed and professionally extracted.",
          "Leather and other sensitive materials will be treated using an appropriate alternative cleaning method.",
        ],
      },
      {
        q: "Can you guarantee the vomit smell will completely disappear?",
        a: [
          "No.",
          "Although we use professional cleaning, extraction, odour treatment and ozone treatment, <strong>complete odour removal cannot be guaranteed.</strong>",
          "The result can depend on how long the contamination has been present, how deeply it has penetrated and whether it has reached inaccessible materials or components.",
        ],
      },
      {
        q: "Can you guarantee all stains will come out?",
        a: [
          "No.",
          "We will make every reasonable effort to remove or improve staining, but complete stain removal cannot be guaranteed.",
          "Results depend on factors including the affected material, severity of staining, how long it has been present and any products previously used on the area.",
        ],
      },
      {
        q: "Do you just use an ozone machine?",
        a: [
          "No.",
          "Ozone is only one stage of our process.",
          "We first physically remove accessible contamination, deep clean the affected areas and extract applicable fabrics before carrying out odour treatment and ozone treatment.",
        ],
      },
      {
        q: "What if the vomit has soaked into the seat?",
        a: [
          "We will professionally clean and extract the affected upholstery where appropriate.",
          "However, if liquid has penetrated deeply into the internal seat foam, complete odour removal may not always be possible without further specialist work or component replacement.",
        ],
      },
      {
        q: "What if the vomit has gone underneath the carpet?",
        a: [
          "Please send us photographs before booking.",
          "Contamination underneath fixed carpets, trim or other inaccessible areas may require dismantling or additional specialist work that isn't included within our standard service.",
        ],
      },
      {
        q: "Should I clean anything before you arrive?",
        a: [
          "If the incident has just occurred, safely removing excess material and blotting excess liquid can help prevent further penetration.",
          "Avoid aggressively rubbing the area or applying strong household chemicals.",
        ],
      },
      {
        q: "Do you replace the cabin filter?",
        a: [
          "Cabin/pollen filter replacement is not included within our standard service.",
          "If a persistent odour remains or we believe the ventilation system may be contributing to the smell, we may recommend having the filter replaced.",
        ],
      },
      {
        q: "Can I use the vehicle immediately after ozone treatment?",
        a: [
          "The vehicle must remain completely unoccupied during ozone treatment and must be properly ventilated afterwards.",
          "Our technician will advise you when the treatment has finished and the vehicle is ready for normal use.",
        ],
      },
      {
        q: "Do you come to my home?",
        a: [
          "Yes.",
          "Medusa Auto Detailing provides a mobile service throughout our London service area. We can carry out the service at your home, workplace or another suitable location.",
        ],
      },
    ],
  },

  /* ── Section 13 — Final CTA ──────────────────────────────────────────── */
  finalCta: {
    heading: "Need Vomit Cleaned From Your Car?",
    body: [
      "Don't simply cover the smell with an air freshener.",
      "Have the affected area professionally cleaned, extracted and treated by Medusa Auto Detailing.",
    ],
    listTitle: "Vomit Cleaning & Sanitisation",
    ozone: "Ozone Treatment Included",
    bookLabel: "Book Online",
    whatsappLabel: "Send Photos on WhatsApp",
  },
};

/**
 * Section 12 — the old page's own DIY guide, which "can remain for SEO
 * purposes, but move it underneath the commercial service, pricing, process,
 * disclaimer and FAQ sections". `content/overrides.ts` keeps exactly these
 * rows of the mirror page, in this order, and throws if one has gone.
 *
 * The old page's other rows are not kept. Its h1 is replaced ("USE ONE H1
 * ONLY"), and its "When to Consider Professional…", "Expert Car Vomit Cleaning
 * Services", "Why Choose Medusa Auto Detailing?" and "…Near You" rows are the
 * commercial copy the brief's Sections 1, 9 and 13 now write — and they
 * promise what the brief's "wording to avoid" forbids: "ensuring effective
 * stain and odour removal", "ensuring no lingering odours", "your vehicle is
 * restored to its pristine condition". So is the second paragraph of the old
 * opener, for the same reason.
 */
export const GUIDE = {
  /* The old opener's h2, over the two of its three paragraphs that introduce
     the guide rather than sell the service. */
  heading: "The Complete Process",
  intro: [
    "Dealing with vomit in your car isn’t just about removing stains",
    "Here’s a step-by-step guide to help you handle the situation",
  ],
  topics: [
    "Safety First",
    "Preparing for the Cleanup",
    "The Step-by-Step Cleaning Process",
    "Special Considerations for Different Interior Materials",
  ],
};
