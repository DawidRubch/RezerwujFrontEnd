import axios from "axios";
import { BookTime } from "../../core/Entities/BookTime";
import { ROPArrayFromJson } from "../models/RestaurantOrPubArrayModel";
import { APIURLS } from "../../core/ImportantVariables/variables";
import { ReservationFindNextAvaliableJson } from "../../core/Interfaces/ReservationFindNextAvaliable";
import { RestaurantDescriptionInfoResponse } from "../../core/Interfaces/RestaurantDescriptionInfoResponse";
import { RestaurantConfirmInfoResponse } from "../../core/Interfaces/RestaurantConfirmInfoResponse";

//@todo refactor
export class RestaurantOrPubRemoteDb {
  //Config to send to database
  config = {
    headers: {
      crossDomain: true,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  enviromentType = process.env.WDS_SOCKET_PATH;

  async getRestaurantsFromDb(bookTime: BookTime, address?: string) {
    let bookTimeToJson = bookTime.toJson();

    const URL = `${APIURLS.serverAddress}${APIURLS.getRestaurants}`;

    const postData = {
      address: address,
      bookTime: bookTimeToJson,
      enviromentType: this.enviromentType,
    };

    const { data } = await axios.post(URL, postData, this.config);

    return ROPArrayFromJson(data);
  }

  async getRestaurantInfoDescriptionPage(name: string, bookTime: BookTime) {
    const URL = `${APIURLS.serverAddress}${APIURLS.getRestaurantInfoDescriptionPage}`;

    const postData = { name, bookTime, enviromentType: this.enviromentType };

    const { data } = await axios.post(URL, postData, this.config);

    const responseData: RestaurantDescriptionInfoResponse = data;

    return responseData;
  }

  async getRestaurantInfoConfirmPage(name: string, bookTime: BookTime) {
    const URL = `${APIURLS.serverAddress}${APIURLS.getRestaurantInfoConfirmPage}`;

    const { data } = await axios.post(
      URL,
      { name, bookTime, enviromentType: this.enviromentType },
      this.config
    );

    if (typeof data === "number") {
      return;
    }

    const responseData: RestaurantConfirmInfoResponse = data;

    return responseData;
  }
  async getRoPAlternativeBookingHours(name: string, bookTime: BookTime) {
    const URL = `${APIURLS.serverAddress}${APIURLS.getRoPAlternativeBookingHours}`;

    const { data }: any = await axios.post(
      URL,
      { name, bookTime, enviromentType: this.enviromentType },
      this.config
    );

    const responseData: (
      | {
          minute: number;
          hour: number;
          day: number;
          month: number;
          year: number;
          people: number;
        }
      | null
      | 0
    )[] = data;

    return responseData;
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
      this.config,
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
  additionalInfo?: string,
  number?: string
) {
  const { minute, hour, year, day, month, people, name } = bookTime.toJson();
  const bookTimeJsonWithName: ReservationFindNextAvaliableJson = {
    name: restaurantName,
    personName,
    number,
    additionalInfo,
    bookTime: {
      minute,
      hour,
      year,
      day,
      month,
      people,
      name,
    },
    enviromentType: process.env.ENVIROMENT_VARIABLE,
  };

  const URL = `${APIURLS.serverAddress}${APIURLS.reservation.reservation}${AddOrDeleteRoutePath}`;

  try {
    return await axios.post(URL, bookTimeJsonWithName, config);
  } catch (err) {
    return err;
  }

  // return response;
}
