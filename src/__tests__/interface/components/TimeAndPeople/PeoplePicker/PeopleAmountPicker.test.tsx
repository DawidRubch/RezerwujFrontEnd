import {
  screen,
  render,
  cleanup,
  getByLabelText,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import React from "react";
import { PeopleAmountPicker } from "../../../../../interface/components/TimeAndPeople/PeoplePicker/PeopleAmountPicker";
import { ReduxProvider } from "../../../../../stateManagment/ReduxProvider";
import { store } from "../../../../../stateManagment/store";

//Mocking the People array variable
jest.mock("../../../../../core/ImportantVariables/variables", () => ({
  PeopleArr: ["1", "2", "3", "4", "5"],
}));

beforeEach(cleanup);

describe("PeopleAmountPicker", () => {
  const renderPeopleAmountPicker = () =>
    render(
      <ReduxProvider store={store}>
        <PeopleAmountPicker />
      </ReduxProvider>
    );

  test("should render", () => {
    renderPeopleAmountPicker();
  });

  test("should press on option", async () => {
    renderPeopleAmountPicker();

    const select = screen.getByTestId("select");
    //Looking for value 2, because it starts with 0
    userEvent.selectOptions(select, screen.getByText("👨 3 3"));

    expect((screen.getByText("👨 3 3") as HTMLOptionElement).selected).toBe(
      true
    );
  });
});
