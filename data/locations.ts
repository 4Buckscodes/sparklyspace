export interface LocationArea {
  slug: string;
  name: string;
  /** Short H1-friendly label, e.g. "Bournemouth". */
  headline: string;
  /** Postcode districts genuinely covered for this town (aligned with lib/postcode.ts). */
  postcodes: string[];
  /** Real neighbourhoods within the town — used for on-page local relevance, no claims attached. */
  neighbourhoods: string[];
  geo: { latitude: number; longitude: number };
  intro: string;
  metaDescription: string;
}

export const locations: LocationArea[] = [
  {
    slug: "bournemouth",
    name: "Bournemouth",
    headline: "Bournemouth",
    postcodes: ["BH1", "BH2", "BH3", "BH4", "BH5", "BH6", "BH7", "BH8", "BH9", "BH10", "BH11"],
    neighbourhoods: [
      "Town Centre",
      "Boscombe",
      "Southbourne",
      "Winton",
      "Charminster",
      "Westbourne",
      "Springbourne",
      "Pokesdown",
      "Kinson",
      "Throop",
      "Iford",
    ],
    geo: { latitude: 50.7192, longitude: -1.8808 },
    intro:
      "Sparkly Space is a local cleaning team serving homes and businesses across Bournemouth. From regular residential cleans in Winton and Charminster to end of tenancy and Airbnb turnarounds near the town centre and Boscombe, we cover the full BH1–BH11 area with vetted, fully insured cleaners.",
    metaDescription:
      "Professional cleaning services in Bournemouth (BH1–BH11). Residential, deep, end of tenancy, Airbnb & office cleaning by vetted, insured local cleaners. Request a quote.",
  },
  {
    slug: "poole",
    name: "Poole",
    headline: "Poole",
    postcodes: ["BH12", "BH13", "BH14", "BH15", "BH16", "BH17", "BH18"],
    neighbourhoods: [
      "Poole Old Town",
      "Parkstone",
      "Canford Cliffs",
      "Sandbanks",
      "Branksome",
      "Broadstone",
      "Hamworthy",
      "Oakdale",
      "Creekmoor",
      "Canford Heath",
      "Lilliput",
    ],
    geo: { latitude: 50.715, longitude: -1.9872 },
    intro:
      "Sparkly Space provides trusted cleaning services throughout Poole. Whether it's a weekly home clean in Parkstone, a holiday-let turnaround near Sandbanks and Canford Cliffs, or a deposit-focused end of tenancy clean in Broadstone, our insured local team covers the BH12–BH18 postcodes.",
    metaDescription:
      "Professional cleaning services in Poole (BH12–BH18). Residential, deep, end of tenancy, Airbnb & office cleaning by vetted, insured local cleaners. Request a quote.",
  },
  {
    slug: "christchurch",
    name: "Christchurch",
    headline: "Christchurch",
    postcodes: ["BH23"],
    neighbourhoods: [
      "Town Centre",
      "Highcliffe",
      "Mudeford",
      "Burton",
      "Somerford",
      "Jumpers Common",
      "Purewell",
      "Stanpit",
      "Friars Cliff",
    ],
    geo: { latitude: 50.7352, longitude: -1.7797 },
    intro:
      "Sparkly Space keeps homes and holiday lets spotless across Christchurch. From coastal short-term rentals in Highcliffe and Mudeford to regular household cleans in Somerford and Burton, our vetted, fully insured cleaners serve the BH23 area with flexible scheduling.",
    metaDescription:
      "Professional cleaning services in Christchurch (BH23). Residential, deep, end of tenancy, Airbnb & office cleaning by vetted, insured local cleaners. Request a quote.",
  },
];

export function getLocation(slug: string): LocationArea | undefined {
  return locations.find((l) => l.slug === slug);
}
