export function mapPropToSearchQuery(
  location: string,
  dateString: string,
  hour: string,
  people: string
) {
  let date: Date = new Date(dateString);
  let dateToSendInQuery = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

  let showLocation = location ? `&location=${location}` : "";
  return `${showLocation}&dateString=${dateToSendInQuery}&hour=${hour}&people=${people}`;
}
