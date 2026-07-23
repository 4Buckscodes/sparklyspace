import { services } from "@/data/services";

export interface PricingResult {
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  total: number;
  isQuoteOnly: boolean;
  meetsMinimum: boolean;
  minimumApplied: boolean;
}

export function calculatePricing(
  serviceId: string,
  bedrooms: number,
  bathrooms: number,
  frequency: "one-off" | "weekly" | "bi-weekly" | "monthly",
  selectedExtraIds: string[]
): PricingResult {
  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return {
      subtotal: 0,
      discountRate: 0,
      discountAmount: 0,
      total: 0,
      isQuoteOnly: true,
      meetsMinimum: false,
      minimumApplied: false,
    };
  }

  if (service.isQuoteOnly) {
    return {
      subtotal: 0,
      discountRate: 0,
      discountAmount: 0,
      total: 0,
      isQuoteOnly: true,
      meetsMinimum: true,
      minimumApplied: false,
    };
  }

  // Quote only thresholds
  // e.g. If bedrooms > 6 or bathrooms > 5, it requires a custom quote
  if (bedrooms > 6 || bathrooms > 5) {
    return {
      subtotal: 0,
      discountRate: 0,
      discountAmount: 0,
      total: 0,
      isQuoteOnly: true,
      meetsMinimum: true,
      minimumApplied: false,
    };
  }

  // Base price calculation (assumes basePrice covers 1 bedroom and 1 bathroom)
  let baseAndRooms = service.basePrice;
  if (bedrooms > 1) {
    baseAndRooms += (bedrooms - 1) * service.pricePerBedroom;
  }
  if (bathrooms > 1) {
    baseAndRooms += (bathrooms - 1) * service.pricePerBathroom;
  }

  // Extras calculation
  let extrasTotal = 0;
  selectedExtraIds.forEach((extraId) => {
    const extra = service.extras.find((e) => e.id === extraId);
    if (extra) {
      extrasTotal += extra.price;
    }
  });

  const subtotal = baseAndRooms + extrasTotal;

  // Frequency discounts (frequency discounts apply to the subtotal)
  let discountRate = 0;
  if (frequency === "weekly") {
    discountRate = 0.10; // 10% off
  } else if (frequency === "bi-weekly") {
    discountRate = 0.05; // 5% off
  } else if (frequency === "monthly") {
    discountRate = 0.05; // 5% off
  }

  const discountAmount = Math.round(subtotal * discountRate * 100) / 100;
  let total = subtotal - discountAmount;

  // Minimum charge verification
  let minimumApplied = false;
  if (total < service.minimumCharge) {
    total = service.minimumCharge;
    minimumApplied = true;
  }

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discountRate,
    discountAmount,
    total: Math.round(total * 100) / 100,
    isQuoteOnly: false,
    meetsMinimum: total >= service.minimumCharge,
    minimumApplied,
  };
}
