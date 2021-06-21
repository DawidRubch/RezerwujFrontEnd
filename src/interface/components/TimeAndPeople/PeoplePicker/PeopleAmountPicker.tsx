import React, { ChangeEvent } from "react";
import TimePersonComponent from "../HourMinutePicker/HourMinutePeoplePicker";
import { PeopleArr } from "../../../../core/ImportantVariables/variables";
import { useSearchQueryAndReduxStoreUpdate } from "../LocalHooks/useSearchQueryAndReduxStoreUpdate";
import { useGlobalVariables } from "../../../../core/Helper/ReduxCustomHooks/useGlobalVariables";
import { useSearchParams } from "../../../../core/Helper/SearchQuery/useSearchParams";
import { useDispatch } from "react-redux";
import { updatePeopleCount } from "../../../../stateManagment/action";
import { ReactComponent as PersonIcon } from "../../../../images/person.svg";
import GA from "../../../../data/trackers/GA";
import { Action, Category } from "../../../../core/Interfaces/GAevent";

interface selectedValueObj {
  value: string;
  label: string;
  icon: Symbol;
}

interface PeopleAmountPickerProps {
  onChange?: (e: selectedValueObj) => void;
  people?: number;
}

export function PeopleAmountPicker({ onChange }: PeopleAmountPickerProps) {
  //Takes people from query string
  const { peopleParam } = useSearchParams();

  //Updates Redux store
  const dispatch = useDispatch();

  //Array of numbers from 0 to 21
  const PeopleNumberArr = generatePeopleNumberArr();

  //Hook to update search queries and redux store
  const searchQueryAndLocalStoreUpdate = useSearchQueryAndReduxStoreUpdate();

  //Global variables
  const { location, date, hour, people, name } = useGlobalVariables();

  // Function runs on changing amount of people
  const onPickingAmountOfPeople = (e: selectedValueObj) => {
    if (onChange) onChange(e);

    let currentPeopleVal = e.value;

    searchQueryAndLocalStoreUpdate(
      hour,
      location,
      currentPeopleVal,
      date,
      name
    );
    dispatch(updatePeopleCount(+currentPeopleVal));
    
    GA.trackEvent({
      category: Category.PARAMETER_CHOICE,
      action: Action.PEOPLE,
    });
  };

  //Function returns the array of two elements
  //First is defaultValue
  //Second is optionArray
  function returnDefaultValAndOptionsArr(): [any, any] {
    let defaultValue = {
      value: peopleParam === 0 ? "4" : peopleParam,
      label:
        peopleParam === 0
          ? "4 osoby"
          : `${peopleParam} ${PeopleArr[peopleParam]}`,
      icon: <PersonIcon />,
    };

    const optionsArray = [];
    for (let i in PeopleArr) {
      //Text to show in option
      const textInsideOption = `${PeopleNumberArr[i]} ${PeopleArr[i]}`;

      optionsArray.push({
        value: PeopleNumberArr[i],
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
