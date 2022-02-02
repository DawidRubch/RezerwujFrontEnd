export const getHourAndDateFromDateString = (dateString: string) => {
  const [date, hour] = dateString.split("T");

  return { date, hour };
};
