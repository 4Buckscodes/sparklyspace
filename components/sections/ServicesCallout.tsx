import React from "react";
import Link from "next/link";
import { SprayBottle, ScrubBrush, Mop } from "@/components/icons/CleaningIcons";
import { AirbnbIcon } from "@/components/icons/AirbnbIcon";

const serviceCards = [
  {
    tag: "Popular",
    tagClass: "bg-green-100 text-green-800",
    tile: "bg-green-500",
    Icon: SprayBottle,
    title: "Residential Clean",
    desc: "Our core housekeeping. Perfect for maintaining kitchens, baths, floors, and general dusting on a weekly or bi-weekly cycle.",
    href: "/book?service=residential",
  },
  {
    tag: "Deep Clean",
    tagClass: "bg-lime-100 text-lime-800",
    tile: "bg-lime-500",
    Icon: ScrubBrush,
    title: "Deep Cleaning",
    desc: "A comprehensive reset. Focusing on limescale buildup, skirting boards, high dusting, door frames, and hard-to-reach places.",
    href: "/book?service=deep-clean",
  },
  {
    tag: "Inventory checkout",
    tagClass: "bg-amber-100 text-amber-800",
    tile: "bg-amber-500",
    Icon: Mop,
    title: "End of Tenancy",
    desc: "Fully guaranteed checkout cleaning. Includes inside fridge, internal windows, and cabinets. Meet landlord requirements.",
    href: "/book?service=end-of-tenancy",
  },
  {
    tag: "Guest Ready",
    tagClass: "bg-orange-100 text-orange-800",
    tile: "bg-orange-500",
    Icon: AirbnbIcon,
    title: "Airbnb & Holiday Let",
    desc: "Tailored turnarounds for short-term rentals. Includes guest-ready presentation, essential restocking, damage checks, and optional professional laundry.",
    href: "/book?service=airbnb",
  },
];

export default function ServicesCallout() {
  return (
    <section className="bg-white border-y border-slate-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Our Cleaning Services</h2>
            <p className="text-slate-500 text-sm mt-2">Comprehensive scopes, custom add-ons, and a personalised quote for every property.</p>
          </div>
          <Link
            href="/services"
            className="text-green-600 hover:text-green-700 font-bold text-sm inline-flex items-center gap-1 hover:underline min-h-[44px]"
          >
            <span>Explore all services</span>
            <span className="text-xs">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCards.map((s) => {
            const Icon = s.Icon;
            return (
              <div
                key={s.title}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className={`h-14 w-14 rounded-2xl ${s.tile} flex items-center justify-center shadow-lg mb-4`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <span className={`${s.tagClass} font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full`}>
                    {s.tag}
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 mt-3">{s.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mt-3">{s.desc}</p>
                </div>
                <Link
                  href={s.href}
                  className="mt-6 w-full text-center bg-white hover:bg-green-50 text-slate-800 font-bold py-2.5 px-4 rounded-xl border border-slate-200 hover:border-green-200 text-xs block transition-all min-h-[40px]"
                >
                  Request a Quote
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
