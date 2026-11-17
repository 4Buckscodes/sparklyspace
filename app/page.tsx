import React from "react";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Campaign from "@/components/sections/Campaign";
import ValueGrid from "@/components/sections/ValueGrid";
import ServicesCallout from "@/components/sections/ServicesCallout";
import WorkGallery from "@/components/sections/WorkGallery";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

import { coreValues, testimonials, faqs } from "@/data/home-content";
import { workPhotos, beforeAfterPairs } from "@/lib/images";

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <div className="bg-[#fffdf6] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* 1. Hero Carousel Banner */}
      <Hero />

      {/* 2. Credential bar — what protects the customer, before any ask */}
      <TrustBar />

      {/* 3. Campaign Promo banner */}
      <Campaign />

      {/* 4. Why Choose Us (Value propositions Grid) */}
      <ValueGrid items={coreValues} />

      {/* 5. Core consumer module lists */}
      <ServicesCallout />

      {/* 6. Proof of work — the finishes we actually deliver, room by room */}
      <WorkGallery photos={workPhotos} />

      {/* 7. Before/after proof — renders only when real job pairs are added */}
      {beforeAfterPairs.map((pair) => (
        <section
          key={pair.label}
          className="bg-white border-y border-slate-100 py-14 sm:py-20"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Before &amp; After
              </h2>
              <p className="mt-3 text-slate-500 text-sm sm:text-base">
                Drag the handle to see the difference a Sparkly Space clean makes.
              </p>
            </div>
            <BeforeAfterSlider pair={pair} />
          </div>
        </section>
      ))}

      {/* 8. Client feedback slide details */}
      <Testimonials items={testimonials} />

      {/* 9. General helper queries accordion list */}
      <FAQ items={faqs} />

      {/* 10. Bottom call to WhatsApp inquiry */}
      <FinalCTA />
    </div>
  );
}
