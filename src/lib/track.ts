/**
 * Conversion events, for whichever analytics the site is given.
 *
 * Client, 2026-10-06, for the WHEELUV™ page: "Track: Book WHEELUV Click,
 * Check Compatibility Click, Compatibility Form Submitted, WhatsApp Click,
 * Phone Click, Completed WHEELUV Booking". **The site loads no analytics at
 * all** — no GA4, no Tag Manager — so these have nowhere to go yet. They are
 * named and fired now so that adding a container is the whole of the job:
 *
 *   - with GA4's `gtag.js` on the page, each is a `gtag("event", …)`;
 *   - otherwise each is pushed to `window.dataLayer` as `{ event, … }`, which
 *     is what a Google Tag Manager custom-event trigger listens for.
 *
 * Not both: a Tag Manager container that also forwards dataLayer events to
 * GA4 would count every one twice.
 *
 * "Completed WHEELUV Booking" cannot be fired from here. A booking completes
 * on book.medusaautodetailing.co.uk, which is another site; it has to be
 * tracked there.
 */

export const EVENTS = {
  book: "book_wheeluv_click",
  /* Every booking button on `/vehicles/motorcycle-valeting-detailing`. That
     brief names no events; it is the same listener, so the page reports its
     bookings beside its WhatsApp and phone clicks rather than without them. */
  bookMotorcycle: "book_motorcycle_click",
  /* Every booking button on `/car-interior-cleaning/vomit-cleaning`, for the
     same reason: its brief names no events either. */
  bookVomit: "book_vomit_cleaning_click",
  /* `/car-interior-cleaning/pet-hair-removal`, the same again. Every one of
     its booking buttons books the Triton Interior Valet with the add-on. */
  bookPetHair: "book_triton_pet_hair_click",
  /* `/car-interior-cleaning/odour-removal`: every booking button books a
     valet with the odour treatment added. */
  bookOdour: "book_valet_odour_treatment_click",
  /* The second batch of 2026-10-06 rebuilds — steam cleaning, flooded car,
     engine bay, graffiti, interior paint spill, car wax, caravan and
     headlight — name their own events in a `TRACK` export of their content
     module (`lib/<page>.ts`), each the brief's own conversion list. */
  check: "check_compatibility_click",
  submitted: "compatibility_form_submitted",
  /* `/commercial-valeting/car-van-stickers-removal`: "Track the following as
     conversions/events: Quote Form Submitted, WhatsApp Click, Phone Click …
     the completed quote form should be treated as the primary lead
     conversion". The other two are the shared ones below. */
  quoteSubmitted: "quote_form_submitted",
  whatsapp: "whatsapp_click",
  phone: "phone_click",
  email: "email_click",
} as const;

type Analytics = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (command: "event", name: string, params: Record<string, unknown>) => void;
};

export function track(event: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Analytics;
  const payload = { page_path: window.location.pathname, ...params };
  if (typeof w.gtag === "function") w.gtag("event", event, payload);
  else (w.dataLayer ??= []).push({ event, ...payload });
}
