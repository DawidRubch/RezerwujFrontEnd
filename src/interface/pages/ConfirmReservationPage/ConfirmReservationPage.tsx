import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RestaurantOrPub } from "../../../core/Entities";
import { InformationInput } from "./localComponents/InformationInput/InformationInput";
import { SmallBookingInfo } from "./localComponents/SmallBookingInfo/SmallBookingInfo";
import "./ConfirmReservationPage.css";
import { ReactComponent as CalendarIcon } from "../../../images/calendar.svg";
import { ReactComponent as PeopleIcon } from "../../../images/group.svg";
import { ReactComponent as ClockIcon } from "../../../images/clock.svg";

export function ConfirmReservationPage(): JSX.Element {
  //Dać tutaj typ na RestaurantOrPub
  const state: any = useLocation().state;
  const [locationState, setLocationState] = useState(state || {});
  useEffect(() => {
    if (!state) {
      setLocationState({
        image: "42",
        name: "",
      });
    }
  }, []);

  return (
    <div style={{ margin: "40px", padding: "10px" }}>
      <div style={{ display: "flex", padding: "10px 0" }}>
        <img
          className="restaurant-image"
          alt="Restaurant photo"
          src={locationState.image}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px 20px",
          }}
        >
          <b className="restaurant-name">{locationState.name}</b>
          <SmallBookingInfo insideText={"26.01"} icon={<CalendarIcon />} />
          <SmallBookingInfo insideText={"21:00"} icon={<ClockIcon />} />
          <SmallBookingInfo insideText={"3 osoby"} icon={<PeopleIcon />} />
        </div>
      </div>

      <div
        style={{
          width: "50vw",

          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "40px 10px",
          marginTop: "50px",
        }}
      >
        <InformationInput placeHolder={"Imie"} />
        <InformationInput placeHolder={"Nazwisko"} />
        <InformationInput placeHolder={"Numer"} />
        <InformationInput placeHolder={"Email"} />
      </div>
    </div>
  );
}
