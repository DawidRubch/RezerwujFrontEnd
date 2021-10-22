import { APIURLS, BookTime, RestaurantOrPub } from "core";

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
  bookTime: BookTime;
  name: string;
  number: string;
  personName: string;
  additionalInfo?: string;
};

export const saveBookTime = async (data: ManageBookTimeInfo) => {
  return await RezerwujApi.post(APIURLS.reservation.save, data);
};

export const deleteBookTime = async (data: ManageBookTimeInfo) => {
  return await RezerwujApi.post(APIURLS.reservation.delete, data);
};

type RestaurantInput = {
  bookTime?: BookTime;
};

export const getRestaurant = async (data: RestaurantInput, name: string) => {
  return await RezerwujApi.post<RestaurantOrPub>(
    `/getRestaurant/${name}`,
    data
  );
};
