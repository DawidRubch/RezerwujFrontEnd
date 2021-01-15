import React, { ChangeEvent } from "react";

import "./HourMinutePeoplePicker.css";
interface TimePersonComponent {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  optionMapping: JSX.Element[];
 
}

export default function TimePersonComponent(props: TimePersonComponent) {
  return (
    <div className="people-hour">
      <div className="styled">
        <select onChange={props.onChange}>
          {props.optionMapping}
        </select>
      </div>
    </div>
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
