/**
 * Content for /car-detailing/alloy-wheel-protection.
 *
 * **Every sentence here is the client's own**, transcribed from the brief they
 * sent on 2026-10-06 ("Webite changes .pdf", 47 pages): "Completely rebuild
 * the existing Alloy Wheel Cleaning page. The existing page is NOT an
 * alloy-wheel-cleaning service. It is a WHEELUV™ ALLOY WHEEL PROTECTOR
 * INSTALLATION SERVICE." Its section copy, FAQ, form and SEO strings are used
 * as written — straight apostrophes and all. What the brief addressed to the
 * developer ("WEBSITE DEVELOPER: …", "Use naturally", the image-SEO table) is
 * not copy and is not on the page; it decided the layout instead.
 *
 * Three answers are assembled rather than transcribed, each because the brief
 * asks a question of the developer instead of answering it, and each out of a
 * sentence the brief itself supplies. They are marked `ASSEMBLED` below, so a
 * reviewer can find every one:
 *
 *   - "Does £159 include fitting?" — the brief's answer is a note to confirm
 *     it. Its own Section 18 does: "Price includes the WHEELUV™ protector set
 *     and professional installation…", which is the answer used.
 *   - "Is there a guarantee?" — "The current Medusa page states a 1-year
 *     product guarantee", and "Any product guarantee must NOT be described as
 *     a guarantee that your alloy wheels cannot be damaged. Those are two
 *     completely different things." The answer is those two facts.
 *   - The colour names. "Display current available colours using actual
 *     product photographs" — the old page carried five, one photograph each,
 *     and its add-on cards say "Available in 5 colours". WHEELUV's own launch
 *     material names them Silver, Black, Anthracite, Red and Blue, which is
 *     what the five photographs show.
 *
 * Nothing from the old page survives. Its copy made the claims the brief
 * names as the ones to remove — "Won't damage your wheels", "Reduce or
 * eliminate damage" — so the page is the brief's, end to end. The five
 * product photographs and the three installation photographs are the old
 * page's own, under the filenames and alt text the brief's image-SEO table
 * asks for (`public/assets/2026/10/`).
 */

import { BOOK_URL, CONTACT } from "@/lib/site";

export const SLUG = "car-detailing/alloy-wheel-protection";
export const PATH = `/${SLUG}`;

/** The form's anchor. Every "Check my wheels" on the page goes here. */
export const FORM_ANCHOR = "check-my-wheels";

export type Photo = { src: string; alt: string; w: number; h: number };

/* The image-SEO table's filenames and alt text, on the photographs that fit
   them. "Use genuine Medusa installation images wherever possible": these
   three are the installations the old page's gallery carried. The table also
   names an installation-in-progress shot, a finished wheel and a before &
   after — none of which exists yet, so none is faked. */
export const PHOTOS = {
  hero: {
    src: "/assets/2026/10/alloy-wheel-protection-london.webp",
    alt: "WHEELUV alloy wheel protection professionally installed in London",
    w: 600,
    h: 400,
  },
  closeUp: {
    src: "/assets/2026/10/alloy-wheel-rim-protector.webp",
    alt: "Alloy wheel rim protector fitted to car wheel",
    w: 600,
    h: 400,
  },
  diamondCut: {
    src: "/assets/2026/10/diamond-cut-alloy-wheel-protection.webp",
    alt: "Wheel rim protection fitted to diamond cut alloy wheel",
    w: 600,
    h: 400,
  },
  /* The header's backdrop, decorative (rendered with an empty alt). None of
     the installation photos is large enough to fill the band, so this is the
     2560px detailing photograph `/car-detailing/perfection-detail` and the
     built detailing location pages already carry: a black car in a dark
     studio, multi-spoke wheels forward. It makes no claim about WHEELUV. */
  backdrop: {
    src: "/assets/2020/10/pexels-jae-park-4141962-scaled.webp",
    alt: "",
    w: 2560,
    h: 1920,
  },
} satisfies Record<string, Photo>;

export const AWP = {
  book: BOOK_URL,
  phone: CONTACT.phone,

  seo: {
    title: "Alloy Wheel Protection London | WHEELUV™ Installers | Medusa",
    description:
      "Professional alloy wheel protection in London with WHEELUV™ wheel rim protectors. Help reduce kerb damage with specialist installation from Medusa. £159.",
  },

  /* ── Section 1 — Hero ────────────────────────────────────────────────── */
  hero: {
    h1: "Alloy Wheel Protection London",
    subtitle: "Professionally Installed WHEELUV™ Alloy Wheel Protectors",
    intro: [
      "Help reduce the risk of kerb damage to your alloy-wheel rims with professionally installed WHEELUV™ wheel protectors from Medusa Auto Detailing.",
      "Designed to sit discreetly around the outer edge of suitable alloy wheels, WHEELUV™ provides a sacrificial layer between the wheel rim and light, low-speed kerb contact.",
    ],
    /* The Elementor structure's hero line: "KERB PROTECTION • DISCREET FIT •
       PROFESSIONAL INSTALLATION". */
    strap: ["Kerb Protection", "Discreet Fit", "Professional Installation"],
    offer: {
      name: "WHEELUV™ Alloy Wheel Protector Set",
      price: "£159",
      note: "Professional Installation",
      ticks: [
        "Helps Reduce the Risk of Kerb Damage",
        "Discreet Wheel-Rim Protection",
        "Professionally Installed",
        "Suitable for Many Alloy Wheels",
        "Compatible With Run-Flat Tyres",
        "Tyre-Change Compatible",
        "Available in Multiple Finishes/Colours Where Applicable",
      ],
    },
    bookLabel: "Book Alloy Wheel Protection — £159",
    checkLabel: "Check My Wheels",
    important:
      "Alloy wheel protectors reduce the risk of certain types of rim damage but cannot guarantee that your wheels will not be damaged during an impact.",
  },

  /* ── Section 2 — What are alloy wheel protectors? ────────────────────── */
  whatAre: {
    heading: "What Are Alloy Wheel Protectors?",
    title: "A Sacrificial Barrier for the Edge of Your Wheels",
    lead: "Alloy wheels are one of the easiest parts of a vehicle to accidentally damage.",
    misjudgementLead: "A small misjudgement while:",
    misjudgements: [
      "Parallel parking",
      "Entering a tight parking space",
      "Driving close to a kerb",
      "Navigating narrow roads",
      "Manoeuvring in car parks",
    ],
    misjudgementTail: "can leave expensive wheels with visible kerb damage.",
    body: [
      "WHEELUV™ alloy wheel protectors are fitted around the outer rim of suitable wheels.",
      "They are designed to help absorb or reduce damage from light, non-sustained, low-speed contact with kerbs.",
      "Instead of leaving the outer wheel edge completely exposed, the protector provides an additional sacrificial barrier.",
    ],
    priceLine: "Professional Installation — £159",
    bookLabel: "Book Now",
  },

  /* ── Section 3 — Why protect your alloy wheels? ──────────────────────── */
  whyProtect: {
    heading: "Why Protect Your Alloy Wheels?",
    title: "Help Keep Your Wheels Looking Better",
    intro: [
      "Modern alloy wheels can be expensive to refurbish or replace.",
      "This is particularly relevant for:",
    ],
    items: [
      {
        title: "Diamond-Cut Alloys",
        body: "Even relatively small areas of kerb damage can significantly affect their appearance.",
      },
      {
        title: "Large Alloy Wheels",
        body: "Larger wheel designs can leave the rim particularly exposed.",
      },
      {
        title: "Low-Profile Tyres",
        body: "Less tyre sidewall can mean less natural protection around the wheel edge.",
      },
      {
        title: "Premium Vehicles",
        body: "Wheel condition can have a noticeable effect on the overall appearance of a well-maintained vehicle.",
      },
      {
        title: "Lease & Finance Vehicles",
        body: "Avoiding unnecessary wheel damage can help keep a vehicle better presented throughout ownership.",
      },
      {
        title: "New Cars",
        body: "Protecting wheels before they become damaged makes more sense than waiting until after they require refurbishment.",
      },
    ],
  },

  /* ── Section 4 — How wheel rim protection works ──────────────────────── */
  howItWorks: {
    heading: "How Wheel Rim Protection Works",
    title: "Protection Where Kerb Damage Commonly Happens",
    body: [
      "WHEELUV™ is installed around the outer edge of the alloy wheel.",
      "The protector is designed to provide a barrier between the exposed rim and certain low-speed kerb impacts.",
    ],
    /* The brief's own diagram, top to bottom. "Do not create a misleading
       diagram suggesting the wheel can never contact the kerb" — so it is
       drawn as the brief wrote it, three labels in order, and nothing more. */
    layers: ["Wheel", "WHEELUV™ Protector", "Kerb"],
    after:
      "Rather than the alloy rim necessarily taking the initial contact directly, the sacrificial protector can help reduce the risk or severity of damage in suitable low-speed situations.",
    important: [
      "The protector itself can become marked, damaged or detached during an impact.",
      "That is part of the sacrificial nature of the product.",
      "A damaged protector may require replacement.",
    ],
  },

  /* ── Section 5 — WHEELUV™ alloy wheel protection ─────────────────────── */
  installedByMedusa: {
    heading: "WHEELUV™ Alloy Wheel Protection",
    title: "Professionally Installed by Medusa",
    intro: "Medusa Auto Detailing installs WHEELUV™ wheel-rim protection on suitable vehicles.",
    lead: "The protectors are designed to:",
    ticks: [
      "Fit cleanly around suitable alloy-wheel rims",
      "Help reduce damage from certain light, low-speed kerb impacts",
      "Maintain a discreet appearance",
      "Add an optional visual styling element",
      "Work without being inserted between the wheel and tyre",
      "Remain compatible with tyre changes",
      "Work with run-flat tyres",
    ],
    closing:
      "The system uses automotive-grade adhesive installation rather than being inserted between the tyre and wheel.",
  },

  /* ── Section 13 — Run-flat tyres ─────────────────────────────────────── */
  runFlat: {
    heading: "Run-Flat Tyres",
    title: "Compatible With Run-Flat Tyres",
    body: [
      "WHEELUV™ is designed so that the protector does not need to sit between the tyre and wheel.",
      "This means the system can be suitable for vehicles fitted with run-flat tyres, subject to wheel suitability.",
    ],
    cta: "Check Compatibility",
  },

  /* ── Section 14 — Tyre changes ───────────────────────────────────────── */
  tyreChanges: {
    heading: "Tyre Changes",
    title: "What Happens When I Need New Tyres?",
    body: [
      "The design is intended to remain compatible with tyre-changing procedures because the protector is not installed between the tyre bead and wheel.",
      "As with any wheel accessory, tell the tyre technician that wheel protectors are fitted before work begins.",
    ],
  },

  /* ── Section 6 — Professional installation ───────────────────────────── */
  installation: {
    heading: "Professional Installation",
    title: "Why Have Wheel Protectors Professionally Fitted?",
    intro: ["Correct preparation and installation are important.", "A typical installation involves:"],
    /* The Elementor structure's name for each step: "ASSESS ↓ PREPARE ↓ FIT
       ↓ FINISH ↓ INSPECT". */
    flow: ["Assess", "Prepare", "Fit", "Finish", "Inspect"],
    steps: [
      {
        label: "Step 1",
        title: "Wheel Assessment",
        body: ["We assess the wheels for suitability.", "This includes looking at:"],
        list: [
          "Wheel design",
          "Rim profile",
          "Existing damage",
          "Wheel condition",
          "Contamination",
          "Previous repairs where visible",
        ],
      },
      {
        label: "Step 2",
        title: "Preparation",
        body: [
          "The relevant wheel-rim area is appropriately cleaned and prepared before installation.",
          "Proper preparation is important for adhesion.",
        ],
      },
      {
        label: "Step 3",
        title: "Measurement & Fitment",
        body: ["The protector is carefully fitted around the suitable outer wheel rim."],
      },
      {
        label: "Step 4",
        title: "Finishing",
        body: ["The protector is trimmed and finished appropriately."],
      },
      {
        label: "Step 5",
        title: "Final Inspection",
        body: ["The installation is visually inspected before completion."],
      },
    ] as { label: string; title: string; body: string[]; list?: string[] }[],
  },

  /* ── Section 9 — Diamond-cut alloy wheel protection ──────────────────── */
  diamondCut: {
    heading: "Diamond-Cut Alloy Wheel Protection",
    title: "Help Protect Vulnerable Wheel Edges",
    body: [
      "Diamond-cut alloy wheels can look fantastic, but visible rim damage can quickly spoil their appearance.",
      "WHEELUV™ can be particularly attractive to owners of suitable diamond-cut wheels who want an additional layer of protection around the exposed rim.",
    ],
    important: [
      "The protector does not repair existing diamond-cut wheel damage.",
      "If the wheel is already significantly damaged, refurbishment may be required before installation.",
    ],
    cta: "Check My Wheels",
  },

  /* ── Section 7 — What does WHEELUV™ help protect against? ────────────── */
  protects: {
    heading: "What Does WHEELUV™ Help Protect Against?",
    title: "Designed Primarily for Low-Speed Kerb Contact",
    lead: "WHEELUV™ is designed to help reduce the risk of wheel damage from:",
    ticks: [
      "Light kerb contact",
      "Parking-related rim contact",
      "Certain low-speed impacts",
      "Minor wheel-edge contact",
    ],
    note: "The protection is concentrated around the area physically covered by the protector.",
  },

  /* ── Section 8 — What does it not protect against? ───────────────────── */
  notProtect: {
    heading: "What Does It Not Protect Against?",
    title: "Alloy Wheel Protectors Do Not Make Wheels Damage-Proof",
    emphasis: "This is extremely important.",
    lead: "WHEELUV™ is NOT designed to guarantee protection against:",
    crosses: [
      "High-speed impacts",
      "Pothole damage",
      "Severe kerb impacts",
      "Prolonged grinding against a kerb",
      "Collision damage",
      "Damage outside the protected rim area",
      "Cracked wheels",
      "Buckled wheels",
      "Tyre damage",
      "Structural wheel damage",
      "Every possible form of kerb damage",
    ],
    callout: "The product reduces risk — it does not eliminate it.",
    after: [
      "The protector is sacrificial.",
      "During an impact, the protector itself may become damaged or may require replacement.",
    ],
  },

  /* ── Section 12 — Colour & appearance ────────────────────────────────── */
  colour: {
    heading: "Colour & Appearance",
    title: "Protection Without Ruining the Look of Your Wheels",
    body: [
      "Wheel protection doesn't have to dominate the appearance of the vehicle.",
      "WHEELUV™ is designed to sit around the wheel rim with a clean, discreet appearance.",
      "Where available, customers can choose an appropriate colour/finish to either:",
    ],
    /* The brief's two choices, each over the photographs that show it: the
       three finishes that match the wheel they are on, and the two that do
       not. Grouping only — every photograph and both captions are the
       client's. */
    choices: [
      {
        label: "Blend In",
        body: "Choose a subtle finish that complements the wheel.",
        colours: ["Silver", "Black", "Anthracite"],
      },
      {
        label: "Stand Out",
        body: "Use the protector as a styling detail.",
        colours: ["Red", "Blue"],
      },
    ],
  },

  /* ── Section 18 — Price ──────────────────────────────────────────────── */
  price: {
    heading: "Price",
    name: "WHEELUV™ Alloy Wheel Protector Set",
    price: "£159",
    /* "If £159 has different conditions, retain: £159 PER SET and clearly
       display the exact inclusions." Nothing on the site or in the brief
       confirms it is four wheels, so the brief's own fallback stands. The
       stronger "£159 PER SET OF 4 WHEELS — FITTED" is one string away when
       the client confirms it. */
    unit: "Per Set",
    note: "Professional Installation",
    inclusions:
      "Price includes the WHEELUV™ protector set and professional installation on a suitable standard vehicle/set of wheels, subject to compatibility.",
    bookLabel: "Book Wheel Protection — £159",
  },

  /* ── Section 10 — New car alloy wheel protection ─────────────────────── */
  newCar: {
    heading: "New Car Alloy Wheel Protection",
    title: "Protect Them Before They Get Kerbed",
    lead: "One of the best times to consider alloy-wheel protectors is when the wheels are still in excellent condition.",
    idealLead: "Ideal for:",
    ideal: [
      "New vehicles",
      "Recently purchased vehicles",
      "Newly refurbished wheels",
      "Premium cars",
      "Lease vehicles",
      "Performance vehicles",
      "Daily-driven vehicles",
    ],
    closing: "Rather than waiting until the wheels are damaged, add protection from the beginning.",
    complementLead: "This service can also complement a Medusa:",
    complements: [
      { label: "New Car Protection Detail", href: "/car-detailing/new-car-protection" },
      { label: "Ceramic Coating Package", href: "/car-detailing/ceramic-coating" },
    ],
    cta: { label: "View New Car Protection", href: "/car-detailing/new-car-protection" },
  },

  /* ── Section 15 — Installation gallery ───────────────────────────────── */
  gallery: {
    heading: "Installation Gallery",
    title: "See WHEELUV™ Installed",
    photos: [PHOTOS.hero, PHOTOS.diamondCut, PHOTOS.closeUp],
    /* The old page's own film, kept because "many customers will not know
       what a rim protector is" and this shows one being fitted. */
    video: {
      src: "https://www.youtube-nocookie.com/embed/pHEp9KCPEsw",
      title: "WHEELUV ALLOY PROTECTION",
    },
    bookLabel: "Book Installation",
  },

  /* ── Section 20 — Why choose Medusa? ─────────────────────────────────── */
  whyMedusa: {
    heading: "Why Choose Medusa?",
    title: "Professional Alloy Wheel Protector Installation London",
    items: [
      { title: "Specialist Installation", body: "WHEELUV™ professionally fitted to suitable alloy wheels." },
      { title: "£159", body: "Clear package pricing." },
      {
        title: "Mobile Service",
        body: "Installation available at suitable locations within our London service area.",
      },
      {
        title: "Premium Vehicle Experience",
        body: "Medusa regularly works with premium, performance and everyday vehicles.",
      },
      { title: "Suitability Assessment", body: "Unsure about your wheels? Send us photographs first." },
      {
        title: "Complete Vehicle Protection",
        /* "Link naturally to: … Ceramic Coating … Paint Protection" — the
           words are the brief's; the two links are the brief's internal-
           linking list landing on the words that name those services. */
        bodyHtml:
          'Combine wheel protection with Medusa <a href="/car-detailing/ceramic-coating">paint</a>, <a href="/car-detailing/windscreen-protection">glass</a> and vehicle-protection services.',
      },
    ] as { title: string; body?: string; bodyHtml?: string }[],
    bookLabel: "Book Now",
  },

  /* ── Sections 11, 16, 17 — before you book ───────────────────────────── */
  existingDamage: {
    heading: "Existing Wheel Damage",
    title: "Tell Us About Existing Damage",
    lead: "Before installation, we need to know if the wheel rim has:",
    list: [
      "Heavy kerbing",
      "Missing material",
      "Significant corrosion",
      "Peeling lacquer",
      "Cracks",
      "Buckling",
      "Recent refurbishment",
      "Other substantial damage",
    ],
    after: [
      "Minor cosmetic damage may not necessarily prevent installation.",
      "However, significantly damaged surfaces may not provide an appropriate installation surface.",
    ],
    notSure: "Not Sure?",
    notSureBody: "Send us photographs first.",
    cta: "Upload Wheel Photos",
  },

  refurbished: {
    heading: "Recently Refurbished Wheels",
    title: "Had Your Wheels Refurbished?",
    lead: [
      "Tell us before installation.",
      "The coating/finish should be appropriately cured before adhesive wheel protection is installed.",
      "Where wheels have very recently been:",
    ],
    list: ["Powder coated", "Painted", "Diamond cut", "Refurbished"],
    after:
      "we may recommend waiting until the finish has appropriately cured according to the relevant repairer's/product requirements.",
  },

  hideDamage: {
    heading: "Can Wheel Protectors Hide Existing Kerb Damage?",
    title: "Minor Existing Rim Marks",
    lead: "Depending on the location and severity, the protector may visually cover certain minor marks around the wheel rim.",
    however: "However:",
    callout: "WHEELUV™ is not an alloy-wheel refurbishment service.",
    repairLead: "It does not repair:",
    list: [
      "Gouges",
      "Cracks",
      "Buckles",
      "Severe kerb damage",
      "Corrosion",
      "Lacquer failure",
      "Diamond-cut deterioration",
      "Structural damage",
    ],
    after: "If your wheels require repair, refurbishment should be considered separately.",
  },

  /* ── Section 19 — Suitability check ──────────────────────────────────── */
  suitability: {
    heading: "Suitability Check",
    title: "Will WHEELUV™ Fit My Wheels?",
    lead: [
      "Not every wheel design or condition should automatically be assumed suitable.",
      "Customers who are unsure can send us:",
    ],
    send: [
      "Full Wheel Photo",
      "Close-Up of the Rim Edge",
      "Vehicle Make & Model",
      "Wheel Size",
      "Photos of Existing Kerb Damage",
    ],
    after: "We can assess visible suitability before arranging installation.",
  },

  /* ── Section 21 — FAQ ────────────────────────────────────────────────── */
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "What are alloy wheel protectors?",
        a: [
          "Alloy wheel protectors are fitted around the outer rim of suitable alloy wheels to provide a sacrificial barrier against certain types of light kerb contact.",
        ],
      },
      {
        q: "How much is WHEELUV™ alloy wheel protection?",
        a: [
          "Medusa's WHEELUV™ Alloy Wheel Protector Set is currently £159, subject to wheel suitability and the exact package conditions shown at booking.",
        ],
      },
      {
        /* ASSEMBLED — the brief's Section 18, verbatim, under its own question. */
        q: "Does £159 include fitting?",
        a: [
          "Yes. Price includes the WHEELUV™ protector set and professional installation on a suitable standard vehicle/set of wheels, subject to compatibility.",
        ],
      },
      {
        q: "Do alloy wheel protectors stop kerb damage?",
        a: [
          "They can help reduce the risk or severity of certain light, non-sustained, low-speed kerb impacts.",
          "They do not make the wheel damage-proof and cannot guarantee that kerb damage will never occur.",
        ],
      },
      {
        q: "Can the protector get damaged?",
        a: [
          "Yes.",
          "The protector is sacrificial and may itself become damaged during an impact.",
          "A damaged section/set may need replacement.",
        ],
      },
      {
        q: "Will they protect against hitting a kerb at speed?",
        a: ["They are not designed to protect against severe, high-speed or prolonged impacts."],
      },
      {
        q: "Do they protect the entire wheel?",
        a: [
          "No.",
          "Protection is concentrated around the area physically covered by the wheel-rim protector.",
        ],
      },
      {
        q: "Can you fit them to diamond-cut wheels?",
        a: [
          "WHEELUV™ can be suitable for many diamond-cut alloy wheels, subject to the wheel design and condition.",
          "Send us photographs if you're unsure.",
        ],
      },
      {
        q: "Do alloy wheel protectors work with run-flat tyres?",
        a: [
          "WHEELUV™ is designed to work with run-flat tyres because the protector does not need to be inserted between the wheel and tyre.",
          "Suitability still depends on the wheel.",
        ],
      },
      {
        q: "Can tyres still be changed?",
        a: [
          "The WHEELUV™ design is intended to remain compatible with tyre changes.",
          "Tell your tyre fitter that protectors are installed before work begins.",
        ],
      },
      {
        q: "Do wheel protectors affect tyre pressure?",
        a: [
          "The WHEELUV™ system does not sit between the tyre bead and wheel, so it is not designed to interfere with tyre pressure in the way an inserted system potentially could.",
        ],
      },
      {
        q: "Do wheel protectors affect wheel balancing?",
        a: [
          "The product is designed for installation without adversely affecting normal wheel operation when correctly fitted.",
          "If you experience vibration or another wheel-related issue, have the vehicle appropriately inspected rather than assuming the protector is or is not the cause.",
        ],
      },
      {
        q: "Can you install them over kerb damage?",
        a: [
          "This depends on the condition and location of the damage.",
          "Minor cosmetic marks may be suitable.",
          "Significantly damaged, corroded or structurally compromised wheels may need repair first.",
          "Send photographs for assessment.",
        ],
      },
      {
        q: "Do alloy wheel protectors repair damaged wheels?",
        a: ["No.", "They are a protective accessory, not an alloy-wheel refurbishment service."],
      },
      {
        q: "Can you install them on freshly refurbished wheels?",
        a: [
          "Potentially, but the new wheel finish should be appropriately cured before adhesive installation.",
          "Tell us when the refurbishment was completed.",
        ],
      },
      {
        q: "Can I choose a colour?",
        a: [
          "Where multiple current WHEELUV™ colour options are available, customers can select from the finishes Medusa currently stocks/supplies.",
        ],
      },
      {
        q: "Do you provide mobile installation in London?",
        a: [
          "Yes, subject to wheel suitability and a suitable working location within Medusa's London service area.",
        ],
      },
      {
        /* ASSEMBLED — the old page's "backed with a 1-year guarantee", and the
           brief's own line that a product guarantee is not a wheel guarantee. */
        q: "Is there a guarantee?",
        a: [
          "WHEELUV™ is backed by a 1-year product guarantee.",
          "That is a guarantee on the product. It is not a guarantee that your alloy wheels cannot be damaged — those are two completely different things.",
        ],
      },
    ],
  },

  /* ── Section 22 — Important service information ──────────────────────── */
  important: {
    heading: "Important Service Information",
    title: "Please Read Before Booking",
    items: [
      {
        title: "Wheel Damage Cannot Be Guaranteed Against",
        body: "Wheel protectors reduce risk but cannot guarantee that an alloy wheel will never suffer damage.",
      },
      {
        title: "Sacrificial Product",
        body: "The protector may become damaged or detach during an impact and may require replacement.",
      },
      {
        title: "High-Energy Impacts",
        body: "The product is not intended to prevent damage from severe, high-speed or prolonged impacts.",
      },
      {
        title: "Coverage",
        body: "Only the area covered by the protector receives this form of protection.",
      },
      {
        title: "Existing Damage",
        body: "Wheel protectors do not repair existing alloy-wheel damage.",
      },
      {
        title: "Structural Damage",
        body: "Medusa does not diagnose or repair cracked, buckled or structurally damaged wheels as part of this installation.",
      },
      {
        title: "Suitability",
        body: "Installation remains subject to wheel design, size, condition and compatibility.",
      },
      {
        title: "Recent Refurbishment",
        body: "Customers must disclose recently refinished/refurbished wheels before installation.",
      },
    ],
  },

  /* ── Section 23 — Final CTA ──────────────────────────────────────────── */
  finalCta: {
    heading: "Help Protect Your Alloy Wheels Before They Get Kerbed",
    body: "Professional WHEELUV™ wheel-rim protector installation by Medusa Auto Detailing.",
    price: "£159",
    label: "Alloy Wheel Protection",
    flow: ["Assess", "Prepare", "Fit", "Finish", "Protect"],
    bookLabel: "Book Wheel Protection",
    checkLabel: "Check My Wheels",
  },
};

/**
 * The five finishes, one photograph each — see "The colour names" above.
 *
 * Cut from the old page's five product shots, which are transparent PNGs with
 * a colour picker baked in under the tyre. The picker is removed, the alpha
 * kept (flattened, the transparent pixels show the colour noise the encoder
 * left in them), and each wheel scaled to the same 640px on a 720px square so
 * the five sit on one line.
 */
export const COLOURS = [
  { name: "Silver", src: "/assets/2026/10/wheeluv-alloy-wheel-protector-silver.webp" },
  { name: "Black", src: "/assets/2026/10/wheeluv-alloy-wheel-protector-black.webp" },
  { name: "Anthracite", src: "/assets/2026/10/wheeluv-alloy-wheel-protector-anthracite.webp" },
  { name: "Red", src: "/assets/2026/10/wheeluv-alloy-wheel-protector-red.webp" },
  { name: "Blue", src: "/assets/2026/10/wheeluv-alloy-wheel-protector-blue.webp" },
].map((c) => ({
  ...c,
  alt: `WHEELUV alloy wheel protector in ${c.name.toLowerCase()} fitted to an alloy wheel`,
  w: 720,
  h: 720,
}));
