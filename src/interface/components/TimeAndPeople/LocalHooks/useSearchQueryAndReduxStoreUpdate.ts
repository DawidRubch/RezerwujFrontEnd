import { useHistory } from "react-router";
import { useGlobalVariables } from "../../../../core/Helper/ReduxCustomHooks/useGlobalVariables";
import { mapPropToSearchQuery } from "../../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";

//Updates search query and reduxStroe
export function useSearchQueryAndReduxStoreUpdate(): () => void {
  let history = useHistory();

  const { hour, location, people, date } = useGlobalVariables();
  return () =>
    history.push({
      search: mapPropToSearchQuery(
        location,
        date.toString(),
        hour,
        people.toString()
      ),
    });
}
