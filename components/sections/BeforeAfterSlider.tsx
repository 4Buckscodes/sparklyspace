"use client";

import React, { useId, useState } from "react";
import Image from "next/image";
import type { BeforeAfterPair } from "@/lib/images";

/**
 * Third proof layer: a drag-to-compare before/after slider.
 *
 * Renders nothing when no pairs are supplied, so it stays dormant until real
 * job photography exists. The range input doubles as the keyboard/screen-reader
 * control, so it works without pointer precision.
 */
export default function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const [position, setPosition] = useState(50);
  const inputId = useId();

  if (!pair) return null;

  return (
    <figure className="w-full">
      <div className="relative overflow-hidden rounded-3xl bg-slate-200 aspect-[4/3] sm:aspect-[16/9] select-none">
        {/* AFTER: the finished result is the base layer */}
        <Image
          src={pair.after.src}
          alt={pair.after.alt}
          fill
          sizes="(min-width: 1024px) 900px, 100vw"
          className="object-cover"
        />

        {/* BEFORE: clipped to the left of the handle */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden="true"
        >
          <Image
            src={pair.before.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Handle + labels */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.35)]"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 6 4 12l5 6M15 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white">
          Before
        </span>
        <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-sky-600/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white">
          After
        </span>

        <label htmlFor={inputId} className="sr-only">
          Drag to compare before and after: {pair.label}
        </label>
        <input
          id={inputId}
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 focus-visible:opacity-100"
          aria-valuetext={`${position}% before, ${100 - position}% after`}
        />
      </div>
      <figcaption className="mt-3 text-xs font-semibold text-slate-500">{pair.label}</figcaption>
    </figure>
  );
}
