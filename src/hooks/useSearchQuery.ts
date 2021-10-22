import { useLocation } from "react-router-dom";
import { BookTime, getDefaultParamsIfDontExist } from "core";
import { SearchQParam } from "types/types";

//@todo add some form of searchQparams validation, if we pass here for example njskahaksfjasjknjkafskfkjn into dateString or people app will not work correctly
//@todo Check for dates from the past
export const useSearchQuery = () => {
  const { search } = useLocation();
  const params = getDefaultParamsIfDontExist(search);

  const { hour, minute } = _mapHourStringToMinuteAndHour(params.hour);
  const { day, month, year } = _mapYearMonthDayFromDateString(
    params.dateString
  );

  const bookTime = new BookTime(minute, hour, day, month, year, +params.people);

  return { ...params, bookTime };
};

const _mapHourStringToMinuteAndHour = (hourString: SearchQParam) => {
  const [hour, minute] = hourString.toString().split(":");
  return { hour: +hour, minute: +minute };
};

const _mapYearMonthDayFromDateString = (dateString: SearchQParam) => {
  const [day, month, year] = dateString.toString().split(".");

  return { day: +day, month: +month, year: +year };
};
