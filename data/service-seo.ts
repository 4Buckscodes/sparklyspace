export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceSeo {
  /** Full <title>, used as-is (no site suffix added). Keep under ~60 characters. */
  title: string;
  /** Meta description, ~150 characters. */
  description: string;
  /** Page H1: names the service and the three towns. */
  h1: string;
  /** Opening paragraph shown under the H1. */
  intro: string;
  faqs: ServiceFaq[];
}

const QUOTE_FAQ: ServiceFaq = {
  q: "How much does it cost?",
  a: "Every property is different, so we quote for each job based on size, condition, access and what you need done. We may ask for photos, a short video or a walkthrough first so the price is accurate. Quotes are free.",
};

/** SEO copy per service, keyed by service slug. */
export const serviceSeo: Record<string, ServiceSeo> = {
  "residential-cleaning": {
    title: "Domestic Cleaning in Bournemouth & Poole | Sparkly Space",
    description:
      "Regular home cleaning in Bournemouth, Poole and Christchurch, weekly or fortnightly. Kitchens, bathrooms, floors and dusting to a checklist. Request a quote.",
    h1: "Domestic Cleaning in Bournemouth, Poole & Christchurch",
    intro:
      "Regular home cleaning for households across Bournemouth, Poole and Christchurch. Choose weekly or fortnightly visits and we work through the same checklist each time, so your home stays on top of itself and you get your evenings and weekends back.",
    faqs: [
      {
        q: "What is included in a regular home clean?",
        a: "Kitchen worktops, sinks and surfaces, vacuuming and mopping, toilets, basins, showers and baths, dusting furniture and reachable skirting boards, emptying bins and tidying. The full checklist is on this page.",
      },
      {
        q: "How often can you clean?",
        a: "Most customers choose weekly or fortnightly. Tell us your routine when you request a quote and we will agree a schedule that suits you.",
      },
      {
        q: "Can I add extras like the oven or fridge?",
        a: "Yes. Inside oven, inside fridge, interior windows, a carpet deep clean for a room and a balcony or patio sweep can be added to a visit.",
      },
      QUOTE_FAQ,
    ],
  },

  "deep-cleaning": {
    title: "Deep Cleaning Services Bournemouth & Poole | Sparkly Space",
    description:
      "Deep cleaning in Bournemouth, Poole and Christchurch: limescale, dust, skirting boards and hard-to-reach areas. A thorough top-to-bottom reset. Get a quote.",
    h1: "Deep Cleaning in Bournemouth, Poole & Christchurch",
    intro:
      "A thorough, top-to-bottom clean for homes across Bournemouth, Poole and Christchurch. We cover the areas a routine visit does not reach: limescale, built-up dust, skirting boards, door frames, light switches and the edges of every room.",
    faqs: [
      {
        q: "What is the difference between a deep clean and a regular clean?",
        a: "A regular clean keeps a home tidy week to week. A deep clean covers everything in it and adds limescale removal, skirting boards, door frames, switches, blinds, vents and edge vacuuming. Our guide explains the difference in more detail.",
      },
      {
        q: "When should I book a deep clean?",
        a: "It is a good first booking before moving to regular visits, and worth doing after a busy period, building work, or when you move in or out.",
      },
      {
        q: "Can the oven and fridge be included?",
        a: "Yes. Inside oven and inside fridge cleaning can be added, along with interior windows and a carpet deep clean for a room.",
      },
      QUOTE_FAQ,
    ],
  },

  "end-of-tenancy-cleaning": {
    title: "End of Tenancy Cleaning Bournemouth & Poole | Sparkly Space",
    description:
      "End of tenancy cleaning in Bournemouth, Poole and Christchurch to your landlord or agent’s checklist. Kitchens, bathrooms, windows and more. Get a quote.",
    h1: "End of Tenancy Cleaning in Bournemouth, Poole & Christchurch",
    intro:
      "A deep clean of the whole property to a checkout checklist, for tenants and landlords across Bournemouth, Poole and Christchurch. We work to your landlord's or agent's standards and can follow their own checklist if you send it.",
    faqs: [
      {
        q: "What does an end of tenancy clean include?",
        a: "A deep clean of every room: kitchen and internal appliances, bathrooms and limescale, cupboards and drawers, doors, frames, switches and sockets, internal windows and wall spot cleaning. The full checklist is on this page.",
      },
      {
        q: "Can you work to my letting agent's checklist?",
        a: "Yes. Send us the checklist or check-out report when you request a quote and we will quote to it.",
      },
      {
        q: "Will this get my deposit back?",
        a: "Your landlord or agent decides what happens with the deposit. A thorough clean to their checklist reduces the risk of deductions for cleaning. Our deposit guide explains how it works.",
      },
      {
        q: "Can the oven and carpets be cleaned too?",
        a: "Yes. Inside oven cleaning and a carpet deep clean can be added. Check your tenancy agreement to see whether professional carpet cleaning is required.",
      },
      QUOTE_FAQ,
    ],
  },

  "airbnb-cleaning": {
    title: "Airbnb Cleaning in Bournemouth & Poole | Sparkly Space",
    description:
      "Airbnb and holiday let turnover cleaning in Bournemouth, Poole and Christchurch. Fresh linen, restocking, damage checks and key coordination. Request a quote.",
    h1: "Airbnb & Holiday Let Cleaning in Bournemouth, Poole & Christchurch",
    intro:
      "Turnover cleaning for Airbnb and holiday lets in Bournemouth, Poole and Christchurch. We clean between guests, dress the beds, restock the essentials and check the property, so every arrival starts well.",
    faqs: [
      {
        q: "What does a turnover clean include?",
        a: "Sanitising surfaces and touchpoints, fresh linen and towels, a kitchen turnaround, bathrooms, restocking essentials such as tea, coffee, handwash and toilet rolls, bins, floors, and a damage check with photos of anything left behind.",
      },
      {
        q: "Can you handle the laundry and the keys?",
        a: "Yes. Offsite linen and towel laundry and key exchange coordination can be added to a visit.",
      },
      {
        q: "What if there is damage or something left behind?",
        a: "We check the property during each turnover and report damage and left-behind items with photos, so you can deal with it before the next guest arrives.",
      },
      QUOTE_FAQ,
    ],
  },

  "commercial-cleaning": {
    title: "Office Cleaning in Bournemouth & Poole | Sparkly Space",
    description:
      "Office, retail and commercial cleaning in Bournemouth, Poole and Christchurch, scheduled early mornings, evenings or weekends around your business. Get a quote.",
    h1: "Office & Commercial Cleaning in Bournemouth, Poole & Christchurch",
    intro:
      "Scheduled cleaning for offices, retail units and gyms across Bournemouth, Poole and Christchurch. We keep the workplace clean and hygienic, and book visits around your operations so they do not get in the way.",
    faqs: [
      {
        q: "What kinds of premises do you clean?",
        a: "Offices, retail units and gyms. Tell us about your premises when you request a quote.",
      },
      {
        q: "Can you clean outside working hours?",
        a: "Yes. Early morning, evening and weekend visits are available, so your team and customers are not disturbed.",
      },
      {
        q: "What does an office clean include?",
        a: "Desks and high-contact touchpoints, staff kitchens, breakrooms and washrooms, desk bins and recycling, floors, reception areas, entrance doors and glass partitions. The full checklist is on this page.",
      },
      QUOTE_FAQ,
    ],
  },

  "custom-cleaning": {
    title: "Post-Builder & One-Off Cleaning Bournemouth | Sparkly Space",
    description:
      "Post-builder, carpet deep cleaning, window and one-off cleaning in Bournemouth, Poole and Christchurch. Tell us what you need for a personalised quote.",
    h1: "Specialist & One-Off Cleaning in Bournemouth, Poole & Christchurch",
    intro:
      "For jobs that do not fit a standard package: post-builder cleaning, a carpet deep clean, window washing or a clean after an event. Tell us what you need across Bournemouth, Poole and Christchurch and we will build a checklist and quote around it.",
    faqs: [
      {
        q: "Do you offer carpet cleaning?",
        a: "Yes. A carpet deep clean using hot water extraction is available, and can also be added to a home clean. Tell us the rooms and we will quote.",
      },
      {
        q: "Can you clean up after builders?",
        a: "Yes. Post-builder cleaning is quoted for the size and condition of the property. Photos help us prepare the right team.",
      },
      {
        q: "Can I choose the products?",
        a: "Eco-friendly or standard professional products can be used, as you prefer.",
      },
      QUOTE_FAQ,
    ],
  },
};
