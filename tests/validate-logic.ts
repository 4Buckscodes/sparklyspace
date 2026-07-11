// standalone test runner for Sparkly Space core business rules
import { validatePostcode } from "../lib/postcode";
import { calculatePricing } from "../lib/pricing";
import { compileBookingSummary } from "../lib/whatsapp";
import { BookingFormData } from "../lib/booking-schema";

let testsRun = 0;
let testsFailed = 0;

function assert(condition: boolean, testName: string, messageOnFailure?: string) {
  testsRun++;
  if (condition) {
    console.log(`PASS: ${testName}`);
  } else {
    testsFailed++;
    console.error(`FAIL: ${testName} - ${messageOnFailure || "Assertion failed"}`);
  }
}

// 1. Postcode Tests
console.log("\n--- Testing Postcode Validation ---");
const pc1 = validatePostcode("BH1 1AA");
assert(pc1.isValid && pc1.formatted === "BH1 1AA" && pc1.areaName === "Bournemouth", "Valid BH1 Bournemouth postcode");

const pc2 = validatePostcode("bh23 3xx");
assert(pc2.isValid && pc2.formatted === "BH23 3XX" && pc2.areaName === "Christchurch", "Case-insensitivity and formatting space for BH23");

const pc3 = validatePostcode("BH149JJ"); // Poole
const pc3Check = validatePostcode("BH14 9JJ");
assert(pc3Check.isValid && pc3Check.formatted === "BH14 9JJ" && pc3Check.areaName === "Poole", "Valid BH14 Poole postcode");

const pc4 = validatePostcode("SW1A 1AA"); // London
assert(!pc4.isValid && pc4.error !== undefined, "Invalid SW1 London postcode blocked");

const pc5 = validatePostcode("BH25 1AA"); // Outside BCP area (New Milton)
assert(!pc5.isValid && pc5.error !== undefined, "Outside service area postcode BH25 blocked");

// 2. Pricing Tests
console.log("\n--- Testing Pricing Calculations ---");
// Residential Clean: Base: £40 (covers 1 bed, 1 bath). Add bed: £15, Add bath: £15. Minimum charge: £50.
// Let's test 1 bed, 1 bath residential clean (should subtotal £40. Weekly discount 20% -> £32. Apply minimum -> £50)
const price1 = calculatePricing("residential", 1, 1, "weekly", []);
assert(price1.subtotal === 40, "Subtotal is £40 for 1 bed 1 bath", `Expected 40, got ${price1.subtotal}`);
assert(price1.discountAmount === 8, "20% discount is £8", `Expected 8, got ${price1.discountAmount}`);
assert(price1.total === 50, "Weekly total is corrected to £50 minimum charge", `Expected 50, got ${price1.total}`);
assert(price1.minimumApplied === true, "Minimum charge applied flag is set");

// Let's test 3 bed, 2 bath deep clean, one-off, with inside oven (£30) and inside fridge (£20)
// Deep Clean: Base £70 (covers 1 bed, 1 bath), bed: +£25, bath: +£25. Minimum £80.
// Subtotal = Base (70) + 2 * bed (50) + 1 * bath (25) + oven (30) + fridge (20) = 195. One-off -> no discount.
const price2 = calculatePricing("deep-clean", 3, 2, "one-off", ["oven", "fridge"]);
assert(price2.subtotal === 195, "Subtotal is £195 for 3 bed 2 bath deep clean with oven/fridge", `Expected 195, got ${price2.subtotal}`);
assert(price2.total === 195, "Total is £195 (no discount, above minimum)", `Expected 195, got ${price2.total}`);
assert(price2.minimumApplied === false, "Minimum charge not applied");

// Commercial Clean: Quote-only
const price3 = calculatePricing("commercial", 2, 2, "weekly", []);
assert(price3.isQuoteOnly === true, "Commercial cleaning is flagged as quote-only");

// Large properties: Quote-only threshold (e.g. > 6 bedrooms)
const price4 = calculatePricing("residential", 7, 2, "weekly", []);
assert(price4.isQuoteOnly === true, "7 bedrooms residential clean triggers quote-only threshold");

// 3. WhatsApp Message Tests
console.log("\n--- Testing WhatsApp Message Summarizer ---");
const testBookingData: BookingFormData = {
  serviceId: "deep-clean",
  postcode: "BH1 1AA",
  address1: "12 High Street",
  address2: "Flat 2",
  city: "Bournemouth",
  propertyType: "Flat/Apartment",
  bedrooms: 2,
  bathrooms: 1,
  preferredDate: "2026-07-15",
  timeWindow: "morning",
  frequency: "bi-weekly",
  extras: ["oven"],
  ecoFriendly: true,
  parking: "free-onsite",
  access: "lockbox",
  name: "Jane Smith",
  phone: "07700900077",
  email: "jane.smith@example.com",
  notes: "Please ignore the cat.",
  referralSource: "Google Search",
  marketingConsent: true
};

const summary = compileBookingSummary(testBookingData, "SS-260710-XYZ");
assert(summary.includes("SS-260710-XYZ"), "Summary includes booking reference");
assert(summary.includes("Jane Smith"), "Summary includes customer name");
assert(summary.includes("Deep Cleaning"), "Summary includes correct service name");
assert(summary.includes("Bi-weekly (15% off)"), "Summary includes correct frequency");
assert(summary.includes("12 High Street"), "Summary includes address details");
assert(summary.includes("Please ignore the cat."), "Summary includes notes");
assert(summary.includes("Inside Oven (£30)"), "Summary includes extras");
assert(summary.includes("Estimated Total:"), "Summary includes estimated total section");

console.log(`\n--- Test Results Summary ---`);
console.log(`Total tests run: ${testsRun}`);
console.log(`Failed tests: ${testsFailed}`);

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log("ALL CORE BUSINESS RULES ARE VALIDATED AND VERIFIED SUCCESSFULLY!");
  process.exit(0);
}
