import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";
import type { JobPhoto } from "@/lib/images";

interface WorkGalleryProps {
  photos: JobPhoto[];
  heading?: string;
  subheading?: string;
  showServicesLink?: boolean;
}

/**
 * Second proof layer: real job photography, room by room.
 *
 * A masonry column layout is used deliberately — the source photos are phone
 * shots in mixed orientations, and cropping a 3:4 kitchen into a 16:9 tile
 * throws away the detail that makes the photo worth showing. Each image keeps
 * its natural aspect ratio; captions describe the finish, never a customer.
 */
export default function WorkGallery({
  photos,
  heading = "Real jobs. Real results.",
  subheading = "Photographed on our own cleans across Bournemouth, Poole and Christchurch — kitchens, bathrooms, ovens, carpets and workplaces. No stock photos.",
  showServicesLink = true,
}: WorkGalleryProps) {
  if (photos.length === 0) return null;

  return (
    <section
      id="our-work"
      aria-labelledby="our-work-heading"
      className="bg-[#fffdf6] py-10 sm:py-20 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
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

        {/*
          Mobile: two columns, captions reduced to a single line. Seven full-width
          portrait photos stacked in one column made this section ~3.5 screens of
          scrolling on a phone; two columns roughly halves it without cropping.
        */}
        <div className="columns-2 md:columns-3 gap-2.5 sm:gap-4">
          {photos.map((photo) => (
            <figure
              key={photo.src + photo.title}
              className="relative mb-2.5 sm:mb-4 break-inside-avoid overflow-hidden rounded-xl sm:rounded-2xl bg-slate-200 group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="w-full h-auto object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent p-2.5 sm:p-4">
                <span className="hidden sm:inline-flex rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-white backdrop-blur-sm">
                  {photo.tag}
                </span>
                <p className="sm:mt-1 text-[11px] sm:text-base font-extrabold text-white leading-tight">
                  {photo.title}
                </p>
                <p className="hidden sm:block mt-0.5 text-xs text-slate-200 leading-snug">
                  {photo.detail}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
