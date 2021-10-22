import { useSearchQuery } from "hooks";
import { useQuery } from "react-query";
import { getRoPAlternativeBookingHours } from "services";

export const useAlternativeBookingHoursQuery = () => {
  const { bookTime, name } = useSearchQuery();

  const restaurantName = name?.toString() ?? "";

  const { data: rawData, ...rest } = useQuery(["alternativeBt", bookTime], () =>
    getRoPAlternativeBookingHours({ bookTime, name: restaurantName })
  );
  return { data: rawData?.data, ...rest };
};
