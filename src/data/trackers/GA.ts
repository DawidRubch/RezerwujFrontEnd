import { Category, GAevent } from "../../core/Interfaces/GAevent";

import GA4React from "ga-4-react";

//Class responsible for Google analitics tracking
class GA {
  trackEvent = ({ category, label, action }: GAevent) => {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  };

  trackPageView = (pathname: string) => {
    window.gtag("event", pathname, {
      event_category: Category.PAGE_CHOICE,
    });
  };
}

export default new GA();
