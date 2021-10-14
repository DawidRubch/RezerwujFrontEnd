import { useHistory } from "react-router-dom";
import { generateSearchQueryFromObject } from "core";
import { useSearchQuery } from "./useSearchQuery";

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
  }: HistoryPush) => {
    let search: string;
    const searchQObject = {
      dateString: returnParamIfUndefined(dateString, params.dateString),
      hour: returnParamIfUndefined(hour, params.hour),
      people: returnParamIfUndefined(people, params.people),
    };

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

const returnParamIfUndefined = (
  param: any,
  paramFromParams: SearchQParam | undefined
) => (param ? param : paramFromParams);
