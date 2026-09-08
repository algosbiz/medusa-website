"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A Google My Maps embed, held back until it is nearly on screen.
 *
 * `loading="lazy"` is not enough on its own: Chrome's threshold for iframes is
 * generous on a fast connection, and Pingdom measured the map pulling 542 KB
 * across six requests to three Google origins before the page had finished
 * loading — a third of the homepage's weight, for a panel two thirds of the
 * way down it.
 *
 * The observer starts it 500px out, which on any real scroll is well before a
 * visitor reaches it. No-JS visitors and crawlers get the plain iframe from
 * the `<noscript>` below, so nothing is hidden from either.
 */
export default function MapEmbed({
  src,
  title,
  className = "",
}: {
  src: string;
  title: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver !== "function") {
      const t = setTimeout(() => setShow(true), 0);
      return () => clearTimeout(t);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShow(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "500px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    /* The min-height is the iframe's own, held whether or not it has
        mounted: without it the grid cell collapses and the map's arrival
        shifts the row. */
    <div ref={ref} className={`h-full min-h-[420px] bg-ink-panel ${className}`}>
      {show && (
        <iframe
          src={src}
          title={title}
          className="h-full min-h-[420px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
      <noscript>
        <iframe
          src={src}
          title={title}
          className="h-full min-h-[420px] w-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
    </div>
  );
}
