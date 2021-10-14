import { useLocation } from "react-router-dom";
import { BookTime, getDefaultParamsIfDontExist } from "core";

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
