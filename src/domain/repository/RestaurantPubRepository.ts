import { BookTime } from "core";
import { RestaurantOrPubRemoteDb } from "data";
const restaurantOrPubRemoteDb = new RestaurantOrPubRemoteDb();
export class RestaurantOrPubRepository {
  async getRoPArrayFromDb(bookTime: BookTime, address?: string) {
    return await restaurantOrPubRemoteDb.getRestaurantsFromDb(
      bookTime,
      address
    );
  }

  async getRestaurantInfoDescriptionPage(name: string, bookTime: BookTime) {
    return await restaurantOrPubRemoteDb.getRestaurantInfoDescriptionPage(
      name,
      bookTime
    );
  }
  async getRestaurantInfoConfirmPage(name: string, bookTime: BookTime) {
    return await restaurantOrPubRemoteDb.getRestaurantInfoConfirmPage(
      name,
      bookTime
    );
  }
  async getRoPAlternativeBookingHours(name: string, bookTime: BookTime) {
    return await restaurantOrPubRemoteDb.getRoPAlternativeBookingHours(
      name,
      bookTime
    );
  }

  async saveBookTime(
    bookTime: BookTime,
    restaurantName: string,
    number: string,
    personName: string,
    additionalInfo?: string
  ) {
    return await restaurantOrPubRemoteDb.saveBookTime(
      bookTime,
      restaurantName,
      number,
      personName,
      additionalInfo
    );
  }

  async deleteBookTime(bookTime: BookTime, restaurantName: string) {
    await restaurantOrPubRemoteDb.deleteBookTime(bookTime, restaurantName);
  }
}
