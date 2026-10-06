import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FaqAccordion from "@/components/FaqAccordion";
import FloodedAssessmentForm from "@/components/FloodedAssessmentForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Icon, { type IconName } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import StickyBookBar from "@/components/StickyBookBar";
import TrackClicks from "@/components/TrackClicks";
import Testimonials from "@/components/sections/Testimonials";
import { getPage } from "@/lib/blocks";
import { FLOOD, FORM_ANCHOR, LINKS, PATH, PHOTOS, QUOTE, SLUG, type Step, TRACK } from "@/lib/flooded-car";
import { faqPageSchema, pageSchema, serviceSchema } from "@/lib/schema";
import { CONTACT } from "@/lib/site";

/**
 * Flooded car & water damage interior cleaning — rebuilt from the client's
 * brief.
 *
 * Client, 2026-10-06: "Completely replace/re-optimise the existing Flooded Car
 * Cleaning page using the content below. KEEP EXISTING URL". Every word is in
 * `lib/flooded-car.ts` and the assessment form's in `lib/flooded-assessment.ts`;
 * this file is only layout, in the order of the brief's "ELEMENTOR PAGE
 * STRUCTURE", with each of its twenty content sections where that structure
 * puts its subject:
 *
 *   1 hero · 2 the urgent information bar · 3 water severity (Section 2) and
 *   the safety information beside it (3) · 4 where the water came from (4),
 *   why the source must be fixed (5) and the areas we assess (6) · 5 the
 *   process (7) · 6 the carpet layer diagram (8) · 7 mould & odour (9, 10),
 *   then the type of water (11) · 8 the safety boundary (13, 14) · 9 what we
 *   don't repair (12) · 11 why quote only (16) · 12 why Medusa (17) · 13
 *   reviews · 14 the assessment form · 15 FAQ (18) with 16 the service
 *   information (19) · 17 the closing band (20).
 *
 * Item 10, "BEFORE & AFTER — Genuine Medusa jobs", is not here: none exists
 * (see `lib/flooded-car.ts`).
 *
 * What decided the shape is the brief's "MOST IMPORTANT POSITIONING": "WE
 * CLEAN AND TREAT THE INTERIOR. WE DO NOT REPAIR THE LEAK. WE DO NOT CERTIFY
 * A FLOODED VEHICLE AS SAFE … EVERY JOB REQUIRES PHOTOS AND AN INDIVIDUAL
 * QUOTE." So nothing books: every quote button is `#get-flooded-car-quote`,
 * the form's own anchor, and the phone's sticky bar is "GET QUOTE |
 * WHATSAPP" — "Do NOT use instant BOOK NOW for serious flooded-car
 * enquiries". And the boundaries are never small print: the leak is the band
 * straight under the hero, the safety information the band after the
 * severity scale, and each of the brief's capitalised warnings — "DO NOT RELY
 * ON AN INTERIOR CLEANING SERVICE …", "CLEANING THE INTERIOR DOES NOT CONFIRM
 * …", "DO NOT RELY ON A DETAILING ASSESSMENT" — is set in the heading face,
 * at heading size, in the order the brief gives them.
 *
 * Gold and ink alternate the whole way down (client, 2026-09-22: "pastikan
 * warna bg tetap selang seling"); the FAQ and the service information share
 * the last gold band so the form lands on ink, where every enquiry form on
 * the site sits, and the gold still meets the ink close.
 *
 * The route wins over `app/[...slug]` because a static segment outranks a
 * catch-all.
 */

const WHATSAPP = FLOOD.whatsapp;

export function generateMetadata(): Metadata {
  const { title, description } = FLOOD.seo;
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

export default function FloodedCarCleaningPage() {
  const page = getPage(SLUG);
  if (!page) notFound();

  return (
    <>
      <JsonLd data={pageSchema(page)} />
      {/* "STRUCTURED DATA — Service schema, FAQPage schema. Do not add
          unsupported review ratings." No offer: the service is quote-only. */}
      <JsonLd
        data={serviceSchema({
          slug: SLUG,
          name: "Flooded Car Cleaning",
          serviceType: "Flooded car and water-damaged interior cleaning",
          description: FLOOD.seo.description,
          areaServed: "London",
          image: PHOTOS.hero.src,
        })}
      />
      <JsonLd data={faqPageSchema(FLOOD.faq.items)} />
      <TrackClicks />

      <Header />
      <main className="flex-1">
        <Hero />
        <Urgent />
        <WaterInside />
        <Safety />
        <Source />
        <Fix />
        <Areas />
        <Process />
        <Layers />
        <MouldOdour />
        <WaterType />
        <Electrical />
        <NotIncluded />
        <QuoteOnly />
        <WhyMedusa />
        <Testimonials />
        <Quote />
        <FaqTerms />
        <FinalCta />
      </main>
      <Footer />

      {/* "MOBILE STICKY CTA — Use: GET QUOTE | WHATSAPP". It steps aside over
          the form and over the closing band, which carry the same two. */}
      <StickyBookBar
        primary={{ label: FLOOD.sticky.primary, href: QUOTE, track: TRACK.quote }}
        secondary={{ label: FLOOD.sticky.secondary, href: WHATSAPP, icon: "whatsapp", external: true }}
        after="flood-hero-actions"
        hideOver={[FORM_ANCHOR, "flood-final"]}
      />
    </>
  );
}

/* ── Icons ──────────────────────────────────────────────────────────────────
   What water does to a car, and what this service does not mend, drawn on
   `Icon`'s own grid — 24px, the 1.75 stroke, round caps and joins,
   `currentColor` — for the brief's "Visual cards" and "Simple icons". */

const LOCAL_PATHS = {
  /* A cloud, raining. */
  rain: (
    <>
      <path d="M17 14.5a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.6 1.2A3 3 0 0 0 7 14.5h10Z" />
      <path d="m8.5 17.5-.8 2.2" />
      <path d="m12.5 17.5-.8 2.2" />
      <path d="m16.5 17.5-.8 2.2" />
    </>
  ),
  /* Water standing in waves. */
  waves: (
    <>
      <path d="M3 8c1.5 0 1.5-1.5 3-1.5s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5" />
      <path d="M3 12.5c1.5 0 1.5-1.5 3-1.5s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5" />
      <path d="M3 17c1.5 0 1.5-1.5 3-1.5s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5" />
    </>
  ),
  /* A car door: window, sill, handle — and so its seal. */
  door: (
    <>
      <path d="M4.5 12 9 5.5h9.5a1 1 0 0 1 1 1V19a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19v-7Z" />
      <path d="M4.5 12h15" />
      <path d="M14 15h2.5" />
    </>
  ),
  /* A car from above, the glass panel in its roof. */
  sunroof: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="4" />
      <path d="M8.3 7.4c2.4-.9 5-.9 7.4 0" />
      <path d="M8.8 17.4c2.1.6 4.3.6 6.4 0" />
      <rect x="9.3" y="9.3" width="5.4" height="5" rx="1" />
    </>
  ),
  /* A drain pipe, and what comes out of it. */
  drain: (
    <>
      <path d="M3.5 6h9a4 4 0 0 1 4 4v3.5" />
      <path d="M3.5 10h8.5a.5.5 0 0 1 .5.5v3" />
      <path d="M11 13.5h7" />
      <path d="M14.75 16.3s1.9 2 1.9 3.2a1.9 1.9 0 0 1-3.8 0c0-1.2 1.9-3.2 1.9-3.2Z" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.6 9.6a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.6" />
      <path d="M12 16.9v.1" />
    </>
  ),
  /* The spare: tyre, rim, hub. */
  tyre: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 11.9v.2" />
    </>
  ),
  /* Steam, rising in three lines. */
  steam: (
    <>
      <path d="M8 20c-1.3-1.5-1.3-2.9 0-4.3s1.3-2.9 0-4.3-1.3-2.9 0-4.3" />
      <path d="M12 20c-1.3-1.5-1.3-2.9 0-4.3s1.3-2.9 0-4.3-1.3-2.9 0-4.3-1.3-2.9 0-4.3" />
      <path d="M16 20c-1.3-1.5-1.3-2.9 0-4.3s1.3-2.9 0-4.3-1.3-2.9 0-4.3" />
    </>
  ),
  bolt: <path d="M13 3.5 6 13.5h5.5l-1 7 7-10H12l1-7Z" />,
  wrench: (
    <path d="M14.5 4.2a4.5 4.5 0 0 0-4.3 6.1l-5.6 5.6a1.9 1.9 0 0 0 2.7 2.7l5.6-5.6a4.5 4.5 0 0 0 6.1-4.3l-2.7 2.7-2.4-.6-.6-2.4 2.7-2.7a4.5 4.5 0 0 0-1.5-.2Z" />
  ),
  /* A charging plug — high voltage. */
  plug: (
    <>
      <path d="M9 3.5v4" />
      <path d="M15 3.5v4" />
      <path d="M6.5 7.5h11v3a5.5 5.5 0 0 1-11 0v-3Z" />
      <path d="M12 16v4.5" />
    </>
  ),
} satisfies Record<string, React.ReactNode>;

type GlyphName = IconName | keyof typeof LOCAL_PATHS;

function Glyph({
  name,
  size = 20,
  className,
  strokeWidth = 1.75,
}: {
  name: GlyphName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  if (!(name in LOCAL_PATHS)) {
    return <Icon name={name as IconName} size={size} className={className} strokeWidth={strokeWidth} />;
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      focusable="false"
    >
      {LOCAL_PATHS[name as keyof typeof LOCAL_PATHS]}
    </svg>
  );
}

/* ── Shared pieces ──────────────────────────────────────────────────────── */

/** Every GET QUOTE: "Every GET QUOTE button scrolls here." */
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

function WhatsAppButton({
  label,
  onGold,
  className = "",
}: {
  label: string;
  onGold?: boolean;
  className?: string;
}) {
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

/** A link to one of the specialist pages — "Link to specialist pages." */
function PageButton({ label, href, className = "" }: { label: string; href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`btn btn-gold min-h-[52px] rounded-full px-5 py-3 text-center text-[14px] leading-[18px] sm:px-7 sm:text-[15px] ${className}`}
    >
      {label}
      <Icon name="arrow" size={18} className="ml-2.5 shrink-0" />
    </Link>
  );
}

/* The brief gives every section a name and then a heading — "WHERE DID THE
   WATER COME FROM?" over "Tell Us What Caused the Problem". The name is the
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
          ? "text-ink/80 [&_a]:font-semibold [&_a]:underline [&_strong]:font-semibold [&_strong]:text-ink"
          : "text-body [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-white"
      } ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * The brief's capitalised lines — "THE WATER CAN COME BACK.", "FLOODED CAR
 * CLEANING IS QUOTE-ONLY." — set in the heading face. Sized per breakpoint,
 * because at a fixed size the longest of them ran five lines on a phone.
 */
function Statement({
  children,
  tone = "gold",
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "gold" | "white" | "ink";
  size?: "md" | "lg";
  className?: string;
}) {
  const color = tone === "gold" ? "text-gold" : tone === "ink" ? "text-ink" : "text-white";
  const scale =
    size === "lg"
      ? "text-[25px] min-[400px]:text-[30px] sm:text-[40px] lg:text-[46px]"
      : "text-[21px] min-[400px]:text-[24px] sm:text-[28px] lg:text-[32px]";
  return (
    <p className={`font-[family-name:var(--font-heading)] leading-[1.05] font-black uppercase ${scale} ${color} ${className}`}>
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

/** A cross for what the service does not include — "✕" in the brief. */
function Cross({ size = 20 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-white/70 ring-1 ring-white/15"
      style={{ width: size, height: size }}
    >
      <Icon name="close" size={Math.round(size * 0.5)} strokeWidth={2.6} />
    </span>
  );
}

function IconDisc({ name, size = 46, solid }: { name: GlyphName; size?: number; solid?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ${
        solid ? "bg-gold text-ink" : "bg-gold/12 text-gold ring-1 ring-gold/35"
      }`}
      style={{ width: size, height: size }}
    >
      <Glyph name={name} size={Math.round(size * 0.46)} />
    </span>
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

/** A plain list with gold dots. */
function Dots({ items, cols, className = "" }: { items: string[]; cols?: boolean; className?: string }) {
  return (
    <ul className={`grid gap-x-6 gap-y-2 ${cols ? "sm:grid-cols-2" : ""} ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[14.5px] leading-[21px] font-normal text-white/85">
          <span aria-hidden className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Small rounded tags — for runs of short items. */
function Chips({ items, onInk = true }: { items: string[]; onInk?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-full px-3 py-1.5 text-[13.5px] leading-[18px] font-normal ${
            onInk ? "bg-white/[0.05] text-white/85 ring-1 ring-white/10" : "bg-ink/[0.08] text-ink ring-1 ring-ink/20"
          }`}
        >
          <KeepHyphens text={item} />
        </li>
      ))}
    </ul>
  );
}

/** An "IMPORTANT" note inside a card. */
function Important({ title = "Important", children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 rounded-[12px] bg-gold/[0.07] p-4 ring-1 ring-gold/40 sm:p-5">
      <p className="flex items-center gap-2.5 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.22em] text-gold uppercase">
        <Icon name="info" size={16} className="shrink-0" />
        {title}
      </p>
      <div className="mt-2.5 grid gap-2 text-[14.5px] leading-[22px] font-semibold text-white">{children}</div>
    </div>
  );
}

/** Keeps a hyphenated word — "Water-Damaged" — from breaking at its hyphen. */
function KeepHyphens({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\S+-\S+)/).map((part, i) =>
        i % 2 ? (
          <span key={i} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/* ── 1. Hero ──────────────────────────────────────────────────────────────
   "First screen: FLOODED CAR? · WATER-DAMAGED INTERIOR? · MOBILE CLEANING
   ACROSS LONDON · [GET ASSESSMENT] [WHATSAPP PHOTOS]". The h1 and Section 1's
   own heading, then those three lines as one panel closing on Section 1's
   SEND PHOTOS FOR AN ASSESSMENT & QUOTE, then both buttons — all above the
   fold on a 375x812 phone. Section 1's card (its eight ticks) sits beside
   them from `lg`, under them on a phone; its IMPORTANT note is the next
   band's, beside the leak. */

const FIRST_SCREEN_ICONS: GlyphName[] = ["waves", "carpet"];

function Hero() {
  const h = FLOOD.hero;
  const [question, travel, offer] = h.intro;

  return (
    <section className="cut-bottom relative w-full overflow-hidden bg-ink-panel pt-[124px] pb-[calc(var(--cut)+2.75rem)] lg:pt-[158px] lg:pb-[calc(var(--cut)+4rem)]">
      <div aria-hidden className="livery absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 70% at 80% 40%, rgba(237,179,38,0.15) 0%, rgba(193,146,49,0.05) 46%, transparent 76%)",
        }}
      />

      <div className="shell relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <Reveal className="hidden sm:block">
              <span className="hero-rule speed-rule" aria-hidden />
            </Reveal>

            <Reveal delay={1}>
              <h1 className="max-w-[22ch] text-[clamp(27px,4.1vw,56px)] leading-[1.02] text-white sm:mt-7 lg:mt-6">
                {h.h1}
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <h2 className="mt-3.5 max-w-[44ch] font-[family-name:var(--font-sub)] text-[16.5px] leading-[1.3] font-semibold tracking-[0.03em] text-gold sm:text-[19px] xl:mt-5 xl:text-[21px]">
                {h.title}
              </h2>
            </Reveal>

            {/* The first screen. */}
            <Reveal delay={3}>
              <div className="mt-6 max-w-[660px] overflow-hidden rounded-[14px] bg-white/[0.04] ring-1 ring-gold/35 xl:mt-8">
                <ul className="grid divide-y divide-white/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {h.firstScreen.questions.map((q, i) => (
                    <li key={q} className="flex items-center gap-3 px-5 py-3 sm:flex-col sm:items-start sm:gap-2.5 sm:px-4 sm:py-4 xl:px-5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-gold ring-1 ring-white/15">
                        <Glyph name={FIRST_SCREEN_ICONS[i]} size={17} />
                      </span>
                      <span className="font-[family-name:var(--font-sub)] text-[16px] leading-tight font-semibold tracking-[0.04em] text-white uppercase xl:text-[17px]">
                        <KeepHyphens text={q} />
                      </span>
                    </li>
                  ))}
                  <li className="flex items-center gap-3 bg-gold/[0.1] px-5 py-3 sm:flex-col sm:items-start sm:gap-2.5 sm:px-4 sm:py-4 xl:px-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                      <Icon name="van" size={17} strokeWidth={2} />
                    </span>
                    <span className="font-[family-name:var(--font-sub)] text-[16px] leading-tight font-semibold tracking-[0.04em] text-gold uppercase xl:text-[17px]">
                      {h.firstScreen.answer}
                    </span>
                  </li>
                </ul>
                <p className="flex items-center gap-3 border-t border-gold/30 bg-gold px-5 py-3 font-[family-name:var(--font-sub)] text-[15px] leading-tight font-semibold tracking-[0.04em] text-ink uppercase sm:text-[16px]">
                  <Icon name="camera" size={19} strokeWidth={2} className="shrink-0" />
                  {h.send}
                </p>
              </div>
            </Reveal>

            <Reveal delay={4}>
              <div id="flood-hero-actions" className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:mt-8">
                <QuoteButton label={h.quoteLabel} className="w-full sm:w-auto" />
                <WhatsAppButton label={h.whatsappLabel} className="w-full sm:w-auto" />
              </div>
            </Reveal>

            <Reveal delay={5}>
              <p className="mt-7 max-w-[58ch] text-[17px] leading-[26px] font-semibold text-white xl:mt-8">{question}</p>
              <p className="mt-2 max-w-[58ch] text-[16px] leading-[26px] font-normal text-white/75 xl:text-[17px] xl:leading-[28px]">
                {travel}
              </p>
            </Reveal>
          </div>

          <Reveal delay={4} className="min-w-0 lg:col-span-5">
            <HeroCard />
          </Reveal>
        </div>

        <Reveal delay={5}>
          <p
            className="mt-10 max-w-[92ch] border-t border-white/10 pt-7 text-[15.5px] leading-[26px] font-normal text-white/70 lg:mt-12 [&_strong]:font-semibold [&_strong]:text-white"
            dangerouslySetInnerHTML={{ __html: offer }}
          />
        </Reveal>
      </div>
    </section>
  );
}

function HeroCard() {
  const c = FLOOD.hero.card;
  return (
    /* Photograph over the list in the hero's column and on a phone; side by
       side on a tablet, where a stacked card ran a 450px-tall picture across
       the full width. */
    <figure className="surface relative overflow-hidden md:grid md:grid-cols-2 lg:block">
      <div className="relative aspect-[3/2] w-full md:aspect-auto md:min-h-[300px] lg:aspect-[16/10] lg:min-h-0">
        <Image
          src={PHOTOS.hero.src}
          alt={PHOTOS.hero.alt}
          fill
          priority
          sizes="(min-width: 1024px) 38vw, (min-width: 768px) 46vw, 92vw"
          className="object-cover object-[40%_60%]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(13,13,13,0.85),transparent)]"
        />
      </div>
      <figcaption className="p-5 sm:p-6">
        <h3 className="font-[family-name:var(--font-sub)] text-[18px] leading-tight tracking-[0.03em] text-white uppercase sm:text-[20px]">
          <KeepHyphens text={c.title} />
        </h3>
        <ul className="mt-4 grid gap-x-4 gap-y-2.5 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
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

/* ── 2. Urgent information bar ────────────────────────────────────────────
   "WATER STILL ENTERING THE VEHICLE? THE LEAK NEEDS TO BE REPAIRED. Medusa
   cleans the interior — we do not repair the source of water ingress." The
   first band under the hero, on gold, the question as its heading and the
   answer at heading weight under it. Beside it, Section 1's IMPORTANT — the
   same boundary for every other fault — as the band's dark panel. */

function Urgent() {
  const u = FLOOD.urgent;
  const imp = FLOOD.hero.important;
  return (
    <section id="flood-urgent" className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-7">
          <SectionHead title={u.question} tone="gold" />
          <Reveal delay={2}>
            <Statement tone="ink" className="mt-5">
              {u.statement}
            </Statement>
          </Reveal>
          <Reveal delay={3}>
            <p className="measure mt-6 flex gap-3 text-[17px] leading-[27px] font-semibold text-ink">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-gold">
                <Glyph name="wrench" size={14} strokeWidth={2} />
              </span>
              {u.strong}
            </p>
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-5">
          <div className="surface-on-gold p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <IconDisc name="warning" size={42} solid />
              <h3 className="font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.22em] text-gold uppercase">
                {imp.title}
              </h3>
            </div>
            <p className="mt-5 text-[16px] leading-[26px] font-semibold text-white">{imp.strong}</p>
            <p className="mt-3 text-[15px] leading-[24px] font-normal text-white/75">{imp.body}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 3. Water severity · Section 2 ────────────────────────────────────────
   "WATER SEVERITY — Visual cards: DAMP CARPET · SOAKING WET · STANDING WATER
   · FLOODED INTERIOR. This helps customers self-identify severity." Section
   2 is what that scale is about — how far water travels, and what it does
   the longer it stays — so the scale is its last panel, four cards filling
   with water one drop at a time, under the brief's "THE FIRST STEP IS TO
   UNDERSTAND HOW MUCH WATER IS PRESENT AND WHERE IT CAME FROM." and over
   its UPLOAD PHOTOS FOR ASSESSMENT. */

function WaterInside() {
  const s = FLOOD.water;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={s.heading} />
            <Kicker>{s.title}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-5">
            <p className="text-[18px] leading-[28px] font-semibold text-white">{s.lead}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
          <Reveal className="surface p-6 sm:p-8 lg:col-span-7">
            <div className="flex items-center gap-3">
              <IconDisc name="droplet" size={40} />
              <h3 className="text-[16px] leading-[23px] font-semibold text-white">{s.travelLead}</h3>
            </div>
            <Dots items={s.travel} cols className="mt-5" />
          </Reveal>
          <Reveal delay={1} className="surface p-6 sm:p-8 lg:col-span-5">
            <div className="flex items-center gap-3">
              <IconDisc name="clock" size={40} />
              <h3 className="text-[16px] leading-[23px] font-semibold text-white">{s.risksLead}</h3>
            </div>
            <Dots items={s.risks} className="mt-5" />
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="mt-6 rounded-[14px] bg-gold/[0.07] p-6 ring-1 ring-gold/40 sm:p-8 lg:mt-8 lg:p-10">
            <Label>{s.severity.label}</Label>
            <ol className="mt-5 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {s.severity.levels.map((level, i) => (
                <li
                  key={level}
                  className="flex flex-col justify-between gap-5 rounded-[12px] bg-ink-panel p-4 ring-1 ring-white/[0.08] sm:p-5"
                >
                  {/* One drop more at each level — the scale is the picture. */}
                  <span aria-hidden className="flex gap-1 text-gold">
                    {s.severity.levels.map((_, j) =>
                      j <= i ? (
                        <Icon key={j} name="droplet" size={18} variant="solid" />
                      ) : (
                        <Icon key={j} name="droplet" size={18} className="text-white/20" />
                      ),
                    )}
                  </span>
                  <span className="font-[family-name:var(--font-sub)] text-[16px] leading-tight font-semibold tracking-[0.04em] text-white uppercase sm:text-[18px]">
                    {level}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col gap-6 border-t border-gold/25 pt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <Statement tone="white" className="max-w-[34ch]">
                {s.statement}
              </Statement>
              <QuoteButton label={s.uploadLabel} className="w-full shrink-0 lg:w-auto" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Section 3. Important safety information ─────────────────────────────
   "There is an important difference between: A WET INTERIOR … and: A
   SERIOUSLY FLOODED OR SUBMERGED VEHICLE". The two side by side with the
   brief's "and:" between them, the second marked as the warning it is; then
   its two capitalised lines as the band's dark panel, at heading size. */

function Safety() {
  const s = FLOOD.safety;
  return (
    <section id="safety" className="w-full scroll-mt-24 bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.title}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-5">
            <p className="text-[18px] leading-[28px] font-semibold text-ink">{s.lead}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-5">
          <Reveal className="surface-on-gold p-6 sm:p-8">
            <IconDisc name="droplet" size={50} />
            <h3 className="mt-5 font-[family-name:var(--font-sub)] text-[21px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[23px]">
              {s.wet.title}
            </h3>
            <Label className="mt-4">{s.wet.lead}</Label>
            <Dots items={s.wet.items} className="mt-3" />
          </Reveal>

          <Reveal delay={1} className="flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink/[0.12] font-[family-name:var(--font-sub)] text-[17px] font-semibold tracking-[0.04em] text-ink ring-1 ring-ink/30">
              {s.and}
            </span>
          </Reveal>

          <Reveal delay={2} className="surface-on-gold p-6 ring-1 ring-gold/60 sm:p-8">
            <IconDisc name="warning" size={50} solid />
            <h3 className="mt-5 font-[family-name:var(--font-sub)] text-[21px] leading-tight tracking-[0.02em] text-gold uppercase sm:text-[23px]">
              {s.serious.title}
            </h3>
            <Label className="mt-4">{s.serious.lead}</Label>
            <Dots items={s.serious.items} className="mt-3" />
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="relative mt-6 overflow-hidden rounded-[14px] bg-ink p-6 ring-1 ring-gold/40 sm:p-8 lg:mt-8 lg:p-12">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(60% 90% at 85% 100%, rgba(193,146,49,0.14) 0%, transparent 70%)" }}
            />
            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-7">
                <IconDisc name="shield" size={44} solid />
                <Statement tone="white" className="mt-5">
                  {s.company}
                </Statement>
                <p className="mt-5 max-w-[70ch] text-[16px] leading-[26px] font-normal text-white/75">{s.body}</p>
              </div>
              <div className="border-t border-gold/30 pt-7 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink">
                  <Icon name="warning" size={21} strokeWidth={2} />
                </span>
                <Statement className="mt-5">{s.warning}</Statement>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 4. Where did the water come from? ────────────────────────────────────
   "Visual cards: RAIN · SUNROOF · DOOR/WINDOW · BOOT · FLOODING · UNKNOWN".
   The section's seven causes, each marked with what it comes through, and
   its IMPORTANT as the eighth cell — the one gold one, carrying "WE DO NOT
   DIAGNOSE OR REPAIR THE LEAK." in the heading face. */

const CAUSE_ICONS: GlyphName[] = ["rain", "door", "sunroof", "drain", "boot", "waves", "question"];

function Source() {
  const s = FLOOD.source;
  const imp = s.important;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={s.heading} />
            <Kicker>{s.title}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-5">
            <p className="text-[18px] leading-[28px] font-semibold text-white">{s.lead}</p>
            <p className="mt-2 text-[16px] leading-[26px] font-normal text-white/70">{s.causesLead}</p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {s.causes.map((c, i) => (
            <Reveal as="li" key={c.name} delay={i % 4} className="surface group relative overflow-hidden p-6">
              <IconDisc name={CAUSE_ICONS[i] ?? "droplet"} size={50} />
              <h3 className="mt-5 font-[family-name:var(--font-sub)] text-[19px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[20px]">
                {c.name}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[24px] font-normal text-white/75">{c.body}</p>
              <HoverRule />
            </Reveal>
          ))}
          <Reveal as="li" delay={3} className="relative overflow-hidden rounded-[14px] bg-gold-wash p-6 text-ink">
            <p className="flex items-center gap-2.5 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.22em] uppercase">
              <Icon name="info" size={16} className="shrink-0" />
              {imp.title}
            </p>
            <p className="mt-3 text-[15px] leading-[23px] font-semibold">{imp.body}</p>
            <p className="mt-4 font-[family-name:var(--font-heading)] text-[23px] leading-[1.05] font-black uppercase sm:text-[25px]">
              {imp.statement}
            </p>
            <p className="mt-4 text-[14.5px] leading-[22px] font-normal text-ink/80">{imp.after}</p>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

/* ── Section 5. Why the source must be fixed ─────────────────────────────
   The section's own example — a footwell cleaned and dried, a sunroof drain
   still leaking — and then, as the band's dark panel, "The next time it
   rains: THE WATER CAN COME BACK." with the eight other leaks it applies
   to. Its last two sentences, who does what, close the band. */

function Fix() {
  const s = FLOOD.fix;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.title}</Kicker>
            <Reveal delay={3}>
              <p className="measure mt-5 text-[18px] leading-[28px] font-semibold text-ink">{s.lead}</p>
              <Prose html={s.imagine} onGold />
            </Reveal>
          </div>

          <Reveal delay={2} className="lg:col-span-7">
            <div className="surface-on-gold relative overflow-hidden p-6 sm:p-8 lg:p-10">
              <div
                aria-hidden
                className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(193,146,49,0.18),transparent_70%)]"
              />
              <div className="relative">
                <p className="flex items-center gap-3 font-[family-name:var(--font-sub)] text-[17px] tracking-[0.04em] text-white/65 uppercase">
                  <Glyph name="rain" size={22} className="shrink-0 text-gold" />
                  {s.next}
                </p>
                <Statement size="lg" className="mt-3">
                  {s.statement}
                </Statement>
                <Label className="mt-8">{s.sameLead}</Label>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.same.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 rounded-full bg-white/[0.04] py-2 pr-4 pl-3 text-[14px] leading-[18px] font-semibold text-white/90 ring-1 ring-white/[0.08]"
                    >
                      <Icon name="refresh" size={15} className="shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="mt-6 grid gap-4 rounded-[14px] bg-ink/[0.08] p-6 ring-1 ring-ink/25 sm:p-8 lg:mt-8 lg:grid-cols-2 lg:gap-10 lg:p-10">
            <p
              className="flex gap-3 text-[16.5px] leading-[27px] font-normal text-ink/85 [&_strong]:font-semibold [&_strong]:text-ink"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-gold">
                <Icon name="vacuum" size={15} strokeWidth={2} />
              </span>
              <span dangerouslySetInnerHTML={{ __html: s.roleHtml }} />
            </p>
            <p className="flex gap-3 text-[16.5px] leading-[27px] font-normal text-ink/85">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-gold">
                <Glyph name="wrench" size={15} strokeWidth={2} />
              </span>
              <span>{s.specialist}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Section 6. What areas can we assess? ──────────────────────────────── */

const AREA_ICONS: Record<string, GlyphName> = {
  Carpets: "carpet",
  Footwells: "footwell",
  Boot: "boot",
  "Fabric Upholstery": "seat",
  Leather: "seat-edge",
  "Floor Mats": "mat",
  "Interior Surfaces": "brush",
  "Spare-Wheel Area": "tyre",
  "Multiple Areas": "layers",
};

function Areas() {
  const s = FLOOD.areas;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionHead title={s.heading} />
            <Kicker>{s.title}</Kicker>
            <Reveal delay={3}>
              <p className="mt-5 text-[17px] leading-[27px] font-semibold text-white">{s.lead}</p>
            </Reveal>
          </div>
          <Reveal delay={3} className="w-full sm:w-auto">
            <QuoteButton label={s.ctaLabel} className="w-full sm:w-auto" />
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {s.items.map((a, i) => (
            <Reveal as="li" key={a.name} delay={i % 3} className="surface group relative flex gap-5 overflow-hidden p-6 sm:p-7">
              <IconDisc name={AREA_ICONS[a.name] ?? "check"} size={50} />
              <div className="min-w-0">
                <h3 className="font-[family-name:var(--font-sub)] text-[19px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[20px]">
                  <KeepHyphens text={a.name} />
                </h3>
                <p className="mt-2 text-[15px] leading-[24px] font-normal text-white/75">{a.body}</p>
              </div>
              <HoverRule />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 5. Our process ───────────────────────────────────────────────────────
   "Visual: ASSESS ↓ EXTRACT ↓ DEEP CLEAN ↓ STEAM WHERE APPROPRIATE ↓ DRY ↓
   ODOUR TREATMENT IF REQUIRED ↓ INSPECT". That line is the band's picture,
   as a strip, beside the photograph of water being extracted from a seat;
   the eight steps follow it as cards in the brief's full wording, each
   IMPORTANT kept with its step. */

const STEP_ICONS: GlyphName[] = ["search", "droplet", "brush", "vacuum", "steam", "wind", "ozone", "eye"];

function Process() {
  const s = FLOOD.process;
  return (
    <section id="process" className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.title}</Kicker>
            <Reveal delay={3}>
              <p className="measure mt-5 text-[18px] leading-[28px] font-semibold text-ink">{s.lead}</p>
              <Prose html={s.typical} onGold />
            </Reveal>
          </div>
          <Reveal delay={2} className="lg:col-span-5">
            <figure className="relative overflow-hidden rounded-[14px] ring-1 ring-ink/15">
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={PHOTOS.extraction.src}
                  alt={PHOTOS.extraction.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </Reveal>
        </div>

        {/* The layout's line, as a strip. */}
        <Reveal delay={1}>
          <ol aria-hidden className="mt-12 grid grid-cols-2 gap-2.5 rounded-[14px] bg-ink p-3 sm:grid-cols-4 xl:grid-cols-7">
            {s.flow.map((stage, i) => {
              const last = i === s.flow.length - 1;
              return (
                <li
                  key={stage}
                  className={`flex min-h-[86px] flex-col justify-between rounded-[10px] px-3.5 py-3 ${
                    i === 1 ? "bg-gold text-ink" : "bg-white/[0.04] text-white ring-1 ring-white/[0.08]"
                  } ${last ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  <span className="flex items-center justify-between">
                    <span
                      className={`font-[family-name:var(--font-display)] text-[18px] leading-none ${
                        i === 1 ? "text-ink/70" : "text-gold"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {!last && (
                      <Icon name="arrow" size={15} className={i === 1 ? "text-ink/60" : "text-white/35"} />
                    )}
                  </span>
                  <span className="mt-2.5 font-[family-name:var(--font-sub)] text-[15px] leading-tight font-semibold tracking-[0.05em] uppercase">
                    {stage}
                  </span>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:gap-5 xl:grid-cols-4">
          {s.steps.map((step, i) => (
            <ProcessStep key={step.title} step={step} n={i + 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepTitle({ step }: { step: Step }) {
  if (!step.link) return <>{step.title}</>;
  const [before, after] = step.title.split(step.link.text);
  return (
    <>
      {before}
      <Link
        href={step.link.href}
        className="underline decoration-gold/50 underline-offset-[5px] transition-colors hover:text-gold"
      >
        {step.link.text}
      </Link>
      {after}
    </>
  );
}

function ProcessStep({ step, n }: { step: Step; n: number }) {
  return (
    <Reveal as="li" delay={(n - 1) % 4} className="surface-on-gold group relative flex flex-col overflow-hidden p-6">
      <div className="flex items-start justify-between gap-4">
        <IconDisc name={STEP_ICONS[n - 1] ?? "check"} />
        <span aria-hidden className="font-[family-name:var(--font-display)] text-[48px] leading-[0.8] text-white/[0.09]">
          {String(n).padStart(2, "0")}
        </span>
      </div>
      <Label className="mt-5">Step {n}</Label>
      <h3 className="mt-1 font-[family-name:var(--font-sub)] text-[19px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[20px]">
        <StepTitle step={step} />
      </h3>
      {step.body.map((p) => (
        <p key={p} className="mt-2.5 text-[14.5px] leading-[23px] font-normal text-white/75">
          {p}
        </p>
      ))}
      {step.list && (
        <div className="mt-4 rounded-[10px] bg-white/[0.04] px-4 py-3.5 ring-1 ring-white/[0.07]">
          <p className="text-[13.5px] leading-[20px] font-semibold text-gold">{step.list.lead}</p>
          <ul className="mt-2 grid gap-1.5">
            {step.list.items.map((item) => (
              <li key={item} className="flex gap-2.5 text-[14px] leading-[20px] font-semibold text-white/90">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {step.after?.map((p) => (
        <p key={p} className="mt-3.5 text-[14.5px] leading-[23px] font-semibold text-white">
          {p}
        </p>
      ))}
      {step.important && (
        <Important>
          <p className="text-[14px] leading-[21px] font-semibold text-white">{step.important}</p>
        </Important>
      )}
      <HoverRule />
    </Reveal>
  );
}

/* ── 6. Carpet layer diagram · Section 8 ──────────────────────────────────
   "Show: CARPET ↓ BACKING ↓ UNDERLAY ↓ VEHICLE FLOOR. Headline: THE SURFACE
   CAN FEEL DRY WHILE MOISTURE REMAINS BELOW." The section's four layers in
   its own words as a cross-section — the visible pile dry, water held in
   everything under it — titled with the layout's headline, beside the
   section's copy and its IMPORTANT. */

function Layers() {
  const s = FLOOD.layers;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <SectionHead title={s.heading} />
          <Kicker>{s.title}</Kicker>
          <Reveal delay={3}>
            <p className="measure mt-5 text-[18px] leading-[28px] font-semibold text-white">{s.lead[0]}</p>
            <Prose html={s.lead[1]} space="mt-2" />
            <Prose html={s.why} space="mt-6" />
            <Label className="mt-7">{s.trappedLead}</Label>
            <div className="mt-3">
              <Chips items={s.trapped} />
            </div>
            <div className="mt-8 max-w-[68ch] rounded-[14px] bg-gold/[0.07] p-5 ring-1 ring-gold/40 sm:p-6">
              <p className="flex items-center gap-2.5 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.22em] text-gold uppercase">
                <Icon name="info" size={16} className="shrink-0" />
                {s.important.title}
              </p>
              <p className="mt-2.5 text-[15.5px] leading-[24px] font-semibold text-white">{s.important.body[0]}</p>
              <p className="mt-2 text-[15px] leading-[24px] font-normal text-white/70">{s.important.body[1]}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-5">
          <FloorDiagram />
        </Reveal>
      </div>
    </section>
  );
}

/* Four slabs, top to bottom, each drawn as the material it is: the pile, a
   thin backing, a thick underlay, the floor pan. The droplets sit in the
   three under the surface — which is the whole point of the headline. */
const LAYER_STYLE = [
  "h-[58px] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.16)_0_2px,transparent_2px_7px)] bg-[#2a2a2a]",
  "h-[30px] bg-[#3a352b]",
  "h-[72px] bg-[repeating-linear-gradient(135deg,rgba(193,146,49,0.18)_0_6px,rgba(193,146,49,0.08)_6px_12px)] bg-[#1d1a14]",
  "h-[36px] bg-[linear-gradient(180deg,#5c5c5c,#2e2e2e)]",
];

function FloorDiagram() {
  const s = FLOOD.layers;
  return (
    <figure className="surface p-6 sm:p-8 lg:sticky lg:top-32">
      <figcaption className="flex gap-3 font-[family-name:var(--font-sub)] text-[17px] leading-[1.25] font-semibold tracking-[0.03em] text-gold uppercase sm:text-[19px]">
        <Icon name="layers" size={22} className="mt-0.5 shrink-0" />
        {s.diagram}
      </figcaption>
      <ol className="mt-7">
        {s.layers.map((layer, i) => (
          <li key={layer}>
            {i > 0 && (
              <span aria-hidden className="flex justify-center py-1.5 text-gold">
                <Icon name="arrow" size={16} strokeWidth={2.2} className="rotate-90" />
              </span>
            )}
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <div className={`relative overflow-hidden rounded-[8px] ring-1 ring-white/10 ${LAYER_STYLE[i]}`}>
                {i > 0 && (
                  <span aria-hidden className="absolute inset-0 flex items-center justify-around px-3 text-gold/80">
                    {Array.from({ length: i === 2 ? 5 : 3 }, (_, k) => (
                      <Icon key={k} name="droplet" size={i === 2 ? 16 : 12} variant="solid" />
                    ))}
                  </span>
                )}
              </div>
              <span className="w-[118px] font-[family-name:var(--font-ui)] text-[11.5px] leading-[16px] font-semibold tracking-[0.14em] text-white uppercase sm:w-[140px]">
                {layer}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* ── 7. Mould & odour · Sections 9 and 10 ─────────────────────────────────
   "Link to specialist pages." Side by side, each under its own name: what
   to do first, the line the brief capitalises, its link to the specialist
   page laid on the brief's bold words, and its VIEW button. */

function MouldOdour() {
  const m = FLOOD.mould;
  const o = FLOOD.odour;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-10 xl:gap-14">
        <div className="flex min-w-0 flex-col">
          <SectionHead title={m.heading} tone="gold" />
          <Kicker onGold>{m.title}</Kicker>
          <Reveal delay={3}>
            <p className="mt-5 text-[17px] leading-[27px] font-semibold text-ink">{m.lead}</p>
          </Reveal>
          <Reveal delay={2} className="surface-on-gold mt-7 flex flex-1 flex-col p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <IconDisc name="mould" size={44} />
              <p className="text-[15.5px] leading-[23px] font-semibold text-white/80">{m.ifPresent}</p>
            </div>
            <Statement className="mt-4">{m.statement}</Statement>
            <Label className="mt-7">{m.photosLead}</Label>
            <div className="mt-3">
              <Chips items={m.photos} />
            </div>
            <Prose html={m.specialistHtml} space="mt-6" className="text-[15.5px]" />
            <Important title={m.important.title}>
              {m.important.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Important>
            <div className="mt-auto pt-7">
              <PageButton label={m.ctaLabel} href={LINKS.mould} className="w-full sm:w-auto" />
            </div>
          </Reveal>
        </div>

        <div className="flex min-w-0 flex-col">
          <SectionHead title={o.heading} tone="gold" />
          <Kicker onGold>{o.title}</Kicker>
          <Reveal delay={3}>
            <p className="mt-5 text-[17px] leading-[27px] font-semibold text-ink">{o.lead}</p>
          </Reveal>
          <Reveal delay={2} className="surface-on-gold mt-7 flex flex-1 flex-col p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <IconDisc name="wind" size={44} />
              <p className="text-[15.5px] leading-[23px] font-semibold text-white/80">{o.sourcesLead}</p>
            </div>
            <div className="mt-4">
              <Chips items={o.sources} />
            </div>
            <p className="mt-6 text-[15.5px] leading-[25px] font-normal text-white/80">{o.improve}</p>
            <p className="mt-5 font-[family-name:var(--font-sub)] text-[16px] tracking-[0.04em] text-white/60 uppercase">
              {o.however}
            </p>
            <Statement className="mt-1.5">{o.statement}</Statement>
            <p className="mt-4 text-[15.5px] leading-[25px] font-semibold text-white">{o.returns}</p>
            <Prose html={o.ozoneHtml} space="mt-4" className="text-[15.5px]" />
            <div className="mt-auto pt-7">
              <PageButton label={o.ctaLabel} href={LINKS.odour} className="w-full sm:w-auto" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Section 11. Clean rainwater vs contaminated floodwater ──────────────
   The three kinds of water as a scale from the plainest to the one that
   "requires a different level of consideration", and the section's
   IMPORTANT — the six contaminants, "tell us before booking." — as the
   band's gold-ringed panel. */

const WATER_ICONS: GlyphName[] = ["rain", "waves", "warning"];

function WaterType() {
  const s = FLOOD.waterType;
  const imp = s.important;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-8">
            <SectionHead title={s.heading} />
            <Kicker>{s.title}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-4">
            <p className="text-[20px] leading-[28px] font-semibold text-white">{s.lead}</p>
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-5">
          {s.types.map((t, i) => {
            const last = i === s.types.length - 1;
            return (
              <Reveal
                as="li"
                key={t.name}
                delay={i}
                className={`surface group relative overflow-hidden p-6 sm:p-7 ${last ? "ring-1 ring-gold/50" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <IconDisc name={WATER_ICONS[i]} size={50} solid={last} />
                  <span aria-hidden className="mt-1 flex gap-1">
                    {s.types.map((_, j) => (
                      <span
                        key={j}
                        className={`h-2 w-6 rounded-full ${j <= i ? "bg-gold" : "bg-white/[0.1]"}`}
                      />
                    ))}
                  </span>
                </div>
                <h3
                  className={`mt-5 font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.02em] uppercase sm:text-[21px] ${
                    last ? "text-gold" : "text-white"
                  }`}
                >
                  {t.name}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[24px] font-normal text-white/75">{t.body}</p>
                <HoverRule />
              </Reveal>
            );
          })}
        </ol>

        <Reveal delay={1}>
          <div className="mt-6 grid gap-6 rounded-[14px] bg-gold/[0.07] p-6 ring-1 ring-gold/45 sm:p-8 lg:mt-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
            <div className="lg:col-span-6">
              <p className="flex items-center gap-2.5 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.22em] text-gold uppercase">
                <Icon name="warning" size={16} className="shrink-0" />
                {imp.title}
              </p>
              <p className="mt-3 text-[16px] leading-[25px] font-semibold text-white">{imp.lead}</p>
              <div className="mt-4">
                <Chips items={imp.items} />
              </div>
              <p className="mt-4 font-[family-name:var(--font-sub)] text-[19px] leading-tight font-semibold tracking-[0.03em] text-gold uppercase">
                {imp.tell}
              </p>
            </div>
            <div className="grid content-center gap-4 border-t border-gold/25 pt-6 lg:col-span-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
              {imp.body.map((p) => (
                <p key={p} className="text-[15.5px] leading-[25px] font-normal text-white/80">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 8. Important safety boundary · Sections 13 and 14 ────────────────────
   "Explain submerged vehicles/electrical issues." What Medusa does not
   diagnose beside what should send a car to a professional first; then the
   brief's "CLEANING THE INTERIOR DOES NOT CONFIRM THAT THE VEHICLE IS
   MECHANICALLY OR ELECTRICALLY SAFE." on the gold itself, at heading size;
   then electric and hybrid vehicles as the band's dark panel, under their
   own name, its "DO NOT RELY ON A DETAILING ASSESSMENT." as large again. */

function Electrical() {
  const e = FLOOD.electrical;
  const v = FLOOD.ev;
  return (
    <section id="electrical" className="w-full scroll-mt-24 bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={e.heading} tone="gold" />
            <Kicker onGold>{e.title}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-5">
            <p className="text-[17px] leading-[27px] font-semibold text-ink">{e.lead}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
          <Reveal className="surface-on-gold p-6 sm:p-8 lg:col-span-7">
            <div className="flex items-center gap-3">
              <IconDisc name="bolt" size={42} />
              <h3 className="text-[16px] leading-[23px] font-semibold text-white">{e.notLead}</h3>
            </div>
            <Dots items={e.not} cols className="mt-5" />
          </Reveal>
          <Reveal delay={1} className="surface-on-gold p-6 ring-1 ring-gold/50 sm:p-8 lg:col-span-5">
            <div className="flex items-center gap-3">
              <IconDisc name="warning" size={42} solid />
              <h3 className="font-[family-name:var(--font-sub)] text-[19px] leading-tight font-semibold tracking-[0.04em] text-gold uppercase">
                {e.ifLead}
              </h3>
            </div>
            <Dots items={e.if} className="mt-5" />
            <p className="mt-5 border-t border-white/[0.08] pt-4 text-[15.5px] leading-[24px] font-semibold text-white">
              {e.ifAfter}
            </p>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-start lg:mt-12">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-gold">
              <Icon name="warning" size={23} strokeWidth={2} />
            </span>
            <Statement tone="ink" size="lg" className="max-w-[30ch]">
              {e.statement}
            </Statement>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="relative mt-10 overflow-hidden rounded-[14px] bg-ink p-6 ring-1 ring-gold/40 sm:p-8 lg:mt-12 lg:p-12">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(60% 90% at 90% 0%, rgba(193,146,49,0.14) 0%, transparent 70%)" }}
            />
            <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-3">
                  <IconDisc name="plug" size={44} solid />
                  <h2 className="font-[family-name:var(--font-sub)] text-[22px] leading-tight font-semibold tracking-[0.03em] text-white uppercase sm:text-[26px]">
                    {v.heading}
                  </h2>
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.03em] text-gold uppercase sm:text-[19px]">
                  {v.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[26px] font-semibold text-white">{v.lead}</p>
                <p className="mt-3 text-[15.5px] leading-[25px] font-normal text-white/75">{v.ifLead}</p>
              </div>
              <div className="border-t border-gold/30 pt-7 lg:col-span-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                <Statement>{v.statement}</Statement>
                {v.body.map((p, i) => (
                  <p
                    key={p}
                    className={`mt-4 text-[15.5px] leading-[25px] ${i === 0 ? "font-semibold text-white" : "font-normal text-white/75"}`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 9. What we don't repair · Section 12 ─────────────────────────────────
   "Simple icons: LEAKS · ELECTRICS · MECHANICAL · SEALS · DRAINS". Those five,
   each crossed through, over the section's fourteen exclusions. */

const NOT_ICONS: GlyphName[] = ["droplet", "bolt", "wrench", "door", "drain"];

function NotIncluded() {
  const s = FLOOD.notIncluded;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <SectionHead title={s.heading} />
        <Kicker>{s.title}</Kicker>

        <Reveal delay={1}>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {s.icons.map((name, i) => (
              <li
                key={name}
                className={`flex flex-col items-center gap-3 rounded-[14px] bg-white/[0.03] px-3 py-5 text-center ring-1 ring-white/[0.08] ${
                  i === s.icons.length - 1 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold/12 text-gold ring-1 ring-gold/35">
                  <Glyph name={NOT_ICONS[i]} size={26} />
                  <span className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white ring-2 ring-gold/60">
                    <Icon name="close" size={12} strokeWidth={2.8} />
                  </span>
                </span>
                <span className="font-[family-name:var(--font-sub)] text-[16px] leading-tight font-semibold tracking-[0.06em] text-white uppercase">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={1}>
          <div className="surface mt-6 p-6 sm:p-8 lg:mt-8 lg:p-10">
            <h3 className="text-[17px] leading-[25px] font-semibold text-white">
              {s.lead.split("NOT").map((part, i) =>
                i ? (
                  <span key={i}>
                    <strong className="font-bold text-gold">NOT</strong>
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
            </h3>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {s.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-white/[0.06] py-3 text-[15px] leading-[21px] font-normal text-white/85"
                >
                  <Cross size={22} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex gap-3 text-[16px] leading-[25px] font-semibold text-white">
              <Glyph name="wrench" size={20} className="mt-0.5 shrink-0 text-gold" />
              {s.after}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 11. Why quote only? · Section 16 ─────────────────────────────────────
   "Explain severity differences." The fourteen things a price depends on,
   then "For this reason: FLOODED CAR CLEANING IS QUOTE-ONLY." as the band's
   dark panel, with the photographs it asks for and GET MY QUOTE. */

function QuoteOnly() {
  const s = FLOOD.quoteOnly;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.title}</Kicker>
          </div>
          <Reveal delay={2} className="lg:col-span-7">
            <div className="surface-on-gold p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <IconDisc name="gauge" size={42} />
                <h3 className="text-[16px] leading-[23px] font-semibold text-white">{s.factorsLead}</h3>
              </div>
              <div className="mt-5">
                <Chips items={s.factors} />
              </div>
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
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div>
                <p className="font-[family-name:var(--font-sub)] text-[17px] tracking-[0.04em] text-white/60 uppercase">
                  {s.reason}
                </p>
                <Statement size="lg" className="mt-2">
                  <KeepHyphens text={s.statement} />
                </Statement>
                <p className="mt-5 flex items-center gap-3 text-[16px] leading-[25px] font-semibold text-white">
                  <Icon name="camera" size={20} className="shrink-0 text-gold" />
                  {s.photos}
                </p>
              </div>
              <QuoteButton label={s.ctaLabel} className="w-full shrink-0 lg:w-auto" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 12. Why Medusa? · Section 17 ─────────────────────────────────────────
   "Short trust section." Six cards, its two add-ons linked to their pages
   on the copy's own words. */

const WHY_ICONS: Record<string, GlyphName> = {
  "Mobile Service": "van",
  "Professional Extraction Equipment": "vacuum",
  "Interior Cleaning Experience": "seat",
  "Specialist Add-On Services": "plus",
  "Honest Expectations": "gauge",
  "Photo-Based Assessment": "camera",
};

function WhyMedusa() {
  const w = FLOOD.why;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionHead title={w.heading} />
            <Kicker>{w.title}</Kicker>
          </div>
          <Reveal delay={3} className="w-full sm:w-auto">
            <QuoteButton label={w.ctaLabel} className="w-full sm:w-auto" />
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {w.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i % 3} className="surface group relative overflow-hidden p-6 sm:p-7">
              <div className="flex items-center gap-4 sm:block">
                <IconDisc name={WHY_ICONS[it.title] ?? "check"} size={50} />
                <h3 className="font-[family-name:var(--font-sub)] text-[20px] leading-tight text-white uppercase sm:mt-6">
                  <KeepHyphens text={it.title} />
                </h3>
              </div>
              <p
                className="mt-3 text-[15px] leading-[25px] font-normal text-white/75 [&_a]:font-semibold [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-gold-bright"
                dangerouslySetInnerHTML={{ __html: it.bodyHtml }}
              />
              <HoverRule />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 14. Assessment form ──────────────────────────────────────────────────
   "This should be the primary conversion point. Anchor:
   #get-flooded-car-quote." The form on ink, and beside it the brief's seven
   customer messages — "Keep these messages consistent on the webpage, quote
   form …" — so they are read where the four acknowledgements ask for
   agreement to them. WhatsApp and the phone number sit under them from
   `lg`, where the column has room; on a phone the hero and sticky bar carry
   both. */

const MESSAGE_ICONS: GlyphName[] = ["check", "droplet", "shield", "layers", "mould", "plug", "camera"];

function Quote() {
  const q = FLOOD.quote;
  return (
    <section id={FORM_ANCHOR} className="w-full scroll-mt-20 py-16 lg:scroll-mt-24 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead title={q.heading} />
            <Kicker>{q.title}</Kicker>
            <Reveal delay={3}>
              <ul className="mt-7 grid gap-2.5">
                {q.messages.map((m, i) => (
                  <li
                    key={m}
                    className={`flex items-center gap-3 rounded-[10px] px-4 py-3 text-[14.5px] leading-[20px] font-semibold ring-1 ${
                      i === 0
                        ? "bg-gold/[0.1] text-white ring-gold/40"
                        : "bg-white/[0.03] text-white/90 ring-white/[0.08]"
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold ring-1 ring-gold/35">
                      <Glyph name={MESSAGE_ICONS[i] ?? "check"} size={14} strokeWidth={2} />
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
              <div className="mt-8 hidden flex-col gap-4 lg:flex">
                <WhatsAppButton label={FLOOD.hero.whatsappLabel} className="self-start" />
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
          <FloodedAssessmentForm id={`${FORM_ANCHOR}-form`} thanks={FLOOD.thanks} whatsapp={WHATSAPP} />
        </div>
      </div>
    </section>
  );
}

/* ── 15. FAQ · 16. Important service information ──────────────────────────
   "Accordion." and "Expectation-setting." One gold band: the questions, then
   the nine points the brief asks to be read "Before Proceeding" as its dark
   panel — PERMANENT DAMAGE with its list, PAYMENT in the brief's bold —
   so the page meets the ink close on gold. */

function FaqTerms() {
  const f = FLOOD.faq;
  const t = FLOOD.terms;
  const cell = "border-t border-white/[0.07] pt-5";
  const name = "font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.04em] text-gold uppercase";
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
          <div id="service-information" className="mt-16 scroll-mt-24 rounded-[14px] bg-ink p-6 ring-1 ring-gold/40 sm:p-8 lg:mt-24 lg:p-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <IconDisc name="shield" size={50} solid />
              <div>
                <h2 className="font-[family-name:var(--font-sub)] text-[23px] leading-tight font-semibold tracking-[0.03em] text-white uppercase sm:text-[28px]">
                  {t.heading}
                </h2>
                <h3 className="mt-1.5 font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.22em] text-gold uppercase">
                  {t.title}
                </h3>
              </div>
            </div>

            <ol className="mt-9 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              {t.items.map((it) => (
                <li key={it.name} className={cell}>
                  <h4 className={name}>{it.name}</h4>
                  <p className="mt-2.5 text-[15px] leading-[24px] font-normal text-white/80">{it.body}</p>
                </li>
              ))}
              <li className={cell}>
                <h4 className={name}>{t.permanent.name}</h4>
                <p className="mt-2.5 text-[15px] leading-[24px] font-normal text-white/80">{t.permanent.lead}</p>
                <Dots items={t.permanent.items} className="mt-3" />
              </li>
              <li className={cell}>
                <h4 className={name}>{t.payment.name}</h4>
                <p className="mt-2.5 text-[15px] leading-[24px] font-semibold text-white">{t.payment.body}</p>
              </li>
              <li className={cell}>
                <h4 className={name}>{t.decline.name}</h4>
                <p className="mt-2.5 text-[15px] leading-[24px] font-normal text-white/80">{t.decline.body}</p>
              </li>
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 17. Final CTA · Section 20 ───────────────────────────────────────────
   "WATER INSIDE YOUR CAR? SEND PHOTOS FOR ASSESSMENT. [GET QUOTE]
   [WHATSAPP]". The section's own heading and line beside its five things to
   tell us; the sticky bar steps aside while it is on screen. */

function FinalCta() {
  const f = FLOOD.finalCta;
  return (
    <section
      id="flood-final"
      className="cut-top relative w-full overflow-hidden bg-ink-panel pt-[calc(var(--cut)+4rem)] pb-16 lg:pb-[104px]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(80% 90% at 50% 0%, rgba(193,146,49,0.16) 0%, transparent 62%)" }}
      />
      <div className="shell relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <SectionHead title={f.heading} />
          <Reveal delay={2}>
            <Statement className="mt-5 max-w-[26ch]">{f.title}</Statement>
          </Reveal>
          <Reveal delay={3}>
            <p className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white/[0.05] px-4 py-2 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.14em] text-white uppercase ring-1 ring-white/15 sm:text-[12px]">
              <Icon name="van" size={16} className="shrink-0 text-gold" />
              {f.closing}
            </p>
          </Reveal>
          <Reveal delay={4}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <QuoteButton label={f.quoteLabel} className="w-full sm:w-auto" />
              <WhatsAppButton label={f.whatsappLabel} className="w-full sm:w-auto" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-5">
          <div className="surface overflow-hidden">
            <Label className="px-6 pt-6 sm:px-7">{f.tellLead}</Label>
            <ol className="mt-3 divide-y divide-white/[0.07]">
              {f.tell.map((item, i) => (
                <li key={item} className="flex items-center gap-4 px-6 py-3.5 sm:px-7">
                  <span className="w-6 shrink-0 font-[family-name:var(--font-display)] text-[18px] leading-none text-gold">
                    {i + 1}
                  </span>
                  <span className="font-[family-name:var(--font-sub)] text-[15.5px] leading-tight font-semibold tracking-[0.04em] text-white uppercase">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
            <p className="flex items-center gap-2.5 bg-gold/[0.08] px-6 py-4 text-[14.5px] leading-[21px] font-semibold text-gold sm:px-7">
              <Icon name="camera" size={17} className="shrink-0" />
              {f.then}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
