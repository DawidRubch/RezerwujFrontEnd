import React, { useEffect } from "react";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useGlobalVariables } from "../../../../core/Helper/ReduxCustomHooks/useGlobalVariables";
import { updateHour } from "../../../../stateManagment/action";

import TimePersonComponent from "../HourMinutePicker/HourMinutePeoplePicker";
import { useSearchQueryAndReduxStoreUpdate } from "../LocalHooks/useSearchQueryAndReduxStoreUpdate";

interface TimeComponent {
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  currentDate?: Date;
}

export function TimePicker({}: TimeComponent) {
  //Takes updates search queries to ReduxStore and returns updated
  const { location, people, date, hour } = useGlobalVariables();

  //Function that updates search queries and redux store
  const searchQueryAndLocalStoreUpdate = useSearchQueryAndReduxStoreUpdate();

  //Global hook to update
  const dispatch = useDispatch();

  //Generating time choices f.e 10:00, 10:30 etc
  let timeChoiceArray = generateTime(date);

  //Compares the hour searchQuery to hours in timeChoiceArray
  //Sets the time
  const updateGlobalVariableHour = () => {
    let isTimeChoiceInArray = false;
    for (let timeChoice of timeChoiceArray) {
      if (timeChoice.slice(3) === hour) {
        isTimeChoiceInArray = true;
        break;
      }
    }
    let [firstTimeChoice] = timeChoiceArray;

    if (!isTimeChoiceInArray) dispatch(updateHour(firstTimeChoice.slice(3)));
  };

  //Function runs when the amount of people is changed
  const onPickingAmountOfPeople = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let currentHourVal = e.currentTarget.value.slice(3);
    dispatch(updateHour(currentHourVal));
    searchQueryAndLocalStoreUpdate(
      currentHourVal,
      location,
      people.toString(),
      date
    );
  };

  //Mapping options to JSX components
  const optionsMapping = () =>
    timeChoiceArray.map((hourStr: string, index: number) => (
      <option key={index} selected={hourStr.slice(3) === hour}>
        {hourStr}
      </option>
    ));

  useEffect(updateGlobalVariableHour, [date]);

  return (
    <TimePersonComponent
      onChange={onPickingAmountOfPeople}
      optionMapping={optionsMapping()}
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
    
    let hourAndMinutesString = `🕒 ${hour}:${minutes === 0 ? "00" : "30"}`;

    hourAndMinutesArr.push(hourAndMinutesString);
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
