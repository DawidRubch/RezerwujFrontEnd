import React, { useEffect, useMemo } from "react";
import HourPeopleMinutePicker from "../HourMinutePicker/HourMinutePeoplePicker";
import { ReactComponent as ClockIcon } from "../../../../images/clock.svg";
import "./TimePicker.scss";
import { ValueType } from "react-select";
import { generateTimeArray, getDateFromDateString } from "core";
import { useSearchQuery, useUpdateSearchQuery } from "hooks";
import { trackEvent } from "data";

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
  const { hour, dateString } = useSearchQuery();

  const updateSearchQ = useUpdateSearchQuery();

  const date = getDateFromDateString(dateString as string);

  //Generating time choices f.e 10:00, 10:30 etc
  const timeChoiceArray = generateTimeArray(date);

  //Compares the hour searchQuery to hours in timeChoiceArray
  //Sets the time
  const updateGlobalVariableHour = () => {
    let isTimeChoiceInArray = false;

    for (const timeChoice of timeChoiceArray) {
      if (timeChoice === hour) {
        isTimeChoiceInArray = true;
        break;
      }
    }
    const [firstTimeChoice] = timeChoiceArray;

    if (!isTimeChoiceInArray) updateSearchQ({ hour: firstTimeChoice });
  };

  //Function runs when the amount of people is changed
  const onPickingHour = (e: selectedValueObj) => {
    if (onChange) onChange(e);

    updateSearchQ({ hour: e.value });

    trackEvent({ category: GaCategory.PARAMETER_CHOICE, action: Action.TIME });
  };

  function returnDefaultValAndOptionsArr(): [
    ValueType<OptionType, false>,
    OptionsArray
  ] {
    const defaultValue = {
      value: hour as string,
      label: hour as string,
      icon: <ClockIcon />,
    };
    const optionsArray = [];

    for (const timeChoice of timeChoiceArray) {
      optionsArray.push({
        value: timeChoice,
        label: timeChoice,
        icon: <ClockIcon />,
      });
    }
    return [defaultValue, optionsArray];
  }

  const defaultOptionsArr = useMemo(returnDefaultValAndOptionsArr, [
    dateString,
    hour,
  ]);

  useEffect(updateGlobalVariableHour, [date]);

  return (
    <HourPeopleMinutePicker
      onChange={onPickingHour}
      defaultValAndOptionsArr={defaultOptionsArr}
      type="time"
    />
  );
}
