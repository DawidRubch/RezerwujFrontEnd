import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { BookTime } from "../../../../../core/Entities";
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
interface BookingContainerInterface {
  name: string;
  alternativeBookingHours: (BookTime | null)[];
  state: any;
}

export function BookingContainer({
  name,
  alternativeBookingHours,
  state,
}: BookingContainerInterface) {
  //useState Hooks
  const [reloadBookingArr, setReloadBookingArr] = useState(false);
  const [value, onChange] = useState(new Date());
  const location = useLocation();
  useEffect(() => {
    dispatch(updateDate(value));
  }, [value]);

  //Redux hooks
  const dispatch = useDispatch();
  // const { date, hour }: any = useSelector((state) => state);
  const { people, hour, dateString } = queryString.parse(location.search);
  let restaurantOrPubRepository = new RestaurantOrPubRepository();
  const [altBookTimes, setAltBookTimes] = useState(alternativeBookingHours);
  console.log(people, hour, dateString);
  let bt = new BookTime(
    +hour.toString().split(":")[1],
    +hour.toString().split(":")[0],
    +dateString.toString().split(".")[0],
    +dateString.toString().split(".")[1],
    +dateString.toString().split(".")[2],
    +people
  );
  let history = useHistory();
  let dt = new Date();
  dt.setFullYear(+dateString.toString().split(".")[2]);
  dt.setMonth(+dateString.toString().split(".")[1]);
  dt.setDate(+dateString.toString().split(".")[0]);

  useEffect(() => {
    restaurantOrPubRepository
      .getRoPAlternativeBookingHours(name, bt)
      .then((res) => {
        console.log("called");
        let bookTimesMapped = res.map((bt) => {
          if (bt === null) {
            return null;
          }
          return new BookTime(
            bt.minute,
            bt.hour,
            bt.day,
            bt.month,
            bt.year,
            bt.people
          );
        });

        setAltBookTimes(bookTimesMapped);
      });
  },[]);

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
          value={dt}
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
                .getRoPAlternativeBookingHours(name, bt)
                .then((res) => {
                  let bookTimesMapped = res.map((bt) => {
                    if (bt === null) {
                      return null;
                    }
                    return new BookTime(
                      bt.minute,
                      bt.hour,
                      bt.day,
                      bt.month,
                      bt.year,
                      bt.people
                    );
                  });
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
