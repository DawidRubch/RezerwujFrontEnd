import React from "react";
import { ReactComponent as PersonIcon } from "../../../../images/person.svg";
import { PERSON_CONJUCTED_POLISH } from "core";
import { useSearchQuery, useUpdateSearchQuery } from "hooks";
import { trackEvent } from "data";
import TimePersonComponent from "../HourMinutePicker/HourMinutePeoplePicker";
import { Action, Category } from "types/enums";

interface selectedValueObj {
  value: string;
  label: string;
  icon: Symbol;
}

interface PeopleAmountPickerProps {
  onChange?: (e: selectedValueObj) => void;
  people?: number;
}
//Array of numbers from 0 to 21
const PeopleNumberArr = generatePeopleNumberArr();

export function PeopleAmountPicker({ onChange }: PeopleAmountPickerProps) {
  //Global variables
  const { people } = useSearchQuery();

  const updateSearchParams = useUpdateSearchQuery();

  // Function runs on changing amount of people
  const onPickingAmountOfPeople = (e: selectedValueObj) => {
    if (onChange) onChange(e);

    const currentPeopleVal = e.value;

    updateSearchParams({ people: currentPeopleVal });

    trackEvent({
      category: Category.PARAMETER_CHOICE,
      action: Action.PEOPLE,
    });
  };

  //Function returns the array of two elements
  //First is defaultValue
  //Second is optionArray
  function returnDefaultValAndOptionsArr(): [any, any] {
    const peopleAmount = people ? +people : 2;

    const defaultValue = {
      value: peopleAmount,
      label: `${people} ${PERSON_CONJUCTED_POLISH[peopleAmount]}`,
      icon: <PersonIcon />,
    };

    const optionsArray = [];

    for (let i in PERSON_CONJUCTED_POLISH) {
      //Text to show in option
      const textInsideOption = `${PeopleNumberArr[i]} ${PERSON_CONJUCTED_POLISH[i]}`;

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
