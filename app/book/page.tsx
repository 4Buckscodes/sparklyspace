import React, { Suspense } from "react";
import Image from "next/image";
import BookingWizard from "@/components/booking/BookingWizard";
import TrustBar from "@/components/sections/TrustBar";
import { processPhotos } from "@/lib/images";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Personalised Cleaning Quote | Sparkly Space",
  description: "Every property and cleaning requirement is different. Request a personalised quote for residential, deep clean, tenancy, or custom cleaning in Bournemouth, Poole & Christchurch.",
  alternates: { canonical: "/book" },
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

      {/* Reassurance: what protects the customer, and what happens next */}
      <div className="max-w-3xl mx-auto border-t border-slate-200/70 pt-8 mb-10">
        <p className="text-center text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
          Your home is protected
        </p>
        <TrustBar compact className="mt-4" />

        <div className="mt-8 grid sm:grid-cols-[minmax(0,190px)_1fr] gap-5 items-center rounded-2xl border border-slate-200 bg-white p-4">
          <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-xl bg-slate-200">
            <Image
              src={processPhotos.workspace.src}
              alt={processPhotos.workspace.alt}
              fill
              sizes="190px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-extrabold text-slate-900">What happens after you submit</p>
            <ol className="mt-2 space-y-1.5 text-xs text-slate-500 leading-relaxed list-decimal list-inside marker:font-bold marker:text-sky-600">
              <li>We review your answers, photos and any access notes.</li>
              <li>We confirm a personalised quote by WhatsApp or email — no obligation.</li>
              <li>A vetted, insured cleaner arrives briefed on your priorities.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
