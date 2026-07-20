import React from "react";
import Link from "next/link";
import { Calendar, Phone, Star } from "lucide-react";
import HeroCarousel from "../HeroCarousel";

export default function Hero() {
  return (
    <section className="relative overflow-hidden text-white pt-16 pb-20 sm:pt-24 sm:pb-32 min-h-[80vh] flex items-center justify-center">
      {/* Carousel Background */}
      <HeroCarousel />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Trust Signal Badge */}
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/20 mb-6 animate-fade-in-up">
          <span>Your Trusted Local Cleaning Specialists in Bournemouth, Poole & Christchurch</span>
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
          We Clean, So You Can Focus on <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-300">What Matters.</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          Professional, vetted, and fully insured cleaning specialists. Get a transparent price estimate and book via WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/book"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg shadow-sky-900/30 hover:shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-base min-h-[48px]"
          >
            <Calendar className="h-5 w-5" />
            <span>Get Instant Estimate</span>
          </Link>
          <a
            href="tel:+447552427880"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 hover:bg-slate-800/40 text-slate-200 font-bold px-8 py-4 rounded-2xl transition-all active:scale-[0.98] text-base min-h-[48px]"
          >
            <Phone className="h-5 w-5 text-sky-400" />
            <span>07552 427880</span>
          </a>
        </div>

        {/* Social Proof Badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-slate-400 text-xs sm:text-sm font-medium border-t border-slate-800/60 pt-8">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="text-white font-bold ml-1">4.9/5 Rating</span>
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-slate-700 hidden sm:inline" />
          <span>BH1 – BH23 Postcode Validated</span>
          <span className="h-1.5 w-1.5 rounded-full bg-slate-700 hidden sm:inline" />
          <span>100% Satisfaction Guarantee</span>
        </div>
      </div>
    </section>
  );
}
