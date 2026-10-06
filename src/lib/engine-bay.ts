/**
 * Content for /repairs/engine-bay-steam-cleaning.
 *
 * **Every sentence here is the client's own**, transcribed from the brief they
 * sent on 2026-10-06 ("Webite changes (3).pdf", 36 pages): "Completely
 * replace/re-optimise the existing Engine Bay Steam Cleaning page using the
 * content below. KEEP EXISTING URL". Its seventeen sections, FAQ and SEO
 * strings are used as written — straight apostrophes, and bold wherever the
 * brief sets a phrase in bold. What the brief addressed to the developer
 * ("WEBSITE DEVELOPER: …", the Elementor page structure, the mobile UX and
 * sticky-CTA notes, the image-SEO table, the internal-linking, structured-data
 * and tracking lists, the "remove / rewrite" list) is not copy; it decided the
 * layout. Where that structure names the words a graphic should carry — the
 * hero's "DEGREASE • STEAM • DETAIL • DRESS", the seven visual steps, the oil
 * leak box's "ACTIVE OIL LEAK?", the "INCLUDED / NOT INCLUDED" graphic — they
 * are used as those labels and nowhere else, as the odour page used its
 * layout's "INSPECT → CLEAN → …" line.
 *
 * The brief's headline change is the service itself: it is no longer "Engine
 * Bay Steam Cleaning" at £60 / £80 / £100 by vehicle size, but one **Engine
 * Bay Top Section Detail at £100** — inspection, degreasing, steam, hand
 * cleaning, drying and dressing of the accessible upper engine bay, and
 * nothing underneath it. "Also avoid advertising the service simply as:
 * ENGINE STEAM CLEANING … The URL can remain engine-bay-steam-cleaning for its
 * existing SEO value." Nothing of the old page survives: it promised to
 * "spray all visible components" and to make the bay "shine", and sold three
 * size-based prices — all superseded.
 *
 * The brief's last page decided the hero: "The customer should understand
 * these five things before booking: 1. THE SERVICE COSTS £100 · 2. IT COVERS
 * THE ACCESSIBLE TOP SECTION OF THE ENGINE BAY · 3. IT INCLUDES INSPECTION,
 * DEGREASING, STEAM, HAND CLEANING, DRYING & DRESSING · 4. IT DOES NOT
 * INCLUDE MECHANICAL WORK OR THE UNDERSIDE OF THE ENGINE · 5. ACTIVE/
 * SIGNIFICANT OIL LEAKS OR HEAVY OIL CONTAMINATION MAY MEAN WE CANNOT CARRY
 * OUT THE SERVICE". They are `points`, the first panel under the h1.
 *
 * Nothing here is reconciled or reworded — there is no `ASSEMBLED` string on
 * this page. Three parts of the brief are not built, because what they need
 * does not exist or is not this repo's:
 *
 *   - **Section 4, Before & After, and the layout's item 8, the before/after
 *     gallery** — "Place a genuine Medusa before/after slider here … Do not
 *     artificially enhance the 'after' image." There are no such
 *     photographs, so neither is built and nothing is faked; the section's
 *     captions and its "BOOK FOR £100" button go with it.
 *   - **The booking-system instructions** — the customer and vehicle details,
 *     the fuel type, the condition and oil-leak questions with their "PLEASE
 *     DO NOT COMPLETE A STANDARD INSTANT BOOKING YET" branch and REQUEST
 *     ASSESSMENT, the modifications question, the photo upload and the three
 *     required acknowledgements all belong to book.medusaautodetailing.co.uk,
 *     as the earlier briefs' did. On this page the oil-leak route is the
 *     brief's own "PLEASE SEND US PHOTOS FIRST" WhatsApp button, which fires
 *     `TRACK.oilLeak`; the acknowledgements' substance is Section 16's terms.
 *   - **Section 14's reviews** are "genuine Medusa reviews … prioritise
 *     reviews mentioning: Engine bay cleaning …": the site has four, none of
 *     them about engine bays, and they are shown word for word.
 */

import { BOOK_URL, CONTACT } from "@/lib/site";

export const SLUG = "repairs/engine-bay-steam-cleaning";
export const PATH = `/${SLUG}`;

/**
 * "INTERNAL LINKING — Link naturally to: Pre-Sale Valet, Car Valeting, Car
 * Detailing, Headlight Restoration, Paint Correction". Each is laid on the
 * brief's own words in Section 11, the one section that names all five
 * things: the exterior a valet cleans, the paintwork a correction polishes,
 * the headlights a restoration restores, and the closing "Pre-Sale Valet or
 * detailing package".
 */
export const LINKS = {
  preSale: "/car-valeting/pre-sale-valet",
  valeting: "/car-valeting",
  detailing: "/car-detailing",
  headlights: "/repairs/headlight-restoration",
  paintCorrection: "/car-detailing/paint-correction",
} as const;

/**
 * "CONVERSION TRACKING — Track: Book £100 Click, WhatsApp Click, Phone Click,
 * Oil Leak Assessment Enquiry, Completed Booking". WhatsApp and phone clicks
 * are `components/TrackClicks`' own. Every booking button carries `book`. The
 * assessment enquiry proper is the booking site's REQUEST ASSESSMENT; on this
 * page it begins at the brief's "WHATSAPP ENGINE BAY PHOTOS" button and its
 * echo in the closing band ("OIL LEAK? Send us photographs before booking."),
 * which carry `oilLeak` instead of the generic WhatsApp event. "Completed
 * Booking" happens on book.medusaautodetailing.co.uk and is tracked there.
 */
export const TRACK = {
  book: "book_engine_bay_click",
  oilLeak: "oil_leak_assessment_click",
} as const;

export type Photo = { src: string; alt: string; w: number; h: number };

/*
  The image-SEO table's filenames and alt text, on the photographs that fit
  them. All three were already on the site: the hero is the featured image of
  the site's own 2022 post on detailing an engine bay, cropped to 3:2; the
  hand detailing shot is the picture the homepage's "Engine bay cleaning" card
  has carried since 2024; the finished bay is the old page's own "Engine"
  photograph. None is captioned as a particular customer's car, and none as a
  before or after.

  The table also names a before & after, a steam cleaning shot and a
  degreasing shot. None exists — the site's one steam photograph is of a
  car's boot carpet — so those slots are left empty rather than filled with a
  picture that shows something else.

  `presale` is not in the table: it is the old page's own header photograph (a
  technician finishing a car's front end), set beside Section 11 as
  decoration, so its alt is empty.
*/
export const PHOTOS = {
  /* A cloth on a freshly cleaned engine cover — Section 1's hero. */
  hero: {
    src: "/assets/2026/10/engine-bay-cleaning-london.webp",
    alt: "Professional mobile engine bay cleaning in London",
    w: 1536,
    h: 1024,
  },
  /* A gloved hand detailing an engine bay with a cloth. */
  detailing: {
    src: "/assets/2026/10/engine-bay-detailing-london.webp",
    alt: "Professional hand detailing of car engine bay",
    w: 1440,
    h: 625,
  },
  /* A clean upper engine bay, close up. */
  finished: {
    src: "/assets/2026/10/detailed-engine-bay-london.webp",
    alt: "Clean and professionally detailed engine bay",
    w: 416,
    h: 274,
  },
  presale: {
    src: "/assets/2024/03/Untitled-design-2.webp",
    alt: "",
    w: 1650,
    h: 1275,
  },
} satisfies Record<string, Photo>;

export type Step = {
  title: string;
  /** The Elementor structure's own label for the step: "Seven visual steps:
   *  INSPECT · DEGREASE · STEAM · HAND CLEAN · DRY · DRESS · INSPECT". */
  flow: string;
  body: string[];
  /** A list the brief sets inside the step, with the line that leads it. */
  list?: { lead: string; items: string[] };
  after?: string[];
  important?: { title: string; body: string[] };
};

const PRICE = "£100";

export const ENGINE = {
  book: BOOK_URL,
  whatsapp: CONTACT.whatsapp,
  price: PRICE,

  seo: {
    /* The brief's first choice; its "ALTERNATIVE" is "Engine Bay Steam
       Cleaning London | £100 Mobile Detail | Medusa". */
    title: "Engine Bay Cleaning London | Mobile Detail £100 | Medusa",
    description:
      "Professional mobile engine bay cleaning in London for £100. Inspection, safe degreasing, steam cleaning, hand detailing, drying and trim dressing included.",
  },

  /**
   * "MOST IMPORTANT MESSAGES — The customer should understand these five
   * things before booking". The hero's first panel under the h1, the price
   * written as Section 1 writes it ("£100 STANDARD PRICE"), with the hero's
   * "DEGREASE • STEAM • DETAIL • DRESS" under it.
   */
  points: {
    price: { value: PRICE, caption: "Standard Price" },
    process: ["Degrease", "Steam", "Detail", "Dress"],
    items: [
      "It Covers the Accessible Top Section of the Engine Bay",
      "It Includes Inspection, Degreasing, Steam, Hand Cleaning, Drying & Dressing",
      "It Does Not Include Mechanical Work or the Underside of the Engine",
      "Active/Significant Oil Leaks or Heavy Oil Contamination May Mean We Cannot Carry Out the Service",
    ],
  },

  /* ── Section 1 — Hero ────────────────────────────────────────────────── */
  hero: {
    h1: "Mobile Engine Bay Cleaning & Detailing London",
    title: "Professional Engine Bay Top Section Detail — £100",
    intro: [
      "Give the visible upper section of your engine bay a professional clean and finish with Medusa Auto Detailing.",
      "Our <strong>Engine Bay Top Section Detail</strong> combines careful inspection, safe degreasing, controlled steam cleaning, detailed hand cleaning and appropriate dressing of suitable plastic and trim components.",
      "Rather than aggressively pressure-washing the engine compartment, our technicians use a controlled cleaning process designed around the condition and layout of the vehicle.",
    ],
    card: {
      title: "Engine Bay Top Section Detail",
      ticks: [
        "Engine Bay Inspection",
        "Safe Degreasing Process",
        "Controlled Steam Cleaning",
        "Detailed Hand Cleaning",
        "Drying Process",
        "Plastic & Trim Dressing",
        "Final Inspection",
        "Mobile Service Across London",
      ],
      important: {
        title: "Important",
        strong: "This service covers the accessible top section of the engine bay only.",
        body: "Vehicles with active/significant oil leaks or excessive oil contamination may not be suitable for this service due to drainage/environmental requirements and insurance/service restrictions.",
      },
    },
    bookLabel: "Book Engine Bay Detail — £100",
    whatsappLabel: "WhatsApp Us",
  },

  /* ── Section 2 — What is an engine bay top section detail? ───────────── */
  about: {
    heading: "What Is an Engine Bay Top Section Detail?",
    title: "Professional Cleaning of the Visible Engine Bay",
    accumulateLead: "Over time, the upper engine bay can accumulate:",
    accumulate: [
      "Dust",
      "Road grime",
      "Dirt",
      "Leaves and loose debris",
      "General residue",
      "Grease",
      "Environmental contamination",
    ],
    purposeHtml:
      "Our Engine Bay Top Section Detail is designed to improve the appearance of the <strong>accessible upper areas</strong> of the engine compartment.",
    usefulLead: "This is particularly useful for customers who:",
    useful: [
      "Want a cleaner, better-presented engine bay",
      "Are preparing a vehicle for sale",
      "Have recently purchased a used vehicle",
      "Attend car shows or meets",
      "Want their engine bay maintained alongside their vehicle's exterior",
      "Want a professional clean rather than attempting it themselves",
    ],
    price: { label: "Standard Price:", value: PRICE },
    bookLabel: "Book Now",
  },

  /* ── Section 3 — What's included for £100? ───────────────────────────── */
  included: {
    heading: "What's Included for £100?",
    title: "Engine Bay Top Section Detail",
    lead: "Your service includes:",
    steps: [
      {
        title: "Engine Bay Inspection",
        flow: "Inspect",
        body: ["Before cleaning begins, our technician visually inspects the accessible engine-bay area."],
        list: {
          lead: "We check for obvious issues that may affect whether the service can safely proceed, including:",
          items: [
            "Visible oil leaks",
            "Heavy oil contamination",
            "Loose components",
            "Exposed or visibly compromised electrical areas",
            "Damaged components",
            "Existing deterioration",
            "Areas requiring additional caution",
          ],
        },
        after: [
          "If we identify something that makes cleaning inappropriate, we may recommend that the issue is repaired before detailing takes place.",
        ],
      },
      {
        title: "Safe Degreasing Process",
        flow: "Degrease",
        body: [
          "Suitable cleaning/degreasing products are applied to appropriate accessible areas where required.",
          "Products and application methods are selected according to the surface and level of contamination.",
        ],
        after: ["We do not simply flood the entire engine bay with degreaser."],
      },
      {
        title: "Controlled Steam Cleaning",
        flow: "Steam",
        body: [
          "Steam is used where appropriate to help loosen and remove dirt and grime from suitable areas.",
          "Steam allows our technicians to work in a more controlled way than simply pressure-washing the entire engine compartment.",
        ],
        important: {
          title: "Important",
          body: [
            "Steam is <strong>not automatically applied to every component</strong>.",
            "Sensitive areas are treated according to the technician's assessment.",
          ],
        },
      },
      {
        title: "Detailed Hand Cleaning",
        flow: "Hand Clean",
        body: [
          "Brushes, cloths and detailing tools are used to clean accessible areas requiring more precise attention.",
        ],
        list: {
          lead: "This may include suitable accessible:",
          items: [
            "Engine covers",
            "Plastic covers",
            "Trim",
            "Surrounding panels",
            "Accessible painted areas",
            "Caps and surrounds",
            "Other upper engine-bay surfaces",
          ],
        },
      },
      {
        title: "Drying Process",
        flow: "Dry",
        body: [
          "Once cleaning has been completed, accessible treated areas are appropriately dried.",
          "Our technicians take care to minimise unnecessary moisture remaining within the engine compartment.",
        ],
      },
      {
        title: "Plastic & Trim Dressing",
        flow: "Dress",
        body: [
          "Suitable plastic and trim areas are dressed where appropriate.",
          "This helps improve the overall presentation of the engine compartment and provides a cleaner, finished appearance.",
          "Dressing is not applied where the technician considers it inappropriate for the component.",
        ],
      },
      {
        title: "Final Inspection",
        flow: "Inspect",
        body: [
          "The engine bay is visually inspected after cleaning and finishing.",
          "The technician checks the areas treated and completes any appropriate finishing touches.",
        ],
      },
    ] as Step[],
  },

  /* ── Section 5 — Why we don't just pressure-wash everything ──────────── */
  control: {
    heading: "Why We Don't Just Pressure-Wash Everything",
    title: "Engine Bays Require a Controlled Approach",
    body: [
      "Modern engine bays can contain numerous sensitive components and electrical systems.",
      "Our service is therefore based on <strong>controlled cleaning rather than indiscriminately flooding the entire engine compartment with water.</strong>",
    ],
    careLead: "Depending on the vehicle, additional care may be required around:",
    care: [
      "Electrical connections",
      "Sensors",
      "Control modules",
      "Wiring",
      "Exposed components",
      "Air-intake areas",
      "Battery/electrical areas",
      "Aftermarket modifications",
      "Older or deteriorated components",
    ],
    after: "Our technicians determine the appropriate cleaning method for each area.",
    statement: "Professional Engine Bay Detailing Is About Control — Not Using as Much Water as Possible.",
  },

  /* ── Section 6 — Important: oil leaks & heavy oil contamination ──────── */
  oil: {
    heading: "Important: Oil Leaks & Heavy Oil Contamination",
    title: "Vehicles With Oil Leaks May Be Refused",
    body: [
      "This needs to be understood <strong>before booking</strong>.",
      "Our £100 Engine Bay Top Section Detail is a detailing/cleaning service.",
      "It is <strong>not an oil-leak repair or specialist contaminated-engine cleaning service.</strong>",
    ],
    unableLead: "We May Be Unable to Clean the Engine Bay If:",
    unable: [
      "There is an active oil leak",
      "There is significant fresh oil contamination",
      "Large amounts of oil are present",
      "Oil is actively leaking from the engine or another component",
      "Cleaning could create contaminated runoff",
      "The contamination cannot be safely managed within our normal mobile detailing process",
      "The work falls outside the scope of our insurance or normal detailing operations",
    ],
    whyHeading: "Why?",
    why: [
      {
        title: "Drainage & Contaminated Runoff",
        body: [
          "Oil-contaminated cleaning water must not simply be allowed to enter surface-water drainage systems or contaminate the surrounding area.",
          "As a mobile detailing company, we have to consider where contaminated runoff could travel during cleaning.",
        ],
      },
      {
        title: "Insurance & Service Scope",
        body: [
          "Our service is designed for professional cosmetic cleaning and detailing of suitable engine bays.",
          "Heavy oil contamination, active mechanical leaks and specialist contaminated-component cleaning can fall outside the scope of the service we are able to provide.",
        ],
      },
      {
        title: "The Leak Should Be Repaired First",
        body: [
          "Cleaning an engine bay while oil is actively leaking does not resolve the underlying mechanical problem.",
          "Where an active/significant leak is identified, we may ask you to have the fault professionally repaired before booking the Engine Bay Top Section Detail.",
        ],
      },
    ],
    beforeBooking: {
      heading: "Before Booking",
      /* The Elementor structure's title for this box: "OIL LEAK WARNING —
         This should be a prominent warning/information box. ACTIVE OIL
         LEAK? CONTACT US BEFORE BOOKING." */
      flag: "Active Oil Leak?",
      lead: "If you know your vehicle has an oil leak or significant oil contamination:",
      strong: "Please Send Us Photos First.",
      whatsappLabel: "WhatsApp Engine Bay Photos",
      after: "We can review the visible condition before you book.",
    },
  },

  /* ── Section 7 — What the £100 service covers ────────────────────────── */
  covers: {
    heading: "What the £100 Service Covers",
    title: "Top Section Only",
    leadHtml:
      "The £100 Engine Bay Detail covers the <strong>accessible visible upper engine-bay area</strong>.",
    excludedLead: "It does NOT automatically include:",
    excluded: [
      "Underside of the engine",
      "Undertrays",
      "Cleaning underneath the vehicle",
      "Removal of engine components",
      "Removal of undertrays",
      "Mechanical repairs",
      "Oil-leak diagnosis",
      "Oil-leak repair",
      "Engine dismantling",
      "Internal engine cleaning",
      "Electrical repairs",
      "Removal of heavy oil contamination",
      "Specialist hazardous/contaminated waste cleaning",
    ],
    /* The Elementor structure's "simple graphic": "INCLUDED — Accessible
       upper engine bay versus NOT INCLUDED — Undertrays / underside /
       dismantling / repairs". */
    graphic: {
      included: { label: "Included", text: "Accessible upper engine bay" },
      excluded: { label: "Not Included", text: "Undertrays / underside / dismantling / repairs" },
    },
    dismantling: {
      title: "No Component Dismantling",
      body: [
        "Our standard service is carried out around accessible components.",
        "We do not dismantle the engine or remove mechanical components as part of the £100 service.",
      ],
    },
  },

  /* ── Section 8 — What results can you expect? ────────────────────────── */
  results: {
    heading: "What Results Can You Expect?",
    title: "A Cleaner, Better-Presented Engine Bay",
    body: [
      "Our goal is to significantly improve the appearance of the accessible upper engine bay.",
      "However, detailing cannot reverse every form of age, wear or damage.",
    ],
    improve: {
      title: "Cleaning May Improve:",
      items: [
        "Dust and dirt",
        "General grime",
        "Light grease/residue",
        "Dirty engine covers",
        "Dirty accessible plastics",
        "Dirty accessible painted surfaces",
        "General engine-bay presentation",
      ],
    },
    cannot: {
      title: "Cleaning Cannot Guarantee Removal Of:",
      items: [
        "Permanent staining",
        "Corrosion",
        "Rust",
        "Oxidation",
        "Faded plastics",
        "Heat damage",
        "Chemical damage",
        "Oil staining that has permanently affected materials",
        "Existing scratches",
        "Paint damage",
        "Material deterioration",
      ],
    },
    important: {
      title: "Important",
      strong: "Complete removal of all staining, grease or contamination cannot be guaranteed.",
      body: "Results depend on the condition, age, materials and previous maintenance of the engine bay.",
    },
  },

  /* ── Section 9 — Older vehicles & existing component condition ───────── */
  older: {
    heading: "Older Vehicles & Existing Component Condition",
    title: "Existing Deterioration Can Become More Noticeable After Cleaning",
    lead: "Engine bays are exposed to heat, vibration, moisture and years of use.",
    listLead: "Older vehicles in particular may contain:",
    list: [
      "Brittle plastics",
      "Aged wiring",
      "Cracked covers",
      "Faded plastics",
      "Loose clips",
      "Corrosion",
      "Perished rubber",
      "Existing leaks",
      "Previous repairs",
      "Aftermarket wiring/components",
    ],
    care: "Our technician will take reasonable care during the service.",
    however: "However, cleaning cannot repair existing deterioration.",
    decline: "Where an engine bay appears unsuitable for safe detailing, we reserve the right to decline or stop the service.",
  },

  /* ── Section 10 — Modified & performance vehicles ────────────────────── */
  modified: {
    heading: "Modified & Performance Vehicles",
    title: "Tell Us About Modifications Before Your Appointment",
    listLead: "If your engine bay contains aftermarket:",
    list: [
      "Air intakes",
      "Exposed filters",
      "Wiring",
      "Electrical equipment",
      "Control modules",
      "Performance components",
      "Custom engine covers",
      "Specialist finishes",
    ],
    /* The sentence the list interrupts, as the brief writes it — lower case,
       because it finishes "If your engine bay contains aftermarket: …". */
    listAfter: "please tell us before the appointment.",
    body: [
      "Where possible, upload photographs when booking.",
      "The technician may modify the cleaning process or avoid particular components where necessary.",
    ],
  },

  /* ── Section 11 — Engine bay detailing for car sales ─────────────────── */
  sales: {
    heading: "Engine Bay Detailing for Car Sales",
    title: "Selling Your Vehicle?",
    lead: "The engine bay is often overlooked when preparing a vehicle for sale.",
    listLead: "A professionally presented engine compartment can complement:",
    /* Links laid on the brief's own words (`LINKS`). */
    listHtml: [
      `<a href="${LINKS.valeting}">A professionally cleaned exterior</a>`,
      "A detailed interior",
      `<a href="${LINKS.paintCorrection}">Machine-polished paintwork</a>`,
      `<a href="${LINKS.headlights}">Restored headlights</a>`,
      "Clean wheels and trim",
    ],
    afterHtml: `Our Engine Bay Top Section Detail can therefore be added alongside an appropriate Medusa <strong><a href="${LINKS.preSale}">Pre-Sale Valet</a> or <a href="${LINKS.detailing}">detailing package</a></strong>.`,
    preSaleLabel: "View Pre-Sale Valet",
    bookLabel: "Add Engine Bay Detail",
  },

  /* ── Section 12 — Why choose Medusa? ─────────────────────────────────── */
  why: {
    heading: "Why Choose Medusa?",
    title: "Professional Mobile Engine Bay Detailing London",
    items: [
      {
        title: "Fixed Standard Price",
        body: "Our Engine Bay Top Section Detail is <strong>£100 as standard</strong> for suitable vehicles.",
      },
      {
        title: "Controlled Cleaning",
        body: "We use appropriate degreasing, steam and detailed hand cleaning rather than simply blasting the engine compartment.",
      },
      {
        title: "Detailed Finish",
        body: "Suitable accessible plastics and trim are dressed after cleaning.",
      },
      {
        title: "Mobile Service",
        body: "We travel directly to suitable homes and workplaces within our London service area.",
      },
      {
        title: "Realistic Service Scope",
        body: "We don't pretend detailing can repair oil leaks, mechanical faults, corrosion or damaged components.",
      },
      {
        title: "Professional Assessment",
        body: "If the engine bay isn't suitable for our normal cleaning process, we'll advise accordingly.",
      },
    ],
    bookLabel: "Book for £100",
  },

  /* ── Section 13 — Pricing ────────────────────────────────────────────── */
  pricing: {
    heading: "Pricing",
    title: "Engine Bay Top Section Detail",
    price: PRICE,
    includesLabel: "Includes:",
    includes: [
      "Engine bay inspection",
      "Safe degreasing process",
      "Controlled steam cleaning",
      "Detailed hand cleaning",
      "Drying process",
      "Plastic and trim dressing",
      "Final inspection",
    ],
    mobile: {
      title: "Mobile Service",
      body: "We come to your suitable location within our London service area.",
    },
    bookLabel: "Book Engine Bay Detail — £100",
  },

  /* ── Section 14 — Customer reviews ───────────────────────────────────── */
  reviews: { heading: "Trusted by Customers Across London" },

  /* ── Section 15 — FAQ ────────────────────────────────────────────────── */
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "How much is engine bay cleaning?",
        a: ["Our standard <strong>Engine Bay Top Section Detail is £100</strong> for suitable vehicles."],
      },
      {
        q: "What is included for £100?",
        a: [
          "The service includes:",
          /* One line per item, as the brief lists them; the space before
             each break keeps the FAQPage text readable once tags are gone. */
          [
            "Engine bay inspection",
            "Safe degreasing process",
            "Steam cleaning",
            "Detailed hand cleaning",
            "Drying process",
            "Plastic and trim dressing",
            "Final inspection",
          ]
            .map((item) => `• ${item}`)
            .join(" <br>"),
        ],
      },
      {
        q: "Do you clean underneath the engine?",
        a: [
          "No.",
          "The standard £100 service covers the <strong>accessible upper/top section of the engine bay</strong>.",
          "It does not include the underside of the engine, undertrays or underneath the vehicle.",
        ],
      },
      {
        q: "Do you remove engine parts?",
        a: ["No.", "Our standard service does not include dismantling or removing engine components."],
      },
      {
        q: "Do you pressure wash the engine bay?",
        a: [
          "Our service is based around a controlled cleaning process using appropriate degreasing, steam cleaning and detailed hand cleaning.",
          "We do not simply pressure-wash the entire engine compartment.",
        ],
      },
      {
        q: "Do you steam clean the engine bay?",
        a: [
          "Yes, steam cleaning forms part of the process where appropriate.",
          "It is combined with degreasing and detailed hand cleaning rather than being used indiscriminately on every component.",
        ],
      },
      {
        q: "Do you dress the engine bay afterwards?",
        a: ["Suitable accessible plastic and trim components are dressed where appropriate after cleaning."],
      },
      {
        q: "Can you clean an engine with an oil leak?",
        a: [
          "Potentially not.",
          "If there is an <strong>active/significant oil leak or excessive oil contamination</strong>, we may be unable to carry out the service due to contaminated runoff, drainage considerations and the scope of our insurance/service.",
          "Send us photographs before booking if you're unsure.",
        ],
      },
      {
        q: "Why can't you clean heavy oil leaks?",
        a: [
          "Cleaning significant oil contamination can create contaminated wastewater/runoff that must not simply enter drains or the surrounding environment.",
          "Heavy oil contamination and active mechanical leaks can also fall outside the scope of our normal mobile detailing service.",
          "The underlying leak should be repaired first.",
        ],
      },
      {
        q: "Can you diagnose my oil leak?",
        a: [
          "No.",
          "Medusa Auto Detailing provides detailing and cleaning services.",
          "We do not diagnose or repair mechanical oil leaks.",
          "Please have the vehicle assessed by an appropriate mechanic.",
        ],
      },
      {
        q: "Can I book after the oil leak has been repaired?",
        a: [
          "Potentially, yes.",
          "Once the leak has been repaired, send us photographs of the remaining engine-bay contamination so we can determine whether it is suitable for our service.",
        ],
      },
      {
        q: "Can you remove every oil or grease stain?",
        a: [
          "No.",
          "Complete removal of all staining or contamination cannot be guaranteed.",
          "Some oils, chemicals and long-term contamination can permanently stain or deteriorate materials.",
        ],
      },
      {
        q: "Is engine bay cleaning safe?",
        a: [
          "Engine bays contain electrical, mechanical and sensitive components, so no physical cleaning process should be advertised as completely risk-free.",
          "Our technicians use a controlled process and adapt the cleaning method according to the vehicle and visible condition.",
          "If we believe the engine bay is unsuitable for normal detailing, we may decline the service.",
        ],
      },
      {
        q: "Can you clean classic cars?",
        a: [
          "Potentially.",
          "Older and classic vehicles can have different electrical systems, aged components and more fragile materials.",
          "Please send photographs before booking so we can assess suitability.",
        ],
      },
      {
        q: "Can you clean modified cars?",
        a: [
          "Potentially.",
          "Tell us about aftermarket components and send photographs before booking.",
          "The technician may need to avoid certain components or alter the cleaning process.",
        ],
      },
      {
        q: "Do you clean electric vehicles?",
        a: [
          "Because electric and hybrid vehicles have different high-voltage components and manufacturer requirements, suitability should be confirmed before booking.",
          "Please send us the vehicle make, model and photographs first.",
        ],
      },
      {
        q: "Do you come to my home?",
        a: [
          "Yes.",
          "Medusa provides mobile engine-bay detailing across our London service area, subject to a suitable working location.",
        ],
      },
    ],
  },

  /* ── Section 16 — Important service terms ────────────────────────────── */
  terms: {
    heading: "Important Service Terms",
    title: "Please Read Before Booking",
    items: [
      { title: "Top Section Only", body: "The £100 service covers accessible areas of the upper engine bay." },
      {
        title: "No Mechanical Repairs",
        body: "Medusa does not diagnose or repair oil leaks, electrical faults or mechanical problems as part of this service.",
      },
      {
        title: "Oil Leaks",
        body: "Vehicles with active/significant oil leaks or excessive oil contamination may be refused due to drainage/environmental considerations and insurance/service restrictions.",
      },
      {
        title: "No Dismantling",
        body: "The standard service does not include removal of engine components or undertrays.",
      },
      {
        title: "Existing Damage",
        body: "Medusa cannot be responsible for pre-existing defects, deterioration or faults including:",
        list: [
          "Brittle plastics",
          "Corrosion",
          "Existing electrical faults",
          "Damaged wiring",
          "Loose components",
          "Existing leaks",
          "Failed seals",
          "Perished rubber",
          "Previous repairs",
          "Existing mechanical faults",
        ],
      },
      {
        title: "Results",
        body: "Complete removal of all stains, oil residue, grease, corrosion or permanent deterioration cannot be guaranteed.",
      },
      {
        title: "Right to Decline",
        body: "If our technician determines that the engine bay cannot be appropriately cleaned within the scope of the booked service, Medusa reserves the right to decline or stop the engine-bay treatment.",
      },
    ] as { title: string; body: string; list?: string[] }[],
  },

  /* ── Section 17 — Final CTA ──────────────────────────────────────────── */
  finalCta: {
    heading: "Give Your Engine Bay the Same Attention as the Rest of Your Car",
    body: "Professional mobile cleaning and detailing of the accessible upper engine bay.",
    card: {
      title: "Engine Bay Top Section Detail",
      price: PRICE,
      includesLabel: "Includes:",
      /* The brief sets these one under another with a ↓ between each. */
      includes: [
        "Inspection",
        "Safe Degreasing",
        "Steam Cleaning",
        "Detailed Hand Cleaning",
        "Drying",
        "Plastic & Trim Dressing",
        "Final Inspection",
      ],
    },
    bookLabel: "Book Now — £100",
    whatsappLabel: "WhatsApp Medusa",
    oilLeak: { title: "Oil Leak?", body: "Send us photographs before booking." },
  },

  /* "MOBILE STICKY CTA — Use: BOOK £100 | WHATSAPP". */
  sticky: { primary: "Book £100", secondary: "WhatsApp" },
};

/**
 * What `content/overrides.ts` needs to replace the mirror's page with this
 * one, so the `/repairs` hub card, the sitemap and the WebPage node read the
 * rebuilt page rather than the old "Engine bay steam cleaning".
 */
export const REBUILD = {
  slug: SLUG,
  /** The h1 the mirror's `pages.json` entry carries today. */
  mirrorH1: "Engine bay steam cleaning",
  title: ENGINE.seo.title,
  description: ENGINE.seo.description,
  h1: ENGINE.hero.h1,
  og: PHOTOS.hero,
  /** Section 1's opening, which is about the service from its first word. */
  intro: ENGINE.hero.intro,
  /**
   * One fixed price — "Our Engine Bay Top Section Detail is £100 as standard
   * for suitable vehicles" — written in the form the hub reads as an entry
   * price, since it is the only price the page sells.
   */
  price: "From £100" as string | undefined,
  why: { heading: ENGINE.why.heading, items: ENGINE.why.items },
  faq: ENGINE.faq,
};
