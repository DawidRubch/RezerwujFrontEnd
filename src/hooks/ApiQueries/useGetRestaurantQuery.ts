import { useSearchQuery } from "hooks";
import { useQuery } from "react-query";
import { getRestaurant } from "services";

export const useGetRestaurantQuery = () => {
  const { name } = useSearchQuery();
  const { data: rawData, ...rest } = useQuery("restaurant", () =>
    getRestaurant({}, name?.toString() ?? "")
  );

  return { data: rawData?.data, ...rest };
};
