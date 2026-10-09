import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer";
import GraffitiQuoteForm from "@/components/GraffitiQuoteForm";
import Header from "@/components/Header";
import Icon, { type IconName } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import StickyBookBar from "@/components/StickyBookBar";
import TrackClicks from "@/components/TrackClicks";
import Testimonials from "@/components/sections/Testimonials";
import { getPage } from "@/lib/blocks";
import { FORM_ANCHOR, GRAFFITI, PATH, PHOTOS, QUOTE, SLUG, type Step, TRACK } from "@/lib/graffiti-removal";
import { pageSchema } from "@/lib/schema";
import { CONTACT } from "@/lib/site";

/**
 * Car graffiti & spray paint removal — rebuilt from the client's brief.
 *
 * Client, 2026-10-06: "Completely replace/re-optimise the existing Car
 * Graffiti Removal page using the content below. KEEP EXISTING URL". Every
 * word is in `lib/graffiti-removal.ts` and the quote form's in
 * `lib/graffiti-quote.ts`; this file is only layout, in the order of the
 * brief's "ELEMENTOR PAGE STRUCTURE":
 *
 *   1 hero · 2 the urgent advice bar, with Section 2 under it · 4 what we
 *   remove (Section 3) · 5 why assessment matters (Section 4) · 6 the
 *   process (Section 5) · 7 paint damage (Section 7) · 8 special surfaces
 *   (Sections 8–10) · what not to do (Section 11) · 9 pricing (Section 12) ·
 *   10 cars, vans, commercial (Section 13) · 11 why Medusa · 13 reviews ·
 *   14 the quote form · 15 FAQ, with 16 the service information closing its
 *   band · 17 the final CTA (Section 18).
 *
 * Items 3 and 12, the before & after and its gallery, are not here: "Use
 * genuine Medusa before/after images … Genuine jobs." — and none exists
 * (see `lib/graffiti-removal.ts`).
 *
 * The brief's notes decided the rest. "The first mobile screen should
 * communicate: CAR GRAFFITI REMOVAL LONDON · SPRAY PAINT • GRAFFITI •
 * VANDALISM · SEND PHOTOS FOR A QUOTE · [UPLOAD PHOTOS] [WHATSAPP]. Then
 * immediately: DON'T APPLY SOLVENTS OR ABRASIVES BEFORE WE ASSESS IT." — that
 * is the hero's DOM order, all of it above the fold at 375x812, the warning
 * on phones only because the advice bar says it on every width one band
 * later. "The primary CTA should NOT be: BOOK NOW. Use: GET A QUOTE" — no
 * button on the page books; every quote button is `#get-graffiti-removal-
 * quote`, the form's band ("Every GET A QUOTE button should scroll to this
 * form"), and the sticky bar is "GET QUOTE | WHATSAPP".
 *
 * Gold and ink alternate the whole way down (client, 2026-09-22: "pastikan
 * warna bg tetap selang seling"): the form lands on ink, where every enquiry
 * form on the site sits, which puts the FAQ on gold — so Section 17 closes
 * the FAQ's band as its one dark panel rather than taking a band of its own,
 * and the gold still meets the ink close.
 *
 * The route wins over `app/[...slug]` because a static segment outranks a
 * catch-all; the slug belongs in `CUSTOM_ROUTES` so only one page is built.
 */

const WHATSAPP = GRAFFITI.whatsapp;

export function generateMetadata(): Metadata {
  const { title, description } = GRAFFITI.seo;
  return {
    title,
    description,
    alternates: { canonical: PATH },
    openGraph: {
      title,
      description,
      url: PATH,
      images: [{ url: PHOTOS.hero.src, width: PHOTOS.hero.w, height: PHOTOS.hero.h, alt: PHOTOS.hero.alt }],
    },
  };
}

export default function GraffitiRemovalPage() {
  const page = getPage(SLUG);
  if (!page) notFound();

  return (
    <>
      {/* "Add appropriate: Service schema, FAQPage schema. Do not add
          unsupported review ratings." No offer: it is quoted individually. */}
      <JsonLd
        data={pageSchema(page, {
          service: {
            slug: SLUG,
            name: "Car Graffiti & Spray Paint Removal",
            serviceType: "Car graffiti and spray paint removal",
            description: GRAFFITI.seo.description,
            image: PHOTOS.hero.src,
          },
          faq: GRAFFITI.faq.items,
        })}
      />
      <TrackClicks />

      <Header />
      <main className="flex-1">
        <Hero />
        <Panic />
        <Assess />
        <Different />
        <Process />
        <Damage />
        <Surfaces />
        <Avoid />
        <Cost />
        <Vehicles />
        <WhyMedusa />
        <Testimonials title={GRAFFITI.reviews.heading} />
        <Quote />
        <Faq />
        <FinalCta />
      </main>
      <Footer />

      {/* "MOBILE STICKY CTA — Use: GET QUOTE | WHATSAPP. Not: BOOK NOW". It
          steps aside over the form and over the closing band, which carry
          the same two. */}
      <StickyBookBar
        primary={{ label: GRAFFITI.sticky.quote, href: QUOTE, track: TRACK.quote }}
        secondary={{ label: GRAFFITI.sticky.whatsapp, href: WHATSAPP, icon: "whatsapp", external: true }}
        after="graffiti-hero-actions"
        hideOver={[FORM_ANCHOR, "graffiti-final"]}
      />
    </>
  );
}

/* ── Shared pieces ──────────────────────────────────────────────────────── */

/* Two marks the set does not have yet, drawn on its grid — 24px, the 1.75
   stroke, round caps and joins, `currentColor`. */
type Glyph = "spray" | "car";

const GLYPHS: Record<Glyph, React.ReactNode> = {
  /* An aerosol can, nozzle up, its spray drifting off to the right. */
  spray: (
    <>
      <rect x="4.5" y="9.5" width="8.5" height="11" rx="1.8" />
      <path d="M6.3 9.5V7.7c0-.6.5-1.1 1.1-1.1h2.7c.6 0 1.1.5 1.1 1.1v1.8" />
      <path d="M7.8 6.6V4.3h2v2.3" />
      <path d="M13.2 4.6h.1" />
      <path d="M15.9 3.4h.1" />
      <path d="M15.9 6h.1" />
      <path d="M18.7 2.4h.1" />
      <path d="M18.7 4.7h.1" />
      <path d="M18.7 7h.1" />
    </>
  ),
  /* A car in profile. */
  car: (
    <>
      <path d="M4.9 16.5H3.5v-3.1a1.6 1.6 0 0 1 1.2-1.6l2.6-.7 2.2-3.2A2 2 0 0 1 11.1 7h3.5a2 2 0 0 1 1.6.8l2.6 3.4 1.3.3a1.6 1.6 0 0 1 1.3 1.6v3.4h-1.3" />
      <path d="M9.3 16.5h5.4" />
      <path d="M12.9 7v4" />
      <circle cx="7.1" cy="16.7" r="2.1" />
      <circle cx="16.9" cy="16.7" r="2.1" />
    </>
  ),
};

function Mark({ name, size = 20, className }: { name: IconName | Glyph; size?: number; className?: string }) {
  if (name !== "spray" && name !== "car") return <Icon name={name} size={size} className={className} />;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      focusable="false"
    >
      {GLYPHS[name]}
    </svg>
  );
}

/** "Every GET A QUOTE button should scroll to this form." */
function QuoteButton({
  label,
  tone = "gold",
  inCard,
  className = "",
}: {
  label: string;
  /** `dark` is the ink pill — the primary action on a gold band. */
  tone?: "gold" | "dark";
  /** At the foot of a narrow card, where a long label has to wrap. */
  inCard?: boolean;
  className?: string;
}) {
  return (
    <a
      href={QUOTE}
      data-track={TRACK.quote}
      className={`btn ${tone === "gold" ? "btn-gold" : "btn-dark"} min-h-[52px] rounded-full px-5 text-center text-[14px] ${
        inCard ? "py-3 leading-[18px]" : "sm:px-7 sm:text-[15px] sm:whitespace-nowrap"
      } ${className}`}
    >
      {label}
      <Icon name="arrow" size={18} className="ml-2.5 shrink-0" />
    </a>
  );
}

function WhatsAppButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-outline min-h-[52px] rounded-full px-5 text-[14px] sm:px-7 sm:text-[15px] sm:whitespace-nowrap ${className}`}
    >
      <Icon name="whatsapp" size={19} className="mr-2.5 shrink-0" />
      {label}
    </a>
  );
}

/* The brief gives every section a name and then a heading — "WHAT WE CAN
   ASSESS" over "Vehicle Graffiti & Unwanted Paint Removal". The name is the
   h2, as on the other rebuilt pages; the heading is the line under it, in
   the condensed face. */
function Kicker({ children, onGold }: { children: React.ReactNode; onGold?: boolean }) {
  return (
    <Reveal delay={2}>
      <h3
        className={`mt-5 font-[family-name:var(--font-sub)] text-[19px] leading-[1.25] font-semibold tracking-[0.02em] uppercase lg:text-[23px] ${
          onGold ? "text-ink" : "text-gold"
        }`}
      >
        {children}
      </h3>
    </Reveal>
  );
}

/** The internal links laid on the brief's own words. */
const LINKS = "[&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4";

/** Copy the brief sets partly in bold, or with a link laid on its words. */
function Prose({
  html,
  onGold,
  space = "mt-4",
  className = "",
}: {
  html: string;
  onGold?: boolean;
  /** The margin above — one class, so a caller's never fights the default. */
  space?: string;
  className?: string;
}) {
  return (
    <p
      className={`measure ${space} text-[16px] leading-[27px] font-normal ${
        onGold
          ? "text-ink/80 [&_a]:text-ink [&_a]:decoration-ink/40 [&_strong]:font-semibold [&_strong]:text-ink"
          : "text-body [&_a]:text-gold [&_a]:decoration-gold/50 [&_strong]:font-semibold [&_strong]:text-white"
      } ${LINKS} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function Tick({ onGold, size = 20 }: { onGold?: boolean; size?: number }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ${
        onGold ? "bg-ink text-gold" : "bg-gold/15 text-gold"
      }`}
      style={{ width: size, height: size }}
    >
      <Icon name="check" size={Math.round(size * 0.6)} strokeWidth={2.8} />
    </span>
  );
}

/** A "don't" — the brief's lists of what makes graffiti worse. */
function Cross({ size = 20 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"
      style={{ width: size, height: size }}
    >
      <Icon name="close" size={Math.round(size * 0.55)} strokeWidth={2.8} />
    </span>
  );
}

function Disc({ name, size = 46, solid }: { name: IconName | Glyph; size?: number; solid?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ${
        solid ? "bg-gold text-ink" : "bg-gold/12 text-gold ring-1 ring-gold/35"
      }`}
      style={{ width: size, height: size }}
    >
      <Mark name={name} size={Math.round(size * 0.46)} />
    </span>
  );
}

function Dots({ items, onGold, className = "" }: { items: readonly string[]; onGold?: boolean; className?: string }) {
  return (
    <ul className={`grid sm:grid-cols-2 sm:gap-x-8 ${className}`}>
      {items.map((f) => (
        <li
          key={f}
          className={`flex gap-3 border-b py-2.5 text-[15px] leading-[22px] font-normal ${
            onGold ? "border-ink/10 text-ink/85" : "border-white/[0.06] text-white/80"
          }`}
        >
          <span aria-hidden className={`mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full ${onGold ? "bg-ink" : "bg-gold"}`} />
          {f}
        </li>
      ))}
    </ul>
  );
}

function Chips({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((c) => (
        <li
          key={c}
          className="rounded-full bg-white/[0.05] px-3.5 py-1.5 text-[14px] leading-[20px] font-normal text-white/85 ring-1 ring-white/[0.1]"
        >
          {c}
        </li>
      ))}
    </ul>
  );
}

function Label({ children, onGold, className = "" }: { children: React.ReactNode; onGold?: boolean; className?: string }) {
  return (
    <p
      className={`font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.2em] uppercase ${
        onGold ? "text-ink/70" : "text-gold"
      } ${className}`}
    >
      {children}
    </p>
  );
}

/** The thin gold rule that draws in under a card on hover, as elsewhere. */
function HoverRule() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
    />
  );
}

/** An "IMPORTANT" note: calm, gold-ringed, never red. */
function Important({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[12px] bg-gold/[0.07] p-5 ring-1 ring-gold/40 ${className}`}>
      <p className="flex items-center gap-2.5 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.22em] text-gold uppercase">
        <Icon name="info" size={16} className="shrink-0" />
        {title}
      </p>
      {children}
    </div>
  );
}

/* ── 1. Hero ──────────────────────────────────────────────────────────────
   "Desktop: LEFT — H1, short emergency-style explanation, trust/service
   points, SEND PHOTOS FOR QUOTE, WhatsApp. RIGHT — strong genuine image."
   "MOBILE UX — The first mobile screen should communicate: CAR GRAFFITI
   REMOVAL LONDON · SPRAY PAINT • GRAFFITI • VANDALISM · SEND PHOTOS FOR A
   QUOTE · [UPLOAD PHOTOS] [WHATSAPP]. Then immediately: DON'T APPLY SOLVENTS
   OR ABRASIVES BEFORE WE ASSESS IT."

   One grid, in the mobile list's order at every width: the h1, the strap
   and SEND PHOTOS FOR A QUOTE as one panel, both buttons, then the
   emergency explanation; the photograph is pinned to the right-hand column
   from `lg`, its card carrying the seven service points. The buttons are
   Section 1's own, GET A FREE QUOTE and WHATSAPP PHOTOS. There is no
   photograph of graffiti, so the picture is a technician working a product
   off a door panel — captioned as nothing. */

function Hero() {
  const h = GRAFFITI.hero;
  return (
    <section className="cut-bottom relative w-full overflow-hidden bg-ink-panel pt-[124px] pb-[calc(var(--cut)+2.75rem)] lg:pt-[156px] lg:pb-[calc(var(--cut)+4rem)]">
      <div aria-hidden className="livery absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(56% 72% at 82% 42%, rgba(237,179,38,0.15) 0%, rgba(193,146,49,0.05) 46%, transparent 76%)",
        }}
      />

      <div className="shell relative z-10">
        <div className="grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-7 lg:col-start-1">
            <Reveal className="hidden sm:block">
              <span className="hero-rule speed-rule" aria-hidden />
            </Reveal>
            <Reveal delay={1}>
              <h1 className="max-w-[17ch] text-[clamp(31px,4.6vw,60px)] leading-[1.0] text-white sm:mt-7 lg:mt-6">
                {h.h1}
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-3.5 max-w-[44ch] font-[family-name:var(--font-sub)] text-[16.5px] leading-[1.3] font-semibold tracking-[0.03em] text-gold sm:text-[19px] xl:mt-5 xl:text-[21px]">
                {h.subtitle}
              </p>
            </Reveal>

            {/* SPRAY PAINT • GRAFFITI • VANDALISM, and what to do about it. */}
            <Reveal delay={3}>
              <div className="mt-6 max-w-[600px] overflow-hidden rounded-[14px] bg-white/[0.04] ring-1 ring-gold/35 xl:mt-8">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 px-5 py-3.5 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.05em] text-white uppercase sm:px-6 sm:py-4 sm:text-[20px]">
                  {h.strap.map((s, i) => (
                    <span key={s} className="flex items-center gap-3 whitespace-nowrap">
                      {i > 0 && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />}
                      {s}
                    </span>
                  ))}
                </p>
                <p className="flex items-center gap-3 border-t border-gold/25 bg-gold/[0.1] px-5 py-3 font-[family-name:var(--font-ui)] text-[12px] leading-[16px] font-semibold tracking-[0.16em] text-white uppercase sm:px-6 sm:text-[12.5px]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                    <Icon name="camera" size={15} strokeWidth={2} />
                  </span>
                  {h.photosLine}
                </p>
              </div>
            </Reveal>

            <Reveal delay={4}>
              <div id="graffiti-hero-actions" className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:mt-7">
                <QuoteButton label={h.quoteLabel} className="w-full sm:w-auto" />
                <WhatsAppButton label={h.whatsappLabel} className="w-full sm:w-auto" />
              </div>
            </Reveal>

            {/* "Then immediately:" — on a phone. From `lg` the advice bar
                says it, directly under the hero and still in view. */}
            <Reveal delay={4} className="lg:hidden">
              <p className="mt-4 flex items-start gap-3 rounded-[12px] bg-white/[0.04] px-4 py-3 font-[family-name:var(--font-ui)] text-[12.5px] leading-[18px] font-semibold tracking-[0.08em] text-white ring-1 ring-white/10">
                <Icon name="warning" size={18} className="mt-px shrink-0 text-gold" />
                {h.mobileWarning}
              </p>
            </Reveal>
          </div>

          {/* The short emergency-style explanation. */}
          <div className="lg:col-span-7 lg:col-start-1">
            <Reveal delay={5}>
              <p className="mt-8 max-w-[56ch] text-[17px] leading-[26px] font-semibold text-white xl:text-[18px] xl:leading-[28px]">
                {h.question}
              </p>
              <p className="mt-3 flex max-w-[56ch] gap-2.5 text-[17px] leading-[26px] font-semibold text-gold">
                <Cross size={22} />
                <strong className="font-semibold">{h.warn}</strong>
              </p>
              <p className="mt-3 max-w-[60ch] text-[16px] leading-[26px] font-normal text-white/75">{h.risk}</p>
            </Reveal>
          </div>

          <Reveal
            delay={4}
            className="mt-10 min-w-0 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center"
          >
            <HeroCard />
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 lg:mt-12 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Reveal className="lg:col-span-7">
            <p
              className="max-w-[64ch] text-[16px] leading-[27px] font-normal text-white/80 [&_strong]:font-semibold [&_strong]:text-white"
              dangerouslySetInnerHTML={{ __html: h.introHtml }}
            />
          </Reveal>
          <Reveal delay={1} className="lg:col-span-5">
            <Important title={h.important.title}>
              <p className="mt-2.5 text-[15px] leading-[23px] font-semibold text-white">{h.important.body}</p>
            </Important>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HeroCard() {
  const h = GRAFFITI.hero;
  return (
    /* Photograph over the points in the hero's column and on a phone; side
       by side on a tablet, where a stacked card ran a tall picture across
       the full width. */
    <figure className="surface relative overflow-hidden md:grid md:grid-cols-2 lg:block">
      <div className="relative aspect-[3/2] w-full md:aspect-auto md:min-h-[300px] lg:aspect-[3/2] lg:min-h-0">
        <Image
          src={PHOTOS.hero.src}
          alt={PHOTOS.hero.alt}
          fill
          priority
          sizes="(min-width: 1024px) 38vw, (min-width: 768px) 46vw, 92vw"
          className="object-cover object-[58%_50%]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(13,13,13,0.85),transparent)]"
        />
      </div>
      <figcaption className="p-5 sm:p-6">
        {/* "CAR • VAN • COMMERCIAL VEHICLE" */}
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.18em] text-gold uppercase">
          {h.vehicles.map((v, i) => (
            <span key={v} className="flex items-center gap-2.5 whitespace-nowrap">
              {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-gold/70" />}
              {v}
            </span>
          ))}
        </p>
        <ul className="mt-4 grid gap-x-4 gap-y-2.5 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
          {h.ticks.map((t) => (
            <li key={t} className="flex items-start gap-2.5 text-[14px] leading-[20px] font-semibold text-white/90">
              <span className="mt-px">
                <Tick size={18} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}

/* ── 2. Urgent advice bar · Section 2 ─────────────────────────────────────
   "URGENT ADVICE BAR — Immediately below hero: DON'T SCRUB IT. DON'T APPLY
   RANDOM SOLVENTS. TAKE PHOTOS & CONTACT US FIRST. [GET A QUOTE]" — the
   band's first thing, as one dark bar. Then Section 2, which is the same
   advice at length: the things not to use, what they can do, and SEND US
   PHOTOS FIRST as the band's closing call to action. */

function Panic() {
  const a = GRAFFITI.advice;
  const p = GRAFFITI.panic;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-[16px] bg-ink p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-9">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
              <Disc name="warning" size={52} solid />
              <div>
                <p className="font-[family-name:var(--font-heading)] text-[23px] leading-[1.05] font-black text-white uppercase sm:text-[30px] lg:text-[34px]">
                  {a.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>
                <p className="mt-3 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.04em] text-gold uppercase sm:text-[20px]">
                  {a.action}
                </p>
              </div>
            </div>
            <QuoteButton label={a.cta} className="w-full shrink-0 lg:w-auto" />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHead title={p.heading} tone="gold" />
            <Kicker onGold>{p.title}</Kicker>
            <Reveal delay={3}>
              <p className="mt-5 text-[18px] leading-[28px] font-semibold text-ink">{p.body[0]}</p>
              <p className="mt-3 text-[16px] leading-[27px] font-normal text-ink/80">{p.body[1]}</p>
            </Reveal>
          </div>

          {/* Stacked beside the heading at `lg`, where side by side each
              list had 165px; paired again from `xl`. */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1 lg:gap-5 xl:grid-cols-2">
            <Reveal delay={1} className="surface-on-gold flex flex-col p-6 sm:p-7">
              <p className="text-[16px] leading-[23px] font-semibold text-white">{p.using.lead}</p>
              <ul className="mt-4 grid gap-2.5">
                {p.using.items.map((it) => (
                  <li key={it} className="flex items-center gap-3 text-[15px] leading-[21px] font-normal text-white/85">
                    <Cross size={20} />
                    {it}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-5 text-[15.5px] leading-[23px] font-semibold text-gold">{p.using.after}</p>
            </Reveal>
            <Reveal delay={2} className="surface-on-gold p-6 sm:p-7">
              <p className="text-[16px] leading-[23px] font-semibold text-white">{p.youMay.lead}</p>
              <ul className="mt-4 grid gap-2.5">
                {p.youMay.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] leading-[21px] font-normal text-white/85">
                    <Icon name="warning" size={18} className="mt-px shrink-0 text-gold" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal delay={1}>
          <div className="mt-6 flex flex-col gap-5 rounded-[14px] bg-ink/[0.08] p-6 ring-1 ring-ink/25 sm:p-8 lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-gold">
                <Icon name="camera" size={22} />
              </span>
              <div>
                <p className="font-[family-name:var(--font-sub)] text-[21px] leading-tight font-semibold tracking-[0.03em] text-ink uppercase sm:text-[23px]">
                  {p.photosFirst.title}
                </p>
                <p className="mt-1.5 text-[16px] leading-[25px] font-normal text-ink/80">{p.photosFirst.body}</p>
              </div>
            </div>
            <QuoteButton label={p.photosFirst.cta} tone="dark" className="w-full shrink-0 lg:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 4. What we remove (Section 3) ─────────────────────────────────────────
   "WHAT WE REMOVE — Cards: SPRAY PAINT, GRAFFITI, VANDALISM PAINT, FOREIGN
   PAINT." The copy's four as cards, then its two longer groups — the panels
   and the commercial vehicles — as the pair under them. */

const TYPE_MARKS: Record<string, IconName | Glyph> = {
  "Spray Paint": "spray",
  Graffiti: "type",
  "Paint Vandalism": "warning",
  "Paint Transfer / Foreign Paint": "layers",
};

function Assess() {
  const s = GRAFFITI.assess;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={s.heading} />
            <Kicker>{s.title}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-5">
            <p className="mt-4 text-[18px] leading-[28px] font-semibold text-white lg:mt-0">{s.lead}</p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {s.types.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i} className="surface group relative overflow-hidden p-6 sm:p-7">
              <div
                aria-hidden
                className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(193,146,49,0.16),transparent_70%)]"
              />
              <Disc name={TYPE_MARKS[t.title] ?? "check"} size={54} />
              <h3 className="relative mt-6 font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[21px]">
                {t.title}
              </h3>
              <p className="relative mt-3 text-[15px] leading-[24px] font-normal text-white/75">{t.body}</p>
              <HoverRule />
            </Reveal>
          ))}
        </ul>

        <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:gap-5 xl:mt-5">
          <Reveal className="surface p-6 sm:p-8">
            <div className="flex items-center gap-3.5">
              <Disc name="layers" size={44} />
              <h3 className="font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[21px]">
                {s.panels.title}
              </h3>
            </div>
            <p className="mt-5 text-[15.5px] leading-[24px] font-semibold text-white/90">{s.panels.lead}</p>
            <Chips items={s.panels.items} className="mt-3.5" />
          </Reveal>
          <Reveal delay={1} className="surface p-6 sm:p-8">
            <div className="flex items-center gap-3.5">
              <Disc name="van" size={44} />
              <h3 className="font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[21px]">
                {s.commercial.title}
              </h3>
            </div>
            <p className="mt-5 text-[15.5px] leading-[24px] font-normal text-white/75">{s.commercial.body}</p>
            <p className="mt-3 text-[15.5px] leading-[24px] font-semibold text-white/90">{s.commercial.lead}</p>
            <Chips items={s.commercial.items} className="mt-3.5" />
          </Reveal>
        </div>

        <Reveal delay={1}>
          <QuoteButton label={s.cta} className="mt-8 w-full sm:w-auto lg:mt-10" />
        </Reveal>
      </div>
    </section>
  );
}

/* ── 5. Why professional assessment matters (Section 4) ───────────────────
   "Explain paint type, surface, previous repairs etc." The seven things the
   process depends on as numbered cards, and the section's capitals — "THIS
   IS WHY ALL GRAFFITI REMOVAL JOBS ARE QUOTED INDIVIDUALLY." — as the eighth
   tile, in ink, so it closes the set and carries the button. */

function Different() {
  const s = GRAFFITI.different;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.title}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-5">
            <p className="mt-4 text-[18px] leading-[28px] font-semibold text-ink lg:mt-0">{s.lead}</p>
            <p className="mt-3 text-[16px] leading-[26px] font-normal text-ink/80">{s.factorsLead}</p>
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {s.factors.map((f, i) => (
            <Reveal as="li" key={f.title} delay={i % 4} className="surface-on-gold group relative overflow-hidden p-6 sm:p-7">
              <span aria-hidden className="font-[family-name:var(--font-display)] text-[34px] leading-none text-gold/90">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-sub)] text-[19px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[20px]">
                {f.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[24px] font-normal text-white/75">{f.body}</p>
              <HoverRule />
            </Reveal>
          ))}
          <Reveal
            as="li"
            delay={3}
            className="flex flex-col justify-between gap-6 rounded-[14px] bg-ink p-6 ring-1 ring-gold/45 sm:p-7"
          >
            <p className="font-[family-name:var(--font-heading)] text-[21px] leading-[1.08] font-black text-gold uppercase">
              {s.statement}
            </p>
            <QuoteButton label={s.cta} inCard className="w-full" />
          </Reveal>
        </ol>
      </div>
    </section>
  );
}

/* ── 6. Our process (Section 5) ────────────────────────────────────────────
   "Visual: ASSESS ↓ PRE-CLEAN ↓ CONTROLLED REMOVAL ↓ DECONTAMINATE ↓ POLISH
   IF REQUIRED ↓ INSPECT." That line runs across the band, each stage a link
   to its step; POLISH IF REQUIRED is drawn dashed, because it is the one
   stage that may not happen. The steps are a numbered rail beside the
   polishing photograph, so the short ones and the two with lists read at
   their own length, and Step 5's IMPORTANT sits in its step. */

const stepId = (n: number) => `graffiti-step-${n}`;

function Process() {
  const s = GRAFFITI.process;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={s.heading} />
            <Kicker>{s.title}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-5">
            <p className="mt-4 text-[18px] leading-[28px] font-semibold text-white lg:mt-0">{s.intro[0]}</p>
            <p className="mt-3 text-[16px] leading-[26px] font-normal text-body">{s.intro[1]}</p>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <ol className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:mt-12 lg:grid-cols-6">
            {s.steps.map((step, i) => {
              const optional = step.flow === "Polish If Required";
              const last = i === s.steps.length - 1;
              return (
                <li key={step.flow}>
                  <a
                    href={`#${stepId(i + 1)}`}
                    className={`flex h-full min-h-[72px] flex-col justify-between gap-2 rounded-[12px] px-3 py-3 transition-colors sm:px-4 lg:px-3 xl:px-4 ${
                      optional
                        ? "border border-dashed border-gold/60 text-white hover:bg-gold/[0.08]"
                        : "bg-white/[0.04] text-white ring-1 ring-white/[0.08] hover:bg-white/[0.08]"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-display)] text-[18px] leading-none text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {!last && <Icon name="arrow" size={15} className="hidden text-white/35 lg:block" />}
                    </span>
                    {/* "DECONTAMINATE" is 109px at 15px: 14px where a tile
                        is narrowest — two across a phone, six across 1024. */}
                    <span className="font-[family-name:var(--font-sub)] text-[14px] leading-tight font-semibold tracking-[0.05em] uppercase sm:text-[15px] lg:text-[14px] xl:text-[15px]">
                      {step.flow}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal delay={1} className="lg:sticky lg:top-32">
              <figure className="surface relative overflow-hidden">
                <div className="relative aspect-[3/2] w-full lg:aspect-[4/5]">
                  <Image
                    src={PHOTOS.polishing.src}
                    alt={PHOTOS.polishing.alt}
                    fill
                    sizes="(min-width: 1024px) 36vw, 92vw"
                    className="object-cover object-[40%_50%]"
                  />
                </div>
              </figure>
            </Reveal>
          </div>

          <ol className="min-w-0 lg:col-span-7">
            {s.steps.map((step, i) => (
              <ProcessStep key={step.title} step={step} n={i + 1} last={i === s.steps.length - 1} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, n, last }: { step: Step; n: number; last: boolean }) {
  return (
    <Reveal as="li" delay={n % 3} className={`relative flex gap-4 sm:gap-6 ${last ? "" : "pb-9 sm:pb-10"}`}>
      {!last && <span aria-hidden className="absolute top-14 bottom-1 left-[23px] w-[2px] rounded-full bg-gold/25" />}
      <span
        aria-hidden
        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold font-[family-name:var(--font-display)] text-[22px] leading-none text-ink"
      >
        {n}
      </span>
      <article id={stepId(n)} className="min-w-0 flex-1 scroll-mt-32 pt-1">
        <p className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.2em] text-white/55 uppercase">
          Step {n} · {step.flow}
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-sub)] text-[21px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[23px]">
          {step.title}
        </h3>
        {step.body.map((p) => (
          <p key={p} className="mt-2.5 max-w-[62ch] text-[15.5px] leading-[25px] font-normal text-white/75">
            {p}
          </p>
        ))}
        {step.list && (
          <div className="mt-4 rounded-[12px] bg-white/[0.04] px-5 py-4 ring-1 ring-white/[0.07]">
            <p
              className={`text-[14.5px] leading-[21px] font-semibold text-gold [&_a]:text-gold ${LINKS}`}
              dangerouslySetInnerHTML={{ __html: step.list.leadHtml }}
            />
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 sm:gap-x-6">
              {step.list.items.map((li) => (
                <li key={li} className="flex gap-2.5 text-[14.5px] leading-[21px] font-normal text-white/85">
                  <span className="mt-px">
                    <Tick size={18} />
                  </span>
                  {li}
                </li>
              ))}
            </ul>
          </div>
        )}
        {step.after?.map((p) => (
          <p key={p} className="mt-3.5 max-w-[62ch] text-[15.5px] leading-[25px] font-semibold text-white">
            {p}
          </p>
        ))}
        {step.important && (
          <Important title={step.important.title} className="mt-5">
            {step.important.body.map((p, i) => (
              <p
                key={p}
                className={`mt-2.5 text-[15px] leading-[23px] ${i === 0 ? "font-semibold text-white" : "font-normal text-white/75"}`}
              >
                {p}
              </p>
            ))}
          </Important>
        )}
      </article>
    </Reveal>
  );
}

/* ── 7. What if the paint is damaged? (Section 7) ─────────────────────────
   "Important expectation-setting section." What graffiti can leave behind,
   then the brief's "However:" leading into its capitals — COMPLETE
   RESTORATION CANNOT BE GUARANTEED — set as the band's one dark panel, at
   the size of a section heading, with the bodyshop line under it. */

function Damage() {
  const d = GRAFFITI.damage;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <SectionHead title={d.heading} tone="gold" />
          <Kicker onGold>{d.title}</Kicker>
          <Reveal delay={3}>
            <p className="mt-5 text-[18px] leading-[28px] font-semibold text-ink">{d.lead}</p>
            <Label onGold className="mt-7">
              {d.listLead}
            </Label>
            <Dots items={d.list} onGold className="mt-2" />
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-6 lg:self-center">
          <p className="border-l-2 border-ink pl-4 text-[17px] leading-[26px] font-semibold text-ink">{d.removing}</p>
          <Prose html={d.suitableHtml} onGold space="mt-4" />
          <div className="relative mt-7 overflow-hidden rounded-[16px] bg-ink p-6 ring-1 ring-gold/40 sm:p-8 lg:p-10">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(60% 90% at 85% 100%, rgba(193,146,49,0.14) 0%, transparent 70%)" }}
            />
            <p className="relative font-[family-name:var(--font-sub)] text-[17px] tracking-[0.04em] text-white/60 uppercase">
              {d.however}
            </p>
            <p className="relative mt-2 font-[family-name:var(--font-heading)] text-[25px] leading-[1.05] font-black text-gold uppercase min-[400px]:text-[29px] sm:text-[38px] lg:text-[34px] xl:text-[42px]">
              {d.statement}
            </p>
            <p className="relative mt-5 max-w-[60ch] text-[15.5px] leading-[25px] font-normal text-white/75">
              {d.bodyshop}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 8. Special surfaces (Sections 8, 9, 10) ──────────────────────────────
   "SPECIAL SURFACES — Cards: PAINTWORK, PLASTIC, GLASS, WRAP, PPF." The
   brief writes those five as three sections — repainted panels (the
   paintwork), plastic, trim & other surfaces (plastic and glass), wrapped &
   PPF vehicles — so the band is three cards side by side, each with its own
   h2 and the layout's names for what it covers as its tags. */

function SurfaceCard({
  s,
  delay = 0,
  className = "",
  children,
}: {
  s: { id: string; tags: string[]; heading: string; title: string };
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="article" delay={delay} className={`surface flex min-w-0 scroll-mt-28 flex-col p-6 sm:p-8 ${className}`}>
      <div id={s.id} className="scroll-mt-28">
        <ul className="flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <li
              key={t}
              className="rounded-full bg-gold/12 px-3 py-1 font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.18em] text-gold uppercase ring-1 ring-gold/35"
            >
              {t}
            </li>
          ))}
        </ul>
        <h2 className="mt-6 text-[26px] leading-[1.05] text-white sm:text-[30px] xl:text-[32px]">{s.heading}</h2>
        <p className="mt-4 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.03em] text-gold uppercase lg:text-[18px]">
          {s.title}
        </p>
      </div>
      {children}
    </Reveal>
  );
}

function Surfaces() {
  const r = GRAFFITI.repainted;
  const s = GRAFFITI.surfaces;
  const w = GRAFFITI.wrapped;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell grid gap-5 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        <SurfaceCard s={r}>
          <p className="mt-5 text-[16px] leading-[24px] font-semibold text-white">{r.important}</p>
          <p className="mt-2 text-[15.5px] leading-[25px] font-normal text-white/75">{r.body}</p>
          <p className="mt-5 text-[15.5px] leading-[23px] font-semibold text-white/90">{r.listLead}</p>
          <Chips items={r.list} className="mt-3" />
          <p className="mt-4 border-l-2 border-gold pl-4 text-[16px] leading-[24px] font-semibold text-white">{r.after}</p>
          <div className="mt-6 rounded-[12px] bg-white/[0.04] p-5 ring-1 ring-white/[0.08]">
            <p className="font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.22em] text-gold uppercase">
              {r.why.title}
            </p>
            <p className="mt-2 text-[15px] leading-[24px] font-normal text-white/80">{r.why.body}</p>
          </div>
          <p
            className={`mt-5 text-[15px] leading-[24px] font-normal text-white/75 [&_a]:text-gold [&_a]:decoration-gold/50 [&_strong]:font-semibold [&_strong]:text-white ${LINKS}`}
            dangerouslySetInnerHTML={{ __html: r.notSureHtml }}
          />
        </SurfaceCard>

        <SurfaceCard s={s} delay={1}>
          <p className="mt-5 text-[15.5px] leading-[23px] font-semibold text-white/90">{s.lead}</p>
          <Chips items={s.list} className="mt-3" />
          <p className="mt-5 text-[15.5px] leading-[25px] font-normal text-white/75">{s.body}</p>
          <Important title={s.important.title} className="mt-6">
            {s.important.body.map((p) => (
              <p key={p} className="mt-2.5 text-[15px] leading-[23px] font-normal text-white/85">
                {p}
              </p>
            ))}
          </Important>
          <p className="mt-5 text-[15.5px] leading-[24px] font-semibold text-white">{s.after}</p>
        </SurfaceCard>

        <SurfaceCard s={w} delay={2} className="lg:col-span-2 xl:col-span-1">
          <p className="mt-5 text-[15.5px] leading-[23px] font-semibold text-white/90">{w.lead}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {w.list.map((c) => (
              <li
                key={c}
                className="rounded-full bg-white/[0.05] px-3.5 py-1.5 text-[14px] leading-[20px] font-normal text-white/85 ring-1 ring-white/[0.1] [&_a]:font-semibold [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2"
                dangerouslySetInnerHTML={{ __html: c }}
              />
            ))}
          </ul>
          {w.body.map((p, i) => (
            <p
              key={p}
              className={`mt-4 text-[15.5px] leading-[25px] ${
                i === w.body.length - 1
                  ? "border-l-2 border-gold pl-4 font-semibold text-white"
                  : "font-normal text-white/75"
              }`}
            >
              {p}
            </p>
          ))}
        </SurfaceCard>
      </div>
    </section>
  );
}

/* ── Section 11 — What not to do before we arrive ─────────────────────────
   Not in the layout list; in the copy it sits between the surfaces and the
   price, which is where it is. The six "don'ts" as cards, and THE SAFEST
   FIRST STEP as the band's one dark bar with the button. */

function Avoid() {
  const a = GRAFFITI.avoid;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={a.heading} tone="gold" />
            <Kicker onGold>{a.title}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-5">
            <p className="mt-4 text-[18px] leading-[28px] font-semibold text-ink lg:mt-0">{a.lead}</p>
            <p className="mt-3 text-[16px] leading-[26px] font-normal text-ink/80">{a.listLead}</p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {a.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i % 3} className="surface-on-gold group relative overflow-hidden p-6 sm:p-7">
              <div className="flex items-center gap-3.5">
                <Cross size={36} />
                <h3 className="font-[family-name:var(--font-sub)] text-[19px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[20px]">
                  {it.title}
                </h3>
              </div>
              <p className="mt-4 text-[15px] leading-[24px] font-normal text-white/75">{it.body}</p>
              <HoverRule />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={1}>
          <div className="mt-6 flex flex-col gap-6 rounded-[16px] bg-ink p-6 ring-1 ring-gold/40 sm:p-8 lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <Disc name="camera" size={52} solid />
              <div>
                <p className="font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.22em] text-gold uppercase">
                  {a.safest.label}
                </p>
                <p className="mt-2 font-[family-name:var(--font-heading)] text-[22px] leading-[1.08] font-black text-white uppercase sm:text-[28px] lg:text-[32px]">
                  {a.safest.line}
                </p>
              </div>
            </div>
            <QuoteButton label={a.safest.cta} className="w-full shrink-0 lg:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 9. Pricing (Section 12) ───────────────────────────────────────────────
   "PRICING — INDIVIDUALLY QUOTED · PHOTOS REQUIRED · [GET QUOTE]." Where
   another page has a price card, this one has the brief's two lines in the
   same place: the section's own heading set at a price's size, PHOTOS
   REQUIRED under it, and the copy's closing line and two buttons. The
   eleven things a quotation depends on are the left column. */

function Cost() {
  const c = GRAFFITI.cost;
  return (
    <section id="graffiti-cost" className="w-full scroll-mt-24 py-16 lg:py-[104px]">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-7">
          <SectionHead title={c.heading} />
          <Reveal delay={2}>
            <p
              className="measure mt-6 text-[18px] leading-[28px] font-semibold text-white [&_strong]:font-bold [&_strong]:text-gold"
              dangerouslySetInnerHTML={{ __html: c.leadHtml }}
            />
            <Label className="mt-7">{c.factorsLead}</Label>
            <Dots items={c.factors} className="mt-2" />
          </Reveal>
        </div>

        <Reveal delay={2} className="min-w-0 lg:col-span-5 lg:self-center">
          <div className="surface relative overflow-hidden p-6 sm:p-8 lg:p-9">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(70% 50% at 100% 0%, rgba(193,146,49,0.16) 0%, transparent 70%)" }}
            />
            {/* Sized so "INDIVIDUALLY" fits the card at every width: 208px at
                30px in a 320px phone's 234, 222 at 32px in the 238 a
                1024px laptop leaves, 305 at 44px in the 342 at 1280. */}
            <h3 className="relative font-[family-name:var(--font-heading)] text-[30px] leading-[0.98] font-black text-gold uppercase min-[400px]:text-[36px] sm:text-[48px] lg:text-[32px] xl:text-[44px]">
              {c.title}
            </h3>
            <p className="relative mt-5 inline-flex items-center gap-2.5 rounded-full bg-gold/[0.1] py-1.5 pr-4 pl-1.5 font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.16em] text-white uppercase ring-1 ring-gold/40">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                <Icon name="camera" size={15} strokeWidth={2} />
              </span>
              {c.photosRequired}
            </p>
            <p className="relative mt-7 border-t border-white/[0.08] pt-6 font-[family-name:var(--font-sub)] text-[18px] leading-tight font-semibold tracking-[0.03em] text-white uppercase sm:text-[20px]">
              {c.closing}
            </p>
            <div className="relative mt-6 flex flex-col gap-3">
              <QuoteButton label={c.quoteLabel} className="w-full" />
              <WhatsAppButton label={c.whatsappLabel} className="w-full" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 10. Cars / vans / commercial (Section 13) ─────────────────────────────
   "Three visual cards." The copy names four — cars, vans, company vehicles,
   fleet vehicles — and all four are here, with FLEET / COMMERCIAL ENQUIRY
   as the band's button. There is no photograph of a van being worked on, so
   the cards are marked rather than photographed. */

const VEHICLE_MARKS: Record<string, IconName | Glyph> = {
  Cars: "car",
  Vans: "van",
  "Company Vehicles": "sign",
  "Fleet Vehicles": "layers",
};

function Vehicles() {
  const v = GRAFFITI.vehicles;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
            <SectionHead title={v.heading} tone="gold" />
            <Kicker onGold>{v.title}</Kicker>
            <Reveal delay={3}>
              <p className="mt-5 text-[17px] leading-[27px] font-semibold text-ink">{v.lead}</p>
            </Reveal>
          </div>
          <Reveal delay={3} className="w-full shrink-0 sm:w-auto">
            <QuoteButton label={v.cta} tone="dark" className="w-full sm:w-auto" />
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {v.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i} className="surface-on-gold group relative overflow-hidden p-6 sm:p-7">
              <div
                aria-hidden
                className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(193,146,49,0.16),transparent_70%)]"
              />
              <Disc name={VEHICLE_MARKS[it.title] ?? "check"} size={58} />
              <h3 className="relative mt-6 font-[family-name:var(--font-sub)] text-[21px] leading-tight tracking-[0.02em] text-white uppercase">
                {it.title}
              </h3>
              <p className="relative mt-3 text-[15px] leading-[24px] font-normal text-white/75">{it.body}</p>
              <HoverRule />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 11. Why Medusa (Section 14) ───────────────────────────────────────────
   "Short trust section." Seven cards: four over three from `xl`, on a
   twelve-track grid so the second row fills the width. */

const WHY_MARKS: Record<string, IconName | Glyph> = {
  "Mobile Service": "van",
  "Controlled Process": "target",
  "Paintwork Experience": "shield",
  "Polishing Available Where Required": "spark",
  "Cars & Commercial Vehicles": "car",
  "Photo-Based Quotations": "camera",
  "Realistic Expectations": "gauge",
};

function WhyMedusa() {
  const w = GRAFFITI.why;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionHead title={w.heading} />
            <Kicker>{w.title}</Kicker>
          </div>
          <Reveal delay={3} className="w-full shrink-0 sm:w-auto">
            <QuoteButton label={w.cta} className="w-full sm:w-auto" />
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-12 xl:gap-5">
          {w.items.map((it, i) => (
            <Reveal
              as="li"
              key={it.title}
              delay={i % 4}
              className={`surface group relative overflow-hidden p-6 sm:p-7 ${i < 4 ? "xl:col-span-3" : "xl:col-span-4"} ${
                i === w.items.length - 1 ? "sm:col-span-2 xl:col-span-4" : ""
              }`}
            >
              <div className="flex items-center gap-4 sm:block">
                <Disc name={WHY_MARKS[it.title] ?? "check"} size={50} />
                <h3 className="font-[family-name:var(--font-sub)] text-[19px] leading-tight text-white uppercase sm:mt-6 sm:text-[20px]">
                  {it.title}
                </h3>
              </div>
              <p
                className={`mt-3 text-[15px] leading-[25px] ${
                  it.title === "Realistic Expectations" ? "font-semibold text-white" : "font-normal text-white/75"
                } [&_a]:text-gold [&_a]:decoration-gold/50 ${LINKS}`}
                dangerouslySetInnerHTML={{ __html: it.body }}
              />
              <HoverRule />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 14. The quote form ────────────────────────────────────────────────────
   "QUOTE FORM — This is the main conversion section. Set anchor:
   #get-graffiti-removal-quote." Beside the form, holding still from `lg`,
   the brief's seven messages "the customer needs to understand", in order —
   the first what not to do, the last what cannot be promised, the five
   between what happens once the photographs arrive — and the two other ways
   in, WhatsApp and the phone. */

function Quote() {
  const q = GRAFFITI.quote;
  const first = q.messages[0];
  const last = q.messages[q.messages.length - 1];
  const steps = q.messages.slice(1, -1);
  return (
    <section id={FORM_ANCHOR} className="w-full scroll-mt-20 py-16 lg:scroll-mt-24 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead title={q.heading} />
            <Kicker>{q.title}</Kicker>
            <Reveal delay={3}>
              <p className="mt-6 flex items-start gap-3 text-[16px] leading-[24px] font-semibold text-white">
                <Cross size={24} />
                {first}
              </p>
              <ol className="mt-5">
                {steps.map((m, i) => {
                  const end = i === steps.length - 1;
                  return (
                    <li key={m} className={`relative flex items-center gap-4 ${end ? "" : "pb-3.5"}`}>
                      {!end && <span aria-hidden className="absolute top-9 bottom-0 left-[17px] w-px bg-white/15" />}
                      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/12 font-[family-name:var(--font-display)] text-[17px] leading-none text-gold ring-1 ring-gold/35">
                        {i + 1}
                      </span>
                      <span className="font-[family-name:var(--font-sub)] text-[16px] leading-tight font-semibold tracking-[0.03em] text-white uppercase">
                        {m}
                      </span>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-6 flex gap-3 rounded-[12px] bg-gold/[0.07] px-4 py-3.5 text-[15px] leading-[22px] font-semibold text-white ring-1 ring-gold/40">
                <Icon name="info" size={19} className="mt-px shrink-0 text-gold" />
                {last}
              </p>
              <div className="mt-8 hidden flex-col gap-4 lg:flex">
                <WhatsAppButton label={q.whatsappLabel} className="self-start" />
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="link-inline self-start text-[15px] font-semibold text-white hover:text-gold"
                >
                  <Icon name="phone" size={17} className="text-gold" />
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  data-track={TRACK.email}
                  className="link-inline self-start text-[15px] font-semibold text-white normal-case hover:text-gold"
                >
                  <Icon name="mail" size={17} className="text-gold" />
                  {CONTACT.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <GraffitiQuoteForm
            id={`${FORM_ANCHOR}-form`}
            thanks={GRAFFITI.thanks}
            whatsapp={WHATSAPP}
            events={{ submitted: TRACK.submitted, photoUpload: TRACK.photoUpload }}
          />
        </div>
      </div>
    </section>
  );
}

/* ── 15 & 16. FAQ · Important service information ─────────────────────────
   "FAQ — Accordion." Then "IMPORTANT INFORMATION — Service limitations":
   the six, in the brief's order, as the band's one dark panel — its own
   heading, its own place on the page, without a second gold band beside
   the first. */

function Faq() {
  const f = GRAFFITI.faq;
  const t = GRAFFITI.terms;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        {/* Side by side only from `xl`, and five columns to seven: at 50px
            "FREQUENTLY" is 321px wide, more than a four-column head is
            below 1440. */}
        <div className="grid gap-10 xl:grid-cols-12 xl:gap-16">
          <div className="xl:col-span-5">
            <div className="xl:sticky xl:top-32">
              <SectionHead title={f.heading} tone="gold" />
            </div>
          </div>
          <div className="min-w-0 xl:col-span-7">
            <FaqAccordion items={f.items} onGold />
          </div>
        </div>

        <Reveal delay={1}>
          <div id="graffiti-service-information" className="mt-14 scroll-mt-28 rounded-[16px] bg-ink p-6 sm:p-8 lg:mt-20 lg:p-12">
            <span aria-hidden className="block h-[3px] w-[52px] rounded-full bg-gold" />
            <h2 className="mt-6 text-[26px] leading-[1.05] text-white sm:text-[34px] lg:text-[40px]">{t.heading}</h2>
            <p className="mt-4 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.03em] text-gold uppercase lg:text-[20px]">
              {t.title}
            </p>
            <ol className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {t.items.map((it, i) => (
                <li key={it.title} className="flex gap-4 border-t border-white/[0.08] py-5">
                  <span
                    aria-hidden
                    className="w-7 shrink-0 font-[family-name:var(--font-display)] text-[19px] leading-[23px] text-gold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.03em] text-white uppercase">
                      {it.title}
                    </h3>
                    {it.body.map((p) => (
                      <p key={p} className="mt-2 text-[15px] leading-[23px] font-normal text-white/75">
                        {p}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 17. Final CTA (Section 18) ────────────────────────────────────────────
   The copy's order on a phone — the question, DON'T RISK MAKING IT WORSE,
   the sentence, the five things Medusa assesses, the closing line, both
   buttons — and from `lg` the five beside the rest as one card. The sticky
   bar steps aside while it is on screen. */

function FinalCta() {
  const f = GRAFFITI.finalCta;
  return (
    <section
      id="graffiti-final"
      className="cut-top relative w-full overflow-hidden bg-ink-panel pt-[calc(var(--cut)+4rem)] pb-16 lg:pb-[104px]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(80% 90% at 50% 0%, rgba(193,146,49,0.16) 0%, transparent 62%)" }}
      />
      <div className="shell relative grid gap-x-14 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:col-start-1">
          <SectionHead title={f.heading} />
          <Reveal delay={2}>
            <p className="mt-5 font-[family-name:var(--font-heading)] text-[24px] leading-[1.05] font-black text-gold uppercase sm:text-[32px]">
              {f.strap}
            </p>
            <p className="measure mt-5 text-[17px] leading-[28px] font-normal text-body">{f.body}</p>
          </Reveal>
        </div>

        <Reveal
          delay={2}
          className="mt-8 min-w-0 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center"
        >
          <div className="surface overflow-hidden">
            <p className="px-6 pt-6 font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.22em] text-gold uppercase sm:px-7">
              {f.assessLead}
            </p>
            <ul className="mt-3 divide-y divide-white/[0.07]">
              {f.assess.map((a) => (
                <li key={a} className="flex items-center gap-3.5 px-6 py-3.5 sm:px-7">
                  <Tick size={22} />
                  <strong className="font-[family-name:var(--font-sub)] text-[15.5px] leading-tight font-semibold tracking-[0.03em] text-white">
                    {a}
                  </strong>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-1">
          <Reveal delay={3}>
            <p className="mt-9 flex items-center gap-2.5 font-[family-name:var(--font-sub)] text-[18px] leading-tight font-semibold tracking-[0.04em] text-white uppercase sm:text-[20px]">
              <Icon name="pin" size={20} className="shrink-0 text-gold" />
              {f.closing}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <QuoteButton label={f.quoteLabel} className="w-full sm:w-auto" />
              <WhatsAppButton label={f.whatsappLabel} className="w-full sm:w-auto" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
