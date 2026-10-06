"use client";

import { useEffect, useState } from "react";
import Icon, { type IconName } from "@/components/Icon";

/** One of the bar's two buttons. */
export type BarAction = {
  label: string;
  href: string;
  /** The conversion event a click fires (`components/TrackClicks`). */
  track?: string;
  icon?: IconName;
  /** Opens in a new tab — for a link that leaves the site. */
  external?: boolean;
};

/**
 * The phone-width booking bar: a gold primary action and an outlined second
 * one, side by side at the foot of the screen.
 *
 * Fourteen pages carry it, all from the client's briefs of 2026-10-06:
 *   - `/car-detailing/alloy-wheel-protection` — "MOBILE STICKY CTA — Use:
 *     BOOK £159 | CHECK FITMENT";
 *   - `/vehicles/motorcycle-valeting-detailing` — "Add a sticky mobile CTA at
 *     the bottom of the screen: BOOK NOW | WHATSAPP";
 *   - `/car-interior-cleaning/vomit-cleaning` — "Sticky Mobile Bar — BOOK
 *     NOW | WHATSAPP";
 *   - `/commercial-valeting/car-van-stickers-removal` — "Add a sticky bottom
 *     bar: GET QUOTE | WHATSAPP", whose GET QUOTE is the page's own form;
 *   - `/car-interior-cleaning/pet-hair-removal` — "MOBILE STICKY CTA — Use:
 *     BOOK TRITON + PET HAIR", one action and nothing beside it, so
 *     `secondary` is optional and the one button takes the bar's width. The
 *     footer's floating WhatsApp button is still there, lifted above it;
 *   - `/car-interior-cleaning/odour-removal` — "Use: BOOK VALET + ODOUR
 *     TREATMENT. Do not use: BOOK OZONE", one action again;
 *   - the second batch the same day, each with its brief's wording: steam
 *     cleaning "BOOK A VALET | WHATSAPP", headlight "BOOK NOW | WHATSAPP",
 *     engine bay "BOOK £100 | WHATSAPP", car wax "BOOK VALET + WAX" (alone),
 *     and the four quote pages — graffiti, interior paint spill, flooded car
 *     and caravan — "GET QUOTE | WHATSAPP", where GET QUOTE is the page's own
 *     form and the bar also steps aside over it.
 *
 * It only appears once the hero's own buttons have scrolled away, and it
 * steps aside again while the reader is over any element named in `hideOver`
 * — a form, or a closing call to action that already carries the same two
 * choices, where the bar would otherwise sit over that section's own buttons.
 *
 * From `lg` up it is never shown: there the header's Book Now is always in
 * view. While it is up, `globals.css` lifts the footer's WhatsApp button
 * above it and pads the page foot by its height (the `.sticky-book` rules), so
 * it never covers either.
 */
export default function StickyBookBar({
  primary,
  secondary,
  after,
  hideOver,
}: {
  primary: BarAction;
  secondary?: BarAction;
  /** The element whose leaving the viewport (upwards) brings the bar in. */
  after: string;
  /** Elements the bar gives way to while any part of them is on screen. */
  hideOver: string[];
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const start = document.getElementById(after);
    if (!start || typeof IntersectionObserver === "undefined") return;

    let past = false;
    const covering = new Set<Element>();
    const update = () => setShown(past && covering.size === 0);

    const pastObserver = new IntersectionObserver(([entry]) => {
      past = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      update();
    });
    pastObserver.observe(start);

    const coverObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) covering.add(entry.target);
        else covering.delete(entry.target);
      }
      update();
    });
    for (const id of hideOver) {
      const el = document.getElementById(id);
      if (el) coverObserver.observe(el);
    }

    return () => {
      pastObserver.disconnect();
      coverObserver.disconnect();
    };
  }, [after, hideOver]);

  return (
    <div
      className="sticky-book fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-[var(--ease-out-expo)] data-[shown=false]:translate-y-full lg:hidden"
      data-shown={shown}
      aria-hidden={!shown}
      inert={!shown}
    >
      <div className="flex gap-2.5 border-t border-white/10 bg-ink-panel/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md">
        <BarLink action={primary} className="btn-gold" />
        {secondary && <BarLink action={secondary} className="btn-outline" />}
      </div>
    </div>
  );
}

function BarLink({ action, className }: { action: BarAction; className: string }) {
  return (
    <a
      href={action.href}
      data-track={action.track}
      {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`btn ${className} min-h-[48px] flex-1 rounded-full px-3 text-[13.5px] whitespace-nowrap`}
    >
      {action.icon && <Icon name={action.icon} size={18} className="mr-2 shrink-0" />}
      {action.label}
    </a>
  );
}
