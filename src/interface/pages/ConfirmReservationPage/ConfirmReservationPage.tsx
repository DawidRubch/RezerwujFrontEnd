import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { InformationInput } from "./localComponents/InformationInput/InformationInput";
import { SmallBookingInfo } from "./localComponents/SmallBookingInfo/SmallBookingInfo";
import "./ConfirmReservationPage.css";
import { ReactComponent as CalendarIcon } from "../../../images/calendar.svg";
import { ReactComponent as PeopleIcon } from "../../../images/group.svg";
import { ReactComponent as ClockIcon } from "../../../images/clock.svg";
import { AdditionalRestaurantInfo } from "./localComponents/AdditionalRestaurantInfo/AdditionalRestaurantInfo";
import RestaurantOrPubRepository from "../../../domain/repository/RestaurantPubRepository";
import { BookTime } from "../../../core/Entities";
import { PeopleArr } from "../../../core/ImportantVariables/variables";
import queryString from "querystring";
export function ConfirmReservationPage(): JSX.Element {
  //Dać tutaj typ na RestaurantOrPub
  const { state, search }: any = useLocation();
  const { hour, minute, day, month, year, people, name } = queryString.parse(
    search
  );

  const [locationState, setLocationState] = useState(state || {});
  let restaurantOrPubRepository = new RestaurantOrPubRepository();
  const [nameInput, setNameInput] = useState<string | undefined>();
  const [surNameInput, setSurNameInput] = useState<string | undefined>();
  const [numberInput, setNumberInput] = useState<string | undefined>();
  const [emailInput, setEmailInput] = useState<string | undefined>();

  let bookTime = new BookTime(
    +minute.toString(),
    +hour.toString(),
    +day.toString(),
    +month.toString(),
    +year.toString(),
    +people.toString()
  );
  useEffect(() => {
    //Dzwonić do api

    if (!state) {
      console.log("Api call");
      restaurantOrPubRepository
        .getRestaurantInfoConfirmPage(name.toString(), bookTime)
        .then((res) => setLocationState(res));
    }
  }, []);
  console.log(locationState);

  return (
    <div className="main-container">
      <div style={{ margin: "40px", padding: "10px" }}>
        <div className="image-and-restaurant-info">
          <img
            className="restaurant-image"
            alt="Restaurant photo"
            src={locationState?.image || locationState.restaurantOrPub.image}
          />
          <div className="restaurant-name-and-info">
            <b className="restaurant-name">{name}</b>
            <SmallBookingInfo
              insideText={`${bookTime.day}.${bookTime.month}`}
              icon={<CalendarIcon />}
            />
            <SmallBookingInfo
              insideText={`${bookTime.hour}:${
                state.bookTime.minute === 0 ? "00" : "30"
              }`}
              icon={<ClockIcon />}
            />
            <SmallBookingInfo
              insideText={`${bookTime.people} ${
                PeopleArr[state.bookTime.people]
              }`}
              icon={<PeopleIcon />}
            />
          </div>
        </div>

        <div className="input-container">
          <InformationInput
            autoComplete={"first name"}
            name="fname"
            placeHolder={"Imie"}
            onChange={setNameInput}
            value={nameInput}
          />
          <InformationInput
            autoComplete={"last name"}
            name="lname"
            placeHolder={"Nazwisko"}
            onChange={setSurNameInput}
            value={surNameInput}
          />
          <InformationInput
            autoComplete="tel"
            name="phone"
            placeHolder={"Numer"}
            onChange={setNumberInput}
            value={numberInput}
          />
          <InformationInput
            autoComplete="email"
            name="email"
            placeHolder={"Email"}
            onChange={setEmailInput}
            value={emailInput}
          />
        </div>
        <button
          onClick={() => {
            restaurantOrPubRepository.saveBookTime(
              bookTime,
              name.toString(),
              numberInput as string,
              nameInput as string,
              surNameInput as string,
              emailInput
            );
            alert(
              `Udało się zamówiłeś stolik dla ${bookTime.people} ${
                PeopleArr[bookTime.people]
              }.\nDnia ${bookTime.day}.${
                bookTime.month < 10 ? "0" + bookTime.month : bookTime.month
              } o godzinie ${bookTime.hour}:${
                bookTime.minute === 0 ? "00" : "30"
              }.`
            );
          }}
          className="confirm-reservation-button"
        >
          Potwierdz rezerwacje
        </button>
      </div>

      <AdditionalRestaurantInfo />
    </div>
  );
}
