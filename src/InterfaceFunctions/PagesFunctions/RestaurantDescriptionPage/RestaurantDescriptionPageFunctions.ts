import { BookTime, bookTimeFromJson } from "../../../core/Entities";
import RestaurantOrPubRepository from "../../../domain/repository/RestaurantPubRepository";
import React from "react";
export class RestaurantDescriptionPageFunctions {
  state: any;
  restaurantOrPubRepository: RestaurantOrPubRepository;
  bookTime: BookTime;
  name: string;
  setInformation: React.Dispatch<any>;
  information: any;
  mappingAltBookingHoursToBookTimeComponents;
  constructor(
    state: any,
    bookTime: BookTime,
    name: string,
    setInformation: React.Dispatch<any>,
    information: any
  ) {
    this.state = state;
    this.restaurantOrPubRepository = new RestaurantOrPubRepository();
    this.bookTime = bookTime;
    this.name = name;
    this.setInformation = setInformation;
    this.information = information;
    this.mappingAltBookingHoursToBookTimeComponents = this.information?.alternativeBookingHours.map(
      (bt: any) => bookTimeFromJson(bt)
    );
  }

  //Takes state from local storage, if it doesnt exists call api for data
  manageState = () => {
    let localStorageKey = "RoP";

    //Saves the state to localStorage if it exists
    if (this.state) {
      let JSONStringifiedState = JSON.stringify(this.state);
      localStorage.setItem(localStorageKey, JSONStringifiedState);
      this.setInformation(this.state);
    }

    //Gets item from the localStorage if it doesnt exists or calls api for data
    if (!this.state) {
        
      let getItem = localStorage.getItem(localStorageKey);

      if (getItem) {
        this.state = JSON.parse(getItem);
        this.setInformation(this.state);
      } else {
        //Calls api for data if it doesnt receives data from local storage
        this.restaurantOrPubRepository
          .getRestaurantInfoDescriptionPage(this.name, this.bookTime)
          .then((res) => this.setInformation(res));
      }
    }
  };
}
