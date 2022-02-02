import React, { useMemo, useState } from "react";
import Calendar, { Detail } from "react-calendar";
import moment from "moment";
import { CSSTransition } from "react-transition-group";
import { default as CalendarIcon } from "../../../../images/calendar.svg";
import "react-calendar/dist/Calendar.css";
import "./Calendar.scss";

import CalendarLocationContainer from "../CalendarLocationContainer/CalendarLocationContainer";
import { useCallback } from "react";
import { useSearchQuery, useUpdateSearchQuery } from "hooks";
import { changeDateStringToDate } from "utils";
import { trackEvent } from "services";
import { Action, Category } from "types/enums";

export const ReactCalendar = () => {
  //Boolean value to show Calendar
  const [showCalendar, setShowCalendar] = useState(false);

  const { date } = useSearchQuery();

  const dateParam = useMemo(
    () => changeDateStringToDate(date as string),
    [date]
  );

  const updateSearchParams = useUpdateSearchQuery();

  //Function changin boolean val of showCalendar
  const hideOrShowCalendar = useCallback(
    () => setShowCalendar(!showCalendar),
    [showCalendar]
  );

  //What shows on top of the calendar
  const navigationLabel = (navigation: {
    date: Date;
    view: Detail;
    label: string;
  }) => navigation.label.charAt(0).toUpperCase() + navigation.label.slice(1);

  //Function executes when the date in Calendar is changed
  const onChangeDate = (date: Date | Date[]) => {
    const dt = date as Date;
    //@todo add a util function for it
    updateSearchParams({
      dateString: `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`,
    });

    trackEvent({ category: Category.PARAMETER_CHOICE, action: Action.DATE });
  };

  //Calendar style is used here, due to dynamic value showCalendar
  const calendarLocationContainerStyle = {
    borderRadius: showCalendar ? "8px 8px 0 0" : "8px",
  };

  return (
    <>
      <CalendarLocationContainer
        styling={calendarLocationContainerStyle}
        className="menu-item calendar"
        leadingIcon={<img alt="calendar icon" src={CalendarIcon} />}
        onClick={hideOrShowCalendar}
      >
        <div className="menu-item__text">{dateParam.toLocaleDateString()}</div>
      </CalendarLocationContainer>
      <div className="absoluteContainer">
        <CSSTransition in={showCalendar} unmountOnExit timeout={100}>
          <Calendar
            onClickDay={hideOrShowCalendar}
            navigationLabel={navigationLabel}
            defaultView={"month"}
            view={"month"}
            minDate={new Date()}
            maxDate={moment().add(21, "days").toDate()}
            next2Label={null}
            prev2Label={null}
            locale="pl"
            onChange={onChangeDate}
            minDetail="month"
            value={dateParam}
          />
        </CSSTransition>
      </div>
    </>
  );
};
