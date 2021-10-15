import { APIURLS, RestaurantOrPub } from "core";
import axios from "axios";
import { BookTime, EnviromentType } from "types/types";
import { ReservationFindNextAvaliableJson, RestaurantConfirmInfoResponse, RestaurantDescriptionInfoResponse } from "types/interfaces";

const CONFIG = {
  headers: {
    crossDomain: true,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

//@todo refactor
export class RestaurantOrPubRemoteDb {
  //Config to send to database
  enviromentType = process.env.WDS_SOCKET_PATH;

  async getRestaurantsFromDb(bookTime: BookTime, address?: string) {
    const URL = `${APIURLS.serverAddress}${APIURLS.getRestaurants}`;

    const postData = {
      address,
      bookTime: bookTime,
      enviromentType: this.enviromentType,
    };

    const { data }: { data: RestaurantOrPub[] } = await axios.post(
      URL,
      postData,
      CONFIG
    );

    return data;
  }

  async getRestaurantInfoDescriptionPage(name: string, bookTime: BookTime) {
    const URL = `${APIURLS.serverAddress}${APIURLS.getRestaurantInfoDescriptionPage}`;

    const postData = { name, bookTime, enviromentType: this.enviromentType };

    const { data }: { data: RestaurantDescriptionInfoResponse } =
      await axios.post(URL, postData, CONFIG);

    return data;
  }

  async getRestaurantInfoConfirmPage(name: string, bookTime: BookTime) {
    const URL = `${APIURLS.serverAddress}${APIURLS.getRestaurantInfoConfirmPage}`;

    const { data }: { data: RestaurantConfirmInfoResponse } = await axios.post(
      URL,
      { name, bookTime, enviromentType: this.enviromentType },
      CONFIG
    );

    if (typeof data === "number") {
      return;
    }

    return data;
  }
  async getRoPAlternativeBookingHours(name: string, bookTime: BookTime) {
    const URL = `${APIURLS.serverAddress}${APIURLS.getRoPAlternativeBookingHours}`;

    const { data }: { data: (BookTime | null | 0)[] } = await axios.post(
      URL,
      { name, bookTime, enviromentType: this.enviromentType },
      CONFIG
    );

    return data;
  }
  async saveBookTime(
    bookTime: BookTime,
    restaurantName: string,
    number: string,
    personName: string,
    additionalInfo?: string
  ) {
    return await manageReservations(
      APIURLS.reservation.save,
      restaurantName,
      bookTime,
      CONFIG,
      personName,
      additionalInfo,
      number
    );
  }
  async deleteBookTime(bookTime: BookTime, restaurantName: string) {
    await manageReservations(
      APIURLS.reservation.delete,
      restaurantName,
      bookTime,
      CONFIG
    );
  }
}

async function manageReservations(
  AddOrDeleteRoutePath: string,
  restaurantName: string,
  bookTime: BookTime,
  config: any,
  personName?: string,
  additionalInfo?: string,
  number?: string
) {
  const bookTimeJsonWithName: ReservationFindNextAvaliableJson = {
    name: restaurantName,
    personName,
    number,
    additionalInfo,
    bookTime,
    enviromentType: process.env.ENVIROMENT_VARIABLE as EnviromentType,
  };

  const URL = `${APIURLS.serverAddress}${APIURLS.reservation.reservation}${AddOrDeleteRoutePath}`;

  try {
    return await axios.post(URL, bookTimeJsonWithName, config);
  } catch (err) {
    return err;
  }
}
