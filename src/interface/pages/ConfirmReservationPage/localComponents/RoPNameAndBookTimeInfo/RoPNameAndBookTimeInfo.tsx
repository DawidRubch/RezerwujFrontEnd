import React from "react";
import "./RoPNameAndBookTimeInfo.css";
import ConfirmReservationFunctions from "../../../../../InterfaceFunctions/PagesFunctions/ConfirmReservationPageFunctions/ConfirmReservationFunctions";
import { SmallBookingInfo } from "../SmallBookingInfo/SmallBookingInfo";
import CalendarIcon from "../../../../../images/calendar.svg";
import PeopleIcon from "../../../../../images/group.svg";
import ClockIcon from "../../../../../images/clock.svg";

interface RoPNameAndBookTimeInfoInterface {
  confirmReservationFunctions: ConfirmReservationFunctions;
  name: string;
}

export const RoPNameAndBookTimeInfo = ({
  confirmReservationFunctions,
  name,
}: RoPNameAndBookTimeInfoInterface) => {
  return (
    <div className="restaurant-name-and-info">
      <b className="restaurant-name">{name}</b>
      <div className="restaurant-info">
        <SmallBookingInfo
          insideText={confirmReservationFunctions.textInsideCalendarBookingInfo}
          icon={<img className="restaurant-info-icon" src={CalendarIcon} />}
        />
        <SmallBookingInfo
          insideText={confirmReservationFunctions.textInsideHourBookingInfo}
          icon={<img className="restaurant-info-icon" src={ClockIcon} />}
        />
        <SmallBookingInfo
          insideText={confirmReservationFunctions.textInsidePeopleBookingInfo}
          icon={<img className="restaurant-info-icon" src={PeopleIcon} />}
        />
      </div>
    </div>
  );
};
