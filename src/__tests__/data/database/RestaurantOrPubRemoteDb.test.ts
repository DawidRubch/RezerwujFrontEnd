import axios from "axios";
import { BookTime } from "../../../core/Entities/BookTime";
import { RestaurantOrPubRemoteDb } from "../../../data/database/RestaurantOrPubRemoteDb";

jest.mock("axios");

const bookTime = new BookTime(30, 10, 12, 2, 2020, 4);
const restaurantOrPubRemoteDb = new RestaurantOrPubRemoteDb();
describe("RestaurantOrPubRemoteDb", () => {
  describe("getRestaurantsFromDb", () => {
    test("should return Restaurants array from db", () => {
      restaurantOrPubRemoteDb.getRestaurantsFromDb(bookTime);
    });
  });
});

export {};
