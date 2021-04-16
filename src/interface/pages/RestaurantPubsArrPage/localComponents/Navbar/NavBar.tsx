import React from "react";
import { ReactComponent as MenuIcon } from "../../../../../images/arrowDown.svg";
import { ReactCalendar } from "../../../../components/CalendarAndLocation/Calendar/Calendar";
import "./NavBar.css";
import { useHistory } from "react-router";
import {
  LocationInput,
  PeopleAmountPicker,
  SearchButton,
  TimePicker,
} from "../../../../components";

export default function NavBar() {
  const history = useHistory();

  //Search button onPress
  const onPressed = () => {
    //This function refreshes the page
    history.go(0);
  };

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
            onPressed={onPressed}
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
