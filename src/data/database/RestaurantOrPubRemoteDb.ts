import axios from "axios";
import { BookTime } from "../../core/Entities";
import { ROPArrayFromJson } from "../models/RestaurantOrPubArrayModel";
import { APIURLS } from "../../core/ImportantVariables/variables";
import { ReservationFindNextAvaliableJson } from "../../core/Interfaces/index";
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

    const { data } = await axios.post(
      `${APIURLS.serverAddress}${APIURLS.getRestaurants}`,
      {
        address: address,
        bookTime: bookTimeToJson,
      },
      this.config
    );

    return Promise.resolve(ROPArrayFromJson(data));
  }

  async getRestaurantInfoDescriptionPage(name: string, bookTime: BookTime) {
    let { data }: any = await axios.post(
      `${APIURLS.serverAddress}${APIURLS.getRestaurantInfoDescriptionPage}`,
      { name, bookTime },
      this.config
    );
    let responseData: RestaurantDescriptionInfoResponse = data;
    return Promise.resolve(responseData);
  }

  async getRestaurantInfoConfirmPage(name: string, bookTime: BookTime) {
    let { data }: any = await axios.post(
      `${APIURLS.serverAddress}${APIURLS.getRestaurantInfoConfirmPage}`,
      { name, bookTime },
      this.config
    );
    let responseData: RestaurantConfirmInfoResponse = data;

    return Promise.resolve(responseData);
  }
  async getRoPAlternativeBookingHours(name: string, bookTime: BookTime) {
    let { data }: any = await axios.post(
      `${APIURLS.serverAddress}${APIURLS.getRoPAlternativeBookingHours}`,
      { name, bookTime },
      this.config
    );
    let responseData: ({
      minute: number;
      hour: number;
      day: number;
      month: number;
      year: number;
      people: number;
    } | null)[] = data;

    return Promise.resolve(responseData);
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
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(1, err));
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
  console.log(bookTimeJsonWithName);
  console.log(
    `${APIURLS.serverAddress}${APIURLS.reservation.reservation}${AddOrDeleteRoutePath}`
  );
  const response = await axios
    .post(
      `${APIURLS.serverAddress}${APIURLS.reservation.reservation}${AddOrDeleteRoutePath}`,
      bookTimeJsonWithName,
      config
    )
    .then((res) => console.log(res))
    .catch((e) => {
      console.log(e);
    });

  return Promise.resolve(response);
}
