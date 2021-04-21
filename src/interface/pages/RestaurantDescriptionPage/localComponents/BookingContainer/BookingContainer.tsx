import React, { useState } from "react";
import "./BookingContainer.css";
import { BookTime, bookTimeFromJson } from "../../../../../core/Entities";
import {
  PeopleAmountPicker,
  ReactCalendar,
  TimePicker,
} from "../../../../components";
import { BookingHoursComponent } from "../../../RestaurantPubsArrPage/localComponents/RestaurantPubComponent/RestaurantPubComponent";
import "./BookingContainer.css";
import RestaurantOrPubRepository from "../../../../../domain/repository/RestaurantPubRepository";
import { useBookTimeAndNameSearchParams } from "../../../../../core/Helper/SearchQuery/useBookTimeSearchParams";
interface BookingContainerInterface {
  nameString: string;
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

  const onChange = () => setReloadBookingArr(true);
  return (
    <div className="placeOrderContainer">
      <div className="placeOrderHeading">
        <b className="placeOrderHeadingLabel">Złóż rezerwację w {name}</b>
      </div>
      <div className="placeOrderContent">
        <div className="placeOrderSubHeading">
          <b className="placeOrderSubHeadingLabel">Data</b>
        </div>
        <div className="placeOrderInputContainer">
          <ReactCalendar onChange={onChange} />
        </div>

        <div className="placeOrderSubHeading">
          <b className="placeOrderSubHeadingLabel">Godzina</b>
        </div>
        <div className="placeOrderInputContainer">
          <TimePicker onChange={onChange} />
        </div>
        <div className="placeOrderSubHeading">
          <b className="placeOrderSubHeadingLabel">Ilość osób</b>
        </div>
        <div className="placeOrderInputContainer">
          <PeopleAmountPicker onChange={onChange} />
        </div>
        <div className="bookingHoursContainer">
          {reloadBookingArr ? (
            <button className="reloadButton" onClick={getNewAltBookingHours}>
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
