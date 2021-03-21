import { useHistory } from "react-router";

import { mapPropToSearchQuery } from "../../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";

//Updates search query and reduxStroe
export function useSearchQueryAndReduxStoreUpdate(): (
  hour: string,
  location: string,
  people: string,
  date: Date
) => void {
  let history = useHistory();

  return (hour: string, location: string, people: string, date: Date) =>
    history.push({
      search: mapPropToSearchQuery(
        location,
        date.toString(),
        hour,
        people.toString()
      ),
    });
}