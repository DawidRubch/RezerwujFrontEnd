import React, { ChangeEvent, useEffect, useState } from "react";

import "./LandingPage.css";
import image from "../../../images/Image 7.png";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDate,
  updateHour,
  updatePeopleCount,
} from "../../../stateManagment/action";

import { mapPropToSearchQuery } from "../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";
import {
  LocationInput,
  PeopleAmountPicker,
  ReactCalendar,
  SearchButton,
  TimePicker,
} from "../../components";
import { useGlobalVariables } from "../../../core/Helper/ReduxCustomHooks/useGlobalVariables";
import { useHistory } from "react-router-dom";
import { StepToMakeReservation } from "./localComponents/StepToMakeReservation";
import { ReactComponent as EnterIcon } from "../../../images/enter.svg";
import { ReactComponent as ListIcon } from "../../../images/choices.svg";
import { ReactComponent as RestaurantIcon } from "../../../images/restaurant.svg";
import { ReactComponent as TwoPeopleAtRestaurantVector } from "../../../images/PeopleAtRestaurant.svg";
export const LandingPage: React.FC = () => {
  const history = useHistory();
  //Redux hooks
  const { hour, location, people, date } = useGlobalVariables();
  const dispatch = useDispatch();
  //UseState Hooks

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ width: "50vw" }}>
          <div
            style={{
              textAlign: "left",
              marginLeft: "70px",
              color: "#E54949",
              fontSize: "40px",
              marginTop: "10px",
              fontWeight: "lighter",
            }}
          >
            REZERWUJ
          </div>
          <div className="heading">Znajdź swój stolik</div>
          <div className="subHeading">
            Wpisz datę, godzinę, liczbę osób i znajdź stolik w swoim wymarzonym
            miejscu.
          </div>

          <div className="flex-box">
            <ReactCalendar />
            <TimePicker
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                let currentHourVal = e.currentTarget.value.slice(3);
                dispatch(updateHour(currentHourVal));
                history.push({
                  search: mapPropToSearchQuery(
                    location,
                    date.toString(),
                    currentHourVal,
                    people.toString()
                  ),
                });
              }}
              date={date}
            />

            <LocationInput />
            <PeopleAmountPicker
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                let currentPeopleVal = e.currentTarget.value.slice(3, 5);
                dispatch(updatePeopleCount(+currentPeopleVal));
                history.push({
                  search: mapPropToSearchQuery(
                    location,
                    date.toString(),
                    hour,
                    currentPeopleVal
                  ),
                });
              }}
              people={people}
            />
          </div>
          <div style={{ marginTop: "15vh" }}>
            <SearchButton
              searchParams={mapPropToSearchQuery(
                location,
                date.toString(),
                hour,
                people.toString()
              )}
            />
          </div>
        </div>
        <div style={{ overflow: "hidden", width: "50vw" }}>
          <img style={{ height: "100vh", width: "auto" }} src={image} />
        </div>
      </div>
      <div style={{ backgroundColor: "white" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "0px",
            flexDirection: "column",
          }}
        >
          <div style={{ marginTop: "20px", fontSize: "25px" }}>
            <div>Jak to działa?</div>
          </div>
          <b
            style={{
              fontSize: "35px",
              marginTop: "25px",
              color: "#E54949",
              wordWrap: "break-word",
              width: "650px",
              textAlign: "center",
            }}
          >
            Od zarezerwowania stolika dzielą cie 3 kroki!
          </b>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <StepToMakeReservation
              SVG={EnterIcon}
              inputText="Wpisz datę, godzinę, liczbę osób. Opcjonalnie adres. Obecnie działamy
        tylko na terenie Szczecina!"
            />
            <StepToMakeReservation
              SVG={ListIcon}
              inputText="Z listy miejsc wybierz te najbardziej odpowiednie i najlepiej pasujący dla ciebie termin!"
            />
            <StepToMakeReservation
              SVG={RestaurantIcon}
              inputText="Potwierdź swoje zamówienie i ciesz się przyjemnie spędzonym czasem!"
            />
          </div>
          <TwoPeopleAtRestaurantVector
            style={{ height: "600px", width: "6000px" }}
          />
        </div>
      </div>
    </div>
  );
};
