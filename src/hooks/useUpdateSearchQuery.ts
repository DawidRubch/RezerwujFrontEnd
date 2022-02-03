import { useHistory } from "react-router-dom";
import { useSearchQuery } from "./useSearchQuery";
import { HistoryPush } from "types/interfaces";
import { getUpdatedSearchQ } from "utils/getUpdatedSearchQ";

export const useUpdateSearchQuery = () => {
  const history = useHistory();
  const params = useSearchQuery();

  return ({
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
};
