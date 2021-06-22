import React, { useEffect } from "react";
import { LandingPage } from "./interface/pages/LandingPage/LandingPage";
import RestaurantPubsArrayPage from "./interface/pages/RestaurantPubsArrPage/RestaurantPubsArray";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { render } from "react-dom";
import "./index.css";
import RestaurantDescriptionPage from "./interface/pages/RestaurantDescriptionPage/RestaurantDescriptionPage";

import { store } from "../src/stateManagment/store";
import { ConfirmReservationPage } from "./interface/pages/ConfirmReservationPage/ConfirmReservationPage";
import { ReduxProvider } from "./stateManagment/ReduxProvider";
import GA from "./data/trackers/GA";
import { Category } from "./core/Interfaces/GAevent";

export function App() {
  const location = useLocation();

  useEffect(() => {
    GA.trackPageView(location.pathname);
  }, [location]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route
          path="/lista-restauracji"
          exact
          component={RestaurantPubsArrayPage}
        />
        <Route
          path="/opis-restauracji"
          exact
          component={RestaurantDescriptionPage}
        />
        <Route
          path="/potwierdz-rezerwacje"
          exact
          component={ConfirmReservationPage}
        />
      </Switch>
    </Router>
  );
}

render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById("root")
);
