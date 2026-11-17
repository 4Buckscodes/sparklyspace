import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";
import type { WorkPhoto } from "@/lib/images";

interface WorkGalleryProps {
  photos: WorkPhoto[];
  heading?: string;
  subheading?: string;
  /** Hide the "explore services" link when the gallery is used on a service page. */
  showServicesLink?: boolean;
}

/**
 * Second proof layer: show the standard of work, room by room.
 *
 * Layout is deliberately editorial — one wide feature tile, a grid of supporting
 * tiles, then a full-width closer — so it reads as a portfolio rather than a
 * stock-photo carousel. Captions describe the *standard shown*, never a specific
 * customer's address.
 */
export default function WorkGallery({
  photos,
  heading = "What a Sparkly Space clean actually looks like",
  subheading = "Not stock promises — the finishes we work to in every room, on every visit. Kitchens, bathrooms, bedrooms, rentals and workplaces across Bournemouth, Poole and Christchurch.",
  showServicesLink = true,
}: WorkGalleryProps) {
  if (photos.length < 3) return null;

  const [feature, ...rest] = photos;
  const grid = rest.slice(0, -1);
  const closer = rest[rest.length - 1];

  return (
    <section
      id="our-work"
      aria-labelledby="our-work-heading"
      className="bg-[#fffdf6] py-14 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
              <Camera className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" focusable="false" />
              <span>Our Standard</span>
            </span>
            <h2
              id="our-work-heading"
              className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900"
            >
              {heading}
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">{subheading}</p>
          </div>
          {showServicesLink && (
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700 hover:underline min-h-[44px] shrink-0"
            >
              <span>See what each service includes</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Feature tile */}
          <figure className="relative sm:col-span-2 lg:col-span-3 overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-200 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] group">
            <Image
              src={feature.src}
              alt={feature.alt}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-4 sm:p-6">
              <span className="inline-flex rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-white backdrop-blur-sm">
                {feature.tag}
              </span>
              <p className="mt-1.5 text-base sm:text-xl font-extrabold text-white leading-tight">
                {feature.title}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-200 max-w-lg leading-snug">
                {feature.detail}
              </p>
            </figcaption>
          </figure>

          {/* Supporting tiles */}
          {grid.map((photo) => (
            <figure
              key={photo.src + photo.title}
              className="relative overflow-hidden rounded-2xl bg-slate-200 aspect-[4/3] group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-3.5 sm:p-4">
                <span className="inline-flex rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-white backdrop-blur-sm">
                  {photo.tag}
                </span>
                <p className="mt-1 text-sm font-extrabold text-white leading-tight">{photo.title}</p>
                <p className="mt-0.5 text-[11px] text-slate-200 leading-snug">{photo.detail}</p>
              </figcaption>
            </figure>
          ))}

          {/* Full-width closer */}
          {closer && (
            <figure className="relative sm:col-span-2 lg:col-span-3 overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-200 aspect-[16/10] sm:aspect-[21/9] group">
              <Image
                src={closer.src}
                alt={closer.alt}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-4 sm:p-6">
                <span className="inline-flex rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-white backdrop-blur-sm">
                  {closer.tag}
                </span>
                <p className="mt-1.5 text-base sm:text-xl font-extrabold text-white leading-tight">
                  {closer.title}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-200 leading-snug max-w-2xl">
                  {closer.detail}
                </p>
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
