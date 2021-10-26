import moment from "moment";

const correctDateFormat = "YYYY-MM-DDTHH:mm";

/**
 * @returns date string in format YYYY-MM-DDThh:mm
 */
export const changeDateToDateString = (date: Date = new Date()) =>
  moment(date).format(correctDateFormat);

/**
 *
 * @param dateString in format YYYY-MM-DDThh:mm
 * 
 * if dateString passed is in wrong format, function returns **new Date()**
 */
export const changeDateStringToDate = (dateString: string) => {
  const date = moment(dateString, correctDateFormat);

  if (!date.isValid()) return new Date();

  return date.toDate();
};
