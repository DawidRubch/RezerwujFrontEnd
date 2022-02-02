import { HistoryPush, SearchQParams } from "types";
import { generateSearchQ } from "utils";

//@todo write unit tests for this
export const getUpdatedSearchQ = (
  { hour, people, dateString }: HistoryPush,
  params: SearchQParams
) => {
  const [dateParam, hourParam] = params.date.toString().split("T");
  let date;

  if (hour) {
    date = `${dateParam}T${hour}`;
  } else if (dateString) {
    date = `${dateString}T${hourParam}`;  
  }
  let searchQParams: SearchQParams = {
    date: date || params.date,
    people: people || params.people,
  };
  if (params.name) {
    searchQParams = { ...searchQParams, name: params.name };
  }

  return generateSearchQ(searchQParams);
};
