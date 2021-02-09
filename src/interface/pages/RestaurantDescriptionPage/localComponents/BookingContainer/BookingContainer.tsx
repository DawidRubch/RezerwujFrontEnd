import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
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

interface BookingContainerInterface {
  name: string;
  alternativeBookingHours: BookTime[];
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

  useEffect(() => {
    dispatch(updateDate(value));
  }, [value]);

  //Redux hooks
  const dispatch = useDispatch();
  const { date }: any = useSelector((state) => state);

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
        <ReactCalendar value={date} onChange={onChange} />
      </div>
      <div className="placeOrderSubHeading">
        <b style={{ padding: "5px" }}>Godzina</b>
      </div>

      <PeopleAmountPicker
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          dispatch(updatePeopleCount(+e.currentTarget.value.slice(3, 5)));
          setReloadBookingArr(true);
        }}
        people={2}
      ></PeopleAmountPicker>

      <div className="placeOrderSubHeading">
        <b style={{ padding: "5px" }}>Ilość osób</b>
      </div>
      <TimePicker
        date={date}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          dispatch(updateHour(e.currentTarget.value.slice(3)));
          setReloadBookingArr(true);
        }}
      ></TimePicker>
      <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
        {reloadBookingArr ? (
          <button
            onClick={() => {
              setReloadBookingArr(!reloadBookingArr);
            }}
          >
            Reload
          </button>
        ) : (
          <BookingHoursComponent
            state={state}
            type="universal"
            alternativeBookingHours={alternativeBookingHours}
          />
        )}
      </div>
    </div>
  );
}
