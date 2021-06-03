import { useLocation } from "react-router-dom";
import queryString from "querystring";

interface ParamsInterface {
  dateParam: Date;
  locationParam: string;
  hourParam: string;
  peopleParam: number;
  name?: string;
}
export function useSearchParams(): ParamsInterface {
  const { search } = useLocation();
  let { dateString, location, hour, people, name } = queryString.parse(search);

  let date = new Date();

  let [day, month, year] =
    typeof dateString === "string"
      ? dateString.split(".")
      : [
          date.getDate().toString(),
          date.getMonth().toString(),
          date.getFullYear().toString(),
        ];

  date.setDate(+day);
  date.setMonth(+month);
  date.setFullYear(+year);

  //Checking if vars received from queryString are a string
  const checkIfSearchParamIsAString = (searchParam: string | string[]) =>
    typeof searchParam === "string" ? searchParam : "";

  let locationToReturn = checkIfSearchParamIsAString(location);
  let hourToReturn = checkIfSearchParamIsAString(hour);
  let peopleToReturn = checkIfSearchParamIsAString(people);

  let nameToReturn = checkIfSearchParamIsAString(name);

  const finalReturnObj = {
    dateParam: date,
    locationParam: locationToReturn,
    hourParam: hourToReturn,
    peopleParam: +peopleToReturn,
  };

  if (name !== "undefined") {
    return { ...finalReturnObj, name: nameToReturn };
  }
  return finalReturnObj;
}
