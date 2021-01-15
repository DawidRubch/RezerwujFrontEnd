import React, { ChangeEvent } from "react";

import { useSelector } from "react-redux";
import TimePersonComponent from "../HourMinutePicker/HourMinutePeoplePicker";
import { PeopleArr } from "../../../core/ImportantVariables/variables";

interface PeopleAmountPickerProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function PeopleAmountPicker(props: PeopleAmountPickerProps) {
  const dispatcher: any = useSelector((state) => state);
  let peopleArr = generatePeopleNumberArr();

  return (
    <TimePersonComponent
      onChange={props.onChange}
      optionMapping={PeopleArr.map((people, i) => (
        <option
          selected={peopleArr[i] === dispatcher.people}
        >{`👨 ${peopleArr[i]} ${people}`}</option>
      ))}
    ></TimePersonComponent>
  );
}

function generatePeopleNumberArr(): number[] {
  let arr = [];
  for (var x = 1; x <= 21; x++) {
    arr.push(x);
  }
  return arr;
}
