import React from "react";
import Hero from "@/components/sections/Hero";
import Campaign from "@/components/sections/Campaign";
import ValueGrid from "@/components/sections/ValueGrid";
import ServicesCallout from "@/components/sections/ServicesCallout";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

import { coreValues, testimonials, faqs } from "@/data/home-content";

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Carousel Banner */}
      <Hero />

      {/* 2. Campaign Promo banner */}
      <Campaign />

      {/* 3. Why Choose Us (Value propositions Grid) */}
      <ValueGrid items={coreValues} />

      {/* 4. Core consumer module lists */}
      <ServicesCallout />

      {/* 5. Client feedback slide details */}
      <Testimonials items={testimonials} />

      {/* 6. General helper queries accordion list */}
      <FAQ items={faqs} />

      {/* 7. Bottom call to WhatsApp inquiry */}
      <FinalCTA />
    </div>
  );
}
