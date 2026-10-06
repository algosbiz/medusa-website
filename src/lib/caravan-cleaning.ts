/**
 * Content for /vehicles/caravan-cleaning.
 *
 * **Every sentence here is the client's own**, transcribed from the brief they
 * sent on 2026-10-06 ("Webite changes  (1).pdf", 39 pages): "Completely
 * replace/re-optimise the existing Caravan Cleaning page using the content
 * below. KEEP EXISTING URL". Its twenty-two sections, FAQ and SEO strings are
 * used as written — straight apostrophes, and bold wherever the brief sets a
 * phrase in bold. What the brief addresses to the developer ("WEBSITE
 * DEVELOPER: …", the Elementor page design, the mobile UX notes, the image-SEO
 * table, the form's back-end rules, the tracking and internal-linking lists,
 * the "remove / rewrite" list and the "important positioning" journey) is not
 * copy; it decided the layout.
 *
 * The brief's headline change is that caravan work is **quote first**: "This
 * page should NOT try to make caravan cleaning look like an ordinary
 * fixed-price car valet." No price is quoted and no button books — every quote
 * button scrolls to the page's own quote form (`lib/caravan-quote.ts`), which
 * replaces the basic Contact Form 7 form the old page carried ("Replace the
 * current basic form with the following"). Nothing of the old page's copy
 * survives: it promised "100% customer satisfaction", to "guarantee our team
 * will arrive on time" and to be "fully insured and guaranteed as standard" —
 * the brief's own list of claims to remove. Its photographs do, under the
 * brief's filenames.
 *
 * Three things on the page come from the brief's *design* notes rather than
 * its copy, and are its own words all the same: the hero's "INTERIOR •
 * EXTERIOR • FULL VALET · INDIVIDUALLY QUOTED" (`points`), the five labels of
 * the specialist-problems warning panel (`specialist.warning`) and the
 * process line "SEND DETAILS → UPLOAD PHOTOS → QUOTE → BOOK → WE COME TO YOU"
 * (`process.flow`). Where the design notes and the copy disagree, the copy
 * wins: the layout's storage cards end on "GENERAL MAINTENANCE", the copy's on
 * "RECENTLY PURCHASED" with a sentence under it, so the page has the copy's
 * four. Nothing is `ASSEMBLED`.
 *
 * The internal links the brief asks for — "Other Vehicles, Car Valeting,
 * Interior Cleaning, Mould Removal, Odour Treatment, Pet Hair Removal,
 * Contact" — are laid on words the copy already uses (`linkOn` throws if the
 * words are not there), on the warning panel's own labels, or are the menu's
 * own names for those pages; no sentence was written for one.
 *
 * Not built, because the brief says what it needs and it does not exist yet:
 *
 *   - **Section 18, Before & After** — "Use genuine Medusa photographs
 *     wherever available … Do not use generic stock photos and present them
 *     as Medusa customer results." There are none, so neither the section
 *     nor its "Caravan & Motorhome Cleaning Results" heading is on the page.
 *   - **Four of the seven image-SEO files** — the caravan interior, the
 *     motorhome, the motorhome interior and the before & after. No such
 *     photograph exists; see `PHOTOS`.
 *   - **Section 19's reviews** are "genuine Medusa reviews … Prioritise
 *     genuine reviews mentioning: Caravan/motorhome work …": the site has
 *     four, none about caravans, and they are shown word for word under the
 *     brief's heading.
 */

import { CONTACT } from "@/lib/site";

export const SLUG = "vehicles/caravan-cleaning";
export const PATH = `/${SLUG}`;

/** "Give section anchor: #get-caravan-quote. Every GET A QUOTE button should
    scroll here." */
export const FORM_ANCHOR = "get-caravan-quote";
export const QUOTE = `#${FORM_ANCHOR}`;

/**
 * "CONVERSION TRACKING — Track: Caravan Quote Submitted, WhatsApp Click, Phone
 * Click. Treat completed quote enquiries as the primary lead conversion for
 * this page." `TrackClicks` reports every WhatsApp and `tel:` link already;
 * the form fires `quoteSubmitted` when an enquiry is delivered, and every
 * quote button carries `quote`, the step before it.
 */
export const TRACK = {
  quoteSubmitted: "caravan_quote_submitted",
  quote: "caravan_quote_click",
} as const;

/**
 * "INTERNAL LINKING — Link naturally to: Other Vehicles, Car Valeting,
 * Interior Cleaning, Mould Removal, Odour Treatment, Pet Hair Removal,
 * Contact". The names are the menu's own.
 */
export const LINKS = {
  otherVehicles: { name: "Other Vehicles", href: "/vehicles" },
  carValeting: "/car-valeting",
  interior: "/car-interior-cleaning",
  mould: "/car-interior-cleaning/mould-removal",
  odour: "/car-interior-cleaning/odour-removal",
  petHair: "/car-interior-cleaning/pet-hair-removal",
  contact: { name: "Contact Us", href: "/contact-us" },
} as const;

/** Lays a link on words the copy already uses — and throws if they are not
    there, so a reworded sentence cannot quietly lose its link. */
function linkOn(text: string, words: string, href: string): string {
  if (!text.includes(words)) throw new Error(`caravan-cleaning: "${words}" is not in "${text}"`);
  return text.replace(words, `<a href="${href}">${words}</a>`);
}

export type Photo = { src: string; alt: string; w: number; h: number };

/*
  The image-SEO table's filenames and alt text, on the photographs that fit
  them. The caravan in the pines and the caravan on the field are the old
  page's own pictures (its first content row, and the one beside its reasons);
  the campervan windscreen is the site's own, from the windscreen protection
  page. None is captioned, or presented as a Medusa job or as a before or an
  after.

  The table also names a caravan interior, a motorhome, a motorhome interior
  and a before & after. None exists — the site has no picture of a caravan's
  inside or of a motorhome — so those slots are empty rather than filled with
  a car.
*/
export const PHOTOS = {
  /* A touring caravan in a pine wood, its door open on the living area. */
  hero: {
    src: "/assets/2026/10/caravan-cleaning-london.webp",
    alt: "Professional mobile caravan cleaning in London",
    w: 1872,
    h: 1248,
  },
  /* A touring caravan side on, on a site field — the bodywork the exterior
     service works over. */
  exterior: {
    src: "/assets/2026/10/caravan-exterior-cleaning-london.webp",
    alt: "Mobile caravan exterior cleaning in London",
    w: 1280,
    h: 770,
  },
  /* A campervan's windscreen being wiped down — beside the cab section. */
  campervan: {
    src: "/assets/2026/10/campervan-cleaning-london.webp",
    alt: "Mobile campervan cleaning service in London",
    w: 1152,
    h: 1728,
  },
} satisfies Record<string, Photo>;

export type Card = { title: string; body: string };
export type WhyItem = { title: string; body: string[] };

const HERO_LEAD = "Caravans and motorhomes require a different approach to standard car valeting.";
const HERO_BODY =
  "Their size, construction, exterior materials and living areas mean every vehicle needs to be assessed individually before we can recommend the appropriate cleaning service.";
const HERO_SERVICE =
  "Medusa Auto Detailing provides professional <strong>mobile caravan and motorhome valeting across London and selected surrounding areas</strong>, bringing our equipment directly to your home, storage facility, campsite or other suitable location.";

const INTERIOR_LEAD = "The inside of a caravan or motorhome is very different from a standard vehicle interior.";

export const CARAVAN = {
  whatsapp: CONTACT.whatsapp,

  seo: {
    /* The first of the two titles; the brief offers "Mobile Caravan Cleaning
       London | Motorhome Valeting | Medusa" as the alternative. */
    title: "Caravan & Motorhome Valeting London | Mobile Cleaning | Medusa",
    description:
      "Professional mobile caravan and motorhome valeting in London. Interior, exterior and full cleaning available. Send photos today for a tailored quote.",
  },

  /**
   * The layout's hero: "Prominently show: INTERIOR • EXTERIOR • FULL VALET ·
   * INDIVIDUALLY QUOTED", and the mobile note "Keep: Interior / Exterior /
   * Full Valet visible near the top". One panel straight under the h1.
   */
  points: {
    services: ["Interior", "Exterior", "Full Valet"],
    quoted: "Individually Quoted",
  },

  /* ── Section 1 — Hero ────────────────────────────────────────────────── */
  hero: {
    /* "Use ONE H1 only." */
    h1: "Mobile Caravan & Motorhome Valeting London",
    title: "Professional Interior & Exterior Cleaning at Your Location",
    lead: HERO_LEAD,
    leadHtml: linkOn(HERO_LEAD, "car valeting", LINKS.carValeting),
    body: HERO_BODY,
    serviceHtml: HERO_SERVICE,
    vehicles: ["CARAVANS", "MOTORHOMES", "CAMPERVANS", "STATIC CARAVANS"],
    /* The layout's "Trust points". */
    ticks: [
      "Interior Valeting",
      "Exterior Cleaning",
      "Interior & Exterior Packages",
      "Upholstery & Carpet Cleaning",
      "Kitchen & Living-Area Cleaning",
      "Mobile Service",
      "Individually Quoted",
    ],
    photosLine: "SEND US PHOTOS FOR A QUOTE",
    quoteLabel: "GET A FREE QUOTE",
    whatsappLabel: "WHATSAPP US",
  },

  /* ── Section 2 — Caravan & motorhome cleaning services ───────────────── */
  services: {
    heading: "Caravan & Motorhome Cleaning Services",
    title: "Choose the Cleaning Your Vehicle Needs",
    body: [
      "Every caravan and motorhome is different.",
      "Rather than forcing customers into a standard car-valeting package, we assess the size, type and condition of the vehicle and provide an individual quotation.",
    ],
    chooseFrom: "Choose from:",
    /* "SERVICE SELECTOR — Three large cards: EXTERIOR · INTERIOR · FULL
       VALET. Then smaller: STATIC CARAVAN". */
    items: [
      { title: "Exterior Valet", body: "Professional cleaning of the exterior of your caravan or motorhome." },
      {
        title: "Interior Valet",
        body: "Professional cleaning of the living and driving areas, depending on the vehicle.",
      },
      { title: "Full Interior & Exterior Valet", body: "Combine both services for a more comprehensive clean." },
    ] as Card[],
    static: {
      title: "Static Caravan Cleaning",
      body: "Cleaning for suitable static caravans within our service area, subject to access and assessment.",
    } as Card,
    cta: "REQUEST A QUOTE",
  },

  /* ── Section 3 — Exterior caravan & motorhome valeting ───────────────── */
  exterior: {
    heading: "Exterior Caravan & Motorhome Valeting",
    title: "Professional Exterior Cleaning",
    accumulateLead: "Caravans and motorhomes can quickly accumulate:",
    accumulate: [
      "Road grime",
      "Dirt",
      "Dust",
      "Traffic film",
      "Insects",
      "Bird droppings",
      "Organic contamination",
      "General environmental contamination",
    ],
    tailored: "Our exterior service is tailored according to the construction, size and condition of the vehicle.",
    includesLabel: "Exterior Service May Include:",
    includes: [
      "Pre-rinse where appropriate",
      "Exterior bodywork cleaning",
      "Appropriate hand washing",
      "Wheels cleaned",
      "Wheel arches cleaned where accessible",
      "Exterior windows cleaned",
      "Door and accessible storage-area shuts cleaned",
      "Exterior trim cleaned",
      "Removal of general road grime",
      "Bug/insect residue treatment where appropriate",
      "Final rinse",
      "Appropriate drying",
    ],
    note: "The exact process and areas included will be confirmed according to the quotation provided.",
  },

  /* ── Section 4 — Important exterior cleaning information ─────────────── */
  exteriorCare: {
    heading: "Important Exterior Cleaning Information",
    title: "Caravans Aren't Cleaned Exactly Like Cars",
    containLead: "Caravans and motorhomes can contain:",
    contain: [
      "Decals",
      "Vinyl graphics",
      "Sealants",
      "Plastic panels",
      "Acrylic windows",
      "Rubber seals",
      "External vents",
      "Older exterior materials",
      "Previously repaired areas",
    ],
    body: [
      "These materials require appropriate cleaning methods.",
      "Our technicians assess the vehicle and adjust the cleaning process accordingly.",
    ],
    important: {
      title: "Important",
      lead: "We cannot guarantee removal of:",
      items: [
        "Permanent staining",
        "UV fading",
        "Oxidation",
        "Etching",
        "Discolouration",
        "Existing scratches",
        "Deteriorated decals",
        "Damaged graphics",
        "Aged sealants",
        "Existing paint or surface defects",
      ],
      after: "Cleaning can sometimes make existing defects more visible once surrounding dirt has been removed.",
    },
  },

  /* ── Section 5 — Interior caravan & motorhome valeting ───────────────── */
  interior: {
    heading: "Interior Caravan & Motorhome Valeting",
    title: "Professional Cleaning for Your Living Space",
    lead: INTERIOR_LEAD,
    leadHtml: linkOn(INTERIOR_LEAD, "standard vehicle interior", LINKS.interior),
    containLead: "Alongside seats and carpets, it can contain:",
    contain: [
      "Living areas",
      "Dining areas",
      "Beds",
      "Storage compartments",
      "Kitchen surfaces",
      "Cupboards",
      "Tables",
      "Upholstery",
      "Curtains/blinds",
      "Driving areas",
      "Washroom areas",
    ],
    tailored: "Our interior service is therefore tailored according to the vehicle and the areas you require cleaned.",
    includesLabel: "Interior Service May Include:",
    includes: [
      "Interior vacuuming",
      "Accessible floors vacuumed",
      "Carpet cleaning where applicable",
      "Fabric upholstery cleaning where appropriate",
      "Interior hard surfaces cleaned",
      "Dashboard and driving area cleaned on motorhomes",
      "Interior windows cleaned",
      "Tables and dining surfaces cleaned",
      "Accessible cupboard exteriors cleaned",
      "Kitchen surfaces cleaned",
      "Interior trim cleaned",
      "General dust and dirt removal",
      "Accessible storage areas cleaned where agreed",
      "Final interior inspection",
    ],
    note: {
      title: "Please Note",
      body: "The exact areas included depend on the quotation and service agreed before the appointment.",
    },
  },

  /* ── Section 6 — Kitchen & living areas ──────────────────────────────── */
  living: {
    heading: "Kitchen & Living Areas",
    title: "More Than a Vehicle Interior",
    body: [
      "A caravan or motorhome is also a living space.",
      "Where included in your quotation, we can clean applicable accessible surfaces around:",
    ],
    areas: [
      {
        title: "Kitchen Area",
        items: [
          "Worktops",
          "Splashbacks",
          "Sink surrounds",
          "Cupboard exteriors",
          "Dining surfaces",
          "General accessible surfaces",
        ],
      },
      {
        title: "Living Area",
        items: [
          "Tables",
          "Seating",
          "Upholstery",
          "Carpets",
          "Hard flooring",
          "Accessible storage exteriors",
          "Interior windows",
          "General interior trim",
        ],
      },
    ],
    important: {
      title: "Important",
      bodyHtml: [
        "Our caravan valet is a <strong>vehicle/living-area valeting service</strong>, not a specialist domestic deep-cleaning, appliance-repair or maintenance service.",
        "Unless specifically agreed within your quotation, we do not dismantle or internally deep-clean appliances, plumbing systems or fixed caravan components.",
      ],
    },
  },

  /* ── Section 7 — Motorhome cab cleaning ──────────────────────────────── */
  cab: {
    heading: "Motorhome Cab Cleaning",
    title: "Driving Area Included Where Quoted",
    body: [
      "Motorhomes and campervans also have a traditional vehicle cab.",
      "Where included within the selected quotation, this may include:",
    ],
    includes: [
      "Driver and passenger areas vacuumed",
      "Dashboard cleaned",
      "Door cards cleaned",
      "Cup holders cleaned",
      "Accessible interior trim cleaned",
      "Interior glass cleaned",
      "Cab carpets/flooring cleaned",
      "Seats cleaned according to material and condition",
    ],
    note: "The exact treatment depends on the vehicle and quotation.",
  },

  /* ── Section 8 — Upholstery & carpet cleaning ────────────────────────── */
  upholstery: {
    heading: "Upholstery & Carpet Cleaning",
    title: "Refresh Seats, Carpets & Fabric Surfaces",
    body: [
      "Caravan and motorhome fabrics can accumulate dust, dirt, food residue and general contamination through regular use and storage.",
      "Where appropriate and included within your quotation, we can treat:",
    ],
    items: [
      "Fabric seating",
      "Cab seats",
      "Dining-area upholstery",
      "Carpets",
      "Removable mats",
      "Applicable fabric surfaces",
    ],
    method: "Suitable cleaning methods are selected according to the material and condition.",
    important: {
      title: "Important",
      strong: "Complete stain removal cannot be guaranteed.",
      body: "Some stains can permanently discolour or alter fabric.",
      factorsLead: "Results depend on factors including:",
      factors: [
        "Type of stain",
        "Age of stain",
        "Material",
        "Previous cleaning attempts",
        "Existing wear",
        "Dye transfer",
        "Permanent material damage",
      ],
      after:
        "Our technicians will make every reasonable effort to achieve the best possible result within the service booked.",
    },
  },

  /* ── Section 9 — Full caravan / motorhome valet ──────────────────────── */
  full: {
    heading: "Full Caravan / Motorhome Valet",
    title: "Want the Inside & Outside Done Together?",
    lead: "For customers wanting a more comprehensive service, we can quote for both the interior and exterior.",
    includesLabel: "Full Valet May Include:",
    exterior: {
      title: "Exterior",
      items: [
        "Bodywork cleaning",
        "Wheels",
        "Exterior windows",
        "Accessible exterior trim",
        "Door/storage shuts where applicable",
        "Appropriate drying",
      ],
    },
    interior: {
      title: "Interior",
      items: [
        "Vacuuming",
        "Floors/carpets",
        "Upholstery where appropriate",
        "Interior surfaces",
        "Living areas",
        "Kitchen surfaces",
        "Interior windows",
        "Motorhome cab where applicable",
      ],
    },
    quoted: {
      title: "Individually Quoted",
      body: "Because vehicle sizes and conditions vary considerably, full caravan and motorhome valets are quoted individually.",
    },
    cta: "GET A FULL VALET QUOTE",
  },

  /* ── Section 10 — Static caravan cleaning ────────────────────────────── */
  static: {
    heading: "Static Caravan Cleaning",
    title: "Mobile Static Caravan Valeting",
    body: [
      "We can also assess suitable static caravans for cleaning within our service area.",
      "Because static caravans differ significantly in size, location and access, every job must be assessed before we confirm availability and pricing.",
    ],
    needLabel: "We Need to Know:",
    need: [
      "Location",
      "Approximate size",
      "Exterior, interior or both",
      "Current condition",
      "Access around the caravan",
      "Parking availability",
      "Photographs of the caravan",
    ],
    access: {
      title: "Access Is Important",
      body: [
        "We need sufficient safe access for our mobile team and equipment.",
        "If access is restricted, please tell us when requesting your quotation.",
      ],
    },
    cta: "SEND STATIC CARAVAN ENQUIRY",
  },

  /* ── Section 11 — Caravan cleaning before & after storage ────────────── */
  storage: {
    heading: "Caravan Cleaning Before & After Storage",
    title: "Preparing Your Caravan for Use or Storage?",
    body: [
      "Caravans and motorhomes can accumulate significant dust and environmental contamination while stored.",
      "Our service can be useful when:",
    ],
    items: [
      {
        title: "Taking Your Caravan Out of Storage",
        body: "Refresh the interior and exterior before the new season or your next trip.",
      },
      { title: "Putting Your Caravan Into Storage", body: "Have the vehicle professionally cleaned before longer-term storage." },
      { title: "Preparing to Sell", body: "Improve the overall presentation before photographing or advertising the vehicle." },
      { title: "Recently Purchased", body: "Give a used caravan or motorhome a professional clean before you begin using it." },
    ] as Card[],
    cta: "REQUEST A QUOTE",
  },

  /* ── Section 12 — Specialist problems ────────────────────────────────── */
  specialist: {
    heading: "Specialist Problems",
    title: "Tell Us About Any Specific Issues Before Booking",
    lead: "Please tell us before the appointment if your caravan or motorhome has:",
    items: [
      "Heavy pet hair",
      "Significant staining",
      "Strong odours",
      "Mould",
      "Mildew",
      "Vomit or bodily-fluid contamination",
      "Heavy grease",
      "Excessive dirt",
      "Long-term storage contamination",
      "Insect infestation/residue",
      "Water damage",
      "Heavy exterior organic growth",
    ],
    after: "These issues may require additional work, specialist treatment or a separate quotation.",
    /* "SPECIALIST PROBLEMS — Important warning panel: MOULD · DAMP · ODOURS ·
       PET HAIR · HEAVY CONTAMINATION. Ask for photographs." Three of the five
       are services of their own, and those three link to them. */
    warning: [
      { label: "Mould", href: LINKS.mould },
      { label: "Damp" },
      { label: "Odours", href: LINKS.odour },
      { label: "Pet Hair", href: LINKS.petHair },
      { label: "Heavy Contamination" },
    ] as { label: string; href?: string }[],
    important: {
      title: "Important",
      body: [
        "Do not assume specialist contamination is included within a standard caravan valet.",
        "Send photographs before booking so we can assess the condition accurately.",
      ],
    },
    cta: "UPLOAD PHOTOS FOR A QUOTE",
  },

  /* ── Section 13 — Mould, damp & water ingress ────────────────────────── */
  mould: {
    heading: "Mould, Damp & Water Ingress",
    title: "Cleaning Does Not Repair the Cause of Damp or Mould",
    lead: "Caravans and motorhomes can be particularly susceptible to damp, condensation and water ingress.",
    listLeadHtml: "If mould is present, cleaning the visible contamination does <strong>not</strong> repair:",
    list: [
      "Water leaks",
      "Failed seals",
      "Damp materials",
      "Structural water ingress",
      "Ventilation problems",
      "Plumbing leaks",
      "Other underlying causes",
    ],
    returns: "If the underlying moisture problem remains, mould or unwanted smells can return.",
    scopeHtml:
      "Medusa provides cleaning and detailing services — <strong>we do not diagnose or repair caravan leaks, seals, plumbing or structural defects.</strong>",
    separateHtml: linkOn(
      "Specialist mould treatment may need to be quoted separately.",
      "Specialist mould treatment",
      LINKS.mould,
    ),
  },

  /* ── Section 14 — Odours ─────────────────────────────────────────────── */
  odours: {
    heading: "Odours",
    title: "Unwanted Smells Inside Your Caravan or Motorhome?",
    lead: "Odours can originate from many different areas, including:",
    sources: [
      "Upholstery",
      "Carpets",
      "Food spillages",
      "Pets",
      "Damp",
      "Mould",
      "Storage areas",
      "Waste systems",
      "Plumbing",
      "Appliances",
      "Inaccessible materials",
    ],
    may: "Interior cleaning may improve certain smells where the source is accessible and can be cleaned.",
    however: "However:",
    statement: "COMPLETE OR PERMANENT ODOUR REMOVAL CANNOT BE GUARANTEED.",
    after:
      "Where an odour originates from plumbing, waste systems, appliances, damp, structural issues or inaccessible contamination, further specialist work may be required.",
  },

  /* ── Section 15 — Why every job is quoted individually ───────────────── */
  quoted: {
    heading: "Why Every Job Is Quoted Individually",
    title: "No Two Caravans Are the Same",
    body: [
      "Unlike a normal passenger car, caravan and motorhome dimensions can vary enormously.",
      "A small touring caravan and a large luxury motorhome require completely different amounts of labour.",
    ],
    factorsLead: "Pricing depends on:",
    factors: [
      "Vehicle type",
      "Vehicle length",
      "Vehicle size",
      "Interior condition",
      "Exterior condition",
      "Service required",
      "Amount of upholstery",
      "Amount of carpeting",
      "Number of living areas",
      "Level of contamination",
      "Access around the vehicle",
      "Additional specialist requirements",
    ],
    after: "For this reason, we provide a quotation after reviewing your vehicle details and photographs.",
    noSurprises: {
      title: "No Surprises",
      body: [
        "The agreed quotation will be based on the condition shown and information supplied.",
        "If the vehicle's actual condition is significantly different when we arrive, additional charges may be required before additional work is undertaken.",
      ],
    },
    cta: "GET MY QUOTE",
  },

  /* ── Section 16 — Our process ────────────────────────────────────────── */
  process: {
    heading: "Our Process",
    title: "Booking Your Caravan or Motorhome Valet",
    /* The layout's "SEND DETAILS → UPLOAD PHOTOS → QUOTE → BOOK → WE COME TO
       YOU" — five stages over the copy's six steps (3 and 4 are its QUOTE). */
    flow: ["Send Details", "Upload Photos", "Quote", "Book", "We Come to You"],
    steps: [
      { title: "Complete the Quote Form", body: "Tell us about your caravan, motorhome or campervan." },
      { title: "Upload Photos", body: "Send clear photographs of the exterior and/or interior requiring cleaning." },
      { title: "We Review the Vehicle", body: "Our team assesses the size, condition and service required." },
      { title: "Receive Your Quote", body: "We'll provide a quotation based on the information supplied." },
      { title: "Choose Your Appointment", body: "Once agreed, arrange a suitable date and location." },
      { title: "We Come to You", body: "Our mobile team arrives at the agreed suitable location to carry out the service." },
    ] as Card[],
    cta: "GET A QUOTE",
  },

  /* ── Section 17 — Why choose Medusa? ─────────────────────────────────── */
  why: {
    heading: "Why Choose Medusa?",
    title: "Mobile Caravan & Motorhome Valeting",
    items: [
      {
        title: "We Come to You",
        body: [
          "Avoid the inconvenience of transporting your caravan purely for cleaning.",
          "We travel to suitable locations within our service area.",
        ],
      },
      { title: "Equipped Mobile Vans", body: ["Our mobile valeting vehicles carry professional cleaning equipment and products."] },
      { title: "Interior & Exterior Options", body: ["Choose exterior, interior or a combined service."] },
      {
        title: "Individual Quotations",
        body: [
          "You're quoted according to the vehicle and work required rather than being forced into an unsuitable one-size-fits-all package.",
        ],
      },
      {
        title: "Professional Valeting Company",
        body: ["Medusa Auto Detailing provides professional mobile valeting and detailing services across London."],
      },
      { title: "Insured", body: ["Our valeting and detailing work is covered by Medusa's applicable business insurance."] },
    ] as WhyItem[],
    cta: "GET YOUR QUOTE",
  },

  /* ── Section 19 — Customer reviews ───────────────────────────────────── */
  reviews: { heading: "Trusted by Customers Across London" },

  /* ── Section 20 — Get a quote form ───────────────────────────────────── */
  quote: {
    heading: "Get Your Caravan or Motorhome Valeting Quote",
    lead: "Complete the form and upload clear photographs.",
  },

  /* The form's "After submission:", which the form renders in its own place
     once the enquiry is in. */
  thanks: {
    title: "Thank You",
    body: [
      "We've received your caravan or motorhome valeting enquiry.",
      "Our team will review the vehicle details and photographs supplied and contact you regarding your quotation.",
    ],
    whatsappLabel: "WHATSAPP MEDUSA",
  },

  /* ── Section 21 — FAQ ────────────────────────────────────────────────── */
  faq: {
    /* The brief names the section "FAQ"; written out, as on the site's other
       rebuilt pages. */
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "Do you clean caravans in London?",
        a: [
          "Yes. Medusa provides mobile caravan valeting across our London service area and selected surrounding locations.",
          "Availability depends on the location and whether there is suitable access to carry out the work safely.",
        ],
      },
      {
        q: "Do you clean motorhomes?",
        a: ["Yes.", "We can quote for interior, exterior or combined motorhome valeting."],
      },
      {
        q: "Do you clean campervans?",
        a: ["Yes.", "Send us the vehicle details and photographs for a quotation."],
      },
      {
        q: "Do you clean static caravans?",
        a: [
          "We can assess suitable static-caravan cleaning enquiries within our service area.",
          "Access and location must be suitable for our mobile team and equipment.",
        ],
      },
      {
        q: "How much does caravan cleaning cost?",
        a: [
          "Caravans and motorhomes vary considerably in size and condition, so services are individually quoted.",
          "Complete the form and upload photographs so we can assess the work required.",
        ],
      },
      {
        q: "Can I book online instantly?",
        a: [
          "Caravan and motorhome services should be <strong>quote first</strong> rather than instant-booked.",
          "Once we have assessed the vehicle, we can confirm the price and appointment.",
        ],
      },
      {
        q: "Can you clean just the outside?",
        a: ["Yes.", "Exterior-only caravan and motorhome valeting can be quoted."],
      },
      {
        q: "Can you clean just the inside?",
        a: ["Yes.", "Interior-only cleaning can also be quoted."],
      },
      {
        q: "Can you clean both inside and outside?",
        a: ["Yes.", "We can provide a quotation for a combined interior and exterior valet."],
      },
      {
        q: "Do you clean caravan upholstery?",
        a: [
          "Suitable upholstery can be cleaned where included within the quotation and appropriate for the material.",
          "Complete stain removal cannot be guaranteed.",
        ],
      },
      {
        q: "Do you remove stains?",
        a: [
          "We make every reasonable effort to treat applicable stains within the agreed service.",
          "However, some stains permanently alter or discolour the material, so complete removal cannot be guaranteed.",
        ],
      },
      {
        q: "Can you remove smells from caravans?",
        a: [
          "Interior cleaning may improve certain smells where the source can be identified and cleaned.",
          "However, complete or permanent odour removal cannot be guaranteed.",
          "Odours caused by damp, waste systems, plumbing, appliances or inaccessible contamination may require specialist repair or treatment outside the scope of valeting.",
        ],
      },
      {
        q: "Do you remove mould?",
        a: [
          "Tell us about mould when requesting your quotation and provide clear photographs.",
          "Specialist treatment may be required.",
          "Cleaning will not repair the source of damp or water ingress, and mould can return if the underlying moisture problem remains.",
        ],
      },
      {
        q: "Do you repair leaks or damp problems?",
        a: [
          "No.",
          "Medusa is a valeting and detailing company.",
          "We do not repair caravan seals, plumbing, water ingress or structural damp problems.",
        ],
      },
      {
        q: "Do I need to provide water or electricity?",
        a: [
          "Our mobile vans are equipped for mobile valeting.",
          "However, because caravan and motorhome jobs can vary considerably, any specific site requirements will be confirmed when your quotation and appointment are arranged.",
        ],
      },
      {
        q: "Can you work at a caravan storage facility?",
        a: [
          "Potentially, yes.",
          "You must have permission from the facility and there must be sufficient access and space for our mobile team to work.",
        ],
      },
      {
        q: "How long does caravan valeting take?",
        a: [
          "This depends on the vehicle's size, condition and services required.",
          "We will provide an estimated duration when assessing the job.",
        ],
      },
    ],
  },

  /* ── Section 22 — Final CTA ──────────────────────────────────────────── */
  finalCta: {
    heading: "Need Your Caravan or Motorhome Professionally Cleaned?",
    whether: "Whether you're:",
    reasons: [
      "PREPARING FOR A TRIP",
      "COMING OUT OF STORAGE",
      "PREPARING FOR STORAGE",
      "SELLING YOUR VEHICLE",
      "OR JUST WANT IT LOOKING ITS BEST",
    ],
    body: "Medusa can provide a mobile cleaning solution tailored to your vehicle.",
    vehicles: ["CARAVANS", "MOTORHOMES", "CAMPERVANS", "STATIC CARAVANS"],
    services: "INTERIOR • EXTERIOR • FULL VALET",
    photosLine: "SEND US PHOTOS FOR A QUOTE",
    quoteLabel: "GET A FREE QUOTE",
    whatsappLabel: "WHATSAPP MEDUSA",
  },

  /* "MOBILE UX — Use sticky bottom CTA: GET QUOTE | WHATSAPP". */
  sticky: { quote: "Get Quote", whatsapp: "WhatsApp" },
};

/**
 * What `content/overrides.ts` needs to make everything else that reads this
 * page — the card `/vehicles` shows for it, the sitemap and the WebPage node —
 * read the rebuilt page rather than the mirror's.
 */
export const REBUILD = {
  slug: SLUG,
  /** The h1 `pages.json` carries for this slug today. */
  mirrorH1: "Caravan & Motorhome Valeting",
  title: CARAVAN.seo.title,
  description: CARAVAN.seo.description,
  h1: CARAVAN.hero.h1,
  og: PHOTOS.hero,
  /**
   * The hero's three paragraphs, the one that says what the service is first:
   * a hub card's blurb is the first paragraph of 60 characters or more, and
   * the brief's opening line ("Caravans and motorhomes require a different
   * approach…") is about cars. Plain — no link — because a card is a link.
   */
  intro: [HERO_SERVICE, HERO_LEAD, HERO_BODY],
  /** Quote only: the brief prices nothing ("services are individually
      quoted"), so the hub card carries the quote button. */
  price: undefined as string | undefined,
  why: {
    heading: CARAVAN.why.heading,
    items: CARAVAN.why.items.map((it) => ({ title: it.title, body: it.body.join(" ") })),
  },
  faq: CARAVAN.faq,
};
