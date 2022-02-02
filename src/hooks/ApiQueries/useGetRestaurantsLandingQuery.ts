import { BookTime } from "core";
import { useQuery } from "react-query";
import { getRestaurantsArrayLanding } from "services";
import { DEFAULT_SEARCHQ_PARAMS } from "utils";
import { Queries } from "./Queries";

export const useGetRestaurantsLandingQuery = (search: string) => {
  let bookTime = BookTime(
    DEFAULT_SEARCHQ_PARAMS.date.toString(),
    +DEFAULT_SEARCHQ_PARAMS.people
  );

  const { data: rawData, ...rest } = useQuery(Queries.RESTAURANTS, () =>
    getRestaurantsArrayLanding({ bookTime }, search)
  );

  return { data: rawData?.data, ...rest };
};
