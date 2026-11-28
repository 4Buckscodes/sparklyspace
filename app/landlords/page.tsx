import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Building2, Calendar, Check, Home, Key, Briefcase } from "lucide-react";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd, SITE_URL } from "@/lib/seo";
import { services } from "@/data/services";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Cleaning for Landlords & Letting Agents in Bournemouth, Poole & Christchurch",
  description:
    "End of tenancy, holiday let turnover and office cleaning for landlords, letting agents and property managers across Bournemouth, Poole and Christchurch. Request a quote.",
  alternates: { canonical: "/landlords" },
  openGraph: {
    title: "Cleaning for Landlords & Letting Agents | Sparkly Space",
    description:
      "End of tenancy, holiday let turnover and office cleaning for landlords, letting agents and property managers across Bournemouth, Poole and Christchurch.",
    url: `${SITE_URL}/landlords`,
    type: "website",
  },
};

const faqs = [
  {
    q: "What does an end of tenancy clean for a rental include?",
    a: "A deep clean of the whole property to a checkout checklist: kitchen and internal appliances, bathrooms and limescale, cupboards, doors, switches, internal windows and wall spot cleaning.",
  },
  {
    q: "Can you work to our inventory or agency checklist?",
    a: "Yes. Send us your checklist or check-out report when you request a quote and we will quote to it.",
  },
  {
    q: "Do you clean holiday lets between guests?",
    a: "Yes. Turnover cleaning can include linen laundering, restocking essentials, key coordination and a note of any damage found.",
  },
  {
    q: "Do you quote before every job?",
    a: "Yes. Every property is different, so we quote based on size, condition and access. We may ask for photos, a short video or a walkthrough first.",
  },
  {
    q: "Where do you work?",
    a: "Bournemouth, Poole and Christchurch.",
  },
];

const audiences = [
  { icon: Home, title: "Landlords", text: "Get a property ready for the next tenant, or ready for checkout, without doing it yourself." },
  { icon: Building2, title: "Letting agents", text: "A cleaning partner for your tenancy changeovers, working to your checkout standards." },
  { icon: Key, title: "Holiday let hosts", text: "Reliable turnover cleans between guests, with linen, restocking and a property check." },
  { icon: Briefcase, title: "Property managers & offices", text: "Scheduled cleaning for offices, retail units and communal premises." },
];

const steps = [
  "Request a quote and tell us the property type, size, access and your deadline.",
  "Send photos, a short video or your agent's checklist if you have one.",
  "We confirm a clear quote and agree the date.",
  "Our team cleans to the checklist and checks the work before leaving.",
];

export default function LandlordsPage() {
  const relevant = services.filter((s) => ["end-of-tenancy", "airbnb", "commercial"].includes(s.id));

  const jsonLd = [
    {
      ...serviceJsonLd(relevant[0]),
      "@id": `${SITE_URL}/landlords/#service`,
      name: "Cleaning for Landlords & Letting Agents",
      url: `${SITE_URL}/landlords`,
      audience: { "@type": "Audience", audienceType: "Landlords, letting agents and property managers" },
    },
    faqPageJsonLd(faqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Landlords & Agents", path: "/landlords" },
    ]),
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-sky-900 py-14 sm:py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Cleaning for Landlords &amp; Letting Agents
          </h1>
          <p className="mt-5 text-sky-100 leading-relaxed max-w-2xl mx-auto">
            End of tenancy cleans, holiday let turnovers and office cleaning across Bournemouth, Poole and Christchurch. Quoted properly, cleaned to a checklist, checked before we leave.
          </p>
          <Link
            href="/book?service=end-of-tenancy"
            className="mt-8 inline-flex items-center justify-center gap-2 bg-white text-sky-800 font-extrabold py-3 px-8 rounded-xl shadow-md hover:bg-sky-50 transition-all active:scale-[0.98] min-h-[44px]"
          >
            <Calendar className="h-5 w-5" aria-hidden="true" />
            <span>Request a Quote</span>
          </Link>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14">
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900">Who we work with</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {audiences.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <Icon className="h-5 w-5 text-sky-600" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-slate-900">What we clean</h2>
          <div className="mt-6 space-y-5">
            {relevant.map((s) => (
              <div key={s.id} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">
                  <Link href={`/services/${s.slug}`} className="hover:text-sky-700 transition-colors">
                    {s.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">{s.description}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {s.includedScope.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-slate-900">How it works</h2>
          <ol className="mt-6 space-y-3">
            {steps.map((step, i) => (
              <li key={step} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-extrabold text-white">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-600 leading-relaxed pt-1.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-slate-900">Questions landlords and agents ask</h2>
          <dl className="mt-6 space-y-5">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <dt className="font-bold text-slate-800">{f.q}</dt>
                <dd className="mt-1 text-sm text-slate-600 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-2xl border border-sky-100 bg-sky-50 p-6 text-sm text-slate-600 leading-relaxed">
          <p className="font-bold text-slate-800">Useful reading</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/guides/end-of-tenancy-cleaning-checklist" className="text-sky-700 font-semibold hover:underline">
                End of tenancy cleaning checklist
              </Link>
            </li>
            <li>
              <Link href="/guides/airbnb-turnover-cleaning-checklist" className="text-sky-700 font-semibold hover:underline">
                Airbnb turnover cleaning checklist
              </Link>
            </li>
          </ul>
          <p className="mt-4">
            Areas:{" "}
            {locations.map((l, i) => (
              <React.Fragment key={l.slug}>
                {i > 0 && ", "}
                <Link href={`/${l.slug}`} className="text-sky-700 font-semibold hover:underline">
                  {l.name}
                </Link>
              </React.Fragment>
            ))}
          </p>
        </section>

        <div className="text-center">
          <Link
            href="/book?service=end-of-tenancy"
            className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3 px-8 rounded-xl shadow-md transition-all active:scale-[0.98] min-h-[44px]"
          >
            <Calendar className="h-5 w-5" aria-hidden="true" />
            <span>Request a Quote</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
