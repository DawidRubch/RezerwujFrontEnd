import React from "react";
import "./LandingPage.css";
import image from "../../../images/Image 7.png";
import HowToBookPage from "./localPages/HowToBookPage";
import { ReactCalendar } from "../../components/CalendarAndLocation/Calendar/Calendar";
import { TimePicker } from "../../components/TimeAndPeople/TimePicker/TimePicker";
import { LocationInput } from "../../components/CalendarAndLocation/LocationInput/LocationInput";
import { PeopleAmountPicker } from "../../components/TimeAndPeople/PeoplePicker/PeopleAmountPicker";
import { SearchButton } from "../../components/SearchButton/SearchButton";

export const LandingPage: React.FC = () => {
  return (
    <>
      <div className="mainPageContainer">
        <div className="pickingBookTimeContainer">
          <div className="logo">REZERWUJ</div>

          <div className="headingAndSubHeadingContainer">
            <div className="bgImage" />

            <div className="heading">Znajdź swój stolik</div>
            <div className="mainPageSubHeading">
              Wpisz datę, godzinę, liczbę osób i znajdź stolik w swoim
              wymarzonym miejscu.
            </div>
          </div>

          <div className="pickingContainer">
            <ReactCalendar />
            <TimePicker />
            <LocationInput />
            <PeopleAmountPicker />
          </div>
          <div className="searchButtonContainer">
            <SearchButton />
          </div>
        </div>
        <div className="mainPageImageContainer">
          <img src={image} alt="Restaurant" />
        </div>
      </div>
      <HowToBookPage />
    </>
  );
};
