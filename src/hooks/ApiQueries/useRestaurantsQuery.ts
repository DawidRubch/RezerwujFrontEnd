import { generateBtFromSearchQ } from "core";
import { useSearchQuery } from "hooks";
import { useQuery } from "react-query";
import { getRestaurantsFromDb } from "services";

type IuseRestaurantsQuery = {
  shouldUpdate: boolean;
};

export const useRestaurantsQuery = ({ shouldUpdate }: IuseRestaurantsQuery) => {
  const { bookTime } = useSearchQuery();

  const { data: rawData, ...rest } = useQuery(
    ["restaurants", shouldUpdate],
    () => getRestaurantsFromDb({ bookTime })
  );

  return { data: rawData?.data, ...rest };
};
