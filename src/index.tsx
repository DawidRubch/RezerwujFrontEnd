import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { render } from "react-dom";
import "./index.css";
import { Routes } from "routes";
import {
  ConfirmReservationPage,
  RestaurantDescriptionPage,
  RestaurantPubsArrayPage,
  LandingPage,
} from "interface/pages";
import { trackPageView } from "data";

export function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <Switch>
      <Route path={Routes.MAIN} exact component={LandingPage} />
      <Route
        path={Routes.RESTAURANTS_ARRAY}
        exact
        component={RestaurantPubsArrayPage}
      />
      <Route
        path={Routes.RESTAURANT_INFO}
        exact
        component={RestaurantDescriptionPage}
      />
      <Route
        path={Routes.CONFIRM_RESERVATION}
        exact
        component={ConfirmReservationPage}
      />
    </Switch>
  );
}

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
