import { BookTime } from "..";
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

export const generateBtFromSearchQ = ({
  dateString,
  hour,
  people,
}: SearchQParams) => {
  const [day, month, year] = dateString.toString().split(".");
  const [hourNumber, minutes] = hour.toString().split(":");

  return new BookTime(+minutes, +hourNumber, +day, +month, +year, +people);
};

//Mapping bookTime data to DD.MM.YYYY format
const _mapDateFromBookTime = ({ day, month, year }: BookTime) =>
  `${day}.${month <= 10 ? `0${month - 1}` : month - 1}.${year}`;

//Mapping bookTime data to HH:MM format
const _mapHourFromBookTime = ({ hour, minute }: BookTime) =>
  `${hour}:${minute === 0 ? "00" : "30"}`;
