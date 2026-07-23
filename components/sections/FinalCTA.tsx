import React from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-b from-slate-900 to-sky-950 text-white py-10 sm:py-16 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Experience the Cleanliness You Deserve
        </h2>
        <p className="text-slate-300 font-light max-w-xl mx-auto mb-8 text-sm leading-relaxed">
          Ready to request your quote? It takes less than 2 minutes, compiles your enquiry details, and sends it directly to our team via WhatsApp or email.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] text-base min-h-[48px]"
        >
          <Calendar className="h-5 w-5" />
          <span>Request a Quote</span>
        </Link>
      </div>
    </section>
  );
}
