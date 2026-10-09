import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
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
import { ENGINE, LINKS, PATH, PHOTOS, SLUG, type Step, TRACK } from "@/lib/engine-bay";
import { pageSchema } from "@/lib/schema";

/**
 * Engine Bay Top Section Detail — rebuilt from the client's brief.
 *
 * Client, 2026-10-06: "Completely replace/re-optimise the existing Engine Bay
 * Steam Cleaning page using the content below. KEEP EXISTING URL". Every word
 * of the brief's sections is in `lib/engine-bay.ts`; this file is only
 * layout, in the order of its "ELEMENTOR PAGE STRUCTURE", with the four
 * sections that list does not name (2, 9, 10, 11) where the copy puts them:
 *
 *   1 hero · 2 what the detail is · 3 the seven steps · 5 controlled
 *   cleaning · 6 the oil leak warning · 7 top section only · 8 results &
 *   limits · 9 older vehicles, with 10 modified vehicles beside it · 11 car
 *   sales · 13 pricing · 12 why Medusa · 14 reviews · 15 FAQ · 16 service
 *   terms · 17 the closing band.
 *
 * The structure puts pricing before "why Medusa", against the copy's order,
 * and the structure is what the brief calls the page layout. Sections 9 and
 * 10 share a band — both are about the condition of the bay the technician
 * arrives to — which is what lets gold and ink alternate the whole way down
 * (client, 2026-09-22: "pastikan warna bg tetap selang seling") and end on
 * the gold terms over the ink close.
 *
 * Not built: Section 4 and the structure's item 8, the before & after slider
 * and gallery — "Place a genuine Medusa before/after slider here … Use genuine
 * Medusa work". There are no such photographs, and none is faked.
 *
 * What decided the hero is the brief's last page, "The customer should
 * understand these five things before booking" — £100, the accessible top
 * section, what is included, what is not, and that an oil leak may stop the
 * job. They are the first panel under the h1, and the mobile note's "The
 * first mobile screen should clearly show: ENGINE BAY DETAIL · £100 · TOP
 * SECTION · DEGREASING • STEAM • HAND DETAIL • DRESSING · [BOOK NOW]" is met
 * by that panel and the booking button under it, inside 812px of a 375px
 * phone. The phone's sticky bar is the brief's "BOOK £100 | WHATSAPP".
 *
 * The route wins over `app/[...slug]` because a static segment outranks a
 * catch-all; the slug belongs in `CUSTOM_ROUTES` so only one page is built.
 */

const BOOK = ENGINE.book;
const WHATSAPP = ENGINE.whatsapp;

export function generateMetadata(): Metadata {
  const { title, description } = ENGINE.seo;
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

export default function EngineBayPage() {
  const page = getPage(SLUG);
  if (!page) notFound();

  return (
    <>
      {/* "STRUCTURED DATA — Add appropriate: Service schema, FAQPage schema.
          Do not use unsupported review/rating markup." */}
      <JsonLd
        data={pageSchema(page, {
          service: {
            slug: SLUG,
            name: ENGINE.hero.card.title,
            serviceType: "Engine bay cleaning",
            description: ENGINE.seo.description,
            image: PHOTOS.hero.src,
            offer: {
              price: ENGINE.price.replace(/[^\d.]/g, ""),
              currency: "GBP",
              description: `${ENGINE.hero.card.title}: ${ENGINE.pricing.includes.join(", ")}.`,
            },
          },
          faq: ENGINE.faq.items,
        })}
      />
      <TrackClicks />

      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Included />
        <Control />
        <OilLeaks />
        <Covers />
        <Results />
        <Condition />
        <Sales />
        <Pricing />
        <WhyMedusa />
        <Testimonials title={ENGINE.reviews.heading} />
        <Faq />
        <Terms />
        <FinalCta />
      </main>
      <Footer />

      {/* "MOBILE STICKY CTA — Use: BOOK £100 | WHATSAPP". */}
      <StickyBookBar
        primary={{ label: ENGINE.sticky.primary, href: BOOK, track: TRACK.book }}
        secondary={{ label: ENGINE.sticky.secondary, href: WHATSAPP, icon: "whatsapp", external: true }}
        after="engine-hero-actions"
        hideOver={["engine-final"]}
      />
    </>
  );
}

/* ── Two marks the icon set does not have ─────────────────────────────────
   Drawn on `Icon`'s own grid — 24px, 1.75 stroke, round caps and joins,
   `currentColor` — for the two steps the brief names that nothing in the set
   depicts. */

type LocalGlyph = "spray" | "steam";
type GlyphName = IconName | LocalGlyph;

const LOCAL_PATHS: Record<LocalGlyph, React.ReactNode> = {
  /* A trigger spray bottle, misting to the right — degreasing. */
  spray: (
    <>
      <path d="M8 8.5V4.5h5.5l1.5 2H11v2" />
      <path d="M7.5 8.5h4l2 3v8a1.5 1.5 0 0 1-1.5 1.5H7a1.5 1.5 0 0 1-1.5-1.5v-8l2-3Z" />
      <path d="M17.5 5.5H20" />
      <path d="m17.5 3.3 2-1.2" />
      <path d="m17.5 7.7 2 1.2" />
    </>
  ),
  /* Three wisps rising off a surface — steam. */
  steam: (
    <>
      <path d="M7.5 14c-1.2-1.4-1.2-2.8 0-4.2s1.2-2.8 0-4.2" />
      <path d="M12 14c-1.2-1.4-1.2-2.8 0-4.2s1.2-2.8 0-4.2" />
      <path d="M16.5 14c-1.2-1.4-1.2-2.8 0-4.2s1.2-2.8 0-4.2" />
      <path d="M4 17.5h16" />
      <path d="M6.5 20.5h11" />
    </>
  ),
};

function Glyph({ name, size = 20, strokeWidth = 1.75, className }: {
  name: GlyphName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  if (!(name in LOCAL_PATHS)) {
    return <Icon name={name as IconName} size={size} strokeWidth={strokeWidth} className={className} />;
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
      {LOCAL_PATHS[name as LocalGlyph]}
    </svg>
  );
}

/* ── Shared pieces ──────────────────────────────────────────────────────── */

function BookButton({
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
      href={BOOK}
      data-track={TRACK.book}
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
  track,
  inCard,
  className = "",
}: {
  label: string;
  onGold?: boolean;
  /** An event of the page's own in place of the generic WhatsApp click. */
  track?: string;
  /** In a narrow card, where the label has to wrap. */
  inCard?: boolean;
  className?: string;
}) {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      data-track={track}
      className={`btn min-h-[52px] rounded-full px-5 text-center text-[14px] ${
        inCard ? "py-3 leading-[18px]" : "sm:px-7 sm:text-[15px] sm:whitespace-nowrap"
      } ${
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

/* The brief gives every section a name and then a heading — "WHAT RESULTS
   CAN YOU EXPECT?" over "A Cleaner, Better-Presented Engine Bay". The name is
   the h2, as on the other rebuilt pages; the heading is the line under it, in
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

/** The mark for what a service does not include — muted, never red. */
function Cross({ size = 20 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-white/55"
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

/** A plain bulleted list, in one or two columns. */
function Bullets({
  items,
  onGold,
  columns = "sm:grid-cols-2",
  className = "",
}: {
  items: string[];
  onGold?: boolean;
  columns?: string;
  className?: string;
}) {
  return (
    <ul className={`grid gap-x-8 ${columns} ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-3 border-b py-2.5 text-[15px] leading-[22px] font-normal ${
            onGold ? "border-ink/15 text-ink/85" : "border-white/[0.06] text-white/80"
          }`}
        >
          <span aria-hidden className={`mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full ${onGold ? "bg-ink" : "bg-gold"}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** "IMPORTANT" notes, as one treatment wherever the brief writes one. */
function Important({
  title,
  strong,
  body,
  className = "",
}: {
  title: string;
  strong?: string;
  body: string[];
  className?: string;
}) {
  return (
    <div className={`rounded-[12px] bg-gold/[0.07] p-5 ring-1 ring-gold/40 ${className}`}>
      <p className="flex items-center gap-2.5 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.22em] text-gold uppercase">
        <Icon name="info" size={16} className="shrink-0" />
        {title}
      </p>
      {strong && <p className="mt-2.5 text-[15px] leading-[23px] font-semibold text-white">{strong}</p>}
      {body.map((html) => (
        <p
          key={html}
          className="mt-2 text-[14.5px] leading-[23px] font-normal text-white/75 [&_strong]:font-semibold [&_strong]:text-white"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ))}
    </div>
  );
}

/** "Degrease • Steam • Detail • Dress" — words kept whole, dots in gold. */
function DotLine({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <p className={className}>
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && (
            <>
              {" "}
              <span aria-hidden className="mx-0.5 text-gold">
                •
              </span>{" "}
            </>
          )}
          <span className="whitespace-nowrap">{item}</span>
        </Fragment>
      ))}
    </p>
  );
}

/* ── 1. Hero ──────────────────────────────────────────────────────────────
   "Immediately communicate: ENGINE BAY TOP SECTION DETAIL · £100 · DEGREASE
   • STEAM • DETAIL • DRESS · [BOOK NOW] [WHATSAPP]". The h1, Section 1's
   "Professional Engine Bay Top Section Detail — £100" under it, then the
   five things the customer must understand before booking as one panel —
   the price with the hero's four verbs beside the four conditions that come
   with it — then both buttons. The brief's card (the eight ticks and its
   IMPORTANT note) sits beside them from `lg`, around the photograph. */

const POINT_ICONS: IconName[] = ["layers", "check", "close", "warning"];

function Hero() {
  const h = ENGINE.hero;
  const pts = ENGINE.points;
  const [opening, offer, method] = h.intro;

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
          <div className="lg:col-span-7">
            <Reveal className="hidden sm:block">
              <span className="hero-rule speed-rule" aria-hidden />
            </Reveal>

            {/* 29px on a phone, not the other rebuilds' 31: this h1 is eleven
                characters longer, and at 29px it sets in three lines at 375px
                rather than four — the room the five points need to keep the
                booking button inside the first screen. */}
            <Reveal delay={1}>
              <h1 className="max-w-[20ch] text-[clamp(29px,4.4vw,60px)] leading-[1.0] text-white sm:mt-7 lg:mt-6">
                {h.h1}
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <h2 className="mt-3.5 max-w-[40ch] font-[family-name:var(--font-sub)] text-[16.5px] leading-[1.3] font-semibold tracking-[0.03em] text-gold sm:text-[19px] xl:mt-5 xl:text-[21px]">
                {h.title}
              </h2>
            </Reveal>

            {/* The five things. */}
            <Reveal delay={3}>
              <div className="mt-6 flex max-w-[640px] flex-col overflow-hidden rounded-[14px] bg-white/[0.04] ring-1 ring-gold/35 sm:flex-row xl:mt-8">
                <div className="flex items-center gap-x-4 bg-gold/[0.1] px-5 py-3.5 sm:w-[188px] sm:shrink-0 sm:flex-col sm:items-start sm:justify-center sm:gap-2.5 sm:px-6 sm:py-5">
                  <p className="flex shrink-0 flex-col gap-1.5 whitespace-nowrap">
                    <span className="font-[family-name:var(--font-display)] text-[44px] leading-[0.85] text-gold sm:text-[48px]">
                      {pts.price.value}
                    </span>
                    <span className="font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.16em] text-white/80 uppercase">
                      {pts.price.caption}
                    </span>
                  </p>
                  <DotLine
                    items={pts.process}
                    className="min-w-0 font-[family-name:var(--font-sub)] text-[13.5px] leading-[20px] font-semibold tracking-[0.06em] text-white uppercase sm:mt-1"
                  />
                </div>
                <ul className="flex flex-1 flex-col justify-center gap-2.5 border-t border-gold/25 px-5 py-4 sm:border-t-0 sm:border-l sm:px-6">
                  {pts.items.map((c, i) => (
                    <li
                      key={c}
                      className="flex items-center gap-3 text-[14px] leading-[19px] font-semibold text-white sm:text-[14.5px]"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                        <Icon name={POINT_ICONS[i]} size={15} strokeWidth={2.1} />
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={4}>
              <div id="engine-hero-actions" className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:mt-8">
                <BookButton label={h.bookLabel} className="w-full sm:w-auto" />
                <WhatsAppButton label={h.whatsappLabel} className="w-full sm:w-auto" />
              </div>
            </Reveal>

            <Reveal delay={5}>
              <p className="mt-7 max-w-[58ch] text-[17px] leading-[27px] font-semibold text-white xl:mt-8">{opening}</p>
            </Reveal>
          </div>

          <Reveal delay={4} className="lg:col-span-5">
            <HeroCard />
          </Reveal>
        </div>

        <Reveal delay={5}>
          <div className="mt-10 grid gap-x-12 gap-y-4 border-t border-white/10 pt-7 md:grid-cols-2 lg:mt-12">
            {[offer, method].map((html) => (
              <p
                key={html}
                className="text-[15.5px] leading-[26px] font-normal text-white/70 [&_strong]:font-semibold [&_strong]:text-white"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HeroCard() {
  const c = ENGINE.hero.card;
  return (
    /* Photograph over the copy in the hero's column and on a phone; side by
       side on a tablet, where a stacked card ran a 450px-tall picture
       across the full width. */
    <figure className="surface relative overflow-hidden md:grid md:grid-cols-2 lg:block">
      <div className="relative aspect-[3/2] w-full md:aspect-auto md:min-h-[300px] lg:aspect-[16/10] lg:min-h-0">
        <Image
          src={PHOTOS.hero.src}
          alt={PHOTOS.hero.alt}
          fill
          priority
          sizes="(min-width: 1024px) 38vw, (min-width: 768px) 46vw, 92vw"
          className="object-cover object-[55%_50%]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(13,13,13,0.85),transparent)]"
        />
      </div>
      <figcaption className="p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-[family-name:var(--font-sub)] text-[18px] leading-tight tracking-[0.03em] text-white uppercase sm:text-[20px]">
            {c.title}
          </h3>
          <p className="shrink-0 font-[family-name:var(--font-display)] text-[28px] leading-none whitespace-nowrap text-gold">
            {ENGINE.price}
          </p>
        </div>
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
        <Important title={c.important.title} strong={c.important.strong} body={[c.important.body]} className="mt-5" />
      </figcaption>
    </figure>
  );
}

/* ── 2. What is an engine bay top section detail? ─────────────────────────
   What builds up on the bay, as chips, and who the service is for as the
   band's one card, closing on the brief's "STANDARD PRICE: £100" and its
   BOOK NOW. */

function About() {
  const s = ENGINE.about;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-7">
          <SectionHead title={s.heading} tone="gold" />
          <Kicker onGold>{s.title}</Kicker>
          <Reveal delay={3}>
            <p className="measure mt-6 text-[17px] leading-[27px] font-semibold text-ink">{s.accumulateLead}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.accumulate.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-ink/[0.08] px-3.5 py-1.5 text-[14px] leading-[19px] font-semibold text-ink ring-1 ring-ink/20"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p
              className="measure mt-7 text-[17px] leading-[28px] font-normal text-ink/85 [&_strong]:font-semibold [&_strong]:text-ink"
              dangerouslySetInnerHTML={{ __html: s.purposeHtml }}
            />
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-5">
          <div className="surface-on-gold overflow-hidden">
            <div className="p-6 sm:p-8">
              <h3 className="text-[16px] leading-[23px] font-semibold text-white">{s.usefulLead}</h3>
              <ul className="mt-5 grid gap-3">
                {s.useful.map((u) => (
                  <li key={u} className="flex items-start gap-3 text-[15px] leading-[22px] font-normal text-white/85">
                    <span className="mt-px">
                      <Tick />
                    </span>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-white/[0.08] px-6 py-5 sm:px-8">
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.16em] text-white/75 uppercase">
                  {s.price.label}
                </span>{" "}
                <span className="font-[family-name:var(--font-display)] text-[34px] leading-none whitespace-nowrap text-gold">
                  {s.price.value}
                </span>
              </p>
              <BookButton label={s.bookLabel} className="w-full sm:w-auto" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 3. What's included for £100? ─────────────────────────────────────────
   "Seven visual steps: INSPECT · DEGREASE · STEAM · HAND CLEAN · DRY · DRESS
   · INSPECT". That line is the band's picture; the seven steps follow it as
   one numbered sequence with the brief's full wording, each step's name
   beside its text, because they run from one sentence to a list of seven
   and a grid of cards would have been ragged. */

const STEP_ICONS: GlyphName[] = ["search", "spray", "steam", "brush", "wind", "spark", "eye"];

function Included() {
  const s = ENGINE.included;
  return (
    <section id="included" className="w-full scroll-mt-24 py-16 lg:py-[104px]">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <SectionHead title={s.heading} />
            <Kicker>{s.title}</Kicker>
          </div>
          <Reveal delay={3}>
            <p className="font-[family-name:var(--font-display)] text-[54px] leading-[0.85] whitespace-nowrap text-gold sm:text-[72px] lg:text-[88px]">
              {ENGINE.price}
            </p>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <p className="mt-8 text-[17px] leading-[27px] font-semibold text-white">{s.lead}</p>
        </Reveal>

        {/* The structure's line, as a strip. */}
        <Reveal delay={1}>
          <ol aria-hidden className="mt-5 grid grid-cols-2 gap-2.5 rounded-[14px] bg-white/[0.03] p-3 ring-1 ring-white/[0.07] md:grid-cols-7">
            {s.steps.map((step, i) => {
              const last = i === s.steps.length - 1;
              return (
                <li
                  key={`${step.flow}-${i}`}
                  className={`flex min-h-[78px] flex-col justify-between rounded-[10px] bg-white/[0.04] px-4 py-3 text-white ring-1 ring-white/[0.08] md:px-3 lg:px-4 ${
                    last ? "col-span-2 md:col-span-1" : ""
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-display)] text-[18px] leading-none text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {!last && <Icon name="arrow" size={15} className="text-white/35" />}
                  </span>
                  <span className="mt-2.5 font-[family-name:var(--font-sub)] text-[15.5px] leading-tight font-semibold tracking-[0.05em] uppercase md:text-[14px] lg:text-[15.5px]">
                    {step.flow}
                  </span>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <ol className="surface mt-6 divide-y divide-white/[0.07] lg:mt-8">
          {s.steps.map((step, i) => (
            <StepRow key={step.title} step={step} n={i + 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepRow({ step, n }: { step: Step; n: number }) {
  const para = (html: string, i: number) => (
    <p
      key={html}
      className={`${i === 0 ? "" : "mt-3"} measure text-[15.5px] leading-[26px] font-normal text-white/75 [&_strong]:font-semibold [&_strong]:text-white`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
  return (
    <Reveal as="li" className="grid gap-5 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-9">
      <div className="flex items-center gap-4 lg:col-span-4 lg:items-start">
        <IconDisc name={STEP_ICONS[n - 1] ?? "check"} size={50} />
        <div>
          <Label>Step {n}</Label>
          <h3 className="mt-1 font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[22px]">
            {step.title}
          </h3>
        </div>
      </div>
      <div className="min-w-0 lg:col-span-8">
        {step.body.map(para)}
        {step.list && (
          <div className="mt-4 rounded-[10px] bg-white/[0.04] px-4 py-3.5 ring-1 ring-white/[0.07] sm:px-5">
            <p className="text-[14px] leading-[21px] font-semibold text-gold">{step.list.lead}</p>
            <ul className="mt-2.5 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
              {step.list.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-[14.5px] leading-[21px] font-semibold text-white/90">
                  <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {step.after?.map((html) => (
          <p
            key={html}
            className="measure mt-4 text-[15.5px] leading-[25px] font-semibold text-white"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
        {step.important && (
          <Important title={step.important.title} body={step.important.body} className="mt-5 max-w-[68ch]" />
        )}
      </div>
    </Reveal>
  );
}

/* ── 5. Why we don't just pressure-wash everything ────────────────────────
   "Explain why Medusa doesn't simply blast the engine bay with water." The
   argument beside the hand-detailing photograph, the nine places that need
   care as the band's panel, and the section's own closing line set large in
   the band's one dark strip. */

function Control() {
  const s = ENGINE.control;
  const [first, second] = s.statement.split(/\s+—\s+/);
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.title}</Kicker>
            <Reveal delay={3}>
              <p className="measure mt-5 text-[18px] leading-[28px] font-semibold text-ink">{s.body[0]}</p>
              <p
                className="measure mt-4 text-[17px] leading-[28px] font-normal text-ink/85 [&_strong]:font-semibold [&_strong]:text-ink"
                dangerouslySetInnerHTML={{ __html: s.body[1] }}
              />
            </Reveal>
          </div>
          <Reveal delay={2} className="lg:col-span-5">
            <figure className="relative overflow-hidden rounded-[14px] ring-1 ring-ink/15">
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={PHOTOS.detailing.src}
                  alt={PHOTOS.detailing.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className="object-cover object-[35%_50%]"
                />
              </div>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="surface-on-gold mt-12 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <IconDisc name="info" size={40} />
              <h3 className="text-[16px] leading-[23px] font-semibold text-white">{s.careLead}</h3>
            </div>
            <Bullets items={s.care} columns="sm:grid-cols-2 lg:grid-cols-3" className="mt-5" />
            <p className="mt-6 text-[16px] leading-[25px] font-semibold text-white">{s.after}</p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="relative mt-6 overflow-hidden rounded-[14px] bg-ink p-6 ring-1 ring-gold/40 sm:p-8 lg:mt-8 lg:p-12">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(60% 90% at 85% 100%, rgba(193,146,49,0.14) 0%, transparent 70%)" }}
            />
            <p className="relative font-[family-name:var(--font-heading)] text-[22px] leading-[1.1] font-black text-white uppercase min-[400px]:text-[25px] sm:text-[32px] lg:text-[40px]">
              {first} — <span className="text-gold">{second}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 6. Important: oil leaks & heavy oil contamination ────────────────────
   "OIL LEAK WARNING — This should be a prominent warning/information box.
   ACTIVE OIL LEAK? CONTACT US BEFORE BOOKING. Explain drainage +
   insurance/service restrictions." The box is the brief's BEFORE BOOKING —
   send photos first, over WhatsApp — under the structure's own "Active Oil
   Leak?", beside the section's argument and the seven cases; the three
   reasons follow as numbered cards. The WhatsApp button reports itself as
   the brief's "Oil Leak Assessment Enquiry". Ink and gold, as everywhere
   else on the site: a warning that reads, not one that alarms. */

function OilLeaks() {
  const s = ENGINE.oil;
  const b = s.beforeBooking;
  return (
    <section id="oil-leaks" className="w-full scroll-mt-24 py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHead title={s.heading} />
            <Kicker>{s.title}</Kicker>
            <Reveal delay={3}>
              <p
                className="measure mt-5 text-[18px] leading-[28px] font-normal text-white [&_strong]:font-semibold [&_strong]:text-gold"
                dangerouslySetInnerHTML={{ __html: s.body[0] }}
              />
              <Prose html={s.body[1]} />
              <Prose html={s.body[2]} space="mt-2" />
            </Reveal>

            <Reveal delay={2}>
              <div className="surface mt-8 p-6 sm:p-8">
                <h3 className="font-[family-name:var(--font-sub)] text-[18px] leading-tight font-semibold tracking-[0.03em] text-white uppercase sm:text-[20px]">
                  {s.unableLead}
                </h3>
                <ul className="mt-4">
                  {s.unable.map((u) => (
                    <li
                      key={u}
                      className="flex gap-3 border-b border-white/[0.06] py-3 text-[15px] leading-[22px] font-normal text-white/85 last:border-b-0"
                    >
                      <span className="mt-px">
                        <Cross />
                      </span>
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={2} className="lg:col-span-5">
            <aside className="relative overflow-hidden rounded-[16px] bg-gold/[0.07] p-6 ring-2 ring-gold/60 sm:p-8 lg:sticky lg:top-32">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "radial-gradient(80% 60% at 100% 0%, rgba(237,179,38,0.16) 0%, transparent 70%)" }}
              />
              <div className="relative">
                <Label>{b.heading}</Label>
                <div className="mt-4 flex items-center gap-4">
                  <IconDisc name="warning" size={52} solid />
                  <h3 className="font-[family-name:var(--font-heading)] text-[26px] leading-[1.02] font-black text-gold uppercase sm:text-[32px]">
                    {b.flag}
                  </h3>
                </div>
                <p className="mt-6 text-[16px] leading-[25px] font-normal text-white/85">{b.lead}</p>
                <p className="mt-3 font-[family-name:var(--font-heading)] text-[21px] leading-[1.1] font-black text-white uppercase sm:text-[25px]">
                  {b.strong}
                </p>
                <WhatsAppButton label={b.whatsappLabel} track={TRACK.oilLeak} inCard className="mt-6 w-full" />
                <p className="mt-4 text-[14.5px] leading-[22px] font-normal text-white/65">{b.after}</p>
              </div>
            </aside>
          </Reveal>
        </div>

        <div className="mt-14 lg:mt-20">
          <Reveal>
            <h3 className="font-[family-name:var(--font-heading)] text-[30px] leading-none font-black text-white uppercase sm:text-[38px]">
              {s.whyHeading}
            </h3>
          </Reveal>
          <ol className="mt-7 grid gap-4 md:grid-cols-3 lg:gap-5">
            {s.why.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i} className="surface group relative overflow-hidden p-6 sm:p-7">
                <span className="font-[family-name:var(--font-display)] text-[40px] leading-none text-gold/90">{i + 1}</span>
                <h4 className="mt-4 font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[21px]">
                  {w.title}
                </h4>
                {w.body.map((p, j) => (
                  <p
                    key={p}
                    className={`mt-3 text-[15px] leading-[24px] ${j === 0 ? "font-normal text-white/80" : "font-normal text-white/65"}`}
                  >
                    {p}
                  </p>
                ))}
                <HoverRule />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ── 7. What the £100 service covers ──────────────────────────────────────
   "TOP SECTION ONLY — Use a simple graphic showing: INCLUDED Accessible
   upper engine bay versus NOT INCLUDED Undertrays / underside / dismantling
   / repairs". The graphic is an engine bay seen from the front, bonnet up:
   the upper bay lit in gold above a dashed line, everything under it
   hatched. Beside it, the thirteen things the price does not include, and
   the brief's NO COMPONENT DISMANTLING as the band's dark strip. */

function TopSectionGraphic() {
  const g = ENGINE.covers.graphic;
  return (
    <figure className="surface-on-gold overflow-hidden p-5 sm:p-6">
      <svg viewBox="0 0 320 214" className="block h-auto w-full text-white" role="img" aria-labelledby="engine-graphic-title">
        <title id="engine-graphic-title">{`${g.included.label}: ${g.included.text}. ${g.excluded.label}: ${g.excluded.text}.`}</title>
        <defs>
          <pattern id="engine-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.22" />
          </pattern>
        </defs>

        {/* The two zones. */}
        <rect x="35" y="59" width="250" height="52" className="fill-gold" fillOpacity="0.2" />
        <rect x="35" y="113" width="250" height="65" fill="url(#engine-hatch)" />

        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {/* Bonnet, raised. */}
          <path d="M50 58 72 14h176l22 44" strokeOpacity="0.45" strokeWidth="2" />
          {/* Wings and bay walls. */}
          <path d="M34 150V72q0-14 16-14h220q16 0 16 14v78" strokeOpacity="0.6" strokeWidth="2" />
          {/* Tyres. */}
          <rect x="20" y="150" width="44" height="52" rx="10" strokeOpacity="0.5" strokeWidth="2" />
          <rect x="256" y="150" width="44" height="52" rx="10" strokeOpacity="0.5" strokeWidth="2" />
          {/* Undertray. */}
          <path d="M64 178h192" strokeOpacity="0.55" strokeWidth="2" />
          {/* Ground. */}
          <path d="M8 204h304" strokeOpacity="0.2" strokeWidth="1.5" />

          {/* Upper bay: engine cover, reservoir, battery. */}
          <g className="stroke-gold-bright" strokeWidth="2">
            <rect x="104" y="68" width="112" height="28" rx="7" />
            <path d="M126 76v12M146 76v12M166 76v12M186 76v12" strokeOpacity="0.7" />
            <rect x="52" y="74" width="34" height="26" rx="7" />
            <path d="M62 74v-5h14v5" />
            <rect x="232" y="72" width="38" height="26" rx="3" />
            <path d="M240 72v-4M262 72v-4" />
          </g>

          {/* Lower bay: block and sump. */}
          <g strokeOpacity="0.5" strokeWidth="2">
            <path d="M112 96v58h96V96" />
            <rect x="132" y="154" width="56" height="16" rx="3" />
          </g>
        </g>

        {/* The line between them. */}
        <path d="M34 112h252" className="stroke-gold-bright" strokeWidth="2" strokeDasharray="7 6" strokeLinecap="round" />
      </svg>

      <figcaption className="mt-5 grid gap-3">
        <p className="flex items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-gold/25 text-gold ring-1 ring-gold/60">
            <Icon name="check" size={15} strokeWidth={2.6} />
          </span>
          <span>
            <span className="block font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.2em] text-gold uppercase">
              {g.included.label}
            </span>
            <span className="block text-[15px] leading-[22px] font-semibold text-white">{g.included.text}</span>
          </span>
        </p>
        <p className="flex items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-[repeating-linear-gradient(45deg,rgb(255_255_255/0.18)_0_1.5px,transparent_1.5px_6px)] text-white/70 ring-1 ring-white/25">
            <Icon name="close" size={13} strokeWidth={2.6} />
          </span>
          <span>
            <span className="block font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.2em] text-white/60 uppercase">
              {g.excluded.label}
            </span>
            <span className="block text-[15px] leading-[22px] font-normal text-white/80">{g.excluded.text}</span>
          </span>
        </p>
      </figcaption>
    </figure>
  );
}

function Covers() {
  const s = ENGINE.covers;
  return (
    <section id="top-section-only" className="w-full scroll-mt-24 bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.title}</Kicker>
            <Reveal delay={3}>
              <p
                className="mt-5 text-[18px] leading-[29px] font-normal text-ink/85 [&_strong]:font-semibold [&_strong]:text-ink"
                dangerouslySetInnerHTML={{ __html: s.leadHtml }}
              />
            </Reveal>
            <Reveal delay={3} className="mt-7">
              <TopSectionGraphic />
            </Reveal>
          </div>

          <Reveal delay={2} className="min-w-0 lg:col-span-7">
            <div className="surface-on-gold p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <IconDisc name="close" size={40} />
                <h3 className="text-[16px] leading-[23px] font-semibold text-white">{s.excludedLead}</h3>
              </div>
              <ul className="mt-5 grid sm:grid-cols-2 sm:gap-x-8">
                {s.excluded.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-white/[0.06] py-2.5 text-[15px] leading-[22px] font-normal text-white/80"
                  >
                    <span className="mt-px">
                      <Cross />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="mt-6 flex flex-col gap-4 rounded-[14px] bg-ink p-6 ring-1 ring-gold/40 sm:flex-row sm:gap-6 sm:p-8 lg:mt-8 lg:p-10">
            <IconDisc name="layers" size={48} solid />
            <div>
              <h3 className="font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.22em] text-gold uppercase">
                {s.dismantling.title}
              </h3>
              <p className="mt-2.5 text-[16.5px] leading-[26px] font-normal text-white/80">{s.dismantling.body[0]}</p>
              <p className="mt-1.5 text-[16.5px] leading-[26px] font-semibold text-white">{s.dismantling.body[1]}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 8. What results can you expect? ──────────────────────────────────────
   "RESULTS & LIMITATIONS — Explain what detailing can and cannot correct."
   The two lists side by side — ticks for what cleaning may improve, muted
   crosses for what it cannot guarantee — under the old page's own clean
   engine bay, and the brief's IMPORTANT note across both. */

function Results() {
  const s = ENGINE.results;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={s.heading} />
            <Kicker>{s.title}</Kicker>
            <Reveal delay={3}>
              <p className="measure mt-5 text-[18px] leading-[28px] font-semibold text-white">{s.body[0]}</p>
              <Prose html={s.body[1]} />
            </Reveal>
          </div>
          <Reveal delay={2} className="lg:col-span-5">
            {/* The file is 416px wide; it is never shown wider. */}
            <figure className="relative mx-auto max-w-[416px] overflow-hidden rounded-[14px] ring-1 ring-white/10 lg:mr-0">
              <Image
                src={PHOTOS.finished.src}
                alt={PHOTOS.finished.alt}
                width={PHOTOS.finished.w}
                height={PHOTOS.finished.h}
                sizes="(min-width: 480px) 416px, 92vw"
                className="block h-auto w-full"
              />
            </figure>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-5">
          <Reveal className="surface p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <IconDisc name="check" size={40} solid />
              <h3 className="font-[family-name:var(--font-sub)] text-[18px] leading-tight font-semibold tracking-[0.03em] text-white uppercase sm:text-[20px]">
                {s.improve.title}
              </h3>
            </div>
            <ul className="mt-5 grid gap-2.5">
              {s.improve.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-[22px] font-normal text-white/85">
                  <span className="mt-px">
                    <Tick />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={1} className="surface p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-white/70 ring-1 ring-white/15">
                <Icon name="close" size={17} strokeWidth={2.2} />
              </span>
              <h3 className="font-[family-name:var(--font-sub)] text-[18px] leading-tight font-semibold tracking-[0.03em] text-white uppercase sm:text-[20px]">
                {s.cannot.title}
              </h3>
            </div>
            <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              {s.cannot.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-[22px] font-normal text-white/75">
                  <span className="mt-px">
                    <Cross />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <Important
            title={s.important.title}
            strong={s.important.strong}
            body={[s.important.body]}
            className="mt-6 sm:p-6 lg:mt-8 lg:px-8"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ── 9 & 10. Older vehicles · Modified & performance vehicles ─────────────
   Both are about the bay the technician arrives to rather than the work, so
   they share a band: the older vehicle's list and the brief's "However,
   cleaning cannot repair existing deterioration" on the left, and the
   modified car as a card of its own beside it. */

function Condition() {
  const o = ENGINE.older;
  const m = ENGINE.modified;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <SectionHead title={o.heading} tone="gold" />
          <Kicker onGold>{o.title}</Kicker>
          <Reveal delay={3}>
            <p className="measure mt-5 text-[18px] leading-[28px] font-semibold text-ink">{o.lead}</p>
            <p className="mt-6 text-[15.5px] leading-[23px] font-semibold text-ink">{o.listLead}</p>
            <Bullets items={o.list} onGold columns="min-[460px]:grid-cols-2" className="mt-2" />
            <Prose html={o.care} onGold space="mt-6" />
            <p className="mt-4 border-l-2 border-ink pl-4 text-[17px] leading-[26px] font-semibold text-ink">{o.however}</p>
            <Prose html={o.decline} onGold />
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-5">
          <article className="surface-on-gold p-6 sm:p-8 lg:sticky lg:top-32">
            <div className="flex items-center gap-3">
              <IconDisc name="gauge" size={42} />
              <h2 className="font-[family-name:var(--font-sub)] text-[22px] leading-tight font-semibold tracking-[0.03em] text-white uppercase sm:text-[24px]">
                {m.heading}
              </h2>
            </div>
            <h3 className="mt-4 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.03em] text-gold uppercase">
              {m.title}
            </h3>
            <p className="mt-4 text-[15px] leading-[24px] font-normal text-white/80">{m.listLead}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {m.list.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-white/[0.05] px-3 py-1.5 text-[13.5px] leading-[18px] font-normal text-white/85 ring-1 ring-white/10"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[15.5px] leading-[24px] font-semibold text-white">{m.listAfter}</p>
            <p className="mt-5 flex gap-3 rounded-[10px] bg-white/[0.04] px-4 py-3.5 text-[14.5px] leading-[21px] font-semibold text-white ring-1 ring-white/[0.07]">
              <Icon name="camera" size={18} className="mt-px shrink-0 text-gold" />
              {m.body[0]}
            </p>
            <p className="mt-4 text-[14.5px] leading-[23px] font-normal text-white/70">{m.body[1]}</p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 11. Engine bay detailing for car sales ───────────────────────────────
   The five things an engine bay sits beside when a car is sold, each that
   has a service of its own linked to it — the brief's internal-linking list
   laid on its own words — and its two buttons: VIEW PRE-SALE VALET, ADD
   ENGINE BAY DETAIL. The photograph is the old page's own header picture. */

function Sales() {
  const s = ENGINE.sales;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHead title={s.heading} />
          <Kicker>{s.title}</Kicker>
          <Reveal delay={3}>
            <p className="measure mt-5 text-[18px] leading-[28px] font-semibold text-white">{s.lead}</p>
            <Prose html={s.listLead} space="mt-5" />
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
              {s.listHtml.map((html) => (
                <li key={html} className="flex items-start gap-3 text-[15.5px] leading-[22px] font-semibold text-white/90">
                  <span className="mt-px">
                    <Tick />
                  </span>
                  <span
                    className="[&_a]:underline [&_a]:decoration-gold/50 [&_a]:underline-offset-[4px] [&_a]:transition-colors [&_a:hover]:text-gold"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </li>
              ))}
            </ul>
            <Prose html={s.afterHtml} space="mt-6" />
          </Reveal>
          <Reveal delay={4}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={LINKS.preSale}
                className="btn btn-outline min-h-[52px] w-full rounded-full px-5 text-[14px] sm:w-auto sm:px-7 sm:text-[15px] sm:whitespace-nowrap"
              >
                {s.preSaleLabel}
                <Icon name="arrow" size={18} className="ml-2.5 shrink-0" />
              </Link>
              <BookButton label={s.bookLabel} className="w-full sm:w-auto" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-5">
          <figure className="relative overflow-hidden rounded-[14px] ring-1 ring-white/10">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={PHOTOS.presale.src}
                alt={PHOTOS.presale.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="object-cover object-[60%_50%]"
              />
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 13. Pricing ──────────────────────────────────────────────────────────
   "£100 PRICING — Repeat price prominently." The figure as large as the band
   allows, and beside it what the £100 includes, the mobile service and the
   booking button, in one card. */

function Pricing() {
  const s = ENGINE.pricing;
  return (
    <section id="pricing" className="w-full scroll-mt-24 bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHead title={s.heading} tone="gold" />
          <Kicker onGold>{s.title}</Kicker>
          <Reveal delay={3}>
            <p className="mt-6 font-[family-name:var(--font-display)] text-[88px] leading-[0.85] whitespace-nowrap text-ink min-[400px]:text-[104px] sm:text-[140px] lg:text-[100px] xl:text-[136px]">
              {s.price}
            </p>
          </Reveal>
        </div>

        <Reveal delay={2} className="min-w-0 lg:col-span-7">
          <div className="surface-on-gold overflow-hidden">
            <div className="p-6 sm:p-8">
              <Label>{s.includesLabel}</Label>
              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {s.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15.5px] leading-[22px] font-semibold text-white/90">
                    <span className="mt-px">
                      <Tick />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4 border-t border-white/[0.08] px-6 py-5 sm:px-8">
              <IconDisc name="van" size={44} />
              <div>
                <h3 className="font-[family-name:var(--font-sub)] text-[18px] leading-tight font-semibold tracking-[0.03em] text-white uppercase">
                  {s.mobile.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-[23px] font-normal text-white/75">{s.mobile.body}</p>
              </div>
            </div>
            <div className="border-t border-white/[0.08] px-6 py-5 sm:px-8">
              <BookButton label={s.bookLabel} className="w-full sm:w-auto" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 12. Why choose Medusa? ───────────────────────────────────────────────
   "WHY MEDUSA — Short section." Six short cards, three over three, and the
   brief's BOOK FOR £100 beside the heading. */

const WHY_ICONS: Record<string, IconName> = {
  "Fixed Standard Price": "tag",
  "Controlled Cleaning": "gauge",
  "Detailed Finish": "spark",
  "Mobile Service": "van",
  "Realistic Service Scope": "target",
  "Professional Assessment": "search",
};

function WhyMedusa() {
  const w = ENGINE.why;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionHead title={w.heading} />
            <Kicker>{w.title}</Kicker>
          </div>
          <Reveal delay={3} className="w-full sm:w-auto">
            <BookButton label={w.bookLabel} className="w-full sm:w-auto" />
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {w.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i % 3} className="surface group relative overflow-hidden p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <IconDisc name={WHY_ICONS[it.title] ?? "check"} size={46} />
                <h3 className="font-[family-name:var(--font-sub)] text-[19px] leading-tight text-white uppercase sm:text-[20px]">
                  {it.title}
                </h3>
              </div>
              <p
                className="mt-4 text-[15px] leading-[25px] font-normal text-white/75 [&_strong]:font-semibold [&_strong]:text-white"
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

/* ── 15. FAQ ──────────────────────────────────────────────────────────────
   "Accordion." */

function Faq() {
  const f = ENGINE.faq;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHead title={f.heading} />
          </div>
        </div>
        <div className="lg:col-span-8">
          <FaqAccordion items={f.items} />
        </div>
      </div>
    </section>
  );
}

/* ── 16. Important service terms ──────────────────────────────────────────
   "IMPORTANT INFORMATION — Terms/limitations." The seven, numbered, each
   under its own name, the existing-damage list in two columns inside its
   term. */

function Terms() {
  const s = ENGINE.terms;
  return (
    <section id="terms" className="w-full scroll-mt-24 bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.title}</Kicker>
          </div>
        </div>

        <Reveal delay={2} className="min-w-0 lg:col-span-8">
          <ol className="surface-on-gold px-6 py-3 sm:px-8 sm:py-4 lg:px-10">
            {s.items.map((t, i) => (
              <li key={t.title} className="flex gap-4 border-b border-white/[0.06] py-5 last:border-b-0">
                <span
                  aria-hidden
                  className="w-7 shrink-0 font-[family-name:var(--font-display)] text-[19px] leading-[23px] text-gold"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-sub)] text-[17px] leading-[23px] font-semibold tracking-[0.04em] text-white uppercase">
                    {t.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-[24px] font-normal text-white/75">{t.body}</p>
                  {t.list && <Bullets items={t.list} columns="sm:grid-cols-2" className="mt-2" />}
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 17. Final CTA ─────────────────────────────────────────────────────────
   "FINAL CTA — ENGINE BAY TOP SECTION DETAIL — £100 · [BOOK NOW]". The
   heading and both buttons beside the brief's card — the price over the
   seven steps it sets one under another with an arrow between each — and
   its OIL LEAK? line at the card's foot, which opens WhatsApp for the
   photographs. The sticky bar steps aside while it is on screen. */

function FinalCta() {
  const f = ENGINE.finalCta;
  const c = f.card;
  return (
    <section
      id="engine-final"
      className="cut-top relative w-full overflow-hidden bg-ink-panel pt-[calc(var(--cut)+4rem)] pb-16 lg:pb-[104px]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "radial-gradient(80% 90% at 50% 0%, rgba(193,146,49,0.16) 0%, transparent 62%)",
        }}
      />
      <div className="shell relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <SectionHead title={f.heading} />
          <Reveal delay={3}>
            <p className="measure mt-6 text-[17px] leading-[28px] font-normal text-body">{f.body}</p>
          </Reveal>
          <Reveal delay={4}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <BookButton label={f.bookLabel} className="w-full sm:w-auto" />
              <WhatsAppButton label={f.whatsappLabel} className="w-full sm:w-auto" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-5">
          <div className="surface overflow-hidden">
            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-b border-white/[0.07] px-6 py-5 sm:px-7">
              <h3 className="font-[family-name:var(--font-sub)] text-[19px] leading-tight tracking-[0.03em] text-white uppercase sm:text-[21px]">
                {c.title}
              </h3>
              <p className="shrink-0 font-[family-name:var(--font-display)] text-[40px] leading-[0.85] whitespace-nowrap text-gold">
                {c.price}
              </p>
            </div>
            <div className="px-6 py-5 sm:px-7">
              <Label>{c.includesLabel}</Label>
              <ol className="mt-3">
                {c.includes.map((step, i) => {
                  const last = i === c.includes.length - 1;
                  return (
                    <li key={step} className="flex flex-col items-start">
                      <span className="font-[family-name:var(--font-ui)] text-[13px] leading-[20px] font-semibold tracking-[0.12em] text-white uppercase">
                        {step}
                      </span>
                      {!last && (
                        <Icon name="arrow" size={14} strokeWidth={2.2} className="my-1 ml-0.5 rotate-90 text-gold/70" />
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              data-track={TRACK.oilLeak}
              className="group flex items-center gap-3 bg-gold/[0.08] px-6 py-4 transition-colors hover:bg-gold/[0.14] sm:px-7"
            >
              <Icon name="warning" size={18} className="shrink-0 text-gold" />
              <span className="text-[14px] leading-[20px]">
                <strong className="font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.18em] text-gold uppercase">
                  {f.oilLeak.title}
                </strong>{" "}
                <span className="font-semibold text-white">{f.oilLeak.body}</span>
              </span>
              <Icon name="whatsapp" size={18} className="ml-auto shrink-0 text-white/70 group-hover:text-gold" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
