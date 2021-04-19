export function mapPropToSearchQuery(
  location: string,
  dateString: string,
  hour: string,
  people: string,
  name?: string
) {
  const currentDate = new Date();
  let date: Date = new Date(dateString);

  if (date < currentDate) {
    date = currentDate;
  }
  let dateToSendInQuery = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

  let showLocation = location ? `&location=${location}` : "";
  let finalStringToReturn = `${showLocation}&dateString=${dateToSendInQuery}&hour=${hour}&people=${people}`;
  if (name) return finalStringToReturn + `&name=${name}`;
  return finalStringToReturn;
}
