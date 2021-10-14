//This line is needed for window.gtag to exist
//DO NOT DELETE THIS IMPORT
import GA4React from "ga-4-react";
import { Category, GAevent } from "types";

export const trackEvent = ({ category, label, action }: GAevent) => {
  if (process.env.NODE_ENV === "production")
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
};

export const trackPageView = (pathname: string) => {
  //Sending page info on every page besides main
  if (pathname !== "/") return;

  trackEvent({ action: pathname.slice(1), category: Category.PAGE_CHOICE });
};
