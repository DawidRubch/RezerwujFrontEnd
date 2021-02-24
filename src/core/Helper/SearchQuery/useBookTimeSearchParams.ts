import queryString from "querystring";
import { useLocation } from "react-router-dom";
import { BookTime } from "../../Entities";

//Takes information from search query and maps them to bookTime and name
export function useBookTimeAndNameSearchParams() {
  const { search } = useLocation();
  let { name, dateString, hour, people } = queryString.parse(search);
  let dateSplited = dateString.toString().split(".");
  let bookTime = new BookTime(
    +hour.toString().split(":")[1],
    +hour.toString().split(":")[0],
    +dateSplited[0],
    +dateSplited[1] + 1,
    +dateSplited[2],
    +people.toString()
  );
  let dt = new Date();
  dt.setFullYear(+dateSplited[2]);
  dt.setMonth(+dateSplited[1]);
  dt.setDate(+dateSplited[0]);

  return { bookTime, name: name.toString(), dt };
}

export function useLocationDescriptionPage() {
  const { search } = useLocation();

  let { name, dateString, hour, people } = queryString.parse(search);

  return { name, dateString, hour, people };
}
