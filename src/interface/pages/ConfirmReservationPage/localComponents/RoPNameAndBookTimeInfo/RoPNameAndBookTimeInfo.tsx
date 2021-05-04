import React from "react";
import "./RoPNameAndBookTimeInfo.scss";
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
    <div className="restaurantDetails">
      <b className="restaurantDetails__name">{name}</b>
      <div className="restaurantDetails__info">
        <SmallBookingInfo
          insideText={confirmReservationFunctions.textInsideCalendarBookingInfo}
          icon={<img className="restaurantDetails__info__icon" src={CalendarIcon} />}
        />
        <SmallBookingInfo
          insideText={confirmReservationFunctions.textInsideHourBookingInfo}
          icon={<img className="restaurantDetails__info__icon" src={ClockIcon} />}
        />
        <SmallBookingInfo
          insideText={confirmReservationFunctions.textInsidePeopleBookingInfo}
          icon={<img className="restaurantDetails__info__icon" src={PeopleIcon} />}
        />
      </div>
    </div>
  );
};
