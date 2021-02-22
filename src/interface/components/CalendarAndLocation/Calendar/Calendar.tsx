import React, { useState } from "react";
import Calendar from "react-calendar";
import { CSSTransition } from "react-transition-group";

import { ReactComponent as CalendarIcon } from "../../../../images/calendar.svg";
import { ReactComponent as ArrowDownIcon } from "../../../../images/arrowDown.svg";
import "./Calendar.css";
import CalendarLocationContainer from "../CalendarLocationContainer/CalendarLocationContainer";
import { useSearchParams } from "../../../../core/Helper/SearchQuery/useSearchParams";
import { useHistory, useLocation } from "react-router-dom";
import { mapPropToSearchQuery } from "../../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";
import { useDispatch, useSelector } from "react-redux";
import { updateDate } from "../../../../stateManagment/action";
import queryString from "querystring";
interface ReactCalendarProps {
  value: Date;
  onChange: any;
}

export const ReactCalendar = ({ value, onChange }: ReactCalendarProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { search } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { hour, location, people }: any = useSelector((state) => state);
  const { dateParam } = useSearchParams();
  const { name } = queryString.parse(search);

  return (
    <div>
      <CalendarLocationContainer
        styling={{ borderRadius: showCalendar ? "8px 8px 0 0" : "8px" }}
        className="menu-item calendar"
        leadingIcon={<CalendarIcon />}
        onClick={() => {
          setShowCalendar(!showCalendar);
        }}
      >
        <div className="icon-text">{dateParam.toLocaleDateString()}</div>
        <span className="icon-right">
          <ArrowDownIcon />
        </span>
      </CalendarLocationContainer>
      <div style={{ position: "absolute", marginLeft: "-25px" }}>
        <CSSTransition in={showCalendar} unmountOnExit timeout={100}>
          <Calendar
            onClickDay={() => {
              setShowCalendar(!showCalendar);
            }}
            navigationLabel={(navigation) =>
              navigation.label.charAt(0).toUpperCase() +
              navigation.label.slice(1)
            }
            defaultView={"month"}
            view={"month"}
            minDate={new Date()}
            next2Label={null}
            prev2Label={null}
            locale="pl"
            onChange={(date: Date | Date[]) => {
              onChange();
              dispatch(updateDate(date as Date));
              history.push({
                search:
                  mapPropToSearchQuery(
                    location,
                    date.toString(),
                    hour,
                    people.toString()
                  ) + `&name=${name}`,
              });
            }}
            value={dateParam}
          />
        </CSSTransition>
      </div>
    </div>
  );
};
