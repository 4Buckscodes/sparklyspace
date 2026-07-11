import React from "react";
import Link from "next/link";
import { services } from "@/data/services";
import { Check, ArrowRight, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Sparkly Space Cleaning",
  description: "Explore our premium cleaning catalog: Residential, Deep Clean, End of Tenancy, and Commercial office cleaning in Bournemouth, Poole, and Christchurch.",
};

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700 border border-sky-200 mb-4 animate-fade-in-up">
            <span>Premium Standards</span>
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Our Cleaning Services
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            Select a service tailored to your home or office. All cleans utilize vetted professionals, customizable priority notes, and optional eco-friendly products.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => {
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col justify-between hover:shadow-2xl hover:border-sky-100 transition-all duration-300 group"
              >
                <div>
                  {/* Service Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {service.name}
                      </h2>
                      <p className="text-xs uppercase tracking-wider text-amber-600 font-bold mt-1.5">
                        {service.tagline}
                      </p>
                    </div>
                    <div className="text-right">
                      {service.isQuoteOnly ? (
                        <span className="inline-flex px-3 py-1 bg-amber-50 text-amber-700 font-semibold text-xs rounded-full border border-amber-100">
                          Quote Required
                        </span>
                      ) : (
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-slate-400 font-medium">Starting from</span>
                          <span className="text-2xl font-extrabold text-sky-600">£{service.basePrice}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Included Scope */}
                  <div className="border-t border-slate-100 pt-6 mb-8">
                    <h3 className="text-slate-800 text-sm font-bold mb-4 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-sky-500" />
                      <span>What's Included:</span>
                    </h3>
                    <ul className="space-y-3 text-sm">
                      {service.includedScope.slice(0, 5).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-slate-600 leading-normal">
                          <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-50">
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-slate-200 hover:bg-slate-50 hover:text-slate-950 font-semibold py-3 px-4 rounded-xl text-sm transition-colors duration-200 min-h-[44px]"
                  >
                    <span>Detailed Scope</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href={`/book?service=${service.id}`}
                    className="flex-1 flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors duration-200 shadow-md shadow-sky-100 hover:shadow-lg hover:shadow-sky-100 active:scale-[0.98] min-h-[44px]"
                  >
                    <span>Instant Enquiry</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
