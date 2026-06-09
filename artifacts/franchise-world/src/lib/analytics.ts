declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  try {
    if (!window.dataLayer) window.dataLayer = [];
    window.dataLayer.push({ event: eventName, ...params });

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, params);
    }
  } catch {}
}

export const AnalyticsEvents = {
  VIEW_OPPORTUNITY: "view_opportunity",
  LEAD_FORM_OPEN: "lead_form_open",
  LEAD_FORM_SUBMIT: "lead_form_submit",
  PAYMENT_INITIATE: "payment_initiate",
  PAYMENT_SUCCESS: "payment_success",
  CONTACT_UNLOCK: "contact_unlock",
  DOWNLOAD_CLICK: "download_click",
  VIDEO_VIEW: "video_view",
  CALCULATOR_USE: "calculator_use",
} as const;
