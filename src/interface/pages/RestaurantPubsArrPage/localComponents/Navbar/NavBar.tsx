import React from "react";
import { ReactComponent as MenuIcon } from "../../../../../images/arrowDown.svg";
import { ReactCalendar } from "../../../../components/CalendarAndLocation/Calendar/Calendar";
import "./NavBar.css";
import {
  LocationInput,
  PeopleAmountPicker,
  SearchButton,
  TimePicker,
} from "../../../../components";

interface NavBar {
  getRoPArr?: () => void;
}

export default function NavBar({ getRoPArr }: NavBar) {
  return (
    <nav>
      <ul>
        <li className="inputContainer--navbar">
          <ReactCalendar />
        </li>
        <li className="inputContainer--navbar">
          <PeopleAmountPicker />
        </li>
        <li className="inputContainer--navbar">
          <TimePicker />
        </li>
        <li className="inputContainer--navbar">
          <LocationInput />
        </li>
        <li className="searchButtonContainer--navbar">
          <SearchButton
            onPressed={getRoPArr}
            additionalClassName="searchButton--navbar"
          />
        </li>
      </ul>
      <label className="menuIconContainer" htmlFor="check">
        <MenuIcon className="menuIcon" />
      </label>
    </nav>
  );
}
