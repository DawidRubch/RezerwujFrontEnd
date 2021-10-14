import React, { useState } from "react";
import { BookTime, bookTimeFromJson } from "core";
import {
  PeopleAmountPicker,
  ReactCalendar,
  TimePicker,
} from "../../../../components";
import "./BookingContainer.scss";
import { BookingHoursComponent } from "../../../../components/BookingHoursArray/BookingHoursArr";
import { useSearchQuery } from "hooks";
import { RestaurantOrPubRepository } from "domain/index";
interface BookingContainerInterface {
  nameString: string | unknown;
  alternativeBookingHours: (BookTime | null | 0)[];
  state: any;
}
const restaurantOrPubRepository = new RestaurantOrPubRepository();

export function BookingContainer({
  alternativeBookingHours,
  state,
}: BookingContainerInterface) {
  //useState Hooks
  const [reloadBookingArr, setReloadBookingArr] = useState(false);

  const [altBookTimes, setAltBookTimes] = useState(alternativeBookingHours);
  const { bookTime, name } = useSearchQuery();

  //get alt booking hours for new alt booking hours
  const getNewAltBookingHours = () => {
    setReloadBookingArr(!reloadBookingArr);

    restaurantOrPubRepository
      .getRoPAlternativeBookingHours(name?.toString() ?? "", bookTime)
      .then((res) => {
        const bookTimesMapped = res.map((bt) => bookTimeFromJson(bt));

        setAltBookTimes(bookTimesMapped);
      });
  };

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
