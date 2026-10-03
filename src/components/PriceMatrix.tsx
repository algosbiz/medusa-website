import type { CSSProperties } from "react";
import Image from "next/image";
import { BOOK_URL, CAR_SIZES } from "@/lib/site";
import { DEFAULT_ACCENT, shortLabel, TIER_ACCENT, type PriceLadder } from "@/lib/table-model";

/**
 * The comparison table's price row, at desktop width.
 *
 * Below the table's breakpoint `TablePrices` asks for the vehicle class once
 * and lists five prices; here there is room for all twenty, so they are laid
 * out as what they are — a matrix of vehicle class against package. Rendered
 * raw, the same row was five 270-character strings
 * (`…Toyota yaris£70Medium Car…`), 704px tall, with the page's main call to
 * action as dead text at the foot of each.
 *
 * Each package is a raised card in its tier colour, on the same column track
 * as the chips over the table, so a price sits under the ticks it buys. The
 * classes run down the label columns once, with the source's own examples,
 * rather than five times over. A row lights across all five cards on hover,
 * which is the comparison a reader came here to make: what does *my* car cost
 * in each.
 *
 * Every word is the cell's own — class, examples, price, duration, button.
 */
export default function PriceMatrix({
  names,
  ladders,
  hasDesc,
}: {
  names: string[];
  ladders: PriceLadder[];
  hasDesc: boolean;
}) {
  // Every package prices the same four classes, in the same order; the first
  // one names them. A package that stops short shows nothing in that row
  // rather than borrowing another class's price.
  const classes = ladders[0]?.rungs ?? [];
  const columns = `${hasDesc ? "440fr" : "200fr"} repeat(${ladders.length}, 110fr)`;
  const accentOf = (j: number) => TIER_ACCENT[shortLabel(names[j] ?? "")] ?? DEFAULT_ACCENT;

  return (
    <div
      role="table"
      className="relative mt-2 grid gap-y-0 border-t-2 border-gold/30 px-0 pt-6 pb-7"
      style={{
        gridTemplateColumns: columns,
        gridTemplateRows: `auto repeat(${classes.length}, minmax(64px, auto)) auto`,
      }}
    >
      {/* The cards: one per package, behind every row it spans. */}
      {ladders.map((_, j) => {
        const accent = accentOf(j);
        return (
          <div
            key={`card-${j}`}
            aria-hidden
            className="pointer-events-none relative mx-[5px] overflow-hidden rounded-[14px] ring-1 ring-white/[0.08]"
            style={{
              gridColumn: j + 2,
              gridRow: "1 / -1",
              background: `linear-gradient(180deg, color-mix(in srgb, ${accent} 20%, #161616) 0%, #141414 34%, #101010 100%)`,
              boxShadow: `0 24px 44px -22px rgb(0 0 0 / 0.95), 0 0 0 1px color-mix(in srgb, ${accent} 14%, transparent), inset 0 1px 0 rgb(255 255 255 / 0.06)`,
            }}
          >
            <span className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: accent }} />
          </div>
        );
      })}

      {/*
        Every row is placed by number. Left to auto-placement, a full-width row
        will not overlap the cards already sitting in rows 1 to n, so it drops
        below all of them and the cards stand empty above their own prices.
      */}
      {/* Package names, so a card 8,000px below the chips still says whose it is. */}
      <div role="row" className="z-10 col-span-full grid grid-cols-subgrid" style={{ gridRow: 1 }}>
        <span role="columnheader" aria-hidden />
        {ladders.map((_, j) => (
          <p
            key={j}
            role="columnheader"
            title={names[j]}
            className="mx-[5px] px-2 pt-5 pb-3 text-center font-[family-name:var(--font-sub)] text-[13.5px] leading-[17px] tracking-[0.12em] uppercase"
            style={{ color: accentOf(j) }}
          >
            {shortLabel(names[j] ?? "")}
          </p>
        ))}
      </div>

      {classes.map((rung, i) => (
        <div
          key={rung.label + i}
          role="row"
          className="group/rung relative z-10 col-span-full grid grid-cols-subgrid items-center"
          style={{ gridRow: i + 2 }}
        >
          {/* The hover band, under the cells and over the cards. */}
          <span
            aria-hidden
            className="absolute inset-y-1 right-0 left-0 rounded-[10px] bg-white/0 transition-colors duration-200 group-hover/rung:bg-white/[0.045]"
          />
          <span
            aria-hidden
            className="absolute inset-y-3 left-0 w-[3px] rounded-full bg-gold opacity-0 transition-opacity duration-200 group-hover/rung:opacity-100"
          />

          <div role="rowheader" className="relative flex items-center gap-4 py-2 pr-6 pl-5">
            {/* The icon is a thin outline with a wide margin baked in, so it is
                drawn larger than its tile and the tile crops the margin. */}
            {CAR_SIZES[i] && (
              <span className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-white/[0.05] ring-1 ring-white/[0.07] transition-colors duration-200 group-hover/rung:bg-gold/15 group-hover/rung:ring-gold/40">
                <Image
                  src={CAR_SIZES[i].icon}
                  alt=""
                  width={200}
                  height={120}
                  className="h-[52px] w-auto max-w-none object-contain"
                />
              </span>
            )}
            <p className="min-w-0">
              <span className="block font-[family-name:var(--font-sub)] text-[15px] leading-[19px] tracking-[0.1em] text-white uppercase">
                {rung.label}
              </span>
              {rung.note && (
                <span className="mt-0.5 block text-[12.5px] leading-[17px] font-normal text-white/50">
                  {rung.note}
                </span>
              )}
            </p>
          </div>

          {ladders.map((ladder, j) => {
            const price = ladder.rungs[i]?.price;
            return (
              <p
                key={j}
                role="cell"
                className="relative mx-[5px] py-2 text-center font-[family-name:var(--font-display)] text-[21px] leading-none text-white transition-colors duration-200 group-hover/rung:text-[var(--accent)]"
                style={{ "--accent": accentOf(j) } as CSSProperties}
              >
                {price}
                <span className="sr-only">
                  {" "}
                  — {shortLabel(names[j] ?? "")}, {rung.label}
                </span>
              </p>
            );
          })}
        </div>
      ))}

      {/* Duration and the booking button, at the foot of each card. */}
      <div
        role="row"
        className="z-10 col-span-full grid grid-cols-subgrid"
        style={{ gridRow: classes.length + 2 }}
      >
        <span role="rowheader" aria-hidden />
        {ladders.map((ladder, j) => (
          <div
            key={j}
            role="cell"
            className="mx-[5px] mt-2 flex flex-col items-center gap-3.5 border-t border-white/[0.07] px-2 pt-4 pb-5 text-center"
          >
            {ladder.duration && (
              <p className="text-[12px] leading-[17px] font-normal text-white/55">{ladder.duration}</p>
            )}
            {ladder.cta && (
              <a
                href={BOOK_URL}
                /* 100px of card at the narrowest width the table shows:
                   enough for the label on one line, but not with padding to
                   spare, so the padding gives way rather than the label. */
                className="btn btn-gold mt-auto w-full px-1 py-2.5 text-[11px] leading-[14px] tracking-[0.05em] whitespace-nowrap"
              >
                {ladder.cta}
                <span className="sr-only"> — {shortLabel(names[j] ?? "")}</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
