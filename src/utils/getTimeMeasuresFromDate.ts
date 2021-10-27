export const getTimeMeasuresFromDate = (date: Date) => ({
  minutes: date.getMinutes(),
  hour: date.getHours(),
  day: date.getDate(),
  month: date.getMonth() + 1,
  year: date.getFullYear(),
});
