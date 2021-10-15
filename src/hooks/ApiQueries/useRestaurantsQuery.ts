import { generateBtFromSearchQ } from "core";
import { useSearchQuery } from "hooks";
import { useQuery } from "react-query";
import { getRestaurantsFromDb } from "services/RezerwujApiService";

type IuseRestaurantsQuery = {
  shouldUpdate: boolean;
};

export const useRestaurantsQuery = ({ shouldUpdate }: IuseRestaurantsQuery) => {
  const { dateString, hour, people } = useSearchQuery();

  const bookTime = generateBtFromSearchQ({ dateString, hour, people });

  const dataToPost = { bookTime, address: "" };

  const { data: rawData, ...rest } = useQuery(
    ["restaurants", shouldUpdate],
    () => getRestaurantsFromDb({ ...dataToPost })
  );

  return { data: rawData?.data, ...rest };
};
