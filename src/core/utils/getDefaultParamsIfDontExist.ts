import queryString from "querystring";
import { SearchQParams } from "types/interfaces";
import { DEFAULT_SEARCHQ_PARAMS } from "../ImportantVariables";

const getDefaultParamIfUndefined = (param: keyof SearchQParams, value: any) =>
  value === undefined ? DEFAULT_SEARCHQ_PARAMS[param] : value;

export const getDefaultParamsIfDontExist = (searchQ: string): SearchQParams => {
  const { name, dateString, people, hour } = queryString.parse(searchQ);

  const objectToReturn = {
    dateString: getDefaultParamIfUndefined("dateString", dateString),
    people: getDefaultParamIfUndefined("people", people),
    hour: getDefaultParamIfUndefined("hour", hour),
  };

  if (name) return { ...objectToReturn, name };

  return objectToReturn;
};
