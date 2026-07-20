import React from "react";
import { HelpCircle } from "lucide-react";
import { FAQItem } from "@/data/home-content";

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  return (
    <section className="bg-white border-t border-slate-100 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-100">
            <HelpCircle className="h-3.5 w-3.5 text-sky-500" />
            <span>Common Questions</span>
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-3">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {items.map((faq, idx) => (
            <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-start gap-2.5">
                <span className="text-sky-600 font-black">Q:</span>
                <span>{faq.q}</span>
              </h3>
              <p className="mt-2 text-slate-600 text-sm pl-6 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
