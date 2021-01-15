import React, { ChangeEvent, useEffect, useState } from "react";
import LocationInput from "../../components/LocationInput/LocationInput";
import "./LandingPage.css";
import { ReactCalendar } from "../../components/Calendar/Calendar";

import SearchButton from "../../components/SearchButton/SearchButton";

import { useDispatch, useSelector } from "react-redux";
import {
  updateDate,
  updateHour,
  updatePeopleCount,
} from "../../../stateManagment/action";
import TimePicker from "../../components/TimePicker/TimePicker";
import PeopleAmountPicker from "../../components/PeopleAmountPicker/PeopleAmountPicker";
export const LandingPage: React.FC = () => {
  //Redux hooks
  const dispatcher: any = useSelector((state) => state);
  const dispatch = useDispatch();

  //UseState Hooks
  const [address, setAddress] = useState<string>("");
  const [value, onChange] = useState<Date>(dispatcher.date);
  useEffect(() => {
    dispatch(updateDate(value));
  }, [value]);

  return (
    <div>
      <div className="heading">Znajdź swój stolik</div>
      <div className="subHeading">
        Wpisz datę, godzinę, liczbę osób oraz opcjonalnie adres.
      </div>

      <div className="flex-box">
        <ReactCalendar
          value={dispatcher.date}
          onChange={onChange}
        ></ReactCalendar>
        <PeopleAmountPicker
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            dispatch(updatePeopleCount(+e.currentTarget.value.slice(3, 5)));
          }}
        ></PeopleAmountPicker>
        <TimePicker
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            dispatch(updateHour(e.currentTarget.value.slice(3)));
          }}
          date={dispatcher.date}
        ></TimePicker>

        <LocationInput
          address={address}
          setAddress={setAddress}
        ></LocationInput>
      </div>
      <SearchButton></SearchButton>
    </div>
  );
};
