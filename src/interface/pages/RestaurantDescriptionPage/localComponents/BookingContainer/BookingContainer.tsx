import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { BookTime, bookTimeFromJson } from "../../../../../core/Entities";
import {
  updateDate,
  updateHour,
  updatePeopleCount,
} from "../../../../../stateManagment/action";
import {
  PeopleAmountPicker,
  ReactCalendar,
  TimePicker,
} from "../../../../components";
import { BookingHoursComponent } from "../../../RestaurantPubsArrPage/localComponents/RestaurantPubComponent/RestaurantPubComponent";
import "./BookingContainer.css";
import queryString from "querystring";
import RestaurantOrPubRepository from "../../../../../domain/repository/RestaurantPubRepository";
import {
  useBookTimeAndNameSearchParams,
  useLocationDescriptionPage,
} from "../../../../../core/Helper/SearchQuery/useBookTimeSearchParams";
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

  //Redux hooks
  const dispatch = useDispatch();
  // const { date, hour }: any = useSelector((state) => state);
  let restaurantOrPubRepository = new RestaurantOrPubRepository();
  const [altBookTimes, setAltBookTimes] = useState(alternativeBookingHours);
  const { bookTime, dt, name } = useBookTimeAndNameSearchParams();
  const { dateString, hour, people } = useLocationDescriptionPage();

  useEffect(() => {
    if (!alternativeBookingHours) {
      restaurantOrPubRepository
        .getRoPAlternativeBookingHours(name.toString(), bookTime)
        .then((res: any) => bookTimeFromJson(res));
    }
  });

  let history = useHistory();

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
        <ReactCalendar
          onChange={() => {
            setReloadBookingArr(true);
          }}
        />
      </div>
      <div className="placeOrderSubHeading">
        <b style={{ padding: "5px" }}>Godzina</b>
      </div>

      <TimePicker
        date={dt}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          let currentHour = e.currentTarget.value.slice(3);
          dispatch(updateHour(e.currentTarget.value.slice(3)));
          setReloadBookingArr(true);
          history.push({
            search: `?&dateString=${dateString}&hour=${currentHour}&people=${people}&name=${name}`,
          });
        }}
      />
      <div className="placeOrderSubHeading">
        <b style={{ padding: "5px" }}>Ilość osób</b>
      </div>
      <PeopleAmountPicker
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          let peopleCount = +e.currentTarget.value.slice(3, 5);
          dispatch(updatePeopleCount(peopleCount));
          setReloadBookingArr(true);
          history.push({
            search: `?&dateString=${dateString}&hour=${hour}&people=${peopleCount}&name=${name}`,
          });
        }}
        people={+people}
      />
      <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
        {reloadBookingArr ? (
          <button
            onClick={() => {
              setReloadBookingArr(!reloadBookingArr);

              restaurantOrPubRepository
                .getRoPAlternativeBookingHours(name.toString(), bookTime)
                .then((res) => {
                  let bookTimesMapped = res.map((bt) => bookTimeFromJson(bt));
                  setAltBookTimes(bookTimesMapped);
                });
            }}
          >
            Reload
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
  );
}
