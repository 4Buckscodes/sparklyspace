/**
 * Privacy-preserving analytics wrapper for tracking booking funnel events 
 * without sending PII (Personally Identifiable Information).
 */

export type FunnelStep = 
  | "property-service" 
  | "schedule-extras" 
  | "contact" 
  | "review";

export interface AnalyticsEvent {
  eventName: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

// Safely log events in development mode
const isDev = process.env.NODE_ENV === "development";

function logEventToConsole(name: string, params?: Record<string, any>) {
  if (isDev) {
    console.log(`[Analytics Event] "${name}":`, params);
  }
}

export const analytics = {
  /**
   * Track general custom events
   */
  track: (eventName: string, params?: Record<string, any>) => {
    // Log to console in dev
    logEventToConsole(eventName, params);

    // Send to Google Analytics if present
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, params);
    }
  },

  /**
   * Track when a visitor starts the booking wizard
   */
  trackBookingStarted: (referralSource?: string) => {
    analytics.track("booking_form_start", {
      category: "booking_funnel",
      referral_source: referralSource || "direct",
    });
  },

  /**
   * Track when a visitor transitions between steps
   */
  trackStepView: (stepName: FunnelStep, stepNumber: number) => {
    analytics.track("booking_step_view", {
      category: "booking_funnel",
      step_name: stepName,
      step_number: stepNumber,
    });
  },

  /**
   * Track steps completed successfully
   */
  trackStepCompleted: (stepName: FunnelStep, stepNumber: number) => {
    analytics.track("booking_step_completed", {
      category: "booking_funnel",
      step_name: stepName,
      step_number: stepNumber,
    });
  },

  /**
   * Track form validation failures (to identify UX friction)
   * Important: Do NOT log the invalid input values (PII)
   */
  trackValidationError: (fieldName: string, errorType: string) => {
    analytics.track("booking_validation_error", {
      category: "booking_funnel",
      field_name: fieldName,
      error_type: errorType,
    });
  },

  /**
   * Track successful WhatsApp handoffs (the primary conversion goal)
   */
  trackWhatsAppHandoff: (serviceId: string, estimatedTotal: number, isQuoteOnly: boolean) => {
    analytics.track("booking_whatsapp_handoff", {
      category: "booking_funnel",
      service_id: serviceId,
      estimated_total: isQuoteOnly ? 0 : estimatedTotal,
      is_quote_only: isQuoteOnly,
    });
  },

  /**
   * Track when the user copies the booking summary (fallback conversion)
   */
  trackSummaryCopied: (serviceId: string, estimatedTotal: number, isQuoteOnly: boolean) => {
    analytics.track("booking_summary_copied", {
      category: "booking_funnel",
      service_id: serviceId,
      estimated_total: isQuoteOnly ? 0 : estimatedTotal,
      is_quote_only: isQuoteOnly,
    });
  },

  /**
   * Track clicks on contact actions
   */
  trackContactClick: (channel: "phone" | "whatsapp" | "email" | "instagram" | "tiktok" | "facebook") => {
    analytics.track("contact_click", {
      category: "outbound_contact",
      channel,
    });
  },
};
