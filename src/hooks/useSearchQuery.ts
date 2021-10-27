import { BookTime } from "core";
import { useLocation } from "react-router-dom";
import { changeDateStringToDate, getDefaultParamsIfDontExist } from "utils";
import { getTimeMeasuresFromDate } from "utils/getTimeMeasuresFromDate";

//@todo add some form of searchQparams validation, if we pass here for example njskahaksfjasjknjkafskfkjn into dateString or people app will not work correctly
//@todo Check for dates from the past
export const useSearchQuery = () => {
  const { search } = useLocation();
  const params = getDefaultParamsIfDontExist(search);

  const date = changeDateStringToDate(params.date as string);
  const { minutes, hour, day, month, year } = getTimeMeasuresFromDate(date);

  const bookTime = new BookTime(
    minutes,
    hour,
    day,
    month,
    year,
    +params.people
  );

  return { ...params, bookTime };
};
