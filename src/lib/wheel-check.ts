/**
 * The WHEELUV™ suitability & booking form on /car-detailing/alloy-wheel-protection.
 *
 * Client, 2026-10-06: "Create a dedicated form rather than relying only on
 * the generic contact form." Every heading, label, option and acknowledgement
 * below is the brief's own, in its order; the six CF7 forms elsewhere on the
 * site are untouched and still render through `EnquiryForm`.
 *
 * It is a module of its own, not part of `pages.json`'s form blocks, because
 * it needs three things a CF7 form never had — radio groups, acknowledgement
 * boxes and a pair of questions that only appear after a "Yes" — and because
 * this file has to load in the browser as well as on the server:
 * `validateWheelCheck` runs on both. The browser runs it so a missed radio is
 * flagged before four photographs are uploaded; the server runs it again so a
 * tampered submission is held to exactly the same rules.
 */

export const WHEEL_FORM_ID = "wheeluv-suitability";

/** A question that is only asked when an earlier answer says so. */
type ShowIf = { name: string; equals: string };

export type WheelField =
  | {
      kind: "text" | "tel" | "email";
      name: string;
      label: string;
      required?: boolean;
      autoComplete?: string;
      showIf?: ShowIf;
    }
  | { kind: "radio" | "select"; name: string; label: string; options: string[]; required?: boolean; showIf?: ShowIf }
  | { kind: "checkbox"; name: string; label: string; required?: boolean; showIf?: ShowIf }
  | { kind: "photo"; name: string; label: string; hint: string; showIf?: ShowIf };

export type WheelGroup = {
  title: string;
  /** Under the title, where the brief writes one. */
  note?: string;
  fields: WheelField[];
};

/* The five finishes `lib/alloy-wheel-protection.ts` shows, and the brief's
   "Not sure — recommend one". "Populate this using ONLY currently available
   Medusa/WHEELUV™ colours." */
export const COLOUR_OPTIONS = ["Silver", "Black", "Anthracite", "Red", "Blue", "Not sure — recommend one"];

export const WHEEL_FORM: { eyebrow: string; title: string; submit: string; groups: WheelGroup[] } = {
  eyebrow: "Alloy Wheel Protection",
  title: "WHEELUV™ Suitability & Booking",
  submit: "Check Compatibility / Book",
  groups: [
    {
      title: "Customer Details",
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
        { kind: "text", name: "make", label: "Vehicle Make", required: true },
        { kind: "text", name: "model", label: "Vehicle Model", required: true },
        { kind: "text", name: "registration", label: "Registration", required: true },
        { kind: "text", name: "year", label: "Vehicle Year" },
      ],
    },
    {
      title: "Wheel Details",
      fields: [
        {
          kind: "radio",
          name: "wheelSize",
          label: "Wheel Size",
          required: true,
          options: ['16"', '17"', '18"', '19"', '20"', '21"', '22"', "Other", "Not sure"],
        },
      ],
    },
    {
      title: "Wheel Finish",
      fields: [
        {
          kind: "radio",
          name: "wheelFinish",
          label: "What type of wheels do you have?",
          required: true,
          options: ["Standard painted alloy", "Diamond-cut alloy", "Powder-coated", "Other", "Not sure"],
        },
      ],
    },
    {
      title: "Tyres",
      fields: [
        {
          kind: "radio",
          name: "runFlat",
          label: "Are run-flat tyres fitted?",
          required: true,
          options: ["Yes", "No", "Not sure"],
        },
      ],
    },
    {
      title: "Current Wheel Condition",
      fields: [
        {
          kind: "radio",
          name: "condition",
          label: "Do the wheels currently have any damage?",
          required: true,
          options: [
            "No — excellent condition",
            "Light kerb marks",
            "Moderate kerb damage",
            "Heavy kerb damage",
            "Corrosion / lacquer issues",
            "Recently refurbished",
            "Not sure",
          ],
        },
      ],
    },
    {
      title: "Recent Refurbishment",
      fields: [
        {
          kind: "radio",
          name: "refurbished",
          label: "Have the wheels been refurbished recently?",
          required: true,
          options: ["No", "Yes", "Not sure"],
        },
        /* The brief's "IF YES:" pair. Unstarred there, so optional here. */
        { kind: "text", name: "refurbishedWhen", label: "When?", showIf: { name: "refurbished", equals: "Yes" } },
        {
          kind: "radio",
          name: "refurbishmentType",
          label: "What type of refurbishment?",
          options: ["Painted", "Powder coated", "Diamond cut", "Other", "Not sure"],
          showIf: { name: "refurbished", equals: "Yes" },
        },
      ],
    },
    {
      title: "Upload Wheel Photos",
      note: "For customers unsure about compatibility, strongly recommended.",
      fields: [
        { kind: "photo", name: "photo1", label: "Photo 1", hint: "Full front wheel" },
        { kind: "photo", name: "photo2", label: "Photo 2", hint: "Close-up of rim edge" },
        { kind: "photo", name: "photo3", label: "Photo 3", hint: "Rear wheel" },
        { kind: "photo", name: "photo4", label: "Photo 4", hint: "Any existing damage" },
      ],
    },
    {
      title: "Colour",
      fields: [
        { kind: "select", name: "colour", label: "Preferred WHEELUV™ Colour", options: COLOUR_OPTIONS },
      ],
    },
    {
      title: "Customer Acknowledgement",
      fields: [
        {
          kind: "checkbox",
          name: "ackRisk",
          required: true,
          label:
            "I understand that WHEELUV™ alloy wheel protectors are designed to help reduce the risk of certain light, low-speed kerb damage but do not guarantee that my wheels cannot be damaged.",
        },
        {
          kind: "checkbox",
          name: "ackSacrificial",
          required: true,
          label:
            "I understand that the protector is a sacrificial product and may itself become damaged or require replacement following an impact.",
        },
        {
          kind: "checkbox",
          name: "ackDisclosed",
          required: true,
          label:
            "I confirm that I have disclosed any known significant wheel damage or recent wheel refurbishment.",
        },
      ],
    },
  ],
};

export const WHEEL_FIELDS: WheelField[] = WHEEL_FORM.groups.flatMap((g) => g.fields);

/** The four photo inputs, by name. */
export const PHOTO_FIELDS = WHEEL_FIELDS.filter((f) => f.kind === "photo");

/**
 * Every photograph together has to fit the 4 MB `serverActions.bodySizeLimit`
 * in `next.config.ts`, with room for the rest of the form. The browser shrinks
 * each picture before it gets here (`components/WheelCheckForm.tsx`), so this
 * only binds on a phone that could not.
 */
export const PHOTO_BUDGET = 3.6 * 1024 * 1024;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Whether a question is being asked, given the answers so far. */
export function isShown(field: WheelField, read: (name: string) => string): boolean {
  return !field.showIf || read(field.showIf.name) === field.showIf.equals;
}

/** "Photo 1 — Full front wheel": the label the inbox reads. */
export const answerLabel = (field: WheelField) =>
  field.kind === "photo" ? `${field.label} — ${field.hint}` : field.label;

/**
 * Checks every answer the form can hold. `read` returns what was entered for
 * a name, trimmed, or "" for nothing — a ticked box reads "yes".
 *
 * Returns the errors keyed by field name and, in the form's own order, the
 * answers keyed by label. Photographs are the caller's: they are files, and
 * what to do with a file differs between a browser and a server.
 */
export function validateWheelCheck(read: (name: string) => string) {
  const errors: Record<string, string> = {};
  const answers: Record<string, string> = {};

  for (const field of WHEEL_FIELDS) {
    if (field.kind === "photo" || !isShown(field, read)) continue;
    const value = read(field.name);

    if (field.kind === "checkbox") {
      /* The whole statement goes to the inbox as the label: it is what the
         customer agreed to, and a paraphrase of it would not be. */
      if (field.required && value !== "yes") errors[field.name] = "Please confirm to continue.";
      else if (value === "yes") answers[field.label] = "Confirmed";
      continue;
    }

    if (!value) {
      if (field.required) {
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
    answers[field.label] = value;
  }

  return { errors, answers };
}

/** "WHEELUV™ ENQUIRY — [VEHICLE MAKE] [MODEL] — [WHEEL SIZE]", as the brief writes it. */
export function wheelCheckSubject(read: (name: string) => string): string {
  const vehicle = [read("make"), read("model")].filter(Boolean).join(" ");
  return `WHEELUV™ ENQUIRY — ${vehicle || "Vehicle not given"} — ${read("wheelSize") || "Wheel size not given"}`;
}
