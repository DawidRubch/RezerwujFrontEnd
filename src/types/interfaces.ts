import { Routes } from "routes";
import { Action, Category, Label } from "./enums";
import { BookTime, EnviromentType, SearchQParam } from "./types";

export interface GAevent {
  action: Action | string;
  category: Category;
  label?: Label;
}

export interface ReservationFindNextAvaliableJson {
  name: string;
  email?: string;
  number?: string;
  personName?: string;
  surName?: string;
  additionalInfo?: string;
  bookTime: BookTime;
  enviromentType: EnviromentType;
}
export interface RestaurantConfirmInfoResponse {
  isFree: boolean;
  image: string;
}
export interface RestaurantDescriptionInfoResponse {
  descriptionPageImg: string;
  name: string;
  type: string;
  tags: string[];
  shortDescription: string;
  menuLink: string;
  alternativeBookingHours: BookTime[];
}
export interface SearchQParams {
  dateString: SearchQParam;
  date: SearchQParam;
  people: SearchQParam;
  hour: SearchQParam;
  name?: SearchQParam;
}

export interface HistoryPush {
  dateString?: SearchQParam;
  people?: SearchQParam;
  hour?: SearchQParam;
  name?: SearchQParam;
  date?: SearchQParam;
  pathname?: Routes;
  searchQuery?: string;
  state?: any;
}
