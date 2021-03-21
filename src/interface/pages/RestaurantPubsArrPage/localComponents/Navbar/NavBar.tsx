import React from "react";
import { ReactComponent as MenuIcon } from "../../../../../images/menu.svg";
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
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <MenuIcon className="menuIcon" />
      </label>
      <ul>
        <li>
          <ReactCalendar />
        </li>
        <li>
          <PeopleAmountPicker />
        </li>
        <li>
          <TimePicker />
        </li>
        <li>
          <LocationInput />
        </li>
        <li>
          <div style={{ margin: "30px" }}>
            <SearchButton onPressed={onPressed} />
          </div>
        </li>
      </ul>
    </nav>
  );
}
