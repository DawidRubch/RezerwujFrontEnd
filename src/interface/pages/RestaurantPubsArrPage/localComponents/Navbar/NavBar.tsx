import React from "react";
import { ReactComponent as MenuIcon } from "../../../../../images/arrowDown.svg";
import { ReactCalendar } from "../../../../components/CalendarAndLocation/Calendar/Calendar";
import "./NavBar.scss";
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
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__list__input">
          <ReactCalendar />
        </li>
        <li className="navbar__list__input">
          <PeopleAmountPicker />
        </li>
        <li className="navbar__list__input">
          <TimePicker />
        </li>
        <li className="navbar__list__input">
          <LocationInput />
        </li>
        <li className="navbar__list__search">
          <SearchButton
            onPressed={getRoPArr}
            additionalClassName="navbar__list__search__button"
          />
        </li>
      </ul>
      <label className="navbar__iconContainer" htmlFor="check">
        <MenuIcon className="navbar__iconContainer__icon" />
      </label>
    </nav>
  );
}
