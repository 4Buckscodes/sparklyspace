import React from "react";
import Link from "next/link";
import { MapPin, Phone, Calendar, ShieldCheck, Leaf, Heart, CheckCircle2, Check, ArrowRight } from "lucide-react";
import type { LocationArea } from "@/data/locations";
import { services } from "@/data/services";
import { coreValues, faqs, type CoreValue } from "@/data/home-content";

const valueIcons: Record<CoreValue["iconName"], React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Leaf,
  Heart,
  CheckCircle2,
};

export default function LocationLanding({ location }: { location: LocationArea }) {
  const { name, intro, postcodes, neighbourhoods } = location;

  return (
    <div className="bg-[#fffdf6]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-sky-900 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-200 border border-sky-500/30 mb-5">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            <span>Serving {name} &amp; surrounding postcodes</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Cleaning Services in <span className="text-sky-300">{name}</span>
          </h1>
          <p className="mt-5 text-sm sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            {intro}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3">
            <Link
              href="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-extrabold px-7 py-3.5 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base min-h-[48px]"
            >
              <Calendar className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span>Request a Quote</span>
            </Link>
            <a
              href="tel:+447552427880"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-2xl transition-all active:scale-[0.98] text-sm sm:text-base min-h-[48px]"
            >
              <Phone className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span>07552 427880</span>
            </a>
          </div>
          <p className="mt-5 text-xs text-slate-400">
            Covering {postcodes[0]}
            {postcodes.length > 1 ? `–${postcodes[postcodes.length - 1]}` : ""} · Mon–Sun, 8am–8pm
          </p>
        </div>
      </section>
      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Cleaning Services in {name}
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Every property is different — choose a service and request a personalised quote.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col"
            >
              <h3 className="text-base font-bold text-slate-900">{service.name}</h3>
              <p className="text-xs uppercase tracking-wider text-amber-600 font-semibold mt-1">
                {service.tagline}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed mt-3 flex-1">{service.description}</p>
              <div className="mt-5 flex items-center gap-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="flex-1 text-center border border-slate-200 hover:border-sky-200 hover:bg-sky-50 text-slate-800 font-semibold py-2.5 px-4 rounded-xl text-xs transition-all min-h-[40px] inline-flex items-center justify-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href={`/book?service=${service.id}`}
                  className="flex-1 text-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all min-h-[40px] inline-flex items-center justify-center"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Areas covered */}
      <section className="bg-white border-y border-slate-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Areas We Cover in {name}
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-2xl mx-auto">
            We regularly clean homes, rentals, and workplaces across these {name} neighbourhoods and postcodes.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            {neighbourhoods.map((area) => (
              <span
                key={area}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm font-medium text-slate-700"
              >
                {area}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {postcodes.map((pc) => (
              <span
                key={pc}
                className="inline-flex items-center rounded-lg bg-sky-50 border border-sky-100 px-2.5 py-1 text-xs font-bold text-sky-700"
              >
                {pc}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* Why choose us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why {name} Chooses Sparkly Space
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coreValues.map((value) => {
            const Icon = valueIcons[value.iconName];
            return (
              <div key={value.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="h-11 w-11 rounded-xl bg-sky-600 flex items-center justify-center shadow-sm mb-4">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{value.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mt-2">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Local FAQ */}
      <section className="bg-white border-t border-slate-100 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-center mb-8">
            {name} Cleaning — Frequently Asked
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 [&_summary]:cursor-pointer"
              >
                <summary className="flex items-center justify-between gap-4 text-sm font-semibold text-slate-900 list-none">
                  <span>{faq.q}</span>
                  <span className="text-sky-600 transition-transform group-open:rotate-45 text-lg leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sky-900 text-white py-12 sm:py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            Book a Trusted Cleaner in {name}
          </h2>
          <p className="text-slate-300 font-light max-w-xl mx-auto mb-8 text-sm leading-relaxed">
            Request your personalised quote in under two minutes — sent straight to our team via WhatsApp or email.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] text-base min-h-[48px]"
          >
            <ShieldCheck className="h-5 w-5" />
            <span>Request a Quote</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
