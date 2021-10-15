import { SearchQParams } from "types/interfaces";
import { getClosestTimeOr17, getDateStringFromDate } from "../utils";

const date = new Date();

export const DEFAULT_SEARCHQ_PARAMS: SearchQParams = {
  dateString: getDateStringFromDate(date),
  people: "2",
  hour: getClosestTimeOr17(),
};
