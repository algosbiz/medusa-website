/**
 * The car graffiti removal quote form on /repairs/car-graffiti-removal.
 *
 * Client, 2026-10-06: "This page should NOT use the standard generic contact
 * form. Create a dedicated: CAR GRAFFITI REMOVAL QUOTE. Photos should be
 * mandatory." Every group heading, question, option, conditional question and
 * acknowledgement below is the brief's own, in its order. It is built the way
 * the signage removal quote form is (`lib/signage-quote.ts`), and for the same
 * reasons: multi-select groups, questions asked only after a "Yes", several
 * photographs in one field and two confirmations are more than a CF7 form ever
 * held, and `validateQuote` runs in the browser as well as on the server — a
 * missed answer is flagged before a photograph is uploaded, and a tampered
 * submission is held to the same rules.
 *
 * Two readings of the brief, both on the side of asking:
 *
 *   - **Both acknowledgements are required.** The first is headed "REQUIRED
 *     CUSTOMER ACKNOWLEDGEMENT"; the second, "SECOND ACKNOWLEDGEMENT", follows
 *     it as its pair — a confirmation of what the customer has disclosed is no
 *     confirmation if it can be left unticked.
 *   - **The "If YES" questions are optional.** The brief stars the question
 *     that asks them and not the questions themselves.
 *
 * The brief's "FORM BACK-END" is `quoteSubject` and `quoteEmail` at the foot:
 * the subject line it spells out, the seventeen things the email is to include
 * in the order it lists them, and the telephone number as a link.
 */

export const QUOTE_FORM_ID = "graffiti-removal-quote";

/** A question that is only asked when an earlier answer says so. */
type ShowIf = { name: string; equals: string };

export type QuoteField =
  | {
      kind: "text" | "tel" | "email";
      name: string;
      label: string;
      required?: boolean;
      autoComplete?: string;
      /** Set beside the label of a field the brief leaves unstarred. */
      optional?: boolean;
    }
  | { kind: "textarea"; name: string; label: string; showIf?: ShowIf }
  | { kind: "select"; name: string; label: string; options: string[]; required?: boolean }
  | { kind: "radio"; name: string; label: string; options: string[]; required?: boolean }
  /** A group of checkboxes, any number of which may be ticked. */
  | {
      kind: "multi";
      name: string;
      label: string;
      options: string[];
      required?: boolean;
      /** "[SELECT ALL THAT APPLY]", under the question. */
      hint?: string;
      showIf?: ShowIf;
    }
  /** One statement to confirm. */
  | { kind: "confirm"; name: string; label: string; required?: boolean }
  | { kind: "photos"; name: string; label: string; required?: boolean };

export type QuoteGroup = { title: string; fields: QuoteField[] };

const SELECT_ALL = "Select all that apply.";

const IF_ATTEMPTED: ShowIf = { name: "attempted", equals: "Yes" };
const IF_REPAINTED: ShowIf = { name: "repainted", equals: "Yes" };

/* "PHOTO UPLOAD — Upload Photos* … Please upload: PHOTO 1 … PHOTO 5". */
export const PHOTO_GUIDE = {
  lead: "Please upload:",
  items: [
    { label: "Photo 1", body: "Full vehicle showing the overall extent." },
    { label: "Photo 2", body: "Affected area from approximately 1–2 metres away." },
    { label: "Photo 3", body: "Close-up of the graffiti/spray paint." },
    { label: "Photo 4", body: "Additional affected panels." },
    { label: "Photo 5", body: "Close-up of any visible damage." },
  ],
};

const ACKNOWLEDGEMENT =
  "I understand that Medusa Auto Detailing will make every reasonable effort to remove or improve the unwanted paint/graffiti, but complete removal cannot be guaranteed. I understand that existing damage, staining, etching, previous repairs or previous removal attempts may affect the final result.";

const DISCLOSURE =
  "I confirm that I have disclosed, to the best of my knowledge, any previous removal attempts and known paint repairs affecting the areas requiring treatment.";

export const QUOTE_FORM: { submit: string; groups: QuoteGroup[] } = {
  submit: "GET MY GRAFFITI REMOVAL QUOTE",
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
        {
          kind: "select",
          name: "vehicleType",
          label: "Vehicle Type",
          required: true,
          options: ["Car", "Van", "Commercial Vehicle", "Other"],
        },
        { kind: "text", name: "make", label: "Vehicle Make", required: true },
        { kind: "text", name: "model", label: "Vehicle Model", required: true },
        { kind: "text", name: "registration", label: "Registration", required: true },
        { kind: "text", name: "year", label: "Vehicle Year", optional: true },
        { kind: "text", name: "colour", label: "Vehicle Colour", required: true },
      ],
    },
    {
      title: "Graffiti Details",
      fields: [
        {
          kind: "multi",
          name: "contamination",
          label: "What has happened to the vehicle?",
          required: true,
          hint: SELECT_ALL,
          options: ["Spray paint", "Graffiti/paint vandalism", "Unknown paint/substance", "Paint transfer", "Other"],
        },
      ],
    },
    {
      title: "Affected Areas",
      fields: [
        {
          kind: "multi",
          name: "areas",
          label: "Which areas are affected?",
          required: true,
          hint: SELECT_ALL,
          options: [
            "Bonnet",
            "Front bumper",
            "Rear bumper",
            "Driver-side doors",
            "Passenger-side doors",
            "Front wing",
            "Rear quarter panel",
            "Boot/tailgate",
            "Roof",
            "Glass",
            "Headlights/lights",
            "Plastic trim",
            "Wheels",
            "Multiple areas",
            "Other",
          ],
        },
      ],
    },
    {
      title: "Size of Affected Area",
      fields: [
        {
          kind: "radio",
          name: "size",
          label: "Approximately how much of the vehicle is affected?",
          required: true,
          options: [
            "Small area — less than one panel",
            "Approximately one panel",
            "2–3 panels",
            "One complete side",
            "Multiple sides / large area",
            "Most of vehicle",
            "Not sure",
          ],
        },
      ],
    },
    {
      title: "When Did It Happen?",
      fields: [
        {
          kind: "radio",
          name: "when",
          label: "Approximately when was the vehicle vandalised?",
          required: true,
          options: ["Today", "Within the last 2–3 days", "Within the last week", "More than one week ago", "Unknown"],
        },
      ],
    },
    {
      title: "Previous Removal Attempts",
      fields: [
        {
          kind: "radio",
          name: "attempted",
          label: "Have you already tried to remove it?",
          required: true,
          options: ["No", "Yes"],
        },
        /* "If YES:" */
        {
          kind: "multi",
          name: "methods",
          label: "What have you used?",
          hint: SELECT_ALL,
          options: [
            "Soap/car shampoo",
            "Solvent",
            "Paint thinner",
            "Compound/polish",
            "Clay bar",
            "Pressure washer",
            "Scraper/blade",
            "Other",
          ],
          showIf: IF_ATTEMPTED,
        },
        { kind: "textarea", name: "methodsDetail", label: "Please explain", showIf: IF_ATTEMPTED },
      ],
    },
    {
      title: "Paint History",
      fields: [
        {
          kind: "radio",
          name: "repainted",
          label: "Has any affected panel previously been repainted or repaired?",
          required: true,
          options: ["No", "Yes", "Not sure"],
        },
        /* "If YES:" */
        { kind: "textarea", name: "repaintDetail", label: "Please provide details if known", showIf: IF_REPAINTED },
      ],
    },
    {
      title: "Wrap / PPF",
      fields: [
        {
          kind: "radio",
          name: "film",
          label: "Does the affected area have any of the following?",
          required: true,
          options: [
            "Standard painted bodywork",
            "Vinyl wrap",
            "PPF / paint protection film",
            "Decals/sign writing",
            "Not sure",
          ],
        },
      ],
    },
    {
      title: "Visible Damage",
      fields: [
        {
          kind: "multi",
          name: "damage",
          label: "Apart from the graffiti, can you see any damage?",
          required: true,
          hint: SELECT_ALL,
          options: [
            "Scratches",
            "Chips",
            "Dents",
            "Paint peeling",
            "Clear-coat damage",
            "Staining",
            "Cracking",
            "No obvious damage",
            "Not sure",
          ],
        },
      ],
    },
    {
      title: "Photo Upload",
      /* "MAKE THIS MANDATORY." */
      fields: [{ kind: "photos", name: "photos", label: "Upload Photos", required: true }],
    },
    {
      title: "Additional Information",
      fields: [{ kind: "textarea", name: "notes", label: "Anything else we should know?" }],
    },
    {
      title: "Required Customer Acknowledgement",
      fields: [{ kind: "confirm", name: "acknowledgement", label: ACKNOWLEDGEMENT, required: true }],
    },
    {
      title: "Second Acknowledgement",
      fields: [{ kind: "confirm", name: "disclosure", label: DISCLOSURE, required: true }],
    },
  ],
};

export const QUOTE_FIELDS: QuoteField[] = QUOTE_FORM.groups.flatMap((g) => g.fields);

/* ── Photographs ──────────────────────────────────────────────────────── */

/** "Allow multiple uploads." The brief asks for five; room for a few more. */
export const MAX_PHOTOS = 10;

/**
 * Every photograph together has to fit the 4 MB `serverActions.bodySizeLimit`
 * in `next.config.ts`, with room for the rest of the form. The browser shrinks
 * each picture first (`lib/photo-shrink.ts`), so this only binds on a file it
 * could not decode — a HEIC on a desktop browser, say.
 */
export const PHOTO_BUDGET = 3.6 * 1024 * 1024;

/** "Support: JPG, JPEG, PNG, HEIC, WebP where technically possible." */
export const PHOTO_ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif";

/** Whether a file is one of the brief's five formats — by type, or by name
 *  for the browsers that report a HEIC with no type at all. */
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
    answers[field.name] =
      field.name === "postcode" || field.name === "registration" ? value.toUpperCase() : value;
  }

  return { errors, answers };
}

/* ── The email ────────────────────────────────────────────────────────── */

/** "URGENT GRAFFITI REMOVAL QUOTE — [VEHICLE MAKE] [MODEL] — [POSTCODE]". */
export function quoteSubject(answers: Record<string, string>): string {
  const vehicle = [answers.make, answers.model].filter(Boolean).join(" ");
  return `URGENT GRAFFITI REMOVAL QUOTE — ${vehicle || "Vehicle not given"} — ${answers.postcode || "Postcode not given"}`;
}

/**
 * The email's lines, in the order the brief lists them — "Customer name,
 * Telephone, Email, Postcode, Vehicle, Registration, Colour, Type of
 * contamination, Affected panels, Approximate area, When it happened, Previous
 * removal attempts, Known repainting, Wrap/PPF status, Visible damage,
 * Customer notes, ALL uploaded photographs" — then the two acknowledgements,
 * so the inbox holds what the customer confirmed. A question left unanswered
 * is left out.
 *
 * `links` makes the telephone number and the email address tappable: "Make
 * telephone number clickable within the email."
 */
export function quoteEmail(answers: Record<string, string>, photos: string) {
  const fields: Record<string, string> = {};
  const put = (label: string, value: string | undefined) => {
    if (value) fields[label] = value;
  };

  const vehicle = [
    [answers.make, answers.model].filter(Boolean).join(" "),
    answers.vehicleType,
    answers.year,
  ]
    .filter(Boolean)
    .join(" — ");
  const attempts =
    answers.attempted === "Yes"
      ? ["Yes", answers.methods && `Used: ${answers.methods}`, answers.methodsDetail].filter(Boolean).join("\n")
      : answers.attempted;
  const repainting =
    answers.repainted === "Yes" && answers.repaintDetail
      ? `Yes\n${answers.repaintDetail}`
      : answers.repainted;

  put("Customer name", answers.fullName);
  put("Telephone", answers.mobile);
  put("Email", answers.email);
  put("Postcode", answers.postcode);
  put("Vehicle", vehicle);
  put("Registration", answers.registration);
  put("Colour", answers.colour);
  put("Type of contamination", answers.contamination);
  put("Affected panels", answers.areas);
  put("Approximate area", answers.size);
  put("When it happened", answers.when);
  put("Previous removal attempts", attempts);
  put("Known repainting", repainting);
  put("Wrap/PPF status", answers.film);
  put("Visible damage", answers.damage);
  put("Customer notes", answers.notes);
  put("Uploaded photographs", photos);
  put("Required customer acknowledgement", answers.acknowledgement && `Confirmed: ${ACKNOWLEDGEMENT}`);
  put("Second acknowledgement", answers.disclosure && `Confirmed: ${DISCLOSURE}`);

  const links: Record<string, string> = {};
  if (answers.mobile) links.Telephone = `tel:${answers.mobile.replace(/[^\d+]/g, "")}`;
  if (answers.email) links.Email = `mailto:${answers.email}`;

  return { fields, links };
}
