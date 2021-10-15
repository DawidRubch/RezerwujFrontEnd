import { useSearchQuery } from "hooks";
import { useQuery } from "react-query";
import {
  getRestaurantInfoDescriptionPage,
  RestaurantInfoInput,
} from "services/RezerwujApiService";

export const useRestaurantsInfoDescriptionQuery = () => {
  const { bookTime, name } = useSearchQuery();

  const restaurantName = name ?? "";
  const { data: rawData, ...rest } = useQuery(
    ["restaurantDescription", name, bookTime],
    () =>
      getRestaurantInfoDescriptionPage({
        bookTime,
        name: restaurantName.toString(),
      })
  );

  return { data: rawData?.data, ...rest };
};
