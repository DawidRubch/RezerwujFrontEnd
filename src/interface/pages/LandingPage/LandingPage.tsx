import React from "react";
import "./LandingPage.css";
import image from "../../../images/Image 7.png";
import {
  LocationInput,
  PeopleAmountPicker,
  ReactCalendar,
  SearchButton,
  TimePicker,
} from "../../components";

import HowToBookPage from "./localPages/HowToBookPage";

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
