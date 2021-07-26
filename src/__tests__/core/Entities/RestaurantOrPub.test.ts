import { DayOfTheWeekOpenHours } from "../../../core/Entities/DayOfTheWeek";
import { BookTime } from "../../../core/Entities/BookTime";
import { ROPLocation } from "../../../core/Entities/Location";
import {
  fromJson,
  RestaurantOrPub,
} from "../../../core/Entities/RestaurantOrPub";

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

const tRestaurantOrPubJSON = {
  name: "Restauracja",
  type: "polska",
  tags: ["fajna", "mila"],
  shortDescription: "jest tu fajnie",
  location: { lat: 50, long: 30 },
  distance: -1,
  chairs: 20,
  menuLink: "link",
  bookTimeArray: [
    {
      minute: 30,
      hour: 10,
      day: 12,
      month: 2,
      year: 2020,
      people: 3,
      name: "",
    },
    {
      minute: 0,
      hour: 11,
      day: 12,
      month: 2,
      year: 2020,
      people: 3,
      name: "",
    },
  ],
  alternativeBookingHours: [],
  image: "image",
  descriptionPageImg: "descriptionPage",
  weekArray: [
    { openHour: 8, openMinute: 0, closingHour: 20, closingMinute: 0 },
    null,
  ],
};

describe("RestaurantOrPubEntity", () => {
  test("should return RestaurantOrPubEntity from JSON object", () => {
    expect(fromJson(tRestaurantOrPubJSON)).toStrictEqual(tRestaurantOrPub);
  });
});

export {};
