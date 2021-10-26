import { useHistory } from "react-router-dom";
import { generateSearchQueryFromObject } from "core";
import { useSearchQuery } from "./useSearchQuery";
import { HistoryPush, SearchQParams } from "types/interfaces";
import { SearchQParam } from "types/types";
import {
  changeDateStringToDate,
  changeDateToDateString,
} from "utils/interchangeDateToDateString";
//@todo refactor !!!!!!!!
export const useUpdateSearchQuery = () => {
  const history = useHistory();
  const params = useSearchQuery();

  const callBackToSend = ({
    hour,
    people,
    dateString,
    pathname,
    state,
    name,
    searchQuery,
    date,
  }: HistoryPush) => {
    let search: string;

    const searchQObject: SearchQParams = {
      dateString: returnParamIfUndefined(dateString, params.dateString),
      hour: returnParamIfUndefined(hour, params.hour),
      people: returnParamIfUndefined(people, params.people),
      date: returnParamIfUndefined(date, params.date),
    };

    const dateObject = changeDateStringToDate(params.date.toString());

    if (hour && typeof hour === "string") {
      const [hours, minutes] = hour.split(":");
      dateObject.setHours(+hours);
      dateObject.setMinutes(+minutes);
      searchQObject.date = changeDateToDateString(dateObject);
    }

    if (params.name) {
      search = generateSearchQueryFromObject({
        ...searchQObject,
        name: name ?? params.name,
      });
    } else {
      search = generateSearchQueryFromObject(searchQObject);
    }

    history.push({
      state,
      pathname,
      search: searchQuery ?? search,
    });
  };

  return callBackToSend;
};

//@todo refactor
const returnParamIfUndefined = (
  param: any,
  paramFromParams: SearchQParam | Date | undefined
) => (param ? param : paramFromParams);
