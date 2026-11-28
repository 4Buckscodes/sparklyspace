"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export const CONSENT_KEY = "ss_cookie_consent";
export const OPEN_SETTINGS_EVENT = "open-cookie-settings";

type Choice = "granted" | "denied";

function applyConsent(choice: Choice) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", { analytics_storage: choice });
}

/**
 * Cookie consent banner. Only shown when Google Analytics is configured
 * (NEXT_PUBLIC_GA_ID); without it the site sets no non-essential cookies.
 * The saved choice is read by the consent-default script in GoogleAnalytics,
 * so a returning visitor's choice applies before any analytics runs.
 */
export default function CookieBanner() {
  const enabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {
      /* storage blocked: treat as no choice yet */
    }
    // Deferred so the first render matches the server output.
    const t = window.setTimeout(() => setVisible(stored !== "granted" && stored !== "denied"), 0);
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
    };
  }, [enabled]);

  if (!enabled || !visible) return null;

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      /* ignore */
    }
    applyConsent(choice);
    setVisible(false);
  };

  const btn =
    "flex-1 sm:flex-none min-h-[44px] rounded-xl px-6 py-2.5 text-sm font-bold transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-20 md:bottom-4 md:left-auto md:right-4 md:max-w-md z-[60] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
    >
      <p className="text-sm font-bold text-slate-900">Cookies on Sparkly Space</p>
      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
        We&apos;d like to use analytics cookies to see which pages are useful and improve the site. They are optional and
        don&apos;t collect your name or contact details.{" "}
        <Link href="/privacy#cookies" className="text-sky-700 font-semibold hover:underline">
          Read more
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose("denied")}
          className={`${btn} border border-slate-300 bg-white text-slate-800 hover:bg-slate-50`}
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className={`${btn} bg-sky-600 text-white hover:bg-sky-700`}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
