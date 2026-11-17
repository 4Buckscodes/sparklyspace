import React from "react";
import { ShieldCheck, FileCheck2, RotateCcw, Leaf, Clock } from "lucide-react";

/**
 * Credential bar — the first proof layer.
 *
 * Placed directly beneath the hero (and again under the booking wizard) so the
 * visitor sees *what protects them* before they are asked to do anything.
 * Icons are decorative; the claims are carried by text for screen readers.
 */

const CREDENTIALS = [
  {
    Icon: ShieldCheck,
    tile: "bg-sky-100 text-sky-700",
    title: "Background-checked cleaners",
    detail: "ID and references verified before a first clean.",
  },
  {
    Icon: FileCheck2,
    tile: "bg-emerald-100 text-emerald-700",
    title: "Fully insured",
    detail: "Public liability cover for your home and contents.",
  },
  {
    Icon: RotateCcw,
    tile: "bg-amber-100 text-amber-700",
    title: "24-hour re-clean guarantee",
    detail: "Missed a corner? We return and put it right, free.",
  },
  {
    Icon: Leaf,
    tile: "bg-lime-100 text-lime-700",
    title: "Eco products on request",
    detail: "Non-toxic, child- and pet-safe options available.",
  },
  {
    Icon: Clock,
    tile: "bg-orange-100 text-orange-700",
    title: "Mon–Sun, 8am–8pm",
    detail: "Early starts and evening turnarounds available.",
  },
];

interface TrustBarProps {
  /** Tighter variant used under the booking wizard. */
  compact?: boolean;
  className?: string;
}

export default function TrustBar({ compact = false, className = "" }: TrustBarProps) {
  if (compact) {
    return (
      <ul className={`grid grid-cols-2 sm:grid-cols-4 gap-3 text-left ${className}`}>
        {CREDENTIALS.slice(0, 4).map(({ Icon, tile, title }) => (
          <li
            key={title}
            className="flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-3 py-2.5"
          >
            <span className={`h-7 w-7 shrink-0 rounded-lg ${tile} flex items-center justify-center`}>
              <Icon className="h-4 w-4" aria-hidden="true" focusable="false" />
            </span>
            <span className="text-[11px] font-bold leading-tight text-slate-700">{title}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section
      aria-label="What every Sparkly Space clean includes"
      className={`bg-white border-y border-slate-100 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <ul className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-5">
          {CREDENTIALS.map(({ Icon, tile, title, detail }) => (
            <li key={title} className="flex items-start gap-3">
              <span className={`h-9 w-9 shrink-0 rounded-xl ${tile} flex items-center justify-center`}>
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" focusable="false" />
              </span>
              <div>
                <p className="text-[13px] font-extrabold text-slate-900 leading-tight">{title}</p>
                <p className="mt-1 text-[11px] leading-snug text-slate-500">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
