import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGlobalVariables } from "../../../../core/Helper/ReduxCustomHooks/useGlobalVariables";
import { updateHour } from "../../../../stateManagment/action";
import { TimePickerFunctions } from "../../../../InterfaceFunctions/ComponentFunctions/TimePickerFunctions/TimePickerFunctions";
import HourPeopleMinutePicker from "../HourMinutePicker/HourMinutePeoplePicker";
import { useSearchQueryAndReduxStoreUpdate } from "../LocalHooks/useSearchQueryAndReduxStoreUpdate";
import { useSearchParams } from "../../../../core/Helper/SearchQuery/useSearchParams";
import { ReactComponent as ClockIcon } from "../../../../images/clock.svg";
import "./TimePicker.scss";

interface selectedValueObj {
  value: string;
  label: string;
  icon: Symbol;
}

interface TimeComponent {
  onChange?: (e: selectedValueObj) => void;
  currentDate?: Date;
}

export function TimePicker({ onChange }: TimeComponent) {
  let timePickerFunctions = new TimePickerFunctions();

  //Takes hour from query string
  const { hourParam } = useSearchParams();

  //Takes updates search queries to ReduxStore and returns updated
  const { location, people, date, hour, name } = useGlobalVariables();

  //Function that updates search queries and redux store
  const searchQueryAndLocalStoreUpdate = useSearchQueryAndReduxStoreUpdate();

  //Global hook to update
  const dispatch = useDispatch();

  //Generating time choices f.e 10:00, 10:30 etc
  let timeChoiceArray = timePickerFunctions.generateTime(date);

  //Compares the hour searchQuery to hours in timeChoiceArray
  //Sets the time
  const updateGlobalVariableHour = () => {
    let isTimeChoiceInArray = false;

    for (let timeChoice of timeChoiceArray) {
      if (timeChoice === hour) {
        isTimeChoiceInArray = true;
        break;
      }
    }
    let [firstTimeChoice] = timeChoiceArray;

    if (!isTimeChoiceInArray) dispatch(updateHour(firstTimeChoice));
  };

  //Function runs when the amount of people is changed
  const onPickingHour = (e: selectedValueObj) => {
    if (onChange) onChange(e);

    const currentHourVal = e.value;
    dispatch(updateHour(currentHourVal));

    searchQueryAndLocalStoreUpdate(
      currentHourVal,
      location,
      people.toString(),
      date,
      name
    );
  };

  function getMaxTimeOr17() {
    let date = new Date();
    let hour = 17;
    let minutes = 0;
    if (date.getHours() > 17) {
      hour = date.getHours();
      if (date.getMinutes() > 30) {
        hour += 1;
        minutes = 0;
      }
    }
    return `${hour}:${minutes === 30 ? "30" : "00"}`;
  }

  //Function returns the array of two elements
  //First is defaultValue
  //Second is optionArray
  function returnDefaultValAndOptionsArr(): [any, any] {
    let defaultValue = {
      value: hourParam || getMaxTimeOr17(),
      label: hourParam || getMaxTimeOr17(),
      icon: <ClockIcon />,
    };
    const optionsArray = [];

    for (let i in timeChoiceArray) {
      optionsArray.push({
        value: timeChoiceArray[i],
        label: timeChoiceArray[i],
        icon: <ClockIcon />,
      });
    }

    return [defaultValue, optionsArray];
  }

  useEffect(updateGlobalVariableHour, [date]);

  return (
    <HourPeopleMinutePicker
      onChange={onPickingHour}
      defaultValAndOptionsArr={returnDefaultValAndOptionsArr()}
      type="time"
    />
  );
}
