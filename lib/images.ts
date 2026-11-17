/**
 * Central image registry.
 *
 * Every photo used across the site is declared here so that:
 *  - alt text, dimensions and aspect ratios stay consistent,
 *  - services and locations can be mapped to relevant proof imagery,
 *  - real client/job photography can replace a placeholder by editing ONE line.
 *
 * House rules for new images:
 *  1. Prefer real photographs of real Sparkly Space jobs, cleaned rooms, or team
 *     members. They convert far better than stock or generated imagery.
 *  2. Never caption an image as a specific customer's home, or a named team
 *     member, unless it genuinely is. Caption the *standard* shown instead.
 *  3. Export at ~1400px on the long edge, WebP, quality ~82, and strip metadata.
 */

export interface SiteImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface WorkPhoto extends SiteImage {
  /** Service bucket this photo proves, used for the chip on the tile. */
  tag: string;
  /** Short headline shown on the tile. */
  title: string;
  /** One line of substance: what the visitor is actually looking at. */
  detail: string;
}

/* ------------------------------------------------------------------ */
/* Hero carousel                                                       */
/* ------------------------------------------------------------------ */

export const heroSlides: SiteImage[] = [
  {
    src: "/images/living-room-clean.webp",
    alt: "Bright, freshly cleaned living room with vacuumed rug and plumped cushions",
    width: 1376,
    height: 768,
  },
  {
    src: "/images/pexels-alesha-260500796-13009887.webp",
    alt: "Clean, tidy home interior with clear surfaces ready for the day",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/kitchen-detail.webp",
    alt: "Gloved hand wiping a quartz kitchen worktop beside a polished chrome tap",
    width: 1400,
    height: 764,
  },
  {
    src: "/images/pexels-ansar-muhammad-380085065-23916862.webp",
    alt: "Neatly arranged, spotless room in a Dorset home",
    width: 1600,
    height: 1081,
  },
  {
    src: "/images/pexels-artbovich-5998138.webp",
    alt: "Freshly cleaned, uncluttered living space with natural light",
    width: 1600,
    height: 1068,
  },
  {
    src: "/images/pexels-artbovich-7546276.webp",
    alt: "Immaculate kitchen surfaces and fittings after a Sparkly Space clean",
    width: 1600,
    height: 1130,
  },
];

/* ------------------------------------------------------------------ */
/* "Our standard" gallery — the main trust section on the homepage      */
/* ------------------------------------------------------------------ */

export const workPhotos: WorkPhoto[] = [
  {
    src: "/images/living-room-clean.webp",
    alt: "Immaculate living room with freshly vacuumed rug, dust-free surfaces and neatly arranged cushions",
    width: 1376,
    height: 768,
    tag: "Living spaces",
    title: "Living spaces that feel reset",
    detail: "Edges vacuumed, soft furnishings plumped, every surface dust-free.",
  },
  {
    src: "/images/bathroom-shine.webp",
    alt: "Streak-free glass shower screen and polished chrome fittings in a spotless bathroom",
    width: 1400,
    height: 764,
    tag: "Bathrooms",
    title: "Bathrooms descaled and sanitised",
    detail: "Limescale lifted from glass and chrome, then disinfected end to end.",
  },
  {
    src: "/images/kitchen-detail.webp",
    alt: "Gloved hand wiping a quartz kitchen worktop with a microfibre cloth beside a polished tap",
    width: 1400,
    height: 764,
    tag: "Kitchens",
    title: "Kitchens finished by hand",
    detail: "Worktops, splashbacks, sink and tap polished — grease and water marks gone.",
  },
  {
    src: "/images/bedroom-fresh.webp",
    alt: "Crisp white bed linen and plumped pillows in a bright, dust-free bedroom",
    width: 1400,
    height: 764,
    tag: "Bedrooms",
    title: "Bedrooms made properly",
    detail: "Fresh linen, made beds and dust-free bedside detail in every room.",
  },
  {
    src: "/images/tenancy-empty.webp",
    alt: "Empty rental flat with gleaming floors and spotless skirting boards before a tenancy inspection",
    width: 1400,
    height: 764,
    tag: "End of tenancy",
    title: "Checkout-ready, deposit-safe",
    detail: "Floors, skirting, frames and interiors finished to inventory standard.",
  },
  {
    src: "/images/holiday-let-ready.webp",
    alt: "Holiday let bedroom styled with fresh linen and folded towels ready for arriving guests",
    width: 1400,
    height: 764,
    tag: "Holiday lets",
    title: "Guest-ready between stays",
    detail: "Turnarounds presented for five-star reviews, with essentials restocked.",
  },
  {
    src: "/images/office-clean.webp",
    alt: "Tidy open-plan office with cable-free desks, clean glass partitions and freshly vacuumed carpet",
    width: 1400,
    height: 764,
    tag: "Commercial",
    title: "Workplaces that reflect you",
    detail: "Desks, glass and floors reset outside your working hours.",
  },
  {
    src: "/images/eco-kit.webp",
    alt: "Refillable spray bottles, folded microfibre cloths and eucalyptus on a cream surface",
    width: 1400,
    height: 764,
    tag: "Eco option",
    title: "Kinder products, same standard",
    detail: "Non-toxic, child- and pet-safe products available on request.",
  },
];

/* ------------------------------------------------------------------ */
/* Service mapping                                                     */
/* ------------------------------------------------------------------ */

export const servicePhotos: Record<string, SiteImage> = {
  residential: workPhotos[0],
  "deep-clean": workPhotos[2],
  "end-of-tenancy": workPhotos[4],
  airbnb: workPhotos[5],
  commercial: workPhotos[6],
  custom: workPhotos[1],
};

/* ------------------------------------------------------------------ */
/* People / process imagery                                            */
/* ------------------------------------------------------------------ */

export const peoplePhotos = {
  /** Supplies caddy being carried into a home — uniform, no identifiable face. */
  caddy: {
    src: "/images/team-caddy.webp",
    alt: "Cleaning caddy with folded microfibre cloths, spray bottle and squeegee carried into a home",
    width: 1400,
    height: 764,
  } satisfies SiteImage,
  /** Eco product still life. */
  eco: {
    src: "/images/eco-kit.webp",
    alt: "Refillable cleaning bottles and cloths used for the eco-friendly cleaning option",
    width: 1400,
    height: 764,
  } satisfies SiteImage,
} as const;

/* ------------------------------------------------------------------ */
/* Before / after proof                                                */
/* ------------------------------------------------------------------ */

export interface BeforeAfterPair {
  before: SiteImage;
  after: SiteImage;
  /** What the job was, e.g. "End of tenancy — Poole (BH14)". */
  label: string;
}

/**
 * Before/after is the single highest-trust asset a cleaning company can show —
 * but only if it is genuine. Add real, same-angle, same-lighting pairs here and
 * the slider renders automatically on the homepage. Leave empty until then.
 *
 * Example:
 *   {
 *     before: { src: "/images/jobs/poole-oven-before.webp", alt: "...", width: 1400, height: 900 },
 *     after:  { src: "/images/jobs/poole-oven-after.webp",  alt: "...", width: 1400, height: 900 },
 *     label: "Inside oven — end of tenancy, Poole (BH14)",
 *   }
 */
export const beforeAfterPairs: BeforeAfterPair[] = [];
