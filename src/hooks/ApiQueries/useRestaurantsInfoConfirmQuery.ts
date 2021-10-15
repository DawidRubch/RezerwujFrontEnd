import { useSearchQuery } from "hooks";
import { useQuery } from "react-query";
import {
  getRestaurantInfoConfirmPage,
  RestaurantInfoInput,
} from "services/RezerwujApiService";

export const useRestaurantsInfoConfirmQuery = () => {
  const { name, bookTime } = useSearchQuery();
  const restaurantName = name ?? "";

  const { data: rawData, ...rest } = useQuery(
    ["restaurantsConfirm", bookTime, name],
    () =>
      getRestaurantInfoConfirmPage({
        bookTime,
        name: restaurantName.toString(),
      })
  );

  return { data: rawData?.data, ...rest };
};
