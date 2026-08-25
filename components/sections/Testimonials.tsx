import React from "react";
import { Quote, Star, ShieldCheck, MessageSquare } from "lucide-react";
import { Testimonial } from "@/data/home-content";

interface TestimonialsProps {
  items: Testimonial[];
}

// Solid citrus accents rotate per card to match the site's tile palette.
const ACCENTS = [
  { avatar: "bg-sky-600", bar: "border-l-sky-500", tag: "bg-sky-50 text-sky-700 border-sky-100" },
  { avatar: "bg-orange-500", bar: "border-l-orange-500", tag: "bg-orange-50 text-orange-700 border-orange-100" },
  { avatar: "bg-amber-500", bar: "border-l-amber-500", tag: "bg-amber-50 text-amber-700 border-amber-100" },
];

export default function Testimonials({ items }: TestimonialsProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
          <MessageSquare className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" focusable="false" />
          <span>Customer Testimonials</span>
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-3">
          What Our Neighbours Say
        </h2>
        <p className="mt-3 text-slate-500 text-sm sm:text-base">
          Trusted by households and companies across Bournemouth, Christchurch, and Poole.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {items.map((t, idx) => {
          const accent = ACCENTS[idx % ACCENTS.length];
          return (
            <div
              key={idx}
              className={`relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 border-l-4 ${accent.bar} shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col`}
            >
              {/* Watermark quote glyph */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-slate-100" aria-hidden="true" focusable="false" />

              {/* Client header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`h-11 w-11 rounded-2xl ${accent.avatar} text-white flex items-center justify-center font-extrabold text-sm tracking-wider shadow-sm`}>
                  {t.initials}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">{t.name}</h3>
                  <p className="text-[11px] text-slate-400 font-semibold leading-tight mt-0.5">{t.location}</p>
                </div>
              </div>

              {/* Rating & service tag */}
              <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" aria-hidden="true" focusable="false" />
                  ))}
                </div>
                <span className={`inline-flex px-2.5 py-0.5 text-[10px] font-extrabold rounded-full border ${accent.tag}`}>
                  {t.service}
                </span>
              </div>

              {/* Comment */}
              <p className="text-slate-600 text-sm leading-relaxed flex-1">&ldquo;{t.comment}&rdquo;</p>

              {/* Verified footer */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
                  <ShieldCheck className="h-3 w-3 text-sky-600" aria-hidden="true" focusable="false" /> Verified Clean
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
