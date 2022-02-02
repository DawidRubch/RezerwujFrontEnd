import React from "react";
import "./InformationInput.scss";

export enum InputNames {
  Name = "fname",
  phoneNumber = "phoneNumber",
  additionalInfo = "additionalInfo",
}

interface InformationInputInterface {
  placeHolder: string;
  value: string;
  onChange: (inputValue: string) => void;
  name: InputNames;
  maxLength: number;
  isAdditionalInfoInput?: boolean;
  autoComplete?: string;
  pattern?: string;
  errorTitle?: string;
  required?: boolean;
  onlyNumber?: boolean;
}

const ONLY_NUMBER_REGEX = /^[0-9]*$/;

export function InformationInput({
  placeHolder,
  value,
  onChange,
  autoComplete,
  name,
  maxLength,
  isAdditionalInfoInput,
  pattern,
  errorTitle,
  required,
}: InformationInputInterface) {
  //FunctionExecuted on input change
  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const isNumber = inputText.match(ONLY_NUMBER_REGEX);

    if (name === InputNames.phoneNumber) {
      onChange(isNumber ? inputText : "");
    } else {
      onChange(inputText);
    }
  };
  return (
    <input
      className={`information-input${
        isAdditionalInfoInput ? "_additional-info-input" : ""
      }`}
      name={name}
      autoComplete={autoComplete}
      value={value}
      onChange={inputOnChange}
      placeholder={placeHolder}
      pattern={pattern}
      title={errorTitle}
      required={required}
      maxLength={maxLength}
    />
  );
}
