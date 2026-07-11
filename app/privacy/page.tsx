import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read our privacy policy to understand how we handle your personal data and WhatsApp booking details.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-100 border border-slate-100 animate-fade-in-up">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
          Privacy Policy
        </h1>
        
        <p className="text-sm text-slate-500 mb-6">Last Updated: July 10, 2026</p>

        <div className="space-y-6 text-slate-600 leading-relaxed text-sm">
          <p>
            At Sparkly Space Cleaning Services, we are committed to protecting your privacy and handling your personal data in a transparent and secure manner. This Privacy Policy explains how we collect, use, and process your personal information when you use our website and booking inquiry system.
          </p>

          <h2 className="text-lg font-bold text-slate-800 mt-8 mb-3">1. Information We Collect</h2>
          <p>
            To process your cleaning booking inquiries, we collect information through our multi-step configurator:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Customer Details:</strong> Full name, phone number, and email address.</li>
            <li><strong>Location Details:</strong> Service address, town, and postcode.</li>
            <li><strong>Property Details:</strong> Property type, number of bedrooms, bathrooms, and size.</li>
            <li><strong>Service Configuration:</strong> Service type, scheduling preferences, frequency, and add-on selections (e.g. inside oven, carpet clean).</li>
            <li><strong>Access & Parking:</strong> Access arrangements (key location, lockbox details) and parking availability.</li>
            <li><strong>Additional Notes:</strong> Any specific priorities, pet descriptions, or allergies you provide.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-800 mt-8 mb-3">2. How We Process and Hand Off Your Data</h2>
          <p>
            Our website is designed for operational simplicity. We do not store your booking configurations in a persistent database on our servers. Instead, when you click <strong>"Confirm via WhatsApp"</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Your booking options are summarized into a formatted, URL-encoded text message.</li>
            <li>You are redirected to WhatsApp to send this message directly to our official business number (<code className="bg-slate-100 px-1 py-0.5 rounded text-sky-600 font-semibold">+44 7552 427880</code>).</li>
            <li>If WhatsApp is unavailable, you can copy the summary to your clipboard to paste it manually into another communication channel.</li>
          </ul>
          <p>
            By initiating this handoff, you consent to transferring this details summary to WhatsApp, which operates under its own privacy policy and encryption terms.
          </p>

          <h2 className="text-lg font-bold text-slate-800 mt-8 mb-3">3. Purpose of Processing</h2>
          <p>We use the collected information solely to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Evaluate cleaning requirements and verify service area compatibility.</li>
            <li>Provide a transparent price estimate.</li>
            <li>Communicate with you via WhatsApp, email, or telephone to confirm slot availability, final price, and payment steps.</li>
            <li>Carry out the cleaning service at your specified property address.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-800 mt-8 mb-3">4. Data Retention</h2>
          <p>
            Because we do not use a customer database on our website, we do not store your booking details on our web servers. Once the message is sent to WhatsApp, your data is retained in our business chat records only for as long as necessary to manage your booking, perform services, handle accounting records, and resolve queries.
          </p>

          <h2 className="text-lg font-bold text-slate-800 mt-8 mb-3">5. Cookies and Analytics</h2>
          <p>
            We use privacy-conscious analytics tools to measure website usage (e.g., tracking form progress and conversion rates). These tools do NOT capture sensitive customer details, names, addresses, or emails.
          </p>

          <h2 className="text-lg font-bold text-slate-800 mt-8 mb-3">6. Your Rights</h2>
          <p>
            Under the UK General Data Protection Regulation (GDPR), you have the right to request access to, correction of, or deletion of the personal data we hold about you in our business communication logs. To make a request, contact us at <a href="mailto:sparklyspace01@gmail.com" className="text-sky-600 hover:underline">sparklyspace01@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
