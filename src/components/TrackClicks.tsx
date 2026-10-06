"use client";

import { useEffect } from "react";
import { EVENTS, track } from "@/lib/track";

/**
 * One listener for every conversion click on the page it is mounted on.
 *
 * A link that carries `data-track="<event>"` fires that event. Three kinds are
 * recognised without one, because they are rendered by components this page
 * does not own: any `tel:` link (the header's phone number among them) is a
 * phone click, any WhatsApp link (the footer's floating button) is a WhatsApp
 * click, and any `mailto:` link is an email click — the graffiti and paint
 * spill briefs of 2026-10-06 list "Email Click" among their conversions. Delegated rather than wired per link, so a button added
 * later is tracked by carrying the attribute and nothing else.
 *
 * Capture phase, so a link that navigates away still reports first.
 */
export default function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a, button");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const event =
        link.getAttribute("data-track") ??
        (href.startsWith("tel:")
          ? EVENTS.phone
          : href.startsWith("mailto:")
            ? EVENTS.email
            : /(^|\/\/)(wa\.link|wa\.me|api\.whatsapp\.com)\//i.test(href)
              ? EVENTS.whatsapp
              : null);
      if (!event) return;

      track(event, {
        link_text: (link.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 100),
        ...(href ? { link_url: href } : {}),
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
