import React from "react";
import ConfirmReservationFunctions from "../../../../../InterfaceFunctions/PagesFunctions/ConfirmReservationPageFunctions/ConfirmReservationFunctions";
import { SmallBookingInfo } from "../SmallBookingInfo/SmallBookingInfo";
import { ReactComponent as CalendarIcon } from "../../../../../images/calendar.svg";
import { ReactComponent as PeopleIcon } from "../../../../../images/group.svg";
import { ReactComponent as ClockIcon } from "../../../../../images/clock.svg";

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
      <SmallBookingInfo
        insideText={confirmReservationFunctions.textInsideCalendarBookingInfo}
        icon={<CalendarIcon />}
      />
      <SmallBookingInfo
        insideText={confirmReservationFunctions.textInsideHourBookingInfo}
        icon={<ClockIcon />}
      />
      <SmallBookingInfo
        insideText={confirmReservationFunctions.textInsidePeopleBookingInfo}
        icon={<PeopleIcon />}
      />
    </div>
  );
};
