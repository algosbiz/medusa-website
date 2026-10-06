/**
 * Content for /mobile-car-wash/car-wax-service.
 *
 * **Every sentence here is the client's own**, transcribed from the brief they
 * sent on 2026-10-06 ("Webite changes  (7).pdf", 35 pages): "Completely
 * replace/re-optimise the existing Car Wax Service page using the content
 * below. KEEP EXISTING URL". Its twenty-two sections, FAQ and SEO strings are
 * used as written — straight apostrophes, and bold wherever the brief wraps a
 * phrase in `**…**` (the PDF was printed from Markdown, so its `#` marks are
 * heading levels and its `**` marks are bold, never copy). What the brief
 * addressed to the developer ("WEBSITE DEVELOPER: …", the Elementor page
 * structure, the image-SEO table, the booking-system, internal-linking,
 * tracking and "remove from current page" notes) is not copy; it decided the
 * layout.
 *
 * The brief's headline change is the service's position: "The Car Wax Service
 * is: AN ADD-ON TO MEDUSA VALETING SERVICES. It is NOT intended to be booked
 * as a standalone £40 mobile appointment … This needs to be obvious
 * throughout the page". Nothing of the old page survives. It was titled
 * "Autoglym HD Wax", spent most of its length on the retail product ("What is
 * Autoglym HD Carnauba Wax?", "Why is Autoglym HD Wax So Highly Regarded?",
 * "Carnauba Wax Excellence" — the brief's list of sections to cut) and
 * promised "long-lasting protection by creating a barrier against harmful
 * elements", which is the kind of durability claim the brief withdraws.
 * Autoglym stays only where the brief keeps it: one line in Section 10 and
 * one answer, "Where applicable".
 *
 * **One answer is shortened, and it is marked `ASSEMBLED` below**: "Do you use
 * Autoglym wax?" ends on a sentence to the developer — "If the product used
 * changes, the website should be updated rather than promising one particular
 * brand indefinitely." The page keeps the customer-facing first sentence.
 *
 * Three parts of the brief are not built here:
 *
 *   - **Section 11, "See the Finished Result"** — "Use genuine Medusa
 *     photographs showing freshly waxed vehicles … Do not artificially enhance
 *     reflections or water beading." No such set exists, so the gallery and
 *     its caption wait for real photographs, as the earlier briefs' before &
 *     after sections do. The image-SEO table's before/after file is not made
 *     either.
 *   - **The booking-system instructions** — the OPTIONAL EXTRAS entry, the
 *     conditional logic that refuses wax on an interior-only service, vehicle
 *     size pricing and the booking description all belong to
 *     book.medusaautodetailing.co.uk, which is not this repo. The rule they
 *     enforce is on this page anyway: the add-on bar, Section 15's note and
 *     the interior-only question in the FAQ.
 *   - **Section 19's reviews** are "genuine Medusa reviews … Prioritise
 *     reviews mentioning: Gloss, Exterior finish …": the site has four, none
 *     about wax, and they are shown word for word under the brief's heading.
 *
 * Section 12's "FOR THIS REASON, DO NOT ADVERTISE A UNIVERSAL GUARANTEED
 * LIFESPAN" paragraph and the "avoid: Guaranteed for 12 months" note under it
 * are instructions, not copy; the section's own sentences are all here.
 */

import { BOOK_URL, CONTACT } from "@/lib/site";

export const SLUG = "mobile-car-wash/car-wax-service";
export const PATH = `/${SLUG}`;

/**
 * "CONVERSION TRACKING — Track: Book Valet + Wax Click, Wax Add-On Selected,
 * WhatsApp Click, Phone Click, Completed Booking With Wax". Every booking
 * button on the page fires `book`; WhatsApp and phone clicks are the shared
 * events `components/TrackClicks` already fires for any such link. "Wax
 * Add-On Selected" (the brief's `WAX_ADDON_SELECTED`) and "Completed Booking
 * With Wax" happen on book.medusaautodetailing.co.uk and have to be tracked
 * there.
 */
export const TRACK = { book: "book_valet_wax_click" } as const;

/**
 * "INTERNAL LINKING — This page should naturally link to: Car Valeting, Zeus
 * Full Valet, Medusa Gold Valet, Pre-Sale Valet, Machine Polishing,
 * Enhancement Detail, Ceramic Coating, Paint Correction, Regular Car
 * Cleaning". Medusa Gold has no page of its own — it is a package on
 * `/car-valeting`, in that page's tabs and table — so that is where it links,
 * as the odour page's does. "Regular Car Cleaning" is the menu's name for
 * `/car-lovers-club`. `locations` answers the local-SEO note: "link to
 * Medusa's genuine location/service-area pages where appropriate".
 */
export const LINKS = {
  valeting: "/car-valeting",
  preSale: "/car-valeting/pre-sale-valet",
  machinePolish: "/car-detailing/machine-polish",
  enhancement: "/car-detailing/enhancement-detail",
  ceramic: "/car-detailing/ceramic-coating",
  correction: "/car-detailing/paint-correction",
  regular: "/car-lovers-club",
  locations: "/our-locations",
} as const;

/**
 * The valets the wax can be added to. Section 15: "Possible cards: ZEUS FULL
 * VALET · MEDUSA GOLD VALET · OTHER ELIGIBLE EXTERIOR / FULL VALET … Do not
 * automatically list Triton Interior Valet if it does not include an exterior
 * wash." So Triton is not here, and neither is any valet the brief does not
 * name — the third card points at the valeting page as a whole.
 */
export const VALETS = {
  zeus: { name: "Zeus Full Valet", href: "/car-valeting/premium-full-valet" },
  gold: { name: "Medusa Gold Valet", href: "/car-valeting" },
} as const;

export type Photo = { src: string; alt: string; w: number; h: number };

/*
  The image-SEO table's filenames and alt text, on the photographs that fit
  them. All five are already the client's own: the wax application is cut from
  the June 2026 blog's "car wax protection" picture, clear of the headline and
  claims printed across its left half ("showroom shine", a UV badge — both on
  the brief's list of promises to drop) and of the branded tub on the right,
  which would have contradicted Section 10's Autoglym line; the technician at
  the wing is the old page's own photograph; the gloss, beading and finished
  car illustrate the site's 2026 paint-protection posts. None is captioned as
  a particular customer's car, and nothing has been retouched — "Do not
  artificially enhance reflections or water beading".

  The table's APPLICATION slot (car-wax-application.webp) is not filled: the
  one photograph of wax going on is the hero, and printing it twice would say
  nothing new. BEFORE / AFTER is not made (see above).
*/
export const PHOTOS = {
  /* A gloved hand working wax over a black bonnet with a foam applicator. */
  hero: {
    src: "/assets/2026/10/car-wax-service-london.webp",
    alt: "Professional mobile car wax service in London",
    w: 900,
    h: 600,
  },
  /* A technician finishing the paint by the headlight — the old page's own. */
  waxing: {
    src: "/assets/2026/10/professional-car-waxing-london.webp",
    alt: "Professional car waxing in London",
    w: 1650,
    h: 1275,
  },
  /* Reflections down the flank of a black saloon. */
  gloss: {
    src: "/assets/2026/10/car-wax-gloss-finish.webp",
    alt: "Glossy car paint after professional waxing",
    w: 1536,
    h: 1024,
  },
  /* Beads standing on a black bonnet. */
  beading: {
    src: "/assets/2026/10/waxed-car-water-beading.webp",
    alt: "Water beading on professionally waxed car paint",
    w: 1536,
    h: 1024,
  },
  /* A finished black saloon on a London street. */
  finished: {
    src: "/assets/2026/10/mobile-car-wax-london.webp",
    alt: "Mobile car waxing service completed in London",
    w: 1536,
    h: 1024,
  },
} satisfies Record<string, Photo>;

export type Item = { title: string; body: string };

export const WAX = {
  book: BOOK_URL,
  whatsapp: CONTACT.whatsapp,

  /* "SEO TITLE" (the first of the two; the second is an "ALTERNATIVE") and
     "META DESCRIPTION", as written. */
  seo: {
    title: "Car Wax Service London | Mobile Car Waxing From £40 | Medusa",
    description:
      "Professional mobile car waxing in London from £40 as an add-on to eligible Medusa valeting services. Enhance gloss and add paint protection at your home or workplace.",
  },

  /**
   * "MOST IMPORTANT SEO + CONVERSION POSITIONING — Customers should
   * immediately understand: CAR WAX STARTS FROM £40. IT IS AN ADD-ON TO AN
   * ELIGIBLE VALET. IT ADDS GLOSS & PROTECTION. IT IS NOT A STANDALONE £40
   * APPOINTMENT. IT DOES NOT REMOVE SCRATCHES OR CORRECT DAMAGED PAINT." With
   * the Elementor structure's first view — "CAR WAX SERVICE LONDON · FROM £40
   * · ADD-ON TO YOUR VALET · GLOSS • PROTECTION • PROFESSIONAL FINISH · [BOOK
   * VALET + WAX]" — they are one panel under the h1:
   *
   *   - the price, "From" over "+£40" over "Add-On to Your Valet". The plus is
   *     the brief's own notation for the add-on ("ALLOW: Car Wax +£40 / from
   *     £40"); it is what keeps the figure from reading as a £40 appointment;
   *   - the two limits, in the positioning list's words;
   *   - "GLOSS • PROTECTION • PROFESSIONAL FINISH", bold in the brief, which
   *     says what "It adds gloss & protection" says.
   */
  points: {
    price: { label: "From", value: "+£40", caption: "Add-On to Your Valet" },
    standalone: "It Is Not a Standalone £40 Appointment",
    scratches: "It Does Not Remove Scratches or Correct Damaged Paint",
    finish: ["Gloss", "Protection", "Professional Finish"],
  },

  /* ── Section 1 — Hero ────────────────────────────────────────────────── */
  hero: {
    /* "H1: Mobile Car Wax Service London … ONE H1 ONLY." */
    h1: "Mobile Car Wax Service London",
    title: "Add Premium Wax Protection & Gloss to Your Medusa Valet",
    question: "Want more gloss and additional paint protection after your car has been professionally cleaned?",
    intro: [
      "Upgrade your Medusa valet with our professional <strong>Car Wax Service</strong>, applied after the vehicle's exterior has been appropriately cleaned and prepared.",
      "Our premium wax treatment enhances the appearance of the paintwork while adding a protective layer to the exterior finish.",
    ],
    card: {
      price: "From £40",
      title: "Add-On to Eligible Medusa Valeting Services",
      ticks: [
        "Professional Wax Application",
        "Enhanced Paintwork Gloss",
        "Added Exterior Protection",
        "Applied After Your Valet",
        "Professional Mobile Service",
        "We Come to You Across London",
      ],
      important: "Important",
      note: "Car Wax is an add-on and cannot be booked as a standalone £40 mobile service.",
    },
    bookLabel: "Book a Valet + Add Wax",
    whatsappLabel: "WhatsApp Medusa",
  },

  /* ── Elementor 2 — Important add-on bar ──────────────────────────────── */
  addOnBar: {
    heading: "Car Wax Is an Add-On Service",
    body: "Choose an eligible Medusa valet first, then add premium wax from £40.",
  },

  /* ── Section 2 — Want more than just a clean car? ────────────────────── */
  benefits: {
    heading: "Want More Than Just a Clean Car?",
    title: "Add Protection After Your Valet",
    body: [
      "A professional valet removes the dirt and contamination sitting on your vehicle.",
      "Adding wax takes the exterior finish one step further.",
    ],
    lead: "After the appropriate exterior cleaning and preparation, wax is applied to suitable painted surfaces to enhance:",
    items: [
      { title: "Gloss", body: "Give the paintwork a richer, glossier appearance." },
      { title: "Paint Depth", body: "Help enhance the visual depth and finish of the paintwork." },
      {
        title: "Water Behaviour",
        body: "A freshly protected surface can provide improved water behaviour and beading.",
      },
      {
        title: "Protection",
        body: "Add a sacrificial protective layer between the vehicle's paintwork and everyday environmental exposure.",
      },
      { title: "Finish", body: "Complete your valet with a more refined exterior appearance." },
    ] as Item[],
    /* "ADD FROM £40". */
    price: { label: "Add From", value: "£40" },
    bookLabel: "Add Wax to My Valet",
  },

  /* ── Section 3 — How it works ────────────────────────────────────────── */
  how: {
    heading: "How It Works",
    title: "Three Simple Steps",
    /* The Elementor structure's "HOW IT WORKS — Visual: CHOOSE VALET ↓ CLEAN
       ↓ PREPARE ↓ WAX ↓ FINISH". A picture of the steps, not copy. */
    flow: ["Choose Valet", "Clean", "Prepare", "Wax", "Finish"],
    steps: [
      {
        title: "Choose Your Valet",
        body: "Select an eligible Medusa valeting service that includes the appropriate exterior cleaning.",
      },
      /* "Select: CAR WAX SERVICE — FROM £40 during booking." The option is
         set as the thing being selected. */
      { title: "Add Car Wax", before: "Select:", pick: "Car Wax Service — From £40", body: "during booking." },
      {
        title: "We Clean, Prepare & Wax",
        body: "Your vehicle receives the booked valeting service before the wax is applied to suitable exterior paintwork.",
      },
    ] as { title: string; before?: string; pick?: string; body: string }[],
    statement: "One Appointment. Cleaned + Protected.",
    bookLabel: "Book Your Valet",
  },

  /* ── Section 4 — What's included? ────────────────────────────────────── */
  included: {
    heading: "What's Included?",
    title: "Professional Car Wax Add-On",
    lead: "Your Car Wax Service includes:",
    items: [
      {
        title: "Paintwork Assessment",
        body: "We visually assess the condition of the exterior paintwork before application.",
      },
      {
        title: "Appropriate Paintwork Preparation",
        body: "The vehicle must first receive the appropriate exterior cleaning as part of the booked valet.",
      },
      {
        title: "Premium Wax Application",
        body: "A layer of premium automotive wax is carefully applied to suitable painted exterior surfaces.",
      },
      {
        title: "Buffing & Finishing",
        body: "The wax is appropriately worked and buffed to produce a clean, glossy finish.",
      },
      { title: "Final Inspection", body: "The exterior is visually inspected after application." },
    ] as Item[],
    price: { label: "From", value: "£40" },
    bookLabel: "Add to Your Valet",
  },

  /* ── Section 5 — Why wax after valeting? ─────────────────────────────── */
  afterValet: {
    heading: "Why Wax After Valeting?",
    title: "Protection Works Best on Properly Cleaned Paintwork",
    lead: "Wax should not simply be applied over a dirty vehicle.",
    body: [
      "Before protection is applied, the exterior needs to be appropriately cleaned.",
      "That's why Medusa offers the Car Wax Service as an <strong>add-on to an eligible valeting service</strong>, rather than treating £40 wax application as a standalone mobile appointment.",
    ],
    roles: ["The valet deals with the cleaning.", "The wax provides the finishing protection."],
    flow: ["Clean", "Prepare", "Wax", "Finish"],
    after: "This gives the wax a more appropriate surface for application and provides a more professional overall result.",
  },

  /* ── Section 6 — What does car wax do? ───────────────────────────────── */
  does: {
    heading: "What Does Car Wax Do?",
    title: "Gloss + Protection",
    lead: "Professional automotive wax creates a sacrificial layer over suitable exterior paintwork.",
    listLead: "This can help:",
    items: [
      {
        title: "Enhance Gloss",
        body: "Wax can give properly prepared paintwork a richer and more reflective appearance.",
      },
      {
        title: "Improve Water Behaviour",
        body: "Freshly waxed paint can display improved water beading and water behaviour.",
      },
      {
        title: "Add a Protective Layer",
        body: "Wax provides a sacrificial layer between the paintwork and everyday environmental contamination.",
      },
      {
        title: "Make Maintenance Easier",
        body: "A properly maintained protected surface can be easier to keep looking presentable between professional services.",
      },
      {
        title: "Enhance the Final Valet",
        body: "For customers who want more than a standard clean, wax provides an additional finishing stage.",
      },
    ] as Item[],
  },

  /* ── Section 7 — What car wax does not do ────────────────────────────── */
  doesNot: {
    heading: "What Car Wax Does Not Do",
    title: "Wax Is Protection — Not Paint Correction",
    lead: "This is an important distinction.",
    listLead: "Car wax does NOT remove:",
    list: [
      "Deep scratches",
      "Swirl marks",
      "Stone chips",
      "Paint oxidation",
      "Bird-dropping etching",
      "Water-spot etching",
      "Machine-polishing defects",
      "Clear-coat failure",
      "Paint damage",
      "Dents",
    ],
    after: "Wax may visually enhance the paintwork, but it does not permanently correct defects underneath it.",
    improve: {
      title: "Want Scratch & Swirl Improvement?",
      body: "Consider one of our paint-enhancement or machine-polishing services instead.",
      enhancementLabel: "View Enhancement Detail",
      polishingLabel: "View Machine Polishing",
    },
  },

  /* ── Section 8 — Car wax vs machine polishing ────────────────────────── */
  vsPolishing: {
    heading: "Car Wax vs Machine Polishing",
    title: "What's the Difference?",
    wax: {
      name: "Car Wax",
      lead: "Primarily adds:",
      strong: "Gloss + Protection",
      body: "Best for customers whose paintwork is already in suitable condition and who want to enhance and protect the finish after valeting.",
    },
    polishing: {
      name: "Machine Polishing",
      lead: "Designed to improve suitable paint defects such as:",
      list: ["Light swirl marks", "Haze", "Minor surface imperfections", "Reduced gloss"],
      after: "where safely correctable.",
    },
    rule: {
      title: "Simple Rule",
      rows: [
        { q: "Want Protection?", aHtml: "Add Wax." },
        {
          q: "Want Paint Defects Corrected?",
          aHtml: `Consider <a href="${LINKS.machinePolish}">Machine Polishing</a> / <a href="${LINKS.enhancement}">Paint Enhancement</a>.`,
        },
      ],
    },
  },

  /* ── Section 9 — Car wax vs ceramic coating ──────────────────────────── */
  vsCeramic: {
    heading: "Car Wax vs Ceramic Coating",
    title: "Which Protection Is Right for You?",
    wax: {
      name: "Car Wax",
      lead: "Ideal if you want:",
      list: [
        "Affordable protection",
        "Enhanced gloss",
        "An upgrade to your regular valet",
        "No major detailing appointment",
        "Traditional wax finish",
      ],
      price: "From £40 Add-On",
    },
    ceramic: {
      name: "Ceramic Coating",
      body: [
        "Better suited to customers looking for a more substantial professional paint-protection treatment with greater preparation requirements.",
        "Ceramic coating is a separate detailing service rather than a simple valeting add-on.",
      ],
      ctaLabel: "View Ceramic Coating",
    },
  },

  /* ── Section 10 — Premium wax ────────────────────────────────────────────
     "Where Autoglym HD Wax continues to be the product used by Medusa, this
     can be stated here" — the old page and the FAQ both say it is. "Do not
     make 'Autoglym' the H1 … The product supports the service": it is an h3
     here, under the section's own two headings. */
  product: {
    heading: "Premium Wax",
    title: "Professional Automotive Wax",
    body: "Medusa uses premium automotive wax products selected to enhance and protect suitable vehicle paintwork.",
    autoglym: {
      title: "Autoglym HD Wax",
      body: "Autoglym HD Wax is applied to suitable paintwork as part of the wax add-on.",
    },
  },

  /* ── Section 12 — How long does car wax last? ────────────────────────── */
  lasts: {
    heading: "How Long Does Car Wax Last?",
    title: "Wax Protection Isn't Permanent",
    lead: "The durability of automotive wax varies.",
    factorsLead: "How long the finish remains effective can depend on:",
    factors: [
      "Mileage",
      "Vehicle storage",
      "Weather exposure",
      "Washing frequency",
      "Washing products used",
      "Washing methods",
      "Road conditions",
      "Environmental contamination",
      "Condition of the paintwork",
    ],
    after: "A garaged vehicle driven occasionally may behave differently from a daily-driven vehicle parked outdoors.",
  },

  /* ── Section 13 — Maintaining your waxed car ─────────────────────────── */
  maintain: {
    heading: "Maintaining Your Waxed Car",
    title: "Help Your Protection Last Longer",
    lead: "After waxing, appropriate maintenance can help preserve the finish.",
    listLead: "We recommend:",
    items: [
      {
        title: "Regular Washing",
        body: "Avoid allowing heavy contamination to remain on the paintwork for extended periods.",
      },
      { title: "Appropriate Car-Cleaning Products", body: "Use products designed for automotive paintwork." },
      { title: "Avoid Aggressive Chemicals", body: "Strong cleaners can reduce the lifespan of wax protection." },
      {
        title: "Safe Washing Techniques",
        body: "Poor washing techniques can introduce swirl marks and other paint defects regardless of whether wax is present.",
      },
      {
        title: "Regular Medusa Maintenance",
        body: "Customers wanting ongoing vehicle care can use our regular mobile valeting services.",
      },
    ] as Item[],
    ctaLabel: "View Regular Car Cleaning",
  },

  /* ── Section 14 — Pricing ────────────────────────────────────────────── */
  pricing: {
    heading: "Pricing",
    title: "Car Wax Add-On",
    price: { label: "From", value: "£40" },
    /* The Elementor structure's "9 — FROM £40. Large pricing block. ADD-ON
       ONLY [CHOOSE MY VALET]". */
    addOnOnly: "Add-On Only",
    important: {
      title: "Important",
      bodyHtml: [
        "This price is for the <strong>wax add-on</strong>.",
        "It does NOT include the underlying valeting service.",
        "The customer must book an eligible Medusa valeting package.",
      ],
    },
    /* "EXAMPLE CUSTOMER JOURNEY: CHOOSE VALET + ADD CAR WAX FROM £40 =
       CLEANED + WAX-PROTECTED VEHICLE". The label is the brief's note on what
       follows; the sum is the copy. */
    journey: {
      base: "Choose Valet",
      addOn: "Add Car Wax From £40",
      result: "Cleaned + Wax-Protected Vehicle",
    },
    note: "Final add-on pricing may vary according to vehicle size and the specific service booked.",
    bookLabel: "Book a Valet + Wax",
    chooseLabel: "Choose My Valet",
  },

  /* ── Section 15 — Which valets can I add wax to? ─────────────────────── */
  valets: {
    heading: "Which Valets Can I Add Wax To?",
    title: "Upgrade Your Medusa Valet",
    items: ["zeus", "gold"] as (keyof typeof VALETS)[],
    viewLabel: "View Package",
    addLabel: "Add Wax",
    other: { name: "Other Eligible Exterior / Full Valet", ctaLabel: "View Valeting Services", href: LINKS.valeting },
    /* Under the brief's own IMPORTANT, after its note to the developer about
       Triton: the rule, as the customer needs it. */
    note: "The wax add-on requires an eligible service that includes appropriate exterior cleaning.",
  },

  /* ── Section 16 — Who is this add-on for? ────────────────────────────── */
  who: {
    heading: "Who Is This Add-On For?",
    title: "Add Car Wax If You Want:",
    items: [
      "More gloss after your valet",
      "Additional exterior paint protection",
      "Improved water behaviour",
      "A more refined finished appearance",
      "An affordable protection upgrade",
      "Protection without booking a complete ceramic-coating service",
      "Regular seasonal paint protection",
      "Extra presentation before selling your vehicle",
    ],
    bookLabel: "Add Wax to My Valet",
  },

  /* ── Section 17 — Pre-sale car waxing ────────────────────────────────── */
  preSale: {
    heading: "Pre-Sale Car Waxing",
    title: "Preparing Your Car for Sale?",
    lead: "Exterior presentation matters when photographing or showing a vehicle to potential buyers.",
    /* "This page should naturally link to: … Pre-Sale Valet" — on its name. */
    listLeadHtml: `Adding wax to an appropriate <a href="${LINKS.preSale}">Pre-Sale Valet</a> can enhance:`,
    list: ["Paint gloss", "Reflections", "Exterior presentation", "Overall finished appearance"],
    after: "For suitable vehicles, this can be a useful final protection and presentation step before advertising the car.",
    ctaLabel: "View Pre-Sale Valet",
  },

  /* ── Section 18 — Why choose Medusa? ─────────────────────────────────── */
  why: {
    heading: "Why Choose Medusa?",
    title: "Mobile Car Waxing Across London",
    items: [
      {
        title: "We Come to You",
        bodyHtml: `Your valet and wax treatment are completed at a suitable home or workplace within our <a href="${LINKS.locations}">London service area</a>.`,
      },
      { title: "Professional Application", bodyHtml: "The wax is applied as part of a structured valeting process." },
      {
        title: "Premium Products",
        bodyHtml: "We use professional automotive detailing products appropriate for the service.",
      },
      { title: "Convenient Add-On", bodyHtml: "Simply add wax when booking an eligible valet." },
      {
        title: "From £40",
        bodyHtml: "Upgrade your existing appointment without arranging a completely separate visit.",
      },
      {
        title: "Complete Vehicle Care",
        /* Paint Correction's link from the internal-linking list, with the
           other two services the sentence names. */
        bodyHtml: `Need more than wax? Medusa also provides <a href="${LINKS.enhancement}">paint enhancement</a>, <a href="${LINKS.correction}">correction</a> and <a href="${LINKS.ceramic}">ceramic protection</a> services.`,
      },
    ],
    bookLabel: "Book a Valet",
  },

  /* ── Section 19 — Customer reviews ───────────────────────────────────── */
  reviews: { heading: "Trusted By Car Owners Across London" },

  /* ── Section 20 — FAQ ────────────────────────────────────────────────── */
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "How much is the Medusa Car Wax Service?",
        a: [
          "Our professional Car Wax Service starts from <strong>£40 as an add-on to an eligible Medusa valeting service</strong>.",
          "The underlying valet is charged separately.",
        ],
      },
      {
        q: "Can I book the £40 Car Wax Service by itself?",
        a: [
          "No.",
          "The Car Wax Service is an add-on to eligible Medusa valeting services.",
          "This ensures the vehicle receives the appropriate exterior cleaning before the wax is applied.",
        ],
      },
      {
        q: "Why can't I book wax on its own?",
        a: [
          "Wax should be applied to appropriately cleaned paintwork.",
          "By combining the wax with an eligible valet, we can clean the exterior before applying the protection.",
        ],
      },
      {
        q: "What does car wax do?",
        a: [
          "Car wax enhances the appearance of suitable paintwork and provides a sacrificial protective layer over the exterior finish.",
        ],
      },
      {
        q: "Does car wax make the paint shinier?",
        a: [
          "Wax can enhance gloss and visual depth on properly cleaned and suitable paintwork.",
          "The final appearance also depends on the existing condition of the paint.",
        ],
      },
      {
        q: "Does wax remove scratches?",
        a: [
          "No.",
          "Wax is primarily a protection and finishing product.",
          "It does not remove deep scratches, stone chips or significant paint defects.",
          `For defect correction, consider our <a href="${LINKS.machinePolish}">machine-polishing</a> or <a href="${LINKS.correction}">paint-correction</a> services.`,
        ],
      },
      {
        q: "Does wax remove swirl marks?",
        a: [
          "No.",
          "Wax may visually enhance the finish, but it does not permanently remove swirl marks.",
          "Machine polishing is required to correct suitable paint defects.",
        ],
      },
      {
        q: "Does car wax protect against bird droppings?",
        a: [
          "Wax provides a sacrificial protective layer between the paintwork and environmental contamination.",
          "However, it does not make the vehicle immune to damage.",
          "Bird droppings should still be removed appropriately as soon as reasonably possible.",
        ],
      },
      {
        q: "Does wax prevent scratches?",
        a: ["No.", "Wax does not make vehicle paint scratch-proof."],
      },
      {
        q: "Is car wax permanent?",
        a: [
          "No.",
          "Automotive wax gradually degrades through washing, weather, mileage and environmental exposure.",
          "It requires periodic reapplication.",
        ],
      },
      {
        q: "How long does car wax last?",
        a: [
          "There is no universal guaranteed lifespan.",
          "Durability depends on the product, vehicle use, washing, storage, weather and environmental exposure.",
        ],
      },
      {
        q: "Will my car bead water after waxing?",
        a: [
          "Freshly waxed paint can display improved water behaviour and beading.",
          "The effect gradually reduces as the protective layer degrades.",
        ],
      },
      {
        q: "Do you use Autoglym wax?",
        a: [
          "Where applicable, Medusa uses Autoglym HD Wax for this service.",
          /* ASSEMBLED — the brief's answer goes on: "If the product used
             changes, the website should be updated rather than promising one
             particular brand indefinitely." That is an instruction to whoever
             maintains this page, not something a customer is told, so it is
             not printed. "Where applicable" already keeps the answer from
             promising the brand indefinitely. */
        ],
      },
      {
        q: "Is wax the same as ceramic coating?",
        a: [
          "No.",
          "Wax is a relatively straightforward protective add-on to valeting.",
          "Professional ceramic coating is a separate detailing service involving different preparation, application and protection characteristics.",
        ],
      },
      {
        q: "Should I choose wax or ceramic coating?",
        a: [
          "Wax is suitable for customers wanting an affordable protection and gloss upgrade alongside their valet.",
          `Customers seeking a more substantial professional paint-protection service should consider <a href="${LINKS.ceramic}">ceramic coating</a>.`,
        ],
      },
      {
        q: "Can I add wax to an interior-only valet?",
        a: [
          "Not by itself.",
          "The vehicle requires appropriate exterior cleaning before wax application.",
          "If your selected package is interior-only, you will need an eligible exterior service as well.",
        ],
      },
      {
        q: "Do you offer mobile car waxing in London?",
        a: [
          "Yes.",
          "The wax treatment is performed as part of an eligible Medusa mobile valeting appointment within our London service area.",
        ],
      },
    ],
  },

  /* ── Section 21 — Important service information ──────────────────────── */
  info: {
    heading: "Important Service Information",
    title: "Please Read Before Booking",
    items: [
      { title: "Add-On Only", body: "Car Wax cannot be booked as a standalone £40 mobile appointment." },
      {
        title: "Exterior Cleaning Required",
        body: "The vehicle must receive an appropriate exterior cleaning service before wax application.",
      },
      {
        title: "Wax Is Not Paint Correction",
        body: "Wax does not remove scratches, swirl marks, chips, etching or other significant paint defects.",
      },
      {
        title: "Existing Paint Condition",
        body: "The final appearance depends partly on the existing condition of the paintwork.",
      },
      { title: "Protection Is Not Permanent", body: "Wax naturally degrades over time." },
      {
        title: "No Damage-Proof Claims",
        body: "Wax does not make paint immune to:",
        list: [
          "Scratches",
          "Bird-dropping etching",
          "Tree sap",
          "Water spotting",
          "Stone chips",
          "Chemical damage",
          "Poor washing techniques",
        ],
      },
      {
        title: "Suitability",
        body: "Where the paintwork has significant deterioration or another condition affecting application, the technician may recommend a different service.",
      },
    ] as (Item & { list?: string[] })[],
  },

  /* ── Section 22 — Final CTA ──────────────────────────────────────────── */
  finalCta: {
    heading: "Add Gloss & Protection to Your Next Valet",
    body: ["Your car is already being professionally cleaned.", "Take the exterior finish one step further."],
    card: {
      title: "Professional Car Wax",
      price: "From £40",
      caption: "Add-On to Eligible Medusa Valeting Services",
      /* "CLEAN ↓ PREPARE ↓ WAX ↓ PROTECT", bold. */
      flow: ["Clean", "Prepare", "Wax", "Protect"],
    },
    bookLabel: "Book a Valet + Add Wax",
    whatsappLabel: "WhatsApp Medusa",
  },

  /* "MOBILE STICKY CTA — Use: BOOK VALET + WAX. Not: BOOK £40 WAX because we
     do not want customers thinking they can book a standalone £40
     appointment." */
  stickyLabel: "Book Valet + Wax",
};

/**
 * What `content/overrides.ts` needs to replace the mirror's page, so the card
 * `/mobile-car-wash` shows for it, the sitemap and the WebPage node all read
 * the brief rather than the old "Autoglym HD Wax" page.
 *
 *   - `intro` leaves out the hero's question, so the card's blurb (the first
 *     paragraph of 60 characters or more) is the sentence that says what the
 *     service is.
 *   - `price` is "From +£40", which `lib/hub.ts` reads as an add-on — never
 *     "From £40", which would sell it as an entry price.
 *   - `breadcrumbName` is the menu's own label. The mirror's tail is
 *     "Autoglym", which is what every Read More pointing here would otherwise
 *     be named, and the brief's point is that the product is not the service.
 */
export const REBUILD = {
  slug: SLUG,
  mirrorH1: "Autoglym HD Wax",
  title: WAX.seo.title,
  description: WAX.seo.description,
  h1: WAX.hero.h1,
  og: PHOTOS.hero,
  intro: WAX.hero.intro,
  price: "From +£40" as string | undefined,
  why: {
    heading: WAX.why.heading,
    items: WAX.why.items.map((it) => ({ title: it.title, body: it.bodyHtml.replace(/<[^>]+>/g, "") })),
  },
  faq: WAX.faq,
  breadcrumbName: "Car Wax Service",
};
