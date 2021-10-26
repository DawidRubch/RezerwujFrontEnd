import queryString from "querystring";
import { SearchQParams } from "types/interfaces";
import { getClosestTimeOr17, getDateStringFromDate } from "utils";
import { changeDateToDateString } from "./interchangeDateToDateString";

export const DEFAULT_SEARCHQ_PARAMS: SearchQParams = {
  dateString: getDateStringFromDate(),
  people: "2",
  hour: getClosestTimeOr17(),
  date: changeDateToDateString(),
};

const getDefaultParamIfUndefined = (param: keyof SearchQParams, value: any) =>
  value === undefined ? DEFAULT_SEARCHQ_PARAMS[param] : value;

export const getDefaultParamsIfDontExist = (searchQ: string): SearchQParams => {
  const { name, dateString, people, hour, date } = queryString.parse(searchQ);

  const objectToReturn = {
    dateString: getDefaultParamIfUndefined("dateString", dateString),
    people: getDefaultParamIfUndefined("people", people),
    hour: getDefaultParamIfUndefined("hour", hour),
    date: getDefaultParamIfUndefined("date", date),
  };

  if (name) return { ...objectToReturn, name };

  return objectToReturn;
};
