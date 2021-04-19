import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";

import { ReactCalendar } from "../../../../../interface/components/CalendarAndLocation/Calendar/Calendar";
import {} from "../../../../../images/arrowDown.svg";
import { ReduxProvider } from "../../../../../stateManagment/ReduxProvider";
import { store } from "../../../../../stateManagment/store";
import React from "react";
import { App } from "../../../../..";
import { LandingPage } from "../../../../../interface/pages/LandingPage/LandingPage";
import { TimePicker } from "../../../../../interface/components/TimeAndPeople/TimePicker/TimePicker";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: "/another-route",
    search: "",
    hash: "",
    state: null,
    key: "5nvxpbdafa",
  }),
  useHistory: jest.fn().mockReturnValue({
    push: (mockString: string) => {},
  }),
}));

afterEach(cleanup);

const getLabelTextFromNumbers = (date: number, month: number, year: number) =>
  `${month}/${date}/${year}`;

const renderReactCalendar = () =>
  render(
    <ReduxProvider store={store}>
      <ReactCalendar />
    </ReduxProvider>
  );

describe("Calendar", () => {
  const tDate_object = new Date();

  //Taking day, month, year out of
  const tDate = tDate_object.getDate();

  const tMonth = tDate_object.getMonth() + 1;

  const tYear = tDate_object.getFullYear();

  const labelText = `${tMonth}/${tDate}/${tYear}`;

  test("should render", () => {
    renderReactCalendar();
  });

  test("should render current date label", () => {
    const { getByText } = renderReactCalendar();

    //Test doesnt work if it doesnt find an element
    expect(getByText(labelText)).toBeInTheDocument();
  });

  test("should open calendar", async () => {
    const { getByText } = renderReactCalendar();

    const button = getByText(labelText);

    fireEvent.click(button);

    await waitFor(() => expect(getByText("pon")).toBeInTheDocument());
  });

  test("should close calendar, when pressed on date", async () => {
    const { getByText } = renderReactCalendar();

    const labelToTest = getLabelTextFromNumbers(10, 4, 2021);

    const button = getByText(labelToTest);

    fireEvent.click(button);

    await waitFor(async () => {
      const pressDayButton = getByText("15");
      fireEvent.click(pressDayButton);

      await waitFor(() => {
        expect(pressDayButton).not.toBeInTheDocument();
      });
    });
  });
});
