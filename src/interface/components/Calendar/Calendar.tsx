import React, { useState } from "react";
import Calendar from "react-calendar";
import { CSSTransition } from "react-transition-group";

import { ReactComponent as CalendarIcon } from "../../../images/calendar.svg";
import { ReactComponent as ArrowDownIcon } from "../../../images/arrowDown.svg";
import "./Calendar.css";
import CalendarLocationContainer from "../CalendarLocationContainer/CalendarLocationContainer";


interface ReactCalendarProps {
  value: Date;
  onChange: any;
}

export const ReactCalendar = (props: ReactCalendarProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  return (
    <div>
      <CalendarLocationContainer
        styling={{ borderRadius: showCalendar ? "8px 8px 0 0" : "8px" }}
        className="menu-item calendar"
        leadingIcon={<CalendarIcon></CalendarIcon>}
        onClick={() => {
          setShowCalendar(!showCalendar);
        }}
      >
        <div className="icon-text">{props.value.toLocaleDateString()}</div>
        <span className="icon-right">
          <ArrowDownIcon></ArrowDownIcon>
        </span>
      </CalendarLocationContainer>
      <div style={{ position: "absolute", marginLeft: "-25px" }}>
        <CSSTransition in={showCalendar} unmountOnExit timeout={100}>
          <Calendar
            onClickDay={() => {
              setShowCalendar(!showCalendar);
            }}
            navigationLabel={(navigation) => {
              return (
                navigation.label.charAt(0).toUpperCase() +
                navigation.label.slice(1)
              );
            }}
            defaultView={"month"}
            view={"month"}
            minDate={new Date()}
            next2Label={null}
            prev2Label={null}
            locale="pl"
            onChange={props.onChange}
            value={props.value}
          ></Calendar>
        </CSSTransition>
      </div>
    </div>
  );
};
