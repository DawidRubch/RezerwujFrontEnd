import React from "react";
import "./LandingPage.scss";
import image from "../../../images/Image 7.png";
import HowToBookPage from "./localPages/HowToBookPage";
import { ReactCalendar } from "../../components/CalendarAndLocation/Calendar/Calendar";
import { TimePicker } from "../../components/TimeAndPeople/TimePicker/TimePicker";

import { PeopleAmountPicker } from "../../components/TimeAndPeople/PeoplePicker/PeopleAmountPicker";
import { SearchButton } from "../../components/SearchButton/SearchButton";

export const LandingPage: React.FC = () => {
  return (
    <>
      <div className="mainPageContainer">
        <main className="pickingBookTimeContainer">
          <h1 className="logo">REZERWUJ</h1>

          <header className="headingAndSubHeadingContainer">
            <div className="bgImage" />

            <h2 className="heading">Znajdź swój stolik</h2>
            <h6 className="mainPageSubHeading">
              Wpisz datę, godzinę, liczbę osób i znajdź stolik w swoim ulubionym
              miejscu.
            </h6>
          </header>

          <div className="pickingContainer">
            <div className="inputContainer--landing">
              <ReactCalendar />
            </div>
            <div className="inputContainer--landing">
              <TimePicker />
            </div>

            <div className="inputContainer--landing">
              <PeopleAmountPicker />
            </div>
          </div>
          <div className="searchButtonContainer--landing">
            <SearchButton additionalClassName="searchButton--landing" />
          </div>
        </main>
        <div className="mainPageImageContainer">
          <img src={image} alt="Restaurant" />
        </div>
      </div>
      <HowToBookPage />
    </>
  );
};
