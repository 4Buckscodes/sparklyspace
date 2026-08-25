"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const IMAGES = [
  "/pexels-alesha-260500796-13009887.jpg",
  "/pexels-ansar-muhammad-380085065-23916862.jpg",
  "/pexels-artbovich-5998138.jpg",
  "/pexels-artbovich-7546276.jpg",
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 6000); // Changes slide every 6 seconds

    return () => clearInterval(timer);
  }, [currentIndex]); // Restart timer on slide change (manually or auto)

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setCurrentIndex(index);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
    }
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full select-none overflow-hidden bg-green-950 pointer-events-none md:pointer-events-auto"
      role="region"
      aria-roledescription="carousel"
      aria-label="Clean living space slideshow background"
    >
      {/* Background Images with Cross-fade & Ken Burns Zoom */}
      {IMAGES.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={src}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${IMAGES.length}`}
            aria-hidden={!isActive}
          >
            <Image
              src={src}
              alt={`Freshly cleaned living space ${index + 1}`}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className={`object-cover transition-transform ease-out will-change-transform motion-safe:transition-transform ${
                isActive ? "scale-[1.06] duration-[6200ms]" : "scale-100 duration-1000"
              }`}
            />
          </div>
        );
      })}

      {/* Subtle bottom scrim keeps the slide controls legible over bright photos */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/45 to-transparent z-10 pointer-events-none" />

      {/* Slide Selection Controls */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 pointer-events-auto"
        role="tablist"
        aria-label="Slideshow controls"
      >
        {IMAGES.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={index}
              role="tab"
              aria-selected={isActive}
              aria-label={`Show slide ${index + 1} of ${IMAGES.length}`}
              onClick={() => handleDotClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={0}
              className={`h-2.5 rounded-full transition-all duration-300 relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 min-h-[10px] ${
                isActive
                  ? "w-8 bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                  : "w-2.5 bg-white/30 hover:bg-white/60 cursor-pointer"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
