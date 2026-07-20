import React from "react";
import { MessageSquare, Star, ShieldCheck } from "lucide-react";
import { Testimonial } from "@/data/home-content";

interface TestimonialsProps {
  items: Testimonial[];
}

export default function Testimonials({ items }: TestimonialsProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
          <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
          <span>Customer Testimonials</span>
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-3">
          What Our Neighbors Say
        </h2>
        <p className="mt-3 text-slate-500 text-sm">
          Trusted by households and companies across Bournemouth, Christchurch, and Poole.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((t, idx) => (
          <div
            key={idx}
            className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 border-l-4 border-l-gold-500/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 hover:border-slate-200/80 transition-all duration-300 ease-out flex flex-col justify-between"
          >
            {/* Giant background quote mark */}
            <span className="absolute top-4 right-6 text-7xl text-slate-100 font-serif select-none pointer-events-none">&ldquo;</span>

            <div className="relative">
              {/* Client Info Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-50 to-sky-100/50 text-sky-700 flex items-center justify-center font-extrabold text-xs tracking-wider border border-sky-100">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">{t.name}</h4>
                  <p className="text-[11px] text-slate-400 font-semibold leading-tight mt-0.5">{t.location}</p>
                </div>
              </div>

              {/* Rating & Service Tag */}
              <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-50">
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="inline-flex px-2 py-0.5 bg-sky-50 text-sky-700 text-[9px] font-extrabold rounded-full border border-sky-100/50">
                  {t.service}
                </span>
              </div>

              {/* Comment */}
              <p className="text-slate-600 italic text-sm leading-relaxed">&ldquo;{t.comment}&rdquo;</p>
            </div>

            {/* Verified Badge Footer */}
            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/30">
                <ShieldCheck className="h-3 w-3 text-emerald-600" /> Verified Clean
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
