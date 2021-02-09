import React from "react";
import { LandingPage } from "./interface/pages/LandingPage/LandingPage";
import RestaurantPubsArrayPage from "./interface/pages/RestaurantPubsArrPage/RestaurantPubsArray";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from "react-dom";
import "./index.css";
import RestaurantDescriptionPage from "./interface/pages/RestaurantDescriptionPage/RestaurantDescriptionPage";
import { Provider } from "react-redux";

import { store } from "../src/stateManagment/store";
import { ConfirmReservationPage } from "./interface/pages/ConfirmReservationPage/ConfirmReservationPage";
function App() {
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
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
