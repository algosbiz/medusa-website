/**
 * Content for /repairs/car-graffiti-removal.
 *
 * **Every sentence here is the client's own**, transcribed from the brief they
 * sent on 2026-10-06 ("Webite changes  (4).pdf", 46 pages): "Completely
 * replace/re-optimise the existing Car Graffiti Removal page using the content
 * below. KEEP EXISTING URL". Its eighteen sections, its FAQ and its SEO strings
 * are used as written — straight apostrophes, and bold wherever the brief sets
 * a phrase in bold. What the brief addresses to the developer ("WEBSITE
 * DEVELOPER: …", the Elementor page structure, the mobile UX and sticky-CTA
 * notes, the image-SEO table, the internal-linking list, the form's back-end
 * rules, the "remove from current page" list) is not copy; it decided the
 * layout instead.
 *
 * The headline change: the page stops teaching. The old one walked the reader
 * through rubbing compound, clay bar, Prepsol and pressure washing, and
 * promised removal "without damaging the surface" — all on the brief's list to
 * remove. The new one says the opposite: don't experiment, send photographs,
 * every job is quoted individually, and "complete removal or perfect underlying
 * paint cannot be guaranteed". Nothing of the old page survives. The quote form
 * is the page's own (`lib/graffiti-quote.ts`): "This page should NOT use the
 * standard generic contact form."
 *
 * Some strings come from the brief's *layout* notes rather than its copy, and
 * are its own words all the same: the urgent advice bar under the hero
 * (`advice`), the mobile first screen's "SPRAY PAINT • GRAFFITI • VANDALISM"
 * and "DON'T APPLY SOLVENTS OR ABRASIVES BEFORE WE ASSESS IT." (`hero.strap`,
 * `hero.mobileWarning`), the process visual's six labels (`Step.flow`), the
 * special-surfaces card names (the `tags` of Sections 8–10) and the pricing
 * block's "PHOTOS REQUIRED". The seven lines of its "MOST IMPORTANT SEO + CONVERSION
 * MESSAGE" — what "the customer needs to understand" — are `quote.messages`,
 * the sequence beside the form, as the odour page carries its brief's four
 * points.
 *
 * Nothing is `ASSEMBLED`: the brief does not contradict itself, and none of
 * its FAQ answers carries a note to the developer.
 *
 * Not built, because the brief says what it needs and it does not exist yet:
 *
 *   - **Section 6 and the layout's item 12, Before & After** — "Use genuine
 *     Medusa before/after images … Add before/after slider functionality",
 *     then a "BEFORE/AFTER GALLERY — Genuine jobs." The site has no graffiti
 *     job photographed at all, so neither the section, its caption nor the
 *     gallery is on the page. The same call every rebuild of 2026-10-06 made.
 *   - **Four of the six image-SEO files** — spray paint, before & after, van
 *     and close-up all need a photograph of graffiti or of a van being worked
 *     on, and none exists. The two below are the site's own.
 *   - **Section 15's reviews** are "genuine Medusa customer reviews …
 *     Prioritise reviews mentioning paintwork, paint correction …": the site
 *     has four, none about graffiti, shown word for word under the brief's
 *     heading and never as reviews of this service.
 *
 * Internal links — "Link naturally to: Paint Overspray Removal, Paint
 * Correction, Machine Polishing, Enhancement Detail, Vehicle Signage Removal,
 * Pre-Sale Valet" — are laid on words the copy already uses: "machine
 * polishing", "paint correction", "Sign writing", "quote form". The copy never
 * names enhancement or a pre-sale valet, and Paint Overspray Removal has no
 * page: `/repairs/paint-overspray-removal` became Interior Paint Spill Removal
 * the same day, whose brief says it "is NOT for exterior paint overspray".
 */

import { BOOK_URL, CONTACT } from "@/lib/site";

export const SLUG = "repairs/car-graffiti-removal";
export const PATH = `/${SLUG}`;

/** "QUOTE FORM — This is the main conversion section. Set anchor:
 *  #get-graffiti-removal-quote. Every GET A QUOTE button should scroll to
 *  this form." */
export const FORM_ANCHOR = "get-graffiti-removal-quote";
export const QUOTE = `#${FORM_ANCHOR}`;

/** The pages the brief asks this one to link to, where the copy names them. */
export const LINKS = {
  machinePolish: "/car-detailing/machine-polish",
  paintCorrection: "/car-detailing/paint-correction",
  signage: "/commercial-valeting/car-van-stickers-removal",
} as const;

const MACHINE_POLISHING = `<a href="${LINKS.machinePolish}">machine polishing</a>`;
const PAINT_CORRECTION = `<a href="${LINKS.paintCorrection}">paint correction</a>`;

/**
 * "CONVERSION TRACKING — Track: Graffiti Quote Form Submitted, Photo Upload,
 * WhatsApp Click, Phone Click, Email Click. A completed quote form should be
 * the primary conversion for this page." WhatsApp and phone clicks are the
 * shared `whatsapp_click` / `phone_click` that `TrackClicks` fires on its own;
 * the email event is carried by the page's own mailto links.
 */
export const TRACK = {
  /* Every GET A QUOTE on the page — each one scrolls to the form. */
  quote: "graffiti_quote_click",
  submitted: "graffiti_quote_form_submitted",
  photoUpload: "graffiti_photo_upload",
  email: "email_click",
} as const;

export type Photo = { src: string; alt: string; w: number; h: number };

/*
  The image-SEO table's filenames and alt text, on the two photographs that
  fit them. Both are already the client's: the hero is the site's May 2026
  picture of a technician working a product off a silver door with a
  microfibre — the closest the site has to "a controlled removal process" —
  and the polishing close-up is one of the old graffiti page's own three
  pictures. Neither is captioned as a particular customer's car, and neither
  shows graffiti; there is no photograph of graffiti to use, so none is
  faked.
*/
export const PHOTOS = {
  hero: {
    src: "/assets/2026/10/car-graffiti-removal-london.webp",
    alt: "Professional car graffiti removal in London",
    w: 2048,
    h: 1365,
  },
  /* A machine polisher's pad on dark paint — beside Step 5. */
  polishing: {
    src: "/assets/2026/10/car-paint-polishing-after-graffiti-removal.webp",
    alt: "Machine polishing car paint after graffiti removal",
    w: 1469,
    h: 980,
  },
} satisfies Record<string, Photo>;

export type Titled = { title: string; body: string };

export type Step = {
  title: string;
  /** The layout's word for the step — "ASSESS ↓ PRE-CLEAN ↓ …". */
  flow: string;
  body: string[];
  /** A list the brief sets inside the step: its lead (HTML), then the items. */
  list?: { leadHtml: string; items: string[] };
  after?: string[];
  important?: { title: string; body: string[] };
};

export type Surface = {
  /** Anchor, so the special-surface tags can point at it. */
  id: string;
  /** "SPECIAL SURFACES — Cards: PAINTWORK, PLASTIC, GLASS, WRAP, PPF". */
  tags: string[];
  heading: string;
  title: string;
};

export const GRAFFITI = {
  book: BOOK_URL,
  whatsapp: CONTACT.whatsapp,

  seo: {
    title: "Car Graffiti Removal London | Spray Paint Removal | Medusa",
    description:
      "Professional mobile car graffiti and spray paint removal in London. Cars, vans and commercial vehicles. Upload photos for a tailored removal quote.",
  },

  /* ── Section 1 — Hero ────────────────────────────────────────────────── */
  hero: {
    /* "H1: Car Graffiti & Spray Paint Removal London … ONE H1 ONLY." */
    h1: "Car Graffiti & Spray Paint Removal London",
    subtitle: "Professional Mobile Removal of Unwanted Paint & Graffiti From Vehicles",
    /* "MOBILE UX — The first mobile screen should communicate: CAR GRAFFITI
       REMOVAL LONDON · SPRAY PAINT • GRAFFITI • VANDALISM · SEND PHOTOS FOR
       A QUOTE · [UPLOAD PHOTOS] [WHATSAPP]. Then immediately: …" */
    strap: ["Spray Paint", "Graffiti", "Vandalism"],
    photosLine: "Send Photos for a Quote",
    mobileWarning: "DON'T APPLY SOLVENTS OR ABRASIVES BEFORE WE ASSESS IT.",
    question: "Has your car or van been vandalised with spray paint, graffiti or unwanted paint?",
    /* Bold in the brief, the whole sentence. */
    warn: "Don't start scrubbing it or applying household solvents.",
    risk: "The wrong chemical or removal technique can potentially cause further damage to the vehicle's clear coat, paintwork, plastics or trim.",
    introHtml:
      "Medusa Auto Detailing provides professional <strong>mobile car graffiti and spray paint removal across London</strong>, using a controlled removal process selected according to the contamination and the surface affected.",
    vehicles: ["Car", "Van", "Commercial Vehicle"],
    ticks: [
      "Spray Paint Removal",
      "Graffiti Removal",
      "Vandalism Paint Removal",
      "Paintwork Assessment",
      "Controlled Removal Process",
      "Machine Polishing Where Required",
      "Mobile Service Across London",
    ],
    /* "The primary CTA should NOT be: BOOK NOW. Use: GET A QUOTE because the
       vehicle needs assessment first." */
    quoteLabel: "GET A FREE QUOTE",
    whatsappLabel: "WHATSAPP PHOTOS",
    important: {
      title: "Important",
      /* Bold in the brief, the whole paragraph. */
      body: "Complete removal cannot be guaranteed in every case. Results depend on the type of contamination, affected surface, underlying paint condition and any damage already caused.",
    },
  },

  /* ── Layout 2 — Urgent advice bar ────────────────────────────────────────
     "Immediately below hero: DON'T SCRUB IT. DON'T APPLY RANDOM SOLVENTS.
     TAKE PHOTOS & CONTACT US FIRST. [GET A QUOTE]" */
  advice: {
    lines: ["DON'T SCRUB IT.", "DON'T APPLY RANDOM SOLVENTS."],
    action: "TAKE PHOTOS & CONTACT US FIRST.",
    cta: "GET A QUOTE",
  },

  /* ── Section 2 — Had your vehicle spray painted? ─────────────────────── */
  panic: {
    heading: "Had Your Vehicle Spray Painted?",
    title: "Don't Panic — And Don't Start Scrubbing",
    body: [
      "Finding graffiti across your vehicle can be extremely frustrating.",
      "The natural reaction is often to try to remove it immediately.",
    ],
    using: {
      lead: "However, using inappropriate:",
      items: [
        "Solvents",
        "Paint thinners",
        "Abrasive compounds",
        "Household chemicals",
        "Scrubbing pads",
        "Blades",
        "Aggressive pressure washing",
      ],
      after: "can potentially make the situation worse.",
    },
    youMay: {
      lead: "You may:",
      items: [
        "Scratch the clear coat",
        "Damage surrounding paint",
        "Mark plastic trim",
        "Create dull patches",
        "Remove or weaken existing protection",
        "Spread the contamination",
        "Make later professional correction more difficult",
      ],
    },
    photosFirst: {
      title: "SEND US PHOTOS FIRST.",
      body: "We'll assess the visible contamination and advise on the appropriate next step.",
      cta: "UPLOAD PHOTOS FOR A QUOTE",
    },
  },

  /* ── Section 3 — What we can assess ──────────────────────────────────── */
  assess: {
    heading: "What We Can Assess",
    title: "Vehicle Graffiti & Unwanted Paint Removal",
    lead: "We can assess contamination including:",
    /* "WHAT WE REMOVE — Cards: SPRAY PAINT, GRAFFITI, VANDALISM PAINT,
       FOREIGN PAINT" — the copy's own four, under the copy's own names. */
    types: [
      { title: "Spray Paint", body: "Unwanted spray paint applied to vehicle bodywork or suitable exterior surfaces." },
      { title: "Graffiti", body: "Paint or markings applied during vehicle vandalism." },
      { title: "Paint Vandalism", body: "Unwanted paint deliberately applied to a car, van or commercial vehicle." },
      {
        title: "Paint Transfer / Foreign Paint",
        body: "Certain forms of unwanted surface paint contamination may also be suitable for professional removal.",
      },
    ] as Titled[],
    panels: {
      title: "Multiple Affected Panels",
      lead: "We can assess graffiti covering:",
      items: ["Bonnet", "Doors", "Wings", "Quarter panels", "Boot", "Roof", "Bumpers", "Multiple body panels"],
    },
    commercial: {
      title: "Commercial Vehicles",
      body: "Cars aren't the only vehicles affected.",
      lead: "We can also assess:",
      items: ["Vans", "Company vehicles", "Fleet vehicles", "Suitable commercial vehicles"],
    },
    cta: "GET A QUOTE",
  },

  /* ── Section 4 — Every graffiti job is different ─────────────────────── */
  different: {
    heading: "Every Graffiti Job Is Different",
    title: "Why We Need Photos Before Pricing",
    lead: "There isn't one universal method for removing unwanted paint from a vehicle.",
    factorsLead: "The appropriate process depends on:",
    factors: [
      { title: "Type of Contamination", body: "Different paints and substances respond differently to removal methods." },
      {
        title: "How Long It Has Been There",
        body: "Fresh contamination may behave differently from material that has been allowed to cure or remain on the vehicle for an extended period.",
      },
      {
        title: "Original Vehicle Paint",
        body: "Factory paint, previously repaired paint and refinished panels may respond differently.",
      },
      {
        title: "Surface Affected",
        body: "Painted metal, plastic trim, glass, lights and other exterior materials require different approaches.",
      },
      {
        title: "Size of the Affected Area",
        body: "A small marking on one panel is very different from graffiti covering an entire side of a vehicle.",
      },
      {
        title: "Existing Damage",
        body: "The vandalism itself may already have scratched, stained, etched or otherwise affected the underlying surface.",
      },
      {
        title: "Previous Removal Attempts",
        body: "If chemicals, compounds, blades, abrasive pads or other methods have already been used, this can change the condition of the affected area.",
      },
    ] as Titled[],
    statement: "THIS IS WHY ALL GRAFFITI REMOVAL JOBS ARE QUOTED INDIVIDUALLY.",
    cta: "UPLOAD PHOTOS",
  },

  /* ── Section 5 — Our graffiti removal process ────────────────────────── */
  process: {
    heading: "Our Graffiti Removal Process",
    title: "A Controlled, Surface-Specific Approach",
    intro: [
      "The exact process depends on the contamination and condition of the vehicle.",
      "We start with the least aggressive appropriate method and increase the level of correction only where required.",
    ],
    /* `flow` is the layout's own visual: "ASSESS ↓ PRE-CLEAN ↓ CONTROLLED
       REMOVAL ↓ DECONTAMINATE ↓ POLISH IF REQUIRED ↓ INSPECT". */
    steps: [
      {
        title: "Vehicle & Paintwork Assessment",
        flow: "Assess",
        body: ["Before beginning, we inspect the affected area."],
        list: {
          leadHtml: "We look at:",
          items: [
            "Type of contamination",
            "Number of affected panels",
            "Surface affected",
            "Underlying paint condition",
            "Previous repairs where visible",
            "Existing scratches or defects",
            "Previous removal attempts",
            "Plastics/trim affected",
            "Severity of contamination",
          ],
        },
        after: ["Where appropriate, we may perform a small test area before proceeding further."],
      },
      {
        title: "Pre-Cleaning",
        flow: "Pre-Clean",
        body: [
          "Loose contamination and surface dirt are appropriately removed before attempting graffiti removal.",
          "This allows us to work on the unwanted paint without unnecessarily dragging surrounding dirt across the vehicle's paintwork.",
        ],
      },
      {
        title: "Controlled Removal",
        flow: "Controlled Removal",
        body: [
          "An appropriate removal method is selected according to the contamination and surface.",
          "This may involve specialist automotive cleaning/decontamination products and controlled detailing techniques.",
          "We do not use one aggressive method on every vehicle.",
        ],
      },
      {
        title: "Decontamination Where Required",
        flow: "Decontaminate",
        body: [
          "Additional surface decontamination may be required where unwanted paint or residue remains bonded to the exterior surface.",
          "The exact process is determined by the technician.",
        ],
      },
      {
        title: "Machine Polishing Where Required",
        flow: "Polish If Required",
        body: ["Graffiti removal can sometimes leave the affected paintwork requiring additional refinement."],
        list: {
          leadHtml: `Where appropriate and included within the quotation, ${MACHINE_POLISHING} may be used to:`,
          items: [
            "Improve paint clarity",
            "Refine light surface marks",
            "Restore gloss to the treated area",
            "Improve the overall finish",
          ],
        },
        important: {
          title: "Important",
          body: [
            "Machine polishing cannot correct every form of damage.",
            "Deep scratches, etching, paint damage or defects that have penetrated beyond the safely correctable surface may remain.",
          ],
        },
      },
      {
        title: "Final Inspection",
        flow: "Inspect",
        body: [
          "Once treatment is complete, the affected areas are inspected and appropriate finishing work is carried out.",
        ],
      },
    ] as Step[],
  },

  /* ── Section 7 — What if the graffiti has damaged the paint? ─────────── */
  damage: {
    heading: "What If the Graffiti Has Damaged the Paint?",
    title: "Removal and Paint Damage Are Two Different Problems",
    lead: "Sometimes the unwanted paint can be removed but damage to the vehicle remains underneath.",
    listLead: "Graffiti or vandalism may leave:",
    list: [
      "Scratches",
      "Etching",
      "Staining",
      "Dull areas",
      "Clear-coat damage",
      "Paint damage",
      "Marks from the vandalism itself",
      "Marks caused by previous DIY removal attempts",
    ],
    removing: "Removing the unwanted substance does not automatically repair damage underneath it.",
    suitableHtml: `Where suitable, additional ${MACHINE_POLISHING} or ${PAINT_CORRECTION} may improve certain defects.`,
    however: "However:",
    statement: "Complete Restoration Cannot Be Guaranteed.",
    bodyshop:
      "If damage has penetrated too deeply into the paint system, professional bodyshop repair or repainting may be required.",
  },

  /* ── Sections 8–10 — "SPECIAL SURFACES" ──────────────────────────────── */
  repainted: {
    id: "repainted-panels",
    tags: ["Paintwork"],
    heading: "Previously Repainted Panels",
    title: "Tell Us If Your Vehicle Has Had Paintwork Before",
    important: "This is important.",
    body: "Previously repaired or repainted panels can behave differently from original factory paint.",
    listLead: "If you know that an affected panel has previously been:",
    list: ["Repainted", "Smart repaired", "Bodyshop repaired", "Touched up", "Lacquered", "Resprayed"],
    after: "please tell us before work begins.",
    why: {
      title: "Why?",
      body: "Different paint systems, repair quality, paint thickness and curing can affect what removal processes can safely be attempted.",
    },
    notSureHtml: `If you're unsure whether the vehicle has previously been painted, simply select <strong>Not Sure</strong> on the <a href="${QUOTE}">quote form</a>.`,
  },

  surfaces: {
    id: "plastic-trim-surfaces",
    tags: ["Plastic", "Glass"],
    heading: "Plastic, Trim & Other Surfaces",
    title: "Graffiti Isn't Always Only on Paintwork",
    lead: "Unwanted paint may also affect:",
    list: [
      "Plastic bumpers",
      "Textured plastics",
      "Rubber trim",
      "Glass",
      "Headlights",
      "Rear lights",
      "Number plates",
      "Vinyl/wrap",
      "Exterior trim",
    ],
    body: "Different surfaces react differently to contamination and cleaning products.",
    important: {
      title: "Important",
      body: [
        "Some porous, textured or sensitive materials may retain staining even after treatment.",
        "Vinyl wraps, PPF, decals and other applied films may also require a different approach and in some cases may need replacement rather than cleaning.",
      ],
    },
    after: "We will assess the visible affected areas before providing or confirming the quotation.",
  },

  wrapped: {
    id: "wrapped-ppf-vehicles",
    tags: ["Wrap", "PPF"],
    heading: "Wrapped & PPF Vehicles",
    title: "Is Your Vehicle Wrapped or Protected With PPF?",
    lead: "Tell us before booking if the affected area has:",
    /* HTML — "Sign writing" carries the link to Vehicle Signage Removal. */
    list: [
      "Vinyl wrap",
      "Paint protection film / PPF",
      "Decals",
      `<a href="${LINKS.signage}">Sign writing</a>`,
      "Custom graphics",
    ],
    body: [
      "Graffiti-removal methods suitable for automotive clear coat may not be appropriate for these materials.",
      "Where contamination has significantly affected a wrap, PPF or graphic, replacement of the affected film may be required.",
      "Medusa's standard graffiti-removal service does not guarantee restoration of damaged wraps or PPF.",
    ],
  },

  /* ── Section 11 — What not to do before we arrive ────────────────────── */
  avoid: {
    heading: "What Not to Do Before We Arrive",
    title: "Avoid Making the Damage Worse",
    lead: "Before professional assessment, avoid experimenting with aggressive DIY removal methods.",
    listLead: "We recommend avoiding:",
    items: [
      { title: "Paint Thinner", body: "Can potentially affect automotive finishes." },
      {
        title: "Random Solvents",
        body: "A product being capable of dissolving paint does not mean it is suitable for your vehicle's surface.",
      },
      { title: "Scouring Pads", body: "These can introduce significant scratching." },
      { title: "Blades or Scrapers on Paint", body: "These can damage the clear coat and underlying finish." },
      {
        title: "Heavy Compounding",
        body: "Aggressive polishing without assessing the paint first can unnecessarily remove clear coat.",
      },
      {
        title: "Aggressive Pressure Washing",
        body: "This is not a universal solution for bonded spray paint and may create additional risks around already damaged areas.",
      },
    ] as Titled[],
    safest: {
      label: "THE SAFEST FIRST STEP:",
      line: "TAKE PHOTOS AND SEND THEM TO US.",
      cta: "GET A QUOTE",
    },
  },

  /* ── Section 12 — How much does car graffiti removal cost? ───────────── */
  cost: {
    heading: "How Much Does Car Graffiti Removal Cost?",
    title: "Individually Quoted",
    /* "PRICING — INDIVIDUALLY QUOTED · PHOTOS REQUIRED · [GET QUOTE]" */
    photosRequired: "Photos Required",
    leadHtml:
      "We do <strong>not</strong> advertise one fixed price for graffiti removal because the amount of work can vary enormously.",
    factorsLead: "Your quotation can depend on:",
    factors: [
      "Number of affected panels",
      "Size of the graffiti",
      "Type of unwanted paint/substance",
      "Surface affected",
      "How long it has been present",
      "Underlying paint condition",
      "Previously repaired panels",
      "Previous DIY removal attempts",
      "Whether trim/plastics are affected",
      "Whether polishing is required",
      "Whether additional paint correction is required",
    ],
    closing: "SEND US PHOTOS FOR AN ACCURATE QUOTE.",
    quoteLabel: "GET A FREE QUOTE",
    whatsappLabel: "WHATSAPP PHOTOS",
  },

  /* ── Section 13 — Cars, vans & commercial vehicles ───────────────────── */
  vehicles: {
    heading: "Cars, Vans & Commercial Vehicles",
    title: "Graffiti Removal for More Than Just Cars",
    lead: "Medusa can assess unwanted paint and graffiti on suitable:",
    items: [
      { title: "Cars", body: "Private vehicles of different sizes." },
      { title: "Vans", body: "Including work vans and privately owned vans." },
      { title: "Company Vehicles", body: "Help restore the professional presentation of vandalised business vehicles." },
      {
        title: "Fleet Vehicles",
        body: "For multiple affected vehicles, contact us with photographs and vehicle details for a commercial quotation.",
      },
    ] as Titled[],
    cta: "FLEET / COMMERCIAL ENQUIRY",
  },

  /* ── Section 14 — Why choose Medusa? ─────────────────────────────────── */
  why: {
    heading: "Why Choose Medusa?",
    title: "Professional Mobile Car Graffiti Removal London",
    /* HTML — "Paintwork Experience" carries two of the brief's links. */
    items: [
      {
        title: "Mobile Service",
        body: "We travel directly to suitable homes and workplaces within our London service area.",
      },
      { title: "Controlled Process", body: "Different surfaces and contaminants require different removal methods." },
      {
        title: "Paintwork Experience",
        body: `As a professional detailing company, we understand automotive paintwork, ${MACHINE_POLISHING} and ${PAINT_CORRECTION}.`,
      },
      {
        title: "Polishing Available Where Required",
        body: "Where appropriate, polishing can be incorporated into the quotation after removal.",
      },
      { title: "Cars & Commercial Vehicles", body: "We can assess private cars, vans and suitable fleet vehicles." },
      {
        title: "Photo-Based Quotations",
        body: "Send us clear photographs so we can understand the scale of the job before arranging your appointment.",
      },
      {
        title: "Realistic Expectations",
        body: "We don't promise that every form of vandalism can be removed without evidence of the incident remaining.",
      },
    ] as Titled[],
    cta: "REQUEST A QUOTE",
  },

  /* ── Section 15 — Customer reviews ───────────────────────────────────── */
  reviews: { heading: "Trusted By Customers Across London" },

  /* ── The quote form's band ───────────────────────────────────────────── */
  quote: {
    /* "Create a dedicated: CAR GRAFFITI REMOVAL QUOTE". */
    heading: "Car Graffiti Removal Quote",
    title: "Send Photos for a Quote",
    /* "MOST IMPORTANT SEO + CONVERSION MESSAGE … The customer needs to
       understand:" — the seven, in order. The first is what not to do and
       the last what cannot be promised; the five between are what happens. */
    messages: [
      "Don't Experiment With Removal Yourself.",
      "Send Medusa Photos.",
      "We Assess the Contamination.",
      "We Provide a Quote.",
      "We Use the Appropriate Removal Method.",
      "Polishing/Correction Can Be Added Where Required.",
      "Complete Removal or Perfect Underlying Paint Cannot Be Guaranteed.",
    ],
    whatsappLabel: "WHATSAPP PHOTOS",
  },

  /* "AFTER FORM SUBMISSION — Display:" */
  thanks: {
    title: "Thank You",
    body: [
      "We've received your graffiti-removal enquiry.",
      "Our team will review your photographs and vehicle details before contacting you regarding the appropriate treatment and quotation.",
    ],
    important: {
      title: "Important",
      body: "Avoid applying additional chemicals, abrasives or solvents to the affected area while waiting for assessment.",
    },
    whatsappLabel: "WHATSAPP MEDUSA",
  },

  /* ── Section 16 — FAQ ────────────────────────────────────────────────── */
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "Can graffiti be removed from car paint?",
        a: [
          "In many cases, unwanted paint or graffiti on the exterior surface can be removed or significantly improved.",
          "However, results depend on the substance used, how long it has been present and the condition of the underlying vehicle paint.",
          "We assess each job individually.",
        ],
      },
      {
        q: "Can you remove spray paint from a car?",
        a: [
          "Yes, Medusa can assess spray-paint contamination on vehicle surfaces.",
          "Send us clear photographs of the affected areas for a quotation.",
        ],
      },
      {
        q: "Do you guarantee complete removal?",
        a: [
          "No.",
          "Complete removal cannot be guaranteed in every case.",
          "The contamination may have stained, etched or damaged the underlying finish, and some surfaces may retain evidence after treatment.",
        ],
      },
      {
        q: "Will graffiti removal damage my paint?",
        a: [
          "Our technicians use controlled methods selected according to the affected surface and condition.",
          "However, no removal process should be described as universally risk-free.",
          "Existing damage, weak paint, previous repairs, repainting or earlier DIY attempts can affect the result.",
        ],
      },
      {
        q: "What if the graffiti has scratched my car?",
        a: [
          "Removing unwanted paint does not remove deep scratches underneath.",
          `Light surface defects may potentially be improved through ${MACHINE_POLISHING} or ${PAINT_CORRECTION}.`,
          "Deeper damage may require bodyshop repair.",
        ],
      },
      {
        q: "Can you remove graffiti from a repainted car?",
        a: [
          "Potentially, but previously repainted panels require additional caution.",
          "Please tell us about any known paint repairs when requesting your quotation.",
        ],
      },
      {
        q: "Can you remove graffiti from plastic trim?",
        a: [
          "Some contamination can potentially be treated, but results depend on the type and condition of the plastic.",
          "Textured or porous plastics can be more difficult and staining may remain.",
        ],
      },
      {
        q: "Can you remove spray paint from glass?",
        a: [
          "Certain unwanted paint contamination on automotive glass may be treatable.",
          "The technician will assess the affected surface and contamination.",
        ],
      },
      {
        q: "Can you remove graffiti from a wrapped car?",
        a: [
          "Wrapped vehicles require a different assessment.",
          "The removal method must be appropriate for the vinyl or film.",
          "In some cases the affected wrap may require replacement.",
        ],
      },
      {
        q: "Can you remove graffiti from PPF?",
        a: [
          "Potentially, depending on the contamination and condition of the film.",
          "However, PPF is different from automotive clear coat and cannot automatically be treated using the same methods.",
          "Send photographs first.",
        ],
      },
      {
        q: "Should I try to remove the graffiti myself first?",
        a: [
          "We recommend obtaining professional advice before using aggressive chemicals, abrasives or tools.",
          "DIY attempts can potentially create additional paint damage.",
          "Take clear photographs and contact us first.",
        ],
      },
      {
        q: "Does it matter how long the graffiti has been on the car?",
        a: [
          "It can.",
          "The age and condition of the contamination are factors we consider when assessing the appropriate removal process.",
          "We recommend contacting us as soon as reasonably possible.",
        ],
      },
      {
        q: "Can you remove graffiti from a van?",
        a: ["Yes.", "We can assess cars, vans and suitable commercial vehicles."],
      },
      {
        q: "Do you offer mobile graffiti removal?",
        a: [
          "Yes.",
          "Medusa provides mobile vehicle graffiti removal within our London service area, subject to a suitable location for the work.",
        ],
      },
      {
        q: "How much does graffiti removal cost?",
        a: [
          "Every job is individually quoted because the affected area and work required can vary significantly.",
          "Send us photographs for assessment.",
        ],
      },
    ],
  },

  /* ── Section 17 — Important service information ──────────────────────── */
  terms: {
    heading: "Important Service Information",
    title: "Please Read Before Proceeding",
    items: [
      {
        title: "Complete Removal Is Not Guaranteed",
        body: ["Some contamination may permanently stain, etch or damage the underlying surface."],
      },
      {
        title: "Existing Damage",
        body: [
          "Medusa cannot be responsible for damage caused by the original vandalism or previous removal attempts.",
        ],
      },
      {
        title: "Previously Repainted Panels",
        body: [
          "Repaired or refinished panels can react differently from original factory paint.",
          "Tell us about known repairs before treatment.",
        ],
      },
      {
        title: "Machine Polishing",
        body: [
          "Where required and agreed, machine polishing may form part of the quotation.",
          "Polishing cannot remove defects that are too deep to safely correct.",
        ],
      },
      {
        title: "Wraps / PPF / Decals",
        body: ["These require individual assessment and may not be recoverable through cleaning."],
      },
      {
        title: "Bodyshop Repair",
        body: [
          "Where vandalism has caused damage beyond what can safely be corrected through detailing, bodyshop repair or repainting may be required.",
        ],
      },
    ],
  },

  /* ── Section 18 — Final CTA ──────────────────────────────────────────── */
  finalCta: {
    heading: "Had Your Car or Van Spray Painted?",
    strap: "DON'T RISK MAKING IT WORSE.",
    body: "Take clear photographs of the affected areas and send them to Medusa.",
    assessLead: "We'll assess:",
    /* Bold in the brief, all five. */
    assess: [
      "WHAT HAS BEEN AFFECTED",
      "HOW MUCH OF THE VEHICLE IS COVERED",
      "THE CONDITION OF THE SURFACE",
      "THE APPROPRIATE REMOVAL PROCESS",
      "WHETHER POLISHING MAY BE REQUIRED",
    ],
    closing: "MOBILE GRAFFITI REMOVAL ACROSS LONDON",
    quoteLabel: "GET A FREE QUOTE",
    whatsappLabel: "WHATSAPP PHOTOS",
  },

  /* "MOBILE STICKY CTA — Use: GET QUOTE | WHATSAPP. Not: BOOK NOW". */
  sticky: { quote: "Get Quote", whatsapp: "WhatsApp" },
};

const plain = (html: string) => html.replace(/<[^>]+>/g, "");

/**
 * What `content/overrides.ts` needs to replace the mirror's page with this
 * one — so `/repairs`'s card, the sitemap and the WebPage node read the new
 * page rather than the old DIY tutorial.
 *
 * `intro` leads with the paragraph that says what the service is, because a
 * hub card's blurb is the first paragraph of 60 characters or more — and the
 * hero's opening question ("Has your car or van been vandalised …?") is 81,
 * which would have made the card a question about the reader. The rest follow
 * in the hero's order.
 *
 * `price` is undefined: Section 12 is "Individually Quoted … We do not
 * advertise one fixed price for graffiti removal", so the card offers a quote.
 */
export const REBUILD = {
  slug: SLUG,
  mirrorH1: "Car Graffiti Removal in London",
  title: GRAFFITI.seo.title,
  description: GRAFFITI.seo.description,
  h1: GRAFFITI.hero.h1,
  og: PHOTOS.hero,
  intro: [
    GRAFFITI.hero.introHtml,
    GRAFFITI.hero.question,
    `<strong>${GRAFFITI.hero.warn}</strong>`,
    GRAFFITI.hero.risk,
  ],
  price: undefined as string | undefined,
  why: {
    heading: GRAFFITI.why.heading,
    items: GRAFFITI.why.items.map((it) => ({ title: it.title, body: plain(it.body) })),
  },
  faq: GRAFFITI.faq,
};
