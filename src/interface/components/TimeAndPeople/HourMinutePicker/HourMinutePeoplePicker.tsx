import React from "react";
import Select, { components } from "react-select";
import { ReactComponent as ClockIcon } from "../../../../images/clock.svg";
import { ReactComponent as PersonIcon } from "../../../../images/person.svg";
import "./HourMinutePeoplePicker.scss";

interface TimePersonComponentProps {
  onChange: (e: any) => void;
  defaultValAndOptionsArr: [JSX.Element, JSX.Element[]];
  type: "time" | "people";
}

export default function TimePersonComponent({
  onChange,
  defaultValAndOptionsArr,
  type,
}: TimePersonComponentProps) {
  const [defaultValue, optionsArray] = defaultValAndOptionsArr;

  const { Option } = components;

  const customOptionComponent = (props: any) => (
    <Option {...props}>
      <div className="people-hour__optionContent">
        {type === "time" ? (
          <ClockIcon className="people-hour__optionContent__icon" />
        ) : (
          <PersonIcon className="people-hour__optionContent__icon" />
        )}
        <span className="people-hour__optionContent__label">
          {props.data.label}
        </span>
      </div>
    </Option>
  );

  const customSingleValueComponent = ({ data }: any) => (
    <div className="people-hour__singleVal">
      <div className="people-hour__singleVal__content">
        {data.icon && (
          <span className="people-hour__singleVal__content__icon">
            {data.icon}
          </span>
        )}
        <span className="people-hour__singleVal__content__label">
          {data.label}
        </span>
      </div>
    </div>
  );

  const customSelectStyles = {
    control: (styles: any) => ({
      ...styles,
      height: "50px",
      border: "none",
      borderRadius: "8px",
      boxShadow:
        "0 12px 16px 0 rgb(0 0 0 / 24%), 0 17px 50px 0 rgb(0 0 0 / 19%);",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "lightgray",
      },
    }),
    indicatorsContainer: (styles: any) => ({
      ...styles,
      display: "none",
    }),
  };

  return (
    <Select
      options={optionsArray}
      data-testid="select"
      defaultValue={defaultValue}
      onChange={(event: any) => onChange(event)}
      components={{
        Option: customOptionComponent,
        SingleValue: customSingleValueComponent,
      }}
      styles={customSelectStyles}
    >
      {optionsArray}
    </Select>
  );
}
