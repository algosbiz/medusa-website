/**
 * Content for /car-interior-cleaning/flooded-car-cleaning.
 *
 * **Every sentence here is the client's own**, transcribed from the brief they
 * sent on 2026-10-06 ("Webite changes (6).pdf", 50 pages): "Completely
 * replace/re-optimise the existing Flooded Car Cleaning page using the content
 * below. KEEP EXISTING URL". Its twenty sections, FAQ and SEO strings are used
 * as written — straight apostrophes, and bold wherever the brief sets a phrase
 * in bold. What the brief addressed to the developer ("WEBSITE DEVELOPER: …",
 * the Elementor page structure, the image-SEO table, the internal-linking,
 * sticky-CTA and tracking notes, the "remove from current page" list) is not
 * copy; it decided the layout. Where that structure names what a visual shows
 * — "Visual cards: DAMP CARPET · SOAKING WET · STANDING WATER · FLOODED
 * INTERIOR", "Simple icons: LEAKS · ELECTRICS …", the process line, the carpet
 * layer diagram's headline — its words are used for exactly that visual.
 *
 * The brief's headline change is the service's boundary. The old page
 * promised to "eliminate odours", leave the car "free from mould and
 * bacteria", "protect it from long-term damage" and "get you back on the road
 * safely" — every one on the brief's list to remove — and it gave DIY advice
 * on drying the car out. Nothing of it survives. The new page cleans and
 * treats the interior and says, over and over, what it does not do: it does
 * not repair the leak, it does not certify a flooded vehicle as safe, it
 * cannot reach every layer of a wet floor, and every job is photographed and
 * quoted first — "FLOODED CAR CLEANING IS QUOTE-ONLY". So no button on the
 * page books: "Do NOT use instant BOOK NOW for serious flooded-car enquiries."
 * Every quote button is `#get-flooded-car-quote`, the brief's own anchor, where
 * its dedicated assessment form is (`lib/flooded-assessment.ts`).
 *
 * Nothing is `ASSEMBLED`: the h1 is the same in Section 1 and the SEO section,
 * and no answer carries a note to the developer.
 *
 * Not built, for want of what the brief requires:
 *
 *   - **Section 15, Before & After** — "Use genuine Medusa before/after
 *     photographs … Do not digitally exaggerate results." None exists, so its
 *     four examples, its caption and its REQUEST A QUOTE button are not on the
 *     page, and nothing is faked in their place.
 *   - **Four of the seven image-SEO files** — wet carpet, footwell, boot and
 *     damp carpet. The site has no photograph of any of them; the hero and the
 *     water extraction slots are filled (see `PHOTOS`).
 *   - **Reviews** "Use genuine customer reviews": the site's four, word for
 *     word, none of them about a flooded car.
 */

import { BOOK_URL, CONTACT } from "@/lib/site";
import { FORM_TRACK } from "@/lib/flooded-assessment";

export const SLUG = "car-interior-cleaning/flooded-car-cleaning";
export const PATH = `/${SLUG}`;

/** "ASSESSMENT FORM — This should be the primary conversion point. Anchor:
 *  #get-flooded-car-quote. Every GET QUOTE button scrolls here." */
export const FORM_ANCHOR = "get-flooded-car-quote";
export const QUOTE = `#${FORM_ANCHOR}`;

/**
 * "INTERNAL LINKING — Link naturally to: Mould Removal, Odour & Ozone
 * Treatment, Car Interior Cleaning, Steam Cleaning, Triton Interior Valet,
 * Sickness / Biohazard Cleaning". Each is laid on the copy's own words where
 * the copy has them: "Mould Removal" and "Odour & Ozone Treatment" in Sections
 * 9 and 10 (bold in the brief) and their VIEW buttons, "mould or odour
 * treatment" in Why Choose Medusa, "specialist interior cleaning" beside it,
 * and Step 5's "Steam Cleaning". Triton Interior Valet and Sickness /
 * Biohazard Cleaning are named nowhere in the copy, so they are not linked.
 */
export const LINKS = {
  mould: "/car-interior-cleaning/mould-removal",
  odour: "/car-interior-cleaning/odour-removal",
  steam: "/car-interior-cleaning/steam-cleaning",
  interior: "/car-interior-cleaning",
} as const;

/**
 * Conversion events. "Track: Flooded Car Quote Submitted, Photo Upload,
 * WhatsApp Click, Phone Click" — the form fires the first two
 * (`FORM_TRACK`), `TrackClicks` the last two; every GET QUOTE button carries
 * `quote`, so the clicks into the form can be read against its submissions.
 */
export const TRACK = {
  quote: "get_flooded_car_quote_click",
  ...FORM_TRACK,
} as const;

export type Photo = { src: string; alt: string; w: number; h: number };

/*
  The image-SEO table's filenames and alt text, on the two photographs that
  fit them. The hero is the old page's own picture — a technician working a
  wet extraction tool over a water-marked seat — cut to its lower half, the
  tool and the seat, because a hero card is landscape and the original is a
  1370x2054 portrait. The extraction shot is the site's April 2026 blog image
  of the same work on a fabric seat (the vomit cleaning page carries it too,
  as its upholstery extraction picture). Neither is captioned as a particular
  customer's car. Wet carpet, footwell, boot and damp carpet have nothing to
  show and are left out; before & after is not built (see above).
*/
export const PHOTOS = {
  hero: {
    src: "/assets/2026/10/flooded-car-cleaning-london.webp",
    alt: "Professional flooded car cleaning in London",
    w: 1370,
    h: 913,
  },
  extraction: {
    src: "/assets/2026/10/car-interior-water-extraction.webp",
    alt: "Professional water extraction from car interior",
    w: 1536,
    h: 1024,
  },
} satisfies Record<string, Photo>;

export type Step = {
  title: string;
  /** Part of the title that links to the service's own page. */
  link?: { text: string; href: string };
  body: string[];
  /** A list the brief sets inside the step. */
  list?: { lead: string; items: string[] };
  /** What the brief writes after the list. */
  after?: string[];
  /** The step's own "IMPORTANT" note. */
  important?: string;
};

export type Named = { name: string; body: string };

export const FLOOD = {
  book: BOOK_URL,
  whatsapp: CONTACT.whatsapp,

  seo: {
    title: "Flooded Car Cleaning London | Water Damage Interior Cleaning | Medusa",
    description:
      "Professional flooded car cleaning in London. Water extraction, wet carpet and interior cleaning for water-damaged vehicles. Upload photos for an assessment and quote.",
  },

  /* ── Section 1 — Hero ────────────────────────────────────────────────── */
  hero: {
    h1: "Flooded Car Cleaning & Water Damage Cleaning London",
    title: "Water Inside Your Car? Get the Interior Professionally Assessed & Cleaned",
    /* The Elementor structure's "First screen: FLOODED CAR? · WATER-DAMAGED
       INTERIOR? · MOBILE CLEANING ACROSS LONDON · [GET ASSESSMENT] [WHATSAPP
       PHOTOS]" — the panel under the h1, over Section 1's own call to send
       photographs and its two buttons. */
    firstScreen: {
      questions: ["Flooded Car?", "Water-Damaged Interior?"],
      answer: "Mobile Cleaning Across London",
    },
    send: "Send Photos for an Assessment & Quote",
    intro: [
      "Has rainwater, a leak or flooding left your vehicle's carpets, seats or interior wet?",
      "Water can travel beneath the visible carpet into underlay, insulation and other areas that are difficult to assess from the surface alone.",
      "Medusa Auto Detailing provides specialist <strong>mobile flooded-car and water-damage interior cleaning across London</strong>, with every job assessed individually according to the source, severity and areas affected.",
    ],
    card: {
      title: "Water-Damaged Car Interior?",
      ticks: [
        "Standing Water Assessment",
        "Wet Carpet Cleaning",
        "Upholstery Cleaning",
        "Water Extraction Where Appropriate",
        "Interior Deep Cleaning",
        "Drying Treatment Where Appropriate",
        "Damp & Odour Treatment Options",
        "Mobile Service Across London",
      ],
    },
    quoteLabel: "Get a Flooded Car Quote",
    whatsappLabel: "WhatsApp Photos",
    /* Section 1's IMPORTANT, set beside the urgent information bar. */
    important: {
      title: "Important",
      strong:
        "Medusa provides cleaning and detailing services. We do not diagnose or repair the source of water ingress, mechanical faults, electrical faults, damaged seals or vehicle drainage systems.",
      body: "Where water is still actively entering the vehicle, the underlying fault should be repaired.",
    },
  },

  /* ── Elementor 2 — Urgent information bar ─────────────────────────────── */
  urgent: {
    question: "Water Still Entering the Vehicle?",
    statement: "The Leak Needs to Be Repaired.",
    strong: "Medusa cleans the interior — we do not repair the source of water ingress.",
  },

  /* ── Section 2 — Water inside your car? ──────────────────────────────── */
  water: {
    heading: "Water Inside Your Car?",
    title: "Act As Soon As Reasonably Possible",
    lead: "A wet car interior isn't always just a wet surface.",
    travelLead: "Water can potentially travel into:",
    travel: [
      "Carpet fibres",
      "Carpet backing",
      "Underlay",
      "Insulation",
      "Seat material",
      "Seat foam",
      "Footwells",
      "Boot carpet",
      "Spare-wheel compartments",
      "Areas beneath trim",
    ],
    risksLead: "The longer materials remain wet, the greater the potential for:",
    risks: ["Persistent dampness", "Unwanted smells", "Mould growth", "Staining", "Material deterioration"],
    /* Elementor 3 — "WATER SEVERITY. Visual cards: … This helps customers
       self-identify severity." */
    severity: {
      label: "Water Severity",
      levels: ["Damp Carpet", "Soaking Wet", "Standing Water", "Flooded Interior"],
    },
    statement: "The first step is to understand how much water is present and where it came from.",
    uploadLabel: "Upload Photos for Assessment",
  },

  /* ── Section 3 — Important safety information ────────────────────────── */
  safety: {
    heading: "Important Safety Information",
    title: "Has the Vehicle Been Seriously Flooded or Submerged?",
    lead: "There is an important difference between:",
    wet: {
      title: "A Wet Interior",
      lead: "For example:",
      items: [
        "Rain entered through an open window",
        "A leaking door/roof seal",
        "Wet footwell",
        "Water in the boot",
        "Interior leak",
      ],
    },
    and: "and:",
    serious: {
      title: "A Seriously Flooded or Submerged Vehicle",
      lead: "Where water has reached:",
      items: [
        "Electrical components",
        "Wiring",
        "Control modules",
        "Battery/high-voltage components",
        "Mechanical components",
        "Significant areas beneath the interior",
        "Unknown contaminated floodwater",
      ],
    },
    company: "Medusa is a detailing & cleaning company — not a vehicle safety inspection or repair centre.",
    body: "If the vehicle has been significantly submerged or there is any concern regarding electrical, mechanical or high-voltage systems, the vehicle should be assessed by an appropriate automotive professional before detailing.",
    warning: "Do not rely on an interior cleaning service to determine whether a flooded vehicle is safe to drive.",
  },

  /* ── Section 4 — Where did the water come from? ──────────────────────── */
  source: {
    heading: "Where Did the Water Come From?",
    title: "Tell Us What Caused the Problem",
    lead: "Knowing the source of the water is extremely important.",
    causesLead: "Common causes include:",
    causes: [
      { name: "Rainwater", body: "Window, door or roof accidentally left open." },
      { name: "Leaking Door / Window Seal", body: "Water entering around a failed or damaged seal." },
      { name: "Sunroof / Panoramic Roof Leak", body: "Water entering through or around the roof/sunroof system." },
      { name: "Blocked Vehicle Drain", body: "A drainage problem can allow water to enter the passenger compartment." },
      { name: "Boot Leak", body: "Water entering around the boot, rear lights, seals or another area." },
      { name: "Heavy Rain / Local Flooding", body: "Water entering from outside during severe weather." },
      {
        name: "Unknown Source",
        body: "You have discovered wet carpets or standing water but don't know where it came from.",
      },
    ] as Named[],
    important: {
      title: "Important",
      body: "We can clean and treat suitable affected interior areas.",
      statement: "We do not diagnose or repair the leak.",
      after: "If the source has not been repaired, water can return after we have cleaned the vehicle.",
    },
  },

  /* ── Section 5 — Why the source must be fixed ────────────────────────── */
  fix: {
    heading: "Why the Source Must Be Fixed",
    title: "Cleaning the Interior Does Not Repair Water Ingress",
    lead: "This is one of the most important things to understand.",
    imagine:
      "Imagine we professionally clean and dry a wet footwell but the vehicle still has a leaking sunroof drain.",
    next: "The next time it rains:",
    statement: "The water can come back.",
    sameLead: "The same applies to:",
    same: [
      "Failed seals",
      "Blocked drains",
      "Windscreen leaks",
      "Door leaks",
      "Boot leaks",
      "Bodywork leaks",
      "Roof leaks",
      "Mechanical leaks",
    ],
    roleHtml:
      "Our role is to treat the <strong>interior contamination and moisture within the scope of the booked cleaning service</strong>.",
    specialist:
      "A mechanic, bodyshop, auto-electrician or relevant vehicle specialist may be required to diagnose and repair the underlying fault.",
  },

  /* ── Section 6 — What areas can we assess? ───────────────────────────── */
  areas: {
    heading: "What Areas Can We Assess?",
    title: "Flood & Water-Damaged Car Interiors",
    lead: "We can assess suitable contamination affecting:",
    items: [
      { name: "Carpets", body: "Wet or water-affected vehicle carpets." },
      { name: "Footwells", body: "Front or rear footwell water ingress." },
      { name: "Boot", body: "Water collecting within the boot area." },
      { name: "Fabric Upholstery", body: "Water-affected fabric seats where appropriate." },
      { name: "Leather", body: "Suitable water-affected leather surfaces can be assessed." },
      { name: "Floor Mats", body: "Wet or contaminated removable mats." },
      { name: "Interior Surfaces", body: "Suitable accessible trim and interior surfaces." },
      { name: "Spare-Wheel Area", body: "Where accessible without specialist dismantling." },
      { name: "Multiple Areas", body: "For more substantial water ingress affecting several parts of the vehicle." },
    ] as Named[],
    ctaLabel: "Get an Assessment",
  },

  /* ── Section 7 — Our flooded car cleaning process ────────────────────── */
  process: {
    heading: "Our Flooded Car Cleaning Process",
    title: "Every Water-Damage Job Is Different",
    lead: "The exact process depends on the amount and type of water, affected materials and how long the interior has been wet.",
    typical: "A typical process may include:",
    /* Elementor 5 — "OUR PROCESS. Visual: ASSESS ↓ EXTRACT ↓ DEEP CLEAN ↓
       STEAM WHERE APPROPRIATE ↓ DRY ↓ ODOUR TREATMENT IF REQUIRED ↓
       INSPECT". Seven stages over the eight steps: Interior Cleaning and
       Extraction / Deep Cleaning are both its DEEP CLEAN. */
    flow: [
      "Assess",
      "Extract",
      "Deep Clean",
      "Steam Where Appropriate",
      "Dry",
      "Odour Treatment If Required",
      "Inspect",
    ],
    steps: [
      {
        title: "Initial Assessment",
        body: [],
        list: {
          lead: "We assess:",
          items: [
            "Apparent water source",
            "Amount of water",
            "Areas affected",
            "How long the vehicle has been wet",
            "Visible mould",
            "Unwanted smells",
            "Carpet condition",
            "Upholstery condition",
            "Visible contamination",
            "Accessibility",
          ],
        },
        after: [
          "If the vehicle appears unsuitable for a mobile detailing service, we may recommend further specialist assessment instead.",
        ],
      },
      {
        title: "Water Extraction Where Appropriate",
        body: [
          "Where suitable and within the scope of the agreed service, accessible standing water or excess moisture may be extracted.",
        ],
        important:
          "This does not mean all moisture hidden beneath fixed carpets, sound insulation, wiring, structural cavities or inaccessible components can necessarily be removed through mobile detailing.",
      },
      {
        title: "Interior Cleaning",
        body: ["Suitable affected interior areas are professionally cleaned according to their material and condition."],
        list: {
          lead: "This may include appropriate treatment of:",
          items: ["Carpets", "Mats", "Upholstery", "Accessible trim", "Boot areas", "Other suitable surfaces"],
        },
      },
      {
        title: "Extraction / Deep Cleaning",
        body: ["Suitable fabric and carpet areas may receive extraction or additional deep cleaning where appropriate."],
      },
      {
        title: "Steam Cleaning Where Appropriate",
        link: { text: "Steam Cleaning", href: LINKS.steam },
        body: [
          "Steam may be used on suitable areas as part of the cleaning process.",
          "Steam is not automatically appropriate for every component or surface.",
        ],
      },
      {
        title: "Drying Process",
        body: ["Appropriate steps are taken to reduce moisture in accessible treated areas."],
        important:
          "We cannot guarantee that every inaccessible layer, cavity, foam section, underlay or hidden component is completely dry following a mobile cleaning service.",
      },
      {
        title: "Odour Treatment Where Booked",
        body: [
          "Where appropriate, additional odour treatment may be recommended.",
          "Odour treatment does not guarantee complete or permanent smell removal.",
        ],
      },
      {
        title: "Final Assessment",
        body: ["The treated areas are inspected and any relevant observations are communicated to the customer."],
      },
    ] as Step[],
  },

  /* ── Section 8 — Carpet & underlay ───────────────────────────────────── */
  layers: {
    heading: "Carpet & Underlay",
    title: "The Carpet Can Feel Dry While Moisture Remains Underneath",
    lead: ["Vehicle flooring isn't necessarily a single layer.", "Depending on the vehicle, there may be:"],
    layers: ["Visible Carpet", "Carpet Backing", "Underlay / Insulation", "Vehicle Floor"],
    /* Elementor 6 — "CARPET LAYER DIAGRAM … Headline: THE SURFACE CAN FEEL
       DRY WHILE MOISTURE REMAINS BELOW." */
    diagram: "The surface can feel dry while moisture remains below.",
    why: "This is why serious water ingress can be more complicated than simply vacuuming water from the visible carpet.",
    trappedLead: "Moisture trapped underneath can contribute to:",
    trapped: ["Dampness", "Musty smells", "Mould", "Repeated condensation", "Material deterioration"],
    important: {
      title: "Important",
      body: [
        "Our standard mobile service does not automatically include dismantling the vehicle interior, removing fixed carpets, removing seats or stripping the vehicle down to the floor pan.",
        "If significant dismantling is required, additional specialist automotive work may be necessary.",
      ],
    },
  },

  /* ── Section 9 — Mould after water damage ────────────────────────────── */
  mould: {
    heading: "Mould After Water Damage",
    title: "Has Mould Started Appearing?",
    lead: "A vehicle that remains damp can develop visible mould.",
    ifPresent: "If mould is already present:",
    statement: "Tell us before booking.",
    photosLead: "Send clear photographs showing:",
    photos: [
      "Areas affected",
      "Amount of visible mould",
      "Seats",
      "Carpets",
      "Steering wheel/dashboard if affected",
      "Boot",
      "Other contaminated areas",
    ],
    specialistHtml: `The job may need to be treated as a specialist <a href="${LINKS.mould}"><strong>Mould Removal</strong></a> service rather than standard water-damage cleaning.`,
    important: {
      title: "Important",
      body: [
        "Cleaning visible mould does not fix the underlying water-ingress problem.",
        "If moisture continues entering the vehicle, mould can return.",
      ],
    },
    ctaLabel: "View Mould Removal",
  },

  /* ── Section 10 — Damp & musty smells ────────────────────────────────── */
  odour: {
    heading: "Damp & Musty Smells",
    title: "Why Does a Flooded Car Smell?",
    lead: "Water itself isn't always the only issue.",
    sourcesLead: "Unwanted smells may develop from:",
    sources: [
      "Wet carpet",
      "Damp underlay",
      "Upholstery",
      "Mould",
      "Organic contamination",
      "Dirty floodwater",
      "Hidden moisture",
      "Contamination beneath accessible surfaces",
    ],
    improve: "Professional cleaning and appropriate odour treatment may improve these smells.",
    however: "However:",
    statement: "Complete or permanent odour removal cannot be guaranteed.",
    returns: "If the source of moisture or contamination remains, the smell may return.",
    ozoneHtml: `For significant odour issues, an additional <a href="${LINKS.odour}"><strong>Odour &amp; Ozone Treatment</strong></a> may be recommended where appropriate.`,
    ctaLabel: "View Odour Treatment",
  },

  /* ── Section 11 — Clean rainwater vs contaminated floodwater ─────────── */
  waterType: {
    heading: "Clean Rainwater vs Contaminated Floodwater",
    title: "What Type of Water Entered the Vehicle?",
    lead: "This matters.",
    types: [
      { name: "Rainwater / Leak", body: "Water entering through a window, sunroof, seal or similar source." },
      {
        name: "Unknown Floodwater",
        body: "Water entering from a flooded road, external flooding or another unknown source.",
      },
      { name: "Sewage / Highly Contaminated Water", body: "This requires a different level of consideration." },
    ] as Named[],
    important: {
      title: "Important",
      lead: "If the vehicle has been contaminated by:",
      items: ["Sewage", "Wastewater", "Chemicals", "Fuel", "Oil", "Unknown hazardous substances"],
      tell: "tell us before booking.",
      body: [
        "These vehicles may fall outside the scope of our normal mobile detailing service and may require specialist hazardous-contamination handling.",
        "Medusa reserves the right to decline jobs that cannot be appropriately undertaken within our cleaning-service scope.",
      ],
    },
  },

  /* ── Section 12 — What we don't do ───────────────────────────────────── */
  notIncluded: {
    heading: "What We Don't Do",
    title: "Flood Cleaning Is Not Mechanical Repair",
    /* Elementor 9 — "WHAT WE DON'T REPAIR. Simple icons: LEAKS · ELECTRICS
       · MECHANICAL · SEALS · DRAINS". */
    icons: ["Leaks", "Electrics", "Mechanical", "Seals", "Drains"],
    lead: "The Flooded Car Cleaning service does NOT include:",
    items: [
      "Leak diagnosis",
      "Leak repair",
      "Sunroof repair",
      "Drain repair",
      "Seal replacement",
      "Windscreen resealing",
      "Electrical diagnosis",
      "Electrical repairs",
      "ECU/module inspection",
      "Mechanical repairs",
      "Corrosion repair",
      "Structural repair",
      "Full vehicle dismantling",
      "Guaranteed removal of all hidden moisture",
    ],
    after: "If any of these are required, an appropriate automotive specialist should be consulted.",
  },

  /* ── Section 13 — Electrical & mechanical damage ─────────────────────── */
  electrical: {
    heading: "Electrical & Mechanical Damage",
    title: "Water Can Affect More Than Upholstery",
    lead: "Modern vehicles can contain electrical components and wiring beneath seats, carpets and other interior areas.",
    notLead: "Medusa does not diagnose whether water has damaged:",
    not: [
      "Wiring",
      "Control modules",
      "Sensors",
      "Seat electronics",
      "Airbag/SRS systems",
      "Battery systems",
      "Hybrid systems",
      "High-voltage EV components",
      "Mechanical components",
    ],
    ifLead: "If you have:",
    if: [
      "Warning lights",
      "Electrical faults",
      "Starting problems",
      "Unusual vehicle behaviour",
      "Water near high-voltage components",
      "A significantly submerged vehicle",
    ],
    ifAfter: "have the vehicle assessed by an appropriate automotive professional.",
    statement: "Cleaning the interior does not confirm that the vehicle is mechanically or electrically safe.",
  },

  /* ── Section 14 — Electric & hybrid vehicles ─────────────────────────── */
  ev: {
    heading: "Electric & Hybrid Vehicles",
    title: "EV & Hybrid Flooding Requires Additional Caution",
    lead: "Electric and hybrid vehicles can contain high-voltage systems.",
    ifLead:
      "If an EV or hybrid has been significantly flooded, submerged or has water intrusion near high-voltage components:",
    statement: "Do not rely on a detailing assessment.",
    body: [
      "The vehicle should first be assessed by an appropriately qualified automotive professional.",
      "Medusa may decline cleaning until suitability has been confirmed.",
    ],
  },

  /* ── Section 16 — Why every flooded car is quoted individually ───────── */
  quoteOnly: {
    heading: "Why Every Flooded Car Is Quoted Individually",
    title: "A Wet Footwell and a Flooded Vehicle Are Not the Same Job",
    factorsLead: "Pricing depends on:",
    factors: [
      "Amount of water",
      "Areas affected",
      "Vehicle size",
      "Water source",
      "How long the vehicle has been wet",
      "Carpet condition",
      "Upholstery condition",
      "Presence of mould",
      "Presence of odour",
      "Level of contamination",
      "Accessibility",
      "Amount of extraction required",
      "Cleaning required",
      "Additional treatments required",
    ],
    reason: "For this reason:",
    statement: "Flooded car cleaning is quote-only.",
    photos: "Send photographs before an appointment is confirmed.",
    ctaLabel: "Get My Quote",
  },

  /* ── Section 17 — Why choose Medusa? ─────────────────────────────────── */
  why: {
    heading: "Why Choose Medusa?",
    title: "Mobile Flooded Car Cleaning Across London",
    items: [
      { title: "Mobile Service", bodyHtml: "We attend suitable locations throughout our London service area." },
      {
        title: "Professional Extraction Equipment",
        bodyHtml: "Appropriate equipment is available for suitable water-affected interior cleaning.",
      },
      {
        title: "Interior Cleaning Experience",
        bodyHtml: `Our technicians regularly work with vehicle carpets, upholstery, trim and <a href="${LINKS.interior}">specialist interior cleaning</a>.`,
      },
      {
        title: "Specialist Add-On Services",
        bodyHtml: `Where appropriate, we can assess requirements involving <a href="${LINKS.mould}">mould</a> or <a href="${LINKS.odour}">odour treatment</a>.`,
      },
      {
        title: "Honest Expectations",
        bodyHtml: "We don't promise that detailing can repair leaks, electrical faults or permanent water damage.",
      },
      {
        title: "Photo-Based Assessment",
        bodyHtml: "Send us photographs before booking so we can understand the severity of the problem.",
      },
    ],
    ctaLabel: "Get a Flooded Car Quote",
  },

  /* ── Elementor 14 — the assessment form ──────────────────────────────── */
  quote: {
    /* The form's own title in the brief: "FLOODED CAR CLEANING QUOTE". */
    heading: "Flooded Car Cleaning Quote",
    title: "Send Photos for an Assessment & Quote",
    /* "MOST IMPORTANT POSITIONING — Customers need to understand: … Keep these
       messages consistent on the webpage, quote form, booking correspondence
       and Terms & Conditions." Beside the form, where they are agreed to. */
    messages: [
      "We clean and treat the interior.",
      "We do not repair the leak.",
      "We do not certify a flooded vehicle as safe.",
      "Water may exist beneath the visible carpet.",
      "Mould and odour can return if moisture returns.",
      "Seriously submerged vehicles may require technical assessment before detailing.",
      "Every job requires photos and an individual quote.",
    ],
  },

  /* ── Section 18 — FAQ ────────────────────────────────────────────────── */
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "Do you clean flooded cars in London?",
        a: [
          "Yes.",
          "Medusa provides mobile flooded-car and water-damage interior cleaning across our London service area, subject to the condition of the vehicle and a suitable working location.",
        ],
      },
      {
        q: "Can you remove standing water from my car?",
        a: [
          "Accessible standing water may be extracted where appropriate and included within the agreed service.",
          "However, hidden moisture beneath fixed carpets, insulation or inaccessible components may require additional specialist work.",
        ],
      },
      {
        q: "My car carpet is soaking wet. Can you help?",
        a: [
          "Potentially, yes.",
          "Send photographs and tell us where the water came from, how long it has been wet and which areas are affected.",
        ],
      },
      {
        q: "Can you dry underneath the carpet?",
        a: [
          "This depends on accessibility and the severity of the water ingress.",
          "Our standard mobile service does not automatically include dismantling seats, fixed carpet or the vehicle interior.",
          "Where extensive dismantling is required, additional specialist work may be necessary.",
        ],
      },
      {
        q: "Do you remove seats?",
        a: [
          "Seat removal is not included as standard within the mobile flooded-car cleaning service.",
          "If substantial dismantling is necessary, this may require an appropriate automotive specialist.",
        ],
      },
      {
        q: "Can you find where my car is leaking?",
        a: [
          "No.",
          "Medusa provides cleaning and detailing.",
          "We do not diagnose the mechanical or structural cause of water ingress.",
        ],
      },
      {
        q: "Should I fix the leak before cleaning?",
        a: [
          "Where water is still actively entering the vehicle, we strongly recommend having the underlying fault diagnosed and repaired.",
          "Otherwise, the interior may become wet again after cleaning.",
        ],
      },
      {
        q: "Can you remove damp smells?",
        a: [
          "Cleaning and appropriate odour treatment may significantly improve unwanted smells.",
          "However, complete or permanent odour removal cannot be guaranteed, particularly if moisture or contamination remains in inaccessible areas.",
        ],
      },
      {
        q: "Can you remove mould after flooding?",
        a: [
          `We provide <a href="${LINKS.mould}">specialist mould-cleaning services</a>.`,
          "Tell us before booking and send photographs if visible mould is present.",
        ],
      },
      {
        q: "Will mould come back?",
        a: [
          "It can.",
          "If the vehicle remains damp or the source of water ingress has not been repaired, mould may return after cleaning.",
        ],
      },
      {
        q: "Can you guarantee the car will be completely dry?",
        a: [
          "No.",
          "We can reduce/remove accessible moisture as part of the agreed service, but we cannot guarantee that every inaccessible layer, cavity, underlay, foam section or hidden component is completely dry.",
        ],
      },
      {
        q: "Can you guarantee there is no water damage?",
        a: [
          "No.",
          "A detailing service cannot diagnose or guarantee the absence of electrical, mechanical, structural or hidden water damage.",
        ],
      },
      {
        q: "My car was completely submerged. Can you clean it?",
        a: [
          "A substantially submerged vehicle should first be assessed by an appropriate automotive professional because water may have affected electrical, mechanical and safety-related systems.",
          "Contact us with photographs and details before arranging any cleaning.",
        ],
      },
      {
        q: "Can you clean floodwater from an electric vehicle?",
        a: [
          "Significantly flooded EVs and hybrids require additional caution because of high-voltage systems.",
          "Appropriate technical assessment may be required before detailing.",
        ],
      },
      {
        q: "Do you clean sewage-contaminated cars?",
        a: [
          "Vehicles contaminated with sewage, hazardous chemicals or other high-risk substances require individual assessment and may fall outside the scope of our normal mobile service.",
          "Tell us exactly what contaminated the vehicle before booking.",
        ],
      },
      {
        q: "How much does flooded car cleaning cost?",
        a: [
          "Every job is individually quoted.",
          "Pricing depends on the amount of water, vehicle size, affected areas, contamination, mould, odour and cleaning required.",
          /* The page's own path, not the bare anchor: the hub reads these
             answers too (`REBUILD.faq`), and there the anchor alone would
             point at nothing. */
          `Complete the <a href="${PATH}${QUOTE}">assessment form</a> and upload photographs.`,
        ],
      },
    ],
  },

  /* ── Section 19 — Important service information ──────────────────────── */
  terms: {
    heading: "Important Service Information",
    title: "Please Read Before Proceeding",
    items: [
      { name: "Cleaning Does Not Repair the Leak", body: "Medusa does not diagnose or repair the cause of water ingress." },
      {
        name: "Water Can Return",
        body: "If the underlying leak or drainage problem remains, the vehicle may become wet again.",
      },
      {
        name: "Hidden Moisture",
        body: "We cannot guarantee removal of all moisture from inaccessible cavities, fixed underlay, foam or hidden areas.",
      },
      {
        name: "Mould",
        body: "Complete or permanent mould prevention cannot be guaranteed where moisture remains or returns.",
      },
      { name: "Odours", body: "Complete or permanent smell removal cannot be guaranteed." },
      {
        name: "Electrical / Mechanical Damage",
        body: "Our cleaning service does not assess or certify the condition or safety of electrical, mechanical, structural or high-voltage vehicle systems.",
      },
    ] as Named[],
    permanent: {
      name: "Permanent Damage",
      lead: "Cleaning cannot reverse all:",
      items: [
        "Water staining",
        "Corrosion",
        "Dye loss",
        "Material deterioration",
        "Electrical damage",
        "Permanent mould staining",
        "Delamination",
        "Existing damage",
      ],
    },
    payment: {
      name: "Payment",
      body: "Payment is for the professional cleaning and treatment carried out and is not conditional upon complete moisture, mould, stain or odour removal.",
    },
    decline: {
      name: "Right to Decline",
      body: "Medusa reserves the right to decline or stop work where the vehicle's condition, contamination, electrical risk or other circumstances make the job unsuitable for our mobile detailing service.",
    },
  },

  /* ── Section 20 — Final CTA ──────────────────────────────────────────── */
  finalCta: {
    heading: "Water Inside Your Car?",
    title: "Send us photos before the problem gets worse.",
    tellLead: "Tell us:",
    tell: [
      "Where the water came from",
      "How long the interior has been wet",
      "Which areas are affected",
      "Whether there is standing water",
      "Whether there is mould or a damp smell",
    ],
    then: "Then upload clear photographs.",
    closing: "Mobile Flooded Car Cleaning Across London",
    quoteLabel: "Get an Assessment & Quote",
    whatsappLabel: "WhatsApp Photos",
  },

  /* ── The form's "AFTER SUBMISSION" ───────────────────────────────────── */
  thanks: {
    title: "Thank You",
    body: [
      "We've received your flooded-car cleaning enquiry.",
      "Our team will review the information and photographs supplied and contact you regarding suitability, treatment and quotation.",
    ],
    warning:
      "If the vehicle has been significantly flooded or has developed electrical/mechanical faults, please seek appropriate automotive assessment.",
    whatsappLabel: "WhatsApp Medusa",
  },

  /* "MOBILE STICKY CTA — Use: GET QUOTE | WHATSAPP. Do NOT use instant BOOK
     NOW for serious flooded-car enquiries." */
  sticky: { primary: "Get Quote", secondary: "WhatsApp" },
};

/**
 * What `content/overrides.ts` needs to point the rest of the site at the new
 * page — the hub card, the sitemap and the WebPage node read `PAGES`, not
 * this route. The first opening paragraph of 60 characters or more is the
 * hub card's blurb, so the one that describes the service leads; the
 * question and the sentence about hidden water follow it.
 *
 * `price` is undefined: "FLOODED CAR CLEANING IS QUOTE-ONLY." The brief
 * prices nothing, and the card should carry the quote button, not a figure.
 */
export const REBUILD = {
  slug: SLUG,
  mirrorH1: "Car Flooding and Water Damage Detailing in London",
  title: FLOOD.seo.title,
  description: FLOOD.seo.description,
  h1: FLOOD.hero.h1,
  og: PHOTOS.hero,
  intro: [FLOOD.hero.intro[2], FLOOD.hero.intro[0], FLOOD.hero.intro[1]],
  price: undefined as string | undefined,
  why: {
    heading: FLOOD.why.heading,
    items: FLOOD.why.items.map((it) => ({ title: it.title, body: it.bodyHtml.replace(/<[^>]+>/g, "") })),
  },
  faq: {
    heading: FLOOD.faq.heading,
    items: FLOOD.faq.items,
  },
};
