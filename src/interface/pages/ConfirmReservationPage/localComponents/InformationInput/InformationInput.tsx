import React from "react";
import "./InformationInput.scss";
interface InformationInputInterface {
  placeHolder: string;
  value: string;
  onChange: (inputValue: string) => void;
  name: string;
  isAdditionalInfoInput?: boolean;
  autoComplete?: string;
  pattern?: string;
  errorTitle?: string;
  required?: boolean;
}
export function InformationInput({
  placeHolder,
  value,
  onChange,
  autoComplete,
  name,
  isAdditionalInfoInput,
  pattern,
  errorTitle,
  required,
}: InformationInputInterface) {
  //FunctionExecuted on input change
  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);
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
    />
  );
}
