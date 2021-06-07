import React, { ChangeEvent } from "react";

import TimePersonComponent from "../HourMinutePicker/HourMinutePeoplePicker";
import { PeopleArr } from "../../../../core/ImportantVariables/variables";
import { useSearchQueryAndReduxStoreUpdate } from "../LocalHooks/useSearchQueryAndReduxStoreUpdate";
import { useGlobalVariables } from "../../../../core/Helper/ReduxCustomHooks/useGlobalVariables";
import { useDispatch } from "react-redux";
import { updatePeopleCount } from "../../../../stateManagment/action";

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
    let currentPeopleVal = e.currentTarget.value.slice(3, 5);
    searchQueryAndLocalStoreUpdate(
      hour,
      location,
      currentPeopleVal,
      date,
      name
    );
    dispatch(updatePeopleCount(+currentPeopleVal));
  };

  //Mapping options array to JSX components
  const optionMapping = PeopleArr.map((person, i) => {
    const textInsideOption = `👨 ${PeopleNumberArr[i]} ${person}`;

    const isSelected = PeopleNumberArr[i] === people;

    return (
      <option key={i} selected={isSelected}>
        {textInsideOption}
      </option>
    );
  });

  return (
    <TimePersonComponent onChange={onPickingAmountOfPeople} optionMapping={optionMapping} />
  );
}

//Generates array of numbers from 0 to 21
function generatePeopleNumberArr(): number[] {
  const amountOfPeopleToShow = 21;
  return Array.from({ length: amountOfPeopleToShow }, (_, indx) => indx + 1);
}
