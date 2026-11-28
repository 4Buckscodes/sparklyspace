import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Check } from "lucide-react";
import { guides, getGuide } from "@/data/guides";
import { articleJsonLd, breadcrumbJsonLd, faqPageJsonLd, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    // Absolute so the long site suffix is not added; keeps titles near Google's display length.
    title: { absolute: `${guide.shortTitle} | Sparkly Space` },
    description: guide.metaDescription,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      url: `${SITE_URL}/guides/${guide.slug}`,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const jsonLd = [
    articleJsonLd({
      slug: guide.slug,
      title: guide.title,
      description: guide.metaDescription,
      updated: guide.updated,
    }),
    faqPageJsonLd(guide.faqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: guide.shortTitle, path: `/guides/${guide.slug}` },
    ]),
  ];

  const others = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);
  const updated = new Date(guide.updated).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-sky-600 transition-colors mb-8 min-h-[44px]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>All guides</span>
        </Link>

        <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{guide.title}</h1>
          <p className="mt-3 text-xs font-semibold text-slate-400">
            {guide.readMinutes} min read · Updated {updated}
          </p>
          <p className="mt-6 text-slate-600 leading-relaxed">{guide.intro}</p>

          {guide.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-xl font-bold text-slate-900">{section.heading}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className="mt-3 text-slate-600 leading-relaxed">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-600 leading-normal">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="mt-12 border-t border-slate-100 pt-8">
            <h2 className="text-xl font-bold text-slate-900">Frequently asked questions</h2>
            <dl className="mt-4 space-y-5">
              {guide.faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-bold text-slate-800">{f.q}</dt>
                  <dd className="mt-1 text-sm text-slate-600 leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-12 rounded-2xl bg-sky-50 border border-sky-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="font-bold text-slate-800">Want us to take care of it?</p>
              <p className="text-sm text-slate-500 mt-1">
                Serving Bournemouth, Poole &amp; Christchurch.{" "}
                <Link href={`/services/${guide.serviceSlug}`} className="text-sky-700 font-semibold hover:underline">
                  See {guide.serviceLabel}
                </Link>
              </p>
            </div>
            <Link
              href="/book"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3 px-8 rounded-xl shadow-md transition-all active:scale-[0.98] min-h-[44px]"
            >
              <Calendar className="h-5 w-5" aria-hidden="true" />
              <span>Request a Quote</span>
            </Link>
          </div>
        </article>

        <nav aria-label="More guides" className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">More guides</h2>
          <ul className="mt-3 space-y-2">
            {others.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="text-sky-700 font-semibold hover:underline">
                  {g.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
