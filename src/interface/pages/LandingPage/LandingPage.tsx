import React, { useState } from "react";
import "./LandingPage.scss";
import image from "../../../images/Image 7.png";
import { HowToBookPage } from "./localPages";
import { SearchButton, SearchInput } from "interface/components";
import { LocationPicker } from "interface/components/LocationPicker/LocationPicker";

export const LandingPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
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
              <LocationPicker />
            </div>
            <div className="inputContainer--landing">
              <SearchInput value={searchValue} onChange={onChange} />
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
