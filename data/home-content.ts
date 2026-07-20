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
    title: "Vetted & Fully Insured",
    description: "Your peace of mind is our priority. Every team member undergoes rigorous background checks and comprehensive training, backed by full public liability insurance.",
  },
  {
    iconName: "Leaf",
    title: "Eco-Conscious & Child-Safe",
    description: "We exclusively use non-toxic, child-safe, and pet-friendly cleaning agents. Your home stays fresh and spotless while protecting the local Dorset environment.",
  },
  {
    iconName: "Heart",
    title: "Tailored to Your Home",
    description: "Every home is unique. Customize your clean by specifying priority tasks, adding entry/parking details, and sharing guidance on pets for a truly personal service.",
  },
  {
    iconName: "CheckCircle2",
    title: "Our Spotless Guarantee",
    description: "We hold ourselves to the highest standards. If any corner does not meet your expectations, let us know within 24 hours and we will re-clean it free of charge.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    location: "Poole (BH14)",
    initials: "SM",
    service: "Weekly Clean",
    rating: 5,
    comment: "Finding a reliable cleaner was a challenge until we found Sparkly Space. They have been cleaning our home weekly, and the attention to detail is remarkable. Polite, punctual, and brilliant with our dog!",
  },
  {
    name: "James D.",
    location: "Bournemouth (BH8)",
    initials: "JD",
    service: "End of Tenancy",
    rating: 5,
    comment: "Absolutely flawless End-of-Tenancy clean. The team left the flat looking brand new. The inventory inspection went through without a single issue, securing my deposit back in full.",
  },
  {
    name: "Helen P.",
    location: "Christchurch (BH23)",
    initials: "HP",
    service: "Eco Residential",
    rating: 5,
    comment: "I love that their eco-friendly products are safe for children and pets. The booking wizard is incredibly simple, and the WhatsApp confirmation took less than two minutes. Highly recommended!",
  },
];

export const faqs: FAQItem[] = [
  {
    q: "Do I need to be home for the clean?",
    a: "Not at all. Many of our regular clients are out during their scheduled cleans. You can safely provide lockbox codes, key exchange locations, or entry instructions in the booking wizard, which are securely handled by our vetted staff.",
  },
  {
    q: "Are professional cleaning products and equipment provided?",
    a: "Yes, our specialists arrive fully equipped with professional-grade, eco-friendly supplies and advanced vacuum filtration systems. If you have specialized products or appliances you prefer we use, simply specify it in your booking request.",
  },
  {
    q: "How do the pricing estimate and booking handoff work?",
    a: "We believe in transparency. Select your property metrics to get an instant, honest estimate. Confirming your request packages the details into a pre-filled WhatsApp text directly to our team. We then confirm availability and finalise slot timings with you.",
  },
  {
    q: "Why do you have minimum booking charges?",
    a: "Our minimum charges (e.g. £50 for Residential, £60 for Airbnb, £80 for Deep Cleaning) ensure we can compensate our professional cleaners fairly, cover travel costs, and maintain high standards of training, insurance, and service consistency.",
  },
];
