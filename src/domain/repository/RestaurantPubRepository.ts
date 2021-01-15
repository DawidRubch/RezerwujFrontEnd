import { BookTime, RestaurantOrPub } from "../../core/Entities";
import { RestaurantOrPubRemoteDb } from "../../data/database/RestaurantOrPubRemoteDb";

export default class RestaurantOrPubRepository {
  restaurantOrPubRemoteDb = new RestaurantOrPubRemoteDb();

  async mapROPArrayToJSX(bookTime: BookTime, address?: string) {
    return await this.restaurantOrPubRemoteDb.getRestaurantsFromDb(bookTime, address);
  }

  async saveBookTime(bookTime: BookTime, restaurantName: string) {
    await this.restaurantOrPubRemoteDb.saveBookTime(bookTime, restaurantName);
  }

  async deleteBookTime(bookTime: BookTime, restaurantName: string) {
    await this.restaurantOrPubRemoteDb.deleteBookTime(bookTime, restaurantName);
  }
}
