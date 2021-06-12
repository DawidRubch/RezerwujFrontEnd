import React, { useState } from "react";
import { BookTime, bookTimeFromJson } from "../../../../../core/Entities";
import {
  PeopleAmountPicker,
  ReactCalendar,
  TimePicker,
} from "../../../../components";
import "./BookingContainer.scss";
import RestaurantOrPubRepository from "../../../../../domain/repository/RestaurantPubRepository";
import { useBookTimeAndNameSearchParams } from "../../../../../core/Helper/SearchQuery/useBookTimeSearchParams";
import { BookingHoursComponent } from "../../../../components/BookingHoursArray/BookingHoursArr";
interface BookingContainerInterface {
  nameString: string | unknown;
  alternativeBookingHours: (BookTime | null | 0)[];
  state: any;
}

export function BookingContainer({
  alternativeBookingHours,
  state,
}: BookingContainerInterface) {
  //useState Hooks
  const [reloadBookingArr, setReloadBookingArr] = useState(false);

  let restaurantOrPubRepository = new RestaurantOrPubRepository();
  const [altBookTimes, setAltBookTimes] = useState(alternativeBookingHours);
  const { bookTime, name } = useBookTimeAndNameSearchParams();

  //get alt booking hours for new alt booking hours

  const getNewAltBookingHours = () => {
    setReloadBookingArr(!reloadBookingArr);

    restaurantOrPubRepository
      .getRoPAlternativeBookingHours(name, bookTime)
      .then((res) => {
        let bookTimesMapped = res.map((bt) => bookTimeFromJson(bt));
        setAltBookTimes(bookTimesMapped);
      });
  };

  console.log(state);

  const onChange = () => setReloadBookingArr(true);

  return (
    <div className="placeOrder">
      <div className="placeOrder__header">
        <b className="placeOrder__header__label">Złóż rezerwację w {name}</b>
      </div>
      <div className="placeOrder__innerContainer">
        <div className="placeOrder__innerContainer__param">
          <b className="placeOrder__innerContainer__param__label">Data</b>
        </div>
        <div className="placeOrder__innerContainer__inputContainer">
          <ReactCalendar onChange={onChange} />
        </div>
        <div className="placeOrder__innerContainer__param">
          <b className="placeOrder__innerContainer__param__label">Godzina</b>
        </div>
        <div className="placeOrder__innerContainer__inputContainer">
          <TimePicker onChange={onChange} />
        </div>
        <div className="placeOrder__innerContainer__param">
          <b className="placeOrder__innerContainer__param__label">Ilość osób</b>
        </div>
        <div className="placeOrder__innerContainer__inputContainer">
          <PeopleAmountPicker onChange={onChange} />
        </div>
        <div className="placeOrder__innerContainer__bookingHours">
          {reloadBookingArr ? (
            <button
              className="placeOrder__innerContainer__bookingHours__reloadButton"
              onClick={getNewAltBookingHours}
            >
              Odśwież
            </button>
          ) : (
            <BookingHoursComponent
              restaurantOrPub={state}
              type="universal"
              alternativeBookingHours={altBookTimes}
            />
          )}
        </div>
      </div>
    </div>
  );
}
