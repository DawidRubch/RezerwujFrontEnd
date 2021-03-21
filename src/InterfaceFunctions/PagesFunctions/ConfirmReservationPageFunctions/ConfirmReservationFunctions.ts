import { BookTime } from "../../../core/Entities";
import { PeopleArr } from "../../../core/ImportantVariables/variables";
import RestaurantOrPubRepository from "../../../domain/repository/RestaurantPubRepository";

export default class ConfirmReservationFunctions {
  //Variable initialization
  bookTime: BookTime;
  peopleArr: string[];
  textInsideCalendarBookingInfo: string;
  textInsideHourBookingInfo: string;
  textInsidePeopleBookingInfo: string;
  restaurantPubRepository: RestaurantOrPubRepository;

  constructor(bookTime: BookTime) {
    //BookTimeComponents
    this.bookTime = bookTime;

    //RestaurantOrPubRepository with
    this.restaurantPubRepository = new RestaurantOrPubRepository();

    //People array is array of strings, which are properly conjugated
    this.peopleArr = PeopleArr;

    //Text next to calendar icon
    this.textInsideCalendarBookingInfo = `${this.bookTime.day}.${
      bookTime.month < 10 ? "0" + bookTime.month : bookTime.month
    }`;

    //Text next to clock icon
    this.textInsideHourBookingInfo = `${bookTime.hour}:${
      bookTime.minute === 0 ? "00" : "30"
    }`;

    //Text next to people icon
    this.textInsidePeopleBookingInfo = `${bookTime.people} ${
      PeopleArr[bookTime.people]
    }`;
  }

  //if it doesnt have state it calls api
  callsApiIfItDoesntHavePassedData = (
    state: any,
    name: string | string[],
    setLocationState: React.Dispatch<any>
  ) => {
    if (!state) {
      //Calls api and gets name of the restaurant and if the booktime is free
      this.restaurantPubRepository
        .getRestaurantInfoConfirmPage(name.toString(), this.bookTime)
        .then((res) => setLocationState(res));
    }
  };

  //Function called when confirm reservation button is pressed
  onClickConfirmReservation = (name: string | string[], inputObject: any) => {
    let { numberInput, nameInput, surNameInput, emailInput } = inputObject;

    //Saving book time to database
    this.restaurantPubRepository.saveBookTime(
      this.bookTime,
      name.toString(),
      numberInput as string,
      nameInput as string,
      surNameInput as string,
      emailInput
    );

    //Text saying that you managed to book a table
    const uManagedToBookTheTableText = `Udało się zamówiłeś stolik dla ${
      this.bookTime.people
    } ${PeopleArr[this.bookTime.people]}`;

    //Text saying the date you booked your table for
    const reservationTimeText = `.\nDnia ${this.bookTime.day}.${
      this.bookTime.month < 10 ? "0" + this.bookTime.month : this.bookTime.month
    } o godzinie ${this.bookTime.hour}:${
      this.bookTime.minute === 0 ? "00" : "30"
    }.`;
    
    const textToAlert = uManagedToBookTheTableText + reservationTimeText;

    alert(textToAlert);
  };
}