//BookTime model

import { getHourAndDateFromDateString } from "utils/getHourAndDateFromDateString";

export const BookTime = (date: string, people: number) => {
  const { date: dateString, hour: hourString } =
    getHourAndDateFromDateString(date);

  const [year, month, day] = dateString.split("-");

  const [hour, minutes] = hourString.split(":");
  return {
    date,
    people,
    hour: +hour,
    minute: +minutes,
    year: +year,
    month: +month,
    day: +day,
    dateString,
    hourString,
  };
};
