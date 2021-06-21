import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";

import { ReactCalendar } from "../../../../../interface/components/CalendarAndLocation/Calendar/Calendar";

import { ReduxProvider } from "../../../../../stateManagment/ReduxProvider";
import { store } from "../../../../../stateManagment/store";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

const getLabelTextFromNumbers = (
  date: number | string,
  month: number | string,
  year: number | string
) => `${date}.${month}.${year}`;

const renderReactCalendar = () =>
  render(
    <ReduxProvider store={store}>
      <ReactCalendar />
    </ReduxProvider>
  );

describe("Calendar", () => {
  const tDate_object = new Date();

  //Taking day, month, year out of
  let tDate: number | string = tDate_object.getDate();
  tDate <= 9 ? (tDate = `0${tDate}`) : null;

  let tMonth: number | string = tDate_object.getMonth() + 1;
  tMonth <= 9 ? (tMonth = `0${tMonth}`) : null;

  const tYear = tDate_object.getFullYear();

  const labelText = `${tDate}.${tMonth}.${tYear}`;

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

    const button = getByText(labelText);

    fireEvent.click(button);

    await waitFor(async () => {
      const pressDayButton = getByText(tDate);
      fireEvent.click(pressDayButton);

      await waitFor(() => {
        expect(pressDayButton).not.toBeInTheDocument();
        expect(getByText(labelText)).toBeInTheDocument();
      });
    });
  });
});
