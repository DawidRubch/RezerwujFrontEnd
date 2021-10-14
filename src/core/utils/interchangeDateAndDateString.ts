const today = new Date();
const hours = today.getHours();
const minutes = today.getMinutes();
const seconds = today.getSeconds();

/**
 * @param date: Date JS Object
 * @returns date in format DD.MM.YYYY
 */
export const getDateStringFromDate = (date: Date) => {
  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth();

  return `${date.getDate()}.${month}.${date.getFullYear()}`;
};

/**
 * @param date in format DD.MM.YYYY
 * @returns date: Date JS Object
 */
export const getDateFromDateString = (dateString: string) => {
  const [day, month, year] = dateString.split(".");

  const date = new Date(+year, +month - 1, +day, hours, minutes, seconds);

  return date;
};
