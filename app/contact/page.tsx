import React from "react";
import { Mail, Phone, Clock, MapPin, CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact & Service Area | Sparkly Space Cleaning",
  description: "Get in touch with Sparkly Space Cleaning Services. We serve Bournemouth, Christchurch, and Poole, postcodes BH1 to BH23.",
};

export default function ContactPage() {
  const serviceAreas = [
    { name: "Bournemouth", postcodes: "BH1 - BH11" },
    { name: "Poole", postcodes: "BH12 - BH18" },
    { name: "Christchurch", postcodes: "BH23" },
    { name: "Ferndown & Wimborne", postcodes: "BH21, BH22" },
    { name: "Purbeck & Wareham", postcodes: "BH19, BH20" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700 border border-sky-200 mb-4 animate-fade-in-up">
            <span>Here to Help</span>
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Get in Touch with Sparkly Space
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            Have questions about our cleaning standards, pricing structure, or custom options? We are here to provide clear answers and tailored solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-100 border border-slate-100 space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Get in Touch</h2>
              
              <div className="space-y-6">
                <a
                  href="tel:+447552427880"
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors min-h-[48px]"
                >
                  <div className="h-11 w-11 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</p>
                    <p className="text-base font-bold text-slate-800 mt-0.5">07552 427880</p>
                    <p className="text-xs text-slate-400 mt-0.5">Click to dial</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/447552427880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors min-h-[48px]"
                >
                  <div className="h-11 w-11 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.256 5.26.001 11.724.001C14.854.003 17.8.22 20.016 2.438c2.216 2.217 3.434 5.166 3.431 8.297c-.005 6.465-5.263 11.722-11.727 11.722c-2.007-.001-3.978-.515-5.733-1.499L0 24zm6.29-3.731l.374.222c1.53.908 3.256 1.386 5.011 1.388c5.441.002 9.87-4.425 9.874-9.864c.002-2.634-1.02-5.109-2.883-6.974C16.899 3.176 14.43 2.15 11.729 2.15c-5.438 0-9.87 4.426-9.873 9.866c-.001 1.83.479 3.618 1.392 5.148l.244.407L2.49 21.52l4.032-.973l-.175-.278z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">WhatsApp</p>
                    <p className="text-base font-bold text-slate-800 mt-0.5">Send a message</p>
                    <p className="text-xs text-slate-400 mt-0.5">Fastest reply channel</p>
                  </div>
                </a>

                <a
                  href="mailto:sparklyspace01@gmail.com"
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors min-h-[48px]"
                >
                  <div className="h-11 w-11 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</p>
                    <p className="text-base font-bold text-slate-800 mt-0.5 break-all">sparklyspace01@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl">
                  <div className="h-11 w-11 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Hours</p>
                    <p className="text-base font-bold text-slate-800 mt-0.5">Monday – Sunday</p>
                    <p className="text-sm text-slate-500">8:00 AM – 8:00 PM</p>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3 px-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Follow Us:</span>
                  <a
                    href="https://www.instagram.com/sparklyspace01?utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-sky-600 bg-slate-50 hover:bg-sky-50 px-3 py-1.5 rounded-xl border border-slate-200/80 transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.tiktok.com/@sparklyspace?_r=1&_t=ZN-98BbZfhfR8o"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-sky-600 bg-slate-50 hover:bg-sky-50 px-3 py-1.5 rounded-xl border border-slate-200/80 transition-colors"
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Service Area Grid Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-100 border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-sky-500" />
                <span>Service Coverage Area</span>
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                We validate and serve the following areas in and around Bournemouth, Christchurch, and Poole:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {serviceAreas.map((area, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{area.name}</p>
                      <p className="text-xs text-sky-600 font-semibold mt-0.5">{area.postcodes}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-sky-50 border border-sky-100 rounded-2xl p-6 text-center">
                <h3 className="text-sky-800 font-bold mb-2">Outside Our standard Postcode Area?</h3>
                <p className="text-sky-700/80 text-sm leading-relaxed mb-4">
                  If your property falls outside BH1-BH23, please get in touch anyway! We frequently accommodate custom deep cleans, office contracts, and holiday let portfolios across Dorset.
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-sky-200 active:scale-95 text-sm min-h-[44px]"
                >
                  Configure a Cleaning Request
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
