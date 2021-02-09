import React, { useEffect } from "react";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "../../../../core/Helper/SearchQuery/useSearchParams";
import { updateHour } from "../../../../stateManagment/action";

import TimePersonComponent from "../HourMinutePicker/HourMinutePeoplePicker";

interface TimeComponent {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  date: Date;
}

export function TimePicker({ onChange, date }: TimeComponent) {
  //Redux hook
  const { hour }: any = useSelector((state) => state);
  const dispatch = useDispatch();
  let { hourParam, dateParam } = useSearchParams();

  let timeChoiceArray = generateTime(dateParam);

  useEffect(() => {
    let isTimeChoiceInArray = false;
    for (let timeChoice of timeChoiceArray) {
      if (timeChoice.slice(3) === hourParam) {
        isTimeChoiceInArray = true;
        break;
      }
    }
    if (!isTimeChoiceInArray) dispatch(updateHour(timeChoiceArray[0].slice(3)));
  }, [date]);
  return (
    <TimePersonComponent
      onChange={onChange}
      optionMapping={timeChoiceArray.map((hourStr: string, index: number) => (
        <option key={index} selected={hourStr.slice(3) === hourParam}>
          {hourStr}
        </option>
      ))}
    />
  );
}
export function generateTime(date: Date) {
  let [hour, minutes] = [date.getHours(), date.getMinutes()];

  //Start from 0:00, if its not today
  if (new Date().toDateString() !== date.toDateString()) {
    hour = 0;
    minutes = 0;
  }

  if (minutes > 30) {
    minutes = 0;
    hour++;
  } else {
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
