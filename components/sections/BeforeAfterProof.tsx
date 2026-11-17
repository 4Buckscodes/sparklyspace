import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import type { BeforeAfterPair } from "@/lib/images";

/**
 * Third proof layer: before/after evidence.
 *
 * Two renderers because honesty depends on framing:
 *  - `slider`  → identical camera position, so the wipe reads as one room.
 *  - `pair`    → side-by-side, for pairs shot at different zoom or angle.
 * Using the slider on mismatched framing looks staged, so the data decides.
 */
export default function BeforeAfterProof({ pairs }: { pairs: BeforeAfterPair[] }) {
  if (pairs.length === 0) return null;

  const sliders = pairs.filter((p) => p.kind === "slider");
  const sideBySide = pairs.filter((p) => p.kind === "pair");

  return (
    <section
      id="before-after"
      aria-labelledby="before-after-heading"
      className="bg-white border-y border-slate-100 py-14 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
            <Sparkles className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" focusable="false" />
            <span>Before &amp; After</span>
          </span>
          <h2
            id="before-after-heading"
            className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900"
          >
            The difference, not the promise
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
            Same room, same angle, photographed on our own jobs. The only edit is the wipe.
          </p>
        </div>

        {sliders.length > 0 && (
          <div
            className={`grid gap-10 ${sliders.length > 1 ? "sm:grid-cols-2" : ""}`}
          >
            {sliders.map((pair) => (
              <BeforeAfterSlider key={pair.label} pair={pair} />
            ))}
          </div>
        )}

        {sideBySide.length > 0 && (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 ${
              sliders.length > 0 ? "mt-12 sm:mt-16" : ""
            }`}
          >
            {sideBySide.map((pair) => (
              <figure key={pair.label}>
                <div className="grid grid-cols-2 gap-1 overflow-hidden rounded-2xl bg-slate-200">
                  <div
                    className="relative"
                    style={{ aspectRatio: `${pair.before.width} / ${pair.before.height}` }}
                  >
                    <Image
                      src={pair.before.src}
                      alt={pair.before.alt}
                      fill
                      sizes="(min-width: 768px) 24vw, 50vw"
                      className="object-cover"
                    />
                    <span className="absolute top-2 left-2 rounded-full bg-slate-950/70 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-white">
                      Before
                    </span>
                  </div>
                  <div
                    className="relative"
                    style={{ aspectRatio: `${pair.after.width} / ${pair.after.height}` }}
                  >
                    <Image
                      src={pair.after.src}
                      alt={pair.after.alt}
                      fill
                      sizes="(min-width: 768px) 24vw, 50vw"
                      className="object-cover"
                    />
                    <span className="absolute top-2 right-2 rounded-full bg-sky-600/90 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-white">
                      After
                    </span>
                  </div>
                </div>
                <figcaption className="mt-3 text-xs font-semibold text-slate-500 text-center">
                  {pair.label}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
