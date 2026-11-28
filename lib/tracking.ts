/**
 * Tracking configuration. IDs are public (they appear in page source).
 *
 * - GTM_ID: Google Tag Manager container. When set, GA4 and any other tags should be
 *   configured inside GTM, and the site does not load GA4 directly (avoids double counting).
 * - GA_ID: direct GA4 Measurement ID, used only when there is no GTM container.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-5XDTNPSW";
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

/** True when any optional tracking is loaded, so the cookie banner is needed. */
export const TRACKING_ENABLED = Boolean(GTM_ID || GA_ID);
