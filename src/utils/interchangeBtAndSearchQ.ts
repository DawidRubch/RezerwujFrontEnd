import { BookTime } from "../core";
import { generateSearchQueryFromObject } from "./generateSearchQueryFromObject";

export const generateSearchQFromBt = (bookTime: BookTime, name?: string) => {
  const dateString = _mapDateFromBookTime(bookTime);
  const hour = _mapHourFromBookTime(bookTime);

  const { people } = bookTime;

  if (name) {
    return generateSearchQueryFromObject({
      dateString,
      hour,
      people,
      name,
    });
  }

  return generateSearchQueryFromObject({ dateString, hour, people });
};

//Mapping bookTime data to DD.MM.YYYY format
const _mapDateFromBookTime = ({ day, month, year }: BookTime) =>
  `${day}.${month < 10 ? `0${month}` : month}.${year}`;

//Mapping bookTime data to HH:MM format
const _mapHourFromBookTime = ({ hour, minute }: BookTime) =>
  `${hour}:${minute === 0 ? "00" : "30"}`;
