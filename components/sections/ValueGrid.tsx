import React from "react";
import { ShieldCheck, Leaf, Heart, CheckCircle2 } from "lucide-react";
import { CoreValue } from "@/data/home-content";

const ICON_MAP: Record<CoreValue["iconName"], React.ComponentType<{ className?: string }>> = {
  ShieldCheck: ShieldCheck,
  Leaf: Leaf,
  Heart: Heart,
  CheckCircle2: CheckCircle2,
};

const TILE_COLOR: Record<CoreValue["iconName"], string> = {
  ShieldCheck: "bg-sky-600",
  Leaf: "bg-lime-500",
  Heart: "bg-orange-500",
  CheckCircle2: "bg-amber-500",
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
          We offer reliable, top-quality cleaning services tailored just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((value, idx) => {
          const IconComponent = ICON_MAP[value.iconName];
          const tileColor = TILE_COLOR[value.iconName];

          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-5 ${tileColor} shadow-lg`}>
                {IconComponent && <IconComponent className="h-7 w-7 text-white" />}
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
