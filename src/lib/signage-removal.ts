/**
 * Content for /commercial-valeting/car-van-stickers-removal.
 *
 * **Every sentence here is the client's own**, transcribed from the brief they
 * sent on 2026-10-06 ("car van sticker removal.pdf", 32 pages): "Full
 * replacement/re-optimisation of the existing page. KEEP EXISTING URL". Its
 * fourteen sections, its FAQ and its SEO strings are used as written —
 * straight apostrophes, and bold where the brief sets bold. What the brief
 * addresses to the developer ("WEBSITE DEVELOPER: …", the Elementor page
 * structure, the image-SEO table, the form's back-end rules) is not copy and is
 * not on the page; it decided the layout instead.
 *
 * Three things on the page come from the brief's *design* notes rather than
 * its copy, and are its own words all the same: the six "visual icon/cards"
 * of Section 2 (`remove.glance`), the six-step flow of Section 4
 * (`process.flow`) and the three phrases the disclaimer is to set in bold
 * (`important.keyPoints`).
 *
 * The internal links the brief asks for — "Commercial Valeting, Paint
 * Correction / Machine Polishing, Car Valeting … Contact / Booking" — are laid
 * on words the copy already uses, never on a sentence written for them. It
 * also names Van Valeting; the site has no such page, so that one is not
 * linked.
 *
 * Not built, because the brief says what it needs and it does not exist yet:
 *
 *   - **Section 5, Before & After** — "Add genuine Medusa before-and-after
 *     photographs of signage/sticker removal here … Do not use stock images
 *     and imply they are Medusa jobs." There are none, so neither the section
 *     nor its "See the Difference" heading is on the page. The same call the
 *     motorcycle and vomit cleaning pages made of their briefs' identical ask.
 *   - **Four of the six images in the image-SEO table** — van signage,
 *     commercial branding, before & after and adhesive residue. Only the two
 *     photographs below exist.
 */

import { BOOK_URL } from "@/lib/site";

export const SLUG = "commercial-valeting/car-van-stickers-removal";
export const PATH = `/${SLUG}`;

/** "Give this section an anchor ID: #get-quote". */
export const FORM_ANCHOR = "get-quote";
export const QUOTE = `#${FORM_ANCHOR}`;

/**
 * "Set the WhatsApp button to pre-fill: …". The site's own WhatsApp link,
 * `CONTACT.whatsapp`, is a wa.link short URL, and a short URL cannot carry a
 * message; it resolves to api.whatsapp.com/send?phone=442033556435 (checked
 * 2026-10-06), so this is that number, opened with the brief's text.
 * "[MAKE/MODEL]" is the brief's own placeholder, left for the customer to
 * fill in.
 */
const WHATSAPP_NUMBER = "442033556435";
const WHATSAPP_MESSAGE =
  "Hi Medusa, I'd like a quote for vehicle signage/sticker removal. My vehicle is a [MAKE/MODEL]. I have photos of the signage that needs removing.";
export const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export type Photo = { src: string; alt: string; w: number; h: number };

/*
  The image-SEO table's filenames and alt text, on the only two photographs
  that fit: the old page's own, of a decal-striped Porsche a Medusa
  technician photographed on a job in March 2024. Neither is captioned or
  presented as a before or an after — they are two angles of one car, and
  which side of the work each was taken on is not recorded.
*/
export const PHOTOS = {
  hero: {
    src: "/assets/2026/10/vehicle-signage-removal-london.webp",
    alt: "Vehicle signage removal service in London",
    w: 1536,
    h: 2048,
  },
  sticker: {
    src: "/assets/2026/10/car-sticker-removal-london.webp",
    alt: "Professional car sticker removal in London",
    w: 1536,
    h: 2048,
  },
} satisfies Record<string, Photo>;

export type RemoveGroup = { title: string; items: string[] };
export type UseCase = { title: string; body: string[] };
export type Step = {
  /** The flow's word for the step — "ASSESS → CLEAN → REMOVE …". */
  flow: string;
  title: string;
  /** HTML — Step 6 links "machine polishing". */
  body: string[];
  /** The step's list, which follows `body`. */
  list?: string[];
  /** The step's bold sentence, which the brief sets apart. */
  strong?: string;
  after?: string[];
};

export const SIGNAGE = {
  book: BOOK_URL,
  whatsapp: WHATSAPP,

  seo: {
    title: "Vehicle Signage Removal London | Car & Van Sticker Removal",
    description:
      "Professional vehicle signage removal in London. Car & van stickers, decals, vinyl lettering, business branding and wraps removed. Send photos for a quote.",
  },

  /* ── Section 1 — Hero ────────────────────────────────────────────────── */
  hero: {
    /* "ONE H1 ONLY." */
    h1: "Vehicle Signage & Sticker Removal London",
    subtitle: "Professional Mobile Car, Van & Commercial Vehicle Signage Removal",
    lead: "Need old company branding, stickers, decals or vinyl graphics removed from your vehicle?",
    introHtml:
      "Medusa Auto Detailing provides professional <strong>mobile vehicle signage and sticker removal across London</strong>, helping businesses and private owners remove unwanted branding from cars, vans and commercial vehicles.",
    body: "Whether you're selling a company van, returning a lease vehicle, rebranding your business or simply want old graphics removed, we come directly to your location.",
    ticks: [
      "Vehicle Signage Removal",
      "Car & Van Sticker Removal",
      "Vinyl Lettering Removal",
      "Decal & Business Branding Removal",
      "Adhesive Residue Removal",
      "Cars, Vans & Commercial Vehicles",
      "Mobile Service Across London",
    ],
    photosLine: "SEND US PHOTOS FOR A QUOTE",
    quoteLabel: "GET A FREE QUOTE",
    whatsappLabel: "WHATSAPP US",
  },

  /* ── Section 2 — What we remove ──────────────────────────────────────── */
  remove: {
    label: "What We Remove",
    heading: "Car, Van & Commercial Vehicle Branding Removal",
    lead: "We can remove many common types of vehicle signage and exterior vinyl graphics, including:",
    /* "Use visual icon/cards: Signage, Stickers, Decals, Vinyl Lettering,
       Commercial Branding, Wraps". */
    glance: ["Signage", "Stickers", "Decals", "Vinyl Lettering", "Commercial Branding", "Wraps"],
    groups: [
      {
        title: "COMPANY SIGNAGE",
        items: [
          "Company names",
          "Business logos",
          "Contact details",
          "Telephone numbers",
          "Website addresses",
          "Social media details",
          "Service information",
        ],
      },
      {
        title: "VINYL & DECALS",
        items: [
          "Vinyl lettering",
          "Vinyl graphics",
          "Vehicle decals",
          "Promotional stickers",
          "Advertising stickers",
          "Door graphics",
          "Bonnet graphics",
          "Rear-door graphics",
        ],
      },
      {
        title: "COMMERCIAL VEHICLE BRANDING",
        items: [
          "Van signage",
          "Company van branding",
          "Fleet vehicle branding",
          "Commercial vehicle graphics",
          "Old company branding",
          "Rebranding graphics",
          "Partial vehicle wraps",
          "Full vinyl wraps — subject to inspection",
        ],
      },
      {
        title: "OTHER",
        items: [
          "Window stickers",
          "Window graphics",
          "Dealer stickers",
          "Promotional graphics",
          "Adhesive residue following vinyl removal",
        ],
      },
    ] as RemoveGroup[],
    notSure: "Not sure whether we can remove your particular signage?",
    notSureBody: "Send us photographs and we'll assess it.",
    cta: "SEND PHOTOS FOR A QUOTE",
  },

  /* ── Section 3 — Perfect for businesses & private vehicle owners ─────── */
  useCases: {
    label: "Perfect for Businesses & Private Vehicle Owners",
    heading: "Why Do Customers Remove Vehicle Signage?",
    items: [
      {
        title: "SELLING A COMPANY VEHICLE?",
        body: [
          "Remove company names, telephone numbers, websites and logos before advertising or handing over the vehicle.",
        ],
      },
      {
        title: "RETURNING A LEASE VEHICLE?",
        body: [
          "Have unwanted aftermarket stickers, decals or company branding removed before the vehicle is returned.",
        ],
      },
      {
        title: "REBRANDING YOUR BUSINESS?",
        body: ["Remove existing graphics before new branding or signage is installed."],
      },
      {
        title: "CHANGING COMPANY DETAILS?",
        body: [
          "Old telephone number? New website? Updated logo?",
          "We can remove existing vinyl ready for replacement graphics.",
        ],
      },
      {
        title: "BOUGHT AN EX-COMPANY VEHICLE?",
        body: [
          "If you've purchased a previously branded car or van, we can remove remaining commercial graphics and adhesive residue where possible.",
        ],
      },
      {
        title: "UPDATING YOUR FLEET?",
        body: ["We can quote for multiple company cars and vans requiring branding removal."],
      },
    ] as UseCase[],
    cta: "REQUEST A QUOTE",
  },

  /* ── Section 4 — Our vehicle signage removal process ─────────────────── */
  process: {
    label: "Our Vehicle Signage Removal Process",
    heading: "How We Remove Vehicle Stickers, Vinyl & Signage",
    intro: [
      "Every vehicle is different.",
      "The age of the graphics, adhesive, paintwork condition, previous repairs and how long the signage has been installed can all affect the removal process.",
      "Our technicians therefore assess the vehicle and use an appropriate removal method for the graphics and surfaces involved.",
    ],
    steps: [
      {
        flow: "Assess",
        title: "INITIAL ASSESSMENT",
        body: ["Before quoting, we ask customers to provide photographs showing:"],
        list: [
          "The entire vehicle",
          "All signage requiring removal",
          "Close-up photographs of the vinyl/graphics",
          "Any visibly damaged or deteriorated areas",
        ],
        after: ["This helps us understand the amount of signage and approximate work involved."],
      },
      {
        flow: "Clean",
        title: "PRE-CLEAN",
        body: [
          "Where required, the areas surrounding the signage are cleaned before removal begins.",
          "Removing loose dirt and contamination allows our technician to work more safely around the vinyl and paintwork.",
        ],
      },
      {
        flow: "Remove",
        title: "CONTROLLED VINYL REMOVAL",
        body: [
          "The signage, lettering, stickers or decals are carefully removed using appropriate professional techniques.",
          "Where appropriate, controlled heat may be used to help soften the vinyl and adhesive.",
          "The exact method depends on the type, condition and age of the material being removed.",
        ],
      },
      {
        flow: "Adhesive",
        title: "ADHESIVE RESIDUE REMOVAL",
        body: [
          "Once the vinyl has been removed, adhesive residue may remain on the surface.",
          "Suitable products and techniques are used to remove accessible remaining adhesive where reasonably possible.",
          "Older or deteriorated adhesive can require significantly more time than newer graphics.",
        ],
      },
      {
        flow: "Clean",
        title: "FINAL CLEAN",
        body: [
          "Once the graphics and accessible adhesive have been removed, the treated areas are cleaned.",
          "This allows us to inspect the underlying surface and identify any marks, ghosting, colour differences or pre-existing defects that have become visible following removal.",
        ],
      },
      {
        flow: "Optional Polish",
        title: "OPTIONAL MACHINE POLISHING",
        body: [
          'Where appropriate, <a href="/car-detailing/machine-polish">machine polishing</a> may be recommended following signage removal.',
          "This can help improve:",
        ],
        list: [
          "Light adhesive marks",
          "Minor surface imperfections",
          "Differences in gloss",
          "Visible outlines from previous graphics",
          "General paintwork appearance",
        ],
        strong:
          "Machine polishing cannot guarantee removal of colour differences, UV fading, paint defects or permanent signage ghosting.",
        after: ["If required, machine polishing can be quoted separately."],
      },
    ] as Step[],
  },

  /* ── Section 6 — How much does vehicle signage removal cost? ─────────── */
  cost: {
    heading: "How Much Does Vehicle Signage Removal Cost?",
    title: "Every Vehicle Is Quoted Individually",
    lead: "We don't use a single fixed price for signage removal because every job is different.",
    factorsLead: "The cost depends on factors including:",
    factors: [
      "Amount of signage",
      "Size of the graphics",
      "Number of vehicle panels affected",
      "Vehicle size",
      "Age of the vinyl",
      "Condition of the vinyl",
      "Type of adhesive",
      "How easily the vinyl releases",
      "Amount of adhesive residue remaining",
      "Paintwork condition",
      "Whether the vehicle has previously been repaired or repainted",
      "Whether machine polishing is requested",
      "Whether one vehicle or an entire fleet requires treatment",
    ],
    simpleTitle: "GETTING A QUOTE IS SIMPLE",
    simple: [
      "Complete the form below",
      "Upload clear photographs",
      "Tell us what needs removing",
      "Our team will review the job",
      "We'll provide you with a quote",
    ],
    /* The page-structure note's CTA for this block: "UPLOAD PHOTOS & GET A
       QUOTE", over the copy's plainer "[GET A QUOTE]". */
    cta: "UPLOAD PHOTOS & GET A QUOTE",
  },

  /* ── Section 7 — Fleet & commercial signage removal ──────────────────── */
  fleet: {
    heading: "Fleet & Commercial Signage Removal",
    title: "Multiple Vehicles? No Problem.",
    lead: "Medusa Auto Detailing also provides signage removal for businesses with multiple vehicles.",
    reasonsLead: "Whether you're:",
    reasons: [
      "Rebranding your company",
      "Selling several fleet vehicles",
      "Returning leased vans",
      "Replacing old company graphics",
      "De-fleeting commercial vehicles",
      "Updating your fleet branding",
    ],
    reasonsTail: "we can assess the vehicles and provide a quote based on the work required.",
    strap: ["Cars", "Vans", "Commercial Vehicles", "Fleets"],
    provideLead: "For larger fleet enquiries, please provide:",
    provide: [
      "Number of vehicles",
      "Vehicle makes/models",
      "Approximate amount of signage per vehicle",
      "Location",
      "Required completion timeframe",
      "Photographs of representative vehicles",
    ],
    cta: "FLEET ENQUIRY",
  },

  /* ── Section 8 — Important information before signage removal ────────── */
  important: {
    heading: "Important Information Before Signage Removal",
    title: "Please Read Before Booking",
    /* "Important phrases should be bold: …" — the design note's three. */
    keyPoints: [
      "Paintwork underneath cannot be guaranteed.",
      "Colour differences or ghosting may become visible.",
      "Previously repaired paint carries additional risk.",
    ],
    lead: "Vehicle signage can sometimes hide differences or defects in the paintwork underneath.",
    noGuaranteeHtml:
      "Although we use professional removal techniques designed to minimise the risk of damage, <strong>Medusa Auto Detailing cannot guarantee the condition or appearance of the surface underneath existing stickers, vinyl, signage, decals or wraps.</strong>",
    outside: "Several factors are outside of our control.",
    factorsLead: "These can include:",
    factors: [
      "Age of the signage or vinyl",
      "How long the graphics have been installed",
      "Quality of the original vinyl",
      "Type and condition of adhesive",
      "UV and weather exposure",
      "Age and condition of the vehicle",
      "Previous paint repairs",
      "Previously repainted panels",
      "Poor-quality or weak paintwork",
      "Existing lacquer/clear-coat failure",
      "Stone chips or scratches underneath graphics",
      "Rust or corrosion",
      "Previous removal attempts",
      "Chemicals previously used on the vehicle",
    ],
  },

  /* ── Section 9 — Paintwork differences & signage ghosting ────────────── */
  ghosting: {
    label: "Paintwork Differences & Signage Ghosting",
    heading: "What Is Signage Ghosting?",
    body: [
      "After signage has been installed for a long period, the exposed paint surrounding the vinyl may have experienced more UV exposure and environmental wear than the protected paint underneath it.",
      "Once the graphics are removed, this can sometimes leave a visible outline or difference in colour or gloss where the signage used to be.",
    ],
    termHtml: "This is commonly referred to as <strong>signage ghosting</strong>.",
    importantHtml: [
      "<strong>Removal of the vinyl does not guarantee that the paintwork underneath will perfectly match the surrounding paintwork.</strong>",
      "Machine polishing may improve certain differences in gloss or appearance but <strong>cannot guarantee complete removal of ghosting or colour differences.</strong>",
      'In some cases, permanent differences may remain and further <a href="/car-detailing/paint-correction">paint correction</a>, bodyshop work or repainting may be required.',
      "These circumstances are outside the control of Medusa Auto Detailing.",
    ],
    /* The diagram's two labels, the body's own phrases. */
    exposed: "Exposed paint surrounding the vinyl",
    protectedPaint: "Protected paint underneath",
  },

  /* ── Section 10 — Paint damage disclaimer ────────────────────────────── */
  paintwork: {
    label: "Paint Damage Disclaimer",
    heading: "Existing & Previously Repaired Paintwork",
    careLead: "Particular care must be taken with:",
    care: [
      "Previously repainted panels",
      "Poor-quality paint repairs",
      "Failing lacquer/clear coat",
      "Damaged paint",
      "Rust or corrosion",
      "Very old or deteriorated vinyl",
      "Vinyl installed for extended periods",
    ],
    weakened: "Removing adhesive graphics can expose or affect already weakened paintwork.",
    noGuarantee:
      "While every reasonable effort will be made to minimise risk, Medusa Auto Detailing cannot guarantee that paint, lacquer or previously repaired surfaces will not lift, peel or reveal existing damage during signage removal.",
    undetermined:
      "The condition and quality of paint underneath existing signage cannot always be determined before the vinyl is removed.",
    acknowledgement: {
      title: "CUSTOMER ACKNOWLEDGEMENT",
      body: "By proceeding with the service, the customer acknowledges that the condition of surfaces beneath existing signage cannot be guaranteed and accepts that pre-existing defects, fading, ghosting, colour differences or weaknesses in previously repaired/repainted surfaces may become visible during or after removal.",
    },
  },

  /* ── Section 11 — Why choose Medusa? ─────────────────────────────────── */
  why: {
    heading: "Why Choose Medusa?",
    title: "Professional Mobile Vehicle Signage Removal",
    items: [
      {
        icon: "pin",
        title: "WE COME TO YOU",
        body: [
          "Our mobile service means your vehicle doesn't necessarily need to be taken to a detailing studio.",
          "We travel to suitable homes, workplaces and business premises across our London service area.",
        ],
      },
      {
        icon: "gauge",
        title: "PROFESSIONAL REMOVAL METHODS",
        body: [
          "We use appropriate products, tools and techniques according to the signage and surface being treated.",
        ],
      },
      {
        icon: "van",
        title: "CARS & VANS",
        body: [
          "From individual cars to commercially branded vans, we can assess a wide range of vehicle signage-removal jobs.",
        ],
      },
      {
        icon: "layers",
        title: "COMMERCIAL & FLEET WORK",
        body: [
          "Multiple vehicles requiring old branding removed?",
          'Send us the details and we can provide a <a href="/commercial-valeting">commercial quote</a>.',
        ],
      },
      {
        icon: "spark",
        title: "AFTERCARE AVAILABLE",
        body: [
          "Where appropriate, additional paintwork services such as machine polishing can be quoted following signage removal.",
        ],
      },
      {
        icon: "shield",
        title: "FULLY INSURED",
        body: [
          'Medusa Auto Detailing is a professional <a href="/car-valeting">mobile valeting</a> and <a href="/car-detailing">detailing</a> company serving customers across London.',
        ],
      },
    ],
    cta: "REQUEST A QUOTE",
  },

  /* ── Section 12 — Quote form (its fields are `lib/signage-quote.ts`) ─── */
  quote: {
    heading: "Get Your Vehicle Signage Removal Quote",
    title: "Send Us Your Vehicle Details & Photos",
    lead: "Complete the form below and our team will assess the signage you need removed.",
  },

  /* ── Section 13 — FAQ ────────────────────────────────────────────────── */
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "Can you remove company signage from a van?",
        a: [
          "Yes. We can assess and quote for the removal of company names, logos, contact information, vinyl lettering, decals and other commercial vehicle graphics.",
          "Send us photographs of the vehicle for a quote.",
        ],
      },
      {
        q: "Can you remove stickers from cars?",
        a: ["Yes. We offer professional sticker and decal removal from suitable vehicle exterior surfaces."],
      },
      {
        q: "Do you remove van sign writing?",
        a: ["Yes. Vinyl sign writing and lettering can be removed from cars, vans and suitable commercial vehicles."],
      },
      {
        q: "Can you remove an entire vehicle wrap?",
        a: [
          "Full and near-full wrap removal can be quoted following assessment.",
          "The cost and time required depend heavily on the size of the vehicle, age and condition of the vinyl and adhesive.",
        ],
      },
      {
        q: "Can you remove the glue left behind?",
        a: [
          "We can treat accessible adhesive residue following signage removal using suitable professional products and techniques.",
          "Very old or deteriorated adhesive can require considerably more time to remove.",
        ],
      },
      {
        q: "Will the paint underneath look the same?",
        a: [
          "Not necessarily.",
          "Paint protected by vinyl may have experienced less UV exposure than the surrounding paintwork.",
          "Once signage is removed, differences in colour or gloss can sometimes become visible.",
        ],
      },
      {
        q: "Can polishing remove signage ghosting?",
        a: [
          "Machine polishing can sometimes improve differences in gloss, adhesive marks and certain visible outlines.",
          "However, it cannot guarantee complete removal of UV fading or permanent colour differences.",
        ],
      },
      {
        q: "Can removing stickers damage paint?",
        a: [
          "Professional techniques are used to minimise risk, but the condition of the underlying paint cannot always be determined before removal.",
          "Previously repainted, poorly repaired, damaged or deteriorated paintwork can be more susceptible to lifting or revealing defects.",
          "For this reason, we cannot guarantee the condition of paintwork underneath existing graphics.",
        ],
      },
      {
        q: "Can you remove signage from a leased van?",
        a: [
          "Yes, subject to assessment.",
          "If you're preparing a lease vehicle for return, send us photographs of all graphics requiring removal.",
        ],
      },
      {
        q: "Do you offer fleet signage removal?",
        a: [
          "Yes.",
          "We can quote for businesses requiring branding removed from multiple cars, vans or commercial vehicles.",
          "Include the number of vehicles and photographs when completing the enquiry form.",
        ],
      },
      {
        q: "Do you come to us?",
        a: [
          "Yes. Medusa Auto Detailing operates a mobile service throughout our London service area.",
          "The location must be suitable for the work required.",
        ],
      },
      {
        q: "How much does van signage removal cost?",
        a: [
          "Every job is quoted individually because the amount, age and condition of signage can vary considerably.",
          "Send us photographs using our quotation form and we'll assess the work required.",
        ],
      },
    ],
  },

  /* ── Section 14 — Final CTA ──────────────────────────────────────────── */
  finalCta: {
    heading: "READY TO REMOVE YOUR OLD VEHICLE BRANDING?",
    body: "Whether you're selling a van, returning a lease vehicle, rebranding your company or simply removing unwanted stickers, Medusa Auto Detailing can help.",
    chips: [
      "CAR SIGNAGE",
      "VAN SIGNAGE",
      "STICKERS & DECALS",
      "VINYL LETTERING",
      "COMMERCIAL BRANDING",
      "FLEET SIGNAGE",
    ],
    closing: "Send us photos today for a quote.",
    quoteLabel: "GET A FREE QUOTE",
    whatsappLabel: "WHATSAPP US",
  },

  /* The form's "After submission display", which the form renders in its
     own place once the enquiry is in. */
  thanks: {
    title: "Thank You — We've Received Your Enquiry",
    body: [
      "We've received your vehicle signage removal details.",
      "Our team will review the information and photographs provided and contact you regarding your quotation.",
      "For anything urgent, you can also contact us on WhatsApp.",
    ],
    whatsappLabel: "WHATSAPP MEDUSA",
  },
};
