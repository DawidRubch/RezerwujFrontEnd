import { cleanup, render } from "@testing-library/react";

import { ReactCalendar } from "../../../../../interface/components/CalendarAndLocation/Calendar/Calendar";

import { ReduxProvider } from "../../../../../stateManagment/ReduxProvider";
import { store } from "../../../../../stateManagment/store";
import React from "react";
import { App } from "../../../../..";
import { LandingPage } from "../../../../../interface/pages/LandingPage/LandingPage";
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: "/another-route",
    search: "",
    hash: "",
    state: null,
    key: "5nvxpbdafa",
  }),
  useHistory: jest.fn().mockReturnValue({}),
}));

afterEach(cleanup);

describe("Calendar", () => {
  test("should render", () => {
    const { getByText } = render(
      <ReduxProvider store={store}>
        <ReactCalendar />
      </ReduxProvider>
    );

    console.log(getByText);
  });
});
