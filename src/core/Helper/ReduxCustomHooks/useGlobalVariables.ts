import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDate,
  updateHour,
  updateLocation,
  updatePeopleCount,
} from "../../../stateManagment/action";
import { useSearchParams } from "../SearchQuery/useSearchParams";
interface GlobalVariablesInterface {
  hour: string;
  location: string;
  date: Date;
  people: number;
  name?: string;
}

//Hook takes search parametes and updates them to the redux store
export function useGlobalVariables(): GlobalVariablesInterface {
  const {
    hourParam,
    locationParam,
    peopleParam,
    dateParam,
    name,
  } = useSearchParams();

  const { hour, location, date, people }: any = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateDate(dateParam));
    dispatch(updatePeopleCount(peopleParam));
    dispatch(updateLocation(locationParam));
    dispatch(updateHour(hourParam));
  }, []);

  let finalReturnObj = { hour, location, date, people };
  if (name === "undefined") {
    return finalReturnObj;
  }
  return { ...finalReturnObj, name };
}
