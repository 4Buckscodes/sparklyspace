import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  lightText?: boolean;
}

export default function Logo({ className = "h-10 w-auto", iconOnly = false, lightText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Logo Image from public directory */}
      <img
        src="/logo.png"
        alt="Sparkly Space Logo"
        className="h-11 w-auto object-contain flex-shrink-0 scale-[1.3] origin-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
      />

      {/* Brand Text */}
      {!iconOnly && (
        <div className="flex flex-col justify-center">
          <span className={`text-xl font-bold tracking-tight leading-none ${lightText ? "text-white" : "text-slate-800"}`}>
            <span className="text-gold-500">Sparkly</span> <span className={lightText ? "text-slate-100" : "text-sky-600"}>Space</span>
          </span>
          <span className={`text-[10px] uppercase tracking-widest font-semibold mt-1 leading-none ${lightText ? "text-gold-500/80" : "text-amber-600"}`}>
            Cleaning Services
          </span>
        </div>
      )}
    </div>
  );
}
