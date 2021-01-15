import React from "react";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHour } from "../../../stateManagment/action";
import TimePersonComponent from "../HourMinutePicker/HourMinutePeoplePicker";

interface TimeComponent {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  date: Date;
}

export default function TimePicker(props: TimeComponent) {
  //Redux hook
  const dispatcher: any = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <TimePersonComponent
      onChange={props.onChange}
      optionMapping={generateTime(props.date).map((hour: string) => {
        return (
          <option selected={hour.slice(3) === dispatcher.hour}>{hour}</option>
        );
      })}
    ></TimePersonComponent>
  );
}
export function generateTime(date: Date) {
  let hourAndMinutes = { hour: date.getHours(), minutes: date.getMinutes() };
  if (hourAndMinutes.minutes > 30) {
    hourAndMinutes.minutes = 0;
    hourAndMinutes.hour++;
  } else if (hourAndMinutes.minutes < 30 && hourAndMinutes.minutes > 0) {
    hourAndMinutes.minutes = 30;
  }
  let hourAndMinutesArr: string[] = new Array();

  for (var i = 0; i < 48; i++) {
    hourAndMinutesArr.push(
      `🕒 ${hourAndMinutes.hour}:${hourAndMinutes.minutes === 0 ? "00" : "30"}`
    );
    hourAndMinutes.minutes += 30;
    if (hourAndMinutes.minutes === 60) {
      hourAndMinutes.hour++;
      hourAndMinutes.minutes = 0;
    } else if (hourAndMinutes.hour === 24) {
      break;
    }
  }
  return hourAndMinutesArr;
}
