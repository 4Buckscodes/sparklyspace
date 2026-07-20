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
    tagline: "Restore calm and order to your home.",
    description: "A consistent, high-standard clean customized to your weekly or fortnightly routine. We handle the chores, giving you back your evenings and weekends.",
    basePrice: 40,
    pricePerBedroom: 15,
    pricePerBathroom: 15,
    minimumCharge: 50,
    isQuoteOnly: false,
    includedScope: [
      "Sanitizing and polishing all countertops, sinks, and kitchen surfaces",
      "Vacuuming carpets and sanitizing hard floors throughout",
      "Deep cleaning and disinfecting toilets, basins, showers, and baths",
      "Dusting furniture, fixtures, and reachable skirting boards",
      "Emptying waste bins, replacing liners, and organizing clutter",
      "Making beds with fresh linens (if laid out for the team)"
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
    tagline: "A thorough, top-to-bottom refresh.",
    description: "Highly recommended for first-time bookings or properties requiring intense care. We focus on limescale removal, built-up dust, and sanitizing hard-to-reach areas.",
    basePrice: 70,
    pricePerBedroom: 25,
    pricePerBathroom: 25,
    minimumCharge: 80,
    isQuoteOnly: false,
    includedScope: [
      "Everything in our core Residential Cleaning checklist",
      "Meticulous cleaning of skirting boards, door frames, and light switches",
      "Advanced limescale removal from taps, shower screens, and basins",
      "Detailed dusting of window blinds, light fixtures, and air vents",
      "Sanitizing exterior surfaces of kitchen cupboards and white goods",
      "Deep edge vacuuming along crevices and underneath reachable furniture"
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
    tagline: "Secure your full tenancy deposit back, guaranteed.",
    description: "An agency-approved deep clean following a comprehensive checkout checklist. Designed to meet strict landlord, agent, and inventory checkout standards.",
    basePrice: 120,
    pricePerBedroom: 30,
    pricePerBathroom: 30,
    minimumCharge: 120,
    isQuoteOnly: false,
    includedScope: [
      "Deep clean of all rooms, fixtures, and internal appliances (Fridge/Freezer included!)",
      "Wiping clean all internal windows, frames, and sills",
      "Complete limescale removal and polishing of sanitaryware",
      "Deep sanitization of all cupboards, cabinets, and drawers inside and out",
      "Wiping down all doors, frames, switches, and sockets",
      "Wall spot cleaning to remove minor scuff marks and smudges"
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
    tagline: "Seamless turnover cleans for 5-star guest reviews.",
    description: "Specialized turnarounds tailored for holiday lets and short-term rentals. We coordinate key collection, restock essentials, inspect for damage, and present the property immaculately.",
    basePrice: 50,
    pricePerBedroom: 20,
    pricePerBathroom: 20,
    minimumCharge: 60,
    isQuoteOnly: false,
    includedScope: [
      "Sanitizing all surfaces and touchpoints between guest stays",
      "Arranging fresh linens, towels, and dressing beds to hotel standards",
      "Kitchen turnaround including washing dishes, wiping microwave, and cleaning fridge",
      "Disinfecting bathrooms and styling guest toiletries and toilet rolls",
      "Conducting property damage checks and reporting left-behind items with photos",
      "Restocking guest essentials (coffee, tea, handwash, toilet rolls)",
      "Emptying all waste bins and replacing liners",
      "Vacuuming and sanitizing all flooring surfaces"
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
    tagline: "An immaculate workplace that reflects your standards.",
    description: "Tailored cleaning protocols for offices, retail units, and gyms. We maintain a healthy, sanitized environment for your team and clients, scheduled to suit your operations.",
    basePrice: 0,
    pricePerBedroom: 0,
    pricePerBathroom: 0,
    minimumCharge: 0,
    isQuoteOnly: true,
    includedScope: [
      "Sanitizing desks, keyboards, phones, and high-frequency touchpoints",
      "Disinfecting staff kitchens, breakrooms, and office washrooms",
      "Emptying desk bins and managing recycling sorting",
      "Vacuuming and mopping main office areas, walkways, and receptions",
      "Polishing entrance doors, glass partitions, and waiting areas",
      "Flexible, non-disruptive scheduling (early morning, evening, or weekend)"
    ],
    extras: []
  }
];
