/**
 * Content for /car-interior-cleaning/odour-removal.
 *
 * **Every sentence here is the client's own**, transcribed from the brief they
 * sent on 2026-10-06 ("car odou.pdf", 29 pages): "Replace/re-optimise the
 * existing Odour Removal page using the content below. KEEP EXISTING URL".
 * Its sixteen sections, FAQ and SEO strings are used as written — straight
 * apostrophes, and bold wherever the brief sets a phrase in bold. What the
 * brief addressed to the developer ("WEBSITE DEVELOPER: …", the recommended
 * layout, the image-SEO table, the internal-linking and sticky-CTA notes, the
 * "remove from current page" list) is not copy; it decided the layout.
 *
 * The brief's headline change is that the service is no longer sold on its
 * own: "Odour Treatment cannot be booked as a standalone service" — it is an
 * add-on to the Triton Interior, Zeus Full or Medusa Gold valet, at +£60,
 * +£90 or +£100 by severity, and "complete or permanent odour removal cannot
 * be guaranteed". Nothing of the old page survives: it promised to
 * "eliminate viruses, germs, and unpleasant odors", called ozone "one of the
 * most powerful sterilants available" and was titled "Odour Removal &
 * Disinfection" — all on the brief's list of wording to remove.
 *
 * **One string is reconciled rather than transcribed**, marked `ASSEMBLED`:
 * the h1. Section 1 writes "H1: Car Odour Treatment & Ozone Treatment London";
 * the SEO section writes "H1: Car Odour & Ozone Treatment London. Use ONE H1
 * only." — and the recommended layout's hero reads "CAR ODOUR & OZONE
 * TREATMENT". Two of three, and the one the SEO section owns.
 *
 * Two parts of the brief are not built here, because what they need is not
 * this repo's:
 *
 *   - **The booking-system instructions** — the three optional extras on each
 *     valet, the four questions about the smell, the photo upload and the
 *     required checkbox all belong to book.medusaautodetailing.co.uk, as the
 *     earlier briefs' did. The checkbox's substance is on this page in
 *     Section 15, and the extras' information text is on each valet's own
 *     add-on card (`VALET_EXTRA`).
 *   - **Section 13's reviews** are "genuine Medusa reviews … Prioritise reviews
 *     mentioning interior cleaning, odour improvement …": the site has four,
 *     none of them about odours, and they are shown word for word.
 */

import { BOOK_URL, CONTACT } from "@/lib/site";

export const SLUG = "car-interior-cleaning/odour-removal";
export const PATH = `/${SLUG}`;

/**
 * The three valets the treatment can be added to, and where each is sold.
 * "This page should link to: Triton Interior Valet, Zeus Full Valet, Medusa
 * Gold Valet". Medusa Gold has no page of its own — it is a package on
 * `/car-valeting`, in that page's tabs and table — so that is where it links.
 */
export const VALETS = {
  triton: { name: "Triton Interior Valet", href: "/car-interior-cleaning/interior-valet" },
  zeus: { name: "Zeus Full Valet", href: "/car-valeting/premium-full-valet" },
  gold: { name: "Medusa Gold Valet", href: "/car-valeting" },
} as const;

export const VOMIT_PATH = "/car-interior-cleaning/vomit-cleaning";
export const MOULD_PATH = "/car-interior-cleaning/mould-removal";

/**
 * The valets' side of the internal linking: "these three main valet pages
 * should also link back to this page from their optional extras: Odour &
 * Ozone Treatment — From +£60". `content/overrides.ts` renames each page's
 * odour add-on card to the brief's name, prices it "From £60" (it was a flat
 * £60, and there are three treatments now), links it here, and replaces its
 * description — which promised to remove "bacteria and viruses", on the
 * brief's list of claims to remove — with the brief's own lines for the same
 * optional extras in the booking flow.
 */
export const VALET_EXTRA = {
  title: "Odour & Ozone Treatment",
  price: "From £60",
  /* The FAQ's own three lines, and the booking flow's information text. */
  body: [
    "Mild — +£60 / 15 minutes<br>Moderate — +£90 / 30 minutes<br>Strong — +£100 / 60 minutes",
    "Odour treatment results vary. Complete or permanent odour removal cannot be guaranteed.",
  ],
};

export type Photo = { src: string; alt: string; w: number; h: number };

/*
  The image-SEO table's filenames and alt text, on the photographs that fit
  them. All three are already the client's: the ozone machine is the picture
  the homepage's own odour card has carried since 2024, and the other two
  illustrate the site's April 2026 post on summer car smells. None is
  captioned as a particular customer's car. The table also names a smoke and
  a pet photograph; neither exists, so the odour types are drawn as icons
  rather than faked. The air-vent close-up is the old page's own picture
  ("Car AC"), beside the cabin filter section.
*/
export const PHOTOS = {
  /* Extraction on a fabric seat — "Professional Interior Cleaning First". */
  hero: {
    src: "/assets/2026/10/car-odour-treatment-london.webp",
    alt: "Professional car odour treatment in London",
    w: 1536,
    h: 1024,
  },
  /* An ozone generator on the seat of an empty car. */
  ozone: {
    src: "/assets/2026/10/car-ozone-treatment-london.webp",
    alt: "Professional ozone treatment for car interior",
    w: 600,
    h: 400,
  },
  /* A littered interior — what has to be cleaned before any treatment. */
  interior: {
    src: "/assets/2026/10/car-interior-odour-cleaning.webp",
    alt: "Car interior cleaning before odour treatment",
    w: 1536,
    h: 1024,
  },
  vent: {
    src: "/assets/2024/10/Car-AC.webp",
    alt: "Car AC",
    w: 416,
    h: 303,
  },
} satisfies Record<string, Photo>;

export type Tier = {
  name: string;
  short: string;
  price: string;
  minutes: number;
  duration: string;
  lead: string;
  examples: string[];
  bookLabel: string;
};

export type Step = {
  title: string;
  flow: string;
  body: string[];
  /** A list the brief sets inside the step, and what it writes after it. */
  list?: { lead: string; items: string[] };
  after?: string[];
};

const MUST_ADD = "Must be added to Triton Interior Valet, Zeus Full Valet or Medusa Gold Valet.";

export const ODOUR = {
  book: BOOK_URL,
  whatsapp: CONTACT.whatsapp,

  seo: {
    title: "Car Odour Removal London | Ozone Treatment | Medusa",
    description:
      "Professional car odour and ozone treatment in London. Add to a Triton Interior, Zeus Full or Medusa Gold Valet. Treatments from £60. Mobile service.",
  },

  /**
   * "MOST IMPORTANT CUSTOMER MESSAGE — The customer should understand these
   * four points almost immediately". The hero's first panel under the h1,
   * with "FROM +£60 · ADD-ON TO SELECTED VALETS" from the recommended layout
   * as its price; the closing card repeats them.
   */
  points: {
    price: { label: "From", value: "+£60", caption: "Add-On to Selected Valets" },
    addOn: "Ozone / Odour Treatment Is an Add-On",
    requires: "It Requires Triton, Zeus or Medusa Gold",
    guarantee: "Complete or Permanent Smell Removal Is Not Guaranteed",
  },

  /* ── Section 1 — Hero ────────────────────────────────────────────────── */
  hero: {
    /* ASSEMBLED — see the note at the top of this file. */
    h1: "Car Odour & Ozone Treatment London",
    title: "Professional Treatment for Unwanted Car Interior Smells",
    intro: [
      "Struggling with an unpleasant smell inside your vehicle?",
      "Smoke, pets, food, drink spillages and other sources can leave odours trapped within upholstery, carpets and other areas of a vehicle's interior.",
      "Medusa Auto Detailing offers professional <strong>car odour and ozone treatment as an add-on to selected interior valeting packages</strong>, allowing us to clean the vehicle first before treating residual odours.",
    ],
    card: {
      title: "Ozone Odour Treatment From £60",
      ticks: [
        "Professional Interior Cleaning First",
        "Ozone Treatment",
        "Treatment Based on Odour Severity",
        "Air Circulation Treatment",
        "Mobile Service Across London",
      ],
      withLabel: "Available With:",
      note: "Odour Treatment cannot be booked as a standalone service.",
    },
    bookLabel: "Book a Valet + Odour Treatment",
    whatsappLabel: "WhatsApp Us",
  },

  /* ── Section 2 — Important: why odour treatment is an add-on ─────────── */
  addOn: {
    heading: "Important: Why Odour Treatment Is an Add-On",
    title: "We Treat the Interior Before Treating the Smell",
    body: [
      "An ozone machine should not be treated as a substitute for cleaning the source of an odour.",
      "If milk has soaked into a carpet, pet contamination remains within upholstery or another source is still present inside the vehicle, simply treating the air may not resolve the underlying problem.",
    ],
    packagesLeadHtml:
      "For this reason, our Odour &amp; Ozone Treatment is available as an <strong>add-on to one of the following Medusa valeting packages:</strong>",
    packages: [
      { valet: "triton", body: "For customers primarily requiring interior cleaning and odour treatment." },
      {
        valet: "zeus",
        body: "For customers who want their interior and exterior professionally valeted together with additional odour treatment.",
      },
      {
        valet: "gold",
        body: "For customers choosing our premium valeting service together with additional odour treatment.",
      },
    ] as { valet: keyof typeof VALETS; body: string }[],
    howHeading: "How It Works",
    how: ["Book Your Valet", "Add Odour & Ozone Treatment", "We Clean the Interior", "We Treat the Residual Odour"],
    bookLabel: "Book Now",
  },

  /* ── Section 3 — Choose your odour treatment ─────────────────────────── */
  tiers: {
    heading: "Choose Your Odour Treatment",
    title: "Treatment Based on Odour Severity",
    examplesLabel: "Examples may include:",
    mustAdd: MUST_ADD,
    items: [
      {
        name: "Mild Odour",
        short: "Mild",
        price: "+£60",
        minutes: 15,
        duration: "15-Minute Ozone Treatment",
        lead: "Suitable for lighter, less persistent interior odours.",
        examples: ["Light food smells", "Mild stale smells", "Minor pet odours", "General unwanted interior smells"],
        bookLabel: "Add Mild Odour Treatment",
      },
      {
        name: "Moderate Odour",
        short: "Moderate",
        price: "+£90",
        minutes: 30,
        duration: "30-Minute Ozone Treatment",
        lead: "Designed for more noticeable or persistent odours requiring additional treatment time.",
        examples: [
          "More noticeable pet smells",
          "Food and drink odours",
          "Persistent stale smells",
          "Moderate smoke-related odours",
        ],
        bookLabel: "Add Moderate Odour Treatment",
      },
      {
        name: "Strong Odour",
        short: "Strong",
        price: "+£100",
        minutes: 60,
        duration: "60-Minute Ozone Treatment",
        lead: "Our longest standard treatment for stronger or more persistent interior odours.",
        examples: [
          "Strong pet smells",
          "Cigarette/tobacco smells",
          "Persistent food or drink odours",
          "Heavily affected interiors",
        ],
        bookLabel: "Add Strong Odour Treatment",
      },
    ] as Tier[],
    unsure: {
      title: "Not Sure Which One You Need?",
      body: [
        "Send us a message describing the smell, how long it has been present and what you believe caused it.",
        "Our team can recommend the most appropriate option.",
      ],
      whatsappLabel: "WhatsApp Us",
    },
  },

  /* ── Section 4 — Our car odour treatment process ─────────────────────── */
  process: {
    heading: "Our Car Odour Treatment Process",
    title: "How We Treat Unwanted Interior Smells",
    lead: "Our approach focuses on cleaning first and treating residual odours afterwards.",
    /* `flow` is the recommended layout's own label for each step:
       "INSPECT → CLEAN → TARGET SOURCE → OZONE → CIRCULATE → VENTILATE". */
    steps: [
      {
        title: "Interior Inspection",
        flow: "Inspect",
        body: [
          "Our technician assesses the vehicle interior and, where possible, identifies the likely source of the odour.",
        ],
        list: {
          lead: "We may ask:",
          items: [
            "What caused the smell?",
            "How long has it been present?",
            "Has anything been spilled?",
            "Has the vehicle previously been cleaned?",
            "Is the smell stronger when the vehicle is warm?",
            "Does the smell appear when the ventilation system is running?",
          ],
        },
        after: [
          "Identifying the source is important because some odours cannot be successfully addressed by ozone alone.",
        ],
      },
      {
        title: "Interior Valet",
        flow: "Clean",
        body: [
          "Your selected: <strong>Triton Interior Valet, Zeus Full Valet or Medusa Gold Valet</strong> is carried out.",
          "The exact cleaning process depends on the package booked.",
          "Cleaning the interior first helps remove dirt, contamination and potential sources of unwanted smells before ozone treatment begins.",
        ],
      },
      {
        title: "Target the Source Where Accessible",
        flow: "Target Source",
        body: [
          "Where an obvious and accessible source of the odour is identified, it is treated as part of the applicable cleaning service where that treatment falls within the scope of the package booked.",
          "If specialist contamination cleaning or additional work is required, this may need to be quoted separately.",
        ],
      },
      {
        title: "Ozone Treatment",
        flow: "Ozone",
        body: [
          "Once the appropriate interior cleaning has been completed, the vehicle undergoes the selected ozone treatment.",
        ],
        list: {
          lead: "Treatment duration:",
          items: ["Mild — 15 minutes", "Moderate — 30 minutes", "Strong — 60 minutes"],
        },
        after: ["The vehicle must remain completely unoccupied during ozone treatment."],
      },
      {
        title: "Air Circulation",
        flow: "Circulate",
        body: [
          "Where appropriate, the vehicle's ventilation system may be operated on recirculation during part of the treatment process to circulate treated air through the cabin.",
        ],
      },
      {
        title: "Ventilation",
        flow: "Ventilate",
        body: [
          "Following treatment, the vehicle is ventilated before normal use.",
          "Our technician will advise the customer when the treatment has been completed and provide any relevant aftercare information.",
        ],
      },
    ] as Step[],
  },

  /* ── Section 5 — What types of odours can we treat? ──────────────────── */
  types: {
    heading: "What Types of Odours Can We Treat?",
    title: "Treatment for a Range of Unwanted Vehicle Smells",
    lead: "Our service may be suitable for treating residual odours associated with:",
    items: [
      { name: "Pets", items: ["Dog smells", "Wet-dog smells", "General pet odours"] },
      { name: "Smoke", items: ["Cigarette smoke", "Tobacco smells", "Stale smoke odours"] },
      { name: "Food & Drink", items: ["Food smells", "Coffee", "Tea", "Milk", "Drink spillages"] },
      {
        name: "General Interior Odours",
        items: ["Stale smells", "Previous-owner smells", "Long-standing interior odours", "Unidentified smells"],
      },
    ],
    specialist: {
      title: "Specialist Contamination",
      bodyHtml:
        "Vomit, urine, faeces, blood, mould and other significant contamination may require a <strong>specialist cleaning service rather than a standard odour-treatment add-on.</strong>",
      unsure: "If you're unsure, contact us before booking.",
      ctaLabel: "Ask Medusa",
    },
  },

  /* ── Section 6 — Important: odour removal is not guaranteed ──────────── */
  guarantee: {
    heading: "Important: Odour Removal Is Not Guaranteed",
    title: "Please Read Before Booking",
    leadHtml:
      "Although our service combines professional interior cleaning with ozone treatment, <strong>Medusa Auto Detailing cannot guarantee complete or permanent removal of any smell or odour.</strong>",
    body: "Some odours are caused by circumstances that cannot be fully resolved through valeting or ozone treatment.",
    factorsLead: "The final result can depend on factors including:",
    factors: [
      "The original source of the smell",
      "How long the odour has been present",
      "Severity of the contamination",
      "Whether liquids have penetrated underneath carpets",
      "Contamination inside seat foam",
      "Contamination within carpet underlay",
      "Odours trapped within the headliner",
      "Contamination behind interior trim",
      "Odours originating from air-conditioning or ventilation components",
      "A contaminated cabin/pollen filter",
      "Damp or water ingress",
      "Mould in inaccessible areas",
      "Previous smoking inside the vehicle",
      "Previous cleaning products or treatments",
      "Mechanical issues creating an odour",
      "Contamination in areas that cannot be safely accessed during a valet",
    ],
    commitment: {
      title: "Our Commitment",
      body: "Our technicians will make every reasonable effort to achieve the best possible result using the cleaning and treatment services booked.",
      however: "However:",
      statement: "Complete odour removal cannot be guaranteed.",
      paymentHtml:
        "Payment is for the professional cleaning and treatment service carried out and <strong>is not conditional upon the smell being completely or permanently removed.</strong>",
    },
  },

  /* ── Section 7 — Why can a smell return? ─────────────────────────────── */
  returns: {
    heading: "Why Can a Smell Return?",
    title: "Sometimes the Source Is Deeper Than the Surface",
    lead: "A vehicle can look completely clean while an odour source remains hidden underneath or inside another component.",
    listLead: "For example, liquid may have travelled:",
    list: [
      "Through the carpet into the underlay",
      "Deep into seat foam",
      "Underneath fixed interior trim",
      "Into inaccessible cavities",
      "Into ventilation components",
    ],
    body: [
      "Similarly, long-term cigarette smoke can affect numerous interior materials rather than one single surface.",
      "If the underlying source remains, an odour may reduce significantly following treatment and later become noticeable again.",
    ],
    strong: "This does not necessarily mean the ozone treatment or valet was carried out incorrectly.",
    after: "It can indicate that the underlying source requires additional specialist work or replacement of an affected component.",
  },

  /* ── Section 8 — Cabin / pollen filter ───────────────────────────────── */
  filter: {
    heading: "Cabin / Pollen Filter",
    title: "Sometimes Your Cabin Filter Needs Replacing",
    body: [
      "The vehicle's cabin or pollen filter can sometimes retain unwanted smells.",
      "If the filter is contaminated, treating the rest of the interior may not completely resolve the problem.",
      "Where appropriate, we may recommend that the customer has the cabin/pollen filter replaced.",
    ],
    important: {
      title: "Important",
      strong: "Cabin/pollen filter replacement is not included within our standard Odour & Ozone Treatment.",
      body: "Medusa cannot guarantee odour removal where a contaminated filter or another untreated vehicle component continues to produce the smell.",
    },
  },

  /* ── Section 9 — Specialist contamination ────────────────────────────── */
  specialist: {
    heading: "Specialist Contamination",
    title: "Some Smells Require More Than an Odour Add-On",
    lead: "Certain problems require the physical source to be professionally cleaned rather than simply adding a longer ozone treatment.",
    items: [
      {
        title: "Vomit / Sickness",
        bodyHtml: `Book or enquire about our specialist <a href="${VOMIT_PATH}">Vomit Cleaning &amp; Sanitisation</a> service.`,
      },
      {
        title: "Mould",
        bodyHtml: `Book or enquire about our <a href="${MOULD_PATH}">Mould Removal &amp; Sanitisation</a> service.`,
      },
      {
        title: "Urine / Bodily Fluids",
        bodyHtml: "Contact us with photographs and details so we can determine the appropriate service.",
      },
      {
        title: "Major Spillages",
        bodyHtml:
          "Milk, food, drink or other liquids that have heavily penetrated carpets or seats may require additional extraction or specialist cleaning.",
      },
    ],
    important: {
      title: "Important",
      body: "Ozone treatment is not a substitute for physically removing accessible contamination.",
    },
    ctaLabel: "Contact Us",
    /* Not this brief's: the flooded car brief of the same day asks "The
       Mould Removal and Odour pages [to] link back where appropriate using:
       Flooded Car & Water Damage Cleaning" — and water damage is specialist
       contamination of exactly this kind. */
    related: { label: "Flooded Car & Water Damage Cleaning", href: "/car-interior-cleaning/flooded-car-cleaning" },
  },

  /* ── Section 10 — Which valet should I add it to? ────────────────────── */
  selector: {
    heading: "Which Valet Should I Add It To?",
    title: "Choose Your Main Valeting Package",
    bestFor: "Best for:",
    items: [
      {
        valet: "triton",
        bestFor: "Customers primarily concerned with the inside of their vehicle.",
        body: "Book your Triton Interior Valet and select the appropriate Odour & Ozone Treatment as an optional extra.",
        bookLabel: "Book Triton",
      },
      {
        valet: "zeus",
        bestFor: "Customers wanting both their interior and exterior professionally cleaned.",
        body: "Add your required odour treatment during booking.",
        bookLabel: "Book Zeus",
      },
      {
        valet: "gold",
        bestFor: "Customers choosing our premium valeting package who also have an unwanted interior smell.",
        body: "Select the Odour & Ozone Treatment as an add-on.",
        bookLabel: "Book Medusa Gold",
      },
    ] as { valet: keyof typeof VALETS; bestFor: string; body: string; bookLabel: string }[],
  },

  /* ── Section 11 — Pricing ────────────────────────────────────────────── */
  pricing: {
    heading: "Pricing",
    title: "Odour & Ozone Treatment Add-Ons",
    columns: ["Odour Level", "Ozone Treatment", "Add-On Price"],
    rows: [
      ["Mild", "15 minutes", "+£60"],
      ["Moderate", "30 minutes", "+£90"],
      ["Strong", "60 minutes", "+£100"],
    ],
    important: {
      title: "Important",
      bodyHtml: [
        "These prices are for the <strong>Odour &amp; Ozone Treatment add-on only</strong>.",
        "The Triton Interior Valet, Zeus Full Valet or Medusa Gold Valet is charged separately.",
        "Odour Treatment cannot be booked independently.",
      ],
    },
    bookLabel: "Book Valet + Odour Treatment",
  },

  /* ── Section 12 — Why choose Medusa? ─────────────────────────────────── */
  why: {
    heading: "Why Choose Medusa?",
    title: "Professional Mobile Car Odour Treatment Across London",
    items: [
      {
        title: "Clean First",
        body: [
          "We don't position ozone as a replacement for proper interior cleaning.",
          "Your selected Medusa valet is completed before the additional odour treatment.",
        ],
      },
      {
        title: "Treatment Options",
        body: ["Choose between 15, 30 and 60-minute ozone treatments according to the severity of the odour."],
      },
      {
        title: "Realistic Expectations",
        body: ["We don't promise something that may be outside our control.", "Complete odour removal cannot be guaranteed."],
      },
      {
        title: "Mobile Service",
        body: ["Our technicians travel directly to suitable homes and workplaces throughout our London service area."],
      },
      {
        title: "Professional Valeting",
        body: ["Your odour treatment is carried out alongside one of our professional Medusa valeting packages."],
      },
    ],
    bookLabel: "Book Now",
  },

  /* ── Section 13 — Customer reviews ───────────────────────────────────── */
  reviews: { heading: "Trusted By Customers Across London" },

  /* ── Section 14 — FAQ ────────────────────────────────────────────────── */
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "How much does car odour treatment cost?",
        a: [
          "Our Odour &amp; Ozone Treatment add-ons are:",
          "<strong>Mild — +£60 / 15 minutes</strong><br><strong>Moderate — +£90 / 30 minutes</strong><br><strong>Strong — +£100 / 60 minutes</strong>",
          "The treatment must be added to a Triton Interior Valet, Zeus Full Valet or Medusa Gold Valet.",
        ],
      },
      {
        q: "Can I book just an ozone treatment?",
        a: [
          "No.",
          "Our standard Odour &amp; Ozone Treatment is available as an add-on to selected Medusa valeting packages.",
          "This allows us to professionally clean the interior before carrying out the ozone treatment.",
        ],
      },
      {
        q: "Do you guarantee that the smell will disappear?",
        a: [
          "No.",
          "<strong>Complete or permanent odour removal cannot be guaranteed.</strong>",
          "The result depends on the source and severity of the smell and whether contamination has penetrated areas that cannot be fully accessed during the valet.",
        ],
      },
      {
        q: "Why can't you guarantee odour removal?",
        a: [
          "Some smells originate from contamination deep within seat foam, carpet underlay, ventilation systems, headliners or other inaccessible areas.",
          "Other causes can include water ingress, mould, contaminated cabin filters or mechanical problems.",
          "These factors can be outside the scope of a standard valeting service.",
        ],
      },
      {
        q: "Can a smell return after ozone treatment?",
        a: [
          "Yes, it is possible.",
          "If the underlying source of an odour remains inside an inaccessible material or component, the smell may become noticeable again after treatment.",
          "For this reason, we cannot guarantee permanent odour removal.",
        ],
      },
      {
        q: "Does ozone replace interior cleaning?",
        a: [
          "No.",
          "Our process is based on <strong>cleaning first and ozone treatment afterwards</strong>.",
          "Ozone treatment should not be used as a substitute for physically removing accessible contamination.",
        ],
      },
      {
        q: "Can you treat cigarette smells?",
        a: [
          "Our service can be used to treat residual tobacco and cigarette odours.",
          "However, long-term smoke can become embedded within multiple interior materials, so complete or permanent removal cannot be guaranteed.",
        ],
      },
      {
        q: "Can you treat pet smells?",
        a: [
          "Yes, our Odour &amp; Ozone Treatment can be used for residual pet-related smells.",
          "Where physical pet contamination is present, additional cleaning may be required.",
        ],
      },
      {
        q: "What about vomit smells?",
        a: [
          "Vomit should be physically cleaned and treated using the appropriate specialist service.",
          `Customers with sickness contamination should be directed to our <a href="${VOMIT_PATH}"><strong>Vomit Cleaning &amp; Sanitisation</strong></a> service rather than simply booking ozone treatment.`,
        ],
      },
      {
        q: "What if my car has mould?",
        a: [
          "Mould requires specialist treatment.",
          `Please book or enquire about our <a href="${MOULD_PATH}"><strong>Mould Removal &amp; Sanitisation</strong></a> service.`,
        ],
      },
      {
        q: "Will changing the cabin filter help?",
        a: [
          "It may be recommended where the cabin/pollen filter is contributing to an unwanted smell.",
          "Cabin-filter replacement is not included within the standard Medusa Odour &amp; Ozone Treatment.",
        ],
      },
      {
        q: "Is the vehicle safe to occupy during ozone treatment?",
        a: [
          "No.",
          "The vehicle must remain unoccupied during ozone treatment.",
          "Our technician will ventilate the vehicle following treatment and advise when the treatment process has been completed.",
        ],
      },
    ],
  },

  /* ── Section 15 — Important service terms ────────────────────────────── */
  terms: {
    heading: "Important Service Terms",
    title: "Please Read Before Booking",
    /* "The following should be clearly displayed:" — the eight, in order.
       The first carries the three valets it names. */
    list: [
      "Odour & Ozone Treatment is an add-on only.",
      "Complete odour removal is not guaranteed.",
      "Permanent odour removal is not guaranteed.",
      "Smells may return where the underlying source remains.",
      "Contamination inside inaccessible areas or components may require additional specialist work.",
      "Cabin/pollen filter replacement is not included.",
      "Additional specialist cleaning may incur additional charges.",
      "Payment is for the cleaning and treatment performed and is not conditional upon complete removal of the odour.",
    ],
    firstWith: "It must be booked with:",
    acknowledgement: {
      title: "Customer Acknowledgement",
      body: "By booking an Odour & Ozone Treatment, the customer acknowledges that Medusa Auto Detailing will make every reasonable effort to treat the unwanted odour but cannot guarantee complete or permanent odour removal due to factors that may be outside of our reasonable control.",
    },
  },

  /* ── Section 16 — Final CTA ──────────────────────────────────────────── */
  finalCta: {
    heading: "Don't Just Cover the Smell — Clean & Treat the Interior",
    body: "Choose your Medusa valet and add the appropriate Odour & Ozone Treatment.",
    prices: [
      { name: "Mild", line: "+£60 — 15 Minutes" },
      { name: "Moderate", line: "+£90 — 30 Minutes" },
      { name: "Strong", line: "+£100 — 60 Minutes" },
    ],
    withLabel: "Available with:",
    guarantee: "Complete odour removal cannot be guaranteed.",
    bookLabel: "Book Now",
    whatsappLabel: "WhatsApp Us",
  },

  /* "MOBILE STICKY CTA — Use: BOOK VALET + ODOUR TREATMENT. Do not use: BOOK
     OZONE because we don't want customers believing ozone can be purchased
     independently." */
  stickyLabel: "Book Valet + Odour Treatment",
};
