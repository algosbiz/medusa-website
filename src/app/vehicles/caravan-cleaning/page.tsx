import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaravanQuoteForm from "@/components/CaravanQuoteForm";
import FaqAccordion from "@/components/FaqAccordion";
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
import { CARAVAN, FORM_ANCHOR, LINKS, PATH, PHOTOS, type Photo, QUOTE, SLUG, TRACK } from "@/lib/caravan-cleaning";
import { pageSchema } from "@/lib/schema";
import { CONTACT } from "@/lib/site";

/**
 * Caravan & motorhome valeting — rebuilt from the client's brief.
 *
 * Client, 2026-10-06: "Completely replace/re-optimise the existing Caravan
 * Cleaning page using the content below. KEEP EXISTING URL". Every word is in
 * `lib/caravan-cleaning.ts` and the quote form's in `lib/caravan-quote.ts`;
 * this file is only layout, in the order of the brief's "ELEMENTOR / PAGE
 * DESIGN" list, with its copy sections hung where that list puts them:
 *
 *   1 hero · 2 service selector (S2) · 3 exterior service (S3), then its
 *   important information (S4) · 4 interior service (S5) with the motorhome
 *   cab (S7) · 5 living areas — kitchen, seating, upholstery, carpets (S6
 *   with S8) · 6 full valet (S9) · static caravans (S10) · 7 storage / sale
 *   (S11) · 8 specialist problems (S12, with S13 mould and S14 odours) · 9 why
 *   individual quotes (S15) · 10 process (S16) · why Medusa (S17) · 12 reviews
 *   · 13 the quote form · 14 FAQ · 15 the closing band.
 *
 * Section 7 sits before Section 6 for that reason: the layout's "INTERIOR
 * SERVICE" and "LIVING AREAS — Kitchen / seating / upholstery / carpets" are
 * the copy's 5 + 7 and 6 + 8. Pairing them is also what lets gold and ink
 * alternate the whole way down (client, 2026-09-22: "pastikan warna bg tetap
 * selang seling") with the form on ink, where every enquiry form on the site
 * sits, and the gold FAQ over the ink close.
 *
 * Layout item 11, "BEFORE & AFTER — Genuine Medusa work", is not here: there
 * is no genuine Medusa caravan photograph to show (see `lib/caravan-cleaning`).
 *
 * The brief's notes decided the rest. "Keep: Interior / Exterior / Full Valet
 * visible near the top. Do not make mobile visitors read several paragraphs
 * before seeing the quote CTA" — the hero is h1, the line under it, the
 * INTERIOR · EXTERIOR · FULL VALET · INDIVIDUALLY QUOTED panel, SEND US PHOTOS
 * FOR A QUOTE and both buttons, above the fold on a 375x812 phone, and only
 * then the paragraphs. "Every GET A QUOTE button should scroll here" — every
 * quote button is `#get-caravan-quote`, and none books: "This page should NOT
 * try to make caravan cleaning look like an ordinary fixed-price car valet."
 * "Use sticky bottom CTA: GET QUOTE | WHATSAPP" — `StickyBookBar`, which
 * steps aside over the form and the closing band.
 *
 * The route wins over `app/[...slug]` because a static segment outranks a
 * catch-all; the slug has to be in `CUSTOM_ROUTES` so only one page is built.
 */

const WHATSAPP = CARAVAN.whatsapp;

/** The service selector's targets: each card scrolls to its own section. */
const ANCHORS = {
  exterior: "exterior",
  interior: "interior",
  full: "full-valet",
  static: "static-caravan",
} as const;

export function generateMetadata(): Metadata {
  const { title, description } = CARAVAN.seo;
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

export default function CaravanCleaningPage() {
  const page = getPage(SLUG);
  if (!page) notFound();

  return (
    <>
      {/* "Add appropriate: Service schema, FAQPage schema. Do not add fake
          review ratings or unsupported aggregate ratings." No offer either:
          nothing on the page is priced. */}
      <JsonLd
        data={pageSchema(page, {
          service: {
            slug: SLUG,
            name: "Caravan & Motorhome Valeting",
            serviceType: "Mobile caravan and motorhome valeting",
            description: CARAVAN.seo.description,
            image: PHOTOS.hero.src,
          },
          faq: CARAVAN.faq.items,
        })}
      />
      <TrackClicks />

      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Exterior />
        <ExteriorCare />
        <Interior />
        <Living />
        <FullValet />
        <StaticCaravan />
        <Storage />
        <Specialist />
        <Quoted />
        <Process />
        <WhyMedusa />
        <Testimonials title={CARAVAN.reviews.heading} />
        <Quote />
        <Faq />
        <FinalCta />
      </main>
      <Footer />

      {/* "MOBILE UX — Use sticky bottom CTA: GET QUOTE | WHATSAPP". */}
      <StickyBookBar
        primary={{ label: CARAVAN.sticky.quote, href: QUOTE, track: TRACK.quote }}
        secondary={{ label: CARAVAN.sticky.whatsapp, href: WHATSAPP, icon: "whatsapp", external: true }}
        after="caravan-hero-actions"
        hideOver={[FORM_ANCHOR, "caravan-final"]}
      />
    </>
  );
}

/* ── Shared pieces ──────────────────────────────────────────────────────── */

/** Every quote button: "Every GET A QUOTE button should scroll here." */
function QuoteButton({
  label,
  tone = "gold",
  className = "",
}: {
  label: string;
  tone?: "gold" | "dark";
  className?: string;
}) {
  return (
    <a
      href={QUOTE}
      data-track={TRACK.quote}
      className={`btn ${tone === "gold" ? "btn-gold" : "btn-dark"} min-h-[52px] rounded-full px-5 text-center text-[14px] sm:px-7 sm:text-[15px] sm:whitespace-nowrap ${className}`}
    >
      {label}
      <Icon name="arrow" size={18} className="ml-2.5 shrink-0" />
    </a>
  );
}

/* Every WhatsApp button sits on ink — the hero, the form and the close. */
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

/* The brief gives every section a name and then a heading — "EXTERIOR
   CARAVAN & MOTORHOME VALETING" over "Professional Exterior Cleaning". The
   name is the h2, as on the other rebuilt pages; the heading is the line
   under it, in the condensed face. */
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

/* A brief section that shares a band with the one before it — the cab with
   the interior, upholstery with the living areas, mould and odours with the
   specialist problems. Still an h2, at the size of an item title. */
function SubHead({ children, onGold }: { children: React.ReactNode; onGold?: boolean }) {
  return (
    <h2
      className={`font-[family-name:var(--font-sub)] text-[23px] leading-[1.1] font-semibold tracking-[0.03em] uppercase sm:text-[27px] ${
        onGold ? "text-ink" : "text-white"
      }`}
    >
      {children}
    </h2>
  );
}

/** Copy the brief sets partly in bold, or with a link laid on its words. */
function Rich({ html, className = "" }: { html: string; className?: string }) {
  return (
    <p
      className={`[&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-gold-bright [&_strong]:font-semibold [&_strong]:text-white ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function Label({ children, onGold, className = "" }: { children: React.ReactNode; onGold?: boolean; className?: string }) {
  return (
    <p
      className={`font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.2em] uppercase ${
        onGold ? "text-ink/75" : "text-gold"
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

/** A touring caravan side on — body, window, door, wheel and hitch — drawn on
    `Icon`'s grid (24px, 1.75 stroke, round caps and joins). The set has no
    caravan; this is the one mark the page needs that it lacks. */
function CaravanIcon({ size = 20, className }: { size?: number; className?: string }) {
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
      <path d="M6.9 17H4.5A1.5 1.5 0 0 1 3 15.5v-7A3.5 3.5 0 0 1 6.5 5h9A3.5 3.5 0 0 1 19 8.5V17h-7.5" />
      <circle cx="9.2" cy="17" r="2.3" />
      <rect x="5.5" y="8" width="5" height="3.6" rx="0.8" />
      <path d="M13.2 17V9.6a1 1 0 0 1 1-1h1.6a1 1 0 0 1 1 1V17" />
      <path d="M19 15.5h2.8" />
    </svg>
  );
}

type Glyph = IconName | "caravan";

function IconDisc({ name, size = 46, solid }: { name: Glyph; size?: number; solid?: boolean }) {
  const glyph = Math.round(size * 0.46);
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ${
        solid ? "bg-gold text-ink" : "bg-gold/12 text-gold ring-1 ring-gold/35"
      }`}
      style={{ width: size, height: size }}
    >
      {name === "caravan" ? <CaravanIcon size={glyph} /> : <Icon name={name} size={glyph} />}
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

/** Keeps a hyphenated word — "Living-Area" — from breaking at its hyphen. */
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

/** "What the service may include" — a ticked list. */
function TickList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`grid gap-x-6 gap-y-2.5 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 text-[15px] leading-[22px] font-normal text-white/85">
          <span className="mt-px">
            <Tick />
          </span>
          <span className="min-w-0">
            <KeepHyphens text={t} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** The brief's plain bullet lists — what a caravan contains, what cleaning
    cannot reach — set as a ruled list rather than ticked, since none of
    them is something the service does. */
function DotList({ items, onGold, className = "" }: { items: string[]; onGold?: boolean; className?: string }) {
  return (
    <ul className={`grid ${className}`}>
      {items.map((t) => (
        <li
          key={t}
          className={`flex gap-3 border-b py-2.5 text-[15px] leading-[21px] font-normal ${
            onGold ? "border-ink/15 text-ink/85" : "border-white/[0.06] text-white/80"
          }`}
        >
          <span aria-hidden className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${onGold ? "bg-ink" : "bg-gold"}`} />
          <span className="min-w-0">
            <KeepHyphens text={t} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** A short bullet list the eye takes in at once, as a row of pills. */
function Chips({ items, onGold, className = "" }: { items: string[]; onGold?: boolean; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((t) => (
        <li
          key={t}
          className={`max-w-full rounded-full px-3.5 py-1.5 text-[14px] leading-[19px] ${
            onGold
              ? "bg-ink/[0.08] font-semibold text-ink ring-1 ring-ink/20"
              : "bg-white/[0.05] font-normal text-white/85 ring-1 ring-white/10"
          }`}
        >
          <KeepHyphens text={t} />
        </li>
      ))}
    </ul>
  );
}

/** The quiet line that closes a list — "The exact process … will be confirmed
    according to the quotation provided." */
function Note({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`flex gap-3 rounded-[10px] bg-gold/[0.08] px-4 py-3.5 text-[14.5px] leading-[22px] font-semibold text-white ring-1 ring-gold/30 ${className}`}
    >
      <Icon name="info" size={18} className="mt-0.5 shrink-0 text-gold" />
      <span className="min-w-0">{children}</span>
    </p>
  );
}

function PhotoFrame({ photo, sizes }: { photo: Photo; sizes: string }) {
  return (
    <div className="relative overflow-hidden rounded-[14px] ring-1 ring-white/10">
      <div className="relative aspect-[3/2] w-full">
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ── 1. Hero ──────────────────────────────────────────────────────────────
   "Left: H1, Short introduction, Trust points, Quote CTA. Right: Strong
   genuine caravan/motorhome cleaning image. Prominently show: INTERIOR •
   EXTERIOR • FULL VALET · INDIVIDUALLY QUOTED [GET A QUOTE]". On a phone the
   panel and the buttons come straight after the h1 — "Do not make mobile
   visitors read several paragraphs before seeing the quote CTA" — and the
   paragraphs after them. The seven trust points ride under the photograph. */

const POINT_ICONS: IconName[] = ["seat", "droplet", "layers"];
const POINT_ANCHORS = [ANCHORS.interior, ANCHORS.exterior, ANCHORS.full];

function Hero() {
  const h = CARAVAN.hero;
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
            {/* "Link naturally to: Other Vehicles" — the menu group the page
                belongs to, as the line it starts from. */}
            <Reveal>
              <Link href={LINKS.otherVehicles.href} className="link-inline text-gold hover:text-gold-bright">
                <Icon name="chevron-left" size={14} strokeWidth={2.2} />
                {LINKS.otherVehicles.name}
              </Link>
            </Reveal>

            <Reveal delay={1}>
              <h1 className="mt-4 max-w-[20ch] text-[clamp(31px,4.4vw,60px)] leading-[1.0] text-white lg:mt-5">
                {h.h1}
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <h2 className="mt-3.5 max-w-[40ch] font-[family-name:var(--font-sub)] text-[16.5px] leading-[1.3] font-semibold tracking-[0.03em] text-gold sm:text-[19px] xl:mt-5 xl:text-[21px]">
                {h.title}
              </h2>
            </Reveal>

            <Reveal delay={3}>
              <HeroPanel />
            </Reveal>

            <Reveal delay={4}>
              <p className="mt-6 flex items-center gap-2.5 font-[family-name:var(--font-sub)] text-[15px] leading-tight font-semibold tracking-[0.06em] text-white sm:text-[16px] xl:mt-8">
                <Icon name="camera" size={18} className="shrink-0 text-gold" />
                {h.photosLine}
              </p>
              <div id="caravan-hero-actions" className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <QuoteButton label={h.quoteLabel} className="w-full sm:w-auto" />
                <WhatsAppButton label={h.whatsappLabel} className="w-full sm:w-auto" />
              </div>
            </Reveal>

            <Reveal delay={5}>
              <Rich
                html={h.leadHtml}
                className="mt-8 text-[17px] leading-[26px] font-semibold text-white xl:mt-9"
              />
              <p className="mt-2 max-w-[58ch] text-[16px] leading-[26px] font-normal text-white/75 xl:text-[17px] xl:leading-[28px]">
                {h.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={4} className="min-w-0 lg:col-span-5">
            <HeroCard />
          </Reveal>
        </div>

        <Reveal delay={5}>
          <Rich
            html={h.serviceHtml}
            className="mt-10 max-w-[92ch] border-t border-white/10 pt-7 text-[15.5px] leading-[26px] font-normal text-white/70 lg:mt-12"
          />
        </Reveal>
      </div>
    </section>
  );
}

function HeroPanel() {
  const p = CARAVAN.points;
  return (
    <div className="mt-6 max-w-[640px] overflow-hidden rounded-[14px] bg-white/[0.04] ring-1 ring-gold/35 xl:mt-8">
      <ul className="grid grid-cols-3">
        {p.services.map((s, i) => (
          <li key={s} className={i ? "border-l border-gold/25" : ""}>
            <a
              href={`#${POINT_ANCHORS[i]}`}
              className="group flex h-full flex-col items-center justify-center gap-2 px-1.5 py-3.5 text-center transition-colors hover:bg-gold/[0.08] sm:flex-row sm:gap-3 sm:px-4 sm:py-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-ink sm:h-9 sm:w-9">
                <Icon name={POINT_ICONS[i]} size={16} strokeWidth={2} />
              </span>
              <span className="font-[family-name:var(--font-sub)] text-[14px] leading-[1.1] font-semibold tracking-[0.05em] text-white uppercase transition-colors group-hover:text-gold sm:text-[16px]">
                {s}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-1.5 border-t border-gold/25 bg-gold/[0.1] px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:px-5">
        <p className="flex shrink-0 items-center gap-2 font-[family-name:var(--font-sub)] text-[15px] leading-tight font-semibold tracking-[0.06em] text-gold uppercase">
          <Icon name="tag" size={16} className="shrink-0" />
          {p.quoted}
        </p>
        <p className="font-[family-name:var(--font-ui)] text-[11px] leading-[16px] font-semibold tracking-[0.12em] text-white/75">
          {CARAVAN.hero.vehicles.join(" • ")}
        </p>
      </div>
    </div>
  );
}

function HeroCard() {
  const h = CARAVAN.hero;
  return (
    /* Photograph over the trust points in the hero's column and on a phone;
       side by side on a tablet, where a stacked card ran a 450px-tall
       picture across the full width. */
    <div className="surface relative overflow-hidden md:grid md:grid-cols-2 lg:block">
      <div className="relative aspect-[3/2] w-full md:aspect-auto md:min-h-[280px] lg:aspect-[16/10] lg:min-h-0">
        <Image
          src={PHOTOS.hero.src}
          alt={PHOTOS.hero.alt}
          fill
          priority
          sizes="(min-width: 1024px) 38vw, (min-width: 768px) 46vw, 92vw"
          className="object-cover object-[45%_60%]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(13,13,13,0.85),transparent)]"
        />
      </div>
      <ul className="grid content-center gap-x-4 gap-y-2.5 p-5 sm:grid-cols-2 sm:p-6 md:grid-cols-1 xl:grid-cols-2">
        {h.ticks.map((t) => (
          <li key={t} className="flex items-start gap-2.5 text-[14px] leading-[20px] font-semibold text-white/90">
            <span className="mt-px">
              <Tick size={18} />
            </span>
            <span className="min-w-0">
              <KeepHyphens text={t} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── 2. Service selector ──────────────────────────────────────────────────
   "Three large cards: EXTERIOR · INTERIOR · FULL VALET. Then smaller: STATIC
   CARAVAN". Each card is the brief's own line about the service, and scrolls
   to that service's section below. */

const SERVICE_ICONS: Glyph[] = ["droplet", "seat", "layers"];
const SERVICE_ANCHORS = [ANCHORS.exterior, ANCHORS.interior, ANCHORS.full];

function Services() {
  const s = CARAVAN.services;
  return (
    <section id="services" className="w-full scroll-mt-24 bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.title}</Kicker>
          </div>
          <Reveal delay={3} className="min-w-0 lg:col-span-5">
            <p className="text-[18px] leading-[28px] font-semibold text-ink">{s.body[0]}</p>
            <p className="measure mt-3 text-[16px] leading-[26px] font-normal text-ink/80">
              <KeepHyphens text={s.body[1]} />
            </p>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <Label onGold className="mt-12">
            {s.chooseFrom}
          </Label>
        </Reveal>
        <ul className="mt-4 grid gap-4 md:grid-cols-3 lg:gap-5">
          {s.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i} className="surface-on-gold group relative overflow-hidden">
              <a href={`#${SERVICE_ANCHORS[i]}`} className="flex h-full flex-col p-6 sm:p-7 lg:p-8">
                <span className="flex items-center justify-between">
                  <IconDisc name={SERVICE_ICONS[i]} size={54} />
                  <span
                    aria-hidden
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/12 text-gold ring-1 ring-gold/35 transition-colors group-hover:bg-gold group-hover:text-ink"
                  >
                    <Icon name="arrow" size={17} className="rotate-90" />
                  </span>
                </span>
                <h3 className="mt-6 font-[family-name:var(--font-sub)] text-[22px] leading-tight tracking-[0.02em] text-white uppercase transition-colors group-hover:text-gold sm:text-[24px]">
                  {it.title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-[25px] font-normal text-white/75">{it.body}</p>
              </a>
              <HoverRule />
            </Reveal>
          ))}
        </ul>

        {/* "Then smaller: STATIC CARAVAN". */}
        <Reveal delay={1}>
          <a
            href={`#${ANCHORS.static}`}
            className="surface-on-gold group relative mt-4 flex items-start gap-4 overflow-hidden px-6 py-5 sm:items-center sm:gap-5 sm:px-7 lg:mt-5"
          >
            <IconDisc name="caravan" size={48} />
            <span className="min-w-0 flex-1">
              <span className="block font-[family-name:var(--font-sub)] text-[19px] leading-tight tracking-[0.02em] text-white uppercase transition-colors group-hover:text-gold sm:text-[20px]">
                {s.static.title}
              </span>
              <span className="mt-1.5 block text-[15px] leading-[23px] font-normal text-white/70">{s.static.body}</span>
            </span>
            <Icon name="arrow" size={18} className="mt-1 hidden shrink-0 rotate-90 text-gold sm:block" />
            <HoverRule />
          </a>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-8">
            <QuoteButton label={s.cta} tone="dark" className="w-full sm:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 3. Exterior service ──────────────────────────────────────────────────
   "Image + service breakdown." What builds up on a caravan beside the
   photograph of one, then the twelve things the service may include as one
   ticked card, closed by the brief's line about the quotation. */

function Exterior() {
  const s = CARAVAN.exterior;
  return (
    <section id={ANCHORS.exterior} className="w-full scroll-mt-24 py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <SectionHead title={s.heading} />
            <Kicker>{s.title}</Kicker>
            <Reveal delay={3}>
              <p className="mt-6 text-[17px] leading-[26px] font-semibold text-white">{s.accumulateLead}</p>
              <Chips items={s.accumulate} className="mt-4" />
              <p className="measure mt-7 border-l-2 border-gold pl-4 text-[16px] leading-[26px] font-normal text-body">
                {s.tailored}
              </p>
            </Reveal>
          </div>
          <Reveal delay={2} className="min-w-0 lg:col-span-5">
            <PhotoFrame photo={PHOTOS.exterior} sizes="(min-width: 1024px) 38vw, 92vw" />
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="surface mt-12 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <IconDisc name="droplet" size={42} />
              <h3 className="font-[family-name:var(--font-sub)] text-[19px] leading-tight font-semibold tracking-[0.04em] text-white uppercase sm:text-[21px]">
                {s.includesLabel}
              </h3>
            </div>
            <TickList items={s.includes} className="mt-6 sm:grid-cols-2 lg:grid-cols-3" />
            <Note className="mt-7">{s.note}</Note>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Section 4. Important exterior cleaning information ───────────────────
   The materials a caravan is made of, beside the brief's IMPORTANT list of
   what cleaning cannot take away — the band's one dark panel. */

function ExteriorCare() {
  const s = CARAVAN.exteriorCare;
  const imp = s.important;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-5">
          <SectionHead title={s.heading} tone="gold" />
          <Kicker onGold>{s.title}</Kicker>
          <Reveal delay={3}>
            <p className="mt-6 text-[17px] leading-[26px] font-semibold text-ink">{s.containLead}</p>
            <Chips items={s.contain} onGold className="mt-4" />
            <p className="measure mt-7 text-[16px] leading-[26px] font-normal text-ink/80">{s.body[0]}</p>
            <p className="measure mt-2 text-[16px] leading-[26px] font-semibold text-ink">{s.body[1]}</p>
          </Reveal>
        </div>

        <Reveal delay={2} className="min-w-0 lg:col-span-7">
          <div className="relative overflow-hidden rounded-[14px] bg-ink p-6 ring-1 ring-gold/40 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <IconDisc name="warning" size={42} solid />
              <h3 className="font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.22em] text-gold uppercase">
                {imp.title}
              </h3>
            </div>
            <p className="mt-5 text-[18px] leading-[27px] font-semibold text-white">{imp.lead}</p>
            <DotList items={imp.items} className="mt-3 sm:grid-cols-2 sm:gap-x-8" />
            <p className="mt-6 border-l-2 border-gold pl-4 text-[15.5px] leading-[25px] font-normal text-white/80">
              {imp.after}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 4. Interior service, with the motorhome cab ──────────────────────────
   "Image + service breakdown." What a caravan's inside holds, and beside it
   the fourteen things the interior service may include with the brief's
   PLEASE NOTE; then Section 7, the cab, as a card of its own with the
   campervan photograph — the only picture of a motorhome-type vehicle the
   site has, and a cab's glass at that. */

function Interior() {
  const s = CARAVAN.interior;
  return (
    <section id={ANCHORS.interior} className="w-full scroll-mt-24 py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-6">
            <SectionHead title={s.heading} />
            <Kicker>{s.title}</Kicker>
            <Reveal delay={3}>
              <Rich html={s.leadHtml} className="measure mt-6 text-[18px] leading-[28px] font-semibold text-white" />
              <p className="mt-6 text-[16px] leading-[26px] font-normal text-body">{s.containLead}</p>
              <Chips items={s.contain} className="mt-4" />
              <p className="measure mt-7 border-l-2 border-gold pl-4 text-[16px] leading-[26px] font-normal text-body">
                {s.tailored}
              </p>
            </Reveal>
          </div>

          <Reveal delay={2} className="min-w-0 lg:col-span-6">
            <div className="surface p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <IconDisc name="seat" size={42} />
                <h3 className="font-[family-name:var(--font-sub)] text-[19px] leading-tight font-semibold tracking-[0.04em] text-white uppercase sm:text-[21px]">
                  {s.includesLabel}
                </h3>
              </div>
              <TickList items={s.includes} className="mt-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" />
              <div className="mt-7 rounded-[12px] bg-gold/[0.07] p-5 ring-1 ring-gold/40">
                <p className="flex items-center gap-2.5 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.22em] text-gold uppercase">
                  <Icon name="info" size={16} className="shrink-0" />
                  {s.note.title}
                </p>
                <p className="mt-2.5 text-[15px] leading-[23px] font-semibold text-white">{s.note.body}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Cab />
      </div>
    </section>
  );
}

function Cab() {
  const c = CARAVAN.cab;
  return (
    <Reveal delay={1}>
      <article className="surface mt-12 overflow-hidden md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:mt-16">
        <div className="relative aspect-[3/2] w-full md:aspect-auto md:min-h-[380px]">
          <Image
            src={PHOTOS.campervan.src}
            alt={PHOTOS.campervan.alt}
            fill
            sizes="(min-width: 768px) 38vw, 92vw"
            className="object-cover object-[50%_32%]"
          />
        </div>
        <div className="p-6 sm:p-8 lg:p-10">
          <SubHead>{c.heading}</SubHead>
          <h3 className="mt-3 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.03em] text-gold uppercase sm:text-[19px]">
            {c.title}
          </h3>
          <p className="mt-5 text-[16px] leading-[26px] font-semibold text-white">{c.body[0]}</p>
          <p className="mt-2 text-[15px] leading-[24px] font-normal text-white/70">{c.body[1]}</p>
          <TickList items={c.includes} className="mt-5 sm:grid-cols-2" />
          <Note className="mt-7">{c.note}</Note>
        </div>
      </article>
    </Reveal>
  );
}

/* ── 5. Living areas — kitchen, seating, upholstery, carpets ──────────────
   Section 6's kitchen and living area as two cards and its IMPORTANT note as
   the band's dark panel; then Section 8, upholstery and carpets, beside its
   own IMPORTANT — "Complete stain removal cannot be guaranteed", the line the
   brief bolds, set as the panel's statement. */

const AREA_ICONS: IconName[] = ["cup", "seat"];

function Living() {
  const s = CARAVAN.living;
  const u = CARAVAN.upholstery;
  const imp = u.important;
  return (
    <section id="living-areas" className="w-full scroll-mt-24 bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.title}</Kicker>
          </div>
          <Reveal delay={3} className="min-w-0 lg:col-span-5">
            <p className="text-[18px] leading-[28px] font-semibold text-ink">{s.body[0]}</p>
            <p className="measure mt-3 text-[16px] leading-[26px] font-normal text-ink/80">{s.body[1]}</p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-5">
          {s.areas.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i} className="surface-on-gold group relative overflow-hidden p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <IconDisc name={AREA_ICONS[i]} size={50} />
                <h3 className="font-[family-name:var(--font-sub)] text-[21px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[22px]">
                  {a.title}
                </h3>
              </div>
              <TickList items={a.items} className="mt-6 sm:grid-cols-2" />
              <HoverRule />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={1}>
          <div className="mt-6 flex flex-col gap-4 rounded-[14px] bg-ink p-6 ring-1 ring-gold/40 sm:flex-row sm:gap-6 sm:p-8 lg:mt-8 lg:p-10">
            <IconDisc name="info" size={46} solid />
            <div className="min-w-0">
              <h3 className="font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.22em] text-gold uppercase">
                {s.important.title}
              </h3>
              <Rich
                html={s.important.bodyHtml[0]}
                className="mt-2.5 max-w-[90ch] text-[17px] leading-[27px] font-normal text-white/85"
              />
              <p className="mt-2 max-w-[90ch] text-[15.5px] leading-[25px] font-normal text-white/70">
                {s.important.bodyHtml[1]}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Section 8 — upholstery & carpet cleaning. */}
        <div className="mt-16 grid gap-10 border-t border-ink/20 pt-14 lg:mt-20 lg:grid-cols-12 lg:gap-14 lg:pt-16">
          <div className="min-w-0 lg:col-span-6">
            <Reveal>
              <span aria-hidden className="block h-[3px] w-[52px] rounded-full bg-ink" />
              <div className="mt-6">
                <SubHead onGold>{u.heading}</SubHead>
              </div>
            </Reveal>
            <Kicker onGold>{u.title}</Kicker>
            <Reveal delay={3}>
              <p className="measure mt-6 text-[16px] leading-[26px] font-normal text-ink/80">{u.body[0]}</p>
              <p className="mt-6 text-[17px] leading-[26px] font-semibold text-ink">{u.body[1]}</p>
              <Chips items={u.items} onGold className="mt-4" />
              <p className="measure mt-7 border-l-2 border-ink pl-4 text-[16px] leading-[26px] font-semibold text-ink">
                {u.method}
              </p>
            </Reveal>
          </div>

          <Reveal delay={2} className="min-w-0 lg:col-span-6">
            <div className="surface-on-gold p-6 sm:p-8 lg:p-10">
              <p className="flex items-center gap-2.5 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.22em] text-gold uppercase">
                <Icon name="info" size={16} className="shrink-0" />
                {imp.title}
              </p>
              <p className="mt-3 font-[family-name:var(--font-heading)] text-[22px] leading-[1.08] font-black text-gold uppercase min-[400px]:text-[25px] sm:text-[30px] lg:text-[26px] xl:text-[30px]">
                {imp.strong}
              </p>
              <p className="mt-4 text-[15.5px] leading-[25px] font-normal text-white/80">{imp.body}</p>
              <p className="mt-6 text-[15px] leading-[23px] font-semibold text-white">{imp.factorsLead}</p>
              <DotList items={imp.factors} className="mt-2 sm:grid-cols-2 sm:gap-x-6" />
              <p className="mt-6 border-l-2 border-gold pl-4 text-[15px] leading-[24px] font-normal text-white/75">
                {imp.after}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 6. Full valet ────────────────────────────────────────────────────────
   "Show interior + exterior together visually." The two halves of the full
   valet as two cards joined by a gold plus, and the brief's INDIVIDUALLY
   QUOTED as the band's closing panel with its own quote button. */

function FullValet() {
  const s = CARAVAN.full;
  return (
    <section id={ANCHORS.full} className="w-full scroll-mt-24 py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <SectionHead title={s.heading} />
            <Kicker>{s.title}</Kicker>
          </div>
          <Reveal delay={3} className="min-w-0 lg:col-span-5">
            <p className="text-[18px] leading-[28px] font-semibold text-white">{s.lead}</p>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <Label className="mt-12">{s.includesLabel}</Label>
        </Reveal>
        <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-5">
          <FullHalf side={s.exterior} icon="droplet" delay={0} />
          {/* Overlaps the seam between the two cards on a phone, where they
              stack; sits between them from `md`. */}
          <span
            aria-hidden
            className="relative z-10 mx-auto -my-7 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink ring-8 ring-ink-panel md:my-0 md:self-center"
          >
            <Icon name="plus" size={26} strokeWidth={2.4} />
          </span>
          <FullHalf side={s.interior} icon="seat" delay={1} />
        </div>

        <Reveal delay={1}>
          <div className="mt-6 flex flex-col gap-6 rounded-[14px] bg-gold/[0.07] p-6 ring-1 ring-gold/40 sm:p-8 lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
              <IconDisc name="tag" size={46} solid />
              <div className="min-w-0">
                <h3 className="font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.03em] text-white uppercase sm:pt-2 sm:text-[22px]">
                  {s.quoted.title}
                </h3>
                <p className="mt-2 max-w-[70ch] text-[15.5px] leading-[25px] font-normal text-white/80">
                  {s.quoted.body}
                </p>
              </div>
            </div>
            <QuoteButton label={s.cta} className="w-full shrink-0 lg:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FullHalf({
  side,
  icon,
  delay,
}: {
  side: { title: string; items: string[] };
  icon: IconName;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="surface h-full min-w-0 p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <IconDisc name={icon} size={50} />
        <h3 className="font-[family-name:var(--font-sub)] text-[22px] leading-tight tracking-[0.03em] text-white uppercase sm:text-[24px]">
          {side.title}
        </h3>
      </div>
      <TickList items={side.items} className="mt-6 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2" />
    </Reveal>
  );
}

/* ── Section 10. Static caravan cleaning ──────────────────────────────────
   The layout's "Then smaller: STATIC CARAVAN" card leads here. What the team
   needs to know as a numbered checklist — it is the list a customer works
   through before asking — and ACCESS IS IMPORTANT as the dark panel that
   carries the enquiry button. */

function StaticCaravan() {
  const s = CARAVAN.static;
  return (
    <section id={ANCHORS.static} className="w-full scroll-mt-24 bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-5">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.title}</Kicker>
            <Reveal delay={3}>
              <p className="measure mt-6 text-[18px] leading-[28px] font-semibold text-ink">{s.body[0]}</p>
              <p className="measure mt-3 text-[16px] leading-[26px] font-normal text-ink/80">{s.body[1]}</p>
            </Reveal>
          </div>

          <Reveal delay={2} className="min-w-0 lg:col-span-7">
            <div className="surface-on-gold p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <IconDisc name="caravan" size={42} />
                <h3 className="font-[family-name:var(--font-sub)] text-[19px] leading-tight font-semibold tracking-[0.04em] text-white uppercase sm:text-[21px]">
                  {s.needLabel}
                </h3>
              </div>
              <ol className="mt-5 grid sm:grid-cols-2 sm:gap-x-8">
                {s.need.map((n, i) => (
                  <li key={n} className="flex items-center gap-4 border-b border-white/[0.06] py-3">
                    <span
                      aria-hidden
                      className="w-7 shrink-0 font-[family-name:var(--font-display)] text-[19px] leading-none text-gold"
                    >
                      {pad(i + 1)}
                    </span>
                    <span className="min-w-0 text-[15.5px] leading-[22px] font-semibold text-white/90">{n}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="mt-6 flex flex-col gap-6 rounded-[14px] bg-ink p-6 ring-1 ring-gold/40 sm:p-8 lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
              <IconDisc name="pin" size={46} solid />
              <div className="min-w-0">
                <h3 className="font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.22em] text-gold uppercase sm:pt-1">
                  {s.access.title}
                </h3>
                <p className="mt-2 text-[17px] leading-[26px] font-semibold text-white">{s.access.body[0]}</p>
                <p className="mt-1.5 text-[15.5px] leading-[24px] font-normal text-white/70">{s.access.body[1]}</p>
              </div>
            </div>
            <QuoteButton label={s.cta} className="w-full shrink-0 lg:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 7. Storage / sale use cases ──────────────────────────────────────────
   "Four cards". The copy's four — the layout's list ends on "GENERAL
   MAINTENANCE", the copy on "RECENTLY PURCHASED" with a sentence under it,
   and the copy is what the customer reads. */

const STORAGE_ICONS: IconName[] = ["calendar", "clock", "tag", "key"];

function Storage() {
  const s = CARAVAN.storage;
  return (
    <section id="storage" className="w-full scroll-mt-24 py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <SectionHead title={s.heading} />
            <Kicker>{s.title}</Kicker>
          </div>
          <Reveal delay={3} className="min-w-0 lg:col-span-5">
            <p className="text-[17px] leading-[27px] font-normal text-body">{s.body[0]}</p>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <p className="mt-12 text-[17px] leading-[26px] font-semibold text-white">{s.body[1]}</p>
        </Reveal>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {s.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i} className="surface group relative overflow-hidden p-6 sm:p-7">
              <div
                aria-hidden
                className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(193,146,49,0.16),transparent_70%)]"
              />
              <IconDisc name={STORAGE_ICONS[i]} size={52} />
              <h3 className="relative mt-6 font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.02em] text-white uppercase">
                {it.title}
              </h3>
              <p className="relative mt-3 text-[15px] leading-[24px] font-normal text-white/75">{it.body}</p>
              <HoverRule />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={2}>
          <div className="mt-8">
            <QuoteButton label={s.cta} className="w-full sm:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 8. Specialist problems, mould & damp, odours ─────────────────────────
   "Important warning panel: MOULD · DAMP · ODOURS · PET HAIR · HEAVY
   CONTAMINATION. Ask for photographs." Section 12's list beside that panel —
   whose three labels that are services of their own link to them — and
   under both, Sections 13 and 14 as two cards: the two problems cleaning
   cannot fix at the source. */

const WARNING_ICONS: Record<string, IconName> = {
  Mould: "mould",
  Damp: "droplet",
  Odours: "wind",
  "Pet Hair": "paw",
  "Heavy Contamination": "warning",
};

function Specialist() {
  const s = CARAVAN.specialist;
  return (
    <section id="specialist-problems" className="w-full scroll-mt-24 bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-6">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.title}</Kicker>
            <Reveal delay={3}>
              <p className="mt-6 text-[17px] leading-[26px] font-semibold text-ink">{s.lead}</p>
              <Chips items={s.items} onGold className="mt-4" />
              <p className="measure mt-7 border-l-2 border-ink pl-4 text-[16px] leading-[26px] font-semibold text-ink">
                {s.after}
              </p>
            </Reveal>
          </div>

          <Reveal delay={2} className="min-w-0 lg:col-span-6">
            <div className="relative overflow-hidden rounded-[14px] bg-ink p-6 ring-1 ring-gold/40 sm:p-8 lg:p-10">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "radial-gradient(60% 90% at 85% 0%, rgba(193,146,49,0.14) 0%, transparent 70%)" }}
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <IconDisc name="warning" size={42} solid />
                  <h3 className="font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.22em] text-gold uppercase">
                    {s.important.title}
                  </h3>
                </div>
                {/* Two across at every width, the fifth — the longest word —
                    across both: in a column a third of the panel wide,
                    "CONTAMINATION" ran past its tile. */}
                <ul className="mt-6 grid grid-cols-2 gap-2.5 [&>li:last-child]:col-span-2">
                  {s.warning.map((w) => {
                    const tile =
                      "relative flex h-full min-h-[78px] flex-col justify-between gap-2.5 rounded-[10px] px-3.5 py-3.5 text-white ring-1";
                    const label = (
                      <span className="font-[family-name:var(--font-sub)] text-[14.5px] leading-[1.15] font-semibold tracking-[0.05em] uppercase">
                        {w.label}
                      </span>
                    );
                    const icon = WARNING_ICONS[w.label] ?? "warning";
                    return (
                      <li key={w.label}>
                        {w.href ? (
                          <Link
                            href={w.href}
                            className={`${tile} group bg-white/[0.05] ring-white/15 transition-colors hover:bg-gold hover:text-ink hover:ring-gold`}
                          >
                            <Icon name={icon} size={20} className="shrink-0 text-gold group-hover:text-ink" />
                            {label}
                            <Icon name="arrow" size={14} className="absolute top-3.5 right-3.5" />
                          </Link>
                        ) : (
                          <span className={`${tile} bg-white/[0.03] ring-white/[0.08]`}>
                            <Icon name={icon} size={20} className="shrink-0 text-gold" />
                            {label}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-7 text-[17px] leading-[26px] font-semibold text-white">{s.important.body[0]}</p>
                <p className="mt-2 text-[15.5px] leading-[25px] font-normal text-white/75">{s.important.body[1]}</p>
                {/* Half the band wide at `lg`, the panel is ~314px inside —
                    about the label's own width — so there it fills the panel
                    and may wrap rather than be clipped. */}
                <QuoteButton
                  label={s.cta}
                  className="mt-7 w-full sm:w-auto lg:w-full lg:whitespace-normal xl:w-auto xl:whitespace-nowrap"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-4 lg:mt-8 lg:grid-cols-2 lg:gap-5">
          <Mould />
          <Odours />
        </div>
      </div>
    </section>
  );
}

function Mould() {
  const m = CARAVAN.mould;
  return (
    <Reveal as="article" className="surface-on-gold relative min-w-0 overflow-hidden p-6 sm:p-8 lg:p-10">
      <div className="flex items-center gap-4">
        <IconDisc name="mould" size={50} />
        <SubHead>{m.heading}</SubHead>
      </div>
      <h3 className="mt-4 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.03em] text-gold uppercase sm:text-[19px]">
        {m.title}
      </h3>
      <p className="mt-5 text-[16px] leading-[26px] font-semibold text-white">{m.lead}</p>
      <Rich html={m.listLeadHtml} className="mt-5 text-[15px] leading-[24px] font-normal text-white/80" />
      <DotList items={m.list} className="mt-2 sm:grid-cols-2 sm:gap-x-6" />
      <p className="mt-5 text-[15px] leading-[24px] font-normal text-white/75">{m.returns}</p>
      <Rich
        html={m.scopeHtml}
        className="mt-5 border-l-2 border-gold pl-4 text-[15.5px] leading-[25px] font-normal text-white/80"
      />
      <Rich html={m.separateHtml} className="mt-4 text-[15px] leading-[24px] font-normal text-white/75" />
    </Reveal>
  );
}

function Odours() {
  const o = CARAVAN.odours;
  return (
    <Reveal as="article" delay={1} className="surface-on-gold relative min-w-0 overflow-hidden p-6 sm:p-8 lg:p-10">
      <div className="flex items-center gap-4">
        <IconDisc name="wind" size={50} />
        <SubHead>{o.heading}</SubHead>
      </div>
      <h3 className="mt-4 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.03em] text-gold uppercase sm:text-[19px]">
        {o.title}
      </h3>
      <p className="mt-5 text-[16px] leading-[26px] font-semibold text-white">{o.lead}</p>
      <Chips items={o.sources} className="mt-3" />
      <p className="mt-5 text-[15px] leading-[24px] font-normal text-white/75">{o.may}</p>
      <p className="mt-6 font-[family-name:var(--font-sub)] text-[15px] tracking-[0.04em] text-white/60 uppercase">
        {o.however}
      </p>
      <p className="mt-2 font-[family-name:var(--font-heading)] text-[22px] leading-[1.06] font-black text-gold uppercase min-[400px]:text-[25px] sm:text-[30px] lg:text-[26px] xl:text-[30px]">
        {o.statement}
      </p>
      <p className="mt-5 text-[15px] leading-[24px] font-normal text-white/75">{o.after}</p>
    </Reveal>
  );
}

/* ── 9. Why individual quotes ─────────────────────────────────────────────
   "Explain why there's no fixed online price." The argument beside the
   twelve things a price depends on, and NO SURPRISES as the band's closing
   panel with the quote button. */

function Quoted() {
  const s = CARAVAN.quoted;
  return (
    <section id="why-quoted" className="w-full scroll-mt-24 py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-5">
            <SectionHead title={s.heading} />
            <Kicker>{s.title}</Kicker>
            <Reveal delay={3}>
              <p className="measure mt-6 text-[18px] leading-[28px] font-semibold text-white">{s.body[0]}</p>
              <p className="measure mt-3 text-[16px] leading-[26px] font-normal text-body">{s.body[1]}</p>
              <p className="measure mt-7 border-l-2 border-gold pl-4 text-[16.5px] leading-[26px] font-semibold text-white">
                {s.after}
              </p>
            </Reveal>
          </div>

          <Reveal delay={2} className="min-w-0 lg:col-span-7">
            <div className="surface p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <IconDisc name="gauge" size={42} />
                <h3 className="text-[17px] leading-[24px] font-semibold text-white">{s.factorsLead}</h3>
              </div>
              <DotList items={s.factors} className="mt-4 sm:grid-cols-2 sm:gap-x-8" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="mt-6 flex flex-col gap-6 rounded-[14px] bg-gold/[0.07] p-6 ring-1 ring-gold/40 sm:p-8 lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
              <IconDisc name="shield" size={46} solid />
              <div className="min-w-0">
                <h3 className="font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.03em] text-white uppercase sm:pt-2 sm:text-[22px]">
                  {s.noSurprises.title}
                </h3>
                <p className="mt-2 max-w-[75ch] text-[15.5px] leading-[25px] font-semibold text-white/90">
                  {s.noSurprises.body[0]}
                </p>
                <p className="mt-1.5 max-w-[75ch] text-[15px] leading-[24px] font-normal text-white/70">
                  {s.noSurprises.body[1]}
                </p>
              </div>
            </div>
            <QuoteButton label={s.cta} className="w-full shrink-0 lg:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 10. Process ──────────────────────────────────────────────────────────
   "SEND DETAILS → UPLOAD PHOTOS → QUOTE → BOOK → WE COME TO YOU". That line
   is the band's picture, QUOTE the one gold stage, since it is the step this
   page exists to make; the copy's six steps follow it as cards. */

const STEP_ICONS: IconName[] = ["type", "camera", "search", "tag", "calendar", "van"];

function Process() {
  const s = CARAVAN.process;
  return (
    <section id="process" className="w-full scroll-mt-24 bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <SectionHead title={s.heading} tone="gold" />
        <Kicker onGold>{s.title}</Kicker>

        {/* The layout's line, as a strip. */}
        <Reveal delay={1}>
          <ol aria-hidden className="mt-12 grid grid-cols-2 gap-2.5 rounded-[14px] bg-ink p-3 sm:grid-cols-5">
            {s.flow.map((stage, i) => {
              const gold = i === 2;
              const last = i === s.flow.length - 1;
              return (
                <li
                  key={stage}
                  className={`flex min-h-[74px] flex-col justify-between rounded-[10px] px-4 py-3 ${
                    gold ? "bg-gold text-ink" : "bg-white/[0.04] text-white ring-1 ring-white/[0.08]"
                  } ${last ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  <span className="flex items-center justify-between">
                    <span
                      className={`font-[family-name:var(--font-display)] text-[18px] leading-none ${
                        gold ? "text-ink/70" : "text-gold"
                      }`}
                    >
                      {pad(i + 1)}
                    </span>
                    {!last && <Icon name="arrow" size={15} className={gold ? "text-ink/60" : "text-white/35"} />}
                  </span>
                  <span className="mt-2.5 font-[family-name:var(--font-sub)] text-[15.5px] leading-tight font-semibold tracking-[0.05em] uppercase">
                    {stage}
                  </span>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-5">
          {s.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i % 3}
              className="surface-on-gold group relative flex flex-col overflow-hidden p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <IconDisc name={STEP_ICONS[i] ?? "check"} />
                <span
                  aria-hidden
                  className="font-[family-name:var(--font-display)] text-[48px] leading-[0.8] text-white/[0.09]"
                >
                  {pad(i + 1)}
                </span>
              </div>
              <Label className="mt-5">Step {i + 1}</Label>
              <h3 className="mt-1 font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[21px]">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[24px] font-normal text-white/75">{step.body}</p>
              <HoverRule />
            </Reveal>
          ))}
        </ol>

        <Reveal delay={2}>
          <div className="mt-8">
            <QuoteButton label={s.cta} tone="dark" className="w-full sm:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Section 17. Why choose Medusa? ───────────────────────────────────────── */

const WHY_ICONS: IconName[] = ["pin", "van", "layers", "tag", "spark", "shield"];

function WhyMedusa() {
  const w = CARAVAN.why;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <SectionHead title={w.heading} />
        <Kicker>{w.title}</Kicker>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {w.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i % 3} className="surface group relative overflow-hidden p-6 sm:p-7">
              <div className="flex items-center gap-4 sm:block">
                <IconDisc name={WHY_ICONS[i] ?? "check"} size={50} />
                <h3 className="font-[family-name:var(--font-sub)] text-[20px] leading-tight text-white uppercase sm:mt-6">
                  {it.title}
                </h3>
              </div>
              {it.body.map((p) => (
                <p key={p} className="mt-3 text-[15px] leading-[25px] font-normal text-white/75">
                  <KeepHyphens text={p} />
                </p>
              ))}
              <HoverRule />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={2}>
          <div className="mt-8">
            <QuoteButton label={w.cta} className="w-full sm:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 13. The quote form ───────────────────────────────────────────────────
   "This should be the main conversion point. Give section anchor:
   #get-caravan-quote." The heading and its line beside the form from `lg`,
   with WhatsApp, the telephone and the contact page under them. */

function Quote() {
  const q = CARAVAN.quote;
  return (
    <section id={FORM_ANCHOR} className="w-full scroll-mt-20 py-16 lg:scroll-mt-24 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
        <div className="min-w-0 lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead title={q.heading} />
            <Reveal delay={2}>
              <p className="measure mt-5 text-[17px] leading-[27px] font-semibold text-white">{q.lead}</p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 hidden flex-col gap-4 lg:flex">
                <WhatsAppButton label={CARAVAN.hero.whatsappLabel} className="self-start" />
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="link-inline self-start text-[15px] font-semibold text-white hover:text-gold"
                >
                  <Icon name="phone" size={17} className="text-gold" />
                  {CONTACT.phone}
                </a>
                <Link
                  href={LINKS.contact.href}
                  className="link-inline self-start text-[15px] font-semibold text-white hover:text-gold"
                >
                  <Icon name="mail" size={17} className="text-gold" />
                  {LINKS.contact.name}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <CaravanQuoteForm
            id={`${FORM_ANCHOR}-form`}
            thanks={CARAVAN.thanks}
            whatsapp={WHATSAPP}
            submittedEvent={TRACK.quoteSubmitted}
          />
        </div>
      </div>
    </section>
  );
}

/* ── 14. FAQ ──────────────────────────────────────────────────────────────
   "Accordion." */

function Faq() {
  const f = CARAVAN.faq;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHead title={f.heading} tone="gold" />
          </div>
        </div>
        <div className="min-w-0 lg:col-span-8">
          <FaqAccordion items={f.items} onGold />
        </div>
      </div>
    </section>
  );
}

/* ── 15. Final CTA ─────────────────────────────────────────────────────────
   "Repeat: GET A QUOTE, WHATSAPP". The five occasions beside a card that
   carries the four vehicles, the three services and both buttons; the
   sticky bar steps aside while it is on screen. */

function FinalCta() {
  const f = CARAVAN.finalCta;
  return (
    <section
      id="caravan-final"
      className="cut-top relative w-full overflow-hidden bg-ink-panel pt-[calc(var(--cut)+4rem)] pb-16 lg:pb-[104px]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(80% 90% at 50% 0%, rgba(193,146,49,0.16) 0%, transparent 62%)" }}
      />
      <div className="shell relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-7">
          <SectionHead title={f.heading} />
          <Reveal delay={2}>
            <p className="mt-7 font-[family-name:var(--font-sub)] text-[16px] tracking-[0.04em] text-white/60 uppercase">
              {f.whether}
            </p>
            <ul className="mt-3 grid gap-2.5">
              {f.reasons.map((r) => (
                <li
                  key={r}
                  className="flex items-center gap-3 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.04em] text-white sm:text-[19px]"
                >
                  <span aria-hidden className="h-[3px] w-5 shrink-0 rounded-full bg-gold" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="measure mt-7 text-[17px] leading-[28px] font-normal text-body">{f.body}</p>
          </Reveal>
        </div>

        <Reveal delay={3} className="min-w-0 lg:col-span-5">
          <div className="surface overflow-hidden">
            <ul className="grid grid-cols-2 gap-px bg-white/[0.07]">
              {f.vehicles.map((v) => (
                <li
                  key={v}
                  className="flex min-h-[64px] items-center justify-center bg-ink-panel px-3 py-4 text-center font-[family-name:var(--font-sub)] text-[15px] leading-tight font-semibold tracking-[0.06em] text-white sm:text-[16px]"
                >
                  {v}
                </li>
              ))}
            </ul>
            <p className="border-y border-white/[0.07] bg-gold/[0.08] px-6 py-3.5 text-center font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.18em] text-gold sm:px-7">
              {f.services}
            </p>
            <div className="px-6 py-6 sm:px-7">
              <p className="flex items-center gap-2.5 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.05em] text-white">
                <Icon name="camera" size={19} className="shrink-0 text-gold" />
                {f.photosLine}
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <QuoteButton label={f.quoteLabel} className="w-full" />
                <WhatsAppButton label={f.whatsappLabel} className="w-full" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
