import React from "react";
import { ShieldCheck, Leaf, Heart, CheckCircle2 } from "lucide-react";
import { CoreValue } from "@/data/home-content";

const ICON_MAP = {
  ShieldCheck: ShieldCheck,
  Leaf: Leaf,
  Heart: Heart,
  CheckCircle2: CheckCircle2,
};

interface ValueGridProps {
  items: CoreValue[];
}

export default function ValueGrid({ items }: ValueGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Why Choose Sparkly Space?
        </h2>
        <p className="mt-4 text-slate-500 text-sm">
          We offer reliable, top-quality Cleaning services tailored just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((value, idx) => {
          const IconComponent = ICON_MAP[value.iconName];
          let strokeColorClass = "text-sky-600";
          if (value.iconName === "Leaf") strokeColorClass = "text-emerald-600";
          else if (value.iconName === "Heart") strokeColorClass = "text-pink-600";
          
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-5">
                {IconComponent && <IconComponent className={`h-6 w-6 ${strokeColorClass}`} />}
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">{value.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{value.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
