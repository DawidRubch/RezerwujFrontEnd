import React, { ChangeEvent } from "react";
import { ReactComponent as MenuIcon } from "../../../images/menu.svg";
import { ReactCalendar } from "../Calendar/Calendar";
import LocationInput from "../LocationInput/LocationInput";
import SearchButton from "../SearchButton/SearchButton";
import "./NavBar.css";
import PeopleAmountPicker from "../PeopleAmountPicker/PeopleAmountPicker";
import TimePicker from "../TimePicker/TimePicker";
import { useDispatch, useSelector } from "react-redux";
import { updateHour, updatePeopleCount } from "../../../stateManagment/action";

interface NavBarProps {
  setAddress: any;
  onChange: any;
}

export default function NavBar(props: NavBarProps) {
  const dispatcher: any = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check" >
        <MenuIcon
          onClick={() => {
            console.log(dispatcher);
          }}
          className="menuIcon"
        ></MenuIcon>
      </label>
      <ul>
        <li>
          <div>
            <ReactCalendar
              value={dispatcher.date}
              onChange={props.onChange}
            ></ReactCalendar>
          </div>
        </li>
        <li>
          <PeopleAmountPicker
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              dispatch(updatePeopleCount(+e.currentTarget.value.slice(3, 5)));
            }}
          ></PeopleAmountPicker>
        </li>
        <li>
          <TimePicker
            date={dispatcher.date}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              dispatch(updateHour(e.currentTarget.value.slice(3)));
            }}
          ></TimePicker>
        </li>
        <li>
          <LocationInput
            address={dispatcher.location}
            setAddress={props.setAddress}
          ></LocationInput>
        </li>
        <li>
          <div style={{ margin: "30px" }}>
            <SearchButton onPressed={pageRefresh}></SearchButton>
          </div>
        </li>
      </ul>
    </nav>
  );
}

function pageRefresh() {
  window.location.reload(false);
}
