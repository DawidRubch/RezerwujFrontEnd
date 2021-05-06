import React from "react";
import "./LandingPage.scss";
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
              Wpisz datę, godzinę, liczbę osób i znajdź stolik w swoim ulubionym
              miejscu.
            </div>
          </div>

          <div className="pickingContainer">
            <div className="inputContainer--landing">
              <ReactCalendar />
            </div>
            <div className="inputContainer--landing">
              <TimePicker />
            </div>
            <div className="inputContainer--landing">
              <LocationInput />
            </div>
            <div className="inputContainer--landing">
              <PeopleAmountPicker />
            </div>
          </div>
          <div className="searchButtonContainer--landing">
            <SearchButton additionalClassName="searchButton--landing" />
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
