import { GAevent } from "../../core/Interfaces/GAevent";

import GA4React from "ga-4-react";

class GA {
  ga4React = new GA4React("G-SN0VJY0RPS");
  trackEvent = ({ category, label, action }: GAevent) =>
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
}

export default new GA();
