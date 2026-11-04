import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import { localBusinessJsonLd } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const shareTitle = "Sparkly Space | We Clean, So You Can Focus on What Matters.";
const shareDescription =
  "We Clean, So You Can Focus on What Matters. Reliable home and commercial cleaning across Bournemouth, Poole and Christchurch. Book your clean or request a personalised quote online.";

export const metadata: Metadata = {
  title: {
    template: "%s | Sparkly Space Cleaning Services",
    default: "Sparkly Space | We Clean, So You Can Focus on What Matters.",
  },
  description: shareDescription,
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
    title: shareTitle,
    description: shareDescription,
    url: "https://sparklyspace.co.uk/",
    siteName: "Sparkly Space",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sparkly Space — We Clean, So You Can Focus on What Matters.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: ["/opengraph-image"],
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
  const jsonLd = localBusinessJsonLd();

  return (
    <html lang="en-GB" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fffdf6] text-slate-900 font-sans pb-16 md:pb-0" suppressHydrationWarning>
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
