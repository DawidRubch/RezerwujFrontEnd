import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RestaurantDescriptionPage.css";
import { RestaurantOrPub } from "../../../core/Entities";
import {
  updateDate,
  updateHour,
  updatePeopleCount,
} from "../../../stateManagment/action";

import { ReactCalendar } from "../../components/Calendar/Calendar";

import PeopleAmountPicker from "../../components/PeopleAmountPicker/PeopleAmountPicker";
import { BookingHoursComponent } from "../../components/RestaurantPubComponent/RestaurantPubComponent";
import TimePicker from "../../components/TimePicker/TimePicker";

export default function RestaurantDescriptionPage(props: any) {
  let state: RestaurantOrPub = props.location.state;
  const dispatcher: any = useSelector((state) => state);
  const dispatch = useDispatch();
  const [
    reloadAlternativeBookingArr,
    setReloadAlternativeBookingArr,
  ] = useState(false);

  const [value, onChange] = useState(new Date());
  useEffect(() => {
    dispatch(updateDate(value));
  }, [value]);

  useEffect(() => {
    if (state) {
      localStorage.setItem("RoP", JSON.stringify(state));
    }
  }, []);

  if (!state) {
    let getItem = localStorage.getItem("RoP");
    if (getItem) {
      state = JSON.parse(getItem);
    }
  }

  return (
    <div style={{ marginTop: "0.5em", borderRadius: "15px" }}>
      <div className="imgContainer">
        <img
          style={{ height: "auto", width: "100%", borderRadius: "10px" }}
          src={state.descriptionPageImg}
        ></img>
      </div>
      7
      <div className="mainContainer">
        <div className="restaurantContainer">
          <div className="restaurantName">{state.name}</div>
          <div style={{ fontWeight: "bold", marginLeft: "10px" }}>
            {state.type}
          </div>
          <div className="tagContainer">
            {state.tags.map((tag) => {
              return <div className="tag">{tag}</div>;
            })}
          </div>
          <hr className="restaurantContainerhr" />
          <div className="shortDescription">{state.shortDescription}</div>
          <hr className="restaurantContainerhr" />
          <div className="restaurantMenuLink">
            Zobacz menu restauracji na stronie
          </div>
        </div>
        <div className="placeOrderContainer">
          <div className="placeOrderHeading">
            <b style={{ padding: "5px", fontSize: "25px" }}>
              Złóż rezerwacje w {state.name}
            </b>
          </div>
          <hr className="placeOrderhr" />
          <div className="placeOrderSubHeading">
            <b style={{ padding: "5px" }}>Data</b>
          </div>
          <div style={{ margin: "auto" }}>
            <ReactCalendar
              value={dispatcher.date}
              onChange={onChange}
            ></ReactCalendar>
          </div>
          <div className="placeOrderSubHeading">
            <b style={{ padding: "5px" }}>Godzina</b>
          </div>

          <PeopleAmountPicker
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              dispatch(updatePeopleCount(+e.currentTarget.value.slice(3, 5)));
              setReloadAlternativeBookingArr(true);
            }}
          ></PeopleAmountPicker>

          <div className="placeOrderSubHeading">
            <b style={{ padding: "5px" }}>Ilość osób</b>
          </div>
          <TimePicker
            date={dispatcher.date}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              dispatch(updateHour(e.currentTarget.value.slice(3)));
              setReloadAlternativeBookingArr(true);
            }}
          ></TimePicker>
          <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
            {reloadAlternativeBookingArr ? (
              <button
                onClick={() => {
                  setReloadAlternativeBookingArr(!reloadAlternativeBookingArr);
                }}
              >
                Reload
              </button>
            ) : (
              <BookingHoursComponent
                type="universal"
                alternativeBookingHours={state.alternativeBookingHours}
              ></BookingHoursComponent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
