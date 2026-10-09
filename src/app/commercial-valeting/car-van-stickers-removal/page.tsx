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
import SignageQuoteForm from "@/components/SignageQuoteForm";
import StickyBookBar from "@/components/StickyBookBar";
import TrackClicks from "@/components/TrackClicks";
import Testimonials from "@/components/sections/Testimonials";
import { getPage } from "@/lib/blocks";
import { pageSchema } from "@/lib/schema";
import { FORM_ANCHOR, PATH, PHOTOS, QUOTE, SIGNAGE, SLUG, type Step } from "@/lib/signage-removal";
import { CONTACT } from "@/lib/site";

/**
 * Vehicle signage & sticker removal — rebuilt from the client's brief.
 *
 * Client, 2026-10-06: "Full replacement/re-optimisation of the existing page.
 * KEEP EXISTING URL". Every word is in `lib/signage-removal.ts` and the quote
 * form's in `lib/signage-quote.ts`; this file is only layout, in the order of
 * the brief's "PAGE DESIGN / ELEMENTOR STRUCTURE":
 *
 *   1 hero · 2 what we remove · 3 why customers remove signage · 4 the six
 *   steps · 6 how much it costs · 7 fleet · 8–10 the disclaimer · 11 why
 *   Medusa · reviews · 12 the quote form · 13 FAQ · 14 the closing band.
 *
 * Section 5, "Before & After", is not here: "Add genuine Medusa
 * before-and-after photographs … Do not use stock images" — and none exists
 * yet (see `lib/signage-removal.ts`).
 *
 * The brief's layout notes decided the rest. "Do not make customers scroll
 * before discovering that they need to send photos for a quote" — so on a
 * phone the hero is h1, the question, SEND US PHOTOS FOR A QUOTE and both
 * buttons, then the photograph, then everything else. "All 'GET A QUOTE'
 * buttons on the page should scroll directly to this form" — every quote
 * button is `#get-quote`. "Make this visually prominent but don't make it
 * look frightening. Use an information panel" — the disclaimer is two calm
 * bands of panels, its three key phrases first and in bold, with no red
 * anywhere. "Add a sticky bottom bar: GET QUOTE | WHATSAPP" — `StickyBookBar`.
 *
 * Gold and ink alternate the whole way down (client, 2026-09-22: "pastikan
 * warna bg tetap selang seling"), and the form lands on ink, where every
 * enquiry form on the site sits.
 *
 * The route wins over `app/[...slug]` because a static segment outranks a
 * catch-all, and the slug is in `CUSTOM_ROUTES` so only one page is built.
 */

const WHATSAPP = SIGNAGE.whatsapp;

export function generateMetadata(): Metadata {
  const { title, description } = SIGNAGE.seo;
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

export default function SignageRemovalPage() {
  const page = getPage(SLUG);
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={pageSchema(page, {
          service: {
            slug: SLUG,
            name: "Vehicle Signage & Sticker Removal",
            serviceType: "Vehicle signage removal",
            description: SIGNAGE.seo.description,
            image: PHOTOS.hero.src,
          },
          faq: SIGNAGE.faq.items,
        })}
      />
      <TrackClicks />

      <Header />
      <main className="flex-1">
        <Hero />
        <WhatWeRemove />
        <UseCases />
        <Process />
        <Cost />
        <Fleet />
        <Important />
        <Paintwork />
        <WhyMedusa />
        <Testimonials />
        <Quote />
        <Faq />
        <FinalCta />
      </main>
      <Footer whatsapp={WHATSAPP} />

      {/* "Add a sticky bottom bar: GET QUOTE | WHATSAPP". It steps aside over
          the form and over the closing band, which carry the same two. */}
      <StickyBookBar
        primary={{ label: "Get Quote", href: QUOTE }}
        secondary={{ label: "WhatsApp", href: WHATSAPP, icon: "whatsapp", external: true }}
        after="signage-hero-actions"
        hideOver={[FORM_ANCHOR, "signage-final"]}
      />
    </>
  );
}

/* ── Shared pieces ──────────────────────────────────────────────────────── */

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
      className={`btn ${tone === "gold" ? "btn-gold" : "btn-dark"} min-h-[52px] rounded-full px-6 text-center text-[14px] sm:px-7 sm:text-[15px] ${className}`}
    >
      {label}
      <Icon name="arrow" size={18} className="ml-2.5 shrink-0" />
    </a>
  );
}

/** "Set the WhatsApp button to pre-fill" — every one of them opens with the message. */
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
      className={`btn min-h-[52px] rounded-full px-6 text-[14px] sm:px-7 sm:text-[15px] ${
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

/* The brief gives five of its sections a name over the heading it wants as
   the h2 — "WHAT WE REMOVE" over "Car, Van & Commercial Vehicle Branding
   Removal". The h2 is the brief's own choice (its "RECOMMENDED H2
   STRUCTURE"); the name is the line under it, in the condensed face, as on
   the WHEELUV and vomit cleaning pages. */
function Kicker({ children, onGold }: { children: React.ReactNode; onGold?: boolean }) {
  return (
    <Reveal delay={2}>
      <p
        className={`mt-5 font-[family-name:var(--font-sub)] text-[19px] leading-[1.25] font-semibold tracking-[0.02em] uppercase lg:text-[23px] ${
          onGold ? "text-ink" : "text-gold"
        }`}
      >
        {children}
      </p>
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
  /** Copy the brief sets partly in bold, or that carries a link. */
  html?: string;
  onGold?: boolean;
  className?: string;
}) {
  const cls = `measure mt-4 text-[16px] leading-[27px] font-normal ${
    onGold
      ? "text-ink/80 [&_strong]:font-semibold [&_strong]:text-ink"
      : "text-body [&_strong]:font-semibold [&_strong]:text-white"
  } ${LINKS} ${className}`;
  return html ? <p className={cls} dangerouslySetInnerHTML={{ __html: html }} /> : <p className={cls}>{children}</p>;
}

/** The internal links laid on the brief's own words. */
const LINKS = "[&_a]:font-semibold [&_a]:text-gold [&_a]:underline-offset-4 [&_a:hover]:underline";

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

function Dots({ items, onGold, className = "" }: { items: readonly string[]; onGold?: boolean; className?: string }) {
  return (
    <ul className={`grid sm:grid-cols-2 sm:gap-x-8 ${className}`}>
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

/** The bottom-edge gold rule every card on the site draws on hover. */
function HoverRule() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
    />
  );
}

/* ── 1. Hero ──────────────────────────────────────────────────────────────
   "Desktop: Left: H1 + copy + trust points + CTA. Right: Strong
   before/after signage-removal image. Mobile: H1, Short copy, GET QUOTE,
   WHATSAPP, Image."

   One grid. The DOM order is the brief's mobile list, and it holds from
   `lg` too, where the photograph is pinned to the right-hand column across
   every row: the desktop note lists the CTA after the copy and the trust
   points, but there it lands under the fold of a 1366x768 laptop, and the
   brief's own rule is "Do not make customers scroll before discovering that
   they need to send photos for a quote". So the buttons follow the opening
   question everywhere, and the longer copy and the seven ticks follow them
   — what the motorcycle page did for the same reason.

   There is no before/after photograph yet, so the photograph is the old
   page's own — the decal-striped car, cropped to the car on a phone and
   shown whole beside the copy. */

function Hero() {
  const h = SIGNAGE.hero;
  return (
    <section className="cut-bottom relative w-full overflow-hidden bg-ink-panel pt-[128px] pb-[calc(var(--cut)+2.75rem)] lg:pt-[156px] lg:pb-[calc(var(--cut)+4rem)]">
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
              <p className="mt-4 max-w-[44ch] font-[family-name:var(--font-sub)] text-[16.5px] leading-[1.3] font-semibold tracking-[0.03em] text-gold sm:text-[19px] xl:mt-5 xl:text-[21px]">
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
              <div id="signage-hero-actions" className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <QuoteButton label={h.quoteLabel} className="w-full sm:w-auto" />
                <WhatsAppButton label={h.whatsappLabel} className="w-full sm:w-auto" />
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={4}
            className="mt-10 lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:self-center"
          >
            <figure className="surface relative overflow-hidden">
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[4/5]">
                <Image
                  src={PHOTOS.hero.src}
                  alt={PHOTOS.hero.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className="object-cover object-[50%_62%] lg:object-[50%_55%]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(13,13,13,0.85),transparent)]"
                />
              </div>
            </figure>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-1">
            <Reveal delay={4}>
              <p
                className="mt-9 max-w-[60ch] text-[16px] leading-[27px] font-normal text-white/80 lg:mt-10 lg:border-t lg:border-white/10 lg:pt-8 [&_strong]:font-semibold [&_strong]:text-white"
                dangerouslySetInnerHTML={{ __html: h.introHtml }}
              />
              <p className="mt-4 max-w-[60ch] text-[16px] leading-[27px] font-normal text-white/80">{h.body}</p>
            </Reveal>
            <Reveal delay={5}>
              <ul className="mt-7 grid gap-x-5 gap-y-3 min-[420px]:grid-cols-2">
                {h.ticks.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-2.5 font-[family-name:var(--font-ui)] text-[13.5px] leading-[19px] font-semibold text-white/90"
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
        </div>
      </div>
    </section>
  );
}

/* ── 2. What we remove ─────────────────────────────────────────────────────
   "Use visual icon/cards: Signage, Stickers, Decals, Vinyl Lettering,
   Commercial Branding, Wraps." The six as tiles beside the heading, then the
   copy's four lists as cards, then "Not sure…?" as the band's one ink bar,
   since it is the band's call to action. */

const GLANCE_ICONS: Record<string, IconName> = {
  Signage: "sign",
  Stickers: "sticker",
  Decals: "decal",
  "Vinyl Lettering": "type",
  "Commercial Branding": "van",
  Wraps: "layers",
};

const GROUP_ICONS: Record<string, IconName> = {
  "COMPANY SIGNAGE": "sign",
  "VINYL & DECALS": "type",
  "COMMERCIAL VEHICLE BRANDING": "van",
  OTHER: "sticker",
};

function WhatWeRemove() {
  const r = SIGNAGE.remove;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHead title={r.heading} tone="gold" />
            <Kicker onGold>{r.label}</Kicker>
            <Reveal delay={3}>
              <Prose onGold>{r.lead}</Prose>
            </Reveal>
          </div>
          <ul className="grid grid-cols-3 gap-2.5 sm:gap-3 lg:col-span-6">
            {r.glance.map((g, i) => (
              <Reveal
                as="li"
                key={g}
                delay={i}
                className="flex min-h-[112px] flex-col items-center justify-center gap-3 rounded-[14px] bg-ink px-2 py-5 text-center sm:min-h-[128px]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/12 text-gold ring-1 ring-gold/35 sm:h-12 sm:w-12">
                  <Icon name={GLANCE_ICONS[g] ?? "check"} size={22} />
                </span>
                <span className="font-[family-name:var(--font-sub)] text-[13.5px] leading-tight tracking-[0.04em] text-white uppercase sm:text-[15.5px]">
                  {g}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 xl:grid-cols-4 xl:gap-5">
          {r.groups.map((g, i) => (
            <Reveal
              as="li"
              key={g.title}
              delay={i}
              className="surface-on-gold group relative flex flex-col overflow-hidden p-6 sm:p-7"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold ring-1 ring-gold/35">
                  <Icon name={GROUP_ICONS[g.title] ?? "check"} size={21} />
                </span>
                <h3 className="font-[family-name:var(--font-sub)] text-[19px] leading-[1.1] tracking-[0.03em] text-white uppercase">
                  {g.title}
                </h3>
              </div>
              <span aria-hidden className="my-5 block h-px w-full bg-white/[0.08]" />
              <ul className="grid gap-2.5">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px] leading-[22px] font-normal text-white/85">
                    <Icon name="check" size={16} strokeWidth={2.4} className="mt-[3px] shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <HoverRule />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={1}>
          <div className="mt-6 flex flex-col gap-5 rounded-[14px] bg-ink p-6 sm:p-8 lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/35">
                <Icon name="camera" size={21} />
              </span>
              <div>
                <p className="font-[family-name:var(--font-sub)] text-[19px] leading-tight font-semibold tracking-[0.02em] text-white sm:text-[21px]">
                  {r.notSure}
                </p>
                <p className="mt-1.5 text-[15.5px] leading-[24px] font-normal text-white/75">{r.notSureBody}</p>
              </div>
            </div>
            <QuoteButton label={r.cta} className="w-full shrink-0 lg:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 3. Why do customers remove vehicle signage? ───────────────────────────
   The design note asks for four cards; the copy writes six reasons, and
   all six are here — three across, so they still read as one set. */

const CASE_ICONS: Record<string, IconName> = {
  "SELLING A COMPANY VEHICLE?": "tag",
  "RETURNING A LEASE VEHICLE?": "calendar",
  "REBRANDING YOUR BUSINESS?": "refresh",
  "CHANGING COMPANY DETAILS?": "phone",
  "BOUGHT AN EX-COMPANY VEHICLE?": "key",
  "UPDATING YOUR FLEET?": "van",
};

function UseCases() {
  const u = SIGNAGE.useCases;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
            <SectionHead title={u.heading} />
            <Kicker>{u.label}</Kicker>
          </div>
          <Reveal delay={3} className="w-full shrink-0 sm:w-auto">
            <QuoteButton label={u.cta} className="w-full sm:w-auto" />
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {u.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i % 3} className="surface group relative overflow-hidden p-7">
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gold/12 text-gold ring-1 ring-gold/35">
                <Icon name={CASE_ICONS[it.title] ?? "check"} size={24} />
              </span>
              <h3 className="mt-6 font-[family-name:var(--font-sub)] text-[20px] leading-tight text-white uppercase">
                {it.title}
              </h3>
              {it.body.map((p, j) => (
                <p
                  key={p}
                  className={`mt-3 text-[15px] leading-[25px] font-normal ${
                    it.body.length > 1 && j === 0 ? "text-white" : "text-body"
                  }`}
                >
                  {p}
                </p>
              ))}
              <HoverRule />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 4. The six steps ──────────────────────────────────────────────────────
   "Use six numbered steps: ASSESS → CLEAN → REMOVE → ADHESIVE → CLEAN →
   OPTIONAL POLISH". The flow runs across the band as one line of six, each
   a link to its step; the steps themselves are a numbered rail, so the
   short ones and the two with lists read at their own length. Step 6's
   bold limit is the band's one dark panel, as the vomit cleaning page's
   ozone step is. */

const stepId = (n: number) => `step-${n}`;

function Process() {
  const s = SIGNAGE.process;
  const [lead, ...rest] = s.intro;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead title={s.heading} tone="gold" />
            <Kicker onGold>{s.label}</Kicker>
          </div>
          <Reveal delay={3} className="lg:col-span-5">
            <p className="mt-4 text-[18px] leading-[28px] font-semibold text-ink lg:mt-0">{lead}</p>
            {rest.map((p) => (
              <Prose key={p} onGold className="mt-3">
                {p}
              </Prose>
            ))}
          </Reveal>
        </div>

        <Reveal delay={2}>
          <ol className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:mt-12 lg:grid-cols-6">
            {s.steps.map((step, i) => {
              const last = i === s.steps.length - 1;
              return (
                <li key={stepId(i + 1)}>
                  <a
                    href={`#${stepId(i + 1)}`}
                    className={`flex min-h-[64px] items-center justify-between gap-2 rounded-[12px] px-4 py-3 transition-colors ${
                      last
                        ? "bg-ink/[0.08] text-ink ring-1 ring-ink/25 ring-inset hover:bg-ink/15"
                        : "bg-ink text-white hover:bg-ink/85"
                    }`}
                  >
                    <span className="flex items-baseline gap-2.5">
                      <span
                        className={`font-[family-name:var(--font-display)] text-[19px] leading-none ${
                          last ? "text-ink/60" : "text-gold"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="font-[family-name:var(--font-sub)] text-[15px] leading-tight font-semibold tracking-[0.05em] uppercase">
                        {step.flow}
                      </span>
                    </span>
                    {!last && <Icon name="arrow" size={15} className="hidden shrink-0 text-white/35 lg:block" />}
                  </a>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal delay={1} className="lg:sticky lg:top-32">
              <figure className="relative overflow-hidden rounded-[14px] ring-1 ring-ink/15">
                <div className="relative aspect-[3/2] w-full lg:aspect-[4/5]">
                  <Image
                    src={PHOTOS.sticker.src}
                    alt={PHOTOS.sticker.alt}
                    fill
                    sizes="(min-width: 1024px) 36vw, 92vw"
                    className="object-cover object-[50%_66%] lg:object-[50%_58%]"
                  />
                </div>
              </figure>
            </Reveal>
          </div>

          <ol className="lg:col-span-7">
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
      {!last && <span aria-hidden className="absolute top-14 bottom-1 left-[23px] w-[2px] rounded-full bg-ink/15" />}
      <span
        aria-hidden
        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink font-[family-name:var(--font-display)] text-[22px] leading-none text-gold"
      >
        {n}
      </span>
      <article id={stepId(n)} className="min-w-0 flex-1 scroll-mt-32 pt-1">
        <p className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.2em] text-ink/60 uppercase">
          Step {n} · {step.flow}
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-sub)] text-[21px] leading-tight tracking-[0.02em] text-ink uppercase sm:text-[23px]">
          {step.title}
        </h3>
        {step.body.map((p) => (
          <p
            key={p}
            className="mt-2.5 max-w-[62ch] text-[15.5px] leading-[25px] font-normal text-ink/80 [&_a]:font-semibold [&_a]:text-ink [&_a]:underline [&_a]:decoration-ink/40 [&_a]:underline-offset-4 [&_a:hover]:decoration-ink"
            dangerouslySetInnerHTML={{ __html: p }}
          />
        ))}
        {step.list && (
          <ul className="mt-3.5 grid gap-2 sm:grid-cols-2 sm:gap-x-6">
            {step.list.map((li) => (
              <li key={li} className="flex gap-2.5 text-[15px] leading-[22px] font-normal text-ink/85">
                <span className="mt-px">
                  <Tick onGold size={18} />
                </span>
                {li}
              </li>
            ))}
          </ul>
        )}
        {step.strong && (
          <p className="mt-5 flex gap-3 rounded-[12px] bg-ink p-5 text-[15.5px] leading-[24px] font-semibold text-white sm:p-6">
            <Icon name="info" size={20} className="mt-0.5 shrink-0 text-gold" />
            {step.strong}
          </p>
        )}
        {step.after?.map((p) => (
          <p key={p} className="mt-3 max-w-[62ch] text-[15.5px] leading-[25px] font-normal text-ink/80">
            {p}
          </p>
        ))}
      </article>
    </Reveal>
  );
}

/* ── 6. How much does it cost? ─────────────────────────────────────────────
   "Explain why prices aren't fixed. CTA: UPLOAD PHOTOS & GET A QUOTE." The
   thirteen factors on the left, the five-step "Getting a quote is simple"
   as the card that ends on the button. */

function Cost() {
  const c = SIGNAGE.cost;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHead title={c.heading} />
          <Kicker>{c.title}</Kicker>
          <Reveal delay={3}>
            <p className="mt-5 max-w-[60ch] text-[18px] leading-[28px] font-semibold text-white">{c.lead}</p>
            <p className="mt-7 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.2em] text-gold uppercase">
              {c.factorsLead}
            </p>
            <Dots items={c.factors} className="mt-3" />
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-5 lg:self-center">
          <div className="surface relative overflow-hidden p-6 sm:p-8 lg:p-9">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(70% 50% at 100% 0%, rgba(193,146,49,0.14) 0%, transparent 70%)" }}
            />
            <p className="relative font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.04em] text-white uppercase sm:text-[22px]">
              {c.simpleTitle}
            </p>
            <ol className="relative mt-6">
              {c.simple.map((step, i) => {
                const last = i === c.simple.length - 1;
                return (
                  <li key={step} className={`relative flex items-center gap-4 ${last ? "" : "pb-5"}`}>
                    {!last && (
                      <span aria-hidden className="absolute top-10 bottom-0 left-[19px] w-px bg-white/15" />
                    )}
                    <span
                      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-[19px] leading-none ${
                        last ? "bg-gold text-ink" : "bg-gold/12 text-gold ring-1 ring-gold/35"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[16px] leading-[23px] font-semibold text-white">{step}</span>
                  </li>
                );
              })}
            </ol>
            <QuoteButton label={c.cta} className="relative mt-8 w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 7. Fleet & commercial signage removal ─────────────────────────────────
   "Target commercial customers separately. Include strong CTA for
   multi-vehicle enquiries." The reasons on the gold, and what to send for a
   fleet as an ink card that ends on FLEET ENQUIRY — the band's call to
   action, sized like one. */

function Fleet() {
  const f = SIGNAGE.fleet;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHead title={f.heading} tone="gold" />
          <Kicker onGold>{f.title}</Kicker>
          <Reveal delay={3}>
            <Prose onGold>{f.lead}</Prose>
            <p className="mt-6 text-[16px] leading-[27px] font-semibold text-ink">{f.reasonsLead}</p>
            <ul className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {f.reasons.map((r) => (
                <li key={r} className="flex gap-3 text-[15.5px] leading-[24px] font-normal text-ink/85">
                  <span className="mt-[2px]">
                    <Tick onGold />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
            <Prose onGold className="mt-5">
              {f.reasonsTail}
            </Prose>
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-6 lg:self-center">
          <div className="rounded-[16px] bg-ink p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-8 lg:p-10">
            <ul className="flex flex-wrap gap-2">
              {f.strap.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-gold/12 px-3.5 py-1.5 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.16em] text-gold uppercase ring-1 ring-gold/35"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-7 font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.02em] text-white sm:text-[22px]">
              {f.provideLead}
            </p>
            <ol className="mt-5 border-t border-white/[0.08]">
              {f.provide.map((item, i) => (
                <li key={item} className="flex items-center gap-4 border-b border-white/[0.08] py-3">
                  <span className="w-6 shrink-0 font-[family-name:var(--font-display)] text-[20px] leading-none text-gold">
                    {i + 1}
                  </span>
                  <span className="text-[15.5px] leading-[22px] font-normal text-white/85">{item}</span>
                </li>
              ))}
            </ol>
            <a
              href={QUOTE}
              className="btn btn-gold mt-8 min-h-[58px] w-full rounded-full text-[15.5px] tracking-[0.08em]"
            >
              <Icon name="van" size={20} className="mr-3 shrink-0" />
              {f.cta}
              <Icon name="arrow" size={18} className="ml-2.5 shrink-0" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 8. Important information before signage removal ───────────────────────
   "Make this visually prominent but don't make it look frightening. Use an
   information panel. Important phrases should be bold." The design note's
   three phrases lead, each in its own calm panel; the brief's paragraphs
   and its fourteen factors follow. */

function Important() {
  const im = SIGNAGE.important;
  return (
    <section id="before-booking" className="w-full scroll-mt-24 py-16 lg:py-[104px]">
      <div className="shell">
        <SectionHead title={im.heading} />
        <Kicker>{im.title}</Kicker>

        <ul className="mt-10 grid gap-3 md:grid-cols-3 md:gap-4 lg:mt-12">
          {im.keyPoints.map((k, i) => (
            <Reveal
              as="li"
              key={k}
              delay={i}
              className="flex items-start gap-4 rounded-[14px] bg-gold/[0.07] p-5 ring-1 ring-gold/35 sm:p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                <Icon name="info" size={20} strokeWidth={2} />
              </span>
              <p className="pt-1.5 text-[16.5px] leading-[25px] font-semibold text-white">{k}</p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-14">
          <Reveal delay={1} className="lg:col-span-5">
            <p className="text-[18px] leading-[28px] font-semibold text-white">{im.lead}</p>
            <Prose html={im.noGuaranteeHtml} />
          </Reveal>

          <Reveal delay={2} className="lg:col-span-7">
            <div className="surface p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/35">
                  <Icon name="info" size={20} />
                </span>
                <div className="pt-0.5">
                  <p className="text-[16.5px] leading-[23px] font-semibold text-white">{im.outside}</p>
                  <p className="mt-0.5 text-[14.5px] leading-[22px] font-normal text-white/60">{im.factorsLead}</p>
                </div>
              </div>
              <Dots items={im.factors} className="mt-5" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 9 & 10. Ghosting, and existing paintwork ──────────────────────────────
   Two panels side by side on the gold, each with its own h2 — the brief
   gives each its own — and the same weight, as the WHEELUV page sets what
   its protector does and does not do. The ghosting panel carries a small
   drawing of what the copy describes: a panel's faded paint, and the
   outline of what was once on it. */

function GhostDiagram() {
  const g = SIGNAGE.ghosting;
  return (
    <figure className="mt-6">
      <svg viewBox="0 0 480 170" className="block h-auto w-full" role="img" aria-label={g.body[1]}>
        <defs>
          <linearGradient id="ghost-exposed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5a5d63" />
            <stop offset="1" stopColor="#4a4d52" />
          </linearGradient>
          <linearGradient id="ghost-protected" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2f3237" />
            <stop offset="1" stopColor="#23262a" />
          </linearGradient>
          <linearGradient id="ghost-gloss" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.09" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* The panel: paint that has had the sun. */}
        <rect x="1" y="1" width="478" height="168" rx="16" fill="url(#ghost-exposed)" />
        {/* Where the signage was: a logo and two lines of lettering. */}
        <g fill="url(#ghost-protected)" stroke="#c19231" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="4 4">
          <circle cx="92" cy="85" r="44" />
          <rect x="160" y="50" width="250" height="36" rx="7" />
          <rect x="160" y="98" width="180" height="22" rx="6" />
        </g>
        <rect x="1" y="1" width="478" height="168" rx="16" fill="url(#ghost-gloss)" />
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px] leading-[18px] font-normal text-white/70">
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-3.5 w-3.5 shrink-0 rounded-[4px] bg-[#55585e] ring-1 ring-white/20" />
          {g.exposed}
        </span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-3.5 w-3.5 shrink-0 rounded-[4px] border border-dashed border-gold/70 bg-[#2a2d31]"
          />
          {g.protectedPaint}
        </span>
      </figcaption>
    </figure>
  );
}

function Paintwork() {
  const g = SIGNAGE.ghosting;
  const p = SIGNAGE.paintwork;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-5 lg:grid-cols-2 lg:gap-6">
        <Reveal as="article" className="surface-on-gold p-6 sm:p-9 lg:p-10">
          <span aria-hidden className="block h-[3px] w-[52px] rounded-full bg-gold" />
          <h2 className="mt-6 text-[26px] leading-[1.05] text-white sm:text-[32px] lg:text-[36px]">{g.heading}</h2>
          <p className="mt-4 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.03em] text-gold uppercase lg:text-[19px]">
            {g.label}
          </p>
          {g.body.map((t) => (
            <Prose key={t}>{t}</Prose>
          ))}
          <Prose html={g.termHtml} />
          <GhostDiagram />
          <div className="mt-7 rounded-[12px] bg-gold/[0.07] p-5 ring-1 ring-gold/35 sm:p-6">
            <p className="flex items-center gap-2 font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
              <Icon name="info" size={16} />
              Important
            </p>
            {g.importantHtml.map((html) => (
              <p
                key={html}
                className={`mt-3 text-[15px] leading-[24px] font-normal text-white/80 [&_strong]:font-semibold [&_strong]:text-white ${LINKS}`}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ))}
          </div>
        </Reveal>

        <Reveal as="article" delay={1} className="surface-on-gold flex flex-col p-6 sm:p-9 lg:p-10">
          <span aria-hidden className="block h-[3px] w-[52px] rounded-full bg-gold" />
          <h2 className="mt-6 text-[26px] leading-[1.05] text-white sm:text-[32px] lg:text-[36px]">{p.heading}</h2>
          <p className="mt-4 font-[family-name:var(--font-sub)] text-[17px] leading-tight font-semibold tracking-[0.03em] text-gold uppercase lg:text-[19px]">
            {p.label}
          </p>
          <p className="mt-5 text-[16px] leading-[24px] font-semibold text-white">{p.careLead}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {p.care.map((c) => (
              <li
                key={c}
                className="rounded-full bg-white/[0.05] px-3.5 py-1.5 text-[14px] leading-[20px] font-normal text-white/85 ring-1 ring-white/[0.1]"
              >
                {c}
              </li>
            ))}
          </ul>
          <Prose>{p.weakened}</Prose>
          <p className="measure mt-4 border-l-2 border-gold pl-4 text-[16px] leading-[26px] font-semibold text-white">
            {p.noGuarantee}
          </p>
          <Prose>{p.undetermined}</Prose>

          <div className="mt-auto pt-8">
            <div className="flex flex-col gap-4 rounded-[14px] bg-ink p-6 ring-1 ring-gold/40 sm:flex-row sm:gap-5 sm:p-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                <Icon name="shield" size={22} />
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.22em] text-gold uppercase">
                  {p.acknowledgement.title}
                </h3>
                <p className="mt-2.5 text-[15.5px] leading-[25px] font-semibold text-white">{p.acknowledgement.body}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 11. Why choose Medusa? ────────────────────────────────────────────── */

function WhyMedusa() {
  const w = SIGNAGE.why;
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

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {w.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i % 3} className="surface group relative overflow-hidden p-7">
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gold/12 text-gold ring-1 ring-gold/35">
                <Icon name={it.icon as IconName} size={24} />
              </span>
              <h3 className="mt-6 font-[family-name:var(--font-sub)] text-[20px] leading-tight text-white uppercase">
                {it.title}
              </h3>
              {it.body.map((p) => (
                <p
                  key={p}
                  className={`mt-3 text-[15px] leading-[25px] font-normal text-body ${LINKS}`}
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
              <HoverRule />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 12. The quote form ────────────────────────────────────────────────────
   "This is the main conversion point. Give this section an anchor ID:
   #get-quote". The heading holds still beside the form from `lg`, with the
   two other ways in — WhatsApp and the phone — under it. */

function Quote() {
  const q = SIGNAGE.quote;
  return (
    <section id={FORM_ANCHOR} className="w-full scroll-mt-20 py-16 lg:scroll-mt-24 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead title={q.heading} />
            <Kicker>{q.title}</Kicker>
            <Reveal delay={3}>
              <Prose>{q.lead}</Prose>
              <div className="mt-8 hidden flex-col gap-4 lg:flex">
                <WhatsAppButton label={SIGNAGE.hero.whatsappLabel} className="self-start" />
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
        <div className="lg:col-span-7">
          <SignageQuoteForm id={`${FORM_ANCHOR}-form`} thanks={SIGNAGE.thanks} whatsapp={WHATSAPP} />
        </div>
      </div>
    </section>
  );
}

/* ── 13. FAQ ──────────────────────────────────────────────────────────────
   "Accordion format." */

function Faq() {
  const f = SIGNAGE.faq;
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

/* ── 14. Final CTA ─────────────────────────────────────────────────────────
   "Repeat: GET A FREE QUOTE, WHATSAPP US". The six kinds of work as one row
   of chips between the sentence and the buttons. */

function FinalCta() {
  const f = SIGNAGE.finalCta;
  return (
    <section
      id="signage-final"
      className="cut-top relative w-full overflow-hidden bg-ink-panel pt-[calc(var(--cut)+4rem)] pb-16 lg:pb-[104px]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(80% 100% at 50% 0%, rgba(193,146,49,0.16) 0%, transparent 62%)" }}
      />
      <div className="shell relative flex flex-col items-center text-center">
        <SectionHead title={f.heading} align="center" />
        <Reveal>
          <p className="measure mx-auto mt-6 text-[16px] leading-[27px] font-normal text-body">{f.body}</p>
        </Reveal>
        <Reveal delay={1}>
          <ul className="mx-auto mt-8 flex max-w-[760px] flex-wrap items-center justify-center gap-2">
            {f.chips.map((c) => (
              <li
                key={c}
                className="rounded-full px-4 py-2 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.16em] text-white uppercase ring-1 ring-white/20 sm:text-[12px]"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-9 font-[family-name:var(--font-sub)] text-[20px] leading-tight font-semibold tracking-[0.02em] text-gold sm:text-[23px]">
            {f.closing}
          </p>
        </Reveal>
        <Reveal delay={3} className="w-full sm:w-auto">
          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <QuoteButton label={f.quoteLabel} className="w-full sm:w-auto" />
            <WhatsAppButton label={f.whatsappLabel} className="w-full sm:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
