import { BookTime } from "../../../core/Entities/BookTime";
import { RestaurantOrPubRemoteDb } from "../../../data/database/RestaurantOrPubRemoteDb";
import axios from "axios";
import { APIURLS } from "../../../core/ImportantVariables/variables";
const tBookTime = new BookTime(30, 10, 12, 2, 2020, 4);

jest.mock("axios");
(axios as jest.Mocked<typeof axios>).post.mockResolvedValue({});

const tRestaurantOrPubRemoteDb = new RestaurantOrPubRemoteDb();

const tConfig = {
  headers: {
    crossDomain: true,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};
const tPostDataWithAdressAndBookTime = {
  address: undefined,
  bookTime: {
    minute: 30,
    hour: 10,
    day: 12,
    month: 2,
    year: 2020,
    people: 4,
    name: "",
  },
};
const tPostDataWithRestaurantNameAndBookTime = {
  name: "Ceglana",
  bookTime: {
    minute: 30,
    hour: 10,
    day: 12,
    month: 2,
    year: 2020,
    people: 4,
    name: "",
  },
};
describe("RestaurantOrPubRemoteDb", () => {
  describe("getRestaurantsFromDb", () => {
    test("should function be called with right parameters", async () => {
      //Mocking the resolved call of axios function

      tRestaurantOrPubRemoteDb.getRestaurantsFromDb(tBookTime);

      expect(axios.post).toBeCalledWith(
        `${APIURLS.serverAddress}${APIURLS.getRestaurants}`,
        tPostDataWithAdressAndBookTime,
        tConfig
      );
    });
  });
  describe("getRestaurantInfoConfirmPage", () => {
    test("should function be called with right parameters", async () => {
      tRestaurantOrPubRemoteDb.getRestaurantInfoConfirmPage(
        "Ceglana",
        tBookTime
      );

      expect(axios.post).toBeCalledWith(
        `${APIURLS.serverAddress}${APIURLS.getRestaurantInfoConfirmPage}`,
        tPostDataWithRestaurantNameAndBookTime,
        tConfig
      );
    });
  });

  describe("getRoPAlternativeBookingHours", () => {
    test("should function be called with right parameters", () => {
      tRestaurantOrPubRemoteDb.getRoPAlternativeBookingHours(
        "Ceglana",
        tBookTime
      );

      expect(axios.post).toBeCalledWith(
        `${APIURLS.serverAddress}${APIURLS.getRoPAlternativeBookingHours}`,
        tPostDataWithRestaurantNameAndBookTime,
        tConfig
      );
    });
  });

  describe("getRestaurantInfoDescriptionPage", () => {
    test("should function be called with right parameters", () => {
      tRestaurantOrPubRemoteDb.getRestaurantInfoDescriptionPage(
        "Ceglana",
        tBookTime
      );

      expect(axios.post).toBeCalledWith(
        `${APIURLS.serverAddress}${APIURLS.getRestaurantInfoDescriptionPage}`,
        tPostDataWithRestaurantNameAndBookTime,
        tConfig
      );
    });
  });

  describe("delete and add reservations", () => {
    const tPostDataWithInfo = {
      name: "Ceglana",
      email: "tomek@wp.pl",
      personName: "Dawid",
      surName: "Niegrebecki",
      number: "997",
      bookTime: {
        minute: 30,
        hour: 10,
        day: 12,
        month: 2,
        year: 2020,
        people: 4,
        name: "",
      },
    };

    test("should add reservation be called with right paramaters", () => {
      tRestaurantOrPubRemoteDb.saveBookTime(
        tBookTime,
        "Ceglana",
        "997",
        "Dawid",
        "Niegrebecki",
        "tomek@wp.pl"
      );

      expect(axios.post).toBeCalledWith(
        `${APIURLS.serverAddress}${APIURLS.reservation.reservation}${APIURLS.reservation.save}`,
        tPostDataWithInfo,
        tConfig
      );
    });

    test("should delete reservation be called with right paramaters", () => {
      tRestaurantOrPubRemoteDb.deleteBookTime(tBookTime, "Ceglana");

      expect(axios.post).toBeCalledWith(
        `${APIURLS.serverAddress}${APIURLS.reservation.reservation}${APIURLS.reservation.delete}`,
        tPostDataWithRestaurantNameAndBookTime,
        tConfig
      );
    });
  });
});
export {};
