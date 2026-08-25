"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, Clock } from "lucide-react";
import Logo from "./Logo";
import { analytics } from "@/lib/analytics";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleContactClick = (channel: "phone" | "whatsapp" | "email" | "instagram" | "tiktok" | "facebook") => {
    analytics.trackContactClick(channel);
  };

  return (
    <footer className="bg-green-950 text-slate-300 border-t border-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand + socials */}
          <div className="space-y-5">
            <Link href="/" className="inline-block bg-green-900/40 p-2.5 rounded-xl border border-green-800/50">
              <Logo iconOnly={false} className="h-9 w-auto" lightText={true} />
            </Link>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/sparklyspace01?utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleContactClick("instagram")}
                aria-label="Follow us on Instagram"
                className="flex items-center justify-center h-10 w-10 rounded-xl bg-green-900/70 hover:bg-green-600 hover:text-white transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-green-500"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/sparklyspace01"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleContactClick("facebook")}
                aria-label="Follow us on Facebook"
                className="flex items-center justify-center h-10 w-10 rounded-xl bg-green-900/70 hover:bg-green-600 hover:text-white transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-green-500"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@sparklyspace?_r=1&_t=ZN-98BbZfhfR8o"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleContactClick("tiktok")}
                aria-label="Follow us on TikTok"
                className="flex items-center justify-center h-10 w-10 rounded-xl bg-green-900/70 hover:bg-green-600 hover:text-white transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-green-500"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.5-4.09-1.32-.23-.16-.45-.34-.67-.53v6.86c.03 2.15-.75 4.35-2.29 5.86-1.58 1.57-3.9 2.32-6.12 2.05-2.48-.3-4.78-1.95-5.78-4.27-1.12-2.61-.63-5.89 1.25-8 1.48-1.67 3.75-2.43 5.96-2.12v4.06c-1.18-.18-2.45.15-3.23.99-.89.96-.98 2.52-.22 3.59.73 1.05 2.14 1.52 3.32 1.14.93-.3 1.61-1.16 1.64-2.14.02-2.52.01-8.77.01-11.29.02-.13.01-.27.02-.4z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="md:text-right">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+447552427880"
                  onClick={() => handleContactClick("phone")}
                  className="inline-flex items-center gap-3 hover:text-white transition-colors md:flex-row-reverse"
                >
                  <Phone className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>07552 427880</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447552427880"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleContactClick("whatsapp")}
                  className="inline-flex items-center gap-3 hover:text-white transition-colors md:flex-row-reverse"
                >
                  <svg className="h-4 w-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.256 5.26.001 11.724.001C14.854.003 17.8.22 20.016 2.438c2.216 2.217 3.434 5.166 3.431 8.297c-.005 6.465-5.263 11.722-11.727 11.722c-2.007-.001-3.978-.515-5.733-1.499L0 24zm6.29-3.731l.374.222c1.53.908 3.256 1.386 5.011 1.388c5.441.002 9.87-4.425 9.874-9.864c.002-2.634-1.02-5.109-2.883-6.974C16.899 3.176 14.43 2.15 11.729 2.15c-5.438 0-9.87 4.426-9.873 9.866c-.001 1.83.479 3.618 1.392 5.148l.244.407L2.49 21.52l4.032-.973l-.175-.278z"/>
                  </svg>
                  <span>WhatsApp Chat</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sparklyspace.co.uk"
                  onClick={() => handleContactClick("email")}
                  className="inline-flex items-center gap-3 hover:text-white transition-colors md:flex-row-reverse"
                >
                  <Mail className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="break-all">info@sparklyspace.co.uk</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-slate-400 md:flex-row-reverse">
                <Clock className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>Mon – Sun · 8am – 8pm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 pt-6 border-t border-green-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} Sparkly Space Cleaning Services. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
