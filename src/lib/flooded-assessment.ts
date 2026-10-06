/**
 * The flooded car assessment form on
 * /car-interior-cleaning/flooded-car-cleaning.
 *
 * Client, 2026-10-06: "DEDICATED FLOODED CAR ASSESSMENT FORM — Replace any
 * generic booking/contact form with this dedicated assessment form. Do NOT
 * allow straightforward instant booking without condition assessment." Every
 * group title, label, option, conditional message and acknowledgement below
 * is the brief's own, in its order. Built the way the signage removal quote
 * form is (`lib/signage-quote.ts`): a module of its own, loaded in the
 * browser as well as on the server, so `validateFlood` flags a missed answer
 * before any photograph uploads and holds a tampered submission to the same
 * rules.
 *
 * Two things this form has that the signage one did not:
 *
 *   - **Messages that appear with an answer.** "IF NO / NOT SURE: Display: …",
 *     "IF YES: Show: …", "IF SEWAGE / OIL / FUEL / CHEMICALS: Do NOT
 *     automatically book. Display: SPECIALIST ASSESSMENT REQUIRED …". Each is
 *     a `notice` that shows when its question is answered one of the named
 *     ways. They say something; they ask nothing, and `validateFlood` skips
 *     them.
 *   - **Four required acknowledgements**, not one.
 *
 * The brief's "FORM BACK-END" is `floodSubject` and `floodEmail` at the foot:
 * the subject line it spells out and the nineteen things the email is to
 * include, in the order it lists them.
 */

export const FLOOD_FORM_ID = "flooded-car-quote";

/**
 * The form's two conversion events, from the brief's "CONVERSION TRACKING —
 * Track: Flooded Car Quote Submitted, Photo Upload, WhatsApp Click, Phone
 * Click". The last two are the site-wide ones `TrackClicks` already fires.
 * Re-exported as part of `TRACK` in `lib/flooded-car.ts`.
 */
export const FORM_TRACK = {
  /* "Completed assessment form should be the primary conversion." */
  submitted: "flooded_car_quote_submitted",
  photoUpload: "flooded_car_photo_upload",
} as const;

/** A question or message that only appears after an earlier answer. */
type ShowIf = { name: string; in: string[] };

export type FloodField =
  | {
      kind: "text" | "tel" | "email";
      name: string;
      label: string;
      required?: boolean;
      autoComplete?: string;
      /** Set beside a label the brief gives no asterisk. */
      optional?: boolean;
    }
  | { kind: "textarea"; name: string; label: string; hint?: string; showIf?: ShowIf }
  | { kind: "select"; name: string; label: string; options: string[]; required?: boolean }
  | { kind: "radio"; name: string; label: string; options: string[]; required?: boolean }
  /** A group of checkboxes, any number of which may be ticked. */
  | { kind: "multi"; name: string; label: string; options: string[]; required?: boolean; note?: string }
  /** One statement to confirm. */
  | { kind: "confirm"; name: string; label: string; required?: boolean }
  | { kind: "photos"; name: string; label: string; required?: boolean }
  /** Something the form says, not asks — shown once an answer calls for it. */
  | { kind: "notice"; name: string; title?: string; text: string; showIf: ShowIf };

export type FloodGroup = { title: string; fields: FloodField[] };

/** "Select all that apply:" — the brief's own words, under both multi-selects. */
const SELECT_ALL = "Select all that apply:";

/* The two answers the brief singles out: "IF SEWAGE / OIL / FUEL / CHEMICALS". */
const HAZARDOUS = ["Sewage/wastewater", "Water contaminated with oil/fuel/chemicals"];

/* "REQUIRED ACKNOWLEDGEMENT 1–4", word for word. */
export const ACKNOWLEDGEMENTS = [
  "I understand that Medusa Auto Detailing provides cleaning and detailing services and does not diagnose or repair the source of water ingress, electrical faults, mechanical faults or structural vehicle damage.",
  "I understand that complete removal of hidden moisture, mould, stains or odours cannot be guaranteed and that these problems may return if the source of water ingress or moisture has not been repaired.",
  "I understand that cleaning the vehicle does not confirm or guarantee that it is mechanically, electrically or structurally safe following flooding or water ingress.",
  "I understand that payment is for the professional cleaning/treatment carried out and is not conditional upon complete removal of moisture, mould, staining or odours.",
];

export const FLOOD_FORM: { title: string; submit: string; groups: FloodGroup[] } = {
  title: "Flooded Car Cleaning Quote",
  submit: "Get My Flooded Car Quote",
  groups: [
    {
      title: "Customer Details",
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
        { kind: "text", name: "year", label: "Vehicle Year", optional: true },
        {
          kind: "select",
          name: "vehicleType",
          label: "Vehicle Type",
          required: true,
          options: ["Small Car", "Medium Car", "Large Car", "SUV / 4x4", "Estate", "Van", "Other"],
        },
      ],
    },
    {
      title: "Power Type",
      fields: [
        {
          kind: "radio",
          name: "power",
          label: "Vehicle Power Type",
          required: true,
          options: ["Petrol", "Diesel", "Hybrid", "Electric", "Other", "Not sure"],
        },
      ],
    },
    {
      title: "What Caused the Water?",
      fields: [
        {
          kind: "radio",
          name: "source",
          label: "Where did the water come from?",
          required: true,
          options: [
            "Rain through open window/door",
            "Suspected door/window seal leak",
            "Sunroof/panoramic roof leak",
            "Boot leak",
            "Suspected blocked drain",
            "Road/local flooding",
            "Vehicle partially submerged",
            "Vehicle significantly submerged",
            "Unknown",
            "Other",
          ],
        },
      ],
    },
    {
      title: "Is the Leak Fixed?",
      fields: [
        {
          kind: "radio",
          name: "repaired",
          label: "Has the source of water ingress been repaired?",
          required: true,
          options: ["Yes", "No", "Not sure"],
        },
        /* "IF NO / NOT SURE: Display:". */
        {
          kind: "notice",
          name: "repairedNotice",
          text: "Please note: Medusa can clean/treat the affected interior, but we do not diagnose or repair the source of water ingress. If the underlying problem remains, water, damp, odours or mould may return.",
          showIf: { name: "repaired", in: ["No", "Not sure"] },
        },
      ],
    },
    {
      title: "How Long Has It Been Wet?",
      fields: [
        {
          kind: "radio",
          name: "when",
          label: "When did the water ingress occur?",
          required: true,
          options: ["Today", "Yesterday", "2–3 days ago", "4–7 days ago", "More than one week ago", "Unknown"],
        },
      ],
    },
    {
      title: "Amount of Water",
      fields: [
        {
          kind: "radio",
          name: "severity",
          label: "How severe is the water ingress?",
          required: true,
          options: [
            "Slightly damp carpet",
            "Very wet carpet",
            "Small amount of standing water",
            "Significant standing water",
            "Interior partially flooded",
            "Vehicle significantly flooded/submerged",
            "Not sure",
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
          label: "Which areas are affected?",
          required: true,
          note: SELECT_ALL,
          options: [
            "Driver footwell",
            "Front passenger footwell",
            "Rear footwells",
            "Front seats",
            "Rear seats",
            "Boot carpet",
            "Spare-wheel area",
            "Floor mats",
            "Multiple areas",
            "Most of the interior",
            "Other",
          ],
        },
      ],
    },
    {
      title: "Mould",
      fields: [
        {
          kind: "radio",
          name: "mould",
          label: "Is there visible mould?",
          required: true,
          options: ["No", "Yes", "Not sure"],
        },
        /* "IF YES: Show:". */
        {
          kind: "notice",
          name: "mouldNotice",
          text: "Please upload clear photographs of all visible mould. Additional specialist mould treatment may be required.",
          showIf: { name: "mould", in: ["Yes"] },
        },
      ],
    },
    {
      title: "Odour",
      fields: [
        {
          kind: "radio",
          name: "odour",
          label: "Is there currently a damp/musty smell?",
          required: true,
          options: ["No", "Mild", "Moderate", "Strong", "Not sure"],
        },
      ],
    },
    {
      title: "Water Type / Contamination",
      fields: [
        {
          kind: "radio",
          name: "waterType",
          label: "What type of water entered the vehicle?",
          required: true,
          options: [
            "Rainwater",
            "Clean water",
            "Road/floodwater",
            "Unknown water",
            ...HAZARDOUS,
            "Not sure",
          ],
        },
        /* "IF SEWAGE / OIL / FUEL / CHEMICALS: Do NOT automatically book.
           Display:". Nothing on this page books; the form only ever asks
           for a quote. */
        {
          kind: "notice",
          name: "waterTypeNotice",
          title: "Specialist Assessment Required",
          text: "Please upload photographs and provide details. This type of contamination may fall outside the scope of our standard mobile cleaning service.",
          showIf: { name: "waterType", in: HAZARDOUS },
        },
      ],
    },
    {
      title: "Electrical Issues",
      fields: [
        {
          kind: "radio",
          name: "electrical",
          label: "Have you noticed any electrical or vehicle faults since the water ingress?",
          required: true,
          options: ["No", "Yes", "Not sure"],
        },
        /* "IF YES: What have you noticed? [TEXT AREA]" — unstarred, so
           optional — then "Display:". */
        {
          kind: "textarea",
          name: "electricalDetails",
          label: "What have you noticed?",
          showIf: { name: "electrical", in: ["Yes"] },
        },
        {
          kind: "notice",
          name: "electricalNotice",
          text: "Medusa does not diagnose electrical or mechanical flood damage. Appropriate automotive assessment may be required before cleaning.",
          showIf: { name: "electrical", in: ["Yes"] },
        },
      ],
    },
    {
      title: "Previous Action",
      fields: [
        {
          kind: "multi",
          name: "previous",
          label: "What has already been done?",
          required: true,
          note: SELECT_ALL,
          options: [
            "Nothing",
            "Water vacuumed/extracted",
            "Carpets cleaned",
            "Fans/dehumidifier used",
            "Vehicle professionally inspected",
            "Leak repaired",
            "Seats/carpet removed by another professional",
            "Other",
          ],
        },
      ],
    },
    {
      title: "Photo Upload",
      /* "MANDATORY." */
      fields: [{ kind: "photos", name: "photos", label: "Upload Photos", required: true }],
    },
    {
      title: "Additional Information",
      fields: [
        {
          kind: "textarea",
          name: "notes",
          label: "Tell Us What Happened",
          hint: 'Example: "Rear passenger footwell filled with rainwater after the car was parked outside. Carpet has been wet for approximately four days and now smells damp."',
        },
      ],
    },
    {
      /* The brief numbers them "REQUIRED ACKNOWLEDGEMENT 1" to "4"; one group,
         numbered in the form, rather than four headings over one box each. */
      title: "Required Acknowledgement",
      fields: ACKNOWLEDGEMENTS.map(
        (label, i): FloodField => ({ kind: "confirm", name: `ack${i + 1}`, label, required: true }),
      ),
    },
  ],
};

export const FLOOD_FIELDS: FloodField[] = FLOOD_FORM.groups.flatMap((g) => g.fields);

/* ── Photographs ──────────────────────────────────────────────────────── */

/**
 * "Request: PHOTO 1 … PHOTO 6" — shown beside the upload area, in the
 * brief's order and words.
 */
export const PHOTO_GUIDE = [
  "Whole interior.",
  "Main affected footwell/area.",
  "Close-up of wet carpet or standing water.",
  "Boot/spare-wheel area if affected.",
  "Visible mould if present.",
  "Any additional affected areas.",
];

/**
 * "Allow multiple files." Six are asked for; four more leave room for a
 * second angle on the worst of it without letting one enquiry outgrow the
 * request.
 */
export const MAX_PHOTOS = 10;

/**
 * Every photograph together has to fit the 4 MB `serverActions.bodySizeLimit`
 * in `next.config.ts`, with room for the rest of the form. The browser shrinks
 * each picture first (`lib/photo-shrink.ts`), so this only binds on a file it
 * could not decode — a HEIC on a desktop browser, say.
 */
export const PHOTO_BUDGET = 3.6 * 1024 * 1024;

/** "Support JPG, JPEG, PNG, HEIC and WebP where possible." */
export const PHOTO_ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif";

/** Whether a file is one of the brief's five formats — by type, or by name
 *  for the browsers that report a HEIC with no type at all. */
export const isAcceptedPhoto = (file: { name: string; type: string }) =>
  /^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type) || /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name);

/* ── Validation ───────────────────────────────────────────────────────── */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Whether a field is on screen, given the answers so far. */
export function isShown(field: FloodField, read: (name: string) => string): boolean {
  if (!("showIf" in field) || !field.showIf) return true;
  return field.showIf.in.includes(read(field.showIf.name));
}

/**
 * Checks every answer the form can hold. `read` returns what was entered for
 * a name, trimmed, or "" for nothing — a ticked confirmation reads "yes";
 * `readAll` returns every ticked option of a multi-select group.
 *
 * Returns the errors and the answers, both keyed by field name, with a
 * multi-select's options joined in the form's own order. Photographs are the
 * caller's: a browser and a server hold a file differently.
 */
export function validateFlood(read: (name: string) => string, readAll: (name: string) => string[]) {
  const errors: Record<string, string> = {};
  const answers: Record<string, string> = {};

  for (const field of FLOOD_FIELDS) {
    if (field.kind === "photos" || field.kind === "notice" || !isShown(field, read)) continue;

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
    /* Free text, but not a page of it: a name, a postcode, a year. */
    if (field.kind === "text" && value.length > 120) {
      errors[field.name] = "That is longer than we can take here.";
      continue;
    }
    answers[field.name] =
      field.name === "postcode" || field.name === "registration" ? value.toUpperCase() : value;
  }

  return { errors, answers };
}

/** Whether the answers call for the brief's "SPECIALIST ASSESSMENT REQUIRED". */
export const needsSpecialist = (answers: Record<string, string>) => HAZARDOUS.includes(answers.waterType ?? "");

/* ── The email ────────────────────────────────────────────────────────── */

/** "FLOODED CAR QUOTE — [VEHICLE MAKE] [MODEL] — [POSTCODE]". */
export function floodSubject(answers: Record<string, string>): string {
  const vehicle = [answers.make, answers.model].filter(Boolean).join(" ");
  return `FLOODED CAR QUOTE — ${vehicle || "Vehicle not given"} — ${answers.postcode || "Postcode not given"}`;
}

/**
 * The email's lines, in the order the brief's "Include:" lists them —
 * "Customer name, Phone, Email, Postcode, Vehicle make/model, Registration,
 * Power type, Water source, Whether leak has been fixed, Time since water
 * ingress, Severity, Affected areas, Mould status, Odour severity, Water type,
 * Electrical issues, Previous action, Customer notes, ALL photographs" — and
 * then the four acknowledgements, so the inbox holds what the customer
 * agreed to. The year and type the form also asks ride on the vehicle's line.
 * A question left unanswered is left out.
 *
 * `links` makes the telephone number and the address tappable from the inbox.
 */
export function floodEmail(answers: Record<string, string>, photos: string) {
  const fields: Record<string, string> = {};
  const put = (label: string, value: string | undefined) => {
    if (value) fields[label] = value;
  };

  const vehicle = [answers.make, answers.model].filter(Boolean).join(" ");
  const electrical =
    answers.electrical === "Yes" && answers.electricalDetails
      ? `Yes — ${answers.electricalDetails}`
      : answers.electrical;
  /* The form showed the customer "SPECIALIST ASSESSMENT REQUIRED"; the inbox
     sees the same words, so the enquiry is not booked like any other. */
  const waterType = needsSpecialist(answers)
    ? `${answers.waterType} — SPECIALIST ASSESSMENT REQUIRED`
    : answers.waterType;

  put("Customer name", answers.fullName);
  put("Phone", answers.mobile);
  put("Email", answers.email);
  put("Postcode", answers.postcode);
  put("Vehicle make/model", [vehicle, answers.vehicleType, answers.year].filter(Boolean).join(" — "));
  put("Registration", answers.registration);
  put("Power type", answers.power);
  put("Water source", answers.source);
  put("Whether leak has been fixed", answers.repaired);
  put("Time since water ingress", answers.when);
  put("Severity", answers.severity);
  put("Affected areas", answers.areas);
  put("Mould status", answers.mould);
  put("Odour severity", answers.odour);
  put("Water type", waterType);
  put("Electrical issues", electrical);
  put("Previous action", answers.previous);
  put("Customer notes", answers.notes);
  put("Photographs", photos);
  ACKNOWLEDGEMENTS.forEach((text, i) =>
    put(`Required acknowledgement ${i + 1}`, answers[`ack${i + 1}`] && `Confirmed: ${text}`),
  );

  const links: Record<string, string> = {};
  if (answers.mobile) links.Phone = `tel:${answers.mobile.replace(/[^\d+]/g, "")}`;
  if (answers.email) links.Email = `mailto:${answers.email}`;

  return { fields, links };
}
