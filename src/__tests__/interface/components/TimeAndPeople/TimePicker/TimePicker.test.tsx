// import { screen, render } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

// import React from "react";
// import { TimePicker } from "../../../../../interface/components/TimeAndPeople/TimePicker/TimePicker";
// import { TimePickerFunctions } from "../../../../../InterfaceFunctions/ComponentFunctions/TimePickerFunctions/TimePickerFunctions";
// import { ReduxProvider } from "../../../../../stateManagment/ReduxProvider";
// import { store } from "../../../../../stateManagment/store";

// jest.mock(
//   "../../../../../InterfaceFunctions/ComponentFunctions/TimePickerFunctions/TimePickerFunctions"
// );

// const mockGenerateTime = jest
//   .fn()
//   .mockReturnValue(["10:00", "10:30", "11:00", "11:30", "12:00"]);

// TimePickerFunctions.prototype.generateTime = mockGenerateTime;
// describe("TimePicker", () => {
//   const renderTimePicker = () =>
//     render(
//       <ReduxProvider store={store}>
//         <TimePicker></TimePicker>
//       </ReduxProvider>
//     );

//   test("should render", () => {
//     renderTimePicker();
//   });

//   test("should press on option", async () => {
//     renderTimePicker();

//     const select = screen.getByTestId("select");
//     //Looking for value 2, because it starts with 0
//     userEvent.selectOptions(select, screen.getByText("10:30"));

//     expect((screen.getByText("10:30") as HTMLOptionElement).selected).toBe(
//       true
//     );
//   });
// });

test("test is commented, if not used until 08.10 should be deleted", () => {
  console.log(
    "Components tests are commented for now, due to implementing e2e tests. I think e2e tests are better for testing UI functionality"
  );
});
export {};

// export {};
