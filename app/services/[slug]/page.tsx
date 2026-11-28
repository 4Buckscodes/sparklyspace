import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";
import { guides } from "@/data/guides";
import { locations } from "@/data/locations";
import { serviceSeo } from "@/data/service-seo";
import { servicePhotos } from "@/lib/images";
import { Check, Calendar, ArrowLeft, Shield, AlertCircle, ShoppingCart } from "lucide-react";
import type { Metadata } from "next";
import { serviceJsonLd, breadcrumbJsonLd, faqPageJsonLd, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static routes for build time
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Dynamic SEO metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const seo = serviceSeo[service.slug];

  return {
    title: seo ? { absolute: seo.title } : `${service.name} in Bournemouth, Poole & Christchurch`,
    description:
      seo?.description ??
      `${service.name} in Bournemouth, Poole & Christchurch. ${service.tagline} Request a personalised quote today.`,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: seo
      ? {
          title: seo.title,
          description: seo.description,
          url: `${SITE_URL}/services/${service.slug}`,
          type: "website",
        }
      : undefined,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const photo = servicePhotos[service.id];
  const seo = serviceSeo[service.slug];

  const jsonLd = [
    serviceJsonLd(service),
    ...(seo ? [faqPageJsonLd(seo.faqs)] : []),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.name, path: `/services/${service.slug}` },
    ]),
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-sky-600 transition-colors mb-8 min-h-[44px]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all services</span>
        </Link>

        {/* Service photography — the standard behind the checklist */}
        {photo && (
          <div className="relative mb-8 overflow-hidden rounded-3xl bg-slate-200 aspect-[4/3] sm:aspect-[16/10] shadow-sm">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent p-4 sm:p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-sky-200">
                {service.name}
              </p>
              <p className="mt-1 text-sm sm:text-base font-bold text-white leading-snug">
                Finished to a documented checklist — then checked before we leave.
              </p>
            </div>
          </div>
        )}

        {/* Detailed Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12 animate-fade-in-up">
          {/* Header */}
          <div className="border-b border-slate-100 pb-8 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-100 mb-3">
              <span>{service.tagline}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {seo?.h1 ?? service.name}
            </h1>
            <p className="mt-4 text-slate-500 text-base leading-relaxed">
              {seo?.intro ?? service.description}
            </p>
          </div>

          {/* Pricing Info */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-sky-500" />
              <span>Personalised Quoting Process</span>
            </h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                Every property and cleaning requirement is different. We prepare quotations based on the type of cleaning required, the size and condition of the property, the level of work involved, access arrangements and any additional services requested.
              </p>
              <p>
                We may request photographs, a short video or a property walkthrough before confirming the final quotation. This ensures our team is perfectly prepared and provides an accurate, honest price for your service.
              </p>
              {!service.isQuoteOnly && (
                <div className="pt-3 border-t border-slate-200/60 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-500">
                  <span>Guide Price: From £{service.basePrice}</span>
                  <span className="text-slate-300">|</span>
                  <span>Minimum booking: £{service.minimumCharge}</span>
                  <span className="text-slate-300">|</span>
                  <span>Discounts: Up to 10% off for regular schedules</span>
                </div>
              )}
            </div>
          </div>

          {/* Inclusions */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-sky-500" />
              <span>Service Inclusion Checklist</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.includedScope.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 leading-normal">
                  <Check className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons/Extras if available */}
          {service.extras.length > 0 && (
            <div className="border-t border-slate-100 pt-8 mb-10">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-sky-500" />
                <span>Custom Add-Ons Available</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.extras.map((extra) => (
                  <div
                    key={extra.id}
                    className="p-4 rounded-2xl bg-white border border-slate-100 hover:border-sky-100 transition-all flex justify-between items-start gap-3"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-800">{extra.name}</p>
                      <p className="text-xs text-slate-400 mt-1">{extra.description}</p>
                    </div>
                    <span className="bg-sky-50 text-sky-600 font-extrabold text-xs px-2.5 py-1 rounded-full border border-sky-100 whitespace-nowrap">
                      {extra.price > 0 ? `+£${extra.price}` : "On request"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs — also emitted as FAQPage schema */}
          {seo && (
            <div className="border-t border-slate-100 pt-8 mb-10">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Frequently asked questions</h2>
              <dl className="space-y-5">
                {seo.faqs.map((f) => (
                  <div key={f.q}>
                    <dt className="font-bold text-slate-800">{f.q}</dt>
                    <dd className="mt-1 text-sm text-slate-600 leading-relaxed">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Areas covered — internal links to the town pages */}
          <div className="border-t border-slate-100 pt-8 mb-10 text-sm text-slate-600">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Where we work</h2>
            <p>
              We provide this service across{" "}
              {locations.map((l, i) => (
                <React.Fragment key={l.slug}>
                  {i > 0 && (i === locations.length - 1 ? " and " : ", ")}
                  <Link href={`/${l.slug}`} className="text-sky-700 font-semibold hover:underline">
                    {l.name}
                  </Link>
                </React.Fragment>
              ))}
              .
            </p>
          </div>

          {/* Related guides and audiences — internal links */}
          {(() => {
            const related = guides.filter((g) => g.serviceSlug === service.slug);
            if (related.length === 0 && service.slug !== "end-of-tenancy-cleaning") return null;
            return (
              <div className="border-t border-slate-100 pt-8 mb-10 text-sm text-slate-600">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Helpful reading</h2>
                <ul className="space-y-1.5">
                  {related.map((g) => (
                    <li key={g.slug}>
                      <Link href={`/guides/${g.slug}`} className="text-sky-700 font-semibold hover:underline">
                        {g.shortTitle}
                      </Link>
                    </li>
                  ))}
                  {["end-of-tenancy-cleaning", "airbnb-cleaning", "commercial-cleaning"].includes(service.slug) && (
                    <li>
                      <Link href="/landlords" className="text-sky-700 font-semibold hover:underline">
                        Cleaning for landlords &amp; letting agents
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            );
          })()}

          {/* Call to Action Banner */}
          <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-slate-800">Ready to request your personalised quote?</p>
              <p className="text-xs text-slate-400 mt-1">Takes less than 2 minutes to compile your request details.</p>
            </div>
            <Link
              href={`/book?service=${service.id}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3 px-8 rounded-xl shadow-md shadow-sky-100 hover:shadow-lg transition-all active:scale-[0.98] min-h-[44px]"
            >
              <Calendar className="h-5 w-5" />
              <span>Request a Quote</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
