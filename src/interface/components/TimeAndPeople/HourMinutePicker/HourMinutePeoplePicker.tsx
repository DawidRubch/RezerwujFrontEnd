import React, { ChangeEvent } from "react";
import "./HourMinutePeoplePicker.css";
interface TimePersonComponent {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  defaultValAndOptionsArr: [string, JSX.Element[]];
}

export default function TimePersonComponent({
  onChange,
  defaultValAndOptionsArr,
}: TimePersonComponent) {
  const [defaultValue, optionsArray] = defaultValAndOptionsArr;

  return (
    <div className="people-hour" >
      <select data-testid="select" defaultValue={defaultValue} onChange={onChange}>
        {optionsArray}
      </select>
    </div>
  );
}
