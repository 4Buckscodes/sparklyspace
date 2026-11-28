export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface Guide {
  slug: string;
  title: string;
  /** Used for <title> and the guide card. */
  shortTitle: string;
  metaDescription: string;
  excerpt: string;
  readMinutes: number;
  /** ISO date the guide was last reviewed. */
  updated: string;
  intro: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  /** Service page this guide links through to. */
  serviceSlug: string;
  serviceLabel: string;
  /** Other service pages that should also link to this guide. */
  alsoServiceSlugs?: string[];
}

export const guides: Guide[] = [
  {
    slug: "end-of-tenancy-cleaning-checklist",
    title: "End of Tenancy Cleaning Checklist for Bournemouth, Poole & Christchurch",
    shortTitle: "End of Tenancy Cleaning Checklist",
    metaDescription:
      "A room-by-room end of tenancy cleaning checklist for tenants and landlords in Bournemouth, Poole and Christchurch. Use it to leave the property ready for checkout.",
    excerpt:
      "A room-by-room checklist covering kitchen, bathroom, bedrooms and living areas, so nothing is missed at checkout.",
    readMinutes: 5,
    updated: "2026-11-28",
    intro:
      "At the end of a tenancy the property is normally expected to be returned in the same standard of cleanliness as when you moved in, allowing for normal wear and tear. Letting agents and landlords usually compare it against the original inventory. This checklist covers the areas that are most often marked down, room by room.",
    sections: [
      {
        heading: "Kitchen",
        bullets: [
          "Inside and outside of the oven, hob, grill and extractor hood, including racks and trays",
          "Inside the fridge and freezer: defrost, empty, wipe down and leave doors ajar",
          "Cupboards and drawers wiped inside and out",
          "Sink, taps and drainer descaled and polished",
          "Dishwasher and washing machine filters and door seals cleaned",
          "Splashbacks, worktops and tiles degreased",
          "Floor swept and mopped, including under movable appliances where possible",
        ],
      },
      {
        heading: "Bathrooms and toilets",
        bullets: [
          "Limescale removed from taps, shower screen, shower head and tiles",
          "Toilet cleaned inside, outside and around the base and hinges",
          "Bath, basin and sanitaryware polished",
          "Grout and silicone seals wiped, with any mould treated",
          "Mirrors, cabinets and extractor fan covers cleaned",
        ],
      },
      {
        heading: "Bedrooms and living areas",
        bullets: [
          "Skirting boards, window sills, door frames and light switches wiped",
          "Wardrobes and shelves emptied and wiped inside",
          "Marks and scuffs spot cleaned from walls where it can be done without damaging the paint",
          "Internal windows and frames cleaned",
          "Carpets vacuumed. Hard floors swept and mopped",
          "Radiators wiped, including behind and between the fins",
        ],
      },
      {
        heading: "Often forgotten",
        bullets: [
          "Cobwebs from ceilings and corners",
          "Inside the oven door glass",
          "Balcony, patio or entrance area swept",
          "Bins emptied and bin area left tidy",
          "Light fittings and lampshades dusted",
        ],
      },
      {
        heading: "Carpets and stains",
        paragraphs: [
          "Some agreements ask for the carpets to be professionally cleaned at the end of the tenancy. Check your tenancy agreement and inventory. If it is required, keep the receipt, as agents often ask to see it.",
        ],
      },
      {
        heading: "Do it yourself or hire a professional?",
        paragraphs: [
          "Doing it yourself is possible, but it usually takes a full day for an average home and the oven, limescale and skirting boards are the areas people struggle with most. A professional team works from a set checklist and brings its own equipment and products.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does an end of tenancy clean include?",
        a: "It is a deep clean of the whole property: kitchen and appliances, bathrooms, bedrooms, living areas, internal windows, skirting boards, doors and switches. The checklist above shows the usual scope.",
      },
      {
        q: "Does the oven have to be cleaned?",
        a: "Yes. The oven, hob and extractor are among the first things checked at checkout, and grease or burnt-on food is a common reason for a deduction.",
      },
      {
        q: "Do I need to clean the carpets?",
        a: "Check your tenancy agreement. Some require professional carpet cleaning. Others only ask for the carpets to be vacuumed and free of stains.",
      },
      {
        q: "When should I book the clean?",
        a: "Ideally after your belongings are out and before the final inspection, so the property is clean on the day it is checked.",
      },
    ],
    serviceSlug: "end-of-tenancy-cleaning",
    serviceLabel: "End of Tenancy Cleaning",
  },
  {
    slug: "get-your-tenancy-deposit-back",
    title: "How to Get Your Tenancy Deposit Back: A Cleaning Guide for Tenants",
    shortTitle: "Getting Your Tenancy Deposit Back",
    metaDescription:
      "Practical steps tenants can take to protect their deposit at the end of a tenancy, including what 'fair wear and tear' means and how cleaning fits in.",
    excerpt:
      "What landlords can and cannot deduct for, how cleaning affects your deposit, and the steps that help you protect it.",
    readMinutes: 4,
    updated: "2026-11-28",
    intro:
      "Cleaning is one of the most common reasons for deposit disputes at the end of a tenancy. This guide explains the basics in plain terms. It is general information and not legal advice, so check your own tenancy agreement and your deposit scheme's guidance for your situation.",
    sections: [
      {
        heading: "Where your deposit is held",
        paragraphs: [
          "In England, a landlord or agent who takes a deposit for an assured shorthold tenancy must protect it in a government-approved deposit protection scheme. You should have been told which scheme holds yours. If a dispute arises, that scheme's dispute process is how it is settled.",
        ],
      },
      {
        heading: "What 'fair wear and tear' means",
        paragraphs: [
          "Landlords cannot normally deduct for ordinary ageing from everyday living, such as lightly worn carpet or faded paint. They can claim for damage beyond that, and for cleaning needed to return the property to the standard recorded at the start of the tenancy.",
        ],
      },
      {
        heading: "Steps that help protect your deposit",
        bullets: [
          "Find your check-in inventory and compare it with the property as it stands now",
          "Clean to that standard: oven, bathrooms, limescale, skirting boards and windows are the usual problem areas",
          "Take dated photos or a short video of every room once cleaning is done",
          "Keep receipts for any professional cleaning or carpet cleaning",
          "Return all keys and agree the handover date in writing",
          "Attend the check-out inspection if you can",
        ],
      },
      {
        heading: "If the landlord proposes a deduction",
        paragraphs: [
          "Ask for the reasons and the evidence in writing. If you disagree, use the free dispute service offered by the deposit scheme that holds your money. Your dated photos and any cleaning receipts are your best evidence.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can a landlord keep my deposit for cleaning?",
        a: "They can make a fair deduction if the property is left less clean than the inventory shows at the start of the tenancy, and they should be able to evidence it. They cannot deduct for ordinary wear and tear.",
      },
      {
        q: "Is a professional clean required?",
        a: "Not always. It depends on your tenancy agreement. A professional clean to an agent's checklist is a common way to reduce the risk of a dispute.",
      },
      {
        q: "What evidence should I keep?",
        a: "Your check-in inventory, dated photos or video taken after cleaning, and receipts for any professional cleaning.",
      },
    ],
    serviceSlug: "end-of-tenancy-cleaning",
    serviceLabel: "End of Tenancy Cleaning",
  },
  {
    slug: "deep-cleaning-vs-regular-cleaning",
    title: "Deep Cleaning vs Regular Cleaning: What's the Difference?",
    shortTitle: "Deep Cleaning vs Regular Cleaning",
    metaDescription:
      "Not sure whether you need a deep clean or a regular clean? Here is the difference, what each covers and when a deep clean is worth booking.",
    excerpt:
      "What each type of clean covers, how often you need them, and the signs it is time for a deep clean.",
    readMinutes: 3,
    updated: "2026-11-28",
    intro:
      "A regular clean keeps a home tidy week to week. A deep clean resets it, reaching the places a routine visit does not. Most households need both at different times.",
    sections: [
      {
        heading: "What a regular clean covers",
        bullets: [
          "Dusting and wiping surfaces",
          "Vacuuming and mopping floors",
          "Kitchen worktops, hob and sink",
          "Bathroom sink, toilet, bath and shower",
          "Emptying bins and general tidying",
        ],
      },
      {
        heading: "What a deep clean adds",
        bullets: [
          "Limescale and soap scum removal in bathrooms",
          "Inside of the oven, fridge, microwave and cupboards",
          "Skirting boards, doors, frames, switches and sockets",
          "Window sills, frames and internal glass",
          "Behind and under furniture and appliances where accessible",
          "Built-up grease and grime in the kitchen",
        ],
      },
      {
        heading: "When a deep clean is worth booking",
        bullets: [
          "You are starting with a new cleaner or cleaning service",
          "You have just moved in, or before you move out",
          "After building work, illness, or a busy few months",
          "Once or twice a year, as a seasonal reset",
          "Before hosting guests or marketing a property",
        ],
      },
      {
        heading: "A simple approach",
        paragraphs: [
          "Many customers book one deep clean to bring the home up to standard, then move to a weekly or fortnightly regular clean to keep it there.",
        ],
      },
    ],
    faqs: [
      {
        q: "How often should I have a deep clean?",
        a: "Once or twice a year suits most homes, plus after any major event such as moving or building work.",
      },
      {
        q: "Is a deep clean more expensive?",
        a: "It takes longer and covers more, so it is usually priced higher than a single regular visit. Pricing depends on the size and condition of the property, so we quote for each home.",
      },
      {
        q: "Do I need to be at home?",
        a: "No. Many customers arrange access in advance and are out while the clean takes place.",
      },
    ],
    serviceSlug: "deep-cleaning",
    serviceLabel: "Deep Cleaning",
  },
  {
    slug: "airbnb-turnover-cleaning-checklist",
    title: "Airbnb & Holiday Let Turnover Cleaning Checklist",
    shortTitle: "Airbnb Turnover Cleaning Checklist",
    metaDescription:
      "A turnover checklist for Airbnb and holiday let hosts in Bournemouth, Poole and Christchurch: cleaning, linen, restocking and checking for damage between guests.",
    excerpt:
      "What to do between guests: cleaning, linen, restocking and a quick property check, so every arrival is five-star ready.",
    readMinutes: 4,
    updated: "2026-11-28",
    intro:
      "Cleanliness is one of the things guests mention most in reviews. A repeatable turnover routine helps every stay start well, especially when check-out and check-in fall on the same day.",
    sections: [
      {
        heading: "On arrival, before cleaning",
        bullets: [
          "Walk through every room and note any damage, missing items or spillages",
          "Strip beds and collect used towels and linen",
          "Open windows to air the property",
          "Take out all rubbish and check the fridge for left-behind food",
        ],
      },
      {
        heading: "Cleaning",
        bullets: [
          "Kitchen: surfaces, hob, microwave, sink and floors",
          "Bathrooms: toilet, shower, bath, basin, mirrors and floors, with limescale kept under control",
          "Bedrooms and living areas: dust, vacuum and mop",
          "Touchpoints: door handles, switches, remote controls",
          "Entrance, balcony or garden area swept",
        ],
      },
      {
        heading: "Linen and presentation",
        bullets: [
          "Fresh bed linen and towels, made up to the same standard each time",
          "Beds made, cushions arranged, surfaces clear",
          "Spare linen stored so it is easy to find",
        ],
      },
      {
        heading: "Restock essentials",
        bullets: [
          "Toilet roll, hand soap, washing-up liquid and bin bags",
          "Tea, coffee and any welcome items you provide",
          "Replace anything broken or missing, and note it for the host",
        ],
      },
      {
        heading: "Final checks",
        bullets: [
          "Lights, heating and appliances set as you want them for the next guest",
          "Keys or key safe ready for the next arrival",
          "Photos of any damage or issues, shared with the host promptly",
        ],
      },
    ],
    faqs: [
      {
        q: "Can the same team do same-day turnovers?",
        a: "It depends on the size of the property and the gap between guests. Tell us your check-out and check-in times when you request a quote.",
      },
      {
        q: "Can you handle linen and restocking?",
        a: "Yes. Linen laundering, restocking guest essentials and key coordination can be included. Tell us what you need when you request a quote.",
      },
      {
        q: "What if something is damaged?",
        a: "We note it during the visit and let the host know, so they can deal with it before the next guest arrives.",
      },
    ],
    serviceSlug: "airbnb-cleaning",
    serviceLabel: "Airbnb & Holiday Let Cleaning",
  },
  {
    slug: "end-of-tenancy-carpet-cleaning",
    title: "Do You Have to Clean the Carpets at the End of a Tenancy?",
    shortTitle: "Carpet Cleaning at the End of a Tenancy",
    metaDescription:
      "Do you have to clean the carpets when you move out? What landlords can and cannot ask for, wear and tear versus damage, and how to protect your deposit.",
    excerpt:
      "What you are expected to do with the carpets, what counts as wear and tear, and how to avoid a deposit dispute.",
    readMinutes: 4,
    updated: "2026-11-28",
    intro:
      "Carpets are one of the most common areas of argument at the end of a tenancy. This guide explains in plain terms what you are normally expected to do, what a landlord can and cannot ask for, and how to protect your deposit. It covers assured shorthold tenancies in England and is general information, not legal advice. Rules differ in Scotland, Wales and Northern Ireland.",
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "In most cases you are expected to hand the carpets back in the same state of cleanliness as when you moved in, allowing for fair wear and tear. In England, a landlord or agent generally cannot require you to pay for a professional carpet clean as a condition of the tenancy, because the Tenant Fees Act 2019 limits what can be charged. If you are unsure, check the government’s current guidance on the Act.",
          "That does not mean carpets can be left dirty. A landlord can still make a reasonable deduction from the deposit if you leave them in a worse state than the check-in inventory shows, and they should be able to evidence it.",
        ],
      },
      {
        heading: "Wear and tear, or damage?",
        paragraphs: [
          "Fair wear and tear is the ordinary ageing that comes from living in a home. Damage is something beyond that. Only damage, or a clear drop in cleanliness since the start of the tenancy, is normally chargeable.",
        ],
        bullets: [
          "Usually wear and tear: flattened or worn pile in busy areas such as hallways and stairs, and light fading from sunlight",
          "Usually treated as damage: stains, burns, pet accidents, rips, snags and marks from paint or glue",
          "A carpet that was professionally cleaned at the start and is visibly dirty at the end may justify a fair cleaning charge",
        ],
      },
      {
        heading: "When a professional clean is worth it",
        paragraphs: [
          "You are not always required to hire one, but it can be a sensible way to avoid an argument.",
        ],
        bullets: [
          "The inventory says the carpets were professionally cleaned when you moved in",
          "There are stains you cannot remove yourself",
          "You have had pets, or smokers in the home",
          "Your agent is pressing for it, and you would rather settle it than risk a dispute. Ask them to point to the clause in your agreement",
        ],
      },
      {
        heading: "What to do before you move out",
        bullets: [
          "Read your tenancy agreement and the check-in inventory, and note what it says about the carpets",
          "Vacuum thoroughly once the rooms are empty, including edges and under where furniture stood",
          "Deal with stains early, and blot spills instead of scrubbing, which can spread the mark and damage the pile",
          "If you book a professional clean, leave time for the carpets to dry before the inspection and keep windows open. Hot water extraction leaves carpets damp for a few hours",
          "Photograph every room after cleaning, with dates, and keep the receipt for any professional clean",
        ],
      },
      {
        heading: "If your landlord proposes a deduction",
        paragraphs: [
          "Ask for the reasons and the evidence in writing, such as a comparison with the check-in inventory, photos and an invoice for any cleaning. If you disagree, use the free dispute service of the deposit scheme that holds your money. Our guide to getting your deposit back explains the basics.",
        ],
      },
      {
        heading: "Carpet cleaning with Sparkly Space",
        paragraphs: [
          "We can add a carpet deep clean, using hot water extraction, to an end of tenancy clean in Bournemouth, Poole and Christchurch. Tell us which rooms when you request a quote.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I have to pay for professional carpet cleaning when I move out?",
        a: "Generally, in England, a landlord or agent cannot require you to pay for it as a fee. You are still expected to leave the carpets in the same state of cleanliness as at the start, allowing for fair wear and tear. Check your agreement and the government’s guidance on the Tenant Fees Act.",
      },
      {
        q: "Can a landlord deduct from my deposit for dirty carpets?",
        a: "They can make a fair deduction if the carpets are left less clean than at the start and they can evidence it, for example with the check-in inventory and photos. They cannot deduct for fair wear and tear.",
      },
      {
        q: "What if the carpets were already stained or worn when I moved in?",
        a: "The check-in inventory is the baseline. Marks and wear recorded at the start should not be charged to you at the end.",
      },
      {
        q: "Should I keep the receipt for a professional clean?",
        a: "Yes. A receipt shows what was done and when, and it helps if there is a dispute about the deposit.",
      },
    ],
    serviceSlug: "end-of-tenancy-cleaning",
    serviceLabel: "End of Tenancy Cleaning",
    alsoServiceSlugs: ["custom-cleaning"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
