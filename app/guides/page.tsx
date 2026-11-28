import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { guides } from "@/data/guides";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cleaning Guides & Checklists",
  description:
    "Free cleaning checklists and guides from Sparkly Space: end of tenancy, deposit tips, deep cleaning and Airbnb turnovers in Bournemouth, Poole and Christchurch.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ]);

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-100">
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Guides</span>
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Cleaning Guides &amp; Checklists
        </h1>
        <p className="mt-4 text-slate-500 leading-relaxed">
          Straightforward checklists and advice from our team, for tenants, landlords, hosts and homeowners in Bournemouth, Poole and Christchurch.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-sky-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-sky-500"
            >
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                {guide.shortTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">{guide.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {guide.readMinutes} min read
                </span>
                <span className="inline-flex items-center gap-1 text-sky-600">
                  Read guide <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
