/**
 * Validates a UK postcode and checks if it falls within the Sparkly Space service area
 * (Bournemouth, Christchurch, and Poole: BH1 to BH23).
 */
export interface PostcodeValidationResult {
  isValid: boolean;
  formatted: string;
  error?: string;
  areaName?: string;
}

export function validatePostcode(postcode: string): PostcodeValidationResult {
  if (!postcode) {
    return { isValid: false, formatted: "", error: "Postcode is required." };
  }

  // Remove whitespace and convert to uppercase
  const clean = postcode.trim().toUpperCase().replace(/\s+/g, "");

  // Broad UK postcode format test
  const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/;
  if (!ukPostcodeRegex.test(clean)) {
    return {
      isValid: false,
      formatted: "",
      error: "Please enter a valid UK postcode format (e.g., BH1 1AA).",
    };
  }

  // Check if it matches BH1 to BH23
  // Match captures the outward numeric part and the inward part
  const bhMatch = clean.match(/^BH([1-9]|1[0-9]|2[0-3])([0-9][A-Z]{2})$/);

  if (!bhMatch) {
    return {
      isValid: false,
      formatted: "",
      error: "We currently only serve Bournemouth, Christchurch, Poole and surrounding BH postcodes (BH1 - BH23).",
    };
  }

  const districtNum = parseInt(bhMatch[1], 10);
  const inwardCode = bhMatch[2];
  const formatted = `BH${districtNum} ${inwardCode}`;

  // Provide user-friendly area descriptions
  let areaName = "Bournemouth, Christchurch & Poole Area";
  if (districtNum >= 1 && districtNum <= 11) {
    areaName = "Bournemouth";
  } else if (districtNum >= 12 && districtNum <= 18) {
    areaName = "Poole";
  } else if (districtNum === 23) {
    areaName = "Christchurch";
  } else if (districtNum >= 19 && districtNum <= 20) {
    areaName = "Purbeck / Wareham / Swanage";
  } else if (districtNum === 21) {
    areaName = "Wimborne";
  } else if (districtNum === 22) {
    areaName = "Ferndown";
  }

  return {
    isValid: true,
    formatted,
    areaName,
  };
}
