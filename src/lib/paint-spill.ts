/**
 * Content for /repairs/car-interior-paint-spill-removal.
 *
 * **Every sentence here is the client's own**, transcribed from the brief they
 * sent on 2026-10-06 ("Webite changes (5).pdf", 50 pages): "WEBSITE
 * DEVELOPER: Completely replace the existing Paint Overspray Removal page."
 * Its seventeen sections, FAQ, SEO strings and the dedicated quote form
 * (`lib/paint-spill-quote.ts`) are used as written — straight apostrophes,
 * and bold wherever the brief sets a phrase in bold. What the brief addressed
 * to the developer ("WEBSITE DEVELOPER: …", the Elementor page structure, the
 * image-SEO table, the internal-linking, sticky-CTA, schema and tracking
 * notes, the "remove from current page" list and the closing checklist) is
 * not copy; it decided the layout.
 *
 * The brief's headline change is what the page is about. The old page was
 * listed as "Paint Overspray Removal" — which is paint landing on a car's
 * outside — and this one is "specifically for: PAINT SPILLED INSIDE A
 * VEHICLE … This page is NOT for exterior paint overspray". So it moved
 * (`/repairs/paint-overspray-removal` 301s here), it is "Interior Paint Spill
 * Removal" in the menu, and nothing on it says "overspray". It is quote-only:
 * "ALL INTERIOR PAINT-SPILL JOBS ARE QUOTED INDIVIDUALLY. Photos are
 * required." — so every quote button is the page's own form, and no button
 * books anything. Nothing of the old page survives; it claimed what the
 * brief's removal list names, and the brief's own sections replace it.
 *
 * **One answer is reconciled, marked `ASSEMBLED`**: the FAQ's "How much does
 * car interior paint removal cost?" ends "Upload photographs using the form
 * below." — but the brief's own page structure puts the quote form (12)
 * above the FAQ (13). The page says "the form above", linked to it.
 *
 * Three parts of the brief are not built, all for want of what they need:
 *
 *   - **Section 11, Before & After** — "Use genuine Medusa jobs … Use
 *     identical angles wherever possible." There are none, so its heading,
 *     its caption and its GET MY QUOTE button are not on the page.
 *   - **Two of the image-SEO table's seven files**: the before & after, and
 *     the paint tin in a boot. Neither photograph exists, and neither is
 *     faked. The carpet slot has no photograph either — the site has no
 *     picture of carpet being treated other than the boot's — so the carpet
 *     card is drawn instead (see the route).
 *   - **Reviews**: "Genuine customer reviews." The site has four, none about
 *     paint, and they are shown word for word under the site's own heading.
 */

import { CONTACT } from "@/lib/site";

export const SLUG = "repairs/car-interior-paint-spill-removal";
export const PATH = `/${SLUG}`;

/**
 * "12 — QUOTE FORM … Set anchor: #get-paint-spill-quote. All GET QUOTE
 * buttons should scroll here."
 */
export const FORM_ANCHOR = "get-paint-spill-quote";
export const QUOTE = `#${FORM_ANCHOR}`;

/**
 * "Link naturally to: Triton Interior Valet, Car Interior Cleaning, Steam
 * Cleaning, Leather Cleaning, Car Graffiti Removal, Sickness / Biohazard
 * Cleaning where contextually relevant." The first four are laid on the
 * copy's own words below. Nothing on this page is about graffiti or sickness,
 * so those two are not linked from it.
 */
export const LINKS = {
  triton: "/car-interior-cleaning/interior-valet",
  interior: "/car-interior-cleaning",
  steam: "/car-interior-cleaning/steam-cleaning",
  leather: "/car-interior-cleaning/leather-cleaning",
} as const;

/**
 * "CONVERSION TRACKING — Track: Paint Spill Quote Submitted, Photo Upload,
 * WhatsApp Click, Phone Click. A submitted photo quote should be the PRIMARY
 * conversion." The last two are `TrackClicks`' own (`EVENTS.whatsapp`,
 * `EVENTS.phone`); `quote` is every GET QUOTE button, which scrolls to the
 * form rather than leaving the page.
 */
export const TRACK = {
  quote: "get_paint_spill_quote_click",
  submitted: "paint_spill_quote_submitted",
  photoUpload: "paint_spill_photo_upload",
} as const;

export type Photo = { src: string; alt: string; w: number; h: number };

/*
  The image-SEO table's filenames and alt text, on the photographs that fit
  them. All are already the client's: the boot is the old page's own picture,
  the hero is a gloved hand working a cleaning product into a seat, from the
  site's May 2026 post on seat stains (it was the steam shot until the lead
  found that same picture heading `/car-interior-cleaning/steam-cleaning`,
  and both cards side by side on the hubs), and the fabric seat
  and leather seat are the extraction and leather pictures the site's
  interior pages use. None is captioned as a particular customer's car, or
  as paint — they show the work, not a result.

  `plastic` is not in the table. It is the old page's own close-up of a
  brush working a dashboard vent, kept at its own path, and decorative — the
  card it heads is titled in words.
*/
export const PHOTOS = {
  hero: {
    src: "/assets/2026/10/car-interior-paint-removal-london.webp",
    alt: "Professional car interior paint removal in London",
    w: 1600,
    h: 1066,
  },
  boot: {
    src: "/assets/2026/10/paint-spill-car-boot-removal.webp",
    alt: "Paint spill removal from car boot carpet",
    w: 1024,
    h: 683,
  },
  /* Cropped to the seat and the extraction head from a portrait original. */
  upholstery: {
    src: "/assets/2026/10/paint-removal-car-upholstery.webp",
    alt: "Paint removal from car upholstery",
    w: 1370,
    h: 913,
  },
  leather: {
    src: "/assets/2026/10/paint-removal-leather-car-seat.webp",
    alt: "Professional paint removal from leather car seat",
    w: 900,
    h: 600,
  },
  plastic: {
    src: "/assets/2025/02/a-close-up-of-a-car-wash-worker-using-a-brush-and-2024-11-27-06-01-41-utc-1-683x1024.webp",
    alt: "",
    w: 683,
    h: 1024,
  },
} satisfies Record<string, Photo>;

/** A titled item with its paragraphs, and a list the brief sets inside it. */
export type Item = {
  title: string;
  /** Paragraphs — HTML where the brief bolds a phrase or a link sits. */
  body: string[];
  list?: { lead: string; items: string[] };
  after?: string[];
};

export type Step = Item & {
  /** The page structure's own label for the step, where it gives one:
   *  "ASSESS → CONTAIN → TEST → TREAT → EXTRACT / DEEP CLEAN → REASSESS". */
  flow?: string;
  /** The brief's IMPORTANT note inside the step. */
  important?: string;
};

const QUOTE_LABEL = "Get an Urgent Quote";
const WHATSAPP_LABEL = "WhatsApp Photos";

export const PAINT = {
  whatsapp: CONTACT.whatsapp,

  seo: {
    title: "Car Interior Paint Removal London | Paint Spill Cleaning | Medusa",
    description:
      "Spilled paint inside your car? Medusa provides mobile car interior paint removal in London for carpets, boots, upholstery, seats and trim. Upload photos for a quote.",
  },

  /* ── Section 1 — Hero ────────────────────────────────────────────────── */
  hero: {
    /* "H1: Car Interior Paint Spill Removal London … ONE H1 ONLY." */
    h1: "Car Interior Paint Spill Removal London",
    subtitle: "Spilled Paint Inside Your Car? Contact Us As Soon As Possible.",
    lead: "Paint spilled inside a vehicle can quickly spread into carpets, upholstery, seat material, trim and underlay.",
    body: [
      "Whether a paint tin has leaked in the boot, paint has spilled onto the carpet or wet paint has transferred onto seats and interior surfaces, <strong>the sooner we can assess the contamination, the better.</strong>",
      "Medusa Auto Detailing provides specialist <strong>mobile car interior paint spill removal across London</strong>, using cleaning methods selected according to the type of paint and material affected.",
    ],
    card: {
      title: "Paint Spill in Your Car?",
      ticks: [
        "Boot Carpet Paint Spills",
        "Car Carpet Paint Removal",
        "Fabric Upholstery",
        "Suitable Leather Surfaces",
        "Interior Plastics & Trim",
        "Wet & Dried Paint Assessed",
        "Mobile Service Across London",
      ],
    },
    photosLine: "Send Us Photos for a Quote",
    quoteLabel: QUOTE_LABEL,
    whatsappLabel: WHATSAPP_LABEL,
    important: {
      title: "Important",
      strong: "Do not apply paint thinner, random solvents or aggressive chemicals before speaking to us.",
      body: "Complete paint removal cannot be guaranteed. Results depend on the type of paint, affected material, quantity spilled, how long it has been present and how deeply it has penetrated.",
    },
  },

  /* ── Section 2 — Paint spill emergency? ──────────────────────────────── */
  emergency: {
    heading: "Paint Spill Emergency?",
    title: "What Should I Do If Paint Spills Inside My Car?",
    /* "2 — URGENT ACTION BAR — Use a prominent strip:" — its five lines, in
       its order, which is not quite the steps' order. */
    strip: ["Don't Scrub It.", "Don't Apply Random Solvents.", "Stop It Spreading.", "Take Photos.", "Contact Medusa."],
    steps: [
      {
        title: "Stop It Spreading",
        body: ["Avoid sitting on, stepping through or transferring wet paint to other areas of the interior."],
      },
      {
        title: "Don't Start Scrubbing",
        body: [],
        list: {
          lead: "Aggressive rubbing can spread wet paint further into:",
          items: ["Carpet fibres", "Upholstery", "Stitching", "Seat foam", "Interior trim"],
        },
      },
      {
        title: "Don't Apply Random Solvents",
        body: [],
        list: {
          lead: "A chemical capable of dissolving paint may also:",
          items: [
            "Discolour carpet",
            "Affect fabric dye",
            "Damage leather coatings",
            "Mark interior plastics",
            "Damage trim finishes",
            "Spread dissolved paint further",
          ],
        },
      },
      {
        title: "Take Photos",
        body: [],
        list: {
          lead: "Take clear photographs showing:",
          items: [
            "Entire affected area",
            "Close-up of the paint",
            "Paint container if available",
            "Paint label/type",
            "Any areas the paint has spread to",
          ],
        },
      },
      {
        title: "Contact Medusa",
        body: [],
        /* Set in bold capitals in the brief. */
        list: {
          lead: "Send us the photographs and tell us:",
          items: [
            "WHAT SPILLED",
            "WHERE IT SPILLED",
            "WHEN IT HAPPENED",
            "WHETHER IT IS STILL WET",
            "WHAT YOU HAVE ALREADY USED ON IT",
          ],
        },
      },
    ] as Item[],
    whatsappLabel: WHATSAPP_LABEL,
    quoteLabel: QUOTE_LABEL,
  },

  /* ── Section 3 — Why paint spills need specialist attention ──────────── */
  depth: {
    heading: "Why Paint Spills Need Specialist Attention",
    title: "Paint Can Travel Much Further Than You Think",
    lead: "A paint spill inside a vehicle isn't always limited to the visible surface.",
    listLead: "Liquid paint can potentially penetrate:",
    items: [
      { title: "Carpet", body: "Paint can become embedded within carpet fibres." },
      { title: "Carpet Underlay", body: "A larger spill may travel beneath the visible carpet." },
      { title: "Fabric Seats", body: "Liquid contamination can penetrate through upholstery into deeper material." },
      { title: "Seams & Stitching", body: "Paint can collect around stitching, seams and joins." },
      { title: "Seat Foam", body: "Significant liquid contamination may penetrate beneath the upholstery." },
      { title: "Leather", body: "Paint can affect the coated surface, stitching and seams." },
      { title: "Interior Plastic", body: "Certain paints and removal chemicals can stain or alter plastic finishes." },
      {
        title: "Boot Areas",
        body: "A leaking paint container in the boot can spread across carpet, underneath removable flooring and into surrounding areas.",
      },
    ],
    statement: "What You Can See May Not Be the Full Extent of the Spill.",
    after: "This is why photographs and accurate information are important before we quote.",
    /* "5 — HOW DEEP CAN PAINT TRAVEL? Use an educational diagram showing:
       VISIBLE CARPET ↓ CARPET FIBRES ↓ UNDERLAY". */
    diagram: { title: "How Deep Can Paint Travel?", layers: ["Visible Carpet", "Carpet Fibres", "Underlay"] },
  },

  /* ── Section 4 — Common paint-spill locations ────────────────────────── */
  locations: {
    heading: "Common Paint-Spill Locations",
    title: "Where Has the Paint Spilled?",
    /* "3 — COMMON AREAS — Visual cards: BOOT, CARPET, FABRIC SEATS,
       LEATHER, PLASTIC". The sixth, floor mats, closes the band. */
    items: [
      {
        key: "boot",
        title: "Boot Paint Spill",
        body: [
          "One of the most common situations.",
          "Paint tins and decorating materials can leak or tip over while being transported.",
        ],
        list: {
          lead: "Depending on the quantity, paint may affect:",
          items: [
            "Boot carpet",
            "Removable boot floor",
            "Side carpet",
            "Plastic trim",
            "Spare-wheel area",
            "Underlying materials",
          ],
        },
      },
      {
        key: "carpet",
        title: "Carpet Paint Spill",
        body: [
          "Paint can become heavily embedded within carpet fibres and may spread beyond the initially visible area.",
        ],
      },
      {
        key: "fabric",
        title: "Fabric Seat Paint Spill",
        body: [
          "Fabric seats can absorb liquid contamination.",
          "The amount that can safely be removed depends on the paint and how deeply it has penetrated.",
        ],
      },
      {
        key: "leather",
        title: "Leather Seat Paint Spill",
        body: [
          `<a href="${LINKS.leather}">Leather</a> and coated automotive surfaces require careful assessment.`,
          "Aggressive solvents can potentially affect the leather's finish or colour.",
        ],
      },
      {
        key: "plastic",
        title: "Interior Plastic Paint Spill",
        body: [
          "Interior plastics vary considerably in texture and finish.",
          "Some surfaces can retain staining or suffer permanent alteration from either the original paint or previous removal attempts.",
        ],
      },
    ] as (Item & { key: "boot" | "carpet" | "fabric" | "leather" | "plastic" })[],
    mat: {
      title: "Floor Mat Paint Spill",
      body: [
        "Removable mats can often be assessed separately from the vehicle's permanent carpeting.",
        "In severe cases, replacement may be more practical than attempting complete restoration.",
      ],
    },
    cta: "Get a Quote",
  },

  /* ── Section 5 — Wet paint vs dried paint ────────────────────────────── */
  wetDry: {
    heading: "Wet Paint vs Dried Paint",
    title: "Has the Paint Already Dried?",
    lead: "This is one of the most important things we need to know.",
    states: [
      {
        title: "Wet / Fresh Paint",
        body: ["Fresh paint may still be mobile."],
        list: {
          lead: "The priority is preventing it from:",
          items: ["Spreading", "Transferring", "Penetrating further", "Being pushed deeper into fibres"],
        },
        after: ["Contact us as soon as reasonably possible."],
      },
      {
        title: "Partially Dried Paint",
        body: [
          "Paint that has begun curing can require a different removal process.",
          "Do not assume that adding more chemicals or water will improve the situation.",
        ],
      },
      {
        title: "Fully Dried Paint",
        body: [
          "Dried paint may still be treatable in some circumstances, but removal can become considerably more difficult.",
        ],
        list: {
          lead: "The final result depends heavily on:",
          items: [
            "Paint type",
            "Surface affected",
            "Amount spilled",
            "Depth of penetration",
            "Time since spill",
            "Previous cleaning attempts",
          ],
        },
      },
    ] as Item[],
    statement: "Old or Dried Paint Does Not Automatically Mean It Cannot Be Improved.",
    after: "Send us photographs for assessment.",
  },

  /* ── Section 6 — Different paints require different approaches ───────── */
  paints: {
    heading: "Different Paints Require Different Approaches",
    title: "Do You Know What Type of Paint Spilled?",
    body: [
      "If possible, keep the paint tin/container or photograph the label.",
      "Knowing the product involved can help us assess the job.",
    ],
    examplesLead: "Examples may include:",
    examples: [
      "Water-based paint",
      "Emulsion paint",
      "Acrylic paint",
      "Solvent-based paint",
      "Gloss paint",
      "Primer",
      "Wood paint",
      "Other decorating/coating products",
    ],
    unknown: {
      title: "Don't Know?",
      body: [
        "That's fine.",
        `Select <strong>Unknown</strong> on the <a href="${QUOTE}">quotation form</a> and send us photographs.`,
      ],
    },
    important: {
      title: "Important",
      body: "We do not use one universal chemical or cleaning method for every paint spill.",
      lead: "The process has to consider both:",
      first: "THE PAINT",
      and: "and",
      second: "THE MATERIAL UNDERNEATH IT.",
    },
  },

  /* ── Section 7 — Our paint spill removal process ─────────────────────── */
  process: {
    heading: "Our Paint Spill Removal Process",
    title: "Every Job Starts With Assessment",
    lead: "The exact process varies depending on the spill.",
    steps: [
      {
        title: "Assessment",
        flow: "Assess",
        body: [],
        list: {
          lead: "We assess:",
          items: [
            "Paint type where known",
            "Whether it is wet/dry",
            "Quantity spilled",
            "Areas affected",
            "Material affected",
            "How far it may have spread",
            "Previous cleaning attempts",
            "Existing damage",
          ],
        },
      },
      {
        title: "Containment / Preparation",
        flow: "Contain",
        body: [
          "Where appropriate, the affected area is prepared to minimise further transfer or spread.",
          "Loose contamination may be dealt with before deeper treatment begins.",
        ],
      },
      {
        title: "Testing",
        flow: "Test",
        body: ["Where cleaning products are required, suitable areas may be tested before broader treatment."],
        list: {
          lead: "This is particularly important around sensitive:",
          items: ["Leather", "Plastics", "Coloured fabrics", "Specialist trim"],
        },
      },
      {
        title: "Controlled Paint Removal",
        flow: "Treat",
        body: [
          "Appropriate cleaning methods are selected according to the paint and material.",
          `Depending on the job, treatment may involve a combination of specialist products, agitation, extraction, <a href="${LINKS.steam}">steam</a> or detailed hand cleaning where appropriate.`,
        ],
        important: "Not every method is suitable for every material.",
      },
      {
        title: "Extraction / Deep Cleaning Where Appropriate",
        flow: "Extract / Deep Clean",
        body: [
          "Where paint has affected suitable carpets or fabric upholstery, additional extraction/deep cleaning may be required.",
          "This depends on the contamination and material.",
        ],
      },
      {
        /* The page structure's line has no stage for this step; it is the
           loop between treating and reassessing. */
        title: "Repeat Treatment Where Appropriate",
        body: ["Severe spills may require multiple controlled treatment stages rather than one aggressive process."],
      },
      {
        title: "Final Assessment",
        flow: "Reassess",
        body: [
          "Once the appropriate treatment has been completed, the affected areas are inspected and the achievable result assessed.",
        ],
      },
    ] as Step[],
  },

  /* ── Section 8 — Can all the paint be removed? ───────────────────────── */
  results: {
    heading: "Can All the Paint Be Removed?",
    title: "Complete Paint Removal Cannot Be Guaranteed",
    lead: "This is particularly important with interior paint spills.",
    factorsLead: "The final result depends on:",
    factors: [
      "Type of paint",
      "Amount spilled",
      "Age of spill",
      "Material affected",
      "Colour of material",
      "Depth of penetration",
      "Whether paint reached foam or underlay",
      "Whether paint entered seams/stitching",
      "Previous cleaning attempts",
      "Chemicals previously used",
      "Existing damage",
    ],
    well: "Some spills may respond extremely well.",
    othersLead: "Others may leave:",
    others: ["Staining", "Discolouration", "Hardened residue", "Material damage", "Colour changes", "Permanent marks"],
    statement: "Our Service Is Professional Treatment — Not a Guarantee of Complete Restoration.",
    after:
      "We will make reasonable efforts to achieve the best result that can safely be obtained without unnecessarily damaging the underlying material.",
  },

  /* ── Section 9 — When replacement may be the better option ───────────── */
  replacement: {
    heading: "When Replacement May Be the Better Option",
    title: "Cleaning Isn't Always the Right Answer",
    lead: "In severe cases, continuing to aggressively treat a material simply to chase the final traces of paint can create more damage than benefit.",
    examplesLead: "For example:",
    items: [
      { title: "Floor Mats", body: "A heavily saturated inexpensive floor mat may be more practical to replace." },
      {
        title: "Boot Carpet",
        body: "Where paint has completely penetrated through multiple layers, replacement of affected components may sometimes be appropriate.",
      },
      {
        title: "Permanently Damaged Plastic",
        body: "If the original paint or previous solvents have chemically damaged a surface, cleaning cannot reverse that damage.",
      },
      {
        title: "Damaged Leather",
        body: "If the leather's coating or colour has already been removed, specialist leather repair may be required.",
      },
    ],
    closing:
      "If we believe cleaning has reached the safe practical limit, we will not continue using increasingly aggressive methods simply to promise a perfect result.",
  },

  /* ── Section 10 — Previous DIY cleaning attempts ─────────────────────── */
  diy: {
    heading: "Previous DIY Cleaning Attempts",
    title: "Already Tried to Remove It?",
    lead: "Tell us exactly what you used.",
    listLead: "This may include:",
    items: [
      "Water",
      "Soap",
      "Interior cleaner",
      "Steam",
      "Paint thinner",
      "White spirit",
      "Acetone",
      "Solvent",
      "Alcohol",
      "Scraper",
      "Brush",
      "Other chemicals",
    ],
    why: {
      title: "Why Do We Need to Know?",
      lead: "Previous treatment can:",
      items: [
        "Change the paint",
        "Spread contamination",
        "Affect material colour",
        "Damage coatings",
        "Make surfaces more sensitive",
        "Change what we can safely use next",
      ],
    },
    closing: "There is no judgement — we simply need accurate information before treatment.",
  },

  /* ── Section 12 — Why we don't offer a fixed price ───────────────────── */
  pricing: {
    heading: "Why We Don't Offer a Fixed Price",
    title: "Every Paint Spill Is Different",
    lead: "A few small paint spots and a full tin of paint emptied into a boot are completely different jobs.",
    factorsLead: "Pricing depends on:",
    factors: [
      "Amount of paint",
      "Paint type",
      "Wet or dried",
      "Area affected",
      "Number of affected areas",
      "Material affected",
      "Depth of contamination",
      "Whether underlay/foam is affected",
      "Previous cleaning attempts",
      "Time required",
      "Specialist treatment required",
    ],
    statement: "All Interior Paint-Spill Jobs Are Quoted Individually.",
    required: "Photos are required.",
    cta: "Upload Photos for a Quote",
  },

  /* ── Section 13 — Mobile paint spill cleaning across London ──────────── */
  mobile: {
    heading: "Mobile Paint Spill Cleaning Across London",
    title: "We Come to Your Vehicle",
    body: "Medusa Auto Detailing provides mobile car interior paint-spill cleaning throughout our London service area.",
    listLead: "Subject to availability and a suitable working location, our technicians can attend your:",
    list: ["Home", "Workplace", "Business premises", "Other suitable private location"],
    cta: "Check Availability / Get Quote",
  },

  /* ── Section 14 — Why choose Medusa? ─────────────────────────────────── */
  why: {
    heading: "Why Choose Medusa?",
    title: "Professional Car Interior Paint Removal",
    items: [
      {
        title: "Specialist Interior Cleaning",
        body: `Paint spills require more than an ordinary <a href="${LINKS.triton}">interior valet</a>.`,
      },
      {
        title: "Material-Specific Approach",
        body: "Carpet, fabric, leather and plastic cannot all be treated in exactly the same way.",
      },
      { title: "Mobile Across London", body: "We bring our equipment directly to a suitable location." },
      {
        title: "Professional Equipment",
        body: `Our technicians have access to professional <a href="${LINKS.interior}">interior-cleaning</a> and detailing equipment.`,
      },
      {
        title: "Photo Assessment",
        body: "Send photographs before the appointment so we can understand the contamination.",
      },
      {
        title: "Realistic Expectations",
        body: "We don't promise that every paint spill can be completely removed.",
      },
    ],
    cta: "Get a Quote",
  },

  /* ── The dedicated quote form's section ──────────────────────────────── */
  quote: {
    /* "Create: CAR INTERIOR PAINT SPILL REMOVAL QUOTE". */
    heading: "Car Interior Paint Spill Removal Quote",
    title: "Send Us Photos for a Quote",
    whatsappLabel: WHATSAPP_LABEL,
  },

  /* "AFTER SUBMISSION — Display:" */
  thanks: {
    title: "We've Received Your Paint Spill Enquiry",
    body: [
      "Our team will review the photographs and information supplied and contact you regarding the appropriate treatment and quotation.",
    ],
    strong: "PLEASE AVOID APPLYING ADDITIONAL CHEMICALS WHILE WAITING FOR OUR ASSESSMENT.",
    whatsappLabel: "WhatsApp Medusa",
  },

  /* ── Section 15 — FAQ ────────────────────────────────────────────────── */
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "Can you remove spilled paint from a car interior?",
        a: [
          "We can assess paint spills affecting suitable car-interior materials including carpets, boot areas, upholstery, leather and interior plastics.",
          "Whether complete removal is achievable depends on the paint, material, severity and how long it has been present.",
        ],
      },
      {
        q: "Can you remove paint from car carpet?",
        a: [
          "Yes, suitable car carpets can be assessed and professionally treated.",
          "Paint that has deeply penetrated carpet fibres or underlying materials may be more difficult to completely remove.",
        ],
      },
      {
        q: "Can you remove paint from a car boot?",
        a: [
          "Yes.",
          "Paint spills in car boots are a common type of enquiry.",
          "Send photographs showing the entire boot and close-ups of the affected areas.",
        ],
      },
      {
        q: "Can you remove dried paint from car carpet?",
        a: [
          "Potentially.",
          "Dried paint can be more difficult to treat than fresh contamination, but this does not automatically mean treatment is impossible.",
          "Send photographs for assessment.",
        ],
      },
      {
        q: "Can you remove emulsion paint from a car interior?",
        a: [
          "We can assess emulsion and other paint contamination.",
          "Tell us the exact paint product if known and photograph the container/label where possible.",
        ],
      },
      {
        q: "Can you remove water-based paint?",
        a: [
          "Water-based paint can often be assessed for professional treatment.",
          "Results still depend on the material, amount, age and depth of penetration.",
        ],
      },
      {
        q: "Can you remove gloss or solvent-based paint?",
        a: [
          "Potentially, but solvent-based contamination can require a different approach.",
          "The underlying interior material must also be considered before any cleaning product is used.",
        ],
      },
      {
        q: "Can you remove paint from fabric car seats?",
        a: [
          "Suitable fabric upholstery can be assessed.",
          "If paint has penetrated deeply into the fabric or seat foam, complete removal may not be possible.",
        ],
      },
      {
        q: "Can you remove paint from leather car seats?",
        a: [
          "Potentially.",
          "Leather and coated leather surfaces require careful assessment because aggressive chemicals can damage the coating or colour.",
          "Complete removal cannot be guaranteed.",
        ],
      },
      {
        q: "Can you remove paint from interior plastic?",
        a: [
          "Some paint contamination on interior plastics may be treatable.",
          "However, plastics vary significantly and certain paints or previous solvents can permanently stain, discolour or chemically alter the surface.",
        ],
      },
      {
        q: "Can you guarantee all the paint will come out?",
        a: [
          "No.",
          "We cannot guarantee complete removal.",
          "The final result depends on the type of paint, material, severity, age of the spill and depth of penetration.",
        ],
      },
      {
        q: "Should I use paint thinner?",
        a: [
          "We recommend avoiding random solvents or paint-removal chemicals before professional assessment.",
          "A chemical that dissolves paint can also potentially damage the material underneath it.",
        ],
      },
      {
        q: "Should I scrub wet paint?",
        a: [
          "Avoid aggressively scrubbing a fresh spill, as this may spread contamination or push it further into fibres.",
          "Contact us and send photographs.",
        ],
      },
      {
        q: "What should I do immediately after spilling paint?",
        a: [
          "Prevent the paint from spreading, avoid experimenting with aggressive chemicals, take photographs and contact us as soon as reasonably possible.",
        ],
      },
      {
        q: "Does the entire interior need cleaning?",
        a: [
          "Not necessarily.",
          "The service required depends on where the paint has spread.",
          "We'll assess the photographs before quoting.",
        ],
      },
      {
        q: "How much does car interior paint removal cost?",
        a: [
          "All jobs are individually quoted because the severity and work required vary significantly.",
          /* ASSEMBLED — the brief writes "Upload photographs using the form
             below.", but its own page structure sets the quote form (12)
             above the FAQ (13). One word changed so the sentence is true of
             the page it is on, and the words link to the form. */
          `Upload photographs using <a href="${QUOTE}">the form above</a>.`,
        ],
      },
      {
        q: "Do you come to my home?",
        a: [
          "Yes.",
          "Medusa provides mobile services across our London service area, subject to access and a suitable working location.",
        ],
      },
    ],
  },

  /* ── Section 16 — Important service information ──────────────────────── */
  important: {
    heading: "Important Service Information",
    title: "Please Read Before Proceeding",
    items: [
      { title: "Complete Removal Is Not Guaranteed", body: ["Paint can permanently stain or damage interior materials."] },
      {
        title: "Deep Contamination",
        body: [
          "Paint may penetrate carpets, underlay, upholstery, foam, seams and other areas that cannot be completely accessed through normal cleaning.",
        ],
      },
      { title: "Previous Chemicals", body: ["Previous cleaning attempts may affect the achievable result."] },
      {
        title: "Material Damage",
        body: [],
        list: {
          lead: "Cleaning cannot reverse permanent:",
          items: [
            "Discolouration",
            "Dye loss",
            "Chemical damage",
            "Melted/damaged plastics",
            "Damaged leather coatings",
            "Material deterioration",
          ],
        },
      },
      {
        title: "Replacement May Be Required",
        body: ["Severely contaminated or permanently damaged components may ultimately require replacement."],
      },
      {
        title: "Payment",
        body: [
          "<strong>Payment is for the professional treatment and cleaning work carried out and is not conditional upon complete paint or stain removal.</strong>",
        ],
      },
    ] as Item[],
  },

  /* ── Section 17 — Final CTA ──────────────────────────────────────────── */
  finalCta: {
    heading: "Spilled Paint Inside Your Car?",
    strong: "Don't Wait — and Don't Experiment With Random Chemicals.",
    photosLead: "Take photographs of:",
    photos: ["THE ENTIRE SPILL", "CLOSE-UP OF THE PAINT", "ALL AFFECTED AREAS", "THE PAINT TIN / LABEL IF AVAILABLE"],
    then: "Then send them to Medusa.",
    closing: "Professional Mobile Car Interior Paint Spill Removal London",
    quoteLabel: QUOTE_LABEL,
    whatsappLabel: WHATSAPP_LABEL,
  },

  /* "MOBILE STICKY CTA — Use: SEND PHOTOS | WHATSAPP. Not: BOOK NOW. This
     service needs assessment first." */
  sticky: { primary: "Send Photos", secondary: "WhatsApp" },
};

/**
 * What `content/overrides.ts` needs to replace the mirror's old page with
 * this one, so the `/repairs` hub card, the sitemap and the WebPage node read
 * the new page.
 */
export const REBUILD = {
  slug: SLUG,
  /** The mirror's h1, exactly, as `pages.json` holds it under `SLUG`. */
  mirrorH1: "Remove Paint from Car Interior in London",
  title: PAINT.seo.title,
  description: PAINT.seo.description,
  h1: PAINT.hero.h1,
  og: PHOTOS.hero,
  /**
   * The hero's paragraphs, the one that says what the service is first: the
   * hub card's blurb is the first of 60 characters or more, and the brief's
   * opening line describes the spill rather than the service. The subtitle is
   * left out for the same reason — it is a question, 62 characters long.
   */
  intro: [PAINT.hero.body[1], PAINT.hero.lead, PAINT.hero.body[0]],
  /** Quote-only: "ALL INTERIOR PAINT-SPILL JOBS ARE QUOTED INDIVIDUALLY." */
  price: undefined as string | undefined,
  why: {
    heading: PAINT.why.heading,
    items: PAINT.why.items.map((it) => ({ title: it.title, body: it.body.replace(/<[^>]+>/g, "") })),
  },
  faq: PAINT.faq,
};
