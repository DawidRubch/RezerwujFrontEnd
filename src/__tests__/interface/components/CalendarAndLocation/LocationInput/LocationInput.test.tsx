//Location input uses 3-rd party library, so it will not verify the location names

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { LocationInput } from "../../../../../interface/components/CalendarAndLocation/LocationInput/LocationInput";
import { store } from "../../../../../stateManagment/store";
import React from "react";
import { ReduxProvider } from "../../../../../stateManagment/ReduxProvider";

jest.mock("react-places-autocomplete");

// google.maps.LatLng = jest.fn

//Only if the array of any names is return
describe("LocationInput", () => {
  const renderLocationInput = () =>
    render(
      <ReduxProvider store={store}>
        <LocationInput />
      </ReduxProvider>
    );

  test("should render LocationInput", () => {
    renderLocationInput();
  });
});

export {};
