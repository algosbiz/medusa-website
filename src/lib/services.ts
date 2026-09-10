/**
 * One list covering all 22 priced services, built from the three separate
 * sources in site.ts so a single section can present them together.
 *
 * All three are quoted per vehicle class (the site's own FAQ says as much
 * for washes too: "prices vary depending on the size of the vehicle"), so
 * every row carries a `prices` tuple read by the same `VehicleClassPicker` /
 * `ClassPrice` control. `priceLabel` survives as the verbatim "£low-£high"
 * range for surfaces that quote a wash without a class picker to hand.
 * Each row also exposes a numeric `from` so the whole set can be ordered on
 * one scale.
 */
import {
  CARWASH,
  DETAILING,
  INCLUDED,
  VALETING,
  type Included,
} from "@/lib/site";

export type ServiceKind = "wash" | "valeting" | "detailing";

export type Service = {
  kind: ServiceKind;
  title: string;
  subtitle: string;
  /** Lowest advertised price, for sorting and for the "from" label. */
  from: number;
  /** Per-vehicle-class prices, where the service is quoted that way. */
  prices?: readonly [number, number, number, number];
  /** Verbatim range, where the service is quoted that way. */
  priceLabel?: string;
  duration?: string;
  features?: readonly string[];
  image?: string;
  href?: string;
  /** Opens the inclusions dialog instead of navigating. */
  included?: Included;
  badge?: string;
};

export const KIND_LABEL: Record<ServiceKind, string> = {
  wash: "Car Wash",
  valeting: "Valeting",
  detailing: "Detailing",
};

const washes: Service[] = CARWASH.map((w) => ({
  kind: "wash",
  title: w.title,
  subtitle: "Mobile Car Wash",
  from: w.prices[0],
  prices: w.prices,
  priceLabel: w.price,
  duration: w.time.replace(/[()]/g, ""),
  features: w.features,
  image: w.image,
  href: w.href,
}));

const valets: Service[] = VALETING.map((p) => ({
  kind: "valeting",
  title: p.title,
  subtitle: p.subtitle,
  from: p.prices[0],
  prices: p.prices,
  included: INCLUDED[p.included],
  badge: p.badge,
}));

const details: Service[] = DETAILING.map((d) => ({
  kind: "detailing",
  title: d.title,
  subtitle: d.subtitle,
  from: d.prices[0],
  prices: d.prices,
  href: d.href,
}));

export const SERVICES: Service[] = [...washes, ...valets, ...details];

export const BY_KIND: Record<ServiceKind, Service[]> = {
  wash: washes,
  valeting: valets,
  detailing: details,
};

/** Cheapest first — the ladder runs £35 to £1,200. */
export const BY_PRICE: Service[] = [...SERVICES].sort((a, b) => a.from - b.from);
