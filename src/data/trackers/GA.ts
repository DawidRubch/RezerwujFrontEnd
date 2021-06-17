import { GAevent } from "../../core/Interfaces/GAevent";
import ReactGA from "react-ga";

class GA {
  trackEvent = ({ category, label, action }: GAevent) =>
    ReactGA.event({ category, label, action });

  initialize = () => ReactGA.initialize("G-SN0VJY0RPS");
}

export default new GA();
