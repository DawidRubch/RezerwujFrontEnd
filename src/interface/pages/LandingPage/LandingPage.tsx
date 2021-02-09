import React, { ChangeEvent, useEffect, useState } from "react";

import "./LandingPage.css";

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
export const LandingPage: React.FC = () => {
  const history = useHistory();
  //Redux hooks
  const { hour, location, people, date } = useGlobalVariables();
  const dispatch = useDispatch();
  //UseState Hooks
  const [address, setAddress] = useState<string>("");
  const [value, onChange] = useState<Date>(date);

  return (
    <>
      <div className="heading">Znajdź swój stolik</div>
      <div className="subHeading">
        Wpisz datę, godzinę, liczbę osób oraz opcjonalnie adres.
      </div>

      <div className="flex-box">
        <ReactCalendar value={date} onChange={onChange} />
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
      </div>
      <SearchButton
        searchParams={mapPropToSearchQuery(
          location,
          date.toString(),
          hour,
          people.toString()
        )}
      />
    </>
  );
};
