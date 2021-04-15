import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";

import { ReactCalendar } from "../../../../../interface/components/CalendarAndLocation/Calendar/Calendar";
import {} from "../../../../../images/arrowDown.svg";
import { ReduxProvider } from "../../../../../stateManagment/ReduxProvider";
import { store } from "../../../../../stateManagment/store";
import React from "react";
import { App } from "../../../../..";
import { LandingPage } from "../../../../../interface/pages/LandingPage/LandingPage";
import { TimePicker } from "../../../../../interface/components/TimeAndPeople/TimePicker/TimePicker";
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

const renderReactCalendar = () =>
  render(
    <ReduxProvider store={store}>
      <ReactCalendar />
    </ReduxProvider>
  );

describe("Calendar", () => {
  const tDate_object = new Date();
  test("should render", () => {
    renderReactCalendar();
  });

  test("should render current date label", () => {
    //Taking day, month, year out of
    const tDate = tDate_object.getDate();

    const tMonth = tDate_object.getMonth() + 1;

    const tYear = tDate_object.getFullYear();

    const labelText = `${tMonth}/${tDate}/${tYear}`;

    const { getByText } = renderReactCalendar();

    //Test doesnt work if it doesnt find an element
    getByText(labelText);
  });

  test("should open calendar and later close it", () => {
    const { getByTestId } = renderReactCalendar();

    fireEvent(getByTestId("calendar-button"), new MouseEvent("click"));
  });
});
