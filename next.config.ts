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
