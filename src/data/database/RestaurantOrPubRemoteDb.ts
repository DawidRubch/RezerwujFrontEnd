import axios from "axios";
import { BookTime } from "../../core/Entities";
import { ROPArrayFromJson } from "../models/RestaurantOrPubArrayModel";
import { APIURLS } from "../../core/ImportantVariables/variables";
import { ReservationFindNextAvaliableJson } from "../../core/Interfaces/index";

export class RestaurantOrPubRemoteDb {
  config = {
    headers: {
      crossDomain: true,
      "Content-Type": "application/json",
    },
  };
  
  async getRestaurantsFromDb(bookTime: BookTime, address?: string) {
    let bookTimeToJson = bookTime.toJson();

    const response = await axios.post(
      `${APIURLS.serverAddress}${APIURLS.getRestaurants}`,
      {
        address: address,
        bookTime: bookTimeToJson,
      },
      this.config
    );

    return Promise.resolve(ROPArrayFromJson(response.data));
  }

  async saveBookTime(bookTime: BookTime, restaurantName: string) {
    await manageReservations(
      APIURLS.reservation.save,
      restaurantName,
      bookTime,
      this.config
    ).then(() => {
      console.log("Zapisano");
    });
  }
  async deleteBookTime(bookTime: BookTime, restaurantName: string) {
    await manageReservations(
      APIURLS.reservation.delete,
      restaurantName,
      bookTime,
      this.config
    ).then(() => console.log("Usunieto"));
  }
}

async function manageReservations(
  AddOrDeleteRoutePath: string,
  restaurantName: string,
  bookTime: BookTime,
  config: any
) {
  let bookTimeToJson = bookTime.toJson();
  let bookTimeJsonWithName: ReservationFindNextAvaliableJson = {
    name: restaurantName,
    bookTime: {
      minute: bookTimeToJson.minute,
      hour: bookTimeToJson.hour,
      year: bookTimeToJson.year,
      day: bookTimeToJson.day,
      month: bookTimeToJson.month,
      people: bookTimeToJson.people,
      name: bookTime.name,
    },
  };

  const response = await axios.post(
    `${APIURLS.serverAddress}${APIURLS.reservation.reservation}${AddOrDeleteRoutePath}`,
    bookTimeJsonWithName,
    config
  );

  return Promise.resolve(response);
}
