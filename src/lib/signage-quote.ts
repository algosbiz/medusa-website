/**
 * The vehicle signage removal quote form on
 * /commercial-valeting/car-van-stickers-removal.
 *
 * Client, 2026-10-06: "WEBSITE DEVELOPER: BUILD THE FOLLOWING FORM." Every
 * heading, label, option, acknowledgement and conditional question below is
 * the brief's own, in its order. Like the WHEELUV™ form (`lib/wheel-check.ts`)
 * it is a module of its own rather than one of `pages.json`'s CF7 forms,
 * because it needs what a CF7 form never had — multi-select groups, radio
 * groups, questions that only appear after a "Yes", several photographs in
 * one field, two required confirmations — and because it loads in the
 * browser as well as on the server: `validateQuote` runs on both, so a missed
 * answer is flagged before any photograph is uploaded, and a tampered
 * submission is held to the same rules.
 *
 * The brief's "FORM ADMIN / BACK-END REQUIREMENTS" are `quoteEmail` and
 * `quoteSubject` at the foot: the subject line it spells out, the sixteen
 * things the email is to show in the order it lists them, the telephone
 * number as a link, and the lead source.
 */

export const QUOTE_FORM_ID = "signage-removal-quote";

/** "Store the lead source/page as: Vehicle Signage Removal Page". */
export const LEAD_SOURCE = "Vehicle Signage Removal Page";

/** A question that is only asked when an earlier answer says so. */
type ShowIf = { name: string; equals: string };

export type QuoteField =
  | {
      kind: "text" | "tel" | "email" | "number";
      name: string;
      label: string;
      required?: boolean;
      autoComplete?: string;
      /** The brief's "Example: Ford" under a label. */
      placeholder?: string;
      /** Set beside the label of a field the brief marks "Optional". */
      optional?: boolean;
      showIf?: ShowIf;
    }
  | { kind: "textarea"; name: string; label: string; hint?: string }
  | { kind: "select"; name: string; label: string; options: string[]; required?: boolean }
  | { kind: "radio"; name: string; label: string; options: string[]; required?: boolean; showIf?: ShowIf }
  /** A group of checkboxes, any number of which may be ticked. */
  | { kind: "multi"; name: string; label: string; options: string[]; required?: boolean }
  /** One statement to confirm. */
  | { kind: "confirm"; name: string; label: string; required?: boolean }
  | { kind: "photos"; name: string; label: string; required?: boolean };

export type QuoteGroup = {
  title: string;
  /** Under the title, where the brief writes one. */
  note?: string;
  fields: QuoteField[];
};

/* "Please upload: 1. … 4. …" — shown with the photo field, and the reason
   the field takes several files at once. */
export const PHOTO_GUIDE = {
  lead: "Please upload:",
  items: [
    "Photo of the complete vehicle",
    "Clear photos showing all signage requiring removal",
    "Close-up photos of the vinyl/stickers",
    "Photos of any damaged, cracked or peeling areas",
  ],
  recommended: "Recommended: minimum 3 photographs.",
};

export const PRIVACY_LINK = { label: "Privacy Policy", href: "/privacy-policy-cookies" };

const ACKNOWLEDGEMENT =
  "I understand that Medusa Auto Detailing cannot guarantee the condition or colour of the paintwork underneath existing signage, vinyl, stickers or wraps. I understand that fading, ghosting, colour differences, adhesive residue, existing defects or weaknesses in previously repaired/repainted paintwork may become visible during or after removal.";

const CONSENT = "I agree that Medusa Auto Detailing may contact me regarding this quotation.";

/** "Select all that apply." — the brief's own words for its third group; the
    other two say "Allow multiple selections", which is addressed to us. */
const SELECT_ALL = "Select all that apply.";

export const QUOTE_FORM: { submit: string; groups: QuoteGroup[] } = {
  submit: "GET MY QUOTE",
  groups: [
    {
      title: "Contact Details",
      fields: [
        { kind: "text", name: "fullName", label: "Full Name", required: true, autoComplete: "name" },
        { kind: "tel", name: "mobile", label: "Mobile Number", required: true, autoComplete: "tel" },
        { kind: "email", name: "email", label: "Email Address", required: true, autoComplete: "email" },
        { kind: "text", name: "postcode", label: "Postcode", required: true, autoComplete: "postal-code" },
      ],
    },
    {
      title: "Vehicle Details",
      fields: [
        { kind: "text", name: "make", label: "Vehicle Make", required: true, placeholder: "Example: Ford" },
        { kind: "text", name: "model", label: "Vehicle Model", required: true, placeholder: "Example: Transit Custom" },
        { kind: "text", name: "registration", label: "Vehicle Registration", optional: true },
        {
          kind: "select",
          name: "vehicleType",
          label: "Vehicle Type",
          required: true,
          options: ["Car", "Small Van", "Medium Van", "Large Van", "Pickup", "Commercial Vehicle", "Other"],
        },
      ],
    },
    {
      title: "What Do You Need Removed?",
      note: SELECT_ALL,
      fields: [
        {
          kind: "multi",
          name: "removal",
          label: "What Do You Need Removed?",
          required: true,
          options: [
            "Company signage / branding",
            "Vinyl lettering",
            "Business logo",
            "Stickers",
            "Decals",
            "Partial vehicle wrap",
            "Full vehicle wrap",
            "Window graphics",
            "Adhesive residue",
            "Other",
          ],
        },
      ],
    },
    {
      title: "Where Is the Signage?",
      note: SELECT_ALL,
      fields: [
        {
          kind: "multi",
          name: "locations",
          label: "Where Is the Signage?",
          required: true,
          options: [
            "Bonnet",
            "Front wings",
            "Front doors",
            "Rear doors",
            "Rear quarter panels",
            "Roof",
            "Tailgate / boot",
            "Windows",
            "Multiple areas",
            "Most of the vehicle",
            "Other",
          ],
        },
      ],
    },
    {
      title: "Approximately How Much of the Vehicle Is Covered?",
      fields: [
        {
          kind: "radio",
          name: "coverage",
          label: "Approximately How Much of the Vehicle Is Covered?",
          required: true,
          options: [
            "Small amount — a few stickers/logos",
            "Partial — several panels",
            "Approximately half the vehicle",
            "Majority of vehicle",
            "Full/near-full wrap",
            "Not sure",
          ],
        },
      ],
    },
    {
      title: "Approximately How Old Is the Signage?",
      fields: [
        {
          kind: "select",
          name: "age",
          label: "Approximately How Old Is the Signage?",
          options: ["Less than 1 year", "1–2 years", "2–3 years", "3–5 years", "More than 5 years", "Unknown"],
        },
      ],
    },
    {
      title: "Do You Know If Any of the Affected Panels Have Been Repainted?",
      fields: [
        {
          kind: "radio",
          name: "repainted",
          label: "Do You Know If Any of the Affected Panels Have Been Repainted?",
          required: true,
          options: ["Yes", "No", "Not sure"],
        },
        /* The brief's "If YES:". Unstarred there, so optional here. */
        {
          kind: "text",
          name: "repaintedPanels",
          label: "Please tell us which panels",
          showIf: { name: "repainted", equals: "Yes" },
        },
      ],
    },
    {
      title: "Current Condition of the Vinyl",
      note: SELECT_ALL,
      fields: [
        {
          kind: "multi",
          name: "condition",
          label: "Current Condition of the Vinyl",
          options: [
            "Good condition",
            "Faded",
            "Cracked",
            "Peeling",
            "Brittle",
            "Adhesive visible",
            "Previous removal attempted",
            "Not sure",
          ],
        },
      ],
    },
    {
      title: "Photos",
      fields: [{ kind: "photos", name: "photos", label: "Upload Photos", required: true }],
    },
    {
      title: "Additional Information",
      fields: [
        {
          kind: "textarea",
          name: "notes",
          label: "Tell us anything else we should know",
          hint: 'Examples: "When we need it completed", "vehicle is being returned to lease company", "we have 6 identical vans", etc.',
        },
      ],
    },
    {
      title: "Optional Services",
      fields: [
        {
          kind: "radio",
          name: "polishing",
          label: "Would you like a quote for machine polishing after the signage is removed?",
          options: ["Yes", "No", "Please advise if you think it's needed"],
        },
      ],
    },
    {
      title: "Multiple Vehicles",
      fields: [
        {
          kind: "radio",
          name: "multiple",
          label: "Is this enquiry for more than one vehicle?",
          options: ["Yes", "No"],
        },
        /* "IF YES — conditional field". */
        {
          kind: "number",
          name: "vehicleCount",
          label: "How many vehicles?",
          showIf: { name: "multiple", equals: "Yes" },
        },
        {
          kind: "radio",
          name: "similarBranding",
          label: "Are the vehicles similarly branded?",
          options: ["Yes", "No", "Mixed fleet"],
          showIf: { name: "multiple", equals: "Yes" },
        },
      ],
    },
    {
      title: "Required Acknowledgement",
      /* "This checkbox must be mandatory before the form can be submitted." */
      fields: [{ kind: "confirm", name: "acknowledgement", label: ACKNOWLEDGEMENT, required: true }],
    },
    {
      title: "Privacy",
      /* Not marked mandatory in the brief, but required here: a quotation
         request the business may not reply to is not one. */
      fields: [{ kind: "confirm", name: "privacy", label: CONSENT, required: true }],
    },
  ],
};

export const QUOTE_FIELDS: QuoteField[] = QUOTE_FORM.groups.flatMap((g) => g.fields);

/* ── Photographs ──────────────────────────────────────────────────────── */

/** How many photographs one enquiry may carry. */
export const MAX_PHOTOS = 10;

/**
 * Every photograph together has to fit the 4 MB `serverActions.bodySizeLimit`
 * in `next.config.ts`, with room for the rest of the form. The browser shrinks
 * each picture first (`lib/photo-shrink.ts`), so this only binds on a file it
 * could not decode — a HEIC on a desktop browser, say.
 */
export const PHOTO_BUDGET = 3.6 * 1024 * 1024;

/** "Allow JPG, JPEG, PNG, HEIC and WebP if technically supported." */
export const PHOTO_ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif";

/**
 * Whether a file is one of the brief's five formats. By type, or by name for
 * the browsers that report a HEIC with no type at all.
 */
export const isAcceptedPhoto = (file: { name: string; type: string }) =>
  /^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type) || /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name);

/* ── Validation ───────────────────────────────────────────────────────── */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Whether a question is being asked, given the answers so far. */
export function isShown(field: QuoteField, read: (name: string) => string): boolean {
  return !("showIf" in field) || !field.showIf || read(field.showIf.name) === field.showIf.equals;
}

/**
 * Checks every answer the form can hold. `read` returns what was entered for
 * a name, trimmed, or "" for nothing — a ticked confirmation reads "yes";
 * `readAll` returns every ticked option of a multi-select group.
 *
 * Returns the errors and the answers, both keyed by field name, with a
 * multi-select's options joined in the form's own order. The photographs are
 * the caller's: they are files, and a browser and a server handle a file
 * differently.
 */
export function validateQuote(read: (name: string) => string, readAll: (name: string) => string[]) {
  const errors: Record<string, string> = {};
  const answers: Record<string, string> = {};

  for (const field of QUOTE_FIELDS) {
    if (field.kind === "photos" || !isShown(field, read)) continue;

    if (field.kind === "multi") {
      const picked = readAll(field.name);
      if (picked.some((v) => !field.options.includes(v))) {
        errors[field.name] = "Please choose from the options.";
      } else if (!picked.length) {
        if (field.required) errors[field.name] = "Please choose at least one.";
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
    if (field.kind === "number" && !/^\d{1,4}$/.test(value)) {
      errors[field.name] = "Enter a number of vehicles.";
      continue;
    }
    answers[field.name] = field.name === "postcode" ? value.toUpperCase() : value;
  }

  return { errors, answers };
}

/* ── The email ────────────────────────────────────────────────────────── */

/** "NEW SIGNAGE REMOVAL QUOTE — [VEHICLE MAKE] [VEHICLE MODEL] — [POSTCODE]". */
export function quoteSubject(answers: Record<string, string>): string {
  const vehicle = [answers.make, answers.model].filter(Boolean).join(" ");
  return `NEW SIGNAGE REMOVAL QUOTE — ${vehicle || "Vehicle not given"} — ${answers.postcode || "Postcode not given"}`;
}

/**
 * The email's lines, in the order the brief lists them — "Customer name,
 * Telephone, Email, Postcode, Vehicle, Registration, Type of signage, …,
 * Uploaded photos" — then the two confirmations, so the inbox holds what the
 * customer agreed to. A question left unanswered is left out.
 *
 * `links` makes the telephone number and the email address tappable: "Make
 * the telephone number clickable on mobile."
 */
export function quoteEmail(answers: Record<string, string>, photos: string) {
  const fields: Record<string, string> = {};
  const put = (label: string, value: string | undefined) => {
    if (value) fields[label] = value;
  };

  const vehicle = [answers.make, answers.model].filter(Boolean).join(" ");
  const repainted =
    answers.repainted === "Yes" && answers.repaintedPanels
      ? `Yes — ${answers.repaintedPanels}`
      : answers.repainted;
  const count =
    answers.multiple === "Yes"
      ? `${answers.vehicleCount || "More than one"}${
          answers.similarBranding ? ` (similarly branded: ${answers.similarBranding})` : ""
        }`
      : answers.multiple === "No"
        ? "1"
        : undefined;

  put("Customer name", answers.fullName);
  put("Telephone", answers.mobile);
  put("Email", answers.email);
  put("Postcode", answers.postcode);
  put("Vehicle", [vehicle, answers.vehicleType].filter(Boolean).join(" — "));
  put("Registration", answers.registration?.toUpperCase());
  put("Type of signage", answers.removal);
  put("Signage locations", answers.locations);
  put("Percentage covered", answers.coverage);
  put("Approximate signage age", answers.age);
  put("Repainted panels", repainted);
  put("Vinyl condition", answers.condition);
  put("Number of vehicles", count);
  put("Machine polishing interest", answers.polishing);
  put("Additional notes", answers.notes);
  put("Uploaded photos", photos);
  put("Required acknowledgement", answers.acknowledgement && `Confirmed: ${ACKNOWLEDGEMENT}`);
  put("Privacy", answers.privacy && `Confirmed: ${CONSENT}`);

  const links: Record<string, string> = {};
  if (answers.mobile) links.Telephone = `tel:${answers.mobile.replace(/[^\d+]/g, "")}`;
  if (answers.email) links.Email = `mailto:${answers.email}`;

  return { fields, links };
}
