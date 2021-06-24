import { Category, GAevent } from "../../core/Interfaces/GAevent";

import GA4React from "ga-4-react";

//Class responsible for Google analitics tracking
class GA {
  ga4React = new GA4React("G-SN0VJY0RPS");
  trackEvent = ({ category, label, action }: GAevent) => {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  };

  trackPageView = (pathname: string) => {
    //Sending page info on every page besides main
    if (pathname !== "/") {
      //Pathname is sliced due to it's first letter is "/"
      window.gtag("event", pathname.slice(1), {
        event_category: Category.PAGE_CHOICE,
      });
    }
  };
}

export default new GA();
