import { APIURLS, BookTime, RestaurantOrPub } from "core";
import {
  RestaurantConfirmInfoResponse,
  RestaurantDescriptionInfoResponse,
} from "types/interfaces";
import { RezerwujApi } from "./ApiInstance";

export type RestaurantFromDbInput = {
  bookTime: BookTime;
  address?: string;
};

export const getRestaurantsFromDb = (data: RestaurantFromDbInput) => {
  return RezerwujApi.post<RestaurantOrPub[]>(APIURLS.getRestaurants, data);
};

export type RestaurantInfoInput = {
  bookTime: BookTime;
  name: string;
};

export const getRestaurantInfoDescriptionPage = async (
  data: RestaurantInfoInput
) => {
  return await RezerwujApi.post<RestaurantDescriptionInfoResponse>(
    APIURLS.getRestaurantInfoDescriptionPage,
    data
  );
};

export const getRestaurantInfoConfirmPage = async (
  data: RestaurantInfoInput
) => {
  return await RezerwujApi.post<RestaurantConfirmInfoResponse>(
    APIURLS.getRestaurantInfoConfirmPage,
    data
  );
};

export type BookTimeResponse = (BookTime | null | 0)[];

export const getRoPAlternativeBookingHours = async (
  data: RestaurantInfoInput
) => {
  return await RezerwujApi.post<BookTimeResponse>(
    APIURLS.getRoPAlternativeBookingHours,
    data
  );
};

export type ManageBookTimeInfo = {
  data: {
    bookTime: BookTime;
    name: string;
    number: string;
    personName: string;
    additionalInfo?: string;
  };
};

export const saveBookTime = async (data: ManageBookTimeInfo) => {
  return await RezerwujApi.post(APIURLS.reservation.save, data);
};

export const deleteBookTime = async (data: ManageBookTimeInfo) => {
  return await RezerwujApi.post(APIURLS.reservation.delete, data);
};
