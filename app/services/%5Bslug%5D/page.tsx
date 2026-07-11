import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/data/services";
import { Check, Calendar, ArrowLeft, Shield, AlertCircle, ShoppingCart } from "lucide-react";
import type { Metadata } from "next";

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

  return {
    title: `${service.name} in Bournemouth, Poole & Christchurch`,
    description: `${service.description} Clean, professional, and reliable services with transparent pricing.`,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-sky-600 transition-colors mb-8 min-h-[44px]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all services</span>
        </Link>

        {/* Detailed Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12 animate-fade-in-up">
          {/* Header */}
          <div className="border-b border-slate-100 pb-8 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-100 mb-3">
              <span>{service.tagline}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {service.name}
            </h1>
            <p className="mt-4 text-slate-500 text-base leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Pricing Info */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-sky-500" />
              <span>Pricing & Rate Structures</span>
            </h2>
            {service.isQuoteOnly ? (
              <p className="text-sm text-slate-600 leading-relaxed">
                Commercial spaces and complex properties require bespoke quotes. Our team will contact you to discuss details and provide a competitive pricing proposal.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="text-slate-400 font-medium">Base Charge (1 Bed, 1 Bath)</p>
                  <p className="text-xl font-extrabold text-slate-800 mt-1">£{service.basePrice}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Additional Bedroom / Bathroom</p>
                  <p className="text-xl font-extrabold text-slate-800 mt-1">+£{service.pricePerBedroom} / each</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Minimum Booking Fee</p>
                  <p className="text-xl font-extrabold text-sky-600 mt-1">£{service.minimumCharge}</p>
                </div>
              </div>
            )}
            {!service.isQuoteOnly && (
              <p className="text-xs text-slate-400 mt-4 leading-normal italic">
                *Note: Rates are subject to frequency discounts (up to 20% off for weekly cleans). Calculations are dynamically output in the checkout wizard.
              </p>
            )}
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
                    <span className="bg-sky-50 text-sky-600 font-extrabold text-xs px-2.5 py-1 rounded-full border border-sky-100">
                      +£{extra.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action Banner */}
          <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-slate-800">Ready to book your clean?</p>
              <p className="text-xs text-slate-400 mt-1">Takes less than 2 minutes to select options and send via WhatsApp.</p>
            </div>
            <Link
              href={`/book?service=${service.id}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3 px-8 rounded-xl shadow-md shadow-sky-100 hover:shadow-lg transition-all active:scale-[0.98] min-h-[44px]"
            >
              <Calendar className="h-5 w-5" />
              <span>Configure Cleaning Request</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
