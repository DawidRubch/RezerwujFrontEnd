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
import { trackPageView } from "services";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

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
  <QueryClientProvider client={queryClient}>
    <Router>
      <App />
    </Router>
  </QueryClientProvider>,
  document.getElementById("root")
);
