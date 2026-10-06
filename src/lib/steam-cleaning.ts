/**
 * Content for /car-interior-cleaning/steam-cleaning.
 *
 * **Every sentence here is the client's own**, transcribed from the brief they
 * sent on 2026-10-06 ("Webite changes .pdf", 28 pages): "Replace/re-optimise
 * the existing Steam Cleaning page using the content below. KEEP EXISTING
 * URL". Its sixteen sections, FAQ and SEO strings are used as written —
 * straight apostrophes, and bold wherever the brief sets a phrase in bold.
 * What the brief addressed to the developer ("WEBSITE DEVELOPER: …", the
 * recommended Elementor structure, the image-SEO table, the internal-linking,
 * mobile and tracking notes, the "remove from current page" lists and the
 * closing positioning rule) is not copy; it decided the layout.
 *
 * The brief's headline change is that steam cleaning stops being sold as a
 * service of its own: "Steam cleaning is not sold as a separate standalone
 * service through this page. Instead, it is used where required and
 * appropriate as part of selected Medusa interior-valeting packages" — the
 * Triton Interior, Zeus Full and Medusa Gold valets. "Do NOT turn this into
 * another confusing standalone service. The page should rank for: CAR
 * INTERIOR STEAM CLEANING LONDON but convert visitors into: TRITON INTERIOR
 * VALET · ZEUS FULL VALET · MEDUSA GOLD VALET." So no button on the page books
 * "steam cleaning": every booking button books a valet, and the three valets
 * are named, and linked, from the hero down.
 *
 * Nothing of the old page survives. It was titled "Mobile Car Steam Cleaning
 * in London | Car Interior & Exterior Steam Cleaning" and covered bodywork,
 * wheels and engine bays — "ALSO REMOVE EXTERIOR STEAM-CLEANING CONTENT …
 * This page should focus entirely on: CAR INTERIOR STEAM CLEANING" — and the
 * brief's list of claims to remove ("kills 99.9% of bacteria/viruses",
 * "sterilises the vehicle", "safe for every interior material") is the kind
 * of thing the old copy said.
 *
 * Nothing is `ASSEMBLED`: the brief does not contradict itself and none of
 * its answers carries a note to the developer.
 *
 * Two parts of the brief are not built here:
 *
 *   - **Section 11, Before & After** — "Add genuine Medusa before-and-after
 *     photographs showing interior cleaning … Use an interactive before/after
 *     slider where possible." There are none, and none is faked. Its IMAGE
 *     CAPTION is a sentence about the process rather than about any one car,
 *     so it captions the process band's photograph instead (`process.caption`)
 *     until real before & after photographs exist.
 *   - **Section 13's reviews** are "genuine Medusa Google reviews … Prioritise
 *     reviews mentioning interior cleaning, deep cleaning, seats, carpets …":
 *     the site has four, none of them about steam, and they are shown word for
 *     word under the brief's heading, never as reviews of this service.
 *
 * Of the image-SEO table's six files, two exist: the old page's own
 * photographs of a technician steaming a seat and of steam on a carpet. There
 * is no photograph of steam on a centre console, of "steam detailing", or a
 * second one of a seat, and a before & after is Section 11 — see `PHOTOS`.
 */

import { BOOK_URL, CONTACT } from "@/lib/site";

export const SLUG = "car-interior-cleaning/steam-cleaning";
export const PATH = `/${SLUG}`;

/**
 * The three valets steam cleaning is part of, and where each is sold. "This
 * page should link naturally to: Triton Interior Valet, Zeus Full Valet,
 * Medusa Gold Valet". Medusa Gold has no page of its own — it is a package on
 * `/car-valeting`, in that page's tabs and table — so that is where it links,
 * as on the odour treatment page.
 */
export const VALETS = {
  triton: { name: "Triton Interior Valet", href: "/car-interior-cleaning/interior-valet" },
  zeus: { name: "Zeus Full Valet", href: "/car-valeting/premium-full-valet" },
  gold: { name: "Medusa Gold Valet", href: "/car-valeting" },
} as const;

export type ValetKey = keyof typeof VALETS;

/* "Pet Hair Removal · Odour & Ozone Treatment · Vomit Cleaning · Mould
   Removal" — the rest of the brief's internal-linking list. */
export const PET_HAIR_PATH = "/car-interior-cleaning/pet-hair-removal";
export const ODOUR_PATH = "/car-interior-cleaning/odour-removal";
export const VOMIT_PATH = "/car-interior-cleaning/vomit-cleaning";
export const MOULD_PATH = "/car-interior-cleaning/mould-removal";

/**
 * "GOOGLE ADS / CONVERSION TRACKING — If Google Ads traffic reaches this page,
 * track: Book Now clicks · Triton clicks · Zeus clicks · Medusa Gold clicks ·
 * WhatsApp clicks · Phone clicks · Completed bookings". WhatsApp and phone are
 * the shared events `TrackClicks` fires on its own; a completed booking
 * happens on book.medusaautodetailing.co.uk and has to be tracked there. The
 * other four are these, carried as `data-track` by every booking button and
 * every link to a valet's page.
 */
export const TRACK = {
  book: "book_valet_click",
  triton: "triton_valet_click",
  zeus: "zeus_valet_click",
  gold: "medusa_gold_valet_click",
} as const;

export type Photo = { src: string; alt: string; w: number; h: number };

/*
  The image-SEO table's filenames and alt text, on the photographs that fit
  them — both the old page's own, copied under the brief's names. The table
  also names a centre console, "steam detailing", a car seat and a before &
  after; the site has no photograph of steam on a console or of steam
  detailing, its one photograph of steam on a seat is the hero, and the
  before & after is Section 11. None of those is faked or relabelled.

  `detail` is not in the table: it is the site's April 2026 close-up of a
  brush working an air vent — the process's "agitation & detailing" — under
  the alt text it already carries on that post, beside the seven steps.
*/
export const PHOTOS = {
  /* "Strong photograph of a Medusa technician steam-cleaning an interior." */
  hero: {
    src: "/assets/2026/10/car-interior-steam-cleaning-london.webp",
    alt: "Professional car interior steam cleaning in London",
    w: 1571,
    h: 1200,
  },
  /* Steam on a black boot carpet — beside "how steam cleaning works". */
  carpet: {
    src: "/assets/2026/10/car-carpet-steam-cleaning.webp",
    alt: "Car carpet steam cleaning and interior detailing",
    w: 1024,
    h: 684,
  },
  detail: {
    src: "/assets/2026/04/car-interior-detailing-close-up-london.jpg.webp",
    alt: "car interior detailing close up cleaning air vents and dashboard London",
    w: 1536,
    h: 1024,
  },
} satisfies Record<string, Photo>;

export type Stage = { flow: string; title: string; body: string };
export type Step = { title: string; body: string[]; list?: { lead: string; items: string[] } };
export type InfoItem = { title: string; body: string[]; list?: string[]; after?: string[]; strong?: string };
export type Package = {
  valet: ValetKey;
  /** The recommended layout's label for the card: "TRITON — Interior". */
  tag: string;
  title: string;
  body: string[];
  suitable?: string[];
  ctaLabel: string;
};

export const STEAM = {
  book: BOOK_URL,
  whatsapp: CONTACT.whatsapp,

  seo: {
    title: "Car Interior Steam Cleaning London | Mobile Service | Medusa",
    description:
      "Professional car interior steam cleaning in London, used where appropriate as part of selected Medusa interior valets. Mobile service at your home or workplace.",
  },

  /* ── Section 1 — Hero ────────────────────────────────────────────────── */
  hero: {
    /* "ONE H1 ONLY." */
    h1: "Car Interior Steam Cleaning London",
    title: "Professional Steam Cleaning as Part of Your Medusa Interior Valet",
    intro: [
      "Steam cleaning can be an effective part of a professional car interior clean, helping tackle dirt and grime in suitable areas that can be difficult to clean using conventional methods alone.",
      "At Medusa Auto Detailing, our technicians use professional steam-cleaning equipment <strong>where appropriate and where suitable for the material being treated</strong> as part of selected interior valeting packages.",
      "We don't simply steam the entire interior.",
      "Instead, steam is combined with professional vacuuming, interior cleaning, detailing and other appropriate methods to achieve the best possible result for your vehicle.",
    ],
    /* "Above the fold make clear: STEAM CLEANING INCLUDED WHERE REQUIRED WITH
       SELECTED INTERIOR VALETS" — Section 1's own panel says exactly that. */
    included: {
      title: "Steam Cleaning Included Where Required",
      label: "Available within selected:",
    },
    ticks: [
      "Professional Mobile Service",
      "Steam Cleaning Where Appropriate",
      "Interior Deep Cleaning",
      "Detailed Interior Cleaning",
      "Professional Equipment & Products",
      "We Come to You Across London",
    ],
    bookLabel: "Book an Interior Valet",
    packagesLabel: "View Our Valet Packages",
  },

  /* ── Section 2 — How steam cleaning works at Medusa ──────────────────── */
  how: {
    heading: "How Steam Cleaning Works at Medusa",
    title: "Steam Cleaning Is Part of the Process — Not the Entire Process",
    body: [
      "A professional interior valet requires more than simply running a steam cleaner over the vehicle.",
      "Different materials and different types of contamination require different cleaning methods.",
      "That's why our technicians combine appropriate methods depending on the vehicle's condition and the package booked.",
    ],
    listLead: "Our interior cleaning process may include:",
    /* `flow` is the recommended layout's own label for each stage: "Visual
       process: VACUUM → CLEAN → AGITATE → STEAM → EXTRACT → FINISH". */
    stages: [
      { flow: "Vacuum", title: "Vacuuming", body: "Loose dirt, dust and debris are removed from accessible interior areas." },
      {
        flow: "Clean",
        title: "Interior Cleaning",
        body: "Appropriate professional products are used to clean applicable surfaces.",
      },
      {
        flow: "Agitate",
        title: "Agitation & Detailing",
        body: "Brushes and detailing tools help clean areas where dirt has accumulated.",
      },
      {
        flow: "Steam",
        title: "Steam Cleaning",
        body: "Steam may be used on suitable surfaces and areas where it can assist with the cleaning process.",
      },
      {
        flow: "Extract",
        title: "Fabric / Upholstery Treatment",
        body: "Where included within the selected package and appropriate for the material, fabric cleaning or extraction methods may be used.",
      },
      {
        flow: "Finish",
        title: "Interior Finishing",
        body: "Surfaces are wiped down and the interior is inspected before completion.",
      },
    ] as Stage[],
  },

  /* ── Section 3 — Where can steam be used? ────────────────────────────── */
  where: {
    heading: "Where Can Steam Be Used?",
    title: "Targeted Interior Steam Cleaning",
    lead: "Depending on the vehicle and materials, steam cleaning may be useful for areas such as:",
    items: [
      "Suitable interior plastics",
      "Cup holders",
      "Centre-console areas",
      "Door cards",
      "Door shuts",
      "Suitable dashboard areas",
      "Air-vent surrounds",
      "Seat rails and surrounding areas",
      "Suitable fabric areas",
      "Carpet areas where appropriate",
      "Hard-to-reach crevices",
      "Other suitable interior surfaces",
    ],
    important: {
      title: "Important",
      strong: "Not every interior surface should be treated with steam.",
      body: "Our technicians assess the surface first and use an alternative cleaning method where steam would not be appropriate.",
    },
  },

  /* ── Section 4 — What we don't simply steam ──────────────────────────── */
  care: {
    heading: "What We Don't Simply Steam",
    title: "Different Materials Require Different Cleaning Methods",
    body: [
      "Modern vehicle interiors can contain sensitive materials, electronics, adhesives, screens and specialist finishes.",
      "Using excessive heat or moisture in the wrong area can create unnecessary risk.",
      "For this reason, our technicians do <strong>not automatically steam every surface</strong>.",
    ],
    listLead: "Particular care is taken around areas such as:",
    items: [
      "Infotainment screens",
      "Digital displays",
      "Electronic controls",
      "Sensitive switchgear",
      "Instrument clusters",
      "Delicate trim",
      "Piano-black surfaces",
      "Headliners",
      "Adhesive-backed materials",
      "Certain leather or specialist finishes",
      "Areas containing sensitive electronics",
    ],
    after: "The technician will determine the appropriate cleaning method based on the material and condition of the vehicle.",
    /* Set in capitals in the brief, as the section's closing line. */
    statement: "Professional Detailing Is About Using the Right Method — Not One Method Everywhere.",
  },

  /* ── Section 5 — Our interior steam-cleaning process ─────────────────── */
  process: {
    heading: "Our Interior Steam-Cleaning Process",
    title: "How We Professionally Clean Your Interior",
    lead: [
      "The exact process depends on the Medusa package booked and the condition of the vehicle.",
      "A typical interior-cleaning process may involve:",
    ],
    steps: [
      {
        title: "Inspection",
        body: [
          "The technician assesses the condition of the interior and identifies areas requiring additional attention.",
        ],
      },
      {
        title: "Vacuum & Preparation",
        body: [
          "Loose dirt and debris are removed from accessible areas.",
          "This gives the technician a clearer view of stains, grime and areas requiring deeper treatment.",
        ],
      },
      {
        title: "Interior Cleaning",
        body: [
          "Suitable professional cleaning products are applied to applicable interior surfaces.",
          "Different materials may require different products and techniques.",
        ],
      },
      {
        title: "Agitation & Detailing",
        body: [],
        list: {
          lead: "Brushes and detailing tools may be used to loosen dirt from areas such as:",
          items: ["Trim", "Plastics", "Cup holders", "Door areas", "Crevices", "Other detailed interior areas"],
        },
      },
      {
        title: "Steam Cleaning Where Appropriate",
        body: [
          "Professional steam-cleaning equipment may then be used on suitable surfaces where additional cleaning is required.",
          "Steam can be particularly useful for detailed areas and certain types of stubborn grime.",
        ],
      },
      {
        title: "Fabric & Carpet Treatment",
        body: [
          "Where included within the selected valet and suitable for the material, carpets and fabric upholstery may receive additional cleaning or extraction.",
        ],
      },
      {
        title: "Final Detail",
        body: [
          "The interior is wiped down, finishing touches are completed and the technician carries out a final inspection.",
        ],
      },
    ] as Step[],
    /* Section 11's IMAGE CAPTION (bold in the brief) — see the note at the
       top of this file. It says nothing about any one car. */
    caption:
      "Professional interior cleaning using the appropriate combination of vacuuming, detailing, cleaning products, steam and extraction depending on the surface and package booked.",
  },

  /* ── Section 6 — Benefits of professional interior steam cleaning ────── */
  benefits: {
    heading: "Benefits of Professional Interior Steam Cleaning",
    title: "Why Use Steam During Car Interior Cleaning?",
    items: [
      {
        title: "Helps Loosen Stubborn Grime",
        body: "Heat and moisture can help loosen certain dirt and grime from suitable interior surfaces.",
      },
      {
        title: "Useful for Detailed Areas",
        body: "Steam can be useful around certain crevices and detailed areas that are more difficult to clean using a cloth alone.",
      },
      {
        title: "Complements Deep Cleaning",
        body: "Steam works alongside professional cleaning products, agitation, vacuuming and extraction rather than replacing them.",
      },
      {
        title: "Targeted Cleaning",
        body: "Our technicians use steam where it is appropriate rather than unnecessarily applying it throughout the entire vehicle.",
      },
      {
        title: "Professional Equipment",
        body: "Our mobile technicians arrive with the equipment required to carry out the applicable Medusa valeting service at your location.",
      },
    ],
  },

  /* ── Section 7 — Which Medusa packages include steam cleaning? ───────── */
  packages: {
    heading: "Which Medusa Packages Include Steam Cleaning?",
    title: "Choose the Right Valet for Your Vehicle",
    leadHtml: [
      "Steam cleaning is <strong>not sold as a separate standalone service through this page</strong>.",
      "Instead, it is used where required and appropriate as part of selected Medusa interior-valeting packages.",
    ],
    suitableLabel: "Suitable for:",
    /* "PACKAGE SELECTION — Three large cards: TRITON Interior · ZEUS Interior
       + Exterior · MEDUSA GOLD Premium Valet. Each card should have its own
       CTA." The tags are the layout's; everything else is Section 7. */
    items: [
      {
        valet: "triton",
        tag: "Interior",
        title: "For Customers Focused on the Interior",
        body: [
          "Choose Triton if your main priority is professionally cleaning the inside of your vehicle.",
          "Where appropriate, steam cleaning can form part of the interior-cleaning process.",
        ],
        suitable: [
          "General interior cleaning",
          "Dirty interior surfaces",
          "Carpets and upholstery",
          "Interior detailing",
          "Customers primarily concerned with the inside of the vehicle",
        ],
        ctaLabel: "View Triton Interior Valet",
      },
      {
        valet: "zeus",
        tag: "Interior + Exterior",
        title: "Interior + Exterior Valeting",
        body: [
          "Choose Zeus if you want your vehicle's interior professionally cleaned alongside a complete exterior valet.",
          "Steam may be used where appropriate during the interior portion of the service.",
        ],
        suitable: [
          "Interior and exterior cleaning",
          "Regular deeper valeting",
          "Customers wanting the complete vehicle cleaned",
        ],
        ctaLabel: "View Zeus Full Valet",
      },
      {
        valet: "gold",
        tag: "Premium Valet",
        title: "Our Premium Valeting Option",
        body: [
          "Choose Medusa Gold for customers wanting a more comprehensive premium valeting package.",
          "Appropriate interior steam cleaning can be incorporated where required as part of the interior treatment.",
        ],
        ctaLabel: "View Medusa Gold Valet",
      },
    ] as Package[],
  },

  /* ── Section 8 — What about stains? ──────────────────────────────────── */
  stains: {
    heading: "What About Stains?",
    title: "Steam Alone Doesn't Guarantee Stain Removal",
    lead: "Different stains require different treatment methods.",
    listLead: "Depending on:",
    list: [
      "What caused the stain",
      "How long it has been present",
      "The material affected",
      "Previous cleaning attempts",
      "Whether the substance has penetrated deeper into the material",
    ],
    after: "additional products, agitation or extraction may be required.",
    important: {
      title: "Important",
      strong: "Complete stain removal cannot be guaranteed.",
      body: [
        "Permanent staining, discolouration, dye transfer, chemical damage or previous damage to the material may remain after professional cleaning.",
        "Our technicians will make every reasonable effort to achieve the best possible result within the scope of the package booked.",
      ],
    },
  },

  /* ── Section 9 — What about smells? ──────────────────────────────────── */
  smells: {
    heading: "What About Smells?",
    title: "Steam Cleaning Is Not Our Odour Treatment Service",
    lead: "If your main concern is an unwanted smell inside the vehicle, don't book a valet purely because it includes steam cleaning.",
    listLead: "Odours can originate from:",
    list: [
      "Seat foam",
      "Carpet underlay",
      "Food or drink contamination",
      "Pet contamination",
      "Smoke",
      "Mould",
      "Vomit",
      "Ventilation systems",
      "Cabin filters",
      "Inaccessible areas",
    ],
    after: "Steam cleaning alone cannot guarantee removal of these odours.",
    help: {
      title: "Need Help With an Interior Smell?",
      offers: "Medusa offers a separate:",
      name: "Odour & Ozone Treatment",
      addOnTo: "available as an add-on to:",
      ctaLabel: "View Odour & Ozone Treatment",
    },
    important: {
      title: "Important",
      body: "Complete or permanent odour removal cannot be guaranteed.",
    },
  },

  /* ── Section 10 — Specialist interior problems ───────────────────────── */
  specialist: {
    heading: "Specialist Interior Problems",
    title: "Some Vehicles Need More Than a Standard Interior Valet",
    lead: "If your vehicle has a specific contamination problem, choose the appropriate specialist service rather than relying on steam cleaning alone.",
    /* "SPECIALIST SERVICES — Four cards: PET HAIR · ODOUR · VOMIT · MOULD.
       This creates strong internal linking between your interior-cleaning
       pages." In Section 10's own order. */
    items: [
      {
        title: "Pet Hair",
        body: "Pet Hair Removal can be added to applicable interior valeting.",
        href: PET_HAIR_PATH,
        ctaLabel: "View Pet Hair Removal",
      },
      {
        title: "Vomit / Sickness",
        body: "Vomit contamination requires physical cleaning and appropriate treatment.",
        href: VOMIT_PATH,
        ctaLabel: "View Vomit Cleaning",
      },
      {
        title: "Mould",
        body: "Vehicles affected by mould require the appropriate specialist cleaning service.",
        href: MOULD_PATH,
        ctaLabel: "View Mould Removal",
      },
      {
        title: "Odours",
        body: "For persistent unwanted smells, add our Odour & Ozone Treatment to an eligible valet.",
        href: ODOUR_PATH,
        ctaLabel: "View Odour Treatment",
      },
    ],
  },

  /* ── Section 12 — Why choose Medusa? ─────────────────────────────────── */
  why: {
    heading: "Why Choose Medusa?",
    title: "Professional Mobile Car Interior Cleaning Across London",
    items: [
      {
        title: "We Come to You",
        body: ["Our mobile technicians travel directly to suitable homes and workplaces within our London service area."],
      },
      {
        title: "More Than Just Steam",
        body: ["Professional interior cleaning requires the correct combination of equipment, products and techniques."],
      },
      {
        title: "Appropriate Methods",
        body: [
          "We don't automatically use steam on every surface.",
          "The appropriate method is selected according to the material and condition.",
        ],
      },
      {
        title: "Multiple Valet Options",
        body: [
          "Choose from Triton Interior, Zeus Full Valet or Medusa Gold depending on the level of service you require.",
        ],
      },
      {
        title: "Specialist Extras",
        body: [
          "Pet hair and odour treatment can be added where required, while specialist contamination services are available for problems such as vomit and mould.",
        ],
      },
      {
        title: "Professional Mobile Valeting",
        body: ["Medusa Auto Detailing provides professional mobile car valeting and detailing throughout London."],
      },
    ],
    ctaLabel: "View Valet Packages",
  },

  /* ── Section 13 — Customer reviews ───────────────────────────────────── */
  reviews: { heading: "Trusted By Customers Across London" },

  /* ── Section 14 — FAQ ────────────────────────────────────────────────── */
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "Do you offer car interior steam cleaning in London?",
        a: [
          "Yes.",
          "Medusa Auto Detailing uses professional steam-cleaning equipment where appropriate as part of selected interior valeting packages.",
        ],
      },
      {
        q: "Can I book only steam cleaning?",
        a: [
          "Steam cleaning is not positioned as a standalone service through this page.",
          "Instead, it is used where appropriate as part of our Triton Interior Valet, Zeus Full Valet and Medusa Gold Valet.",
        ],
      },
      {
        q: "Which valet should I choose?",
        a: [
          `If you primarily need the inside of the vehicle cleaned, consider our <a href="${VALETS.triton.href}"><strong>Triton Interior Valet</strong></a>.`,
          `If you want both interior and exterior valeting, consider the <a href="${VALETS.zeus.href}"><strong>Zeus Full Valet</strong></a>.`,
          `For our premium valeting option, choose the <a href="${VALETS.gold.href}"><strong>Medusa Gold Valet</strong></a>.`,
        ],
      },
      {
        q: "Do you steam every part of the interior?",
        a: [
          "No.",
          "Different materials require different cleaning methods.",
          "Steam is only used where our technician considers it appropriate for the surface being treated.",
        ],
      },
      {
        q: "Do you steam clean car seats?",
        a: [
          "Steam may be used on suitable areas/materials where appropriate.",
          "The exact treatment depends on the seat material, condition and cleaning requirements.",
        ],
      },
      {
        q: "Can you steam clean leather seats?",
        a: [
          "Leather requires appropriate cleaning techniques based on its type and condition.",
          "Our technicians determine the appropriate method rather than automatically applying steam.",
        ],
      },
      {
        q: "Do you steam clean car carpets?",
        a: [
          "Steam may form part of the cleaning process where appropriate.",
          "Carpets may also require vacuuming, agitation, cleaning products or extraction depending on the service booked and their condition.",
        ],
      },
      {
        q: "Does steam cleaning remove stains?",
        a: [
          "Steam can assist with the cleaning process, but <strong>complete stain removal cannot be guaranteed</strong>.",
          "Some stains can permanently alter or discolour the material.",
        ],
      },
      {
        q: "Will steam cleaning remove smells from my car?",
        a: [
          "Steam cleaning may assist with general interior cleaning, but it does not guarantee removal of unwanted smells.",
          `If odour is your primary concern, consider our <a href="${ODOUR_PATH}"><strong>Odour &amp; Ozone Treatment</strong></a> add-on.`,
        ],
      },
      {
        q: "Can you remove cigarette smells?",
        a: [
          "Smoke-related odours may require our dedicated Odour &amp; Ozone Treatment alongside an eligible valet.",
          "Complete or permanent odour removal cannot be guaranteed.",
        ],
      },
      {
        q: "Can steam cleaning remove pet smells?",
        a: [
          "Pet-related smells may require additional odour treatment depending on their source and severity.",
          `For pet hair specifically, we offer a <a href="${PET_HAIR_PATH}"><strong>Pet Hair Removal add-on</strong></a>.`,
        ],
      },
      {
        q: "What if my car has vomit inside?",
        a: [
          `Vomit contamination should be booked under our dedicated <a href="${VOMIT_PATH}"><strong>Vomit Cleaning</strong></a> service rather than relying on a standard steam clean.`,
        ],
      },
      {
        q: "What if my vehicle has mould?",
        a: [
          `Please use our dedicated <a href="${MOULD_PATH}"><strong>Mould Removal</strong></a> service.`,
          "Mould should not be treated as a standard steam-cleaning appointment.",
        ],
      },
      {
        q: "Do you come to my home?",
        a: [
          "Yes.",
          "Medusa Auto Detailing provides mobile valeting throughout our London service area, subject to having a suitable location for the work to be completed.",
        ],
      },
    ],
  },

  /* ── Section 15 — Important service information ──────────────────────── */
  info: {
    heading: "Important Service Information",
    title: "Please Read Before Booking",
    items: [
      {
        title: "Steam Cleaning Is Used Where Appropriate",
        body: [
          "Not every interior surface is suitable for steam cleaning.",
          "Our technicians decide the appropriate cleaning method based on the material, condition and area being treated.",
        ],
      },
      {
        title: "Stain Removal Is Not Guaranteed",
        body: ["Some stains can cause permanent discolouration or material damage."],
      },
      {
        title: "Odour Removal Is Not Guaranteed",
        body: ["Steam cleaning should not be booked as a guaranteed solution for interior smells."],
      },
      {
        title: "Existing Damage",
        /* One sentence wrapped round a list: "Professional cleaning can
           sometimes make existing: [six] more noticeable once surrounding
           dirt has been removed." */
        body: ["Professional cleaning can sometimes make existing:"],
        list: ["Scratches", "Wear", "Fading", "Discolouration", "Staining", "Material deterioration"],
        after: ["more noticeable once surrounding dirt has been removed."],
        strong: "Medusa Auto Detailing cannot be held responsible for pre-existing damage or defects.",
      },
      {
        title: "Sensitive Surfaces",
        body: [
          "Screens, digital displays, piano-black trim and other sensitive surfaces can already contain scratches or defects that become more visible once cleaned.",
          "Professional interior cleaning does not remove these defects.",
        ],
      },
    ] as InfoItem[],
  },

  /* ── Section 16 — Final CTA ──────────────────────────────────────────── */
  finalCta: {
    heading: "Give Your Car Interior the Professional Clean It Needs",
    body: [
      "Don't choose a service simply because it uses a steam cleaner.",
      "Choose the level of interior cleaning your vehicle actually requires and let our technicians use the appropriate professional methods for the job.",
    ],
    /* "FINAL PACKAGE SELECTOR / CTA — Triton / Zeus / Medusa Gold." */
    packages: [
      { valet: "triton", line: "Interior-focused professional valet", ctaLabel: "View Triton" },
      { valet: "zeus", line: "Professional interior + exterior valet", ctaLabel: "View Zeus" },
      { valet: "gold", line: "Premium Medusa valeting package", ctaLabel: "View Medusa Gold" },
    ] as { valet: ValetKey; line: string; ctaLabel: string }[],
    mobile: "Mobile Valeting Across London",
    bookLabel: "Book Your Valet",
    whatsappLabel: "WhatsApp Medusa",
  },

  /* "MOBILE STICKY BAR: BOOK A VALET | WHATSAPP" */
  sticky: { book: "Book a Valet", whatsapp: "WhatsApp" },
};

/**
 * What `content/overrides.ts` needs to make the rest of the site read this
 * page — `/car-interior-cleaning`'s card, the sitemap and the WebPage node.
 */
export const REBUILD = {
  slug: SLUG,
  mirrorH1: "Mobile Car Steam Cleaning in London",
  title: STEAM.seo.title,
  description: STEAM.seo.description,
  h1: STEAM.hero.h1,
  og: PHOTOS.hero,
  /** Opening paragraphs (HTML). The first is the hub card's blurb. */
  intro: STEAM.hero.intro,
  /**
   * None. Steam cleaning "is not sold as a separate standalone service through
   * this page" — it is part of the Triton, Zeus and Medusa Gold valets, and
   * the brief quotes no price for it or for them. It is not an add-on either,
   * so neither "From £…" nor "+£…" would be true.
   */
  price: undefined as string | undefined,
  why: {
    heading: STEAM.why.heading,
    items: STEAM.why.items.map((it) => ({ title: it.title, body: it.body.join(" ") })),
  },
  faq: STEAM.faq,
};
