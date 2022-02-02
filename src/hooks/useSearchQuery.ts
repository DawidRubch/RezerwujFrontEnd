import { BookTime } from "core";
import { useLocation } from "react-router-dom";
import { getDefaultParamsIfDontExist } from "utils";

//@todo add some form of searchQparams validation, if we pass here for example njskahaksfjasjknjkafskfkjn into dateString or people app will not work correctly
//@todo Check for dates from the past
export const useSearchQuery = () => {
  const { search } = useLocation();
  const params = getDefaultParamsIfDontExist(search);

  const bookTime = BookTime(params.date.toString(), +params.people);

  return { ...params, bookTime };
};
