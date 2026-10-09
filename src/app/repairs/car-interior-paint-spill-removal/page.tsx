import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Icon, { type IconName } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PaintSpillQuoteForm from "@/components/PaintSpillQuoteForm";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import StickyBookBar from "@/components/StickyBookBar";
import TrackClicks from "@/components/TrackClicks";
import Testimonials from "@/components/sections/Testimonials";
import { getPage } from "@/lib/blocks";
import { FORM_ANCHOR, type Item, PAINT, PATH, PHOTOS, type Photo, QUOTE, SLUG, type Step, TRACK } from "@/lib/paint-spill";
import { pageSchema } from "@/lib/schema";
import { CONTACT } from "@/lib/site";

/**
 * Car interior paint spill removal — rebuilt from the client's brief.
 *
 * Client, 2026-10-06: "Completely replace the existing Paint Overspray
 * Removal page", at a new URL, "specifically for: PAINT SPILLED INSIDE A
 * VEHICLE". Every word is in `lib/paint-spill.ts` and the quote form's in
 * `lib/paint-spill-quote.ts`; this file is only layout, in the order of the
 * brief's "ELEMENTOR PAGE STRUCTURE":
 *
 *   1 hero · 2 the urgent action bar and what to do (S2) · 3 common areas
 *   (S4) · 4 wet vs dried (S5), then the paint types (S6) · 5 how deep paint
 *   travels (S3) · 6 the process (S7) · 7 results and limitations (S8, with
 *   S9 when replacement is better) · the DIY attempts (S10) · 9 why quote
 *   only (S12) · 10 why Medusa, with mobile across London (S14, S13) · 11
 *   reviews · 12 the quote form · 13 FAQ, with 14 the service information
 *   (S16) · 15 the closing band (S17).
 *
 * Item 8, "BEFORE & AFTER — Genuine Medusa jobs", is not here: there are
 * none yet (see `lib/paint-spill.ts`). The structure lists S3 after S4 and
 * S5, and places neither S6, S9, S10 nor S13; those sit beside the section
 * they belong with, in the copy's own order.
 *
 * Three pairs share a band — S8 and S9 (both what the result can and cannot
 * be), S14 and S13 (both why Medusa), the FAQ and S16 (both the small print)
 * — which is what lets gold and ink alternate the whole way down (client,
 * 2026-09-22: "pastikan warna bg tetap selang seling"), put the quote form on
 * ink like every enquiry form on the site, and end on gold over the ink close.
 *
 * What decided the shape is the brief's hero note — "Immediately
 * communicate: SPILLED PAINT INSIDE YOUR CAR? · MOBILE PAINT SPILL REMOVAL
 * LONDON · SEND PHOTOS NOW · [GET QUOTE] [WHATSAPP]" — and "12 — QUOTE FORM
 * — This should be the PRIMARY conversion point … All GET QUOTE buttons
 * should scroll here." So the h1, the question, SEND US PHOTOS FOR A QUOTE
 * and both buttons are above the fold on a 375x812 phone; every quote button
 * is `#get-paint-spill-quote`; nothing books ("Not: BOOK NOW. This service
 * needs assessment first"), and the phone's sticky bar is SEND PHOTOS |
 * WHATSAPP.
 *
 * The route wins over `app/[...slug]` because a static segment outranks a
 * catch-all; the slug belongs in `CUSTOM_ROUTES` so only one page is built.
 */

const WHATSAPP = PAINT.whatsapp;

export function generateMetadata(): Metadata {
  const { title, description } = PAINT.seo;
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

export default function PaintSpillRemovalPage() {
  const page = getPage(SLUG);
  if (!page) notFound();

  return (
    <>
      {/* "Service schema · FAQPage schema · Use London/service-area
          information accurately. Do not add unsupported ratings." — no
          offer, since nothing is priced, and no rating. */}
      <JsonLd
        data={pageSchema(page, {
          service: {
            slug: SLUG,
            name: "Car Interior Paint Spill Removal",
            serviceType: "Car interior paint spill removal",
            description: PAINT.seo.description,
            image: PHOTOS.hero.src,
          },
          faq: PAINT.faq.items,
        })}
      />
      <TrackClicks />

      <Header />
      <main className="flex-1">
        <Hero />
        <Emergency />
        <Locations />
        <WetDry />
        <PaintTypes />
        <Depth />
        <Process />
        <Results />
        <Diy />
        <Pricing />
        <WhyMedusa />
        <Testimonials />
        <Quote />
        <FaqAndTerms />
        <FinalCta />
      </main>
      <Footer />

      {/* "MOBILE STICKY CTA — Use: SEND PHOTOS | WHATSAPP". It steps aside
          over the form and over the closing band, which carry the same two. */}
      <StickyBookBar
        primary={{ label: PAINT.sticky.primary, href: QUOTE, track: TRACK.quote }}
        secondary={{ label: PAINT.sticky.secondary, href: WHATSAPP, icon: "whatsapp", external: true }}
        after="paint-hero-actions"
        hideOver={[FORM_ANCHOR, "paint-final"]}
      />
    </>
  );
}

/* ── Shared pieces ──────────────────────────────────────────────────────── */

/** Every GET QUOTE on the page: the form, never a booking. */
function QuoteButton({
  label,
  tone = "gold",
  inCard,
  className = "",
}: {
  label: string;
  tone?: "gold" | "dark";
  /** At the foot of a card, where a long label has to wrap rather than run
   *  past the button's edge. */
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

function WhatsAppButton({ label, onGold, className = "" }: { label: string; onGold?: boolean; className?: string }) {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn min-h-[52px] rounded-full px-5 text-[14px] sm:px-7 sm:text-[15px] sm:whitespace-nowrap ${
        onGold
          ? "text-ink shadow-[inset_0_0_0_2px_rgb(0_0_0/0.8)] hover:-translate-y-0.5 hover:bg-ink hover:text-white"
          : "btn-outline"
      } ${className}`}
    >
      <Icon name="whatsapp" size={19} className="mr-2.5 shrink-0" />
      {label}
    </a>
  );
}

/* The brief gives every section a name and then a heading — "SECTION 5 —
   WET PAINT VS DRIED PAINT" over "Has the Paint Already Dried?". The name is
   the h2, as on the other rebuilt pages; the heading is the line under it,
   in the condensed face. */
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

/** The internal links, laid on the brief's own words. */
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
          ? "text-ink/80 [&_a]:text-ink [&_strong]:font-semibold [&_strong]:text-ink"
          : "text-body [&_a]:text-gold [&_strong]:font-semibold [&_strong]:text-white"
      } ${LINKS} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
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

function Tick({ size = 20 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"
      style={{ width: size, height: size }}
    >
      <Icon name="check" size={Math.round(size * 0.6)} strokeWidth={2.8} />
    </span>
  );
}

/** A list the brief writes as bullets, in two columns once there is room. */
function Dots({
  items,
  onGold,
  cols = "sm:grid-cols-2",
  className = "",
}: {
  items: readonly string[];
  onGold?: boolean;
  cols?: string;
  className?: string;
}) {
  return (
    <ul className={`grid ${cols} sm:gap-x-8 ${className}`}>
      {items.map((f) => (
        <li
          key={f}
          className={`flex gap-3 border-b py-2.5 text-[14.5px] leading-[21px] font-normal ${
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

/** Short items as chips — what was used, what was spilled. */
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

/** The bottom-edge gold rule every card on the site draws on hover. */
function HoverRule() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
    />
  );
}

/* ── This page's own marks ─────────────────────────────────────────────────
   Five the shared set does not have, drawn on its grid — 24px, the 1.75
   stroke, round caps and joins, `currentColor` — so they can move into
   `components/Icon.tsx` as they are. */

type LocalIconName = "tin" | "stitch" | "foam" | "plastic" | "stop";

const LOCAL_PATHS: Record<LocalIconName, React.ReactNode> = {
  /* A paint tin, handle up, a run down its side. */
  tin: (
    <>
      <path d="M6.5 8.5C6.5 4.8 17.5 4.8 17.5 8.5" />
      <path d="M5 8.5h14v10.2a1.3 1.3 0 0 1-1.3 1.3H6.3A1.3 1.3 0 0 1 5 18.7V8.5Z" />
      <path d="M9 8.5v3.8a1.1 1.1 0 0 0 2.2 0V10" />
    </>
  ),
  /* Two panels meeting at a seam, stitched across it. */
  stitch: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <path d="M12 5v14" />
      <path d="M10.3 7.8h3.4M10.3 10.6h3.4M10.3 13.4h3.4M10.3 16.2h3.4" />
    </>
  ),
  /* A block of seat foam, open-celled. */
  foam: (
    <>
      <rect x="3.5" y="7.5" width="17" height="10" rx="2" />
      <circle cx="7.6" cy="11" r="1" />
      <circle cx="11.6" cy="14" r="1.3" />
      <circle cx="16" cy="11.2" r="1.1" />
    </>
  ),
  /* A dashboard and its vent — the interior's moulded plastics. */
  plastic: (
    <>
      <path d="M3.5 18.5V12A4.5 4.5 0 0 1 8 7.5h8a4.5 4.5 0 0 1 4.5 4.5v6.5" />
      <rect x="8" y="11.5" width="8" height="4" rx="1" />
      <path d="M10.7 11.5v4M13.3 11.5v4" />
    </>
  ),
  /* Stop, as the road sign draws it. */
  stop: (
    <>
      <path d="M8.3 3.5h7.4l4.8 4.8v7.4l-4.8 4.8H8.3l-4.8-4.8V8.3l4.8-4.8Z" />
      <path d="M8 12h8" />
    </>
  ),
};

type GlyphName = IconName | LocalIconName;

/** A mark from either set; `ban` strikes it through — "DON'T SCRUB IT". */
function Glyph({
  name,
  size = 20,
  strokeWidth = 1.75,
  ban,
  className,
}: {
  name: GlyphName;
  size?: number;
  strokeWidth?: number;
  ban?: boolean;
  className?: string;
}) {
  const svg =
    name in LOCAL_PATHS ? (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        focusable="false"
      >
        {LOCAL_PATHS[name as LocalIconName]}
      </svg>
    ) : (
      <Icon name={name as IconName} size={size} strokeWidth={strokeWidth} />
    );
  if (!ban) return <span className={`inline-flex ${className ?? ""}`}>{svg}</span>;
  return (
    <span className={`relative inline-flex ${className ?? ""}`}>
      {svg}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth + 0.5}
        strokeLinecap="round"
        aria-hidden
        className="absolute inset-0"
      >
        <path d="M3.5 3.5l17 17" />
      </svg>
    </span>
  );
}

function IconDisc({
  name,
  size = 46,
  solid,
  ban,
}: {
  name: GlyphName;
  size?: number;
  solid?: boolean;
  ban?: boolean;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ${
        solid ? "bg-gold text-ink" : "bg-gold/12 text-gold ring-1 ring-gold/35"
      }`}
      style={{ width: size, height: size }}
    >
      <Glyph name={name} size={Math.round(size * 0.46)} ban={ban} />
    </span>
  );
}

/** A photograph filling the box it is given. */
function FillPhoto({
  photo,
  sizes,
  className = "",
  position = "50% 50%",
  priority,
}: {
  photo: Photo;
  sizes: string;
  className?: string;
  position?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

/* ── 1. Hero ──────────────────────────────────────────────────────────────
   "Immediately communicate: SPILLED PAINT INSIDE YOUR CAR? · MOBILE PAINT
   SPILL REMOVAL LONDON · SEND PHOTOS NOW · [GET QUOTE] [WHATSAPP]".

   One grid, whose DOM order is the phone's: the h1, the question, the
   opening line, SEND US PHOTOS FOR A QUOTE and both buttons — all above the
   fold at 375x812 — then the card with the photograph and the brief's seven
   ticks, then the rest of the copy and its IMPORTANT note. From `lg` the
   card is pinned to the right-hand column across every row. */

function Hero() {
  const h = PAINT.hero;
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
              <p className="mt-4 max-w-[40ch] font-[family-name:var(--font-sub)] text-[17px] leading-[1.3] font-semibold tracking-[0.03em] text-gold sm:text-[19px] xl:mt-5 xl:text-[21px]">
                {h.subtitle}
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p className="mt-5 max-w-[52ch] text-[17px] leading-[27px] font-semibold text-white xl:text-[19px] xl:leading-[30px]">
                {h.lead}
              </p>
            </Reveal>
          </div>

          {/* "SEND US PHOTOS FOR A QUOTE" and its two buttons. */}
          <Reveal delay={4} className="lg:col-span-7 lg:col-start-1">
            <div className="mt-7 lg:mt-8">
              <p className="inline-flex items-center gap-2.5 rounded-full bg-gold/[0.09] py-2 pr-4 pl-2 font-[family-name:var(--font-ui)] text-[11.5px] leading-[16px] font-semibold tracking-[0.16em] text-white uppercase ring-1 ring-gold/40 sm:text-[12px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                  <Icon name="camera" size={15} strokeWidth={2} />
                </span>
                {h.photosLine}
              </p>
              <div id="paint-hero-actions" className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <QuoteButton label={h.quoteLabel} className="w-full sm:w-auto" />
                <WhatsAppButton label={h.whatsappLabel} className="w-full sm:w-auto" />
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={4}
            className="mt-10 lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:self-center"
          >
            <HeroCard />
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-1">
            <Reveal delay={4}>
              {h.body.map((html, i) => (
                <p
                  key={html}
                  className={`max-w-[60ch] text-[16px] leading-[27px] font-normal text-white/80 [&_strong]:font-semibold [&_strong]:text-white ${
                    i ? "mt-4" : "mt-9 lg:mt-10 lg:border-t lg:border-white/10 lg:pt-8"
                  }`}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ))}
            </Reveal>
            <Reveal delay={5}>
              <div className="mt-8 flex max-w-[680px] gap-4 rounded-[14px] bg-gold/[0.08] p-5 ring-1 ring-gold/40 sm:p-6">
                <IconDisc name="warning" size={40} solid />
                <div>
                  <p className="font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.22em] text-gold uppercase">
                    {h.important.title}
                  </p>
                  <p className="mt-2 text-[16px] leading-[25px] font-semibold text-white">{h.important.strong}</p>
                  <p className="mt-2 text-[14.5px] leading-[23px] font-normal text-white/70">{h.important.body}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCard() {
  const c = PAINT.hero.card;
  return (
    /* Photograph over the ticks in the hero's column and on a phone; side
       by side on a tablet, where a stacked card ran a tall picture across
       the full width. */
    <figure className="surface relative overflow-hidden md:grid md:grid-cols-2 lg:block">
      <FillPhoto
        photo={PHOTOS.hero}
        priority
        sizes="(min-width: 1024px) 38vw, (min-width: 768px) 46vw, 92vw"
        position="50% 60%"
        className="aspect-[3/2] md:aspect-auto md:min-h-[300px] lg:aspect-[16/10] lg:min-h-0"
      />
      <figcaption className="p-5 sm:p-6">
        <h2 className="font-[family-name:var(--font-sub)] text-[19px] leading-tight tracking-[0.03em] text-white uppercase sm:text-[21px]">
          {c.title}
        </h2>
        <ul className="mt-4 grid gap-x-4 gap-y-2.5 sm:grid-cols-2 md:grid-cols-1">
          {c.ticks.map((t) => (
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

/* ── 2. Urgent action bar · Paint spill emergency? ─────────────────────────
   "2 — URGENT ACTION BAR — Use a prominent strip: DON'T SCRUB IT. DON'T
   APPLY RANDOM SOLVENTS. STOP IT SPREADING. TAKE PHOTOS. CONTACT MEDUSA."
   The strip opens the band, in its own order, the two don'ts struck
   through; Section 2's five steps follow it as cards, the fifth — what to
   tell us, and both buttons — the band's one wide card. */

const STRIP_ICONS: { name: GlyphName; ban?: boolean }[] = [
  { name: "brush", ban: true },
  { name: "tin", ban: true },
  { name: "stop" },
  { name: "camera" },
  { name: "whatsapp" },
];

const STEP_ICONS: Record<string, { name: GlyphName; ban?: boolean }> = {
  "Stop It Spreading": { name: "stop" },
  "Don't Start Scrubbing": { name: "brush", ban: true },
  "Don't Apply Random Solvents": { name: "tin", ban: true },
  "Take Photos": { name: "camera" },
  "Contact Medusa": { name: "whatsapp" },
};

function Emergency() {
  const e = PAINT.emergency;
  const steps = e.steps.slice(0, 4);
  const contact = e.steps[4];
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <Reveal>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[16px] bg-white/[0.09] shadow-[0_30px_60px_-34px_rgba(0,0,0,0.7)] sm:grid-cols-6 lg:grid-cols-5">
            {e.strip.map((s, i) => {
              const icon = STRIP_ICONS[i];
              return (
                <li
                  key={s}
                  className={`flex flex-col items-start gap-3 bg-ink px-4 py-5 sm:flex-row sm:items-center sm:px-5 lg:flex-col lg:items-start xl:flex-row xl:items-center ${
                    i === 4 ? "col-span-2 sm:col-span-3 lg:col-span-1" : i === 3 ? "sm:col-span-3 lg:col-span-1" : "sm:col-span-2 lg:col-span-1"
                  }`}
                >
                  <IconDisc name={icon.name} ban={icon.ban} size={40} solid={i < 3} />
                  <span className="font-[family-name:var(--font-sub)] text-[15px] leading-[1.15] font-semibold tracking-[0.04em] text-white uppercase sm:text-[16px]">
                    {s}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <div className="mt-14 lg:mt-16">
          <SectionHead title={e.heading} tone="gold" />
          <Kicker onGold>{e.title}</Kicker>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:gap-5 xl:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i}
              className="surface-on-gold group relative flex flex-col overflow-hidden p-6 sm:p-7"
            >
              <IconDisc name={STEP_ICONS[s.title].name} ban={STEP_ICONS[s.title].ban} size={46} />
              <h3 className="mt-5 font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[21px]">
                <span className="text-gold">{i + 1}. </span>
                {s.title}
              </h3>
              {s.body.map((p) => (
                <p key={p} className="mt-3 text-[15px] leading-[24px] font-normal text-white/80">
                  {p}
                </p>
              ))}
              {s.list && (
                <>
                  <p className="mt-3 text-[15px] leading-[23px] font-normal text-white/80">{s.list.lead}</p>
                  <ul className="mt-3 grid gap-1.5">
                    {s.list.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-[14.5px] leading-[21px] font-normal text-white/85">
                        <span aria-hidden className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <HoverRule />
            </Reveal>
          ))}
        </ol>

        {/* Step 5 — the call to action the other four lead to, across the
            band: what to tell us, then both buttons. */}
        <Reveal delay={1}>
          <article className="relative mt-4 overflow-hidden rounded-[16px] bg-ink p-6 ring-1 ring-gold/45 sm:p-8 lg:mt-5 lg:p-10">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(60% 80% at 100% 0%, rgba(193,146,49,0.18) 0%, transparent 70%)" }}
            />
            <div className="relative grid gap-7 lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:gap-y-8">
              <div className="lg:col-span-5">
                <IconDisc name="whatsapp" size={50} solid />
                <h3 className="mt-5 font-[family-name:var(--font-sub)] text-[22px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[24px]">
                  <span className="text-gold">5. </span>
                  {contact.title}
                </h3>
                {contact.list && (
                  <p className="mt-3 text-[16px] leading-[25px] font-normal text-white/80">{contact.list.lead}</p>
                )}
                <div className="mt-7 hidden flex-wrap gap-3 lg:flex">
                  <WhatsAppButton label={e.whatsappLabel} />
                  <QuoteButton label={e.quoteLabel} />
                </div>
              </div>
              {contact.list && (
                <ol className="border-t border-white/[0.08] lg:col-span-7">
                  {contact.list.items.map((it, i) => (
                    <li key={it} className="flex items-center gap-4 border-b border-white/[0.08] py-3">
                      <span className="w-5 shrink-0 font-[family-name:var(--font-display)] text-[18px] leading-none text-gold">
                        {i + 1}
                      </span>
                      <strong className="font-[family-name:var(--font-ui)] text-[13.5px] leading-[19px] font-semibold tracking-[0.08em] text-white">
                        {it}
                      </strong>
                    </li>
                  ))}
                </ol>
              )}
              {/* Under the list until `lg`, where they join the heading. */}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:hidden">
                <WhatsAppButton label={e.whatsappLabel} className="w-full sm:w-auto" />
                <QuoteButton label={e.quoteLabel} className="w-full sm:w-auto" />
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 3. Common paint-spill locations ───────────────────────────────────────
   "3 — COMMON AREAS — Visual cards: BOOT, CARPET, FABRIC SEATS, LEATHER,
   PLASTIC". Five cards, the boot — "One of the most common situations" —
   the tall one with its list. Each heads with its photograph; the carpet
   has none on the site, so it heads with a drawing of what its copy says,
   paint on the pile and through it. The sixth location, floor mats, closes
   the band beside its GET A QUOTE. */

const LOCATION_PHOTOS: Partial<Record<string, { photo: Photo; position?: string }>> = {
  boot: { photo: PHOTOS.boot, position: "45% 55%" },
  fabric: { photo: PHOTOS.upholstery, position: "40% 60%" },
  leather: { photo: PHOTOS.leather, position: "50% 60%" },
  plastic: { photo: PHOTOS.plastic, position: "50% 62%" },
};

/* The two drawings of carpet — the carpet card's and the depth diagram's —
   share their paint and their pile. */
const PAINT_COLOUR = "#efe6d2";

/** Paint soaking down: strongest where it went in, fainter as it spreads. */
function Soak({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={PAINT_COLOUR} stopOpacity="0.8" />
        <stop offset="1" stopColor={PAINT_COLOUR} stopOpacity="0.3" />
      </linearGradient>
    </defs>
  );
}

/** The pile's tips: short rounded strokes, staggered. */
function Tufts({ y, count, step }: { y: number; count: number; step: number }) {
  return (
    <g stroke="#4a4d55" strokeWidth="4" strokeLinecap="round">
      {Array.from({ length: count }, (_, i) => (
        <path key={i} d={`M${3 + i * step} ${y + (i % 3) * 2.2}V${y + 18}`} />
      ))}
    </g>
  );
}

/** The fibres below the tips, drawn over the stain so it reads as soaked in. */
function Fibres({ from, to, step, count }: { from: number; to: number; step: number; count: number }) {
  return (
    <g stroke="#3b3e45" strokeWidth="1.6" strokeLinecap="round" opacity="0.9">
      {Array.from({ length: count }, (_, i) => (
        <path key={i} d={`M${2 + i * step} ${from + (i % 2) * 6}V${to}`} />
      ))}
    </g>
  );
}

/** The carpet card's picture: pile, a spill on it, and the paint below the
 *  surface spreading wider than the patch on top. */
function CarpetDrawing() {
  return (
    <svg viewBox="30 56 240 160" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="300" height="230" fill="#141517" />
      <rect y="112" width="300" height="118" fill="#2a2c31" />
      {/* The stain under the surface, spreading past the patch on top. */}
      <Soak id="paint-soak-card" />
      <path
        d="M106 116C98 134 84 136 76 152C66 172 82 184 98 190H208C228 182 236 168 224 152C212 136 204 132 196 116Z"
        fill="url(#paint-soak-card)"
      />
      <Fibres from={128} to={226} step={6} count={50} />
      <Tufts y={112} count={42} step={7.2} />
      <path d="M96 120C96 110 124 108 150 109C178 108 206 111 204 120C202 127 172 126 150 126C126 126 96 128 96 120Z" fill={PAINT_COLOUR} />
      <ellipse cx="132" cy="114" rx="16" ry="2.4" fill="#ffffff" opacity="0.6" />
    </svg>
  );
}

function Locations() {
  const l = PAINT.locations;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <SectionHead title={l.heading} />
        <Kicker>{l.title}</Kicker>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {l.items.map((it, i) => {
            const boot = it.key === "boot";
            const pic = LOCATION_PHOTOS[it.key];
            return (
              <Reveal
                as="li"
                key={it.key}
                delay={i % 3}
                className={`surface group relative flex flex-col overflow-hidden ${
                  boot ? "sm:col-span-2 sm:grid sm:grid-cols-2 lg:col-span-1 lg:row-span-2 lg:flex" : ""
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    boot ? "aspect-[3/2] sm:aspect-auto sm:min-h-full lg:min-h-[260px] lg:flex-1" : "aspect-[3/2]"
                  }`}
                >
                  {pic ? (
                    <Image
                      src={pic.photo.src}
                      alt={pic.photo.alt}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                      style={{ objectPosition: pic.position }}
                    />
                  ) : (
                    <CarpetDrawing />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(13,13,13,0.9),transparent)]"
                  />
                </div>
                <div className="relative flex flex-col p-6 sm:p-7">
                  <h3 className="font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[21px]">
                    {it.title}
                  </h3>
                  {it.body.map((p, j) => (
                    <p
                      key={p}
                      className={`mt-3 text-[15px] leading-[24px] [&_a]:text-gold ${LINKS} ${
                        boot && j === 0 ? "font-semibold text-white" : "font-normal text-white/75"
                      }`}
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
                  ))}
                  {it.list && (
                    <div className="mt-5 rounded-[10px] bg-white/[0.04] px-4 py-3.5 ring-1 ring-white/[0.07]">
                      <p className="text-[13.5px] leading-[20px] font-semibold text-gold">{it.list.lead}</p>
                      <ul className="mt-2.5 grid gap-x-4 gap-y-1.5 min-[420px]:grid-cols-2">
                        {it.list.items.map((li) => (
                          <li key={li} className="flex gap-2.5 text-[14px] leading-[20px] font-normal text-white/85">
                            <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                            {li}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <HoverRule />
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={1}>
          <div className="mt-6 flex flex-col gap-6 rounded-[14px] bg-gold/[0.07] p-6 ring-1 ring-gold/40 sm:p-8 lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
              <IconDisc name="mat" size={50} solid />
              <div>
                <h3 className="font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.03em] text-white uppercase sm:pt-2.5 sm:text-[22px]">
                  {l.mat.title}
                </h3>
                {l.mat.body.map((p, i) => (
                  <p
                    key={p}
                    className={`mt-2 max-w-[70ch] text-[15px] leading-[24px] font-normal ${
                      i ? "text-white/65" : "text-white/85"
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <QuoteButton label={l.cta} className="w-full shrink-0 lg:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 4. Wet paint vs dried paint ───────────────────────────────────────────
   "4 — WET VS DRIED — Simple visual comparison." Three cards in the order
   paint sets, each headed by the same drop at that stage — glossy, half
   set, solid and cracked — with an arrow between them from `lg`. The
   closing line, the band's one ink panel. */

function PaintDrop({ stage }: { stage: 0 | 1 | 2 }) {
  const d = "M12 3.4s6.3 6.7 6.3 10.9a6.3 6.3 0 0 1-12.6 0c0-4.2 6.3-10.9 6.3-10.9Z";
  return (
    <svg viewBox="0 0 24 24" width="58" height="58" aria-hidden className="text-gold">
      <defs>
        <clipPath id="paint-drop-half">
          <rect x="0" y="13.2" width="24" height="11" />
        </clipPath>
      </defs>
      {stage === 0 && (
        <>
          <path d={d} fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M9.3 13.4a3.1 3.1 0 0 0 1.7 3.3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </>
      )}
      {stage === 1 && (
        <>
          <path d={d} fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path d={d} fill="currentColor" clipPath="url(#paint-drop-half)" />
        </>
      )}
      {stage === 2 && (
        <>
          <path d={d} fill="currentColor" />
          <path
            d="M12.4 9.6 11 12.4l1.9 1.6-1.4 3.2"
            fill="none"
            stroke="#000"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

function WetDry() {
  const w = PAINT.wetDry;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={w.heading} tone="gold" />
            <Kicker onGold>{w.title}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-5">
            <p className="mt-4 text-[18px] leading-[28px] font-semibold text-ink lg:mt-0">{w.lead}</p>
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-8">
          {w.states.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i} className="relative">
              {i > 0 && (
                <span
                  aria-hidden
                  className="absolute top-[39px] -left-[34px] z-10 hidden h-9 w-9 items-center justify-center rounded-full bg-ink text-gold ring-2 ring-gold/60 lg:flex"
                >
                  <Icon name="arrow" size={16} strokeWidth={2.2} />
                </span>
              )}
              <article className="surface-on-gold group relative flex h-full flex-col overflow-hidden p-6 sm:p-7">
                <div className="flex items-center gap-4">
                  <PaintDrop stage={i as 0 | 1 | 2} />
                  <h3 className="font-[family-name:var(--font-sub)] text-[21px] leading-[1.1] tracking-[0.03em] text-white uppercase">
                    {s.title}
                  </h3>
                </div>
                <span aria-hidden className="mt-5 block h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                  <span
                    className="block h-full rounded-full bg-[linear-gradient(90deg,var(--color-gold),var(--color-gold-bright))]"
                    style={{ width: `${((i + 1) / 3) * 100}%` }}
                  />
                </span>
                {s.body.map((p, j) => (
                  <p
                    key={p}
                    className={`mt-4 text-[15px] leading-[24px] ${j === 0 ? "font-semibold text-white" : "font-normal text-white/75"}`}
                  >
                    {p}
                  </p>
                ))}
                {s.list && (
                  <>
                    <Label className="mt-5">{s.list.lead}</Label>
                    <ul className="mt-3 grid gap-2">
                      {s.list.items.map((it) => (
                        <li key={it} className="flex gap-2.5 text-[14.5px] leading-[21px] font-normal text-white/80">
                          <span aria-hidden className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {s.after?.map((p) => (
                  <div key={p} className="mt-auto pt-6">
                    <p className="rounded-[10px] bg-gold/[0.08] px-4 py-3 text-[14px] leading-[20px] font-semibold text-gold ring-1 ring-gold/30">
                      {p}
                    </p>
                  </div>
                ))}
                <HoverRule />
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={1}>
          <div className="relative mt-6 overflow-hidden rounded-[14px] bg-ink p-6 text-center ring-1 ring-gold/40 sm:p-10 lg:mt-8">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(60% 100% at 50% 100%, rgba(193,146,49,0.16) 0%, transparent 70%)" }}
            />
            <p className="relative mx-auto max-w-[28ch] font-[family-name:var(--font-heading)] text-[22px] leading-[1.08] font-black text-gold uppercase min-[400px]:text-[26px] sm:text-[34px] lg:text-[40px]">
              {w.statement}
            </p>
            <p className="relative mt-4 flex items-center justify-center gap-2.5 text-[16px] leading-[24px] font-semibold text-white">
              <Icon name="camera" size={19} className="shrink-0 text-gold" />
              {w.after}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Section 6 — Different paints require different approaches ─────────────
   Not in the page structure; it is the other thing we need to know about
   the paint, so it follows wet vs dried. The examples as chips, "DON'T
   KNOW?" as the card beside them that points at the form's Unknown, and the
   IMPORTANT note set as the sum it describes: THE PAINT and THE MATERIAL
   UNDERNEATH IT. */

function PaintTypes() {
  const p = PAINT.paints;
  const im = p.important;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={p.heading} />
            <Kicker>{p.title}</Kicker>
            <Reveal delay={3}>
              <p className="measure mt-5 text-[18px] leading-[28px] font-semibold text-white">{p.body[0]}</p>
              <Prose html={p.body[1]} />
              <Label className="mt-8">{p.examplesLead}</Label>
              <Chips items={p.examples} className="mt-3.5" />
            </Reveal>
          </div>

          <Reveal delay={2} className="lg:col-span-5 lg:self-center">
            <div className="rounded-[14px] bg-gold/[0.07] p-6 ring-1 ring-gold/40 sm:p-8">
              <IconDisc name="search" size={50} solid />
              <h3 className="mt-5 font-[family-name:var(--font-sub)] text-[22px] leading-tight tracking-[0.03em] text-white uppercase sm:text-[24px]">
                {p.unknown.title}
              </h3>
              <p className="mt-3 text-[17px] leading-[26px] font-semibold text-white">{p.unknown.body[0]}</p>
              <p
                className={`mt-2 text-[15.5px] leading-[25px] font-normal text-white/75 [&_a]:text-gold [&_strong]:font-semibold [&_strong]:text-white ${LINKS}`}
                dangerouslySetInnerHTML={{ __html: p.unknown.body[1] }}
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="surface mt-12 p-6 sm:p-8 lg:mt-14 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-5">
                <p className="flex items-center gap-2.5 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.22em] text-gold uppercase">
                  <Icon name="info" size={16} className="shrink-0" />
                  {im.title}
                </p>
                <p className="mt-3 text-[18px] leading-[28px] font-semibold text-white">{im.body}</p>
                <p className="mt-3 text-[15.5px] leading-[24px] font-normal text-white/70">{im.lead}</p>
              </div>
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:col-span-7">
                <p className="flex flex-1 items-center gap-4 rounded-[12px] bg-gold px-5 py-5 text-ink">
                  <Glyph name="tin" size={28} />
                  <span className="font-[family-name:var(--font-sub)] text-[19px] leading-tight font-semibold tracking-[0.04em] sm:text-[21px]">
                    {im.first}
                  </span>
                </p>
                <p className="text-center font-[family-name:var(--font-sub)] text-[17px] tracking-[0.06em] text-white/60 uppercase">
                  {im.and}
                </p>
                <p className="flex flex-1 items-center gap-4 rounded-[12px] bg-white/[0.06] px-5 py-5 text-white ring-1 ring-gold/40">
                  <Icon name="layers" size={28} className="shrink-0 text-gold" />
                  <span className="font-[family-name:var(--font-sub)] text-[19px] leading-tight font-semibold tracking-[0.04em] sm:text-[21px]">
                    {im.second}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 5. How deep can paint travel? (Section 3) ─────────────────────────────
   "Use an educational diagram showing: VISIBLE CARPET ↓ CARPET FIBRES ↓
   UNDERLAY". The diagram beside the section's heading: one cross-section,
   cut into the three layers it names, the spill widening as it goes down,
   with the layers' names level with them. The eight places liquid paint can
   reach follow as cards, and "WHAT YOU CAN SEE MAY NOT BE THE FULL EXTENT
   OF THE SPILL" closes the band as its one ink panel. */

function DepthDiagram() {
  const d = PAINT.depth.diagram;
  return (
    <figure className="rounded-[16px] bg-ink p-5 shadow-[0_30px_60px_-34px_rgba(0,0,0,0.7)] sm:p-7">
      <figcaption className="flex items-center gap-2.5 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.2em] text-gold uppercase">
        <Icon name="layers" size={16} className="shrink-0" />
        {d.title}
      </figcaption>
      <div className="mt-5 grid grid-cols-[minmax(0,128px)_minmax(0,1fr)] grid-rows-3 gap-x-4 min-[420px]:grid-cols-[minmax(0,170px)_minmax(0,1fr)] sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-x-6">
        <svg viewBox="0 0 240 300" className="row-span-3 block h-auto w-full rounded-[10px]" aria-hidden>
          <rect width="240" height="300" fill="#141517" />
          {/* Carpet: the pile, top to backing. */}
          <rect y="50" width="240" height="150" fill="#2a2c31" />
          {/* The paint below the surface, wider the deeper it goes. */}
          <Soak id="paint-soak-depth" />
          <path
            d="M86 52C80 74 92 90 78 108C64 126 70 142 56 160C44 176 52 190 40 200H204C192 188 200 172 186 156C172 140 182 124 166 106C152 90 162 72 154 52Z"
            fill="url(#paint-soak-depth)"
          />
          <Fibres from={70} to={198} step={6} count={40} />
          <Tufts y={48} count={34} step={7.2} />
          {/* The patch on top — all that shows. */}
          <path d="M70 56C70 46 96 44 120 45C146 44 172 47 170 56C168 63 140 62 120 62C98 62 70 64 70 56Z" fill={PAINT_COLOUR} />
          <ellipse cx="104" cy="50" rx="15" ry="2.4" fill="#ffffff" opacity="0.6" />
          {/* Underlay, open-celled, the stain spreading through it. */}
          <rect y="200" width="240" height="100" fill="#3b342c" />
          <ellipse cx="120" cy="236" rx="112" ry="34" fill={PAINT_COLOUR} opacity="0.22" />
          <ellipse cx="120" cy="230" rx="82" ry="24" fill={PAINT_COLOUR} opacity="0.42" />
          <g fill="#2b2620">
            {[
              [22, 222, 5],
              [54, 262, 6],
              [98, 284, 4],
              [150, 268, 6],
              [196, 226, 5],
              [212, 276, 4],
              [128, 244, 3],
            ].map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
            ))}
          </g>
          {/* Where one layer ends and the next begins. */}
          <g stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="5 5">
            <path d="M0 100H240" />
            <path d="M0 200H240" />
          </g>
        </svg>
        {d.layers.map((name, i) => (
          <div
            key={name}
            className={`flex min-w-0 flex-col justify-center gap-1 ${i ? "border-t border-white/[0.08]" : ""}`}
          >
            <span className="font-[family-name:var(--font-display)] text-[22px] leading-none text-gold sm:text-[26px]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-[family-name:var(--font-sub)] text-[15px] leading-tight font-semibold tracking-[0.04em] text-white uppercase sm:text-[18px]">
              {name}
            </span>
            {i < d.layers.length - 1 && (
              <Icon name="arrow" size={15} strokeWidth={2.2} className="mt-1 rotate-90 text-white/35" />
            )}
          </div>
        ))}
      </div>
    </figure>
  );
}

const DEPTH_ICONS: Record<string, GlyphName> = {
  Carpet: "carpet",
  "Carpet Underlay": "layers",
  "Fabric Seats": "seat",
  "Seams & Stitching": "stitch",
  "Seat Foam": "foam",
  Leather: "seat-edge",
  "Interior Plastic": "plastic",
  "Boot Areas": "boot",
};

function Depth() {
  const d = PAINT.depth;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHead title={d.heading} tone="gold" />
            <Kicker onGold>{d.title}</Kicker>
            <Reveal delay={3}>
              <p className="measure mt-5 text-[18px] leading-[28px] font-semibold text-ink">{d.lead}</p>
            </Reveal>
          </div>
          <Reveal delay={2} className="min-w-0 lg:col-span-6">
            <DepthDiagram />
          </Reveal>
        </div>

        <Reveal delay={1}>
          <Label onGold className="mt-12 lg:mt-14">
            {d.listLead}
          </Label>
        </Reveal>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {d.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i % 4} className="surface-on-gold group relative overflow-hidden p-6">
              <IconDisc name={DEPTH_ICONS[it.title] ?? "droplet"} size={46} />
              <h3 className="mt-5 font-[family-name:var(--font-sub)] text-[19px] leading-tight tracking-[0.02em] text-white uppercase">
                {it.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[23px] font-normal text-white/75">{it.body}</p>
              <HoverRule />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={1}>
          <div className="mt-6 flex flex-col gap-5 rounded-[14px] bg-ink p-6 ring-1 ring-gold/40 sm:flex-row sm:items-center sm:gap-7 sm:p-8 lg:mt-8 lg:p-10">
            <IconDisc name="eye" size={54} solid />
            <div>
              <p className="font-[family-name:var(--font-heading)] text-[21px] leading-[1.08] font-black text-gold uppercase min-[400px]:text-[24px] sm:text-[30px] lg:text-[36px]">
                {d.statement}
              </p>
              <p className="mt-3 text-[16px] leading-[25px] font-normal text-white/80">{d.after}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 6. Our process (Section 7) ────────────────────────────────────────────
   "Visual: ASSESS → CONTAIN → TEST → TREAT → EXTRACT / DEEP CLEAN →
   REASSESS". That line is the band's map: its six stages, unnumbered as the
   brief draws them, each a link to its step and held beside the steps from
   `lg`. The steps are a numbered rail —
   seven of them, the sixth the loop the line has no stage for — and step
   4's IMPORTANT note is the rail's one gold panel. */

const PROCESS_ICONS: GlyphName[] = ["search", "shield", "droplet", "brush", "vacuum", "refresh", "eye"];
const stepId = (n: number) => `paint-step-${n}`;

function Process() {
  const s = PAINT.process;
  const staged = s.steps.map((step, i) => ({ step, n: i + 1 })).filter((x) => x.step.flow);
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

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          {/* The layout's line. */}
          <div className="lg:col-span-4 lg:col-start-9 lg:row-start-1">
            <Reveal delay={1} className="lg:sticky lg:top-32">
              <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {staged.map(({ step, n }, i) => {
                  const last = i === staged.length - 1;
                  return (
                    <li key={step.flow}>
                      <a
                        href={`#${stepId(n)}`}
                        className={`flex min-h-[58px] items-center justify-between gap-2 rounded-[12px] px-4 py-3 transition-colors ${
                          last
                            ? "bg-gold text-ink hover:bg-gold-bright"
                            : "bg-white/[0.04] text-white ring-1 ring-white/[0.08] hover:bg-white/[0.08]"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <Glyph
                            name={PROCESS_ICONS[n - 1] ?? "check"}
                            size={17}
                            className={`shrink-0 ${last ? "text-ink/70" : "text-gold"}`}
                          />
                          <span className="font-[family-name:var(--font-sub)] text-[14.5px] leading-tight font-semibold tracking-[0.05em] uppercase">
                            {step.flow}
                          </span>
                        </span>
                        {!last && (
                          <Icon
                            name="arrow"
                            size={15}
                            className="hidden shrink-0 text-white/35 lg:block lg:rotate-90"
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </div>

          <ol className="lg:col-span-8 lg:col-start-1 lg:row-start-1">
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
      {!last && <span aria-hidden className="absolute top-14 bottom-1 left-[23px] w-[2px] rounded-full bg-gold/20" />}
      <span
        aria-hidden
        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
          step.flow ? "bg-gold text-ink" : "bg-gold/12 text-gold ring-1 ring-gold/35"
        }`}
      >
        <Glyph name={PROCESS_ICONS[n - 1] ?? "check"} size={21} />
      </span>
      <article id={stepId(n)} className="min-w-0 flex-1 scroll-mt-32 pt-1">
        <p className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
          Step {n}
          {step.flow ? ` · ${step.flow}` : ""}
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-sub)] text-[21px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[23px]">
          {step.title}
        </h3>
        {step.body.map((p) => (
          <p
            key={p}
            className={`mt-2.5 max-w-[62ch] text-[15.5px] leading-[25px] font-normal text-white/75 [&_a]:text-gold ${LINKS}`}
            dangerouslySetInnerHTML={{ __html: p }}
          />
        ))}
        {step.list && (
          <>
            <p className="mt-3 text-[15.5px] leading-[25px] font-semibold text-white">{step.list.lead}</p>
            <ul className="mt-2.5 grid gap-2 sm:grid-cols-2 sm:gap-x-6">
              {step.list.items.map((li) => (
                <li key={li} className="flex gap-2.5 text-[15px] leading-[22px] font-normal text-white/85">
                  <span className="mt-px">
                    <Tick size={18} />
                  </span>
                  {li}
                </li>
              ))}
            </ul>
          </>
        )}
        {step.important && (
          <div className="mt-5 flex gap-3 rounded-[12px] bg-gold/[0.08] p-5 ring-1 ring-gold/40 sm:p-6">
            <Icon name="info" size={20} className="mt-0.5 shrink-0 text-gold" />
            <div>
              <p className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
                Important
              </p>
              <p className="mt-1.5 text-[15.5px] leading-[24px] font-semibold text-white">{step.important}</p>
            </div>
          </div>
        )}
      </article>
    </Reveal>
  );
}

/* ── 7. Results / limitations (Sections 8 and 9) ───────────────────────────
   "Prominent expectation-setting." The eleven factors beside the heading;
   then the two ways a spill can go side by side — "Some spills may respond
   extremely well" and what others may leave — and the brief's capitals,
   "OUR SERVICE IS PROFESSIONAL TREATMENT — NOT A GUARANTEE OF COMPLETE
   RESTORATION", set as large as a section heading in the band's one ink
   panel. Section 9, when replacing is better than cleaning, follows in the
   same band: it is the same message from the other side. */

const REPLACE_ICONS: Record<string, GlyphName> = {
  "Floor Mats": "mat",
  "Boot Carpet": "boot",
  "Permanently Damaged Plastic": "plastic",
  "Damaged Leather": "seat",
};

function Results() {
  const r = PAINT.results;
  const x = PAINT.replacement;
  return (
    <section id="results" className="w-full scroll-mt-24 bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHead title={r.heading} tone="gold" />
            <Kicker onGold>{r.title}</Kicker>
            <Reveal delay={3}>
              <p className="measure mt-5 text-[18px] leading-[28px] font-semibold text-ink">{r.lead}</p>
            </Reveal>
          </div>
          <Reveal delay={2} className="lg:col-span-7">
            <div className="surface-on-gold p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <IconDisc name="info" size={40} />
                <h3 className="text-[16px] leading-[23px] font-semibold text-white">{r.factorsLead}</h3>
              </div>
              <Dots items={r.factors} className="mt-5" />
            </div>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-12 lg:mt-8 lg:gap-5">
          <Reveal delay={1} className="md:col-span-5">
            <div className="surface-on-gold flex h-full flex-col justify-center gap-4 p-6 sm:p-8">
              <IconDisc name="spark" size={46} solid />
              <p className="font-[family-name:var(--font-sub)] text-[21px] leading-tight font-semibold tracking-[0.02em] text-white uppercase sm:text-[23px]">
                {r.well}
              </p>
            </div>
          </Reveal>
          <Reveal delay={2} className="md:col-span-7">
            <div className="surface-on-gold h-full p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <IconDisc name="warning" size={40} />
                <p className="font-[family-name:var(--font-sub)] text-[19px] leading-tight font-semibold tracking-[0.02em] text-white uppercase sm:text-[21px]">
                  {r.othersLead}
                </p>
              </div>
              <Chips items={r.others} className="mt-5" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="relative mt-6 overflow-hidden rounded-[14px] bg-ink p-6 ring-1 ring-gold/40 sm:p-8 lg:mt-8 lg:p-12">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(60% 90% at 85% 100%, rgba(193,146,49,0.14) 0%, transparent 70%)" }}
            />
            <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-12">
              <p className="font-[family-name:var(--font-heading)] text-[22px] leading-[1.06] font-black text-gold uppercase min-[400px]:text-[26px] sm:text-[34px] lg:col-span-7 lg:text-[40px]">
                {r.statement}
              </p>
              <div className="flex gap-4 lg:col-span-5">
                <IconDisc name="shield" size={44} solid />
                <p className="text-[16px] leading-[26px] font-normal text-white/80">{r.after}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Section 9. */}
        <div className="mt-16 grid gap-10 border-t border-ink/15 pt-14 lg:mt-20 lg:grid-cols-12 lg:gap-14 lg:pt-16">
          <div className="lg:col-span-5">
            <SectionHead title={x.heading} tone="gold" />
            <Kicker onGold>{x.title}</Kicker>
            <Reveal delay={3}>
              <Prose html={x.lead} onGold space="mt-5" className="text-[17px]" />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={1}>
              <Label onGold>{x.examplesLead}</Label>
            </Reveal>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:gap-5">
              {x.items.map((it, i) => (
                <Reveal as="li" key={it.title} delay={i % 2} className="surface-on-gold group relative overflow-hidden p-6">
                  <IconDisc name={REPLACE_ICONS[it.title] ?? "refresh"} size={44} />
                  <h3 className="mt-4 font-[family-name:var(--font-sub)] text-[19px] leading-tight tracking-[0.02em] text-white uppercase">
                    {it.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[23px] font-normal text-white/75">{it.body}</p>
                  <HoverRule />
                </Reveal>
              ))}
            </ul>
            <Reveal delay={2}>
              <p className="mt-6 border-l-2 border-ink pl-4 text-[16.5px] leading-[26px] font-semibold text-ink">
                {x.closing}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 10 — Previous DIY cleaning attempts ───────────────────────────
   Not in the page structure; it follows the limitations, which name
   previous cleaning attempts among the things the result depends on. What
   may have been used, as chips; why it matters, as the card beside them;
   and "There is no judgement" as the band's last word. */

function Diy() {
  const d = PAINT.diy;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={d.heading} />
            <Kicker>{d.title}</Kicker>
            <Reveal delay={3}>
              <p className="mt-5 text-[18px] leading-[28px] font-semibold text-white">{d.lead}</p>
              <Label className="mt-7">{d.listLead}</Label>
              <Chips items={d.items} className="mt-3.5" />
            </Reveal>
          </div>
          <Reveal delay={2} className="lg:col-span-5 lg:self-center">
            <div className="surface p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <IconDisc name="info" size={42} />
                <h3 className="font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.03em] text-white uppercase sm:text-[22px]">
                  {d.why.title}
                </h3>
              </div>
              <p className="mt-5 text-[15.5px] leading-[24px] font-semibold text-white/85">{d.why.lead}</p>
              <Dots items={d.why.items} cols="" className="mt-2" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <p className="mt-8 flex items-start gap-3.5 rounded-[14px] bg-gold/[0.07] p-5 text-[16.5px] leading-[26px] font-semibold text-white ring-1 ring-gold/35 sm:items-center sm:p-6 lg:mt-10">
            <Icon name="check" size={20} strokeWidth={2.4} className="mt-[3px] shrink-0 text-gold sm:mt-0" />
            {d.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 9. Why quote only? (Section 12) ───────────────────────────────────────
   "Explain severity differences." The lead sentence is that explanation —
   a few spots against a whole tin in a boot — set large, the eleven things
   a price depends on under it, and the card beside them ends on UPLOAD
   PHOTOS FOR A QUOTE. */

function Pricing() {
  const p = PAINT.pricing;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHead title={p.heading} tone="gold" />
          <Kicker onGold>{p.title}</Kicker>
          <Reveal delay={3}>
            <p className="mt-5 max-w-[50ch] text-[19px] leading-[29px] font-semibold text-ink sm:text-[21px] sm:leading-[31px]">
              {p.lead}
            </p>
            <Label onGold className="mt-8">
              {p.factorsLead}
            </Label>
            <Dots items={p.factors} onGold className="mt-3" />
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-5 lg:self-center">
          <div className="relative overflow-hidden rounded-[16px] bg-ink p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-8 lg:p-10">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(70% 50% at 100% 0%, rgba(193,146,49,0.16) 0%, transparent 70%)" }}
            />
            <IconDisc name="tag" size={50} solid />
            <p className="relative mt-6 font-[family-name:var(--font-heading)] text-[24px] leading-[1.06] font-black text-gold uppercase sm:text-[30px] lg:text-[28px] xl:text-[32px]">
              {p.statement}
            </p>
            <p className="relative mt-5 flex items-center gap-2.5 text-[16.5px] leading-[24px] font-semibold text-white">
              <Icon name="camera" size={19} className="shrink-0 text-gold" />
              {p.required}
            </p>
            <QuoteButton label={p.cta} inCard className="relative mt-8 w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 10. Why Medusa? (Section 14), with Section 13 ─────────────────────────
   "Short section." Six cards, two across, and beside them — held still
   from `lg` — Section 13's mobile service card with the four places a
   technician can attend and its CHECK AVAILABILITY / GET QUOTE. Both say
   why Medusa; the structure places only the first. */

const WHY_ICONS: Record<string, GlyphName> = {
  "Specialist Interior Cleaning": "vacuum",
  "Material-Specific Approach": "layers",
  "Mobile Across London": "van",
  "Professional Equipment": "brush",
  "Photo Assessment": "camera",
  "Realistic Expectations": "gauge",
};

function WhyMedusa() {
  const w = PAINT.why;
  const m = PAINT.mobile;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <SectionHead title={w.heading} />
          <Kicker>{w.title}</Kicker>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5">
            {w.items.map((it, i) => (
              <Reveal as="li" key={it.title} delay={i % 2} className="surface group relative overflow-hidden p-6">
                <div className="flex items-center gap-4">
                  <IconDisc name={WHY_ICONS[it.title] ?? "check"} size={46} />
                  <h3 className="font-[family-name:var(--font-sub)] text-[18px] leading-tight text-white uppercase sm:text-[19px]">
                    {it.title}
                  </h3>
                </div>
                <p
                  className={`mt-4 text-[15px] leading-[24px] [&_a]:text-gold ${LINKS} ${
                    it.title === "Realistic Expectations" ? "font-semibold text-white" : "font-normal text-white/75"
                  }`}
                  dangerouslySetInnerHTML={{ __html: it.body }}
                />
                <HoverRule />
              </Reveal>
            ))}
          </ul>
          <Reveal delay={1}>
            <QuoteButton label={w.cta} className="mt-8 w-full sm:w-auto" />
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={2} className="lg:sticky lg:top-32">
            <article className="surface relative overflow-hidden p-6 sm:p-8">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "radial-gradient(70% 50% at 100% 0%, rgba(193,146,49,0.14) 0%, transparent 70%)" }}
              />
              <IconDisc name="van" size={52} solid />
              <h2 className="relative mt-6 font-[family-name:var(--font-sub)] text-[24px] leading-[1.1] font-semibold tracking-[0.02em] text-white uppercase sm:text-[28px]">
                {m.heading}
              </h2>
              <h3 className="relative mt-3 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.03em] text-gold uppercase sm:text-[19px]">
                {m.title}
              </h3>
              <p className="relative mt-4 text-[15.5px] leading-[25px] font-normal text-white/80">{m.body}</p>
              <p className="relative mt-4 text-[15px] leading-[24px] font-semibold text-white">{m.listLead}</p>
              <ul className="relative mt-3 grid gap-2 min-[420px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {m.list.map((place) => (
                  <li
                    key={place}
                    className="flex items-center gap-2.5 rounded-[10px] bg-white/[0.04] px-3.5 py-2.5 text-[14.5px] leading-[20px] font-semibold text-white/90 ring-1 ring-white/[0.07]"
                  >
                    <Icon name="pin" size={17} className="shrink-0 text-gold" />
                    {place}
                  </li>
                ))}
              </ul>
              <QuoteButton label={m.cta} inCard className="relative mt-7 w-full" />
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 12. The quote form ────────────────────────────────────────────────────
   "This should be the PRIMARY conversion point. Set anchor:
   #get-paint-spill-quote". The heading holds still beside the form from
   `lg`, with the two other ways in — WhatsApp and the phone — under it. */

function Quote() {
  const q = PAINT.quote;
  return (
    <section id={FORM_ANCHOR} className="w-full scroll-mt-20 py-16 lg:scroll-mt-24 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead title={q.heading} />
            <Kicker>{q.title}</Kicker>
            <Reveal delay={3}>
              <div className="mt-8 hidden flex-col gap-4 lg:flex">
                <WhatsAppButton label={q.whatsappLabel} className="self-start" />
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="link-inline self-start text-[15px] font-semibold text-white hover:text-gold"
                >
                  <Icon name="phone" size={17} className="text-gold" />
                  {CONTACT.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <PaintSpillQuoteForm id={`${FORM_ANCHOR}-form`} thanks={PAINT.thanks} whatsapp={WHATSAPP} />
        </div>
      </div>
    </section>
  );
}

/* ── 13 & 14. FAQ · Important service information (Section 16) ─────────────
   "13 — FAQ — Accordion. 14 — IMPORTANT INFORMATION — Service limitations."
   The accordion, then the six limitations as the band's ink panel — the
   payment term, which the brief sets in bold, set apart as its last. */

const TERM_ICONS: Record<string, GlyphName> = {
  "Complete Removal Is Not Guaranteed": "info",
  "Deep Contamination": "layers",
  "Previous Chemicals": "tin",
  "Material Damage": "warning",
  "Replacement May Be Required": "refresh",
  Payment: "shield",
};

function FaqAndTerms() {
  const f = PAINT.faq;
  const t = PAINT.important;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHead title={f.heading} tone="gold" />
            </div>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={f.items} onGold />
          </div>
        </div>

        <Reveal delay={1}>
          <div id="service-information" className="mt-14 scroll-mt-24 rounded-[16px] bg-ink p-6 sm:p-8 lg:mt-20 lg:p-12">
            <span aria-hidden className="block h-[3px] w-[52px] rounded-full bg-gold" />
            <h2 className="mt-6 text-[28px] leading-[1.04] text-white sm:text-[36px] lg:text-[44px]">{t.heading}</h2>
            <h3 className="mt-4 font-[family-name:var(--font-sub)] text-[18px] leading-tight font-semibold tracking-[0.03em] text-gold uppercase lg:text-[21px]">
              {t.title}
            </h3>
            <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {t.items.map((it: Item) => {
                const payment = it.title === "Payment";
                return (
                  <li
                    key={it.title}
                    className={`rounded-[12px] p-5 sm:p-6 ${
                      payment ? "bg-gold/[0.1] ring-1 ring-gold/50" : "bg-white/[0.04] ring-1 ring-white/[0.08]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconDisc name={TERM_ICONS[it.title] ?? "info"} size={38} solid={payment} />
                      <h4 className="font-[family-name:var(--font-sub)] text-[16.5px] leading-tight font-semibold tracking-[0.03em] text-white uppercase">
                        {it.title}
                      </h4>
                    </div>
                    {it.body.map((p) => (
                      <p
                        key={p}
                        className="mt-3.5 text-[14.5px] leading-[23px] font-normal text-white/75 [&_strong]:font-semibold [&_strong]:text-white"
                        dangerouslySetInnerHTML={{ __html: p }}
                      />
                    ))}
                    {it.list && (
                      <>
                        <p className="mt-3.5 text-[14.5px] leading-[23px] font-semibold text-white/85">{it.list.lead}</p>
                        <Chips items={it.list.items} className="mt-3" />
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 15. Final CTA (Section 17) ────────────────────────────────────────────
   "PAINT SPILL? SEND PHOTOS NOW. [GET QUOTE] [WHATSAPP]". The copy's own
   close: the question, the warning, the four photographs to take — numbered,
   as the form's guide numbers them — and both buttons. */

function FinalCta() {
  const f = PAINT.finalCta;
  return (
    <section
      id="paint-final"
      className="cut-top relative w-full overflow-hidden bg-ink-panel pt-[calc(var(--cut)+4rem)] pb-16 lg:pb-[104px]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(80% 100% at 50% 0%, rgba(193,146,49,0.16) 0%, transparent 62%)" }}
      />
      <div className="shell relative flex flex-col items-center text-center">
        <SectionHead title={f.heading} align="center" />
        <Reveal delay={1}>
          <p className="mx-auto mt-5 max-w-[34ch] font-[family-name:var(--font-sub)] text-[19px] leading-[1.25] font-semibold tracking-[0.03em] text-gold uppercase sm:text-[23px]">
            {f.strong}
          </p>
        </Reveal>
        <Reveal delay={2} className="w-full">
          <p className="mt-9 text-[16px] leading-[24px] font-semibold text-white">{f.photosLead}</p>
          <ol className="mx-auto mt-4 grid max-w-[880px] gap-2.5 text-left min-[480px]:grid-cols-2 lg:grid-cols-4">
            {f.photos.map((p, i) => (
              <li
                key={p}
                className="flex items-center gap-3 rounded-[12px] bg-white/[0.04] px-4 py-3.5 ring-1 ring-white/[0.1]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/12 font-[family-name:var(--font-display)] text-[17px] leading-none text-gold ring-1 ring-gold/35">
                  {i + 1}
                </span>
                <span className="font-[family-name:var(--font-ui)] text-[12.5px] leading-[17px] font-semibold tracking-[0.08em] text-white">
                  {p}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[16px] leading-[24px] font-normal text-body">{f.then}</p>
        </Reveal>
        <Reveal delay={3}>
          <p className="mx-auto mt-9 max-w-[30ch] font-[family-name:var(--font-sub)] text-[20px] leading-tight font-semibold tracking-[0.02em] text-white uppercase sm:text-[24px]">
            {f.closing}
          </p>
        </Reveal>
        <Reveal delay={4} className="w-full sm:w-auto">
          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <QuoteButton label={f.quoteLabel} className="w-full sm:w-auto" />
            <WhatsAppButton label={f.whatsappLabel} className="w-full sm:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
