import React, { useEffect } from "react";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useGlobalVariables } from "../../../../core/Helper/ReduxCustomHooks/useGlobalVariables";
import { updateHour } from "../../../../stateManagment/action";
import { TimePickerFunctions } from "../../../../InterfaceFunctions/ComponentFunctions/TimePickerFunctions/TimePickerFunctions";
import TimePersonComponent from "../HourMinutePicker/HourMinutePeoplePicker";
import { useSearchQueryAndReduxStoreUpdate } from "../LocalHooks/useSearchQueryAndReduxStoreUpdate";

interface TimeComponent {
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  currentDate?: Date;
}

export function TimePicker({ onChange }: TimeComponent) {
  let timePickerFunctions = new TimePickerFunctions();
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
      if (timeChoice.slice(3) === hour) {
        isTimeChoiceInArray = true;
        break;
      }
    }
    let [firstTimeChoice] = timeChoiceArray;

    if (!isTimeChoiceInArray) dispatch(updateHour(firstTimeChoice.slice(3)));
  };

  //Function runs when the amount of people is changed
  const onPickingHour = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(e);
    let currentHourVal = e.currentTarget.value.slice(3);
    dispatch(updateHour(currentHourVal));
    searchQueryAndLocalStoreUpdate(
      currentHourVal,
      location,
      people.toString(),
      date,
      name
    );
  };

  //Function returns the array of two elements
  //First is defaultValue
  //Second is optionArray
  function returnDefaultValAndOptionsArr(): [string, JSX.Element[]] {
    let defaultValue = "";
    const optionsArray: JSX.Element[] = [];
    for (let i in timeChoiceArray) {
      //Text to show in option
      const textInsideOption = timeChoiceArray[i];

      //Setting default value if it equals the global state
      if (timeChoiceArray[i].slice(3) === hour) {
        defaultValue = textInsideOption;
      }

      const optionJSXComponent = <option key={i}>{textInsideOption}</option>;

      optionsArray.push(optionJSXComponent);
    }

    return [defaultValue, optionsArray];
  }

  useEffect(updateGlobalVariableHour, [date]);

  return (
    <TimePersonComponent
      onChange={onPickingHour}
      defaultValAndOptionsArr={returnDefaultValAndOptionsArr()}
    />
  );
}
