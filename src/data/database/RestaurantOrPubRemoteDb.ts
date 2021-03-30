import axios from "axios";
import { BookTime } from "../../core/Entities/BookTime";
import { ROPArrayFromJson } from "../models/RestaurantOrPubArrayModel";
import { APIURLS } from "../../core/ImportantVariables/variables";
import { ReservationFindNextAvaliableJson } from "../../core/Interfaces/ReservationFindNextAvaliable";
import { RestaurantDescriptionInfoResponse } from "../../core/Interfaces/RestaurantDescriptionInfoResponse";
import { RestaurantConfirmInfoResponse } from "../../core/Interfaces/RestaurantConfirmInfoResponse";

export class RestaurantOrPubRemoteDb {
  config = {
    headers: {
      crossDomain: true,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  async getRestaurantsFromDb(bookTime: BookTime, address?: string) {
    let bookTimeToJson = bookTime.toJson();

    const URL = `${APIURLS.serverAddress}${APIURLS.getRestaurants}`;

    const postData = {
      address: address,
      bookTime: bookTimeToJson,
    };

    const { data } = await axios.post(URL, postData, this.config);

    return ROPArrayFromJson(data);
  }

  async getRestaurantInfoDescriptionPage(name: string, bookTime: BookTime) {
    const URL = `${APIURLS.serverAddress}${APIURLS.getRestaurantInfoDescriptionPage}`;

    const postData = { name, bookTime };

    let { data } = await axios.post(URL, postData, this.config);

    let responseData: RestaurantDescriptionInfoResponse = data;

    return responseData;
  }

  async getRestaurantInfoConfirmPage(name: string, bookTime: BookTime) {
    const URL = `${APIURLS.serverAddress}${APIURLS.getRestaurantInfoConfirmPage}`;

    let { data } = await axios.post(URL, { name, bookTime }, this.config);

    if (typeof data === "number") {
      return;
    }
    
    let responseData: RestaurantConfirmInfoResponse = data;

    return responseData;
  }
  async getRoPAlternativeBookingHours(name: string, bookTime: BookTime) {
    const URL = `${APIURLS.serverAddress}${APIURLS.getRoPAlternativeBookingHours}`;

    let { data }: any = await axios.post(URL, { name, bookTime }, this.config);

    let responseData: ({
      minute: number;
      hour: number;
      day: number;
      month: number;
      year: number;
      people: number;
    } | null)[] = data;

    return responseData;
  }
  async saveBookTime(
    bookTime: BookTime,
    restaurantName: string,
    number: string,
    name: string,
    surName: string,
    email?: string
  ) {
    await manageReservations(
      APIURLS.reservation.save,
      restaurantName,
      bookTime,
      this.config,
      name,
      surName,
      number,
      email
    );
  }
  async deleteBookTime(bookTime: BookTime, restaurantName: string) {
    await manageReservations(
      APIURLS.reservation.delete,
      restaurantName,
      bookTime,
      this.config
    );
  }
}

async function manageReservations(
  AddOrDeleteRoutePath: string,
  restaurantName: string,
  bookTime: BookTime,
  config: any,
  personName?: string,
  surName?: string,
  number?: string,
  email?: string
) {
  let bookTimeToJson = bookTime.toJson();
  let bookTimeJsonWithName: ReservationFindNextAvaliableJson = {
    name: restaurantName,
    email,
    personName,
    surName,
    number,
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

  const URL = `${APIURLS.serverAddress}${APIURLS.reservation.reservation}${AddOrDeleteRoutePath}`;

  const response = await axios.post(URL, bookTimeJsonWithName, config);

  return response;
}
