import { BookTime } from "../../../core/Entities/BookTime";
import { RestaurantOrPubRemoteDb } from "../../../data/database/RestaurantOrPubRemoteDb";

const tBookTime = new BookTime(30, 10, 12, 2, 2020, 4);
const restaurantOrPubRemoteDb = new RestaurantOrPubRemoteDb();
describe("RestaurantOrPubRemoteDb", () => {
  describe("getRestaurantsFromDb", () => {
    test("should return Restaurants array from db", async () => {
      return restaurantOrPubRemoteDb
        .getRestaurantsFromDb(tBookTime)
        .then((res) => expect(typeof res).toBe("object"));
    });
  });

  describe("getRestaurantInfoDescriptionPage", () => {
    test("should return Restaurant Description info response", async () => {
      return restaurantOrPubRemoteDb
        .getRestaurantInfoConfirmPage("Ceglana", tBookTime)
        .then((res) => expect(typeof res).toBe("object"));
    });
  });
});

export {};
