/**
 * Function, which return closest possible time or 17:00 if its
 * @param date is an optional parameter, default value is new Date()
 * @requires time in format HH:MM
 */
export const getClosestTimeOr17 = (date: Date = new Date()) => {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  //If its earlier than 17, it returns 17:00
  if (hour < 17) return "17:00";

  //If its later it sends the closest hour, but rounds up the minutes
  if (minutes >= 0 && minutes < 30) return `${hour}:30`;

  return `${hour + 1}:00`;
};
