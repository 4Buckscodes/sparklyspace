import React from "react";
import Link from "next/link";

export default function ServicesCallout() {
  return (
    <section className="bg-white border-y border-slate-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Our Cleaning Modules</h2>
            <p className="text-slate-500 text-sm mt-2">Transparent pricing, comprehensive scopes, and custom add-ons.</p>
          </div>
          <Link
            href="/services"
            className="text-sky-600 hover:text-sky-700 font-bold text-sm inline-flex items-center gap-1 hover:underline min-h-[44px]"
          >
            <span>Explore all services</span>
            <span className="text-xs">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Domestic */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <span className="bg-sky-100 text-sky-800 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                Popular
              </span>
              <h3 className="text-lg font-bold text-slate-950 mt-3">Residential Clean</h3>
              <p className="text-slate-500 text-xs leading-relaxed mt-3">
                Our core housekeeping. Perfect for maintaining kitchens, baths, floors, and general dusting on a weekly or bi-weekly cycle.
              </p>
            </div>
            <Link
              href="/book?service=residential"
              className="mt-6 w-full text-center bg-white hover:bg-sky-50 text-slate-800 font-bold py-2.5 px-4 rounded-xl border border-slate-200 text-xs block transition-all min-h-[40px]"
            >
              Request a Quote
            </Link>
          </div>

          {/* Deep */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                Deep Clean
              </span>
              <h3 className="text-lg font-bold text-slate-950 mt-3">Deep Cleaning</h3>
              <p className="text-slate-500 text-xs leading-relaxed mt-3">
                A comprehensive reset. Focusing on limescale buildup, skirting boards, high dusting, door frames, and hard-to-reach places.
              </p>
            </div>
            <Link
              href="/book?service=deep-clean"
              className="mt-6 w-full text-center bg-white hover:bg-sky-50 text-slate-800 font-bold py-2.5 px-4 rounded-xl border border-slate-200 text-xs block transition-all min-h-[40px]"
            >
              Request a Quote
            </Link>
          </div>

          {/* End of Tenancy */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <span className="bg-amber-100 text-amber-800 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                Inventory checkout
              </span>
              <h3 className="text-lg font-bold text-slate-950 mt-3">End of Tenancy</h3>
              <p className="text-slate-500 text-xs leading-relaxed mt-3">
                Fully guaranteed checkout cleaning. Includes inside fridge, internal windows, and cabinets. Meet landlord requirements.
              </p>
            </div>
            <Link
              href="/book?service=end-of-tenancy"
              className="mt-6 w-full text-center bg-white hover:bg-sky-50 text-slate-800 font-bold py-2.5 px-4 rounded-xl border border-slate-200 text-xs block transition-all min-h-[40px]"
            >
              Request a Quote
            </Link>
          </div>

          {/* Airbnb & Holiday Let Clean */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <span className="bg-sky-100 text-sky-800 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                Guest Ready
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-3">Airbnb &amp; Holiday Let</h3>
              <p className="text-slate-500 text-xs leading-relaxed mt-3">
                Tailored turnarounds for short-term rentals. Includes guest-ready presentation, essential restocking, damage checks, and optional professional laundry.
              </p>
            </div>
            <Link
              href="/book?service=airbnb"
              className="mt-6 w-full text-center bg-white hover:bg-sky-50 text-slate-800 font-bold py-2.5 px-4 rounded-xl border border-slate-200 text-xs block transition-all min-h-[40px]"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
