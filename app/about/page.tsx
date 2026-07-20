import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Check, Leaf } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Professional Cleaning Services in Bournemouth",
  description: "Learn about Sparkly Space, the leading premium cleaning company serving Bournemouth, Christchurch, and Poole.",
};

export default function AboutPage() {
  const stats = [
    { value: "100%", label: "Satisfaction Guarantee" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "BH1-BH23", label: "Service Area coverage" },
    { value: "Eco-Friendly", label: "Products Available" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-sky-900 py-20 text-white text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-800 via-sky-950 to-slate-950 opacity-90" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 mb-4 animate-fade-in-up">
            <span>Our Story</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Immaculate Spaces. More Free Time. Complete Peace of Mind.
          </h1>
          <p className="text-lg sm:text-xl text-sky-100 max-w-2xl mx-auto font-light leading-relaxed">
            At Sparkly Space, we elevate standard domestic and commercial cleaning into a premium, worry-free service across Bournemouth, Christchurch, and Poole. We manage the details, so you can enjoy your environment.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="relative -mt-10 max-w-5xl mx-auto px-4 sm:px-6 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100 border border-slate-100">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-sky-600">{stat.value}</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content Columns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Pristine Standards. Consistent Quality. Trustworthy Care.
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Sparkly Space was established to take the burden out of household chore routines. In a busy, modern world, your weekends shouldn't be spent scrubbing bathrooms or dusting cabinets. We exist to hand you back your valuable free time so you can spend it with family, hobbies, and what truly matters.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              That's why our cleaning services are designed around three core pillars: convenience, absolute trust, and meticulous attention to detail. Every member of our team is fully vetted and trained to exceed standard housekeeping metrics, ensuring every space sparkles.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-sky-200 active:scale-95 text-sm min-h-[44px]"
              >
                Book Your First Clean
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-all active:scale-95 text-sm min-h-[44px]"
              >
                View Service Area
              </Link>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Vetted & Insured</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                All cleaners are fully vetted, background checked, and highly trained. Your home is covered by our comprehensive insurance policy.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                <Leaf className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Eco-Conscious Cleaning</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We prioritize biodegradable, plant-based products. Safe for children and pets, gentle on the Dorset environment.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 mb-4">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Bespoke Customization</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We customize our cleans to your property. Leave instructions on priority rooms, parking, lockbox codes, or pets.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                <Check className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Our Spotless Standard</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We clean behind, under, and around. If a detail doesn't meet your expectations, let us know within 24 hours and we'll re-clean it free.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
