import React, { Suspense } from "react";
import BookingWizard from "@/components/booking/BookingWizard";
import { Calendar, ShieldCheck, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Personalised Cleaning Quote | Sparkly Space",
  description: "Every property and cleaning requirement is different. Request a personalised quote for residential, deep clean, tenancy, or custom cleaning in Bournemouth, Poole & Christchurch.",
};

export default function BookPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Upper Info */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700 border border-sky-200 mb-3">
          <span>Bespoke Quoting Process</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Request a Personalised Cleaning Quote
        </h1>
        <p className="mt-4 text-sm text-slate-550 leading-relaxed max-w-xl mx-auto font-medium">
          Every property and cleaning requirement is different. We prepare quotations based on the type of cleaning required, the size and condition of the property, the level of work involved, access arrangements and any additional services requested.
        </p>
        <p className="mt-3.5 text-xs text-slate-450 max-w-xl mx-auto">
          Please complete the enquiry form and provide as much information as possible. We may request photographs, a short video or a property walkthrough before confirming the final quotation.
        </p>
      </div>

      {/* Main Wizard */}
      <Suspense fallback={
        <div className="max-w-3xl mx-auto py-20 text-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-10 w-10 bg-sky-100 rounded-full"></div>
            <div className="h-6 w-48 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-slate-100 rounded animate-pulse"></div>
          </div>
        </div>
      }>
        <BookingWizard />
      </Suspense>

      {/* Trust Signage Underneath Form */}
      <div className="max-w-xl mx-auto grid grid-cols-3 gap-6 text-center text-slate-400 font-medium text-xs border-t border-slate-200/60 pt-8 mb-10">
        <div className="space-y-1.5">
          <div className="flex justify-center text-sky-500">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="font-bold text-slate-700">Vetted Cleaner</p>
          <p className="text-[10px] text-slate-400 font-light">Fully insured &amp; checked</p>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-center text-emerald-500">
            <Calendar className="h-5 w-5" />
          </div>
          <p className="font-bold text-slate-700">Flexible Slots</p>
          <p className="text-[10px] text-slate-400 font-light">Mon-Sun 8am-8pm</p>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-center text-pink-500">
            <Heart className="h-5 w-5" />
          </div>
          <p className="font-bold text-slate-700">Satisfaction</p>
          <p className="text-[10px] text-slate-400 font-light">Happiness guaranteed</p>
        </div>
      </div>
    </div>
  );
}
