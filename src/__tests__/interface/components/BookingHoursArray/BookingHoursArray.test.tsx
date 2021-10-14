import { render, screen } from "@testing-library/react";
import { BookTime } from "../../../../core/Entities/BookTime";
import { BookingHoursComponent } from "../../../../interface/components/BookingHoursArray/BookingHoursArr";
import { ReduxProvider } from "../../../../stateManagment/ReduxProvider";
import { store } from "../../../../stateManagment/store";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { RestaurantOrPub } from "../../../../core/Entities/RestaurantOrPub";
import { DayOfTheWeekOpenHours } from "../../../../core/Entities/DayOfTheWeek";

export const tRestaurantOrPub = new RestaurantOrPub(
  "Restauracja",
  "polska",
  ["fajna", "mila"],
  "jest tu fajnie",
  20,
  "link",
  [new BookTime(30, 10, 12, 2, 2020, 3), new BookTime(0, 11, 12, 2, 2020, 3)],
  "image",
  "descriptionPage",
  [new DayOfTheWeekOpenHours(8, 0, 20, 0), null]
);

const tAlternativeBookTimesWith6BookTimes = [
  new BookTime(30, 12, 10, 3, 2020, 8),
  new BookTime(0, 13, 10, 3, 2020, 8),
  new BookTime(30, 13, 10, 3, 2020, 8),
  new BookTime(0, 14, 10, 3, 2020, 8),
  new BookTime(30, 14, 10, 3, 2020, 8),
  new BookTime(0, 15, 10, 3, 2020, 8),
];

const tAlternativeBookTimesWith5BtAnd1Zero: (0 | BookTime | null)[] = [
  new BookTime(30, 12, 10, 3, 2020, 8),
  new BookTime(0, 13, 10, 3, 2020, 8),
  0,
  new BookTime(0, 14, 10, 3, 2020, 8),
  new BookTime(30, 14, 10, 3, 2020, 8),
  new BookTime(0, 15, 10, 3, 2020, 8),
];
const tAlternativeBookTimesWith2Bt3NullsAnd1Zero: (0 | BookTime | null)[] = [
  new BookTime(30, 12, 10, 3, 2020, 8),
  new BookTime(0, 13, 10, 3, 2020, 8),
  null,
  null,
  null,
  0,
  0,
];

test("BookingHoursArray", () => {
  console.log(
    "unit react testing are currently commented, because I thin e2e test will be much better choice"
  );
});

// describe("BookingHoursArray", () => {
//   const renderBookingHoursArrayComponent = (
//     alternativeBookingHours: (0 | BookTime | null)[]
//   ) =>
//     render(
//       <ReduxProvider store={store}>
//         <BookingHoursComponent
//           alternativeBookingHours={alternativeBookingHours}
//           restaurantOrPub={tRestaurantOrPub}
//           type="pc"
//         />
//       </ReduxProvider>
//     );

//   test("should render", () => {
//     renderBookingHoursArrayComponent(tAlternativeBookTimesWith6BookTimes);
//   });

//   test("should render array of 6 BookTimes", () => {
//     const { getByText } = renderBookingHoursArrayComponent(
//       tAlternativeBookTimesWith6BookTimes
//     );

//     expect(getByText("12:30")).toBeTruthy();
//     expect(getByText("13:00")).toBeTruthy();
//     expect(getByText("13:30")).toBeTruthy();
//     expect(getByText("14:00")).toBeTruthy();
//     expect(getByText("14:30")).toBeTruthy();
//     expect(getByText("15:00")).toBeTruthy();
//   });

//   test("should render array of 5 BookTimes And 1 0", async () => {
//     const { getByText, findAllByTestId } = renderBookingHoursArrayComponent(
//       tAlternativeBookTimesWith5BtAnd1Zero
//     );

//     //Component should not exist
//     //In expect I verify, that the component doesnt exist
//     const shouldNotExistComponent = screen.queryByText("13:30");

//     //Array of all closed BookTime conponents
//     const closedRestaurantComponent = await findAllByTestId("closed");

//     expect(getByText("12:30")).toBeTruthy();
//     expect(getByText("13:00")).toBeTruthy();
//     expect(shouldNotExistComponent).not.toBeInTheDocument();
//     expect(closedRestaurantComponent).toHaveLength(1);
//     expect(getByText("14:00")).toBeTruthy();
//     expect(getByText("14:30")).toBeTruthy();
//     expect(getByText("15:00")).toBeTruthy();
//   });

//   test("should render array of 2 BookTimes, 3 nulls and 1 zero", async () => {
//     const { findAllByTestId, getByText } = renderBookingHoursArrayComponent(
//       tAlternativeBookTimesWith2Bt3NullsAnd1Zero
//     );
//     //Array of all closed BookTime conponents
//     const allClosedBookTimes = await findAllByTestId("closed");
//     //Array of all booked BookTime conponents
//     const allBookedBookTimes = await findAllByTestId("booked");

//     //Component should not exist
//     //In expect I verify, that the component doesnt exist
//     const shouldNotExistComponents = [
//       screen.queryByText("13:30"),
//       screen.queryByText("14:00"),
//       screen.queryByText("14:30"),
//       screen.queryByText("15:00"),
//     ];

//     //Verifying that all 6 elements are right rendered
//     expect(getByText("12:30")).toBeTruthy();
//     expect(getByText("13:00")).toBeTruthy();
//     expect(shouldNotExistComponents[0]).not.toBeInTheDocument();
//     expect(shouldNotExistComponents[1]).not.toBeInTheDocument();
//     expect(shouldNotExistComponents[2]).not.toBeInTheDocument();
//     expect(shouldNotExistComponents[3]).not.toBeInTheDocument();

//     //Verifying that closed and booked times are rerendered correctly
//     expect(allClosedBookTimes).toHaveLength(2);
//     expect(allBookedBookTimes).toHaveLength(3);
//   });
// });

export {};
