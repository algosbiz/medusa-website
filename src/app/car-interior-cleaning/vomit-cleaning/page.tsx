import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
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
import { type Block, getPage, type Section } from "@/lib/blocks";
import { faqPageSchema, pageSchema, serviceSchema } from "@/lib/schema";
import { EVENTS } from "@/lib/track";
import { GUIDE, PATH, PHOTOS, SLUG, type Step, VOMIT } from "@/lib/vomit-cleaning";

/**
 * Car vomit cleaning — restructured from the client's brief.
 *
 * Client, 2026-10-06: "This document replaces/restructures the existing Vomit
 * Cleaning page. KEEP EXISTING URL". Every word of the brief's sections is in
 * `lib/vomit-cleaning.ts`; this file is only layout, in the brief's order:
 *
 *   1 hero · 2 prices · 3 what's included · 4 the eight steps · 5 why ozone ·
 *   7 the disclaimer · 8 severe contamination · 9 why Medusa · 10 reviews ·
 *   11 FAQ · 12 the old page's DIY guide · 13 the closing booking band.
 *
 * Section 6, "Before & After", is not here: "Add genuine Medusa
 * before-and-after images … when available. Do not use stock photographs" —
 * and none exists yet.
 *
 * The brief's mobile rules decided the hero: "Show FROM £180 above the fold.
 * Show OZONE INCLUDED above the fold. Show BOOK NOW and WHATSAPP immediately."
 * So on a phone the price, the ozone line and both buttons come straight after
 * the h1 and its subtitle, and the opening paragraphs follow them; from `lg`
 * the first paragraph moves back up, where there is room for it. "Put pricing
 * near the top of the page" — the four sizes are in the hero card and are the
 * band straight after it. "Make the disclaimer prominent but don't put it
 * above the service/pricing" — it is a full gold band of its own, after the
 * process. "Keep a sticky CTA visible" — `StickyBookBar`, BOOK NOW | WHATSAPP.
 *
 * Gold and ink alternate the whole way down (client, 2026-09-22: "pastikan
 * warna bg tetap selang seling"), with the prices on gold straight under the
 * header.
 *
 * The route wins over `app/[...slug]` because a static segment outranks a
 * catch-all, and the slug is in `CUSTOM_ROUTES` so only one page is built.
 */

const BOOK = VOMIT.book;
const WHATSAPP = VOMIT.whatsapp;
const SIZES = VOMIT.pricing.sizes;

export function generateMetadata(): Metadata {
  const { title, description } = VOMIT.seo;
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

export default function VomitCleaningPage() {
  const page = getPage(SLUG);
  if (!page) notFound();

  const guide = guideOf(page.sections);

  return (
    <>
      <JsonLd data={pageSchema(page)} />
      <JsonLd
        data={serviceSchema({
          slug: SLUG,
          name: VOMIT.finalCta.listTitle,
          serviceType: "Mobile car vomit cleaning",
          description: VOMIT.seo.description,
          areaServed: "London",
          image: PHOTOS.hero.src,
          offers: SIZES.map((s) => ({
            name: `${VOMIT.finalCta.listTitle} — ${s.name}`,
            price: s.price.replace(/[^\d.]/g, ""),
            currency: "GBP",
            description: `${VOMIT.pricing.examplesLabel} ${s.examples}`,
          })),
        })}
      />
      <JsonLd data={faqPageSchema(VOMIT.faq.items)} />
      <TrackClicks />

      <Header />
      <main className="flex-1">
        <Hero />
        <Prices />
        <Included />
        <Process />
        <Ozone />
        <Disclaimer />
        <Severe />
        <WhyMedusa />
        <Testimonials onGold={false} title={VOMIT.reviews.heading} footer={<ReviewsFooter />} />
        <Faq />
        <Guide guide={guide} />
        <FinalCta />
      </main>
      <Footer />

      {/* "Sticky Mobile Bar — BOOK NOW | WHATSAPP". */}
      <StickyBookBar
        primary={{ label: "Book Now", href: BOOK, track: EVENTS.bookVomit }}
        secondary={{ label: "WhatsApp", href: WHATSAPP, icon: "whatsapp", external: true }}
        after="vomit-hero-actions"
        hideOver={["vomit-final"]}
      />
    </>
  );
}

/* ── Shared pieces ──────────────────────────────────────────────────────── */

function BookButton({
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
      href={BOOK}
      data-track={EVENTS.bookVomit}
      className={`btn ${tone === "gold" ? "btn-gold" : "btn-dark"} min-h-[52px] rounded-full px-5 text-center text-[14px] sm:px-7 sm:text-[15px] sm:whitespace-nowrap ${className}`}
    >
      {label}
      <Icon name="arrow" size={18} className="ml-2.5 shrink-0" />
    </a>
  );
}

/** "Telephone/WhatsApp actions should open the relevant application." */
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

/* The brief gives most sections a name and then a heading — "WHY WE INCLUDE
   OZONE TREATMENT" over "Cleaning the Visible Stain Isn't Always Enough". The
   name is the h2, as on the WHEELUV page; the heading is the line under it,
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

function Prose({
  children,
  html,
  onGold,
  className = "",
}: {
  children?: React.ReactNode;
  /** Copy the brief sets partly in bold. */
  html?: string;
  onGold?: boolean;
  className?: string;
}) {
  const cls = `measure mt-4 text-[16px] leading-[27px] font-normal ${
    onGold ? "text-ink/80 [&_strong]:font-semibold [&_strong]:text-ink" : "text-body [&_strong]:font-semibold [&_strong]:text-white"
  } ${className}`;
  return html ? <p className={cls} dangerouslySetInnerHTML={{ __html: html }} /> : <p className={cls}>{children}</p>;
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

/* ── 1. Hero ──────────────────────────────────────────────────────────────
   On a phone: h1, subtitle, the price and the ozone line, both buttons, the
   six ticks — then the paragraphs. Laid out as a flex column with `order`,
   so the first paragraph can sit above the price from `lg` without being in
   the page twice. */

function Hero() {
  const h = VOMIT.hero;
  const [lead, ...rest] = h.intro;
  /* "FROM £180", set as a label and a number. */
  const [fromLabel, fromPrice] = h.from.split(/\s+(?=£)/);
  const ozoneTick = h.ticks.find((t) => /ozone/i.test(t));

  return (
    <section className="cut-bottom relative w-full overflow-hidden bg-ink-panel pt-[132px] pb-[calc(var(--cut)+2.75rem)] lg:pt-[158px] lg:pb-[calc(var(--cut)+4rem)]">
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
          <div className="flex flex-col lg:col-span-7">
            <Reveal className="order-1 hidden sm:block">
              <span className="hero-rule speed-rule" aria-hidden />
            </Reveal>

            <Reveal delay={1} className="order-1">
              <h1 className="max-w-[18ch] text-[clamp(31px,4.4vw,60px)] leading-[1.0] text-white sm:mt-7 lg:mt-6">
                {h.h1}
              </h1>
            </Reveal>

            <Reveal delay={2} className="order-2">
              <h2 className="mt-4 max-w-[40ch] font-[family-name:var(--font-sub)] text-[16.5px] leading-[1.3] font-semibold tracking-[0.03em] text-gold sm:text-[19px] xl:mt-5 xl:text-[21px]">
                {h.title}
              </h2>
            </Reveal>

            <Reveal delay={3} className="order-6 lg:order-3">
              <p className="mt-7 max-w-[56ch] text-[16px] leading-[26px] font-normal text-white/85 lg:mt-5 xl:text-[18px] xl:leading-[29px]">
                {lead}
              </p>
            </Reveal>

            {/* "FROM £180" and "OZONE INCLUDED", above the fold. */}
            <Reveal delay={3} className="order-3 lg:order-4">
              {/* Stacked below 400px: side by side, the two halves need 319px
                  and a 320px phone's column is 273 — the ozone line was cut
                  off at the card's edge. */}
              <div className="mt-6 inline-flex max-w-full flex-col items-stretch self-start overflow-hidden rounded-[14px] bg-white/[0.04] ring-1 ring-gold/35 min-[400px]:flex-row xl:mt-8">
                <p className="flex shrink-0 items-center gap-2 bg-gold/[0.1] px-4 py-3 sm:px-5">
                  <span className="font-[family-name:var(--font-ui)] text-[11.5px] tracking-[0.16em] text-white/70 uppercase">
                    {fromLabel}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[32px] leading-none text-gold sm:text-[36px]">
                    {fromPrice}
                  </span>
                </p>
                <p className="flex min-w-0 items-center gap-2.5 border-t border-gold/25 px-4 py-3 min-[400px]:border-t-0 min-[400px]:border-l font-[family-name:var(--font-ui)] text-[11.5px] leading-[15px] font-semibold tracking-[0.12em] text-white uppercase sm:px-5 sm:text-[12px] sm:tracking-[0.14em]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                    <Icon name="check" size={15} strokeWidth={2.8} />
                  </span>
                  {ozoneTick}
                </p>
              </div>
            </Reveal>

            <Reveal delay={4} className="order-4 lg:order-5">
              <div id="vomit-hero-actions" className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:mt-8">
                <BookButton label={h.bookLabel} className="w-full sm:w-auto" />
                <WhatsAppButton label={h.whatsappLabel} className="w-full sm:w-auto" />
              </div>
            </Reveal>

            <Reveal delay={5} className="order-5 lg:order-6">
              <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:gap-x-5 xl:mt-9">
                {h.ticks.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-2.5 font-[family-name:var(--font-ui)] text-[13px] leading-[18px] text-white/90 sm:text-[13.5px]"
                  >
                    <span className="mt-px">
                      <Tick size={18} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* The photograph, with the four sizes under it — each jumps to its
              card in the price band. */}
          <Reveal delay={4} className="lg:col-span-5">
            <figure className="surface relative overflow-hidden">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={PHOTOS.hero.src}
                  alt={PHOTOS.hero.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className="object-cover object-[50%_45%]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(13,13,13,0.9),transparent)]"
                />
              </div>
              <p className="px-5 pt-4 font-[family-name:var(--font-ui)] text-[11px] tracking-[0.18em] text-white/60 uppercase sm:px-6">
                {VOMIT.finalCta.listTitle}
              </p>
              <ul className="mt-3 grid grid-cols-2 border-t border-white/[0.08] sm:grid-cols-4">
                {SIZES.map((s, i) => (
                  <li
                    key={s.name}
                    className={`border-white/[0.08] ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} ${
                      i === 2 ? "sm:border-l" : ""
                    }`}
                  >
                    <a
                      href={`#${sizeId(s.name)}`}
                      className="flex h-full flex-col px-4 py-3.5 transition-colors hover:bg-white/[0.03] sm:px-5"
                    >
                      <span className="font-[family-name:var(--font-ui)] text-[10.5px] tracking-[0.14em] text-white/60 uppercase">
                        {s.name}
                      </span>
                      <span className="mt-1.5 font-[family-name:var(--font-display)] text-[28px] leading-none text-gold">
                        {s.price}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={5}>
          <div className="mt-10 grid gap-4 border-t border-white/10 pt-7 md:grid-cols-2 md:gap-10 lg:mt-12">
            {rest.map((p) => (
              <p key={p} className="text-[15px] leading-[25px] font-normal text-white/65">
                {p}
              </p>
            ))}
            <p
              className="text-[15px] leading-[25px] font-normal text-white/65 [&_strong]:font-semibold [&_strong]:text-white"
              dangerouslySetInnerHTML={{ __html: h.serviceHtml }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const sizeId = (name: string) => `size-${name.toLowerCase().replace(/\s+/g, "-")}`;

/* ── 2. Prices ─────────────────────────────────────────────────────────────
   Four sizes, each with its own BOOK NOW, and the brief's pricing note under
   them as the one dark panel on the band — it is the reason to send photos,
   so its WhatsApp button sits beside it. */

function Prices() {
  const p = VOMIT.pricing;
  return (
    <section id="prices" className="w-full scroll-mt-24 bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <SectionHead title={p.heading} lede={p.lead} tone="gold" />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
          {p.sizes.map((s, i) => (
            <Reveal
              as="li"
              key={s.name}
              delay={i}
              className="surface-on-gold group relative flex flex-col overflow-hidden p-6 sm:p-7"
            >
              <article id={sizeId(s.name)} className="flex flex-1 scroll-mt-32 flex-col">
                {/* Name and price on one line while a card has the width for
                    both; stacked in the four-across row, where "SMALL CAR"
                    beside £180 broke onto two lines. */}
                <div className="flex items-end justify-between gap-4 lg:flex-col lg:items-start lg:gap-3">
                  <h3 className="font-[family-name:var(--font-sub)] text-[21px] leading-[1.05] tracking-[0.03em] text-white uppercase">
                    {s.name}
                  </h3>
                  <p className="shrink-0 font-[family-name:var(--font-display)] text-[46px] leading-[0.85] whitespace-nowrap text-gold lg:text-[44px] xl:text-[54px]">
                    {s.price}
                  </p>
                </div>
                <span aria-hidden className="my-5 block h-px w-full bg-white/[0.08]" />
                <p className="text-[14.5px] leading-[23px] font-normal text-white/75">
                  <span className="mr-1.5 font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">
                    {p.examplesLabel}
                  </span>
                  {s.examples}
                </p>
                <div className="mt-auto pt-6">
                  <BookButton label={p.bookLabel} className="w-full" />
                </div>
              </article>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={1}>
          <div className="mt-6 flex flex-col gap-6 rounded-[14px] bg-ink p-6 sm:p-8 lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-10">
            <div className="flex flex-col gap-4 sm:flex-row">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/35">
                <Icon name="info" size={21} />
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.03em] text-white uppercase sm:pt-2 sm:text-[22px]">
                  {p.note.title}
                </h3>
                {p.note.body.map((line, i) => (
                  <p
                    key={line}
                    className={`mt-2 max-w-[72ch] text-[15px] leading-[24px] font-normal ${
                      i === 0 ? "text-white/90" : "text-white/70"
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <WhatsAppButton label={p.note.whatsappLabel} className="w-full shrink-0 lg:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 3. What's included? ───────────────────────────────────────────────── */

function Included() {
  const s = VOMIT.included;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHead title={s.heading} />
          <Kicker>{s.title}</Kicker>
          <Reveal delay={3}>
            <Prose>{s.lead}</Prose>
            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {s.ticks.map((t) => {
                const strong = t === s.strong;
                return (
                  <li
                    key={t}
                    className={`flex gap-3 text-[15.5px] leading-[24px] ${
                      strong ? "font-semibold text-white" : "font-normal text-white/85"
                    }`}
                  >
                    <span className="mt-[2px]">
                      <Tick />
                    </span>
                    {t}
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 flex gap-3 rounded-[10px] bg-white/[0.04] px-4 py-3.5 text-[14.5px] leading-[22px] font-normal text-white/75 ring-1 ring-white/[0.06]">
              <Icon name="info" size={18} className="mt-[2px] shrink-0 text-gold" />
              {s.after}
            </p>
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-6">
          <figure className="relative overflow-hidden rounded-[14px] ring-1 ring-white/[0.08]">
            <div className="relative aspect-[3/2] w-full lg:aspect-[4/3.4]">
              <Image
                src={PHOTOS.extraction.src}
                alt={PHOTOS.extraction.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="object-cover object-[40%_50%]"
              />
            </div>
            <figcaption className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full bg-ink/85 py-2 pr-4 pl-2.5 font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.14em] text-white uppercase ring-1 ring-white/10 backdrop-blur-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-ink">
                <Icon name="droplet" size={15} strokeWidth={2} />
              </span>
              {VOMIT.hero.ticks[1]}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 4. The eight steps ────────────────────────────────────────────────────
   "Keep the 8-step process visually easy to scan." One numbered rail: the
   number and the step's name lead every row, so the eye can run down the
   eight names before reading any of them. Step 7 is the one the brief writes
   a heading inside, and the one the page sells on, so its body is the band's
   one dark panel. The section's own copy and the photograph hold still
   beside the rail from `lg`. */

function Process() {
  const s = VOMIT.process;
  return (
    <section id="process" className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.title}</Kicker>
            <Reveal delay={3}>
              {s.intro.map((p) => (
                <Prose key={p} onGold>
                  {p}
                </Prose>
              ))}
            </Reveal>
            <Reveal delay={4}>
              <figure className="relative mt-8 overflow-hidden rounded-[14px] ring-1 ring-ink/15">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={PHOTOS.process.src}
                    alt={PHOTOS.process.alt}
                    fill
                    sizes="(min-width: 1024px) 36vw, 92vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {s.steps.map((step, i) => (
            <ProcessStep key={step.title} step={step} n={i + 1} last={i === s.steps.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProcessStep({ step, n, last }: { step: Step; n: number; last: boolean }) {
  return (
    <Reveal as="li" delay={n % 3} className={`relative flex gap-4 sm:gap-6 ${last ? "" : "pb-9 sm:pb-10"}`}>
      {!last && <span aria-hidden className="absolute top-14 bottom-1 left-[23px] w-[2px] rounded-full bg-ink/15" />}
      <span
        aria-hidden
        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-[22px] leading-none ${
          step.inner ? "bg-ink text-gold shadow-[0_0_0_6px_rgba(0,0,0,0.12)]" : "bg-ink text-gold"
        }`}
      >
        {n}
      </span>
      <div className="min-w-0 flex-1 pt-1">
        <p className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.2em] text-ink/60 uppercase">
          Step {n}
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-sub)] text-[21px] leading-tight tracking-[0.02em] text-ink uppercase sm:text-[23px]">
          {step.title}
        </h3>
        {step.body.map((p) => (
          <p key={p} className="mt-2.5 max-w-[62ch] text-[15.5px] leading-[25px] font-normal text-ink/80">
            {p}
          </p>
        ))}
        {step.inner && (
          <div className="mt-4 rounded-[14px] bg-ink p-6 sm:p-7">
            <h4 className="flex items-center gap-2.5 font-[family-name:var(--font-sub)] text-[18px] leading-tight tracking-[0.03em] text-gold uppercase sm:text-[20px]">
              <Icon name="spark" size={20} className="shrink-0" />
              {step.inner.title}
            </h4>
            {step.inner.body.map((p) => (
              <p key={p} className="mt-3 text-[15px] leading-[24px] font-normal text-white/80">
                {p}
              </p>
            ))}
            <p className="mt-5 border-l-2 border-gold pl-4 text-[15.5px] leading-[24px] font-semibold text-white">
              {step.inner.emphasis}
            </p>
          </div>
        )}
      </div>
    </Reveal>
  );
}

/* ── 5. Why we include ozone treatment ─────────────────────────────────────
   The brief's order — REMOVE → DEEP CLEAN → EXTRACT → TREAT → OZONE →
   VENTILATE — is the section's picture: six stages in one line from `lg`,
   ozone the only gold one, so "physical cleaning comes first" is visible
   before it is read. There is no ozone photograph to use; this is better
   than a borrowed one. */

function Ozone() {
  const o = VOMIT.ozone;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={o.heading} />
            <Kicker>{o.title}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-5">
            {o.body.map((p) => (
              <Prose key={p} className="lg:mt-2 lg:first:mt-0">
                {p}
              </Prose>
            ))}
          </Reveal>
        </div>

        <Reveal delay={2}>
          <div className="surface relative mt-12 overflow-hidden p-6 sm:p-8 lg:p-10">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: "radial-gradient(50% 80% at 72% 100%, rgba(193,146,49,0.12) 0%, transparent 70%)",
              }}
            />
            <div className="relative grid gap-5 lg:grid-cols-2 lg:gap-12">
              <p
                className="font-[family-name:var(--font-sub)] text-[20px] leading-[1.3] font-normal tracking-[0.01em] text-white/85 sm:text-[22px] [&_strong]:font-semibold [&_strong]:text-gold"
                dangerouslySetInnerHTML={{ __html: o.standardHtml }}
              />
              <p className="text-[16px] leading-[27px] font-normal text-body lg:pt-1">{o.notJust}</p>
            </div>

            <p className="relative mt-9 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.2em] text-gold uppercase">
              {o.orderLead}
            </p>
            <ol className="relative mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
              {o.flow.map((stage, i) => {
                const gold = /ozone/i.test(stage);
                const last = i === o.flow.length - 1;
                return (
                  <li
                    key={stage}
                    className={`relative flex min-h-[86px] flex-col justify-between rounded-[12px] px-4 py-3.5 ${
                      gold
                        ? "bg-gold text-ink shadow-[0_18px_40px_-20px_rgba(193,146,49,0.8)]"
                        : "bg-white/[0.04] text-white ring-1 ring-white/[0.09]"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span
                        className={`font-[family-name:var(--font-display)] text-[20px] leading-none ${
                          gold ? "text-ink/70" : "text-gold"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {!last && (
                        <Icon name="arrow" size={16} className={gold ? "text-ink/60" : "text-white/35"} />
                      )}
                    </span>
                    <span className="mt-3 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.04em] uppercase">
                      {stage}
                    </span>
                  </li>
                );
              })}
            </ol>

            <p className="relative mt-6 max-w-[80ch] text-[15.5px] leading-[25px] font-normal text-white/75">
              {o.after}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 7. The disclaimer ─────────────────────────────────────────────────────
   "The most important placement is Section 7 … I wouldn't put the disclaimer
   right at the top … But I also wouldn't bury it in the FAQs." So it is a full
   band of its own, after the process has been explained: the headline
   statement first, the eleven factors in one panel beside it, the three
   specific limits as cards, and the acknowledgement last, set as the band's
   strongest line. */

const NOTE_ICONS: Record<string, IconName> = {
  "Ozone Treatment": "spark",
  "Inaccessible Contamination": "info",
  "Cabin/Pollen Filter": "layers",
};

function Disclaimer() {
  const d = VOMIT.disclaimer;
  return (
    <section id="disclaimer" className="w-full scroll-mt-24 bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHead title={d.heading} tone="gold" />
            <Kicker onGold>{d.title}</Kicker>
            <Reveal delay={3}>
              <p
                className="mt-5 text-[17px] leading-[28px] font-normal text-ink/85 [&_strong]:font-semibold [&_strong]:text-ink"
                dangerouslySetInnerHTML={{ __html: d.leadHtml }}
              />
              <Prose onGold>{d.effort}</Prose>
              <Prose onGold html={d.paymentHtml} />
            </Reveal>
          </div>

          <Reveal delay={2} className="lg:col-span-7">
            <div className="surface-on-gold p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/35">
                  <Icon name="info" size={20} />
                </span>
                <h3 className="text-[16px] leading-[23px] font-semibold text-white">{d.factorsLead}</h3>
              </div>
              <ul className="mt-6 grid sm:grid-cols-2 sm:gap-x-8">
                {d.factors.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 border-b border-white/[0.06] py-2.5 text-[14.5px] leading-[21px] font-normal text-white/80"
                  >
                    <span aria-hidden className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <ul className="mt-6 grid gap-4 lg:mt-8 lg:grid-cols-3 lg:gap-5">
          {d.notes.map((n, i) => (
            <Reveal as="li" key={n.title} delay={i} className="surface-on-gold p-6 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/12 text-gold ring-1 ring-gold/35">
                <Icon name={NOTE_ICONS[n.title] ?? "info"} size={20} />
              </span>
              <h3 className="mt-5 font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.03em] text-white uppercase">
                {n.title}
              </h3>
              {n.bodyHtml.map((html) => (
                <p
                  key={html}
                  className="mt-3 text-[14.5px] leading-[23px] font-normal text-white/75 [&_strong]:font-semibold [&_strong]:text-white"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ))}
            </Reveal>
          ))}
        </ul>

        <Reveal delay={1}>
          <div className="mt-6 flex flex-col gap-4 rounded-[14px] bg-ink p-6 ring-1 ring-gold/40 sm:flex-row sm:gap-6 sm:p-8 lg:mt-8 lg:p-10">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
              <Icon name="shield" size={24} />
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.22em] text-gold uppercase">
                {d.acknowledgement.title}
              </h3>
              <p className="mt-2.5 max-w-[86ch] text-[16.5px] leading-[27px] font-semibold text-white sm:text-[17.5px] sm:leading-[29px]">
                {d.acknowledgement.body}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 8. Severe or widespread contamination ─────────────────────────────── */

function Severe() {
  const s = VOMIT.severe;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHead title={s.heading} />
          <Kicker>{s.title}</Kicker>
          <Reveal delay={3}>
            <p className="mt-5 text-[18px] leading-[28px] font-semibold text-white">{s.lead}</p>
            <Prose>{s.after}</Prose>
          </Reveal>
          <Reveal delay={4}>
            <WhatsAppButton label={s.whatsappLabel} className="mt-8 w-full sm:w-auto" />
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-6">
          <div className="surface p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/35">
                <Icon name="camera" size={20} />
              </span>
              <h3 className="font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.2em] text-gold uppercase">
                {s.listLead}
              </h3>
            </div>
            <ul className="mt-5">
              {s.list.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-white/[0.06] py-3 text-[15px] leading-[22px] font-normal text-white/85 last:border-b-0"
                >
                  <Icon name="plus" size={16} strokeWidth={2.2} className="mt-[3px] shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 9. Why choose Medusa? ─────────────────────────────────────────────── */

function WhyMedusa() {
  const w = VOMIT.why;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionHead title={w.heading} tone="gold" />
            <Kicker onGold>{w.title}</Kicker>
          </div>
          <Reveal delay={3} className="w-full sm:w-auto">
            <BookButton label={w.bookLabel} tone="dark" className="w-full sm:w-auto" />
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {w.items.map((it, i) => (
            <Reveal
              as="li"
              key={it.title}
              delay={i % 3}
              className="surface-on-gold group relative overflow-hidden p-6 sm:p-7"
            >
              {/* Beside its title on a phone, where six cards stack; above it
                  from `sm`, where they sit in a grid. */}
              <div className="flex items-center gap-4 sm:block">
                <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold ring-1 ring-gold/35 sm:h-[52px] sm:w-[52px]">
                  <Icon name={it.icon as IconName} size={22} />
                </span>
                <h3 className="font-[family-name:var(--font-sub)] text-[20px] leading-tight text-white uppercase sm:mt-6">
                  {it.title}
                </h3>
              </div>
              {it.body.map((p) => (
                <p key={p} className="mt-3 text-[15px] leading-[25px] font-normal text-white/75">
                  {p}
                </p>
              ))}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 10. Reviews — the rating line under the quotes ────────────────────── */

function ReviewsFooter() {
  const r = VOMIT.reviews;
  return (
    <div className="mt-8 flex flex-col gap-5 border-t border-white/[0.08] pt-7 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <span className="flex gap-1" aria-hidden>
          {Array.from({ length: 5 }).map((_, s) => (
            <Icon key={s} name="star" size={20} variant="solid" className="text-gold" />
          ))}
        </span>
        <p className="mt-2 font-[family-name:var(--font-sub)] text-[17px] tracking-[0.02em] text-white">
          <span className="sr-only">Five stars. </span>
          {r.rating}
        </p>
      </div>
      <a
        href={r.cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline min-h-[48px] w-full shrink-0 rounded-full px-6 text-[14px] sm:w-auto"
      >
        {r.cta.label}
        <Icon name="arrow" size={17} className="ml-2.5 shrink-0" />
      </a>
    </div>
  );
}

/* ── 11. FAQ ──────────────────────────────────────────────────────────────
   "Use an FAQ accordion." */

function Faq() {
  const f = VOMIT.faq;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHead title={f.heading} tone="gold" />
          </div>
        </div>
        <div className="lg:col-span-8">
          <FaqAccordion items={f.items} onGold />
        </div>
      </div>
    </section>
  );
}

/* ── 12. The old page's DIY guide ──────────────────────────────────────────
   "Do not allow the DIY guide to dominate the top of the page." It is at the
   foot of it, and folded: four native disclosures, closed, one per row of
   the old page. Every word is still in the served HTML — a disclosure hides
   its body from the eye, not from a crawler — and it costs a reader four
   lines until they open one. */

type GuideTopic = { title: string; blocks: Block[] };

/** The guide rows `content/overrides.ts` carried over, found by their own headings. */
function guideOf(sections: Section[]): { intro: Block[]; topics: GuideTopic[] } {
  const opening = (s: Section) => {
    const b = s.blocks[0];
    return b?.type === "heading" ? b.text : undefined;
  };
  const find = (title: string) => {
    const section = sections.find((s) => opening(s) === title);
    if (!section) throw new Error(`vomit cleaning page: the guide has lost its "${title}" row`);
    return section.blocks.slice(1);
  };
  return {
    intro: find(GUIDE.heading),
    topics: GUIDE.topics.map((title) => ({ title, blocks: find(title) })),
  };
}

function Guide({ guide }: { guide: ReturnType<typeof guideOf> }) {
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead title={GUIDE.heading} />
            <Reveal delay={3}>
              {guide.intro.map((b, i) =>
                b.type === "paragraph" ? <Prose key={i} html={b.html} /> : null,
              )}
            </Reveal>
          </div>
        </div>

        <ul className="flex flex-col gap-3 lg:col-span-7 lg:pt-[18px]">
          {guide.topics.map((topic, i) => (
            <Reveal as="li" key={topic.title} delay={i}>
              <details className="group rounded-[12px] bg-white/[0.03] ring-1 ring-white/[0.07] transition-colors open:bg-white/[0.05] open:ring-gold/30">
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-[family-name:var(--font-display)] text-[22px] leading-none text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex-1 text-[16.5px] leading-[24px] font-semibold text-white transition-colors group-hover:text-gold lg:text-[17.5px]">
                    {topic.title}
                  </h3>
                  <span className="shrink-0 text-gold transition-transform duration-300 group-open:rotate-45">
                    <Icon name="plus" size={18} strokeWidth={2} />
                  </span>
                </summary>
                <div className="px-5 pb-6 sm:px-6 sm:pb-7">
                  <GuideBlocks blocks={topic.blocks} />
                </div>
              </details>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

const GUIDE_TEXT = "[&_strong]:font-semibold [&_strong]:text-white";

function GuideBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "heading") {
          return (
            <h4
              key={i}
              className="mt-6 font-[family-name:var(--font-sub)] text-[17px] tracking-[0.04em] text-gold uppercase first:mt-1"
            >
              {b.text}
            </h4>
          );
        }
        if (b.type === "paragraph") {
          return (
            <p
              key={i}
              className={`measure mt-4 text-[15px] leading-[25px] font-normal text-body first:mt-1 ${GUIDE_TEXT}`}
              dangerouslySetInnerHTML={{ __html: b.html }}
            />
          );
        }
        if (b.type === "list") {
          return (
            <ul key={i} className="mt-3 grid gap-3">
              {b.items.map((html, j) => (
                <GuideItem key={j} html={html} />
              ))}
            </ul>
          );
        }
        return null;
      })}
    </>
  );
}

/**
 * One item of the guide's lists, as the mirror wrote it: a bold label and
 * then either a `<br>` and a sentence, or — twice — a run of `<li>`s sitting
 * straight inside the item. Those are set as the sub-list they mean to be
 * rather than as list items with no list around them.
 */
function GuideItem({ html }: { html: string }) {
  const m = html.match(/^\s*<strong>([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?\s*([\s\S]*)$/i);
  if (!m) {
    return (
      <li
        className={`text-[15px] leading-[24px] font-normal text-white/80 ${GUIDE_TEXT}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  const [, label, rest] = m;
  const subs = [...rest.matchAll(/<li>([\s\S]*?)<\/li>/gi)].map((x) => x[1]);
  return (
    <li className="flex gap-3">
      <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
      <div className="min-w-0">
        <p className="text-[15px] leading-[24px] font-semibold text-white" dangerouslySetInnerHTML={{ __html: label }} />
        {subs.length ? (
          <ul className="mt-1.5 grid gap-1.5">
            {subs.map((s, k) => (
              <li
                key={k}
                className={`text-[14.5px] leading-[23px] font-normal text-white/75 ${GUIDE_TEXT}`}
                dangerouslySetInnerHTML={{ __html: s }}
              />
            ))}
          </ul>
        ) : (
          <p
            className={`mt-0.5 text-[14.5px] leading-[23px] font-normal text-white/75 ${GUIDE_TEXT}`}
            dangerouslySetInnerHTML={{ __html: rest }}
          />
        )}
      </div>
    </li>
  );
}

/* ── 13. Final CTA ─────────────────────────────────────────────────────────
   The brief's closing price list beside its two buttons. The sticky bar
   steps aside while this is on screen; the band carries the same two. */

function FinalCta() {
  const f = VOMIT.finalCta;
  return (
    <section
      id="vomit-final"
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
            <p className="mt-6 text-[19px] leading-[29px] font-semibold text-white">{f.body[0]}</p>
            <p className="measure mt-3 text-[16px] leading-[27px] font-normal text-body">{f.body[1]}</p>
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
            <p className="px-6 pt-6 font-[family-name:var(--font-sub)] text-[19px] tracking-[0.03em] text-white uppercase sm:px-7">
              {f.listTitle}
            </p>
            <ul className="mt-4 divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {SIZES.map((s) => (
                <li key={s.name}>
                  <a
                    href={`#${sizeId(s.name)}`}
                    className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-white/[0.03] sm:px-7"
                  >
                    <span className="font-[family-name:var(--font-ui)] text-[13px] font-semibold tracking-[0.16em] text-white/85 uppercase">
                      {s.name}
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-[30px] leading-none text-gold">
                      {s.price}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-2.5 bg-gold/[0.08] px-6 py-4 font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.18em] text-gold uppercase sm:px-7">
              <Icon name="check" size={16} strokeWidth={2.6} className="shrink-0" />
              {f.ozone}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
