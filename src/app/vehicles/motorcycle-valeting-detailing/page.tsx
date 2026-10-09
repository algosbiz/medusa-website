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
import { getPage } from "@/lib/blocks";
import { MOTORCYCLE, type Package, PATH, PHOTOS, SLUG, tiersWith } from "@/lib/motorcycle";
import { pageSchema } from "@/lib/schema";
import { EVENTS } from "@/lib/track";

/**
 * Motorcycle valeting & detailing — rebuilt from the client's brief.
 *
 * Client, 2026-10-06: "This page needs to be fully changes please", then the
 * page's new copy, an SEO block, a ten-section layout and a list of mobile
 * conversion rules. Every word is in `lib/motorcycle.ts`; this file is only
 * layout, in the order of the brief's "PAGE LAYOUT" list:
 *
 *   1 hero · 2 the three packages · 3 the comparison · 5 mobile service ·
 *   6 safe cleaning · 7 why Medusa · prices · 8 reviews · 9 FAQ · 10 the
 *   closing booking band.
 *
 * Section 4, "Before & After", is not here: "Add genuine Medusa motorcycle
 * before/after photographs when available. Do not use misleading stock
 * photographs" — and none exists yet. The copy's "Motorcycle Valeting Prices"
 * section has no slot in that list, so it sits where the copy puts it, after
 * Why Choose, and the reviews follow it.
 *
 * Gold and ink alternate the whole way down (client, 2026-09-22: "pastikan
 * warna bg tetap selang seling"), with the packages on ink so the Deep Valet
 * card can carry the page's gold, as the brief asks: "Make Deep Valet
 * visually prominent and add a MOST POPULAR badge."
 *
 * The route wins over `app/[...slug]` because a static segment outranks a
 * catch-all, and the slug is in `CUSTOM_ROUTES` so only one page is built.
 */

const BOOK = MOTORCYCLE.book;
const WHATSAPP = MOTORCYCLE.whatsapp;
const PACKAGES = MOTORCYCLE.packages.items;

const packageId = (p: Package) => `package-${p.short.toLowerCase().replace(/\s+/g, "-")}`;

export function generateMetadata(): Metadata {
  const { title, description } = MOTORCYCLE.seo;
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

export default function MotorcyclePage() {
  const page = getPage(SLUG);
  if (!page) notFound();

  return (
    <>
      {/* "Add FAQ schema only where compliant with current Google
          structured-data requirements": the questions are the page's own and
          every one of them is on the page, in the accordion. */}
      <JsonLd
        data={pageSchema(page, {
          service: {
            slug: SLUG,
            name: "Motorcycle Valeting & Detailing",
            serviceType: "Mobile motorcycle valeting",
            description: MOTORCYCLE.seo.description,
            image: PHOTOS.hero.src,
            offers: PACKAGES.map((p) => ({
              name: p.name,
              price: p.price.replace(/[^\d.]/g, ""),
              currency: "GBP",
              description: p.body,
            })),
          },
          faq: MOTORCYCLE.faq.items,
        })}
      />
      <TrackClicks />

      <Header />
      <main className="flex-1">
        <Hero />
        <Packages />
        <Choose />
        <MobileService />
        <SafeCleaning />
        <WhyMedusa />
        <Prices />
        <Testimonials onGold={false} />
        <Faq />
        <Closing />
      </main>
      <Footer />

      {/* "Add a sticky mobile CTA at the bottom of the screen: BOOK NOW |
          WHATSAPP." */}
      <StickyBookBar
        primary={{ label: "Book Now", href: BOOK, track: EVENTS.bookMotorcycle }}
        secondary={{ label: "WhatsApp", href: WHATSAPP, icon: "whatsapp", external: true }}
        after="moto-hero-actions"
        hideOver={["moto-final"]}
      />
    </>
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
  /** At the foot of a package card, where "Book Maintenance Wash" was
   *  clipped at 1024px — the label wraps instead. */
  inCard?: boolean;
  className?: string;
}) {
  return (
    <a
      href={BOOK}
      data-track={EVENTS.bookMotorcycle}
      className={`btn ${tone === "gold" ? "btn-gold" : "btn-dark"} min-h-[52px] rounded-full px-4 text-center text-[14px] ${
        inCard ? "py-3 leading-[18px]" : "sm:px-7 sm:text-[15px] sm:whitespace-nowrap"
      } ${className}`}
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
      className={`btn min-h-[52px] rounded-full px-4 text-[14px] sm:px-7 sm:text-[15px] sm:whitespace-nowrap ${
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
   "Desktop: text left / premium motorcycle image right. Mobile: text → trust
   points → CTA → image. … CTA must be visible above the fold on mobile."

   The layout's own list for this band is "H1, Short introductory paragraph,
   Trust icons, Primary BOOK NOW button, Secondary WhatsApp button", so the
   copy's one-line opener is that paragraph and its two longer ones follow
   the buttons, under a hairline. Set before them, they pushed both buttons
   below the fold on a 390px phone and on a 1440x900 laptop alike.

   The photograph is the bike alone, cut out of the site's one motorcycle
   poster, and it carries the three prices under it — "Pricing should be
   visible without requiring customers to contact Medusa first", and from
   here each one jumps to its card. */

function Hero() {
  const h = MOTORCYCLE.hero;

  return (
    <section className="cut-bottom relative w-full overflow-hidden bg-ink-panel pt-[132px] pb-[calc(var(--cut)+2.75rem)] lg:pt-[158px] lg:pb-[calc(var(--cut)+4rem)]">
      <div aria-hidden className="livery absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 70% at 80% 46%, rgba(237,179,38,0.17) 0%, rgba(193,146,49,0.05) 46%, transparent 76%)",
        }}
      />

      <div className="shell relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-7">
            <Reveal className="hidden sm:block">
              <span className="hero-rule speed-rule" aria-hidden />
            </Reveal>

            <Reveal delay={1}>
              <h1 className="max-w-[21ch] text-[clamp(31px,4vw,58px)] leading-[1.0] text-white sm:mt-7 lg:mt-6">
                {h.h1}
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <h2 className="mt-4 max-w-[44ch] font-[family-name:var(--font-sub)] text-[16.5px] leading-[1.3] font-semibold tracking-[0.03em] text-gold sm:text-[19px] xl:mt-5 xl:text-[21px]">
                {h.title}
              </h2>
            </Reveal>

            <Reveal delay={3}>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-[26px] font-normal text-white/85 xl:mt-5 xl:text-[18px] xl:leading-[29px]">
                {h.lead}
              </p>
            </Reveal>

            <Reveal delay={4}>
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-2 lg:gap-x-5 xl:mt-8 xl:grid-cols-3">
                {h.trust.map((t) => (
                  <li
                    key={t.label}
                    className="flex items-center gap-2.5 font-[family-name:var(--font-ui)] text-[12.5px] leading-[17px] text-white/90 sm:text-[13px]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold ring-1 ring-gold/35">
                      <Icon name={t.icon as IconName} size={16} />
                    </span>
                    {t.label}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={5}>
              <div id="moto-hero-actions" className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:mt-9">
                <BookButton label={h.bookLabel} className="w-full sm:w-auto" />
                <WhatsAppButton label={h.whatsappLabel} className="w-full sm:w-auto" />
              </div>
            </Reveal>

            <Reveal delay={5}>
              <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2 sm:gap-8 lg:mt-10">
                {h.body.map((p) => (
                  <p key={p} className="text-[15px] leading-[25px] font-normal text-white/65">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={4} className="lg:col-span-5">
            <figure className="surface relative overflow-hidden">
              <div className="relative aspect-[16/10] w-full sm:aspect-[1024/636]">
                <Image
                  src={PHOTOS.hero.src}
                  alt={PHOTOS.hero.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className="object-cover object-[50%_60%]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(13,13,13,0.9),transparent)]"
                />
              </div>
              <ul className="grid grid-cols-3 divide-x divide-white/[0.08] border-t border-white/[0.08]">
                {PACKAGES.map((p) => (
                  <li key={p.name}>
                    <a
                      href={`#${packageId(p)}`}
                      className={`group flex h-full flex-col px-2.5 py-3.5 transition-colors hover:bg-white/[0.03] sm:px-5 sm:py-4 ${
                        p.badge ? "bg-gold/[0.07]" : ""
                      }`}
                    >
                      <span className="font-[family-name:var(--font-ui)] text-[10.5px] leading-[14px] tracking-[0.12em] text-white/60 uppercase sm:text-[11px] sm:tracking-[0.16em]">
                        {p.short}
                      </span>
                      <span className="mt-auto flex flex-wrap items-baseline gap-x-1.5 pt-1.5">
                        <span className="text-[12px] font-normal text-white/50">from</span>
                        <span className="font-[family-name:var(--font-display)] text-[24px] leading-none whitespace-nowrap text-gold sm:text-[30px] lg:text-[22px] xl:text-[30px]">
                          {p.price}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 2. Three packages ────────────────────────────────────────────────────
   "Desktop: 3 package cards side-by-side. Mobile: stacked vertically. …
   Every package needs its own BOOK NOW button. Do not hide the package
   contents inside accordions on mobile." So every line is printed, the time
   and the button share a baseline across the row, and Deep Valet takes the
   gold and the badge. */

function Packages() {
  const s = MOTORCYCLE.packages;
  return (
    <section id="packages" className="w-full scroll-mt-24 py-16 lg:py-[104px]">
      <div className="shell">
        <SectionHead title={s.heading} />

        {/* Three rows per card — the pitch, the hairline, the list — shared
            through subgrid from `lg`, so the three "What's Included" lines sit
            on one level however long each card's pitch runs. */}
        <ul className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-6 lg:gap-y-0">
          {s.items.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i} className="flex lg:row-span-3 lg:grid lg:grid-rows-subgrid">
              <PackageCard p={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PackageCard({ p }: { p: Package }) {
  const s = MOTORCYCLE.packages;
  const featured = Boolean(p.badge);

  return (
    <article
      id={packageId(p)}
      className={`relative flex w-full scroll-mt-28 flex-col overflow-hidden rounded-[14px] md:grid md:grid-cols-2 lg:row-span-3 lg:grid-cols-1 lg:grid-rows-subgrid ${
        featured
          ? "bg-gold-wash text-ink shadow-[0_30px_70px_-34px_rgba(193,146,49,0.85)] lg:-my-4"
          : "surface"
      }`}
    >
      <div className={`p-7 sm:p-8 ${featured ? "lg:pt-12" : ""}`}>
        {p.badge && (
          <span className="absolute top-0 right-7 rounded-b-[10px] bg-ink px-3.5 py-2 font-[family-name:var(--font-ui)] text-[10.5px] font-semibold tracking-[0.18em] text-gold uppercase sm:right-8">
            {p.badge}
          </span>
        )}
        <h3
          className={`max-w-[14ch] font-[family-name:var(--font-sub)] text-[24px] leading-[1.1] tracking-[0.02em] uppercase sm:text-[26px] ${
            featured ? "pr-24 text-ink sm:pr-0" : "text-white"
          }`}
        >
          {p.name}
        </h3>

        <p className="mt-5 flex items-baseline gap-2">
          <span className={`text-[14px] font-normal ${featured ? "text-ink/70" : "text-white/55"}`}>From</span>
          <span
            className={`font-[family-name:var(--font-display)] text-[52px] leading-none lg:text-[58px] ${
              featured ? "text-ink" : "text-gold"
            }`}
          >
            {p.price}
          </span>
        </p>

        <p
          className={`mt-5 text-[15px] leading-[24px] font-normal ${featured ? "text-ink/85" : "text-white/80"}`}
        >
          <span className={`font-semibold ${featured ? "text-ink" : "text-white"}`}>{s.idealForLabel}</span>{" "}
          {p.idealFor}
        </p>
        <p className={`mt-3 text-[15px] leading-[24px] font-normal ${featured ? "text-ink/85" : "text-body"}`}>
          {p.body}
        </p>
      </div>

      <span aria-hidden className={`block h-px w-full md:hidden lg:block ${featured ? "bg-ink/15" : "bg-white/[0.08]"}`} />

      {/* On a tablet the card is two columns, the pitch beside the list,
          rather than a 700px-wide card with the list down one edge of it. */}
      <div
        className={`flex flex-1 flex-col p-7 sm:p-8 md:border-l lg:border-l-0 ${
          featured ? "md:border-ink/15 md:pt-12 lg:pt-8" : "md:border-white/[0.08]"
        }`}
      >
        <h4
          className={`font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.2em] uppercase ${
            featured ? "text-ink/70" : "text-gold"
          }`}
        >
          {s.includedHeading}
        </h4>
        <ul className="mt-4 grid gap-2.5">
          {p.included.map((line, i) => {
            const inherits = i === 0 && line.startsWith("Everything in the ");
            return (
              <li
                key={line}
                className={`flex gap-3 text-[15px] leading-[22px] ${
                  inherits
                    ? `font-semibold ${featured ? "text-ink" : "text-white"}`
                    : `font-normal ${featured ? "text-ink/85" : "text-white/80"}`
                }`}
              >
                <span className="mt-px">
                  <Tick onGold={featured} size={20} />
                </span>
                {line}
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pt-8">
          <p
            className={`flex items-center gap-2.5 rounded-[10px] px-4 py-3 text-[14.5px] leading-[20px] font-normal ${
              featured ? "bg-ink/[0.08] text-ink" : "bg-white/[0.04] text-white/85 ring-1 ring-white/[0.06]"
            }`}
          >
            <Icon name="clock" size={18} className={featured ? "text-ink" : "text-gold"} />
            <span>
              <span className="font-semibold">{s.timeLabel}</span> {p.time}
            </span>
          </p>
          <BookButton label={p.bookLabel} tone={featured ? "dark" : "gold"} inCard className="mt-4 w-full" />
        </div>
      </div>
    </article>
  );
}

/* ── 3. Which should I choose? + the comparison ───────────────────────────
   The copy's three "Choose this if…" answers, then Section 3's "clean
   comparison table showing the main differences between £75 / £110 / £150.
   Make it horizontally scrollable on smaller mobile devices if required."

   It turned out not to be required. Scrolled sideways on a 390px phone the
   table showed its row names and one package at a time, which is the one
   thing a comparison must not do. So below 640px the same rows are stacked —
   each line on its own, its three ticks under the three package names, and
   the names held under the header while the rows scroll past — and from
   640px up it is the table. CSS shows one of the two; the hidden one is
   `display: none`, so a screen reader meets the comparison once. */

function Choose() {
  const c = MOTORCYCLE.choose;
  const n = c.notSure;

  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell">
        <SectionHead title={c.heading} tone="gold" />

        <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-12 lg:gap-5">
          {c.items.map((it, i) => {
            const featured = Boolean(PACKAGES[i]?.badge);
            return (
              <Reveal
                as="li"
                key={it.short}
                delay={i}
                className={`surface-on-gold relative flex flex-col overflow-hidden p-6 sm:p-7 ${
                  featured ? "ring-2 ring-ink/60" : ""
                }`}
              >
                <h3 className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-[family-name:var(--font-sub)] text-[21px] leading-tight tracking-[0.02em] text-white uppercase">
                    {it.short}
                  </span>
                  <span className="font-[family-name:var(--font-ui)] text-[13px] tracking-[0.06em] text-white/55">
                    — From <span className="font-semibold text-gold">{it.price}</span>
                  </span>
                </h3>
                <p className="mt-3 text-[15px] leading-[25px] font-normal text-white/75">{it.body}</p>
                <span aria-hidden className="mt-auto block pt-5">
                  <span className="block h-[3px] w-9 rounded-full bg-gold" />
                </span>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={1}>
          <CompareStacked />
          <div className="surface-on-gold relative mt-6 hidden overflow-hidden sm:block lg:mt-8">
            <div className="overflow-x-auto overscroll-x-contain">
              <table
                className="w-full min-w-[600px] border-collapse text-left"
                aria-label={`${c.heading} — ${PACKAGES.map((p) => `${p.short} ${p.price}`).join(", ")}`}
              >
                <thead>
                  <tr className="border-b border-white/10">
                    <td className="sticky left-0 z-10 w-[40%] bg-ink p-4 sm:p-6" />
                    {PACKAGES.map((p) => (
                      <th
                        key={p.name}
                        scope="col"
                        className={`p-4 text-center align-bottom sm:p-6 ${p.badge ? "bg-gold/[0.09]" : ""}`}
                      >
                        {p.badge && (
                          <span className="mb-2.5 inline-block rounded-full bg-gold px-2.5 py-1 font-[family-name:var(--font-ui)] text-[9.5px] font-semibold tracking-[0.16em] text-ink uppercase">
                            {p.badge}
                          </span>
                        )}
                        <span className="block font-[family-name:var(--font-sub)] text-[15px] leading-tight tracking-[0.04em] text-white uppercase sm:text-[17px]">
                          {p.short}
                        </span>
                        <span className="mt-1.5 flex items-baseline justify-center gap-1">
                          <span className="text-[12px] font-normal text-white/50">from</span>
                          <span className="font-[family-name:var(--font-display)] text-[28px] leading-none text-gold sm:text-[34px]">
                            {p.price}
                          </span>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.compare.map((line) => {
                    const has = tiersWith(line);
                    return (
                      <tr key={line} className="border-b border-white/[0.06]">
                        <th
                          scope="row"
                          className="sticky left-0 z-10 bg-ink px-4 py-3.5 text-[14px] leading-[20px] font-normal text-white/85 sm:px-6 sm:text-[15px]"
                        >
                          {line}
                        </th>
                        {has.map((yes, i) => (
                          <td
                            key={PACKAGES[i].name}
                            className={`px-4 py-3.5 text-center sm:px-6 ${PACKAGES[i].badge ? "bg-gold/[0.09]" : ""}`}
                          >
                            {yes ? (
                              <span className="inline-flex">
                                <Tick size={24} />
                                <span className="sr-only">Included</span>
                              </span>
                            ) : (
                              <span className="inline-flex text-white/25">
                                <Icon name="minus" size={18} />
                                <span className="sr-only">Not included</span>
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  <tr>
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-ink px-4 py-4 font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.16em] text-gold uppercase sm:px-6"
                    >
                      {MOTORCYCLE.packages.timeLabel.replace(/:$/, "")}
                    </th>
                    {PACKAGES.map((p) => (
                      <td
                        key={p.name}
                        className={`px-4 py-4 text-center text-[14px] font-semibold whitespace-nowrap text-white sm:px-6 sm:text-[15px] ${
                          p.badge ? "bg-gold/[0.09]" : ""
                        }`}
                      >
                        {p.timeShort}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-6 flex flex-col gap-5 rounded-[14px] bg-ink/[0.92] p-6 sm:p-7 lg:mt-8 lg:p-8 xl:flex-row xl:items-center xl:justify-between xl:gap-10">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/35">
                <Icon name="camera" size={22} />
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-sub)] text-[20px] leading-tight tracking-[0.02em] text-white uppercase sm:text-[22px]">
                  {n.title}
                </h3>
                <p className="mt-2 max-w-[56ch] text-[15px] leading-[24px] font-normal text-white/75">{n.body}</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <WhatsAppButton label={n.whatsappLabel} className="w-full sm:w-auto" />
              <BookButton label={n.bookLabel} className="w-full sm:w-auto" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The comparison below 640px: one row per line, three ticks under it. */
function CompareStacked() {
  const c = MOTORCYCLE.choose;
  return (
    <div className="mt-6 rounded-[14px] bg-ink shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08),0_20px_44px_-26px_rgb(0_0_0/0.5)] sm:hidden">
      {/* Held under the site header (90px on a phone) while the rows pass. */}
      <div className="sticky top-[90px] z-10 grid grid-cols-3 gap-1.5 rounded-t-[14px] border-b border-white/10 bg-ink px-2.5 pt-4 pb-3.5">
        {PACKAGES.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col items-center rounded-[10px] px-1 py-2 text-center ${
              p.badge ? "bg-gold/[0.12] ring-1 ring-gold/40" : ""
            }`}
          >
            <span className="font-[family-name:var(--font-sub)] text-[13px] leading-[1.15] tracking-[0.03em] text-white uppercase">
              {p.short}
            </span>
            <span className="mt-1 font-[family-name:var(--font-display)] text-[24px] leading-none text-gold">
              {p.price}
            </span>
          </div>
        ))}
      </div>
      <ul>
        {c.compare.map((line) => {
          const has = tiersWith(line);
          return (
            <li key={line} className="border-b border-white/[0.06] px-2.5 pt-3.5 pb-3">
              <p className="px-1.5 text-[14px] leading-[20px] font-normal text-white/85">{line}</p>
              <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                {has.map((yes, i) => (
                  <span key={PACKAGES[i].name} className="flex justify-center">
                    {yes ? <Tick size={22} /> : <Icon name="minus" size={18} className="text-white/25" />}
                    <span className="sr-only">
                      {PACKAGES[i].short}: {yes ? "included" : "not included"}
                    </span>
                  </span>
                ))}
              </div>
            </li>
          );
        })}
        <li className="px-2.5 pt-3.5 pb-4">
          <p className="px-1.5 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold tracking-[0.16em] text-gold uppercase">
            {MOTORCYCLE.packages.timeLabel.replace(/:$/, "")}
          </p>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
            {PACKAGES.map((p) => (
              <span key={p.name} className="text-center text-[13.5px] font-semibold text-white">
                <span className="sr-only">{p.short}: </span>
                {p.timeShort}
              </span>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
}

/* ── 5. Mobile service ────────────────────────────────────────────────────
   "Image of Medusa technician/van alongside copy explaining that the
   customer doesn't need to travel to a studio. CTA underneath." The van is
   Medusa's own, out of its promotional film. On a phone the copy and its
   button come first and the photograph follows. */

function MobileService() {
  const m = MOTORCYCLE.mobile;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal delay={1} className="order-last lg:order-first lg:col-span-6">
          <figure className="relative overflow-hidden rounded-[14px] ring-1 ring-white/[0.08]">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={PHOTOS.van.src}
                alt={PHOTOS.van.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full bg-ink/85 py-2 pr-4 pl-2.5 font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.14em] text-white uppercase ring-1 ring-white/10 backdrop-blur-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-ink">
                <Icon name="van" size={15} strokeWidth={2} />
              </span>
              {MOTORCYCLE.hero.trust[0].label}
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-6">
          <SectionHead title={m.heading} />
          <Reveal delay={2}>
            <h3 className="mt-5 font-[family-name:var(--font-sub)] text-[20px] leading-[1.25] font-semibold tracking-[0.03em] text-gold uppercase lg:text-[23px]">
              {m.title}
            </h3>
          </Reveal>
          <Reveal delay={3}>
            <p className="mt-4 text-[18px] leading-[28px] font-semibold text-white">{m.body[0]}</p>
            {m.body.slice(1).map((p) => (
              <p key={p} className="measure mt-4 text-[16px] leading-[27px] font-normal text-body">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={4}>
            <BookButton label={m.cta} className="mt-8 w-full sm:w-auto" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 6. Safe cleaning / exclusions ────────────────────────────────────────
   "This section is important. … Use a clean information box rather than
   making the section look like a large legal disclaimer." So the exclusions
   are a quiet two-column list inside one dark panel, marked with a muted
   dash rather than a red cross, and the panel closes on the two sentences
   that say what that means on the day. */

function SafeCleaning() {
  const s = MOTORCYCLE.safe;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead title={s.heading} tone="gold" />
            <Reveal delay={3}>
              {s.bodyHtml.map((html) => (
                <p
                  key={html}
                  className="mt-5 text-[16.5px] leading-[28px] font-normal text-ink/85 [&_strong]:font-semibold [&_strong]:text-ink"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ))}
            </Reveal>
          </div>
        </div>

        <Reveal delay={2} className="lg:col-span-7">
          <div className="surface-on-gold p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/35">
                <Icon name="info" size={20} />
              </span>
              <h3 className="font-[family-name:var(--font-ui)] text-[12px] font-semibold tracking-[0.22em] text-gold uppercase">
                {s.noteTitle}
              </h3>
            </div>
            <p
              className="mt-5 text-[16px] leading-[26px] font-normal text-white/85 [&_strong]:font-semibold [&_strong]:text-white"
              dangerouslySetInnerHTML={{ __html: s.noteLeadHtml }}
            />
            {/* Chips on a phone, where fourteen rows one above the other ran
                the box to 600px and read as the small print it is not meant
                to be; a two-column list from `sm`. */}
            <ul className="mt-5 flex flex-wrap gap-2 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-0">
              {s.exclusions.map((x) => (
                <li
                  key={x}
                  className="flex gap-3 rounded-full bg-white/[0.05] px-3.5 py-1.5 text-[13.5px] leading-[20px] font-normal text-white/80 ring-1 ring-white/[0.08] sm:rounded-none sm:border-b sm:border-white/[0.06] sm:bg-transparent sm:px-0 sm:py-2.5 sm:text-[14.5px] sm:leading-[21px] sm:text-white/75 sm:ring-0"
                >
                  <Icon
                    name="minus"
                    size={16}
                    strokeWidth={2.2}
                    className="mt-[2px] hidden shrink-0 text-gold/70 sm:block"
                  />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-7 grid gap-3">
              {s.after.map((a) => (
                <p
                  key={a}
                  className="flex gap-3 rounded-[10px] bg-white/[0.04] px-4 py-3 text-[14.5px] leading-[22px] font-normal text-white/85 ring-1 ring-white/[0.06]"
                >
                  <Icon name="info" size={18} className="mt-[2px] shrink-0 text-gold" />
                  {a}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 7. Why Medusa ────────────────────────────────────────────────────────
   "Use icon cards for the major trust benefits." Six, three across. */

function WhyMedusa() {
  const w = MOTORCYCLE.why;
  return (
    <section className="w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionHead title={w.heading} />
            <Reveal delay={2}>
              <h3 className="mt-5 font-[family-name:var(--font-sub)] text-[19px] leading-[1.25] font-semibold tracking-[0.03em] text-gold uppercase lg:text-[23px]">
                {w.title}
              </h3>
            </Reveal>
          </div>
          <Reveal delay={3} className="w-full sm:w-auto">
            <BookButton label={w.bookLabel} className="w-full sm:w-auto" />
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {w.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i % 3} className="surface group relative overflow-hidden p-7">
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gold/12 text-gold ring-1 ring-gold/35">
                <Icon name={it.icon as IconName} size={24} />
              </span>
              <h4 className="mt-6 font-[family-name:var(--font-sub)] text-[20px] leading-tight text-white uppercase">
                {it.title}
              </h4>
              <p className="mt-3 text-[15px] leading-[25px] font-normal text-body">{it.body}</p>
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

/* ── Motorcycle valeting prices ───────────────────────────────────────────
   The copy's table — Package | From | Approx. Time, the two number columns
   right-aligned as written — beside its condition note. */

function Prices() {
  const pr = MOTORCYCLE.prices;
  return (
    <section className="w-full bg-gold-wash py-16 lg:py-[104px]">
      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHead title={pr.heading} tone="gold" />
          <Reveal delay={3}>
            <p className="mt-6 text-[16.5px] leading-[27px] font-semibold text-ink">{pr.note}</p>
            <p className="mt-3 text-[16px] leading-[27px] font-normal text-ink/80">{pr.body}</p>
          </Reveal>
        </div>

        <Reveal delay={2} className="lg:col-span-7">
          <div className="surface-on-gold overflow-hidden">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10">
                  {pr.columns.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className={`px-2 py-4 font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.16em] text-gold uppercase min-[400px]:px-3 sm:px-7 sm:py-5 sm:tracking-[0.18em] ${
                        i > 0 ? "text-right" : ""
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PACKAGES.map((p) => (
                  <tr key={p.name} className="border-b border-white/[0.06] last:border-b-0">
                    <th
                      scope="row"
                      className="px-2 py-5 font-[family-name:var(--font-sub)] text-[16px] leading-tight font-normal tracking-[0.02em] text-white uppercase min-[400px]:px-3 sm:px-7 sm:text-[19px]"
                    >
                      <a href={`#${packageId(p)}`} className="hover:text-gold">
                        {p.name}
                      </a>
                      {p.badge && (
                        <span className="mt-1.5 block font-[family-name:var(--font-ui)] text-[9.5px] font-semibold tracking-[0.16em] text-gold sm:mt-0 sm:ml-2.5 sm:inline-block sm:align-middle">
                          {p.badge}
                        </span>
                      )}
                    </th>
                    <td className="px-2 py-5 text-right font-[family-name:var(--font-display)] text-[24px] leading-none whitespace-nowrap text-gold min-[400px]:px-3 sm:px-7 sm:text-[32px]">
                      {p.price}
                    </td>
                    <td className="px-2 py-5 text-right text-[13.5px] leading-[19px] font-normal text-white/80 min-[400px]:px-3 sm:px-7 sm:text-[15px] sm:whitespace-nowrap">
                      {p.timeShort}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 9. FAQ ─────────────────────────────────────────────────────────────── */

function Faq() {
  const f = MOTORCYCLE.faq;
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

/* ── 10. Delivered to your door + the final booking band ──────────────────
   "Strong full-width booking section: READY TO GET YOUR MOTORCYCLE LOOKING
   ITS BEST?" The copy's closing section leads, with its three prices, and
   the gold panel under it spans the shell — the last thing on the page is
   the way to book. The sticky bar steps aside while this is on screen; the
   panel carries the same two buttons. */

function Closing() {
  const c = MOTORCYCLE.closing;
  const f = MOTORCYCLE.finalCta;
  return (
    <section
      id="moto-final"
      className="cut-top relative w-full overflow-hidden bg-ink-panel pt-[calc(var(--cut)+4rem)] pb-16 lg:pb-[104px]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "radial-gradient(80% 90% at 50% 0%, rgba(193,146,49,0.16) 0%, transparent 62%)",
        }}
      />
      <div className="shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHead title={c.heading} />
            <Reveal delay={3}>
              {c.body.map((p) => (
                <p key={p} className="measure mt-5 text-[16px] leading-[27px] font-normal text-body">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal delay={2} className="lg:col-span-5">
            <ul className="surface divide-y divide-white/[0.07]">
              {PACKAGES.map((p) => (
                <li key={p.name}>
                  <a
                    href={`#${packageId(p)}`}
                    className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-white/[0.03] sm:px-7"
                  >
                    <span className="font-[family-name:var(--font-sub)] text-[18px] leading-tight tracking-[0.03em] text-white uppercase sm:text-[20px]">
                      {p.short}
                    </span>
                    <span className="flex shrink-0 items-baseline gap-1.5">
                      <span className="text-[13px] font-normal text-white/55">From</span>
                      <span className="font-[family-name:var(--font-display)] text-[30px] leading-none text-gold">
                        {p.price}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="relative mt-12 overflow-hidden rounded-[18px] bg-gold-wash px-6 py-9 sm:px-10 sm:py-11 lg:mt-16 lg:px-14 lg:py-14">
            {/* Side by side from `xl`: at 1024 the two buttons took 489px of a
                722px row and pushed past it. */}
            <div className="relative flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between xl:gap-12">
              <div>
                <p className="max-w-[22ch] font-[family-name:var(--font-heading)] text-[28px] leading-[1.02] font-black text-ink uppercase sm:text-[36px] lg:text-[44px]">
                  {f.heading}
                </p>
                <p className="mt-4 text-[17px] leading-[27px] font-normal text-ink/80">{f.body}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <BookButton label={f.bookLabel} tone="dark" className="w-full sm:w-auto" />
                <WhatsAppButton label={f.whatsappLabel} onGold className="w-full sm:w-auto" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
