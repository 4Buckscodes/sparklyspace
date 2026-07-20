export interface ServiceExtra {
  id: string;
  name: string;
  description: string;
  price: number;
  icon?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  basePrice: number; // Base price for 1 bed 1 bath, or minimum entry price
  pricePerBedroom: number;
  pricePerBathroom: number;
  minimumCharge: number;
  isQuoteOnly: boolean;
  includedScope: string[];
  extras: ServiceExtra[];
}

export const services: ServiceItem[] = [
  {
    id: "residential",
    name: "Residential Cleaning",
    slug: "residential-cleaning",
    tagline: "Sparkling homes for busy lives.",
    description: "Our regular domestic cleaning keeps your home clean, fresh, and perfectly organized on a weekly, bi-weekly, or monthly schedule.",
    basePrice: 40,
    pricePerBedroom: 15,
    pricePerBathroom: 15,
    minimumCharge: 50,
    isQuoteOnly: false,
    includedScope: [
      "Dusting and wiping all reachable surfaces",
      "Vacuuming and mopping all floors",
      "Cleaning and sanitizing toilets, sinks, showers, and baths",
      "Wiping kitchen countertops, sink, and exterior of appliances",
      "Emptying bins and replacing liners",
      "Making beds (linens changed if left out)"
    ],
    extras: [
      { id: "oven", name: "Inside Oven", description: "Deep cleaning of grease, burnt food, and racks", price: 30 },
      { id: "fridge", name: "Inside Fridge", description: "Detailed cleaning and disinfection of shelves and drawers", price: 20 },
      { id: "windows", name: "Interior Windows", description: "Wiping glass, frames, and sills from the inside", price: 25 },
      { id: "carpet", name: "Carpet Deep Clean", description: "Professional hot water extraction for a single room", price: 45 },
      { id: "balcony", name: "Balcony / Patio Sweep", description: "Sweeping debris and wiping handrails", price: 15 }
    ]
  },
  {
    id: "deep-clean",
    name: "Deep Cleaning",
    slug: "deep-cleaning",
    tagline: "A thorough, top-to-bottom reset.",
    description: "Highly recommended for first-time visits or homes that haven't been professionally cleaned in the last 3 months. We clean behind, under, and inside neglected areas.",
    basePrice: 70,
    pricePerBedroom: 25,
    pricePerBathroom: 25,
    minimumCharge: 80,
    isQuoteOnly: false,
    includedScope: [
      "Everything in our Residential Cleaning package",
      "Detail-cleaning skirting boards, light switches, and door frames",
      "Limescale removal from taps, showers, and glass",
      "Dusting blinds, light fixtures, and vents",
      "Wiping cupboard exteriors thoroughly",
      "Deep vacuuming along edges and under light furniture"
    ],
    extras: [
      { id: "oven", name: "Inside Oven", description: "Deep cleaning of grease, burnt food, and racks", price: 30 },
      { id: "fridge", name: "Inside Fridge", description: "Detailed cleaning and disinfection of shelves and drawers", price: 20 },
      { id: "windows", name: "Interior Windows", description: "Wiping glass, frames, and sills from the inside", price: 25 },
      { id: "carpet", name: "Carpet Deep Clean", description: "Professional hot water extraction for a single room", price: 45 },
      { id: "balcony", name: "Balcony / Patio Sweep", description: "Sweeping debris and wiping handrails", price: 15 }
    ]
  },
  {
    id: "end-of-tenancy",
    name: "End of Tenancy Cleaning",
    slug: "end-of-tenancy-cleaning",
    tagline: "Leave it spotless, move out with confidence.",
    description: "A comprehensive deep clean designed specifically for landlords, agents, and tenants moving out. Meets professional inventory checkout standards.",
    basePrice: 120,
    pricePerBedroom: 30,
    pricePerBathroom: 30,
    minimumCharge: 120,
    isQuoteOnly: false,
    includedScope: [
      "Complete deep clean of all rooms and appliances (Fridge included!)",
      "Cleaning internal windows, frames, and sills",
      "Limescale removal from sinks, baths, and showers",
      "Thorough cleaning of all cupboards inside and out",
      "Polishing fixtures and fittings",
      "Wall spot cleaning (minor scuffs)"
    ],
    extras: [
      { id: "oven", name: "Inside Oven", description: "Deep cleaning of grease, burnt food, and racks", price: 30 },
      { id: "carpet", name: "Carpet Deep Clean", description: "Professional hot water extraction for a single room", price: 40 },
      { id: "balcony", name: "Balcony / Patio Sweep", description: "Sweeping debris and wiping handrails", price: 15 }
    ]
  },
  {
    id: "airbnb",
    name: "Airbnb & Holiday Let Cleaning",
    slug: "airbnb-cleaning",
    tagline: "5-star guest readiness, automated and hassle-free.",
    description: "Specialized turnover cleaning tailored for short-term rentals and holiday lets. We ensure your property is check-in ready with immaculate hygiene, restocked essentials, and reporting.",
    basePrice: 50,
    pricePerBedroom: 20,
    pricePerBathroom: 20,
    minimumCharge: 60,
    isQuoteOnly: false,
    includedScope: [
      "Full sanitization and turnover cleaning between guests",
      "Making beds with fresh linens and towels (if left out or laundered)",
      "Kitchen cleaning including washing dishes and cleaning the microwave",
      "Restroom sanitization and presentation of guest toiletries",
      "Visual inspections for property damage and reporting issues",
      "Checking and restocking of welcome items (tea, coffee, toilet paper)",
      "Emptying all bins and replacing liners",
      "Vacuuming and mopping all floors"
    ],
    extras: [
      { id: "key-exchange", name: "Key Exchange Coordination", description: "Retrieving or dropping off keys from a secure lockbox or local point", price: 10 },
      { id: "laundry", name: "Linen & Towel Laundry Service", description: "Offsite washing, drying, and ironing of sheets and towels", price: 30 },
      { id: "oven", name: "Inside Oven", description: "Deep cleaning of grease, burnt food, and racks", price: 30 },
      { id: "fridge", name: "Inside Fridge", description: "Detailed cleaning and disinfection of shelves and drawers", price: 20 },
      { id: "windows", name: "Interior Windows", description: "Wiping glass, frames, and sills from the inside", price: 25 },
      { id: "balcony", name: "Balcony / Patio Sweep", description: "Sweeping debris and wiping handrails", price: 15 }
    ]
  },
  {
    id: "commercial",
    name: "Commercial & Office Cleaning",
    slug: "commercial-cleaning",
    tagline: "Professional cleaning for your business.",
    description: "Tailored cleaning services for offices, workspaces, retail venues, and gyms. Flexible scheduling outside business hours.",
    basePrice: 0,
    pricePerBedroom: 0,
    pricePerBathroom: 0,
    minimumCharge: 0,
    isQuoteOnly: true,
    includedScope: [
      "Custom desk and office cleaning protocols",
      "Sanitization of communal kitchens and restrooms",
      "Emptying office bins and recycling management",
      "Professional floor care (carpet and hard surfaces)",
      "Window cleaning and reception area polishing",
      "Flexible schedule (daily, weekly, after-hours)"
    ],
    extras: []
  }
];
