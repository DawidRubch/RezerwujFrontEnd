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
  alternativeBookingHours: (BookTime | null)[];
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
        console.log(res);
        let bookTimesMapped = res.map((bt) => bookTimeFromJson(bt));
        setAltBookTimes(bookTimesMapped);
      });
  };
  

  const onChange = () => setReloadBookingArr(true);
  return (
    <div className="placeOrderContainer">
      <div className="placeOrderHeading">
        <b style={{ padding: "5px", fontSize: "25px" }}>
          Złóż rezerwacje w {name}
        </b>
      </div>
      <hr className="placeOrderhr" />
      <div className="placeOrderSubHeading">
        <b style={{ padding: "5px" }}>Data</b>
      </div>
      <div style={{ margin: "auto" }}>
        <ReactCalendar onChange={onChange} />
      </div>
      <div className="placeOrderSubHeading">
        <b style={{ padding: "5px" }}>Godzina</b>
      </div>

      <TimePicker onChange={onChange} />
      <div className="placeOrderSubHeading">
        <b style={{ padding: "5px" }}>Ilość osób</b>
      </div>
      <PeopleAmountPicker onChange={onChange} />
      <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
        {reloadBookingArr ? (
          <button onClick={getNewAltBookingHours}>Reload</button>
        ) : (
          <BookingHoursComponent
            restaurantOrPub={state}
            type="universal"
            alternativeBookingHours={altBookTimes}
          />
        )}
      </div>
    </div>
  );
}
