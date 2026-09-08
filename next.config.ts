import type { NextConfig } from "next";
import { REDIRECTS } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  /*
    The old site is WordPress, so every URL with any history behind it ends in
    a slash - and Next resolves the trailing-slash normalisation before it
    consults the redirect table. Without this, /valeting/ would 308 to
    /valeting and only then to /car-valeting/: a two-hop chain on the exact
    form of the URL these redirects exist to catch.
  */
  trailingSlash: true,

  /*
    Next's image optimiser is off, and this is a billing decision rather than a
    technical one.

    Vercel's Image Optimization quota ran out, so every /_next/image request
    answered `402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED` - 99 bytes of plain
    text where a photograph should be. Because every `next/image` on the site
    routes through it, that emptied all 525 images on all 254 pages at once,
    while the files themselves kept serving fine from /assets.

    Unoptimised, `next/image` emits a plain <img> pointing at the file on disk.
    What that costs is per-viewport resizing, not format: the assets are
    mirrored from WordPress and are already .webp at a median of 54 KB, so a
    phone now fetches the desktop-sized file. /mobile-car-wash is the heaviest
    case at 21 images totalling 0.97 MB.

    Delete this block the moment the plan is upgraded or the quota resets;
    nothing else has to change.
  */
  images: {
    unoptimized: true,
  },

  /*
    Everything under /assets is a file mirrored from the WordPress uploads
    directory: a dated path, written once by `npm run content` and then left
    alone. Vercel serves `public/` with `max-age=0, must-revalidate` by
    default, so all 37 images on the homepage were revalidated on every
    repeat visit - Pingdom grades that "Add Expires headers: D".

    A month of freshness with a year of stale-while-revalidate: a replaced
    file still reaches a returning visitor, it just does so on the next
    request rather than blocking this one.
  */
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=31536000",
          },
        ],
      },
    ];
  },

  async redirects() {
    return REDIRECTS.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
