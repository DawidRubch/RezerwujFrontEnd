import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RestaurantDescriptionPage.css";
import {
  updateDate,
  updateHour,
  updatePeopleCount,
} from "../../../stateManagment/action";

import { BookingHoursComponent } from "../RestaurantPubsArrPage/localComponents/RestaurantPubComponent/RestaurantPubComponent";
import { useLocation } from "react-router-dom";
import {
  PeopleAmountPicker,
  ReactCalendar,
  TimePicker,
} from "../../components";
import { BookingContainer } from "./localComponents/BookingContainer/BookingContainer";
import { BookTime } from "../../../core/Entities";

export default function RestaurantDescriptionPage() {
  let state: any = useLocation().state;

  useEffect(() => {
    if (state) {
      localStorage.setItem("RoP", JSON.stringify(state));
    }
  }, []);

  if (!state) {
    let getItem = localStorage.getItem("RoP");
    if (getItem) {
      state = JSON.parse(getItem);
      console.log(state);
    }
  }

  return (
    <div style={{ marginTop: "0.5em", borderRadius: "15px" }}>
      <div className="imgContainer">
        <img
          style={{ height: "auto", width: "100%", borderRadius: "10px" }}
          src={state.descriptionPageImg}
        />
      </div>
      <div className="mainContainer">
        <div className="restaurantContainer">
          <div className="restaurantName">{state.name}</div>
          <div style={{ fontWeight: "bold", marginLeft: "10px" }}>
            {state.type}
          </div>
          <div className="tagContainer">
            {state.tags.map((tag: any) => {
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
        <BookingContainer
          state={state}
          alternativeBookingHours={state.alternativeBookingHours}
          name={state.name}
        />
      </div>
    </div>
  );
}
