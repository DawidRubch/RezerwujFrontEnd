import queryString from "querystring";
import { SearchQParams } from "types/interfaces";
import { getClosestTimeOr17, getDateStringFromDate } from "utils";
import { changeDateToDateString } from "./interchangeDateToDateString";

export const DEFAULT_SEARCHQ_PARAMS: SearchQParams = {
  people: "2",
  date: changeDateToDateString(),
};

const getDefaultParamIfUndefined = (param: keyof SearchQParams, value: any) =>
  value === undefined ? DEFAULT_SEARCHQ_PARAMS[param] : value;

export const getDefaultParamsIfDontExist = (searchQ: string): SearchQParams => {
  const { name, people, date } = queryString.parse(searchQ);

  const objectToReturn = {
    people: getDefaultParamIfUndefined("people", people),
    date: getDefaultParamIfUndefined("date", date),
  };

  if (name) return { ...objectToReturn, name };

  return objectToReturn;
};
