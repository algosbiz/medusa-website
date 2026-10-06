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
import { ServiceCards } from "@/components/ServiceCards";
import StickyBookBar from "@/components/StickyBookBar";
import TrackClicks from "@/components/TrackClicks";
import WheelCheckForm from "@/components/WheelCheckForm";
import Testimonials from "@/components/sections/Testimonials";
import { AWP, COLOURS, FORM_ANCHOR, PATH, PHOTOS, SLUG } from "@/lib/alloy-wheel-protection";
import { type Block, getPage } from "@/lib/blocks";
import type { HubCard } from "@/lib/hub";
import { faqPageSchema, pageSchema, serviceSchema } from "@/lib/schema";
import { cardsForSlugs } from "@/lib/service-cards";
import { EVENTS } from "@/lib/track";

/**
 * Alloy Wheel Protection — the WHEELUV™ page, rebuilt from the client's brief.
 *
 * Client, 2026-10-06: "This page is not alloy wheel cleaning its alloy wheel
 * protectors. It should be under the detailing section", and then 47 pages of
 * what it should be instead — a new URL with a 301 from the old one, a new
 * menu label, twenty-three sections of copy, a dedicated suitability form,
 * Service and FAQPage schema and a sticky booking bar on phones. Every word
 * is in `lib/alloy-wheel-protection.ts`; this file is only layout.
 *
 * **The order is the brief's "Elementor page structure"**, its eighteen
 * blocks top to bottom, with the five numbered sections that list does not
 * place set beside the ones they explain: run-flat tyres and tyre changes
 * with how the protector is fitted, and existing damage, recent
 * refurbishment and "can it hide kerb damage?" with the suitability form.
 *
 * Gold and ink alternate the whole way down (client, 2026-09-22: "pastikan
 * warna bg tetap selang seling"). The form lands on ink, where every other
 * enquiry form on the site sits, and the "does not protect against" list on
 * gold, where the brief wants it seen: "Put this visibly on the page. Do not
 * bury it in Terms & Conditions."
 *
 * The route wins over `app/[...slug]` because a static segment outranks a
 * catch-all, and the slug is in `CUSTOM_ROUTES` so only one page is built.
 */

const BOOK = AWP.book;
const CHECK = `#${FORM_ANCHOR}`;

export function generateMetadata(): Metadata {
  const { title, description } = AWP.seo;
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

export default function AlloyWheelProtectionPage() {
  const page = getPage(SLUG);
  if (!page) notFound();

  const crossSell = cardsForSlugs(
    AWP.newCar.complements.map((c) => c.href.replace(/^\//, "")),
    SLUG,
  ).map((card) => ({ ...card, blurbHtml: standfirst(card.slug) ?? card.blurbHtml }));

  return (
    <>
      <JsonLd data={pageSchema(page)} />
      <JsonLd
        data={serviceSchema({
          slug: SLUG,
          name: "Alloy Wheel Protection",
          serviceType: "Alloy wheel protector installation",
          description: AWP.seo.description,
          brand: "WHEELUV",
          areaServed: "London",
          image: PHOTOS.hero.src,
          offer: { price: "159", currency: "GBP", description: AWP.price.inclusions },
        })}
      />
      <JsonLd data={faqPageSchema(AWP.faq.items)} />
      <TrackClicks />

      <Header />
      <main className="flex-1">
        <Hero />
        <WhatAre />
        <WhyProtect />
        <HowItWorks />
        <Installation />
        <DiamondCut />
        <Protection />
        <Colours />
        <Price />
        <NewCar cards={crossSell} />
        <Gallery />
        <WhyMedusa />
        <Testimonials />
        <Compatibility />
        <Faq />
        <Important />
        <FinalCta />
      </main>
      <Footer />

      <StickyBookBar
        primary={{ label: `Book ${AWP.price.price}`, href: BOOK, track: EVENTS.book }}
        secondary={{ label: "Check Fitment", href: CHECK, track: EVENTS.check }}
        after="awp-hero-actions"
        hideOver={[FORM_ANCHOR, "awp-final"]}
      />
    </>
  );
}

/**
 * What a cross-sold page says first about itself: the first prose after its
 * h1, whether it wrote that as a paragraph or as an h5 standfirst.
 *
 * The ordinary card takes the first *paragraph*, which on
 * `/car-detailing/new-car-protection` is a "💡 Pro Tip" about the Car Lovers
 * Club — that page writes its own introduction as three h5s, and a card for
 * it beside the alloy wheel copy read as an advert for something else. Only
 * these two cards use this; every other card on the site is unchanged.
 */
function standfirst(slug: string): string | undefined {
  const page = getPage(slug);
  if (!page) return undefined;
  const blocks: Block[] = [];
  const walk = (list: Block[]) =>
    list.forEach((b) => (b.type === "columns" ? b.cols.forEach(walk) : blocks.push(b)));
  page.sections.forEach((s) => walk(s.blocks));
  const prose = (b: Block) =>
    b.type === "paragraph" ? b.html : b.type === "heading" && b.level === 5 ? b.text : "";
  const first = blocks
    .slice(1)
    .map(prose)
    .find((html) => html.replace(/<[^>]+>/g, "").trim().length >= 60);
  return first;
}

/* ── Shared pieces ────────────────────────────────────────────────────────
   The brief gives most sections a name and then a heading — "WHAT ARE ALLOY
   WHEEL PROTECTORS?" over "A Sacrificial Barrier for the Edge of Your
   Wheels". The name is the h2, because it is the one written as a search
   query; the heading is the line under it, in the condensed face. */

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
  onGold,
  className = "",
}: {
  children: React.ReactNode;
  onGold?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`measure mt-4 text-[16px] leading-[27px] font-normal ${
        onGold ? "text-ink/80" : "text-body"
      } ${className}`}
    >
      {children}
    </p>
  );
}

function Ticks({
  items,
  onGold,
  cols = false,
  className = "",
}: {
  items: readonly string[];
  onGold?: boolean;
  cols?: boolean;
  className?: string;
}) {
  return (
    <ul className={`mt-5 grid gap-x-6 gap-y-3 ${cols ? "sm:grid-cols-2" : ""} ${className}`}>
      {items.map((t) => (
        <li
          key={t}
          className={`flex gap-3 text-[15.5px] leading-[24px] font-normal ${onGold ? "text-ink/85" : "text-white/85"}`}
        >
          <span
            className={`mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              onGold ? "bg-ink text-gold" : "bg-gold/15 text-gold"
            }`}
          >
            <Icon name="check" size={12} strokeWidth={2.8} />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

/** The list the brief writes as bullets, set as chips so eight short nouns do not run a column 300px deep. */
function Chips({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`mt-4 flex flex-wrap gap-2 ${className}`}>
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full bg-white/[0.05] px-3.5 py-1.5 text-[14px] leading-[20px] font-normal text-white/85 ring-1 ring-white/[0.08]"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/** The brief's "IMPORTANT" boxes. On gold the box goes solid ink. */
function ImportantNote({ lines, onGold }: { lines: readonly string[]; onGold?: boolean }) {
  return (
    <Reveal delay={3}>
      <div
        className={`mt-8 flex gap-4 rounded-[12px] p-5 ${
          onGold ? "bg-ink" : "bg-gold/[0.07] ring-1 ring-gold/35"
        }`}
      >
        <Icon name="info" size={22} className="mt-0.5 shrink-0 text-gold" />
        <div>
          <p className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
            Important
          </p>
          {lines.map((l) => (
            <p key={l} className="mt-1.5 text-[15px] leading-[24px] font-normal text-white/80">
              {l}
            </p>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

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
      data-track={EVENTS.book}
      className={`btn ${tone === "gold" ? "btn-gold" : "btn-dark"} min-h-[52px] rounded-full text-center text-[15px] ${className}`}
    >
      {label}
      <Icon name="arrow" size={18} className="ml-2.5" />
    </a>
  );
}

function CheckButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <a
      href={CHECK}
      data-track={EVENTS.check}
      className={`btn btn-outline min-h-[52px] rounded-full text-[15px] ${className}`}
    >
      {label}
    </a>
  );
}

/* ── 1. Hero ──────────────────────────────────────────────────────────────
   "Immediately show: ALLOY WHEEL PROTECTION LONDON / WHEELUV™ PROFESSIONAL
   INSTALLATION / £159 / KERB PROTECTION • DISCREET FIT • PROFESSIONAL
   INSTALLATION / [BOOK NOW] [CHECK COMPATIBILITY]". The installation photo is
   framed inside the offer card rather than stretched behind the h1: it is a
   600px original, and the card is the size it reads well at.

   Behind it, the band carries a full-width photograph the way every other
   service header does (`components/PageHero`, same wash): the client asked
   "ini emang gk ada background imagenya kah?" (2026-10-06) of the livery-only
   version. No installation photo is large enough to fill a 1900px band, so it
   is a detailing photograph the site already runs — see `PHOTOS.backdrop`. */

function Hero() {
  const { hero } = AWP;
  const { offer } = hero;

  return (
    <section className="cut-bottom relative flex w-full items-center overflow-hidden bg-ink-panel pt-[150px] pb-[calc(var(--cut)+3.5rem)] lg:min-h-[720px] lg:pt-[168px]">
      <Image
        src={PHOTOS.backdrop.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_72%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(78deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.82)_48%,rgba(0,0,0,0.58)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,rgba(0,0,0,0.85),transparent)]"
      />

      <div className="shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="hero-rule speed-rule" aria-hidden />
            </Reveal>

            <Reveal delay={1}>
              <h1 className="mt-7 max-w-[15ch] text-[clamp(32px,5vw,60px)] leading-[1.0] text-white">
                {hero.h1}
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-5 max-w-[34ch] font-[family-name:var(--font-sub)] text-[18px] leading-[1.3] font-semibold tracking-[0.03em] text-gold uppercase lg:text-[22px]">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={3}>
              {hero.intro.map((p) => (
                <p
                  key={p}
                  className="mt-4 max-w-[60ch] text-[16px] leading-[27px] font-normal text-white/80 lg:text-[17px] lg:leading-[28px]"
                >
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={4}>
              <div id="awp-hero-actions" className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <BookButton label={hero.bookLabel} />
                <CheckButton label={hero.checkLabel} />
              </div>
            </Reveal>

            <Reveal delay={5}>
              <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-[family-name:var(--font-ui)] text-[11.5px] tracking-[0.16em] text-white/65 uppercase">
                {hero.strap.map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    {i > 0 && (
                      <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
                    )}
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* The brief puts this under the offer; it sits here, beside it,
                so the hero's two buttons stay above the fold on a laptop. */}
            <Reveal delay={6}>
              <div className="mt-8 flex max-w-[60ch] gap-3 rounded-[10px] bg-white/[0.04] p-4 ring-1 ring-white/[0.07]">
                <Icon name="info" size={18} className="mt-0.5 shrink-0 text-gold" />
                <p className="text-[13.5px] leading-[21px] font-normal text-white/70">
                  <span className="mr-1.5 font-[family-name:var(--font-ui)] text-[10.5px] font-semibold tracking-[0.2em] text-gold uppercase">
                    Important
                  </span>
                  {hero.important}
                </p>
              </div>
            </Reveal>
          </div>

          {/* The offer: the brief's "WHEELUV™ ALLOY WHEEL PROTECTOR SET — £159
              PROFESSIONAL INSTALLATION" and its seven ticks. */}
          <Reveal delay={4} className="w-full lg:col-span-5 lg:justify-self-end">
            <div className="surface w-full max-w-[560px] overflow-hidden lg:max-w-[460px]">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={PHOTOS.hero.src}
                  alt={PHOTOS.hero.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(13,13,13,0.95),transparent)]"
                />
              </div>

              <div className="p-6 pt-4 sm:p-7 sm:pt-5 lg:p-8 lg:pt-5">
                <p className="font-[family-name:var(--font-ui)] text-[11px] tracking-[0.18em] text-white/60 uppercase">
                  {offer.name}
                </p>
                <p className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-[family-name:var(--font-display)] text-[48px] leading-none text-gold lg:text-[54px]">
                    {offer.price}
                  </span>
                  <span className="font-[family-name:var(--font-ui)] text-[12px] tracking-[0.14em] text-white/70 uppercase">
                    {offer.note}
                  </span>
                </p>

                <span aria-hidden className="my-6 block h-px w-full bg-white/10" />

                <ul className="grid gap-2.5">
                  {offer.ticks.map((t) => (
                    <li key={t} className="flex gap-3 text-[14.5px] leading-[22px] font-normal text-body">
                      <Icon name="check" size={16} strokeWidth={2.4} className="mt-[3px] shrink-0 text-gold" />
                      {t}
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 2. What are alloy wheel protectors? + the close-up ───────────────────
   "Immediately show what the protector actually looks like fitted. Many
   customers will not know what a rim protector is." The installation photo
   with the clearest rim, and one label on the rim. */

function WhatAre() {
  const w = AWP.whatAre;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHead title={w.heading} />
          <Kicker>{w.title}</Kicker>
          <Reveal delay={3}>
            <Prose>{w.lead}</Prose>
            <Prose>{w.misjudgementLead}</Prose>
            <Chips items={w.misjudgements} />
            <Prose>{w.misjudgementTail}</Prose>
            {w.body.map((p) => (
              <Prose key={p}>{p}</Prose>
            ))}
          </Reveal>

          <Reveal delay={4}>
            <div className="mt-9 flex flex-col gap-4 rounded-[14px] bg-gold/[0.07] p-5 ring-1 ring-gold/35 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <p className="font-[family-name:var(--font-sub)] text-[18px] leading-tight font-semibold tracking-[0.03em] text-white uppercase">
                {w.priceLine}
              </p>
              <BookButton label={w.bookLabel} className="w-full shrink-0 sm:w-auto" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-6">
          <figure className="relative overflow-hidden rounded-[14px] ring-1 ring-white/[0.08]">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={PHOTOS.closeUp.src}
                alt={PHOTOS.closeUp.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* On the rim, where the photograph's protector runs down the left
                of the wheel. */}
            <div aria-hidden className="absolute top-[58%] left-[10%] flex items-center">
              <span className="h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-gold ring-4 ring-gold/35" />
              <span className="h-px w-7 -translate-x-1.5 bg-gold sm:w-10" />
              <span className="-translate-x-1.5 rounded-full bg-ink/85 px-3 py-1.5 font-[family-name:var(--font-ui)] text-[10.5px] font-semibold tracking-[0.14em] whitespace-nowrap text-white uppercase ring-1 ring-gold/50 backdrop-blur-sm sm:text-[11.5px]">
                {AWP.howItWorks.layers[1]}
              </span>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 3. Why protect your alloy wheels? ─────────────────────────────────── */

function WhyProtect() {
  const w = AWP.whyProtect;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={w.heading} tone="gold" />
            <Kicker onGold>{w.title}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-5">
            {w.intro.map((p) => (
              <Prose key={p} onGold className="lg:mt-2 lg:first:mt-0">
                {p}
              </Prose>
            ))}
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {w.items.map((it, i) => (
            <Reveal
              as="li"
              key={it.title}
              delay={i}
              className="surface-on-gold group relative overflow-hidden p-7 lg:p-8"
            >
              <span aria-hidden className="block h-[3px] w-9 rounded-full bg-gold" />
              <h4 className="mt-5 font-[family-name:var(--font-sub)] text-[21px] leading-tight text-white uppercase">
                {it.title}
              </h4>
              <p className="mt-3 text-[15px] leading-[25px] font-normal text-white/75">{it.body}</p>
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

/* ── 4. How it works — with Sections 5, 13 and 14 ──────────────────────────
   "Use a simple visual cross-section if available. Do not create a
   misleading diagram suggesting the wheel can never contact the kerb." The
   diagram is the brief's own — WHEEL ↓ WHEELUV™ PROTECTOR ↓ KERB — drawn as
   three labelled layers, with the brief's warning beside it rather than
   under it. */

function LayerGlyph({ layer }: { layer: number }) {
  if (layer === 0)
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="20" cy="20" r="16" />
        <circle cx="20" cy="20" r="4" />
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} d="M20 16V6" transform={`rotate(${a} 20 20)`} />
        ))}
      </svg>
    );
  if (layer === 1)
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="5" strokeDasharray="56 200" strokeLinecap="round" transform="rotate(100 20 20)" />
      </svg>
    );
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 34h32M4 34V20h14v14M18 26h18" />
    </svg>
  );
}

function HowItWorks() {
  const h = AWP.howItWorks;
  const m = AWP.installedByMedusa;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHead title={h.heading} />
            <Kicker>{h.title}</Kicker>
            <Reveal delay={3}>
              {h.body.map((p) => (
                <Prose key={p}>{p}</Prose>
              ))}
              <Prose>{h.after}</Prose>
            </Reveal>
            <ImportantNote lines={h.important} />
          </div>

          <Reveal delay={2} className="lg:col-span-6">
            <div className="surface relative overflow-hidden p-7 sm:p-10">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 50%, rgba(193,146,49,0.12) 0%, transparent 70%)",
                }}
              />
              <ol className="relative mx-auto flex max-w-[380px] flex-col items-stretch">
                {h.layers.map((layer, i) => (
                  <li key={layer} className="flex flex-col items-center">
                    <div
                      className={`flex w-full items-center gap-5 rounded-[12px] px-6 py-5 ${
                        i === 1
                          ? "bg-gold text-ink shadow-[0_18px_40px_-20px_rgba(193,146,49,0.8)]"
                          : "bg-white/[0.04] text-white ring-1 ring-white/[0.09]"
                      }`}
                    >
                      <span className={i === 1 ? "text-ink" : "text-gold"}>
                        <LayerGlyph layer={i} />
                      </span>
                      <span className="font-[family-name:var(--font-sub)] text-[20px] leading-tight font-semibold tracking-[0.03em] uppercase">
                        {layer}
                      </span>
                    </div>
                    {i < h.layers.length - 1 && (
                      <Icon name="arrow" size={22} className="my-3 rotate-90 text-gold" />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        {/* Section 5, with 13 and 14 beside it: what the protector is
            designed to do, and the two questions every buyer asks about it. */}
        <div className="mt-16 grid gap-5 border-t border-white/[0.07] pt-16 lg:mt-24 lg:grid-cols-12 lg:gap-6 lg:pt-24">
          <Reveal as="article" className="surface p-7 sm:p-9 lg:col-span-7 lg:p-10">
            <span aria-hidden className="block h-[3px] w-[52px] rounded-full bg-gold" />
            <h2 className="mt-6 text-[26px] leading-[1.05] text-white sm:text-[30px]">{m.heading}</h2>
            <p className="mt-3 font-[family-name:var(--font-sub)] text-[18px] font-semibold tracking-[0.03em] text-gold uppercase lg:text-[20px]">
              {m.title}
            </p>
            <Prose>{m.intro}</Prose>
            <Prose>{m.lead}</Prose>
            <Ticks items={m.ticks} cols />
            <p className="mt-7 border-t border-white/[0.08] pt-5 text-[15px] leading-[25px] font-normal text-white/70">
              {m.closing}
            </p>
          </Reveal>

          <div className="grid gap-5 lg:col-span-5 lg:gap-6">
            {[AWP.runFlat, { ...AWP.tyreChanges, cta: undefined }].map((card, i) => (
              <Reveal as="article" key={card.heading} delay={i + 1} className="surface flex flex-col p-7 sm:p-8">
                <p className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
                  {card.heading}
                </p>
                <h3 className="mt-3 text-[21px] leading-snug font-semibold text-white">{card.title}</h3>
                {card.body.map((p) => (
                  <p key={p} className="mt-3 text-[15px] leading-[25px] font-normal text-body">
                    {p}
                  </p>
                ))}
                {card.cta && (
                  <a href={CHECK} data-track={EVENTS.check} className="link-inline mt-6 self-start text-gold">
                    {card.cta}
                    <Icon name="arrow" size={15} />
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 5. Installation process ───────────────────────────────────────────── */

function Installation() {
  const s = AWP.installation;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.title}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-5">
            {s.intro.map((p) => (
              <Prose key={p} onGold className="lg:mt-2 lg:first:mt-0">
                {p}
              </Prose>
            ))}
          </Reveal>
        </div>

        {/* Five across only from `xl`: at 1024 a card was 98px inside and
            "Wheel condition" ran past it. Three over two at `lg`. */}
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-5">
          {s.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i}
              className={`surface-on-gold relative flex flex-col overflow-hidden p-6 lg:p-7 ${
                i === 0 ? "sm:row-span-2 lg:row-span-1" : ""
              }`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-5 -right-2 font-[family-name:var(--font-display)] text-[80px] leading-none text-white/[0.045]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
                {step.label} · {s.flow[i]}
              </p>
              <h4 className="mt-3 font-[family-name:var(--font-sub)] text-[20px] leading-tight text-white uppercase">
                {step.title}
              </h4>
              {step.body.map((p) => (
                <p key={p} className="mt-3 text-[14.5px] leading-[23px] font-normal text-white/75">
                  {p}
                </p>
              ))}
              {step.list && (
                <ul className="mt-3 grid gap-1.5">
                  {step.list.map((li) => (
                    <li key={li} className="flex gap-2 text-[14px] leading-[21px] font-normal text-white/85">
                      <Icon name="check" size={14} strokeWidth={2.4} className="mt-[4px] shrink-0 text-gold" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── 6. Diamond-cut / premium wheels ───────────────────────────────────────
   "Strong visual section." The diamond-cut installation from the old page's
   gallery — the machined spoke faces are what the copy is about. */

function DiamondCut() {
  const d = AWP.diamondCut;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal delay={1} className="order-last lg:order-first lg:col-span-6">
          <figure className="relative overflow-hidden rounded-[14px] ring-1 ring-white/[0.08]">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={PHOTOS.diamondCut.src}
                alt={PHOTOS.diamondCut.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </Reveal>

        <div className="lg:col-span-6">
          <SectionHead title={d.heading} />
          <Kicker>{d.title}</Kicker>
          <Reveal delay={3}>
            {d.body.map((p) => (
              <Prose key={p}>{p}</Prose>
            ))}
          </Reveal>
          <ImportantNote lines={d.important} />
          <Reveal delay={4}>
            <CheckButton label={d.cta} className="mt-8 w-full sm:w-auto" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 7 & 8. What it does and does not protect against ──────────────────────
   Side by side and the same weight, on purpose: the brief's limits are not
   small print. "Put this visibly on the page." */

function Protection() {
  const p = AWP.protects;
  const n = AWP.notProtect;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-5 lg:grid-cols-12 lg:gap-6">
        <Reveal as="article" className="surface-on-gold p-7 sm:p-9 lg:col-span-5 lg:p-10">
          <span aria-hidden className="block h-[3px] w-[52px] rounded-full bg-gold" />
          <h2 className="mt-6 text-[26px] leading-[1.05] text-white sm:text-[30px] lg:text-[34px]">{p.heading}</h2>
          <h3 className="mt-4 font-[family-name:var(--font-sub)] text-[18px] leading-tight font-semibold tracking-[0.03em] text-gold uppercase lg:text-[20px]">
            {p.title}
          </h3>
          <Prose>{p.lead}</Prose>
          <Ticks items={p.ticks} />
          <p className="mt-7 border-t border-white/[0.08] pt-5 text-[15px] leading-[25px] font-normal text-white/70">
            {p.note}
          </p>
        </Reveal>

        <Reveal as="article" delay={1} className="surface-on-gold p-7 sm:p-9 lg:col-span-7 lg:p-10">
          <span aria-hidden className="block h-[3px] w-[52px] rounded-full bg-[#ff8f8f]" />
          <h2 className="mt-6 text-[26px] leading-[1.05] text-white sm:text-[30px] lg:text-[34px]">{n.heading}</h2>
          <h3 className="mt-4 font-[family-name:var(--font-sub)] text-[18px] leading-tight font-semibold tracking-[0.03em] text-gold uppercase lg:text-[20px]">
            {n.title}
          </h3>
          <p className="mt-4 text-[16px] leading-[27px] font-semibold text-white">{n.emphasis}</p>
          <Prose className="mt-2">{n.lead}</Prose>
          <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {n.crosses.map((c) => (
              <li key={c} className="flex gap-3 text-[15.5px] leading-[24px] font-normal text-white/85">
                <span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff8f8f]/15 text-[#ff8f8f]">
                  <Icon name="close" size={11} strokeWidth={2.8} />
                </span>
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-[10px] bg-gold px-5 py-4 font-[family-name:var(--font-sub)] text-[17px] leading-snug font-semibold tracking-[0.03em] text-ink uppercase sm:text-[19px]">
            {n.callout}
          </p>
          {n.after.map((a) => (
            <Prose key={a} className="mt-3 first-of-type:mt-5">
              {a}
            </Prose>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── 9. Colour options ─────────────────────────────────────────────────────
   "Real current products only." The five finishes, each on its own product
   photograph, under the brief's two choices. The photographs are shot on
   black, so on the ink band they float rather than sit in boxes. */

const SWATCH: Record<string, string> = {
  Silver: "#c5c9cf",
  Black: "#141414",
  Anthracite: "#4a4e54",
  Red: "#c62828",
  Blue: "#21409a",
};

function Colours() {
  const c = AWP.colour;
  const byName = new Map(COLOURS.map((x) => [x.name, x]));
  const [blend, stand] = c.choices;

  const group = (choice: typeof blend, delay: number) => (
    <Reveal delay={delay} className="min-w-0">
      <h3 className="font-[family-name:var(--font-sub)] text-[22px] leading-tight font-semibold tracking-[0.04em] text-gold uppercase">
        {choice.label}
      </h3>
      <p className="mt-1.5 text-[15px] leading-[24px] font-normal text-white/70">{choice.body}</p>
      {/* Three across on a phone for both groups, so a Stand Out tile is
          the same size as a Blend In one; from `lg` each group has its own
          share of the row and fills it. */}
      <ul className={`mt-5 grid grid-cols-3 gap-2.5 sm:gap-3 ${choice.colours.length === 3 ? "" : "lg:grid-cols-2"}`}>
        {choice.colours.map((name) => {
          const photo = byName.get(name);
          if (!photo) throw new Error(`alloy wheel page: no photograph for the ${name} finish`);
          return (
            <li key={name} className="min-w-0">
              <figure className="group overflow-hidden rounded-[12px] ring-1 ring-white/[0.08] transition-shadow duration-300 hover:ring-gold/45">
                {/* A lifted centre, so the black and anthracite wheels read
                    against the tile rather than vanish into it. */}
                <div className="relative aspect-square w-full bg-[radial-gradient(circle_at_50%_42%,#2b2b2b_0%,#151515_48%,#0a0a0a_78%)]">
                  <span
                    aria-hidden
                    className="absolute inset-x-[18%] bottom-[7%] h-[7%] rounded-[50%] bg-black/70 blur-md"
                  />
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 18vw, 30vw"
                    className="object-contain p-[9%] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[24deg]"
                  />
                </div>
                <figcaption className="flex items-center gap-1.5 border-t border-white/[0.07] px-2.5 py-2.5 font-[family-name:var(--font-sub)] text-[12px] tracking-[0.04em] text-white uppercase sm:gap-2 sm:px-4 sm:text-[14px] sm:tracking-[0.08em]">
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-white/35 sm:h-3 sm:w-3"
                    style={{ background: SWATCH[name] }}
                  />
                  <span className="truncate">{name}</span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </Reveal>
  );

  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={c.heading} />
            <Kicker>{c.title}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-5">
            {c.body.map((p) => (
              <Prose key={p} className="lg:mt-2 lg:first:mt-0">
                {p}
              </Prose>
            ))}
          </Reveal>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,3fr)_auto_minmax(0,2fr)] lg:gap-8">
          {group(blend, 1)}
          <p
            aria-hidden
            className="flex items-center justify-center gap-4 font-[family-name:var(--font-ui)] text-[12px] tracking-[0.2em] text-white/45 uppercase lg:h-full lg:flex-col"
          >
            <span className="h-px w-12 bg-white/15 lg:h-16 lg:w-px" />
            or
            <span className="h-px w-12 bg-white/15 lg:h-16 lg:w-px" />
          </p>
          {group(stand, 2)}
        </div>
      </div>
    </section>
  );
}

/* ── 10. £159 pricing ──────────────────────────────────────────────────────
   "Large pricing block." The number is the block; the inclusions are under
   it so the price is never read without them — "Do NOT leave pricing
   ambiguous". */

function Price() {
  const p = AWP.price;
  return (
    <section id="price" className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell flex flex-col items-center text-center">
        <SectionHead title={p.name} tone="gold" align="center" />
        <Reveal delay={2}>
          <p className="mt-8 font-[family-name:var(--font-display)] text-[clamp(88px,15vw,176px)] leading-[0.9] text-ink">
            {p.price}
          </p>
        </Reveal>
        <Reveal delay={3}>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-[family-name:var(--font-ui)] text-[12.5px] font-semibold tracking-[0.22em] text-ink/80 uppercase">
            <span>{p.unit}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-ink/60" />
            <span>{p.note}</span>
          </p>
          <p className="measure mx-auto mt-6 text-[16px] leading-[27px] font-normal text-ink/80">{p.inclusions}</p>
        </Reveal>
        <Reveal delay={4} className="w-full sm:w-auto">
          <BookButton label={p.bookLabel} tone="dark" className="mt-9 w-full sm:w-auto" />
        </Reveal>
      </div>
    </section>
  );
}

/* ── 11. New car protection ────────────────────────────────────────────────
   "Cross-sell relevant Medusa protection packages." The two the brief names,
   as the cards the rest of the site already uses for a service — their own
   photograph, price and opening line, read off their own pages. */

function NewCar({ cards }: { cards: HubCard[] }) {
  const n = AWP.newCar;
  const [a, b] = n.complements;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHead title={n.heading} />
          <Kicker>{n.title}</Kicker>
          <Reveal delay={3}>
            <Prose>{n.lead}</Prose>
            <Prose>{n.idealLead}</Prose>
            <Ticks items={n.ideal} cols />
            <Prose className="mt-6">{n.closing}</Prose>
            <Prose>
              {n.complementLead}{" "}
              <a href={a.href} className="font-semibold text-gold hover:underline">
                {a.label}
              </a>{" "}
              or{" "}
              <a href={b.href} className="font-semibold text-gold hover:underline">
                {b.label}
              </a>
            </Prose>
          </Reveal>
          <Reveal delay={4}>
            <a href={n.cta.href} className="btn btn-gold mt-8 min-h-[52px] w-full rounded-full text-[15px] sm:w-auto">
              {n.cta.label}
              <Icon name="arrow" size={18} className="ml-2.5" />
            </a>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <ServiceCards cards={cards} cols="sm:grid-cols-2" />
        </div>
      </div>
    </section>
  );
}

/* ── 12. Gallery ───────────────────────────────────────────────────────────
   "Real installations." The three the old page's gallery held and the film
   it carried. The brief also asks for a before & after, a full vehicle and
   an installation in progress — none exists yet, and "Do not use heavily
   edited images" rules out making one. */

function Gallery() {
  const g = AWP.gallery;
  const [first, ...rest] = g.photos;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionHead title={g.heading} tone="gold" />
            <Kicker onGold>{g.title}</Kicker>
          </div>
          <Reveal delay={3} className="w-full sm:w-auto">
            <BookButton label={g.bookLabel} tone="dark" className="w-full sm:w-auto" />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="overflow-hidden rounded-[14px] bg-ink ring-1 ring-ink/15">
              <iframe
                src={g.video.src}
                title={g.video.title}
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="aspect-video h-full w-full border-0"
              />
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:grid-rows-2">
            {[first, ...rest].map((photo, i) => (
              <Reveal
                key={photo.src}
                delay={i + 1}
                className={`relative overflow-hidden rounded-[14px] ring-1 ring-ink/15 ${
                  i === 0 ? "col-span-2" : ""
                } aspect-[3/2] lg:aspect-auto`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 38vw, 100vw" : "(min-width: 1024px) 19vw, 50vw"}
                  className="object-cover"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 13. Why Medusa? ───────────────────────────────────────────────────── */

const WHY_ICONS: Record<string, IconName> = {
  "Specialist Installation": "spark",
  "Mobile Service": "pin",
  "Premium Vehicle Experience": "star",
  "Suitability Assessment": "camera",
  "Complete Vehicle Protection": "shield",
};

function WhyMedusa() {
  const w = AWP.whyMedusa;
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
          {w.items.map((it, i) => {
            const icon = WHY_ICONS[it.title];
            return (
              <Reveal as="li" key={it.title} delay={i} className="surface group relative overflow-hidden p-7">
                {icon ? (
                  <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gold/12 ring-1 ring-gold/35">
                    <Icon name={icon} size={24} className="text-gold" />
                  </span>
                ) : (
                  <span className="flex h-[52px] items-center font-[family-name:var(--font-display)] text-[38px] leading-none text-gold">
                    {it.title}
                  </span>
                )}
                {icon && (
                  <h4 className="mt-6 font-[family-name:var(--font-sub)] text-[20px] leading-tight text-white uppercase">
                    {it.title}
                  </h4>
                )}
                {it.bodyHtml ? (
                  <p
                    className="mt-3 text-[15px] leading-[25px] font-normal text-body [&_a]:font-semibold [&_a]:text-gold [&_a:hover]:underline"
                    dangerouslySetInnerHTML={{ __html: it.bodyHtml }}
                  />
                ) : (
                  <p className={`${icon ? "mt-3" : "mt-6"} text-[15px] leading-[25px] font-normal text-body`}>
                    {it.body}
                  </p>
                )}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ── 15. Compatibility form — with Sections 11, 16, 17 and 19 ──────────────
   "Main secondary conversion." The suitability checklist leads, the form
   sits beside it, and the three things to tell us before booking follow the
   checklist. On a phone the form comes second, straight after the list of
   what to send, rather than three cards further down. */

function Compatibility() {
  const s = AWP.suitability;
  const d = AWP.existingDamage;
  const r = AWP.refurbished;
  const h = AWP.hideDamage;

  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-10">
        <div className="lg:col-span-5">
          <SectionHead title={s.heading} />
          <Kicker>{s.title}</Kicker>
          <Reveal delay={3}>
            {s.lead.map((p) => (
              <Prose key={p}>{p}</Prose>
            ))}
            <ol className="mt-6 border-t border-white/[0.08]">
              {s.send.map((item, i) => (
                <li key={item} className="flex items-center gap-4 border-b border-white/[0.08] py-3.5">
                  <span className="w-7 shrink-0 font-[family-name:var(--font-display)] text-[22px] leading-none text-gold">
                    {i + 1}
                  </span>
                  <span className="font-[family-name:var(--font-sub)] text-[16px] tracking-[0.03em] text-white uppercase">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
            <Prose className="mt-5">{s.after}</Prose>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-start">
          <WheelCheckForm id={FORM_ANCHOR} />
        </div>

        <div className="grid gap-5 lg:col-span-5 lg:col-start-1 lg:self-start">
          <Reveal as="article" className="surface p-6 sm:p-7">
            <h3 className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
              {d.heading}
            </h3>
            <p className="mt-2.5 text-[20px] leading-snug font-semibold text-white">{d.title}</p>
            <p className="mt-3 text-[15px] leading-[25px] font-normal text-body">{d.lead}</p>
            <Chips items={d.list} />
            {d.after.map((p) => (
              <p key={p} className="mt-3 text-[15px] leading-[25px] font-normal text-body">
                {p}
              </p>
            ))}
            {/* Side by side on a tablet and from `xl`; stacked at `lg`, where
                the card is a 5/12 column and the link ran past its edge. */}
            <div className="mt-5 flex flex-col gap-3 rounded-[10px] bg-gold/[0.07] p-4 ring-1 ring-gold/30 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start xl:flex-row xl:items-center">
              <p className="text-[15px] leading-[22px] font-normal text-white">
                <span className="font-semibold text-gold uppercase">{d.notSure}</span> {d.notSureBody}
              </p>
              <a
                href={`#${FORM_ANCHOR}-photos`}
                data-track={EVENTS.check}
                className="link-inline shrink-0 text-gold"
              >
                <Icon name="camera" size={15} />
                {d.cta}
              </a>
            </div>
          </Reveal>

          <Reveal as="article" delay={1} className="surface p-6 sm:p-7">
            <h3 className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
              {r.heading}
            </h3>
            <p className="mt-2.5 text-[20px] leading-snug font-semibold text-white">{r.title}</p>
            {r.lead.map((p) => (
              <p key={p} className="mt-3 text-[15px] leading-[25px] font-normal text-body">
                {p}
              </p>
            ))}
            <Chips items={r.list} />
            <p className="mt-3 text-[15px] leading-[25px] font-normal text-body">{r.after}</p>
          </Reveal>

          <Reveal as="article" delay={2} className="surface p-6 sm:p-7">
            <h3 className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
              {h.heading}
            </h3>
            <p className="mt-2.5 text-[20px] leading-snug font-semibold text-white">{h.title}</p>
            <p className="mt-3 text-[15px] leading-[25px] font-normal text-body">{h.lead}</p>
            <p className="mt-3 text-[15px] leading-[25px] font-normal text-body">{h.however}</p>
            <p className="mt-3 rounded-[10px] bg-gold px-4 py-3 font-[family-name:var(--font-sub)] text-[16px] leading-snug font-semibold tracking-[0.03em] text-ink uppercase">
              {h.callout}
            </p>
            <p className="mt-4 text-[15px] leading-[25px] font-normal text-body">{h.repairLead}</p>
            <Chips items={h.list} />
            <p className="mt-4 text-[15px] leading-[25px] font-normal text-body">{h.after}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 16. FAQ ───────────────────────────────────────────────────────────── */

function Faq() {
  const f = AWP.faq;
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

/* ── 17. Important information ─────────────────────────────────────────── */

function Important() {
  const im = AWP.important;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <SectionHead title={im.heading} />
        <Kicker>{im.title}</Kicker>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {im.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i % 4} className="surface p-6">
              <Icon name="info" size={22} className="text-gold" />
              <h4 className="mt-4 font-[family-name:var(--font-sub)] text-[17px] leading-snug tracking-[0.03em] text-white uppercase">
                {it.title}
              </h4>
              <p className="mt-2 text-[14.5px] leading-[23px] font-normal text-white/75">{it.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 18. Final CTA ─────────────────────────────────────────────────────── */

function FinalCta() {
  const f = AWP.finalCta;
  return (
    <section
      id="awp-final"
      className="cut-top relative w-full overflow-hidden bg-ink-panel pt-[calc(var(--cut)+4rem)] pb-16 lg:pb-[104px]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "radial-gradient(80% 100% at 50% 0%, rgba(193,146,49,0.16) 0%, transparent 62%)",
        }}
      />
      <div className="shell relative flex flex-col items-center text-center">
        <SectionHead title={f.heading} align="center" />
        <Reveal>
          <p className="measure mx-auto mt-6 text-[16px] leading-[27px] font-normal text-body">{f.body}</p>
        </Reveal>
        <Reveal delay={1}>
          <p className="mt-8 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
            <span className="font-[family-name:var(--font-display)] text-[54px] leading-none text-gold lg:text-[64px]">
              {f.price}
            </span>
            <span className="font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.18em] text-white/70 uppercase">
              {f.label}
            </span>
          </p>
        </Reveal>
        <Reveal delay={2}>
          <ol className="mt-9 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
            {f.flow.map((step, i) => {
              const last = i === f.flow.length - 1;
              return (
                <li key={step} className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-4 py-2 font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.16em] uppercase ${
                      last ? "bg-gold text-ink" : "text-white ring-1 ring-white/20"
                    }`}
                  >
                    {step}
                  </span>
                  {!last && <Icon name="arrow" size={14} className="text-white/40" />}
                </li>
              );
            })}
          </ol>
        </Reveal>
        <Reveal delay={3} className="w-full sm:w-auto">
          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <BookButton label={f.bookLabel} className="w-full sm:w-auto" />
            <CheckButton label={f.checkLabel} className="w-full sm:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
