import React from "react";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Campaign from "@/components/sections/Campaign";
import ValueGrid from "@/components/sections/ValueGrid";
import ServicesCallout from "@/components/sections/ServicesCallout";
import WorkGallery from "@/components/sections/WorkGallery";
import BeforeAfterProof from "@/components/sections/BeforeAfterProof";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

import { coreValues, testimonials, faqs } from "@/data/home-content";
import { jobPhotos, beforeAfterPairs } from "@/lib/images";

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

      {/* 6. Proof of work — real job photography, room by room */}
      <WorkGallery photos={jobPhotos} />

      {/* 7. Before/after evidence — sliders for aligned shots, pairs otherwise */}
      <BeforeAfterProof pairs={beforeAfterPairs} />

      {/* 8. Client feedback slide details */}
      <Testimonials items={testimonials} />

      {/* 9. General helper queries accordion list */}
      <FAQ items={faqs} />

      {/* 10. Bottom call to WhatsApp inquiry */}
      <FinalCTA />
    </div>
  );
}
