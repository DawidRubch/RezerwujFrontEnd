import { useQuery } from "react-query";
import {
  getRoPAlternativeBookingHours,
  RestaurantInfoInput,
} from "services/RezerwujApiService";

export const useAlternativeBookingHoursQuery = (data: RestaurantInfoInput) =>
  useQuery("alternativeBt", () => getRoPAlternativeBookingHours(data));
