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
}

export function useGlobalVariables(): GlobalVariablesInterface {
  const {
    hourParam,
    locationParam,
    peopleParam,
    dateParam,
  } = useSearchParams();

  const { hour, location, date, people }: any = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateDate(dateParam));
    dispatch(updatePeopleCount(peopleParam));
    dispatch(updateLocation(locationParam));
    dispatch(updateHour(hourParam));
  }, []);

  console.table([
    [hourParam, locationParam, dateParam, peopleParam],
    [hour, location, date, people],
  ]);

  return { hour, location, date, people };
}
