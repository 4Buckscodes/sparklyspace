import { BookingFormData } from "./booking-schema";
import { services } from "@/data/services";
import { calculatePricing } from "./pricing";

export function generateBookingRef(): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, ""); // e.g. 260710
  const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase(); // e.g. AB1
  return `SS-${dateStr}-${randomChars}`;
}

export function compileBookingSummary(data: BookingFormData, reference: string): string {
  const service = services.find((s) => s.id === data.serviceId);
  const serviceName = service ? service.name : "Custom Clean";
  
  const pricing = calculatePricing(
    data.serviceId,
    data.bedrooms,
    data.bathrooms,
    data.frequency,
    data.extras
  );

  const freqLabel = {
    "one-off": "One-off Clean",
    weekly: "Weekly (20% off)",
    "bi-weekly": "Bi-weekly (15% off)",
    monthly: "Monthly (10% off)",
  }[data.frequency];

  const timeLabel = {
    morning: "Morning (8:00 AM - 12:00 PM)",
    afternoon: "Afternoon (12:00 PM - 4:00 PM)",
    evening: "Late Afternoon (4:00 PM - 8:00 PM)",
  }[data.timeWindow] || data.timeWindow;

  const parkingLabel = {
    "free-onsite": "Free parking on-site",
    "paid-onsite": "Paid parking nearby (cost to be added)",
    "no-parking": "No parking available (please advise)",
  }[data.parking] || data.parking;

  const accessLabel = {
    "someone-home": "Someone will be home to let you in",
    lockbox: "Key in lockbox",
    "key-under-mat": "Key left in safe place (under mat/pot)",
    "other-access": "Other (details in notes)",
  }[data.access] || data.access;

  // Format date nicely (DD/MM/YYYY)
  let formattedDate = data.preferredDate;
  try {
    const d = new Date(data.preferredDate);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  } catch (e) {
    // fallback
  }

  // Extras list
  const selectedExtrasNames = data.extras
    .map((extraId) => {
      const extra = service?.extras.find((e) => e.id === extraId);
      return extra ? `  - ${extra.name} (£${extra.price})` : null;
    })
    .filter(Boolean)
    .join("\n");

  const extrasSection = selectedExtrasNames
    ? `EXTRAS:\n${selectedExtrasNames}`
    : "EXTRAS:\n  - None";

  // Pricing output
  let pricingText = "";
  if (pricing.isQuoteOnly) {
    pricingText = `PRICING:\n  - Quote Status: Commercial / Custom Property\n  - Final Price: Subject to business quote`;
  } else {
    const discountText = pricing.discountRate > 0 
      ? `\n  - Discount Applied: -£${pricing.discountAmount} (${pricing.discountRate * 100}%)` 
      : "";
    const minAppliedText = pricing.minimumApplied
      ? `\n  - Note: Minimum charge of £${service?.minimumCharge} applied`
      : "";
    pricingText = `PRICING:\n  - Subtotal: £${pricing.subtotal}${discountText}${minAppliedText}\n  - Estimated Total: £${pricing.total}`;
  }

  return `SPARKLY SPACE BOOKING ENQUIRY
=================================
Booking Reference: ${reference}

SERVICE DETAILS
---------------------------------
- Service: ${serviceName}
- Frequency: ${freqLabel}
- Property: ${data.propertyType}
- Bedrooms: ${data.bedrooms} | Bathrooms: ${data.bathrooms}

CUSTOMER & LOCATION
---------------------------------
- Name: ${data.name}
- Phone: ${data.phone}
- Email: ${data.email}
- Address: ${data.address1}${data.address2 ? ", " + data.address2 : ""}
- Town/City: ${data.city}
- Postcode: ${data.postcode}

SCHEDULE
---------------------------------
- Preferred Date: ${formattedDate}
- Time Slot: ${timeLabel}

OPTIONS & ACCESS
---------------------------------
- Eco-friendly Products: ${data.ecoFriendly ? "Yes (Preferred)" : "No preference"}
- Parking: ${parkingLabel}
- Access: ${accessLabel}
${extrasSection}

ADDITIONAL NOTES
---------------------------------
${data.notes ? data.notes : "None"}
${data.referralSource ? "\nSource: " + data.referralSource : ""}

---------------------------------
${pricingText}

=================================
*Please note: This is a booking inquiry and price estimate. Your booking is NOT confirmed until Sparkly Space verifies availability and finalizes details.*`;
}

export function generateWhatsAppUrl(data: BookingFormData, reference: string, phoneNumber: string = "+447552427880"): string {
  const summary = compileBookingSummary(data, reference);
  const encodedMessage = encodeURIComponent(summary);
  // Clean phone number format for link
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
