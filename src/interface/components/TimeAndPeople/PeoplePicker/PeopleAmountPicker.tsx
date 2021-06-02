import React, { ChangeEvent } from "react";
import TimePersonComponent from "../HourMinutePicker/HourMinutePeoplePicker";
import { PeopleArr } from "../../../../core/ImportantVariables/variables";
import { useSearchQueryAndReduxStoreUpdate } from "../LocalHooks/useSearchQueryAndReduxStoreUpdate";
import { useGlobalVariables } from "../../../../core/Helper/ReduxCustomHooks/useGlobalVariables";
import { useDispatch } from "react-redux";
import { updatePeopleCount } from "../../../../stateManagment/action";
import { ReactComponent as PersonIcon } from "../../../../images/person.svg";

interface PeopleAmountPickerProps {
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  people?: number;
}

export function PeopleAmountPicker({ onChange }: PeopleAmountPickerProps) {
  //Updates Redux store
  const dispatch = useDispatch();

  //Array of numbers from 0 to 21
  const PeopleNumberArr = generatePeopleNumberArr();

  //Hook to update search queries and redux store
  const searchQueryAndLocalStoreUpdate = useSearchQueryAndReduxStoreUpdate();

  //Global variables
  const { location, date, hour, people, name } = useGlobalVariables();

  // Function runs on changing amount of people
  const onPickingAmountOfPeople = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(e);

    let currentPeopleVal = e.currentTarget.value;
    searchQueryAndLocalStoreUpdate(
      hour,
      location,
      currentPeopleVal,
      date,
      name
    );
    dispatch(updatePeopleCount(+currentPeopleVal));
  };

  //Function returns the array of two elements
  //First is defaultValue
  //Second is optionArray
  function returnDefaultValAndOptionsArr(): [string, any] {
    let defaultValue = people.toString() || "2";
    const optionsArray = [];
    for (let i in PeopleArr) {
      //Text to show in option
      const textInsideOption = `${PeopleNumberArr[i]} ${PeopleArr[i]}`;

      optionsArray.push({
        value: textInsideOption,
        label: textInsideOption,
        icon: <PersonIcon />,
      });
    }

    return [defaultValue, optionsArray];
  }

  return (
    <TimePersonComponent
      onChange={onPickingAmountOfPeople}
      defaultValAndOptionsArr={returnDefaultValAndOptionsArr()}
      type="people"
    />
  );
}

//Generates array of numbers from 0 to 21
function generatePeopleNumberArr(): number[] {
  const amountOfPeopleToShow = 21;
  return Array.from({ length: amountOfPeopleToShow }, (_, indx) => indx + 1);
}
