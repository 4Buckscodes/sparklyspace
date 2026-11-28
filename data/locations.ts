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
  /** Short paragraph for the "Areas We Cover" section that names the neighbourhoods in running text. */
  areaIntro: string;
  /** Town-specific questions, shown above the general FAQ and emitted as FAQPage schema. */
  faqs: { q: string; a: string }[];
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
    areaIntro:
      "Looking for a cleaner in Bournemouth? We clean homes, rentals and workplaces in Boscombe, Southbourne, Winton, Charminster, Westbourne, Springbourne, Pokesdown, Kinson, Throop, Iford and the town centre. Choose regular home cleaning, a deep clean, end of tenancy cleaning or an Airbnb turnover.",
    faqs: [
      {
        q: "Do you clean in Boscombe, Southbourne and Pokesdown?",
        a: "Yes. We cover all of Bournemouth, including Boscombe, Southbourne, Pokesdown and the town centre, across postcodes BH1 to BH11. Give us your address when you request a quote and we will confirm.",
      },
      {
        q: "Can you do end of tenancy cleaning in Bournemouth?",
        a: "Yes. We clean to your landlord's or letting agent's checkout checklist across Bournemouth, including Winton, Charminster and Westbourne. Send the checklist with your quote request.",
      },
      {
        q: "Do you clean holiday lets and Airbnbs in Bournemouth?",
        a: "Yes. Turnovers between guests, with linen, restocking and a damage check, are available across Bournemouth, including near the town centre and Boscombe.",
      },
    ],
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
    areaIntro:
      "Looking for a cleaner in Poole? We clean homes, rentals and workplaces in Poole Old Town, Parkstone, Canford Cliffs, Sandbanks, Branksome, Broadstone, Hamworthy, Oakdale, Creekmoor, Canford Heath and Lilliput. Choose regular home cleaning, a deep clean, end of tenancy cleaning or an Airbnb turnover.",
    faqs: [
      {
        q: "Do you clean in Sandbanks, Canford Cliffs and Parkstone?",
        a: "Yes. We cover all of Poole, including Sandbanks, Canford Cliffs, Parkstone and Poole Old Town, across postcodes BH12 to BH18. Give us your address when you request a quote and we will confirm.",
      },
      {
        q: "Can you do end of tenancy cleaning in Poole?",
        a: "Yes. We clean to your landlord's or letting agent's checkout checklist across Poole, including Broadstone, Hamworthy and Canford Heath. Send the checklist with your quote request.",
      },
      {
        q: "Do you clean holiday lets and Airbnbs in Poole?",
        a: "Yes. Turnovers between guests, with linen, restocking and a damage check, are available across Poole, including near Sandbanks and Canford Cliffs.",
      },
    ],
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
    areaIntro:
      "Looking for a cleaner in Christchurch? We clean homes, rentals and workplaces in Highcliffe, Mudeford, Burton, Somerford, Jumpers Common, Purewell, Stanpit, Friars Cliff and the town centre. Choose regular home cleaning, a deep clean, end of tenancy cleaning or an Airbnb turnover.",
    faqs: [
      {
        q: "Do you clean in Highcliffe, Mudeford and Somerford?",
        a: "Yes. We cover all of Christchurch, including Highcliffe, Mudeford, Somerford and the town centre, in postcode BH23. Give us your address when you request a quote and we will confirm.",
      },
      {
        q: "Can you do end of tenancy cleaning in Christchurch?",
        a: "Yes. We clean to your landlord's or letting agent's checkout checklist across Christchurch, including Burton, Purewell and Stanpit. Send the checklist with your quote request.",
      },
      {
        q: "Do you clean holiday lets and Airbnbs in Christchurch?",
        a: "Yes. Turnovers between guests, with linen, restocking and a damage check, are available across Christchurch, including coastal rentals in Highcliffe and Mudeford.",
      },
    ],
    metaDescription:
      "Professional cleaning services in Christchurch (BH23). Residential, deep, end of tenancy, Airbnb & office cleaning by vetted, insured local cleaners. Request a quote.",
  },
];

export function getLocation(slug: string): LocationArea | undefined {
  return locations.find((l) => l.slug === slug);
}
