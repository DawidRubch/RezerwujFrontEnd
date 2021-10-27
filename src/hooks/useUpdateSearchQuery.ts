import { useHistory } from "react-router-dom";
import { useSearchQuery } from "./useSearchQuery";
import { HistoryPush, SearchQParams } from "types/interfaces";
import { generateSearchQ } from "utils";
import { SearchQParam } from "types";
import { getUpdatedSearchQ } from "utils/getUpdatedSearchQ";
//@todo refactor !!!!!!!!
export const useUpdateSearchQuery = () => {
  const history = useHistory();
  const params = useSearchQuery();

  const callBackToSend = ({
    dateString,
    hour,
    people,
    pathname,
    state,
    name,
    searchQuery,
  }: HistoryPush) => {
    
    const search = getUpdatedSearchQ(
      { hour, people, name, dateString },
      params
    );

    history.push({
      state,
      pathname,
      search: searchQuery ?? search,
    });
  };

  return callBackToSend;
};

interface IupdateDateParam {
  date: string;
  dateString?: SearchQParam;
  hourString?: SearchQParam;
}

//@todo refactor
const updateDateParam = ({
  date,
  dateString,
  hourString,
}: IupdateDateParam) => {
  const [dateParam, hourParam] = date.split("T");

  if (dateString) {
    return `${dateString}T${hourParam}`;
  }

  return `${dateParam}T${hourString}`;
};
