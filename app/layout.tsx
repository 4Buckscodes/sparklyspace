import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Sparkly Space Cleaning Services",
    default: "Sparkly Space Cleaning Services | Bournemouth, Christchurch & Poole",
  },
  description: "Sparkly Space provides professional, reliable cleaning services with eco-friendly options in Bournemouth, Christchurch, and Poole. Get an instant estimate and book via WhatsApp in minutes.",
  metadataBase: new URL("https://sparklyspace.co.uk"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "cleaning services Bournemouth",
    "cleaners Poole",
    "domestic cleaning Christchurch",
    "office cleaning Bournemouth",
    "deep clean Dorset",
    "end of tenancy cleaning Poole",
    "airbnb cleaning Bournemouth",
    "holiday let cleaning Poole",
    "carpet cleaning Christchurch",
    "eco friendly cleaning",
  ],
  openGraph: {
    title: "Sparkly Space Cleaning Services",
    description: "Professional, reliable cleaning services with optional eco-friendly products in Bournemouth, Christchurch, and Poole.",
    url: "https://sparklyspace.co.uk",
    siteName: "Sparkly Space Cleaning Services",
    images: [
      {
        url: "https://sparklyspace.co.uk/logo.png",
        width: 600,
        height: 900,
        alt: "Sparkly Space Cleaning Services Logo",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sparkly Space Cleaning Services | Bournemouth, Poole & Christchurch",
    description: "Professional, reliable cleaning services with optional eco-friendly products in Bournemouth, Christchurch, and Poole.",
    images: ["https://sparklyspace.co.uk/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HouseCleaning",
    "name": "Sparkly Space Cleaning Services",
    "image": "https://sparklyspace.co.uk/logo-gold.png",
    "description": "Sparkly Space provides premium residential, deep cleaning, end of tenancy, Airbnb, and commercial office cleaning services.",
    "telephone": "+447552427880",
    "email": "sparklyspace01@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bournemouth",
      "addressRegion": "Dorset",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "50.7208",
      "longitude": "-1.8796"
    },
    "url": "https://sparklyspace.co.uk",
    "sameAs": [
      "https://www.instagram.com/sparklyspace01",
      "https://www.tiktok.com/@sparklyspace",
      "https://www.facebook.com/sparklyspace01"
    ],
    "priceRange": "££",
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Bournemouth" },
      { "@type": "AdministrativeArea", "name": "Christchurch" },
      { "@type": "AdministrativeArea", "name": "Poole" }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans pb-16 md:pb-0" suppressHydrationWarning>
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <Analytics />
        
        {/* Floating Quick Action Contacts for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-slate-200 px-4 py-3 flex gap-3 shadow-lg">
          <a
            href="tel:+447552427880"
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-4 rounded-xl text-sm transition-colors duration-200 active:scale-95 touch-manipulation min-h-[48px]"
          >
            <span>Call Us</span>
          </a>
          <a
            href="/book"
            className="flex-2 flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-colors duration-200 shadow-md shadow-sky-200 active:scale-95 touch-manipulation min-h-[48px]"
          >
            <span>Request a Quote</span>
          </a>
        </div>
      </body>
    </html>
  );
}

