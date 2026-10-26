import Link from "next/link";
import { breadcrumbTrail } from "@/lib/breadcrumbs";
import { SITE } from "@/lib/site";

/**
 * The visible half of every page's `BreadcrumbList`.
 *
 * Added 2026-10-23 on the client's content-gap list (A1): 351 pages emitted a
 * trail that no page showed, and Google's guidelines say not to mark up
 * content readers cannot see. It reads `breadcrumbTrail` — the function the
 * JSON-LD is built from — so the names and their order cannot differ from the
 * markup.
 *
 * Every crumb is a link but the last, which is the page itself.
 *
 * **One line, always.** On a phone a three-rung trail wraps to two, and on the
 * hand-built headers that start their h1 at 130px the second line lands on it.
 * The last crumb truncates instead; its full text stays in the page.
 *
 * **It is laid over the top of the page rather than into it.** Thirty-odd
 * routes open on thirty-odd different headers, each already sized to clear the
 * fixed navigation, and putting a row into every one of them would move every
 * header on the site. The wrapper is a zero-height row at the top of `<main>`;
 * the trail sits in the clear band between the navigation and the page's own
 * first line, which is the one gap they all leave.
 *
 * The homepage has none, as in the schema.
 */
export default function Breadcrumbs({ slug }: { slug: string }) {
  if (!slug) return null;
  const trail = breadcrumbTrail(slug);

  return (
    <div className="relative z-20 h-0">
      <nav
        aria-label="Breadcrumb"
        className="shell absolute inset-x-0 top-[96px] lg:top-[148px]"
      >
        <ol className="flex flex-nowrap items-center gap-x-2 overflow-hidden text-[12.5px] leading-[18px] font-normal text-white/70 [text-shadow:0_1px_6px_rgba(0,0,0,0.55)] lg:text-[13px]">
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.url} className={`flex items-center gap-x-2 ${last ? "min-w-0" : "shrink-0"}`}>
                {last ? (
                  <span aria-current="page" className="min-w-0 truncate text-white">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.url.slice(SITE.length) || "/"}
                      className="transition-colors hover:text-gold focus-visible:text-gold"
                    >
                      {crumb.name}
                    </Link>
                    <span aria-hidden className="text-white/40">
                      ›
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
