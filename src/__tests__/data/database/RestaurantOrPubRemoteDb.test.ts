import { BookTime } from "../../../core/Entities/BookTime";
import axios from "axios";
import { APIURLS } from "../../../core/ImportantVariables/APIURLS";
import { RestaurantOrPubRemoteDb } from "data";

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

const tBookTime = new BookTime(30, 10, 12, 2, 2020, 4);

const tPostDataWithAdressAndBookTime = {
  address: undefined,
  bookTime: tBookTime,
};
const tPostDataWithRestaurantNameAndBookTime = {
  name: "Ceglana",
  bookTime: tBookTime,
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
      personName: "Dawid",
      number: "997",
      bookTime: tBookTime,
    };

    test("should add reservation be called with right paramaters", () => {
      tRestaurantOrPubRemoteDb.saveBookTime(
        tBookTime,
        "Ceglana",
        "997",
        "Dawid"
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
