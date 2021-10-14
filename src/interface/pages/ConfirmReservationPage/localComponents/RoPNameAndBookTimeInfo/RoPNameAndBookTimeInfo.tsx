import React, { FC } from "react";
import "./RoPNameAndBookTimeInfo.scss";
import { SmallBookingInfo } from "../SmallBookingInfo/SmallBookingInfo";
import CalendarIcon from "images/calendar.svg";
import PeopleIcon from "images/group.svg";
import ClockIcon from "images/clock.svg";
import { PERSON_CONJUCTED_POLISH } from "core";

interface RoPNameAndBookTimeInfoInterface {
  name: string;
  dateString: string;
  hour: string;
  people: string;
}

export const RoPNameAndBookTimeInfo: FC<RoPNameAndBookTimeInfoInterface> = ({
  name,
  dateString,
  hour,
  people,
}) => {
  return (
    <div className="restaurantDetails">
      <b className="restaurantDetails__name">{name}</b>
      <div className="restaurantDetails__info">
        <SmallBookingInfo
          insideText={dateString}
          icon={
            <img
              className="restaurantDetails__info__icon"
              src={CalendarIcon}
              alt="calendar-icon"
            />
          }
        />
        <SmallBookingInfo
          insideText={`${hour}`}
          icon={
            <img
              className="restaurantDetails__info__icon"
              src={ClockIcon}
              alt="clock-icon"
            />
          }
        />
        <SmallBookingInfo
          insideText={`${people} ${PERSON_CONJUCTED_POLISH[+people]}`}
          icon={
            <img
              className="restaurantDetails__info__icon"
              src={PeopleIcon}
              alt="people-icon"
            />
          }
        />
      </div>
    </div>
  );
};
