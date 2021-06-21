import React, { useState } from "react";
import Calendar, { Detail } from "react-calendar";
import moment from "moment";
import { CSSTransition } from "react-transition-group";

import { default as CalendarIcon } from "../../../../images/calendar.svg";
import { default as ArrowDownIcon } from "../../../../images/arrowDown.svg";
import "./Calendar.scss";
import CalendarLocationContainer from "../CalendarLocationContainer/CalendarLocationContainer";
import { useHistory } from "react-router-dom";
import { mapPropToSearchQuery } from "../../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";
import { useDispatch } from "react-redux";
import { updateDate } from "../../../../stateManagment/action";
import { useGlobalVariables } from "../../../../core/Helper/ReduxCustomHooks/useGlobalVariables";
import GA from "../../../../data/trackers/GA";
import { Action, Category, Label } from "../../../../core/Interfaces/GAevent";

export const ReactCalendar = ({ onChange }: any) => {
  //Boolean value to show Calendar
  const [showCalendar, setShowCalendar] = useState(false);

  //Hook to redirect or update search query
  const history = useHistory();

  //Hook to update redux store
  const dispatch = useDispatch();

  //Global variables
  const { hour, location, people, date, name } = useGlobalVariables();

  //Function changin boolean val of showCalendar
  const hideOrShowCalendar = () => setShowCalendar(!showCalendar);

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
    if (onChange) onChange();
    dispatch(updateDate(date as Date));

    //Function changes parameters to search query string
    let mappingPropsToSearchQueries = mapPropToSearchQuery(
      location,
      date.toString(),
      hour,
      people.toString(),
      name
    );

    //Search query object
    let searchQuery = {
      search: mappingPropsToSearchQueries,
    };

    history.push(searchQuery);

    GA.trackEvent({ category: Category.PARAMETER_CHOICE, action: Action.DATE });
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
