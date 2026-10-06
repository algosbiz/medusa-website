/**
 * The caravan & motorhome valeting quote form on /vehicles/caravan-cleaning.
 *
 * Client, 2026-10-06, Section 20: "WEBSITE DEVELOPER: Replace the current
 * basic form with the following." Every heading, label, option, example,
 * acknowledgement and conditional question below is the brief's own, in its
 * order. It replaces the Contact Form 7 form the old page carried, and like
 * the signage removal form (`lib/signage-quote.ts`) it is a module of its own
 * rather than one of `pages.json`'s CF7 forms, because it needs what a CF7
 * form never had: radio groups, a multi-select, questions that depend on an
 * earlier answer, several photographs in one field and a confirmation that
 * only appears for some answers. It loads in the browser as well as on the
 * server: `validateQuote` runs on both, so a missed answer is flagged before
 * any photograph is uploaded, and a tampered submission is held to the same
 * rules.
 *
 * Three questions depend on earlier answers:
 *
 *   - **"If Exterior Cleaning Is Required:"** — the exterior condition is
 *     asked unless the customer chose "Interior Only";
 *   - **"If Interior Cleaning Is Required:"** — the interior condition unless
 *     they chose "Exterior Only". Both are asked until a choice is made, and
 *     both for "Not Sure — Please Advise";
 *   - **"If customer selects odour/mould/damp: Display an additional required
 *     checkbox"** — on "Unwanted odour", "Smoke smell", "Mould/mildew" or
 *     "Damp/water damage". A smoke smell is an odour; the checkbox's own words
 *     are "complete or permanent odour/mould removal cannot be guaranteed".
 *
 * The brief's "QUOTE FORM BACK-END" is `quoteSubject` and `quoteEmail` at the
 * foot: the subject line it spells out, the things the email is to include in
 * the order it lists them, every uploaded photograph, and the telephone
 * number as a link.
 */

export const QUOTE_FORM_ID = "caravan-quote";

/** When a question is asked, given an earlier answer. */
type Condition =
  /** Asked unless the earlier answer is this one — including before it is given. */
  | { name: string; unless: string }
  /** Asked once any of these has been chosen. */
  | { name: string; anyOf: string[] };

export type QuoteField =
  | {
      kind: "text" | "tel" | "email";
      name: string;
      label: string;
      required?: boolean;
      autoComplete?: string;
      /** The brief's "Example: Swift, Bailey, Auto-Trail" under a label. */
      placeholder?: string;
      /** Set beside the label of a field the brief marks "Optional". */
      optional?: boolean;
    }
  | { kind: "textarea"; name: string; label: string; hint?: string }
  | { kind: "select"; name: string; label: string; options: string[]; required?: boolean }
  | { kind: "radio"; name: string; label: string; options: string[]; required?: boolean; when?: Condition }
  /** A group of checkboxes, any number of which may be ticked. */
  | { kind: "multi"; name: string; label: string; options: string[]; required?: boolean; hint?: string }
  /** One statement to confirm. */
  | { kind: "confirm"; name: string; label: string; required?: boolean; when?: Condition }
  | { kind: "photos"; name: string; label: string; required?: boolean };

export type QuoteGroup = {
  title: string;
  /** Under the title, where the brief writes one. */
  note?: string;
  fields: QuoteField[];
};

/* "PHOTOS — Upload Photos* … FOR EXTERIOR QUOTES: Please upload: 1. … FOR
   INTERIOR QUOTES: Please upload: 1. …". Each list is shown unless the
   service chosen leaves it out. */
export const PHOTO_GUIDES = [
  {
    title: "For Exterior Quotes:",
    lead: "Please upload:",
    items: ["Full front view", "Full rear view", "Left side", "Right side", "Close-ups of heavily affected areas"],
    when: { name: "cleaned", unless: "Interior Only" },
  },
  {
    title: "For Interior Quotes:",
    lead: "Please upload:",
    items: [
      "Main living area",
      "Seating/upholstery",
      "Floors/carpets",
      "Kitchen area",
      "Cab area where applicable",
      "Any stains/problem areas",
    ],
    when: { name: "cleaned", unless: "Exterior Only" },
  },
] satisfies { title: string; lead: string; items: string[]; when: Condition }[];

export const PRIVACY_LINK = { label: "Privacy Policy", href: "/privacy-policy-cookies" };

const ACKNOWLEDGEMENT =
  "I confirm that the photographs and information supplied reasonably represent the current condition of the caravan/motorhome. I understand that if the condition or work required is significantly different on arrival, Medusa Auto Detailing may need to revise the quotation before additional work is carried out.";

const DAMP_ACKNOWLEDGEMENT =
  "I understand that cleaning cannot repair underlying damp, water ingress, plumbing, ventilation or structural problems and that complete or permanent odour/mould removal cannot be guaranteed where the underlying source remains.";

const CONSENT = "I agree that Medusa Auto Detailing may contact me regarding this quotation.";

const NONE = "None of the above";

/** The specific issues that bring up the second acknowledgement. */
const ODOUR_MOULD_DAMP = ["Unwanted odour", "Smoke smell", "Mould/mildew", "Damp/water damage"];

export const QUOTE_FORM: { submit: string; groups: QuoteGroup[] } = {
  submit: "GET MY FREE QUOTE",
  groups: [
    {
      title: "Contact Details",
      fields: [
        { kind: "text", name: "fullName", label: "Full Name", required: true, autoComplete: "name" },
        { kind: "text", name: "company", label: "Company", optional: true, autoComplete: "organization" },
        { kind: "tel", name: "mobile", label: "Mobile Number", required: true, autoComplete: "tel" },
        { kind: "email", name: "email", label: "Email Address", required: true, autoComplete: "email" },
        {
          kind: "text",
          name: "postcode",
          label: "Postcode Where Vehicle Is Located",
          required: true,
          autoComplete: "postal-code",
        },
      ],
    },
    {
      title: "Vehicle Details",
      fields: [
        {
          kind: "select",
          name: "vehicleType",
          label: "What Type of Vehicle Do You Have?",
          required: true,
          options: [
            "Touring Caravan",
            "Motorhome",
            "Campervan",
            "Static Caravan",
            "RV / Large Recreational Vehicle",
            "Other",
          ],
        },
        /* Make and model carry no star and no "Optional" in the brief. */
        { kind: "text", name: "make", label: "Make", placeholder: "Example: Swift, Bailey, Auto-Trail" },
        { kind: "text", name: "model", label: "Model" },
        { kind: "text", name: "year", label: "Year", optional: true },
        {
          kind: "select",
          name: "length",
          label: "Approximate Length",
          required: true,
          options: ["Under 5 metres", "5–6 metres", "6–7 metres", "7–8 metres", "Over 8 metres", "Not sure"],
        },
      ],
    },
    {
      title: "Service Required",
      fields: [
        {
          kind: "radio",
          name: "cleaned",
          label: "What Would You Like Cleaned?",
          required: true,
          options: ["Exterior Only", "Interior Only", "Interior & Exterior", "Not Sure — Please Advise"],
        },
      ],
    },
    {
      title: "Exterior Condition",
      note: "If Exterior Cleaning Is Required:",
      fields: [
        {
          kind: "radio",
          name: "exteriorCondition",
          label: "How would you describe the exterior?",
          options: ["Light dirt", "Moderate dirt", "Heavily dirty", "Heavy organic growth / long-term storage", "Not sure"],
          when: { name: "cleaned", unless: "Interior Only" },
        },
      ],
    },
    {
      title: "Interior Condition",
      note: "If Interior Cleaning Is Required:",
      fields: [
        {
          kind: "radio",
          name: "interiorCondition",
          label: "How would you describe the interior?",
          options: [
            "Lightly used / generally clean",
            "Moderate cleaning required",
            "Heavily soiled",
            "Very heavily soiled / specialist attention required",
            "Not sure",
          ],
          when: { name: "cleaned", unless: "Exterior Only" },
        },
      ],
    },
    {
      title: "Specific Issues",
      fields: [
        {
          kind: "multi",
          name: "issues",
          label: "Does the vehicle have any of the following?",
          hint: "Select all that apply.",
          options: [
            "Pet hair",
            "Stains",
            "Food/drink spillages",
            "Unwanted odour",
            "Smoke smell",
            "Mould/mildew",
            "Damp/water damage",
            "Vomit/bodily-fluid contamination",
            "Heavy exterior organic growth",
            "Heavy grease/grime",
            NONE,
            "Other",
          ],
        },
      ],
    },
    {
      title: "Areas Requiring Attention",
      fields: [
        {
          kind: "textarea",
          name: "focus",
          label: "Tell Us What You Want Us to Focus On",
          hint: 'Example: "Caravan has been stored for 10 months and needs exterior cleaning plus carpets and upholstery cleaned."',
        },
      ],
    },
    {
      title: "Photos",
      /* "MAKE THIS MANDATORY. Allow multiple uploads." */
      fields: [{ kind: "photos", name: "photos", label: "Upload Photos", required: true }],
    },
    {
      title: "Location / Access",
      fields: [
        {
          kind: "radio",
          name: "located",
          label: "Where Is the Vehicle Located?",
          required: true,
          options: [
            "Private driveway/property",
            "Caravan storage facility",
            "Campsite",
            "Business premises",
            "Street",
            "Other",
          ],
        },
        {
          kind: "radio",
          name: "space",
          label: "Is There Sufficient Space Around the Vehicle for Our Team to Work?",
          required: true,
          options: ["Yes", "No", "Not sure"],
        },
        {
          kind: "radio",
          name: "parking",
          label: "Is Our Van Able to Park Close to the Caravan/Motorhome?",
          required: true,
          options: ["Yes", "No", "Not sure"],
        },
        { kind: "textarea", name: "restrictions", label: "Are There Any Height, width, parking or access restrictions?" },
      ],
    },
    {
      title: "Additional Information",
      fields: [{ kind: "textarea", name: "notes", label: "Anything Else We Should Know?" }],
    },
    {
      title: "Required Customer Acknowledgement",
      fields: [
        { kind: "confirm", name: "acknowledgement", label: ACKNOWLEDGEMENT, required: true },
        {
          kind: "confirm",
          name: "dampAcknowledgement",
          label: DAMP_ACKNOWLEDGEMENT,
          required: true,
          when: { name: "issues", anyOf: ODOUR_MOULD_DAMP },
        },
      ],
    },
    {
      title: "Privacy",
      /* Not starred in the brief, but required here, as on the signage
         form: a quotation request the business may not reply to is not one. */
      fields: [{ kind: "confirm", name: "privacy", label: CONSENT, required: true }],
    },
  ],
};

export const QUOTE_FIELDS: QuoteField[] = QUOTE_FORM.groups.flatMap((g) => g.fields);

/* ── Photographs ──────────────────────────────────────────────────────── */

/**
 * How many photographs one enquiry may carry. The brief's two lists ask for
 * eleven between them — five of the outside, six of the inside — so twelve.
 */
export const MAX_PHOTOS = 12;

/**
 * Every photograph together has to fit the 4 MB `serverActions.bodySizeLimit`
 * in `next.config.ts`, with room for the rest of the form. The browser shrinks
 * each picture first (`lib/photo-shrink.ts`), so this only binds on a file it
 * could not decode — a HEIC on a desktop browser, say.
 */
export const PHOTO_BUDGET = 3.6 * 1024 * 1024;

/** "Allow JPG, JPEG, PNG, HEIC and WebP where supported." */
export const PHOTO_ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif";

/**
 * Whether a file is one of the brief's five formats. By type, or by name for
 * the browsers that report a HEIC with no type at all.
 */
export const isAcceptedPhoto = (file: { name: string; type: string }) =>
  /^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type) || /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name);

/* ── Conditions ───────────────────────────────────────────────────────── */

/**
 * Whether a condition holds, given every answer so far: `readAll` returns the
 * ticked options of a multi-select, or the one chosen option of a radio group.
 */
export function holds(when: Condition | undefined, readAll: (name: string) => string[]): boolean {
  if (!when) return true;
  const picked = readAll(when.name);
  if ("unless" in when) return !picked.includes(when.unless);
  return picked.some((v) => when.anyOf.includes(v));
}

/** Whether a question is being asked, given the answers so far. */
export const isShown = (field: QuoteField, readAll: (name: string) => string[]) =>
  holds("when" in field ? field.when : undefined, readAll);

/* ── Validation ───────────────────────────────────────────────────────── */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Long enough for any real answer; short enough that nothing is a payload. */
const MAX_TEXT = 2000;

/**
 * Checks every answer the form can hold. `read` returns what was entered for
 * a name, trimmed, or "" for nothing — a ticked confirmation reads "yes";
 * `readAll` returns every ticked option of a multi-select group (and the one
 * chosen option of a radio group).
 *
 * Returns the errors and the answers, both keyed by field name, with a
 * multi-select's options joined in the form's own order. A question that is
 * not being asked is neither checked nor answered. The photographs are the
 * caller's: they are files, and a browser and a server handle a file
 * differently.
 */
export function validateQuote(read: (name: string) => string, readAll: (name: string) => string[]) {
  const errors: Record<string, string> = {};
  const answers: Record<string, string> = {};

  for (const field of QUOTE_FIELDS) {
    if (field.kind === "photos" || !isShown(field, readAll)) continue;

    if (field.kind === "multi") {
      const picked = readAll(field.name);
      if (picked.some((v) => !field.options.includes(v))) {
        errors[field.name] = "Please choose from the options.";
      } else if (!picked.length) {
        if (field.required) errors[field.name] = "Please choose at least one.";
      } else if (picked.includes(NONE) && picked.length > 1) {
        errors[field.name] = `"${NONE}" can't be chosen with another option.`;
      } else {
        answers[field.name] = field.options.filter((o) => picked.includes(o)).join(", ");
      }
      continue;
    }

    const value = read(field.name);

    if (field.kind === "confirm") {
      if (field.required && value !== "yes") errors[field.name] = "Please confirm to continue.";
      else if (value === "yes") answers[field.name] = "Confirmed";
      continue;
    }

    if (!value) {
      if ("required" in field && field.required) {
        errors[field.name] = field.kind === "radio" ? "Please choose one." : "This field is required.";
      }
      continue;
    }
    if (value.length > MAX_TEXT) {
      errors[field.name] = "That answer is too long.";
      continue;
    }
    if ((field.kind === "radio" || field.kind === "select") && !field.options.includes(value)) {
      errors[field.name] = "Please choose one of the options.";
      continue;
    }
    if (field.kind === "email" && !EMAIL.test(value)) {
      errors[field.name] = "Enter a valid email address.";
      continue;
    }
    if (field.kind === "tel" && value.replace(/\D/g, "").length < 7) {
      errors[field.name] = "Enter a valid phone number.";
      continue;
    }
    answers[field.name] = field.name === "postcode" ? value.toUpperCase() : value;
  }

  return { errors, answers };
}

/* ── The email ────────────────────────────────────────────────────────── */

/** "NEW CARAVAN QUOTE — [VEHICLE TYPE] — [POSTCODE]". */
export function quoteSubject(answers: Record<string, string>): string {
  return `NEW CARAVAN QUOTE — ${answers.vehicleType || "Vehicle type not given"} — ${
    answers.postcode || "Postcode not given"
  }`;
}

/**
 * The email's lines, in the order the brief lists them — "Customer name,
 * Phone, Email, Postcode, Vehicle type, Make/model, Approximate length,
 * Interior/exterior/both, Exterior condition, Interior condition, Specific
 * problems, Access information, Customer notes, All uploaded photos" — then
 * the confirmations, so the inbox holds what the customer agreed to. A
 * question left unanswered is left out.
 *
 * The company and the year are not on that list, but the form asks for both;
 * each sits beside the line it belongs with rather than being dropped.
 *
 * `links` makes the telephone number and the email address tappable: "Make
 * the telephone number clickable."
 */
export function quoteEmail(answers: Record<string, string>, photos: string) {
  const fields: Record<string, string> = {};
  const put = (label: string, value: string | undefined) => {
    if (value) fields[label] = value;
  };
  const labelOf = (name: string) => QUOTE_FIELDS.find((f) => f.name === name)?.label ?? name;
  /* Several answers under one heading, each after the question it answers —
     on one line for a choice, over a paragraph for something typed. */
  const lines = (names: string[], sep: string) =>
    names
      .filter((n) => answers[n])
      .map((n) => `${labelOf(n)}${sep}${answers[n]}`)
      .join(sep === "\n" ? "\n\n" : "\n");

  put("Customer name", answers.fullName);
  put("Company", answers.company);
  put("Phone", answers.mobile);
  put("Email", answers.email);
  put("Postcode", answers.postcode);
  put("Vehicle type", answers.vehicleType);
  put("Make/model", [answers.make, answers.model].filter(Boolean).join(" "));
  put("Year", answers.year);
  put("Approximate length", answers.length);
  put("Interior/exterior/both", answers.cleaned);
  put("Exterior condition", answers.exteriorCondition);
  put("Interior condition", answers.interiorCondition);
  put("Specific problems", answers.issues);
  put("Access information", [lines(["located", "space", "parking"], " "), lines(["restrictions"], "\n")]
    .filter(Boolean)
    .join("\n\n"));
  put("Customer notes", lines(["focus", "notes"], "\n"));
  put("Uploaded photos", photos);
  put("Required acknowledgement", answers.acknowledgement && `Confirmed: ${ACKNOWLEDGEMENT}`);
  put("Damp, mould & odour acknowledgement", answers.dampAcknowledgement && `Confirmed: ${DAMP_ACKNOWLEDGEMENT}`);
  put("Privacy", answers.privacy && `Confirmed: ${CONSENT}`);

  const links: Record<string, string> = {};
  if (answers.mobile) links.Phone = `tel:${answers.mobile.replace(/[^\d+]/g, "")}`;
  if (answers.email) links.Email = `mailto:${answers.email}`;

  return { fields, links };
}
