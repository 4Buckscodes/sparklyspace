import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Heart, Leaf, Star, Calendar, MessageSquare, HelpCircle, Phone } from "lucide-react";

export default function Home() {
  const coreValues = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-sky-600" />,
      title: "100% Insured & Vetted",
      description: "Our professionals are fully background-checked, insured, and thoroughly trained to clean with absolute care.",
    },
    {
      icon: <Leaf className="h-6 w-6 text-emerald-600" />,
      title: "Eco-Friendly Products",
      description: "We offer non-toxic, child- and pet-safe cleaning options to keep your family healthy and protect the local environment.",
    },
    {
      icon: <Heart className="h-6 w-6 text-pink-600" />,
      title: "Customized Priority",
      description: "You decide what we focus on. Add priority rooms, custom parking instructions, or pet alerts to your schedule.",
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-sky-600" />,
      title: "Satisfied Guarantee",
      description: "We are committed to perfection. If any corner is not cleaned to your standards, we will make it right.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      location: "Poole (BH14)",
      initials: "SM",
      service: "Weekly Clean",
      rating: 5,
      comment: "Sparkly Space has been cleaning our home weekly for three months. It is absolutely spotless, and the team is so friendly and careful around our golden retriever!",
    },
    {
      name: "James D.",
      location: "Bournemouth (BH8)",
      initials: "JD",
      service: "End of Tenancy",
      rating: 5,
      comment: "Outstanding End-of-Tenancy clean. The inventory checkout went through without a single issue, and I got my full deposit back. Well worth it!",
    },
    {
      name: "Helen P.",
      location: "Christchurch (BH23)",
      initials: "HP",
      service: "Eco Residential",
      rating: 5,
      comment: "I love the option to request eco-friendly products. The cleaning is top-tier, and booking through the website onto WhatsApp was incredibly quick and seamless.",
    },
  ];

  const faqs = [
    {
      q: "Do I need to be home for the clean?",
      a: "No! Many of our clients leave keys in a secure lockbox or leave them with neighbors. You can specify access instructions directly in the booking wizard.",
    },
    {
      q: "Are cleaning products and equipment included?",
      a: "Yes, our cleaners bring their own professional cleaning supplies and state-of-the-art vacuums. If you have specific preferences (such as using your own vacuum or calling for eco-friendly supplies), we accommodate them at no extra charge.",
    },
    {
      q: "How does the pricing and WhatsApp checkout work?",
      a: "You select your service and room count. The website calculates an estimate based on standard properties. Once finalized, the form compiles a structured text message and hands it to WhatsApp. We confirm availability, coordinate access, and agree on the final quotation with you.",
    },
    {
      q: "Is there a minimum booking charge?",
      a: "Yes, our minimum charge is £50 for Residential cleaning, £80 for Deep cleaning, and £120 for End-of-Tenancy. This ensures we can compensate our professional cleaning teams fairly for travel and setup.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-950 via-slate-900 to-slate-950 text-white pt-8 pb-16 sm:pt-14 sm:pb-24">
        {/* Sparkle background elements */}
        <div className="absolute top-1/4 right-1/10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Trust Signal Badge */}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/20 mb-6 animate-fade-in-up">
            <span>Premium Home Cleaning in Bournemouth, Poole & Christchurch</span>
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
            We Clean, So You Can Focus on <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-300">What Matters.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional, fully vetted local cleaners. Dynamic configuration, eco-friendly options, and pre-filled WhatsApp handoff for fast, hassle-free booking.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg shadow-sky-900/30 hover:shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-base min-h-[48px]"
            >
              <Calendar className="h-5 w-5" />
              <span>Get Instant Estimate</span>
            </Link>
            <a
              href="tel:+447552427880"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 hover:bg-slate-800/40 text-slate-200 font-bold px-8 py-4 rounded-2xl transition-all active:scale-[0.98] text-base min-h-[48px]"
            >
              <Phone className="h-5 w-5 text-sky-400" />
              <span>07552 427880</span>
            </a>
          </div>

          {/* Social Proof Badges */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-slate-400 text-xs sm:text-sm font-medium border-t border-slate-800/60 pt-8">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="text-white font-bold ml-1">4.9/5 Rating</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-slate-700 hidden sm:inline" />
            <span>BH1 – BH23 Postcode Validated</span>
            <span className="h-1.5 w-1.5 rounded-full bg-slate-700 hidden sm:inline" />
            <span>100% Satisfaction Guarantee</span>
          </div>
        </div>
      </section>

      {/* 2. Campaign Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-sky-50 border border-sky-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm blue-glow">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex px-3 py-1 bg-sky-200/50 text-sky-800 font-bold text-xs rounded-full uppercase tracking-wider">
              Summer Special Offer
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Save 20% on Weekly Cleaning Services
            </h2>
            <p className="text-slate-500 text-sm">
              Book a weekly domestic clean today and receive a recurring 20% discount on every visit!
            </p>
          </div>
          <Link
            href="/book?frequency=weekly"
            className="w-full md:w-auto inline-flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 text-sm min-h-[44px]"
          >
            Claim Campaign Offer
          </Link>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Why Choose Sparkly Space?
          </h2>
          <p className="mt-4 text-slate-500 text-sm">
            We are dedicated to providing a trustworthy, premium local service with dynamic customization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-5">
                {value.icon}
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">{value.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Services Callouts */}
      <section className="bg-white border-y border-slate-100 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Our Cleaning Modules</h2>
              <p className="text-slate-500 text-sm mt-2">Transparent pricing, comprehensive scopes, and custom add-ons.</p>
            </div>
            <Link
              href="/services"
              className="text-sky-600 hover:text-sky-700 font-bold text-sm inline-flex items-center gap-1 hover:underline min-h-[44px]"
            >
              <span>Explore all services</span>
              <span className="text-xs">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Domestic */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <span className="bg-sky-100 text-sky-800 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Popular
                </span>
                <h3 className="text-lg font-bold text-slate-950 mt-3">Residential Clean</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">Starting from £40</p>
                <p className="text-slate-500 text-xs leading-relaxed mt-3">
                  Our core housekeeping. Perfect for maintaining kitchens, baths, floors, and general dusting on a weekly or bi-weekly cycle.
                </p>
              </div>
              <Link
                href="/book?service=residential"
                className="mt-6 w-full text-center bg-white hover:bg-sky-50 text-slate-800 font-bold py-2.5 px-4 rounded-xl border border-slate-200 text-xs block transition-all min-h-[40px]"
              >
                Estimate &amp; Book
              </Link>
            </div>

            {/* Deep */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Deep Clean
                </span>
                <h3 className="text-lg font-bold text-slate-950 mt-3">Deep Cleaning</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">Starting from £70</p>
                <p className="text-slate-500 text-xs leading-relaxed mt-3">
                  A comprehensive reset. Focusing on limescale buildup, skirting boards, high dusting, door frames, and hard-to-reach places.
                </p>
              </div>
              <Link
                href="/book?service=deep-clean"
                className="mt-6 w-full text-center bg-white hover:bg-sky-50 text-slate-800 font-bold py-2.5 px-4 rounded-xl border border-slate-200 text-xs block transition-all min-h-[40px]"
              >
                Estimate &amp; Book
              </Link>
            </div>

            {/* End of Tenancy */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <span className="bg-amber-100 text-amber-800 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Inventory checkout
                </span>
                <h3 className="text-lg font-bold text-slate-950 mt-3">End of Tenancy</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">Starting from £120</p>
                <p className="text-slate-500 text-xs leading-relaxed mt-3">
                  Fully guaranteed checkout cleaning. Includes inside oven, fridge, internal windows, and cabinets. Meet landlord requirements.
                </p>
              </div>
              <Link
                href="/book?service=end-of-tenancy"
                className="mt-6 w-full text-center bg-white hover:bg-sky-50 text-slate-800 font-bold py-2.5 px-4 rounded-xl border border-slate-200 text-xs block transition-all min-h-[40px]"
              >
                Estimate &amp; Book
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
            <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
            <span>Customer Testimonials</span>
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-3">
            What Our Neighbors Say
          </h2>
          <p className="mt-3 text-slate-500 text-sm">
            Trusted by households and companies across Bournemouth, Christchurch, and Poole.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 border-l-4 border-l-gold-500/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 hover:border-slate-200/80 transition-all duration-300 ease-out flex flex-col justify-between"
            >
              {/* Giant background quote mark */}
              <span className="absolute top-4 right-6 text-7xl text-slate-100 font-serif select-none pointer-events-none">&ldquo;</span>

              <div className="relative">
                {/* Client Info Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-50 to-sky-100/50 text-sky-700 flex items-center justify-center font-extrabold text-xs tracking-wider border border-sky-100">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 leading-tight">{t.name}</h4>
                    <p className="text-[11px] text-slate-400 font-semibold leading-tight mt-0.5">{t.location}</p>
                  </div>
                </div>

                {/* Rating & Service Tag */}
                <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-50">
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex px-2 py-0.5 bg-sky-50 text-sky-700 text-[9px] font-extrabold rounded-full border border-sky-100/50">
                    {t.service}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-slate-600 italic text-sm leading-relaxed">&ldquo;{t.comment}&rdquo;</p>
              </div>

              {/* Verified Badge Footer */}
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/30">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" /> Verified Clean
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="bg-white border-t border-slate-100 py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-100">
              <HelpCircle className="h-3.5 w-3.5 text-sky-500" />
              <span>Common Questions</span>
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-start gap-2.5">
                  <span className="text-sky-600 font-black">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="mt-2 text-slate-600 text-sm pl-6 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="bg-gradient-to-b from-slate-900 to-sky-950 text-white py-10 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Experience the Cleanliness You Deserve
          </h2>
          <p className="text-slate-300 font-light max-w-xl mx-auto mb-8 text-sm leading-relaxed">
            Ready to configure your clean? It takes less than 2 minutes, provides an estimated pricing immediately, and sends it directly to our team on WhatsApp.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] text-base min-h-[48px]"
          >
            <Calendar className="h-5 w-5" />
            <span>Configure Booking Enquiry</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
