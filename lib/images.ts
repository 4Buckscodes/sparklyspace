/**
 * Central image registry.
 *
 * Every photo used across the site is declared here so that:
 *  - alt text, dimensions and aspect ratios stay consistent,
 *  - services and locations can be mapped to relevant proof imagery,
 *  - ordering the gallery is a data edit, not a component edit.
 *
 * These are REAL Sparkly Space job photographs (supplied Nov 2026), exported to
 * WebP at 1600px on the long edge, metadata stripped, EXIF rotation applied.
 *
 * House rules for new images:
 *  1. Real photographs of real jobs only. No AI scenes, no stock filler.
 *  2. Never caption a photo as a specific customer's address unless you have
 *     permission. Caption the finish, room or task instead.
 *  3. Before/after must be the same room, same angle. If the framing differs,
 *     use the side-by-side pair, never the slider.
 *  4. Filenames: lowercase, hyphenated, subject-first (`oven-detail.webp`).
 */

export interface SiteImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface JobPhoto extends SiteImage {
  /** Service bucket this photo proves, used for the chip on the tile. */
  tag: string;
  /** Short headline shown on the tile. */
  title: string;
  /** One line of substance: what the visitor is actually looking at. */
  detail: string;
}

const JOBS = "/images/jobs";

/* ------------------------------------------------------------------ */
/* Hero carousel — lead with real work, not a stock interior           */
/* ------------------------------------------------------------------ */

export const heroSlides: SiteImage[] = [
  {
    src: `${JOBS}/kitchen-reset.webp`,
    alt: "Freshly cleaned white kitchen with polished worktops and wiped appliance fronts",
    width: 1200,
    height: 1600,
  },
  {
    src: `${JOBS}/office-clean.webp`,
    alt: "Open-plan office with cleaned desks, chairs and vacuumed carpet",
    width: 1600,
    height: 1200,
  },
  {
    src: `${JOBS}/bathroom-suite.webp`,
    alt: "Bathtub and frosted window cleaned and polished after a bathroom deep clean",
    width: 1200,
    height: 1600,
  },
  {
    src: `${JOBS}/kitchen-appliances.webp`,
    alt: "Integrated kitchen appliances and worktops wiped clean inside and out",
    width: 1284,
    height: 723,
  },
  {
    src: `${JOBS}/oven-glass-detail.webp`,
    alt: "Open oven with the door glass cleaned until clear, during a deep clean",
    width: 1200,
    height: 1600,
  },
];

/* ------------------------------------------------------------------ */
/* "Our standard" gallery — the main trust section on the homepage      */
/* ------------------------------------------------------------------ */

export const jobPhotos: JobPhoto[] = [
  {
    src: `${JOBS}/kitchen-reset.webp`,
    alt: "White kitchen after cleaning: worktops, sink, cabinet fronts and appliance exteriors wiped and polished",
    width: 1200,
    height: 1600,
    tag: "Kitchens",
    title: "Kitchen reset",
    detail: "Worktops, splashback, sink and appliance fronts — degreased and polished.",
  },
  {
    src: `${JOBS}/bathroom-tap.webp`,
    alt: "Chrome basin tap polished until reflective beside a cleaned white basin",
    width: 1200,
    height: 1600,
    tag: "Bathrooms",
    title: "Chrome, polished by hand",
    detail: "Limescale and water marks lifted from taps, then buffed until reflective.",
  },
  {
    src: `${JOBS}/office-clean.webp`,
    alt: "Open-plan office with cable-free desks, clean chairs and freshly vacuumed carpet",
    width: 1600,
    height: 1200,
    tag: "Commercial",
    title: "Workplace reset",
    detail: "Desks, chairs and floors finished outside working hours.",
  },
  {
    src: `${JOBS}/oven-detail.webp`,
    alt: "Oven cleaned inside with racks removed and door glass clear",
    width: 1200,
    height: 1600,
    tag: "Deep clean",
    title: "Oven, inside and out",
    detail: "Racks, trays and glass stripped of baked-on grease — no shortcuts.",
  },
  {
    src: `${JOBS}/kitchen-appliances.webp`,
    alt: "Built-in microwave, coffee machine, fridge and oven cleaned inside a fitted kitchen",
    width: 1284,
    height: 723,
    tag: "Deep clean",
    title: "Appliances included",
    detail: "Built-ins opened, cleaned and closed again — fridge and oven included.",
  },
  {
    src: `${JOBS}/bathroom-suite.webp`,
    alt: "Bathtub, screen and frosted window cleaned during a bathroom deep clean",
    width: 1200,
    height: 1600,
    tag: "Bathrooms",
    title: "Bathroom suite",
    detail: "Bath, screen, surrounds and sills — cleaned, descaled and dried off.",
  },
  {
    src: `${JOBS}/carpet-edge.webp`,
    alt: "Clean carpet meeting a polished doorway threshold and skirting board",
    width: 1200,
    height: 1600,
    tag: "End of tenancy",
    title: "Edges and thresholds",
    detail: "The last 5% most cleaners skip: edges, thresholds, skirting and frames.",
  },
];

/* ------------------------------------------------------------------ */
/* Service mapping                                                     */
/* ------------------------------------------------------------------ */

const byTitle = (title: string) => jobPhotos.find((p) => p.title === title)!;

export const servicePhotos: Record<string, SiteImage> = {
  residential: byTitle("Kitchen reset"),
  "deep-clean": byTitle("Oven, inside and out"),
  "end-of-tenancy": byTitle("Edges and thresholds"),
  airbnb: byTitle("Bathroom suite"),
  commercial: byTitle("Workplace reset"),
  custom: {
    src: `${JOBS}/towel-radiator.webp`,
    alt: "Chrome towel radiator polished until free of water marks",
    width: 1200,
    height: 1600,
  },
};

/* ------------------------------------------------------------------ */
/* Process imagery — used on the about and booking pages               */
/* ------------------------------------------------------------------ */

export const processPhotos = {
  workspace: {
    src: `${JOBS}/kitchen-appliances.webp`,
    alt: "Fitted kitchen with appliances and worktops cleaned during a Sparkly Space visit",
    width: 1284,
    height: 723,
  } satisfies SiteImage,
  detail: {
    src: `${JOBS}/bathroom-tap.webp`,
    alt: "Polished chrome tap after descaling during a bathroom clean",
    width: 1200,
    height: 1600,
  } satisfies SiteImage,
  filters: {
    src: `${JOBS}/extractor-filters-clean.webp`,
    alt: "Cooker hood grease filters washed and left streak-free",
    width: 1200,
    height: 1600,
  } satisfies SiteImage,
} as const;

/* ------------------------------------------------------------------ */
/* Before / after proof                                                */
/* ------------------------------------------------------------------ */

export interface BeforeAfterPair {
  before: SiteImage;
  after: SiteImage;
  /** What the job was — no customer names, no addresses. */
  label: string;
  /**
   * "slider" needs identical framing so the wipe lines up.
   * "pair" is side-by-side and tolerates different framing/zoom.
   */
  kind: "slider" | "pair";
}

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    before: {
      src: `${JOBS}/washer-drawer-before.webp`,
      alt: "Washing machine detergent drawer heavily stained with limescale and mould before cleaning",
      width: 1200,
      height: 1600,
    },
    after: {
      src: `${JOBS}/washer-drawer-after.webp`,
      alt: "The same washing machine detergent drawer after descaling and cleaning",
      width: 1200,
      height: 1600,
    },
    label: "Washing machine detergent drawer — descaled and degreased",
    kind: "slider",
  },
  {
    before: {
      src: `${JOBS}/carpet-before.webp`,
      alt: "Worn, soiled bedroom carpet before a deep clean, with a carpet cleaner in shot",
      width: 1200,
      height: 1600,
    },
    after: {
      src: `${JOBS}/carpet-after.webp`,
      alt: "The same bedroom carpet after extraction cleaning, visibly lighter and even",
      width: 1200,
      height: 1600,
    },
    label: "Carpet deep clean — bedroom",
    kind: "pair",
  },
  {
    before: {
      src: `${JOBS}/extractor-filter-before.webp`,
      alt: "Cooker hood grease filters coated in brown grease before cleaning",
      width: 1200,
      height: 1600,
    },
    after: {
      src: `${JOBS}/extractor-filter-after.webp`,
      alt: "The same cooker hood filters after degreasing, mesh clean and bright",
      width: 1200,
      height: 1600,
    },
    label: "Cooker hood filters — degreased and washed",
    kind: "pair",
  },
];
