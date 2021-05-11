import { BookTime, bookTimeFromJson } from "../../../core/Entities";
import RestaurantOrPubRepository from "../../../domain/repository/RestaurantPubRepository";
import React from "react";
import { AxiosError } from "axios";
export class RestaurantDescriptionPageFunctions {
  restaurantOrPubRepository: RestaurantOrPubRepository;
  bookTime: BookTime;
  name: string;
  setInformation: React.Dispatch<any>;
  information: any;
  setError: React.Dispatch<any>;
  error: any;
  setPending: React.Dispatch<any>;
  pending: boolean;
  mappingAltBookingHoursToBookTimeComponents;
  constructor(
    bookTime: BookTime,
    name: string,
    setInformation: React.Dispatch<any>,
    information: any,
    setError: React.Dispatch<any>,
    error: any,
    setPending: React.Dispatch<any>,
    pending: boolean
  ) {
    this.restaurantOrPubRepository = new RestaurantOrPubRepository();
    this.bookTime = bookTime;
    this.name = name;
    this.setInformation = setInformation;
    this.information = information;
    this.setError = setError;
    this.error = error;
    this.setPending = setPending;
    this.pending = pending;
    this.mappingAltBookingHoursToBookTimeComponents = this.information?.alternativeBookingHours.map(
      (bt: any) => bookTimeFromJson(bt)
    );
  }

  manageState = () => {
    //Calls api for data
    this.restaurantOrPubRepository
      .getRestaurantInfoDescriptionPage(this.name, this.bookTime)
      .then((res) => {
        this.setInformation(res)
        this.setPending(false);
      })
      .catch((err: AxiosError) => {
        this.setError(err);
        this.setPending(false)
      });
  };

}
