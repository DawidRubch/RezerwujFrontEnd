import React, { ChangeEvent, useEffect, useState } from "react";
import { ReactComponent as MenuIcon } from "../../../../../images/menu.svg";
import { ReactCalendar } from "../../../../components/CalendarAndLocation/Calendar/Calendar";

import "./NavBar.css";

import { useDispatch, useSelector } from "react-redux";
import {
  updateDate,
  updateHour,
  updateLocation,
  updatePeopleCount,
} from "../../../../../stateManagment/action";
import { useHistory } from "react-router";
import { useSearchParams } from "../../../../../core/Helper/SearchQuery/useSearchParams";
import { mapPropToSearchQuery } from "../../../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";
import {
  LocationInput,
  PeopleAmountPicker,
  SearchButton,
  TimePicker,
} from "../../../../components";
interface NavBarProps {
  onChange: any;
}

export default function NavBar({ onChange }: NavBarProps) {
  const dispatch = useDispatch();
  const history = useHistory();
  let { dateParam, peopleParam } = useSearchParams();
  let { hour, location, people, date }: any = useSelector((state) => state);

  return (
    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <MenuIcon className="menuIcon" />
      </label>
      <ul>
        <li>
          <ReactCalendar onChange={onChange} />
        </li>
        <li>
          <PeopleAmountPicker
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              let currentPeopleVal = e.currentTarget.value.slice(3, 5);
              dispatch(updatePeopleCount(+currentPeopleVal));
            }}
            people={peopleParam}
          />
        </li>
        <li>
          <TimePicker
            date={dateParam}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              let currentHourVal = e.currentTarget.value.slice(3);

              dispatch(updateHour(currentHourVal));
            }}
          />
        </li>
        <li>
          <LocationInput />
        </li>
        <li>
          <div style={{ margin: "30px" }}>
            <SearchButton
              searchParams={mapPropToSearchQuery(location, date, hour, people)}
              onPressed={() => {
                history.push({
                  search: mapPropToSearchQuery(location, date, hour, people),
                });
                history.go(0);
              }}
            />
          </div>
        </li>
      </ul>
    </nav>
  );
}
