import React, { ChangeEvent } from "react";

import TimePersonComponent from "../HourMinutePicker/HourMinutePeoplePicker";
import { PeopleArr } from "../../../../core/ImportantVariables/variables";

interface PeopleAmountPickerProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  people: number;
}

export function PeopleAmountPicker({
  onChange,
  people,
}: PeopleAmountPickerProps) {
  let peopleArr = generatePeopleNumberArr();

  return (
    <TimePersonComponent
      onChange={onChange}
      optionMapping={PeopleArr.map((person, i) => (
        <option
          key={i}
          selected={peopleArr[i] === people}
        >{`👨 ${peopleArr[i]} ${person}`}</option>
      ))}
    />
  );
}

function generatePeopleNumberArr(): number[] {
  const amountOfPeopleToShow = 21;
  return Array.from({ length: amountOfPeopleToShow }, (_, indx) => indx + 1);
}
