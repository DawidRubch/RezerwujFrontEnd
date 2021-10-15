import React, { useMemo, useState } from "react";
import Calendar, { Detail } from "react-calendar";
import moment from "moment";
import { CSSTransition } from "react-transition-group";
import { default as CalendarIcon } from "../../../../images/calendar.svg";
import { default as ArrowDownIcon } from "../../../../images/arrowDown.svg";
import "./Calendar.scss";
import CalendarLocationContainer from "../CalendarLocationContainer/CalendarLocationContainer";
import { useCallback } from "react";
import { useSearchQuery, useUpdateSearchQuery } from "hooks";
import { getDateFromDateString, getDateStringFromDate } from "core";
import { trackEvent } from "data";
import { Action, Category } from "types/enums";

export const ReactCalendar = ({ onChange }: any) => {
  //Boolean value to show Calendar
  const [showCalendar, setShowCalendar] = useState(false);

  const { dateString } = useSearchQuery();

  const date = useMemo(
    () => getDateFromDateString(dateString as string),
    [dateString]
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
    //onChange is used in RestaurantDescriptionPage
    //It informs the component that it should be updated
    //@todo refactor this "onChange"
    if (onChange) onChange();

    updateSearchParams({ dateString: getDateStringFromDate(date as Date) });

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
        <div className="menu-item__text">{date.toLocaleDateString()}</div>
        <span className="menu-item__right">
          <img alt="menu-item__arrow" src={ArrowDownIcon} />
        </span>
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
            value={date}
          />
        </CSSTransition>
      </div>
    </>
  );
};
