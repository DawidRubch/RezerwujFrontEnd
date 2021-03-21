import React, { ChangeEvent } from "react";
import "./HourMinutePeoplePicker.css";
interface TimePersonComponent {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  optionMapping: JSX.Element[];
}

export default function TimePersonComponent({
  onChange,
  optionMapping,
}: TimePersonComponent) {
  return (
    <div className="people-hour">
      <div className="styled">
        <select onChange={onChange}>{optionMapping}</select>
      </div>
    </div>
  );
}
