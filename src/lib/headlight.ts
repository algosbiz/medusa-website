/**
 * Content for /repairs/headlight-restoration.
 *
 * **Every sentence here is the client's own**, transcribed from the brief they
 * sent on 2026-10-06 ("Webite changes  (2).pdf", 35 pages): "Completely
 * replace/re-optimise the existing Headlight Restoration page using the
 * content below. KEEP EXISTING URL". Its eighteen sections, FAQ and SEO
 * strings are used as written — straight apostrophes, and bold wherever the
 * brief sets a phrase in bold. What the brief addressed to the developer
 * ("WEBSITE DEVELOPER: …", the Elementor page structure, the mobile UX and
 * sticky-CTA notes, the image-SEO table, the internal-linking and tracking
 * lists, the "most important conversion rule") is not copy; it decided the
 * layout.
 *
 * The brief's headline change is the honesty of the promise. The old page
 * said restoration "eliminates cloudiness, scratches, and discolouration",
 * left "a crystal-clear finish", applied a coating "to prevent future
 * yellowing and damage", was "risk-free", got "a legal, bright beam back"
 * and that the company was "always arriving on time" — every one of them on
 * the brief's "REMOVE FROM CURRENT PAGE" list. So nothing of the old page's
 * copy survives. The new page sells the same £100 service on what it can
 * and cannot do: an exterior lens restoration, five stages, UV protection
 * that "is not permanent", no MOT promise, and "complete removal of all
 * defects cannot be guaranteed".
 *
 * **Nothing is `ASSEMBLED`.** The brief does not contradict itself: one h1
 * ("Mobile Headlight Restoration London", in Section 1 and the SEO section
 * alike), one price (£100) and an FAQ written entirely to the customer.
 *
 * Three parts of the brief are not built here — two sections and the
 * booking system:
 *
 *   - **Section 2, Before & After, and Section 11, Before & After Gallery** —
 *     "Use a genuine Medusa before/after slider … The transformation needs to
 *     represent genuine Medusa work", "Create a gallery using genuine Medusa
 *     jobs". There are none: the site has no before & after of a headlight,
 *     and the old page never showed one. Its three posters titled "before &
 *     after" are of paintwork, with their own text baked in. Neither section
 *     is faked, and both wait for real photographs.
 *   - **The "BOOKING SYSTEM" section** — the required fields, the headlight
 *     condition questions, the four requested photographs and the required
 *     acknowledgement checkbox — belongs to book.medusaautodetailing.co.uk,
 *     which is not this repo, as the motorcycle, vomit cleaning, pet hair and
 *     odour briefs' booking sections did. The acknowledgement's wording is on
 *     this page regardless, closing Section 17 (`info.acknowledgement`).
 *
 * This file still exports `HEADLIGHT.hero.image`: `lib/hubs.ts` reads it as
 * the photograph on `/repairs`'s card for this page.
 */

import { BOOK_URL, CONTACT } from "@/lib/site";

export const SLUG = "repairs/headlight-restoration";
export const PATH = `/${SLUG}`;

/**
 * "GOOGLE ADS / CONVERSION TRACKING — Track: Book Now Click, WhatsApp Click,
 * Phone Click, Photo Upload / Enquiry, Completed Booking". `TrackClicks`
 * already reports every WhatsApp and `tel:` link; these are the other two
 * this page can fire. `photos` is on the two WhatsApp buttons that ask for
 * photographs ("WhatsApp Photos", and "WhatsApp Medusa" under "Send us a
 * photo"), which is this page's photo enquiry — there is no upload on it.
 * "Completed Booking" happens on book.medusaautodetailing.co.uk.
 */
export const TRACK = {
  book: "book_headlight_restoration_click",
  photos: "headlight_photo_enquiry_click",
} as const;

/**
 * "INTERNAL LINKING — Link naturally to relevant Medusa services such as:
 * Pre-Sale Car Valet, Paint Correction, Enhancement Detail, Car Valeting, Car
 * Detailing". The last two are laid on Section 14's own words ("an
 * appropriate Medusa valeting or detailing package"); the first three are
 * the pre-sale services its VIEW PRE-SALE SERVICES button leads to.
 */
export const LINKS = {
  preSale: { name: "Pre-Sale Car Valet", href: "/car-valeting/pre-sale-valet" },
  paintCorrection: { name: "Paint Correction", href: "/car-detailing/paint-correction" },
  enhancement: { name: "Enhancement Detail", href: "/car-detailing/enhancement-detail" },
  valeting: { name: "Car Valeting", href: "/car-valeting" },
  detailing: { name: "Car Detailing", href: "/car-detailing" },
} as const;

export type Photo = { src: string; alt: string; w: number; h: number };

/*
  The image-SEO table's filenames and alt text, on the photographs that fit
  them. Both are the old page's own, cropped to 3:2 from the portraits it
  ran them as: a headlight being wiped down with a microfibre cloth (its
  header photograph) and a machine polisher on a headlight lens. Neither is
  captioned as a particular customer's car or as a before & after. The
  table's other four slots — the before & after, a yellow headlight, wet
  sanding and the finished result — have no genuine photograph, and none is
  borrowed or faked.
*/
export const PHOTOS = {
  hero: {
    src: "/assets/2026/10/headlight-restoration-london.webp",
    alt: "Professional mobile headlight restoration in London",
    w: 1200,
    h: 800,
  },
  polishing: {
    src: "/assets/2026/10/headlight-polishing-london.webp",
    alt: "Machine polishing a car headlight in London",
    w: 1474,
    h: 983,
  },
} satisfies Record<string, Photo>;

export type Stage = {
  title: string;
  /** The Elementor structure's own label for the stage: "INSPECT → PREPARE
   *  → WET SAND → MACHINE POLISH → PROTECT". */
  flow: string;
  body: string[];
  list?: { lead: string; items: string[] };
  after?: string[];
};

export type Labelled = { title: string; body: string };

export const HEADLIGHT = {
  book: BOOK_URL,
  whatsapp: CONTACT.whatsapp,

  seo: {
    title: "Headlight Restoration London | Mobile Service From £100 | Medusa",
    description:
      "Mobile headlight restoration in London from £100. Multi-stage wet sanding, machine polishing and UV protection for cloudy, yellow and oxidised headlights.",
  },

  /**
   * "MOBILE UX — The first mobile screen should communicate: HEADLIGHT
   * RESTORATION LONDON · FROM £100 · WET SANDING • POLISHING • UV PROTECTION
   * · [BOOK NOW]". The h1 says the first; these are the hero's one panel
   * under it, and the booking button follows.
   */
  points: {
    price: { label: "From", value: "£100" },
    methods: ["Wet Sanding", "Polishing", "UV Protection"],
  },

  /* ── Section 1 — Hero ────────────────────────────────────────────────── */
  hero: {
    /* "Use ONE H1 only." */
    h1: "Mobile Headlight Restoration London",
    /** Read by `lib/hubs.ts` as `/repairs`'s card photograph for this page. */
    image: PHOTOS.hero.src,
    title: "Restore Cloudy, Yellow & Oxidised Headlights From £100",
    intro: [
      "Are your headlights looking cloudy, yellow, dull or heavily oxidised?",
      "Replacing complete headlight units can be expensive. Where the deterioration is affecting the <strong>exterior plastic lens</strong>, professional headlight restoration can often significantly improve clarity and appearance without replacing the complete unit.",
      "Medusa Auto Detailing provides professional <strong>mobile headlight restoration across London</strong>, using a multi-stage process designed to remove exterior oxidation and deterioration before polishing and protecting the lens.",
    ],
    card: {
      title: "Headlight Restoration From £100",
      ticks: [
        "Multi-Stage Wet Sanding",
        "Machine Polishing",
        "Exterior Oxidation Removal",
        "UV Protection Applied",
        "Mobile Service Across London",
        "We Come to You",
      ],
    },
    bookLabel: "Book Headlight Restoration",
    whatsappLabel: "WhatsApp Us",
    /* "SMALL TEXT:" */
    small:
      "Results depend on the age, condition and type of headlight. Complete removal of all defects cannot be guaranteed.",
  },

  /* ── Section 3 — Do your headlights look like this? ──────────────────── */
  signs: {
    heading: "Do Your Headlights Look Like This?",
    title: "Common Signs Your Headlights May Need Restoring",
    exposureLead: "Over time, exterior headlight lenses can deteriorate through exposure to:",
    exposures: [
      "UV",
      "Weather",
      "Road contamination",
      "General ageing",
      "Previous inappropriate cleaning",
      "Environmental exposure",
    ],
    lookLead: "This can leave the lens looking:",
    /* `look` names the small drawn lens each card carries — a picture of the
       word, not of a car. */
    looks: [
      { name: "Yellow", body: "A yellow tint has developed across the exterior lens." },
      { name: "Cloudy", body: "The headlight has lost its original clarity." },
      { name: "Hazy", body: "The plastic looks foggy or dull." },
      { name: "Oxidised", body: "The exterior surface has visibly deteriorated." },
      { name: "Dull", body: "The headlights make the whole front of the vehicle look older." },
      { name: "Uneven", body: "Parts of the lens are clearer than others." },
    ],
    closingHtml:
      "If the deterioration is primarily on the <strong>exterior surface</strong>, professional restoration may significantly improve the appearance.",
    bookLabel: "Book Now",
  },

  /* ── Section 4 — Restore before you replace ──────────────────────────── */
  replace: {
    heading: "Restore Before You Replace",
    title: "Your Headlights May Not Need Replacing",
    body: [
      "Cloudy headlights don't automatically mean you need completely new headlight units.",
      "Where the problem is caused by deterioration of the exterior plastic lens, professional restoration can be a much more practical option.",
      "Rather than simply applying polish to the surface, our restoration process can involve carefully removing the deteriorated exterior layer before progressively refining, polishing and protecting the lens.",
    ],
    improveLead: "Restoration May Help Improve:",
    improve: [
      "Exterior lens clarity",
      "Yellowing caused by exterior oxidation",
      "Cloudy appearance",
      "Dullness",
      "Exterior oxidation",
      "Light surface deterioration",
      "Overall vehicle appearance",
    ],
    price: { label: "From", value: "£100" },
    bookLabel: "Book Headlight Restoration",
  },

  /* ── Section 5 — Our 5-stage headlight restoration process ───────────── */
  process: {
    heading: "Our 5-Stage Headlight Restoration Process",
    title: "More Than Just Headlight Polishing",
    lead: [
      "A badly oxidised headlight normally requires more than simply applying compound and polishing it.",
      "Our process is adapted according to the condition of the headlight.",
    ],
    stages: [
      {
        title: "Inspection",
        flow: "Inspect",
        body: ["Before beginning restoration, we inspect the headlights."],
        list: {
          lead: "We look for:",
          items: [
            "Exterior oxidation",
            "Yellowing",
            "Cloudiness",
            "Surface deterioration",
            "Cracking",
            "Crazing",
            "Internal condensation",
            "Internal damage",
            "Existing lens damage",
          ],
        },
        after: ["This helps determine whether the issue appears suitable for exterior restoration."],
      },
      {
        title: "Preparation & Masking",
        flow: "Prepare",
        body: [
          "The headlight and surrounding area are prepared before restoration begins.",
          "Adjacent areas are appropriately protected while the lens is being worked on.",
        ],
      },
      {
        title: "Multi-Stage Wet Sanding",
        flow: "Wet Sand",
        body: [
          "Where required, the deteriorated exterior surface is carefully refined using appropriate wet-sanding stages.",
          "The exact stages used depend on the condition of the lens.",
          "This process is designed to remove or reduce the oxidised/deteriorated exterior layer before progressively refining the surface.",
        ],
      },
      {
        title: "Machine Polishing",
        flow: "Machine Polish",
        body: [
          "Once the appropriate sanding stages are complete, the lens is machine polished.",
          "This progressively refines the surface and restores clarity and gloss.",
        ],
      },
      {
        title: "UV Protection",
        flow: "Protect",
        body: [
          "Once restoration is complete, appropriate UV protection is applied to the treated exterior lens.",
          "This helps protect the newly restored surface from environmental and UV exposure.",
        ],
      },
    ] as Stage[],
    important: {
      title: "Important",
      bodyHtml: [
        "UV protection helps protect the surface but does <strong>not</strong> mean that future deterioration can never occur.",
        "Headlights remain exposed to sunlight, weather, washing and environmental conditions after restoration.",
      ],
    },
    bookLabel: "Book Your Headlight Restoration",
  },

  /* ── Section 6 — What can headlight restoration treat? ───────────────── */
  treat: {
    heading: "What Can Headlight Restoration Treat?",
    title: "Exterior Lens Problems",
    leadHtml:
      "Professional restoration is primarily intended for deterioration affecting the <strong>outside surface of the headlight lens</strong>.",
    listLead: "It may be suitable for:",
    items: [
      "Exterior oxidation",
      "Yellowing",
      "Cloudiness",
      "Hazy lenses",
      "Dull plastic lenses",
      "Surface deterioration",
      "Light exterior imperfections",
      "Failed/degraded exterior lens finish",
    ],
    after: "The improvement achievable depends on the original condition of the headlight.",
  },

  /* ── Section 7 — What headlight restoration cannot fix ───────────────── */
  cannot: {
    heading: "What Headlight Restoration Cannot Fix",
    title: "Not Every Headlight Problem Is on the Outside",
    important: "This is important.",
    lead: "Exterior headlight restoration cannot repair every headlight problem.",
    listLead: "It will not repair:",
    items: [
      {
        title: "Internal Condensation",
        body: "Moisture or condensation inside the headlight unit may indicate a seal or other internal problem.",
      },
      {
        title: "Internal Cloudiness",
        body: "If deterioration is on the inside of the lens, exterior sanding and polishing cannot remove it.",
      },
      {
        title: "Cracked Lenses",
        body: "Physical cracks require repair or replacement rather than normal exterior restoration.",
      },
      {
        title: "Severe Crazing",
        body: "Deep deterioration or cracking within the plastic itself may remain visible.",
      },
      {
        title: "Damaged Reflectors",
        body: "Restoring the outside lens doesn't repair internal reflector damage.",
      },
      {
        title: "Electrical Faults",
        body: "We are restoring the lens — not repairing headlight wiring, bulbs, control modules or electrical systems.",
      },
      {
        title: "Failed Seals",
        body: "Headlight restoration does not reseal or repair the headlight assembly unless separately stated and quoted.",
      },
      {
        title: "Stone Damage",
        body: "Deep chips and impact damage may remain after restoration.",
      },
      {
        title: "Structural Damage",
        body: "Exterior cosmetic restoration cannot repair structural damage to the headlight assembly.",
      },
    ] as Labelled[],
    guarantee: {
      title: "Important",
      /* Set in capitals by the brief, and by CSS here. */
      statement: "Complete removal of all defects cannot be guaranteed.",
      factorsLead: "The final result depends on:",
      factors: [
        "Age of the headlight",
        "Condition of the lens",
        "Depth of deterioration",
        "Previous restoration attempts",
        "Previous sanding/polishing",
        "Plastic condition",
        "Internal defects",
        "Cracking/crazing",
        "Existing damage",
      ],
      after:
        "Our technicians will make every reasonable effort to achieve the best possible result from an exterior restoration.",
    },
  },

  /* ── Section 8 — Headlight restoration & light output ────────────────── */
  light: {
    heading: "Headlight Restoration & Light Output",
    title: "Can Restoring Cloudy Headlights Improve Light Transmission?",
    leadHtml:
      "Where exterior oxidation, yellowing or cloudiness is obstructing the lens, improving exterior lens clarity <strong>may improve light transmission through the affected lens</strong>.",
    listLead: "However, headlight performance can also be affected by:",
    items: [
      "Bulbs",
      "LED units",
      "Reflectors",
      "Projectors",
      "Headlight alignment",
      "Electrical systems",
      "Internal lens condition",
      "Internal headlight damage",
    ],
    /* "For this reason: HEADLIGHT RESTORATION IS NOT AN MOT TEST. And: WE DO
       NOT GUARANTEE …" — the capitals are CSS. */
    forThis: "For this reason:",
    notMot: "Headlight restoration is not an MOT test.",
    and: "And:",
    noGuarantee: "We do not guarantee that restoration will make a headlight MOT-compliant or road-legal.",
    after:
      "If there is a mechanical, electrical, alignment or internal headlight fault, this may require assessment by an appropriate automotive repair specialist.",
  },

  /* ── Section 9 — Why UV protection matters ───────────────────────────── */
  uv: {
    heading: "Why UV Protection Matters",
    title: "Restoration Shouldn't Finish With Polishing",
    exposedLead: "Headlight lenses are constantly exposed to:",
    exposed: [
      "UV radiation",
      "Rain",
      "Heat",
      "Cold",
      "Road contamination",
      "Washing chemicals",
      "Environmental contamination",
    ],
    bodyHtml: [
      "Once an oxidised exterior layer has been removed and the lens restored, protecting the treated surface is an important final stage.",
      "That's why our restoration process includes <strong>UV protection</strong> after polishing.",
    ],
    helps: {
      title: "UV Protection Helps:",
      items: ["Protect the restored surface", "Reduce direct environmental exposure", "Preserve the restored finish"],
    },
    notPermanent: {
      title: "But It Is Not Permanent",
      body: "No exterior protection lasts indefinitely.",
      factorsLead: "Future durability depends on factors such as:",
      factors: [
        "Vehicle storage",
        "UV exposure",
        "Mileage",
        "Weather",
        "Washing methods",
        "Chemicals used",
        "Original lens condition",
      ],
      after: "We do not claim that the headlights can never yellow or oxidise again.",
    },
  },

  /* ── Section 10 — Headlight restoration pricing ──────────────────────── */
  pricing: {
    heading: "Headlight Restoration Pricing",
    title: "From £100",
    startsFrom: "Our professional mobile headlight restoration service starts from:",
    amount: "£100",
    includedLead: "Standard Service Includes:",
    included: [
      "Headlight assessment",
      "Preparation",
      "Masking/protection of surrounding areas",
      "Multi-stage wet sanding where required",
      "Machine polishing",
      "UV protection",
    ],
    why: {
      title: 'Why "From" £100?',
      body: "Some headlights require significantly more correction than others.",
      factorsLead: "Final pricing can depend on:",
      factors: [
        "Severity of oxidation",
        "Condition of the lenses",
        "Size of headlights",
        "Previous restoration attempts",
        "Level of sanding required",
        "Existing damage",
        "Vehicle/headlight design",
      ],
      after: "Where necessary, we may request photographs before confirming the price.",
    },
    unsure: {
      title: "Not Sure?",
      body: "Send us clear photographs of both headlights.",
      whatsappLabel: "WhatsApp Photos",
    },
    bookLabel: "Book Now",
  },

  /* ── Section 12 — Why choose Medusa? ─────────────────────────────────── */
  why: {
    heading: "Why Choose Medusa?",
    title: "Mobile Headlight Restoration Across London",
    items: [
      {
        title: "We Come to You",
        body: ["Our technicians travel directly to suitable homes and workplaces across our London service area."],
      },
      {
        title: "Multi-Stage Process",
        body: [
          "This is not simply a quick wipe and polish.",
          "Where required, the process involves progressive wet sanding, machine polishing and protection.",
        ],
      },
      {
        title: "Professional Equipment",
        body: ["We use professional detailing equipment and appropriate products for the restoration process."],
      },
      {
        title: "UV Protection Included",
        body: ["The restored exterior lens receives protection after the polishing stage."],
      },
      {
        title: "Realistic Expectations",
        body: ["We don't promise that exterior restoration can repair internal or structural headlight damage."],
      },
      {
        title: "From £100",
        body: ["Straightforward starting price with photographs requested where additional assessment is required."],
      },
    ],
    bookLabel: "Book Headlight Restoration",
  },

  /* ── Section 13 — Is headlight restoration right for my car? ─────────── */
  suitable: {
    heading: "Is Headlight Restoration Right for My Car?",
    yes: {
      title: "Headlight Restoration Is Worth Considering If:",
      items: [
        "Your headlights have become yellow",
        "The exterior lenses look cloudy",
        "The headlights look dull compared with the rest of the vehicle",
        "You can see obvious exterior oxidation",
        "You're preparing your vehicle for sale",
        "You want to improve the appearance of the front of the vehicle",
        "You want to investigate restoration before replacing complete headlight units",
      ],
    },
    no: {
      title: "It May Not Be the Right Service If:",
      items: [
        "The lens is badly cracked",
        "The issue is entirely inside the headlight",
        "There is significant internal condensation",
        "The headlight has an electrical fault",
        "The reflector/projector is damaged",
        "The complete headlight assembly is structurally damaged",
      ],
    },
    unsure: {
      lead: "If you're unsure:",
      title: "Send Us a Photo.",
      body: "Our team can review the visible condition before your appointment.",
      whatsappLabel: "WhatsApp Medusa",
    },
  },

  /* ── Section 14 — Pre-sale headlight restoration ─────────────────────── */
  preSale: {
    heading: "Pre-Sale Headlight Restoration",
    title: "Selling Your Car?",
    body: [
      "Cloudy and yellow headlights can make an otherwise well-presented vehicle look significantly older.",
      "Headlight restoration can therefore be a useful addition when preparing a vehicle for sale.",
    ],
    combineHtml: `Combine it with an appropriate Medusa <a href="${LINKS.valeting.href}">valeting</a> or <a href="${LINKS.detailing.href}">detailing</a> package to improve the overall presentation of your vehicle before:`,
    before: ["Advertising it", "Photographing it", "Dealer appraisal", "Part exchange", "Private sale"],
    services: [LINKS.preSale, LINKS.paintCorrection, LINKS.enhancement],
    ctaLabel: "View Pre-Sale Services",
    ctaHref: LINKS.preSale.href,
  },

  /* ── Section 15 — Customer reviews ───────────────────────────────────── */
  reviews: { heading: "Trusted By Customers Across London" },

  /* ── Section 16 — FAQ ────────────────────────────────────────────────── */
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "How much does headlight restoration cost?",
        a: [
          "Our mobile headlight restoration service starts from <strong>£100</strong>.",
          "Final pricing can depend on the condition, size and level of deterioration.",
        ],
      },
      {
        q: "What is included in headlight restoration?",
        a: [
          "Depending on condition, the process can include inspection, preparation, multi-stage wet sanding, machine polishing and UV protection.",
        ],
      },
      {
        q: "Do you come to my home?",
        a: [
          "Yes.",
          "Medusa Auto Detailing provides mobile headlight restoration across our London service area, subject to a suitable working location.",
        ],
      },
      {
        q: "Can you restore yellow headlights?",
        a: [
          "Exterior yellowing caused by deterioration or oxidation of the lens may be significantly improved through professional restoration.",
          "Results depend on the condition and depth of the deterioration.",
        ],
      },
      {
        q: "Can you restore cloudy headlights?",
        a: [
          "If the cloudiness is caused by deterioration of the exterior lens, restoration may significantly improve clarity.",
          "Cloudiness caused by an internal problem cannot be corrected through exterior restoration.",
        ],
      },
      {
        q: "Can you remove all scratches?",
        a: [
          "No.",
          "Light surface imperfections may be improved, but complete scratch removal cannot be guaranteed.",
          "Deep damage may remain.",
        ],
      },
      {
        q: "Will my headlights look brand new?",
        a: [
          "We do not guarantee a brand-new appearance.",
          "Many suitable headlights can achieve a significant visual improvement, but results depend on their age, condition and existing damage.",
        ],
      },
      {
        q: "Do you wet sand the headlights?",
        a: [
          "Where required, yes.",
          "Our restoration process can include progressive wet sanding before machine polishing.",
          "The exact process depends on the condition of the lens.",
        ],
      },
      {
        q: "Do you polish the headlights?",
        a: [
          "Yes.",
          "Machine polishing forms part of the restoration process after the appropriate preparation/refinement stages.",
        ],
      },
      {
        q: "Do you apply UV protection?",
        a: [
          "Yes.",
          "UV protection is applied following restoration.",
          "However, no exterior protection is permanent and we cannot guarantee that future deterioration will never occur.",
        ],
      },
      {
        q: "How long will the restoration last?",
        a: [
          "There is no single guaranteed lifespan.",
          "Durability depends on factors including UV exposure, vehicle storage, weather, washing methods, mileage, chemicals used and the original condition of the lens.",
        ],
      },
      {
        q: "Will headlight restoration make my car pass its MOT?",
        a: [
          "We cannot guarantee this.",
          "Headlight restoration treats the exterior lens.",
          "An MOT result can depend on other factors outside the scope of our service.",
        ],
      },
      {
        q: "Can you fix condensation inside my headlight?",
        a: [
          "Exterior restoration does not repair the cause of internal condensation or failed headlight seals.",
          "An automotive repair specialist may be required.",
        ],
      },
      {
        q: "Can you repair cracked headlights?",
        a: [
          "Standard headlight restoration is not a structural repair service.",
          "Cracked or structurally damaged units may require specialist repair or replacement.",
        ],
      },
      {
        q: "Do I need to send photos first?",
        a: [
          "Not necessarily for every booking, but photographs are recommended.",
          "For heavily deteriorated, damaged or unusual headlights, we may need photographs before confirming suitability or final pricing.",
        ],
      },
    ],
  },

  /* ── Section 17 — Important service information ──────────────────────── */
  info: {
    heading: "Important Service Information",
    title: "Please Read Before Booking",
    items: [
      {
        title: "Exterior Restoration",
        body: "Our standard Headlight Restoration service treats the exterior lens. It does not include dismantling the headlight unit or correcting internal defects.",
      },
      {
        title: "Results Vary",
        body: "The achievable result depends on the age, material, condition and severity of deterioration.",
      },
      {
        title: "Complete Defect Removal Is Not Guaranteed",
        body: "Deep scratches, cracks, crazing, stone damage, internal deterioration and other defects may remain visible.",
      },
      {
        title: "Internal Problems",
        body: "Condensation, failed seals, internal cloudiness, reflector damage and electrical faults are outside the scope of standard exterior restoration.",
      },
      {
        title: "UV Protection",
        body: "UV protection is applied following restoration, but future oxidation or deterioration cannot be completely prevented or guaranteed against.",
      },
      {
        title: "MOT / Roadworthiness",
        body: "Headlight restoration is not an MOT inspection and we do not guarantee that the service will make a vehicle compliant with MOT or roadworthiness requirements.",
      },
    ] as Labelled[],
    /* The booking system's "REQUIRED ACKNOWLEDGEMENT", word for word. The
       checkbox itself is book.medusaautodetailing.co.uk's; its wording is
       here so that a customer reads it before they get there. */
    acknowledgement: {
      title: "Required Acknowledgement",
      body: "I understand that headlight restoration treats exterior lens deterioration and that results depend on the existing condition of the headlights. I understand that complete removal of all defects cannot be guaranteed and that internal, electrical, structural or condensation-related problems are not repaired by standard exterior headlight restoration.",
    },
  },

  /* ── Section 18 — Final CTA ──────────────────────────────────────────── */
  finalCta: {
    heading: "Bring Your Cloudy Headlights Back to Life",
    body: [
      "Yellow, cloudy or oxidised headlights can dramatically age the appearance of your vehicle.",
      "Professional restoration can significantly improve suitable exterior lenses without immediately resorting to complete headlight replacement.",
    ],
    card: {
      title: "Professional Mobile Headlight Restoration",
      price: { label: "From", value: "£100" },
      points: ["Multi-Stage Wet Sanding", "Machine Polishing", "UV Protection", "Mobile Across London"],
    },
    bookLabel: "Book Headlight Restoration",
    whatsappLabel: "WhatsApp Medusa",
  },

  /* "MOBILE STICKY CTA — Use: BOOK NOW | WHATSAPP. Keep visible while
     scrolling." */
  sticky: { book: "Book Now", whatsapp: "WhatsApp" },
};

/**
 * What the lead's `content/overrides.ts` rule needs, so `/repairs`'s card for
 * this page, the sitemap and the WebPage node read the new page rather than
 * the mirror's.
 */
export const REBUILD = {
  slug: SLUG,
  /** The h1 `pages.json` carries for this slug today. */
  mirrorH1: "Mobile Headlight Restoration in London",
  title: HEADLIGHT.seo.title,
  description: HEADLIGHT.seo.description,
  h1: HEADLIGHT.hero.h1,
  og: PHOTOS.hero,
  /**
   * The hero's three paragraphs, the one that describes the service first:
   * the hub card's blurb is the first paragraph of 60 characters or more,
   * and the question that opens the page ("Are your headlights looking
   * cloudy, yellow, dull or heavily oxidised?") is 69.
   */
  intro: [HEADLIGHT.hero.intro[2], HEADLIGHT.hero.intro[0], HEADLIGHT.hero.intro[1]],
  /** A bookable service with one starting price — Section 10, "starts from £100". */
  price: "From £100" as string | undefined,
  why: {
    heading: HEADLIGHT.why.heading,
    items: HEADLIGHT.why.items.map((w) => ({ title: w.title, body: w.body.join(" ") })),
  },
  faq: HEADLIGHT.faq,
};
