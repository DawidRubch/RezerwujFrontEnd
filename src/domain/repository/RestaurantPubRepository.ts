import { BookTime } from "../../core/Entities";
import { RestaurantOrPubRemoteDb } from "../../data/database/RestaurantOrPubRemoteDb";

export default class RestaurantOrPubRepository {
  restaurantOrPubRemoteDb = new RestaurantOrPubRemoteDb();

  async mapROPArrayToJSX(bookTime: BookTime, address?: string) {
    return await this.restaurantOrPubRemoteDb.getRestaurantsFromDb(
      bookTime,
      address
    );
  }

  async getRestaurantInfoDescriptionPage(name: string, bookTime: BookTime) {
    return await this.restaurantOrPubRemoteDb.getRestaurantInfoDescriptionPage(
      name,
      bookTime
    );
  }
  async getRestaurantInfoConfirmPage(name: string, bookTime: BookTime) {
    return await this.restaurantOrPubRemoteDb.getRestaurantInfoConfirmPage(
      name,
      bookTime
    );
  }
  async getRoPAlternativeBookingHours(name: string, bookTime: BookTime) {
    return await this.restaurantOrPubRemoteDb.getRoPAlternativeBookingHours(
      name,
      bookTime
    );
  }

  async saveBookTime(
    bookTime: BookTime,
    restaurantName: string,
    number: string,
    name: string,
    surName: string,
    email?: string
  ) {
    await this.restaurantOrPubRemoteDb
      .saveBookTime(bookTime, restaurantName, number, name, surName, email)
      .then((res) => console.log(res));
  }

  async deleteBookTime(bookTime: BookTime, restaurantName: string) {
    await this.restaurantOrPubRemoteDb.deleteBookTime(bookTime, restaurantName);
  }
}
