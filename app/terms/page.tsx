import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read our terms and booking conditions for Sparkly Space Cleaning Services.",
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-100 border border-slate-100 animate-fade-in-up">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
          Terms &amp; Booking Conditions
        </h1>
        
        <p className="text-sm text-slate-500 mb-6">Last Updated: July 10, 2026</p>

        <div className="space-y-6 text-slate-600 leading-relaxed text-sm">
          <p>
            Welcome to Sparkly Space Cleaning Services. These Terms and Booking Conditions govern the booking, scheduling, pricing, and performance of our professional cleaning services. By using our website and submitting a booking inquiry, you agree to these terms.
          </p>

          <h2 className="text-lg font-bold text-slate-800 mt-8 mb-3">1. Estimate vs. Confirmed Quote</h2>
          <p>
            Any pricing displayed on this website or calculated by our booking configurator is an <strong>estimate only</strong> based on typical properties.
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>No booking or price is legally binding or confirmed until Sparkly Space reviews the inquiry, verifies availability, and explicitly confirms the final pricing and time slot via WhatsApp or email.</li>
            <li>We reserve the right to adjust final quotes upon arrival if property conditions or dimensions significantly exceed the specifications submitted.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-800 mt-8 mb-3">2. Service Area and Postcodes</h2>
          <p>
            We operate within the Bournemouth, Christchurch, and Poole (BCP) areas, validating postcodes between <code className="bg-slate-100 px-1 py-0.5 rounded text-sky-600 font-semibold">BH1</code> and <code className="bg-slate-100 px-1 py-0.5 rounded text-sky-600 font-semibold">BH23</code>. Submitting an inquiry for a postcode outside our designated service area does not guarantee service availability.
          </p>

          <h2 className="text-lg font-bold text-slate-800 mt-8 mb-3">3. Access and Safety</h2>
          <p>
            Clients must provide safe entry access to the property at the agreed scheduled time slot.
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Access arrangements (e.g. key in lockbox, keys left with a neighbor, someone present to let the cleaners in) must be clearly specified in the booking notes.</li>
            <li>Our cleaners will wait for a maximum of 20 minutes at the property. If access cannot be obtained, the clean will be cancelled, and a call-out charge of £30 may apply.</li>
            <li>Properties must have active electrical outlets and running water. If utilities are turned off, we cannot perform the cleaning service, and booking charges remain payable.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-800 mt-8 mb-3">4. Parking Accommodations</h2>
          <p>
            Suitable parking must be available near the property. If free on-site or street parking is not available, the client is responsible for providing parking permits or covering parking fees incurred during the booking window.
          </p>

          <h2 className="text-lg font-bold text-slate-800 mt-8 mb-3">5. Frequency Discounts</h2>
          <p>
            Frequency discounts (e.g. 20% for weekly, 15% for bi-weekly, 10% for monthly) are granted on the condition that the client maintains the scheduled frequency of cleans. If a client cancels recurring appointments or drops frequency, Sparkly Space reserves the right to charge standard one-off rates retrospectively.
          </p>

          <h2 className="text-lg font-bold text-slate-800 mt-8 mb-3">6. Cancellation Policy</h2>
          <p>
            We require a minimum of <strong>48 hours notice</strong> for cancellations or rescheduling. Cancellations made less than 48 hours before the scheduled clean may incur a fee of 50% of the estimated total. Cancellations within 24 hours or lockouts are subject to the full service charge.
          </p>

          <h2 className="text-lg font-bold text-slate-800 mt-8 mb-3">7. Payments</h2>
          <p>
            Payment terms and details will be finalized through WhatsApp or email confirmation. Currently, we accept bank transfers and cash, which must be processed/paid on the day of the cleaning service unless pre-arranged.
          </p>
        </div>
      </div>
    </div>
  );
}
