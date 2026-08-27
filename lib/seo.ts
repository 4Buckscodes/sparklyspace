import { services, type ServiceItem } from "@/data/services";
import type { LocationArea } from "@/data/locations";
import type { Metadata } from "next";

/**
 * Central SEO / structured-data helpers. All JSON-LD across the site is built
 * from these so the business NAP (name, address, phone) and the LocalBusiness
 * @id stay consistent — the key requirement for local-SEO entity consolidation.
 */

export const SITE_URL = "https://sparklyspace.co.uk";
export const BUSINESS_ID = `${SITE_URL}/#business`;

/** Google Business Profile share link — used for the "Read our Google reviews" CTA. */
export const GBP_URL = "https://share.google/Bz8bLAWN02yKv3zrD";

export const NAP = {
  name: "Sparkly Space Cleaning Services",
  telephone: "+447552427880",
  email: "info@sparklyspace.co.uk",
  streetAddress: "Parkwood Road, Pokesdown",
  addressLocality: "Bournemouth",
  addressRegion: "Dorset",
  postalCode: "BH5 2BL",
  addressCountry: "GB",
  latitude: 50.7266,
  longitude: -1.821,
} as const;

export const SAME_AS = [
  "https://www.instagram.com/sparklyspace01",
  "https://www.tiktok.com/@sparklyspace",
  "https://www.facebook.com/sparklyspace01",
];

const SERVICE_CITIES = [
  { "@type": "City", name: "Bournemouth" },
  { "@type": "City", name: "Poole" },
  { "@type": "City", name: "Christchurch" },
];

/** The core LocalBusiness (HouseCleaning) entity, referenced by @id elsewhere. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HouseCleaning",
    "@id": BUSINESS_ID,
    name: NAP.name,
    legalName: NAP.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/opengraph-image`,
    description:
      "Sparkly Space provides professional residential, deep, end of tenancy, Airbnb, and commercial office cleaning across Bournemouth, Poole & Christchurch (BH1–BH23).",
    slogan: "We Clean, So You Can Focus on What Matters.",
    telephone: NAP.telephone,
    email: NAP.email,
    priceRange: "££",
    currenciesAccepted: "GBP",
    paymentAccepted: "Cash, Bank Transfer, Card",
    hasMap: GBP_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.streetAddress,
      addressLocality: NAP.addressLocality,
      addressRegion: NAP.addressRegion,
      postalCode: NAP.postalCode,
      addressCountry: NAP.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: NAP.latitude,
      longitude: NAP.longitude,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: NAP.telephone,
      email: NAP.email,
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: ["English"],
    },
    sameAs: SAME_AS,
    knowsAbout: [
      "Domestic Cleaning",
      "Deep Cleaning",
      "End of Tenancy Deposit Guarantee Cleaning",
      "Airbnb & Holiday Let Turnover Cleaning",
      "Commercial & Office Sanitization",
      "Eco-Friendly Non-Toxic Cleaning",
      "Bournemouth Poole Christchurch BH Postcodes Cleaning",
    ],
    areaServed: [
      ...SERVICE_CITIES,
      { "@type": "AdministrativeArea", name: "Dorset BH Postcodes (BH1-BH23)" },
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: NAP.latitude,
          longitude: NAP.longitude,
        },
        geoRadius: "16000",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning Services Catalog",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          url: `${SITE_URL}/services/${s.slug}`,
        },
      })),
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
  };
}

/** BreadcrumbList for a page, given its trail of crumbs. */
export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

/** Service schema for a single service page, provider linked to the business @id. */
export function serviceJsonLd(service: ServiceItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}/#service`,
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: SERVICE_CITIES,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} — what's included`,
      itemListElement: service.includedScope.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}

/** LocalBusiness variant scoped to a single served town, for location landing pages. */
export function locationBusinessJsonLd(town: {
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HouseCleaning",
    "@id": `${SITE_URL}/${town.slug}/#business`,
    name: `${NAP.name} — ${town.name}`,
    parentOrganization: { "@id": BUSINESS_ID },
    url: `${SITE_URL}/${town.slug}`,
    image: `${SITE_URL}/opengraph-image`,
    telephone: NAP.telephone,
    email: NAP.email,
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      addressLocality: town.name,
      addressRegion: NAP.addressRegion,
      addressCountry: NAP.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: town.latitude,
      longitude: town.longitude,
    },
    areaServed: { "@type": "City", name: town.name },
    sameAs: SAME_AS,
  };
}

/** Metadata for a location landing page. */
export function locationMetadata(location: LocationArea): Metadata {
  const title = `Cleaning Services in ${location.name} | Sparkly Space`;
  return {
    title,
    description: location.metaDescription,
    alternates: { canonical: `/${location.slug}` },
    openGraph: {
      title,
      description: location.metaDescription,
      url: `${SITE_URL}/${location.slug}`,
      type: "website",
    },
  };
}

/** Full JSON-LD payload (business + breadcrumb) for a location landing page. */
export function locationJsonLd(location: LocationArea) {
  return [
    locationBusinessJsonLd({
      name: location.name,
      slug: location.slug,
      latitude: location.geo.latitude,
      longitude: location.geo.longitude,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: location.name, path: `/${location.slug}` },
    ]),
  ];
}
