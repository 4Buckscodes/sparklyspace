"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Calendar } from "lucide-react";
import Logo from "./Logo";
import { analytics } from "@/lib/analytics";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handlePhoneClick = () => {
    analytics.trackContactClick("phone");
  };

  const handleBookClick = () => {
    analytics.track("booking_nav_click", { location: "header" });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "glassmorphism shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="focus-visible:outline-2 focus-visible:outline-sky-500 rounded-lg">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 py-2 hover:text-sky-600 focus-visible:outline-sky-500 focus-visible:outline-2 rounded px-2 ${
                    isActive
                      ? "text-sky-600 border-b-2 border-sky-500 font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+447552427880"
              onClick={handlePhoneClick}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-sky-600 transition-colors py-2 px-3 focus-visible:outline-sky-500 focus-visible:outline-2 rounded min-w-[44px] min-h-[44px]"
            >
              <Phone className="h-4 w-4 text-sky-500" />
              <span>07552 427880</span>
            </a>
            <Link
              href="/book"
              onClick={handleBookClick}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm py-2.5 px-5 rounded-xl transition-all shadow-md shadow-sky-200 active:scale-95 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-sky-500 hover:shadow-sky-100 min-h-[44px]"
            >
              <Calendar className="h-4 w-4" />
              <span>Request a Quote</span>
            </Link>
          </div>

          {/* Mobile Actions Container */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:+447552427880"
              onClick={handlePhoneClick}
              aria-label="Call Sparkly Space"
              className="flex items-center justify-center h-11 w-11 rounded-xl bg-sky-50 text-sky-600 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-sky-500"
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle main menu"
              className="flex items-center justify-center h-11 w-11 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-sky-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden animate-fade-in-up fixed inset-x-0 top-[65px] bg-white border-b border-slate-200 shadow-xl z-30">
          <div className="px-4 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? "bg-sky-50 text-sky-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link
                href="/book"
                onClick={handleBookClick}
                className="w-full flex items-center justify-center gap-2 bg-sky-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-md text-center active:scale-[0.98] transition-all min-h-[48px]"
              >
                <Calendar className="h-5 w-5" />
                <span>Request a Quote</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
