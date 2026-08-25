import React from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown } from "lucide-react";
import { FAQItem } from "@/data/home-content";

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  return (
    <section className="bg-white border-t border-sky-100/70 py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
            <HelpCircle className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" focusable="false" />
            <span>Common Questions</span>
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-3">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base">
            Everything you need to know about our cleaning services and how booking works.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {items.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group rounded-2xl border border-slate-200 bg-white open:border-sky-200 open:bg-sky-50/40 open:shadow-md transition-all duration-200"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none marker:hidden [&::-webkit-details-marker]:hidden p-5 sm:p-6 rounded-2xl focus-visible:outline-2 focus-visible:outline-sky-500">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{faq.q}</h3>
                <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-sky-100 text-sky-700 group-open:bg-sky-600 group-open:text-white transition-colors">
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" focusable="false" />
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Still-have-questions helper */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Can&rsquo;t find your answer?{" "}
          <Link href="/contact" className="font-bold text-sky-700 hover:text-sky-800 underline underline-offset-2">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
