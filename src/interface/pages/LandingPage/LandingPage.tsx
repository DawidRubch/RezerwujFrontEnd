import React, { ChangeEvent } from "react";

import "./LandingPage.css";
import image from "../../../images/Image 7.png";
import { useDispatch } from "react-redux";
import { updateHour, updatePeopleCount } from "../../../stateManagment/action";

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
import HowToBookPage from "./localPages/HowToBookPage";

export const LandingPage: React.FC = () => {
  //Redux hooks
  const { hour, location, people, date } = useGlobalVariables();
  const dispatch = useDispatch();

  let history = useHistory();

  return (
    <div>
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
            <TimePicker
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                let currentHourVal = e.currentTarget.value.slice(3);
                timeOrPersonChangingFunction(
                  history,
                  location,
                  date.toString(),
                  currentHourVal,
                  people.toString(),
                  dispatch,
                  updateHour(currentHourVal)
                );
              }}
              date={date}
            />

            <LocationInput />
            <PeopleAmountPicker
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                let currentPeopleVal = e.currentTarget.value.slice(3, 5);
                timeOrPersonChangingFunction(
                  history,
                  location,
                  date.toString(),
                  hour,
                  currentPeopleVal,
                  dispatch,
                  updatePeopleCount(+currentPeopleVal)
                );
              }}
              people={people}
            />
          </div>
          <div className="searchButtonContainer">
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
        <div className="mainPageImageContainer">
          <img src={image} alt="Restaurant" />
        </div>
      </div>
      <HowToBookPage />
    </div>
  );
};

function timeOrPersonChangingFunction(
  history: any,
  location: string,
  date: string,
  hour: string,
  people: string,
  dispatch: any,
  reducerFunction: any
): void {
  dispatch(reducerFunction);

  history.push({
    search: mapPropToSearchQuery(location, date, hour, people),
  });
}
