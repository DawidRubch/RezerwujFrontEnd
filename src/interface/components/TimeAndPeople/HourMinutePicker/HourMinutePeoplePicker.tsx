import React, { ChangeEvent } from "react";

import "./HourMinutePeoplePicker.css";
interface TimePersonComponent {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  optionMapping: JSX.Element[];
}

export default function TimePersonComponent({
  onChange,
  optionMapping,
}: TimePersonComponent) {
  return (
    <div className="people-hour">
      <div className="styled">
        <select onChange={onChange}>{optionMapping}</select>
      </div>
    </div>
  );
}

export function generateTime(date: Date) {
  let [hour, minutes] = [date.getHours(), date.getMinutes()];
  if (minutes > 30) {
    minutes = 0;
    hour++;
  } else if (minutes < 30 && minutes > 0) {
    minutes = 30;
  }
  let hourAndMinutesArr: string[] = new Array();

  for (var i = 0; i < 48; i++) {
    hourAndMinutesArr.push(`🕒 ${hour}:${minutes === 0 ? "00" : "30"}`);
    minutes += 30;
    if (minutes === 60) {
      hour++;
      minutes = 0;
    } else if (hour === 24) {
      break;
    }
  }
  return hourAndMinutesArr;
}
