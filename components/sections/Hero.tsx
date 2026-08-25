import React from "react";
import Link from "next/link";
import { Calendar, Phone, MapPin, ShieldCheck } from "lucide-react";
import HeroCarousel from "../HeroCarousel";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fffdf6] flex items-center py-10 sm:py-14 lg:py-0 lg:min-h-[calc(100svh-5rem)]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Left column: copy + actions */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-[11px] sm:text-xs font-semibold bg-green-100 text-green-800 border border-green-200 mb-4 sm:mb-6 animate-fade-in-up">
              <MapPin className="h-3.5 w-3.5 text-green-600 flex-shrink-0" aria-hidden="true" focusable="false" />
              <span>Trusted Local Cleaners in Bournemouth, Poole &amp; Christchurch</span>
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 sm:mb-6 leading-[1.05]">
              We Clean, So You Can Focus on <span className="text-green-600">What Matters.</span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-600 font-light max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-7 leading-snug sm:leading-relaxed">
              Professional, vetted, and fully insured cleaning specialists. Get a fast, personalised quote and book in minutes via WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-stretch sm:items-center gap-3">
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-extrabold px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base min-h-[48px]"
              >
                <Calendar className="h-5 w-5 flex-shrink-0" aria-hidden="true" focusable="false" />
                <span>Request a Quote</span>
              </Link>
              <a
                href="tel:+447552427880"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-green-300 hover:bg-green-50 text-slate-800 font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl transition-all active:scale-[0.98] text-sm sm:text-base min-h-[48px]"
              >
                <Phone className="h-5 w-5 text-green-600 flex-shrink-0" aria-hidden="true" focusable="false" />
                <span>07552 427880</span>
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-5 sm:mt-7 flex flex-wrap justify-center lg:justify-start items-center gap-x-4 sm:gap-x-6 gap-y-2 text-slate-500 text-[11px] sm:text-sm font-medium">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" aria-hidden="true" focusable="false" />
                BH1 – BH23 Postcodes
              </span>
              <span className="hidden sm:inline h-1.5 w-1.5 rounded-full bg-slate-300" />
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" aria-hidden="true" focusable="false" />
                100% Satisfaction
              </span>
            </div>
          </div>

          {/* Right column: framed photo carousel */}
          <div className="relative mt-2 lg:mt-0">
            <div className="relative aspect-[16/10] lg:aspect-[4/3] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl shadow-green-900/10 ring-1 ring-slate-900/5">
              <HeroCarousel />
            </div>

            {/* Solid citrus credibility chip overlapping the frame */}
            <div className="absolute -bottom-4 left-3 sm:left-6 flex items-center gap-2.5 bg-white rounded-2xl shadow-xl shadow-green-900/10 border border-green-100 px-3.5 py-2.5">
              <div className="h-8 w-8 rounded-xl bg-green-600 flex items-center justify-center shadow-sm">
                <ShieldCheck className="h-4 w-4 text-white" aria-hidden="true" focusable="false" />
              </div>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">Fully Insured &amp; Vetted</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
