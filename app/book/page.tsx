import React, { Suspense } from "react";
import BookingWizard from "@/components/booking/BookingWizard";
import { Calendar, ShieldCheck, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Online | Sparkly Space Cleaning Services",
  description: "Get an instant cleaning estimate and configure your booking details. Vetted cleaners and optional eco-friendly products in Bournemouth, Poole & Christchurch.",
};

export default function BookPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Upper Info */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700 border border-sky-200 mb-3">
          <span>Fast 2-Minute Setup</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Book Your Sparkly Clean
        </h1>
        <p className="mt-2.5 text-sm text-slate-500 max-w-lg mx-auto">
          Fill in your property metrics below to receive a live price estimate. Confirm via WhatsApp to lock in your date.
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
