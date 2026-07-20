import React from "react";
import Link from "next/link";

export default function Campaign() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div className="bg-sky-50 border border-sky-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm blue-glow">
        <div className="space-y-2 text-center md:text-left">
          <span className="inline-flex px-3 py-1 bg-sky-200/50 text-sky-800 font-bold text-xs rounded-full uppercase tracking-wider">
            Summer Special Offer
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Save 20% on Weekly Cleaning Services
          </h2>
          <p className="text-slate-500 text-sm">
            Book a weekly domestic clean today and receive a recurring 20% discount on every visit!
          </p>
        </div>
        <Link
          href="/book?frequency=weekly"
          className="w-full md:w-auto inline-flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 text-sm min-h-[44px]"
        >
          Claim Campaign Offer
        </Link>
      </div>
    </section>
  );
}
