export interface CoreValue {
  iconName: "ShieldCheck" | "Leaf" | "Heart" | "CheckCircle2";
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  location: string;
  initials: string;
  service: string;
  rating: number;
  comment: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export const coreValues: CoreValue[] = [
  {
    iconName: "ShieldCheck",
    title: "100% Insured & Vetted",
    description: "Our professionals are fully background-checked, insured, and thoroughly trained to clean with absolute care.",
  },
  {
    iconName: "Leaf",
    title: "Eco-Friendly Products",
    description: "We offer non-toxic, child-safe, and pet-friendly cleaning options to protect your home and the local environment.",
  },
  {
    iconName: "Heart",
    title: "Customized Priority",
    description: "You decide what we focus on. Add priority rooms, custom parking instructions, or pet alerts to your schedule.",
  },
  {
    iconName: "CheckCircle2",
    title: "Satisfied Guarantee",
    description: "We are committed to perfection. If any corner is not cleaned to your standards, we will make it right.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    location: "Poole (BH14)",
    initials: "SM",
    service: "Weekly Clean",
    rating: 5,
    comment: "Sparkly Space has been cleaning our home weekly for three months. It is absolutely spotless, and the team is so friendly and careful around our golden retriever!",
  },
  {
    name: "James D.",
    location: "Bournemouth (BH8)",
    initials: "JD",
    service: "End of Tenancy",
    rating: 5,
    comment: "Outstanding End-of-Tenancy clean. The inventory checkout went through without a single issue, and I got my full deposit back. Well worth it!",
  },
  {
    name: "Helen P.",
    location: "Christchurch (BH23)",
    initials: "HP",
    service: "Eco Residential",
    rating: 5,
    comment: "I love the option to request eco-friendly products. The cleaning is top-tier, and booking through the website onto WhatsApp was incredibly quick and seamless.",
  },
];

export const faqs: FAQItem[] = [
  {
    q: "Do I need to be home for the clean?",
    a: "No! Many of our clients leave keys in a secure lockbox or leave them with neighbors. You can specify access instructions directly in the booking wizard.",
  },
  {
    q: "Are cleaning products and equipment included?",
    a: "Yes, our cleaners bring their own professional cleaning supplies and state-of-the-art vacuums. If you have specific preferences (such as using your own vacuum or calling for eco-friendly supplies), we accommodate them at no extra charge.",
  },
  {
    q: "How does the pricing and WhatsApp checkout work?",
    a: "You select your service and room count. The website calculates an estimate based on standard properties. Once finalized, the form compiles a structured text message and hands it to WhatsApp. We confirm availability, coordinate access, and agree on the final quotation with you.",
  },
  {
    q: "Is there a minimum booking charge?",
    a: "Yes, our minimum charge is £50 for Residential cleaning, £60 for Airbnb cleaning, £80 for Deep cleaning, and £120 for End-of-Tenancy. This ensures we can compensate our professional cleaning teams fairly for travel and setup.",
  },
];
