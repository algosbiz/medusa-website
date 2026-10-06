/**
 * The car interior paint spill removal quote form on
 * /repairs/car-interior-paint-spill-removal.
 *
 * Client, 2026-10-06: "DEDICATED QUOTE FORM — WEBSITE DEVELOPER: Do NOT use
 * the generic contact form. Create: CAR INTERIOR PAINT SPILL REMOVAL QUOTE.
 * Photos should be mandatory." Every heading, label, option, acknowledgement
 * and conditional question below is the brief's own, in its order. It is
 * built the way the signage removal quote form is (`lib/signage-quote.ts`):
 * a module that loads in the browser as well as on the server, so
 * `validateQuote` flags a missed answer before any photograph is uploaded,
 * and holds a tampered submission to the same rules.
 *
 * What it needs that the signage form did not is a second, single photograph
 * — "If YES: Upload a Photo of the Paint Label … This is extremely useful." —
 * so a photo field here carries its own `max`, and can be conditional.
 *
 * Three readings of the brief, for the lead and the client:
 *
 *   - "PLEASE EXPLAIN [TEXT AREA]" follows the "IF YES: What have you used?"
 *     list, and is asked with it — explain what was used, when something was.
 *   - The brief heads its three checkboxes "REQUIRED ACKNOWLEDGEMENT",
 *     "SECOND REQUIRED ACKNOWLEDGEMENT" and "THIRD ACKNOWLEDGEMENT". The
 *     headings are the developer's labels; the three sit under the first, and
 *     all three are required — the third is a statement "to the best of my
 *     knowledge", which anyone can make, and it is what lets the technician
 *     rely on the answer to "What have you used?".
 *   - "Vehicle Year" has no asterisk, so it is optional; every other
 *     unstarred question is too.
 *
 * The brief's "FORM BACK-END" is `quoteEmail` and `quoteSubject` at the foot:
 * the subject line it spells out, the sixteen things it says to include in
 * its order, and the telephone number as a link.
 */

export const QUOTE_FORM_ID = "paint-spill-quote";

/** A question that is only asked when an earlier answer says so. */
type ShowIf = { name: string; equals: string };

export type QuoteField =
  | {
      kind: "text" | "tel" | "email";
      name: string;
      label: string;
      required?: boolean;
      autoComplete?: string;
      inputMode?: "numeric";
    }
  | { kind: "textarea"; name: string; label: string; hint?: string; showIf?: ShowIf }
  | { kind: "select"; name: string; label: string; options: string[]; required?: boolean }
  | { kind: "radio"; name: string; label: string; options: string[]; required?: boolean }
  /** A group of checkboxes, any number of which may be ticked. */
  | { kind: "multi"; name: string; label: string; options: string[]; hint?: string; required?: boolean; showIf?: ShowIf }
  /** One statement to confirm. */
  | { kind: "confirm"; name: string; label: string; required?: boolean }
  | {
      kind: "photos";
      name: string;
      label: string;
      /** How many photographs the field takes. */
      max: number;
      required?: boolean;
      hint?: string;
      showIf?: ShowIf;
    };

export type QuoteGroup = { title: string; fields: QuoteField[] };

/** "Select all that apply:" — the brief's own words over both multi-selects. */
const SELECT_ALL = "Select all that apply:";

const ACK_RESULT =
  "I understand that Medusa Auto Detailing will make every reasonable effort to treat the paint spill, but complete removal cannot be guaranteed. I understand that paint may permanently stain or damage interior materials or penetrate into areas that cannot be completely accessed through cleaning.";
const ACK_PAYMENT =
  "I understand that payment is for the professional cleaning/treatment carried out and is not conditional upon complete removal of the paint, staining or resulting damage.";
const ACK_DISCLOSED =
  "I confirm that I have disclosed, to the best of my knowledge, any products or chemicals already used on the affected area.";

/**
 * "Upload Photos* … Please upload: PHOTO 1 … PHOTO 5". Shown beside the
 * photo field, and the reason it takes several files at once.
 */
export const PHOTO_GUIDE = {
  lead: "Please upload:",
  items: [
    "Entire affected area from a distance.",
    "Close-up of the paint.",
    "Second angle.",
    "Any additional area the paint has transferred to.",
    "Paint container/label where available.",
  ],
};

/** How many photographs the main field takes — the brief's five, and room. */
export const MAX_PHOTOS = 8;

export const QUOTE_FORM: { title: string; submit: string; groups: QuoteGroup[] } = {
  title: "Car Interior Paint Spill Removal Quote",
  submit: "Get My Paint Spill Quote",
  groups: [
    {
      title: "Contact Details",
      fields: [
        { kind: "text", name: "fullName", label: "Full Name", required: true, autoComplete: "name" },
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
        { kind: "text", name: "make", label: "Vehicle Make", required: true },
        { kind: "text", name: "model", label: "Vehicle Model", required: true },
        { kind: "text", name: "registration", label: "Registration", required: true },
        { kind: "text", name: "year", label: "Vehicle Year", inputMode: "numeric" },
      ],
    },
    {
      title: "Paint Spill Details",
      fields: [
        {
          kind: "select",
          name: "paintType",
          label: "What type of paint was spilled?",
          required: true,
          options: [
            "Water-based paint",
            "Emulsion",
            "Acrylic",
            "Gloss paint",
            "Solvent-based paint",
            "Primer",
            "Wood paint/coating",
            "Other",
            "Unknown",
          ],
        },
      ],
    },
    {
      title: "Product Information",
      fields: [
        {
          kind: "radio",
          name: "tin",
          label: "Do you still have the paint tin/container?",
          required: true,
          options: ["Yes", "No"],
        },
        /* "If YES:" — unstarred, so optional. */
        {
          kind: "photos",
          name: "labelPhoto",
          label: "Upload a Photo of the Paint Label",
          max: 1,
          hint: "This is extremely useful.",
          showIf: { name: "tin", equals: "Yes" },
        },
      ],
    },
    {
      title: "When Did the Spill Happen?",
      fields: [
        {
          kind: "radio",
          name: "when",
          label: "When was the paint spilled?",
          required: true,
          options: [
            "Within the last few hours",
            "Today",
            "Yesterday",
            "2–3 days ago",
            "4–7 days ago",
            "More than one week ago",
            "Unknown",
          ],
        },
      ],
    },
    {
      title: "Current Condition",
      fields: [
        {
          kind: "radio",
          name: "condition",
          label: "Is the paint currently:",
          required: true,
          options: ["Wet", "Partially dried", "Completely dried", "Combination", "Not sure"],
        },
      ],
    },
    {
      title: "Amount Spilled",
      fields: [
        {
          kind: "radio",
          name: "amount",
          label: "Approximately how much paint spilled?",
          required: true,
          options: [
            "A few drops/small marks",
            "Small spill",
            "Moderate spill",
            "Large spill",
            "Most/all of a paint tin",
            "Unknown",
          ],
        },
      ],
    },
    {
      title: "Affected Areas",
      fields: [
        {
          kind: "multi",
          name: "areas",
          label: "Where is the paint?",
          hint: SELECT_ALL,
          required: true,
          options: [
            "Boot carpet",
            "Boot side trim",
            "Spare-wheel/storage area",
            "Interior carpet",
            "Floor mat",
            "Fabric seat",
            "Leather seat",
            "Door card",
            "Interior plastic",
            "Centre console",
            "Headliner",
            "Seat belt",
            "Multiple areas",
            "Other",
          ],
        },
      ],
    },
    {
      title: "Has It Penetrated Beneath the Surface?",
      fields: [
        {
          kind: "radio",
          name: "penetrated",
          label: "As far as you know, has the paint soaked through carpet/upholstery?",
          required: true,
          options: ["Yes", "No", "Not sure"],
        },
      ],
    },
    {
      title: "Previous Cleaning Attempts",
      fields: [
        {
          kind: "radio",
          name: "cleaned",
          label: "Have you tried to clean it already?",
          required: true,
          options: ["No", "Yes"],
        },
        /* "IF YES:" */
        {
          kind: "multi",
          name: "used",
          label: "What have you used?",
          hint: SELECT_ALL,
          showIf: { name: "cleaned", equals: "Yes" },
          options: [
            "Water",
            "Soap/car shampoo",
            "Interior cleaner",
            "Steam cleaner",
            "Paint thinner",
            "White spirit",
            "Acetone",
            "Alcohol",
            "Other solvent",
            "Scraper/tool",
            "Brush",
            "Other",
          ],
        },
        { kind: "textarea", name: "explain", label: "Please Explain", showIf: { name: "cleaned", equals: "Yes" } },
      ],
    },
    {
      title: "Photo Upload",
      fields: [{ kind: "photos", name: "photos", label: "Upload Photos", max: MAX_PHOTOS, required: true }],
    },
    {
      title: "Additional Information",
      fields: [
        {
          kind: "textarea",
          name: "notes",
          label: "Tell Us What Happened",
          hint: 'Example: "5-litre tin of white emulsion tipped over in the boot approximately two hours ago. Some has soaked into the boot carpet."',
        },
      ],
    },
    {
      title: "Required Acknowledgement",
      fields: [
        { kind: "confirm", name: "ackResult", label: ACK_RESULT, required: true },
        { kind: "confirm", name: "ackPayment", label: ACK_PAYMENT, required: true },
        { kind: "confirm", name: "ackDisclosed", label: ACK_DISCLOSED, required: true },
      ],
    },
  ],
};

export const QUOTE_FIELDS: QuoteField[] = QUOTE_FORM.groups.flatMap((g) => g.fields);

/* ── Photographs ──────────────────────────────────────────────────────── */

/**
 * Every photograph together — the main field and the label — has to fit the
 * 4 MB `serverActions.bodySizeLimit` in `next.config.ts`, with room for the
 * rest of the form. The browser shrinks each picture first
 * (`lib/photo-shrink.ts`), so this only binds on a file it could not decode:
 * a HEIC on a desktop browser, which is sent as it is.
 */
export const PHOTO_BUDGET = 3.6 * 1024 * 1024;

/** "Support: JPG, JPEG, PNG, HEIC, WebP where possible." */
export const PHOTO_ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif";

/**
 * Whether a file is one of the brief's five formats. By type, or by name for
 * the browsers that report a HEIC with no type at all — an iPhone's photo
 * picker in some browsers.
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
        errors[field.name] =
          field.kind === "radio" || field.kind === "select" ? "Please choose one." : "This field is required.";
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
    answers[field.name] = field.name === "postcode" || field.name === "registration" ? value.toUpperCase() : value;
  }

  return { errors, answers };
}

/* ── The email ────────────────────────────────────────────────────────── */

/** "URGENT PAINT SPILL QUOTE — [VEHICLE MAKE] [MODEL] — [POSTCODE]". */
export function quoteSubject(answers: Record<string, string>): string {
  const vehicle = [answers.make, answers.model].filter(Boolean).join(" ");
  return `URGENT PAINT SPILL QUOTE — ${vehicle || "Vehicle not given"} — ${answers.postcode || "Postcode not given"}`;
}

/**
 * The email's lines, in the order the brief's "Include:" lists them —
 * "Customer name, Phone, Email, Postcode, Vehicle make/model, Registration,
 * Paint type, Paint age, Wet/dry condition, Amount spilled, Areas affected,
 * Penetration information, Previous cleaning attempts, Customer description,
 * ALL uploaded photographs, Paint-label photograph" — under the brief's own
 * names for them, then the three acknowledgements, so the inbox holds what
 * the customer agreed to. The vehicle's year rides with its make and model,
 * and whether the tin was kept with the label photograph.
 *
 * `links` makes the telephone number and the address tappable: "Make the
 * telephone number clickable."
 */
export function quoteEmail(answers: Record<string, string>, photos: string[], label: string[]) {
  const fields: Record<string, string> = {};
  const put = (name: string, value: string | undefined) => {
    if (value) fields[name] = value;
  };

  const vehicle = [answers.make, answers.model].filter(Boolean).join(" ");
  const cleaned =
    answers.cleaned === "Yes"
      ? [`Yes — ${answers.used || "nothing ticked"}`, answers.explain && `Explanation: ${answers.explain}`]
          .filter(Boolean)
          .join("\n")
      : answers.cleaned;
  const tin =
    answers.tin === "Yes"
      ? label.length
        ? `Paint tin/container kept — label photo attached:\n${label.join("\n")}`
        : "Paint tin/container kept — no label photo sent"
      : answers.tin === "No"
        ? "No — the paint tin/container was not kept"
        : undefined;

  put("Customer name", answers.fullName);
  put("Phone", answers.mobile);
  put("Email", answers.email);
  put("Postcode", answers.postcode);
  put("Vehicle make/model", answers.year ? `${vehicle} (${answers.year})` : vehicle);
  put("Registration", answers.registration);
  put("Paint type", answers.paintType);
  put("Paint age", answers.when);
  put("Wet/dry condition", answers.condition);
  put("Amount spilled", answers.amount);
  put("Areas affected", answers.areas);
  put("Penetration information", answers.penetrated && `Soaked through carpet/upholstery: ${answers.penetrated}`);
  put("Previous cleaning attempts", cleaned);
  put("Customer description", answers.notes);
  put("Uploaded photographs", photos.length ? `${photos.length} attached:\n${photos.join("\n")}` : undefined);
  put("Paint-label photograph", tin);
  put("Required acknowledgement", answers.ackResult && `Confirmed: ${ACK_RESULT}`);
  put("Second required acknowledgement", answers.ackPayment && `Confirmed: ${ACK_PAYMENT}`);
  put("Third acknowledgement", answers.ackDisclosed && `Confirmed: ${ACK_DISCLOSED}`);

  const links: Record<string, string> = {};
  if (answers.mobile) links.Phone = `tel:${answers.mobile.replace(/[^\d+]/g, "")}`;
  if (answers.email) links.Email = `mailto:${answers.email}`;

  return { fields, links };
}
