import React from "react";
import { ReactComponent as MenuIcon } from "../../../../../images/arrowDown.svg";
import { ReactCalendar } from "../../../../components/CalendarAndLocation/Calendar/Calendar";
import "./SearchBar.scss";
import {
  PeopleAmountPicker,
  SearchButton,
  TimePicker,
} from "../../../../components";

interface SearchBarProps {
  getRoPArr?: () => void;
}

export default function SearchBar({ getRoPArr }: SearchBarProps) {
  return (
    <aside className="searchbar">
      <ul className="searchbar__list">
        <li className="searchbar__list__input">
          <ReactCalendar />
        </li>
        <li className="searchbar__list__input">
          <PeopleAmountPicker />
        </li>
        <li className="searchbar__list__input">
          <TimePicker />
        </li>

        <li className="searchbar__list__search">
          <SearchButton
            onPressed={getRoPArr}
            additionalClassName="searchbar__list__search__button"
          />
        </li>
      </ul>
      <label className="searchbar__iconContainer" htmlFor="check">
        <MenuIcon className="searchbar__iconContainer__icon" />
      </label>
    </aside>
  );
}
