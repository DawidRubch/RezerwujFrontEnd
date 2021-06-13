import React from "react";
import "./InformationInput.scss";
interface InformationInputInterface {
  placeHolder: string;
  value: any;
  onChange: any;
  autoComplete: string;
  name: string;
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
  pattern,
  errorTitle,
  required,
}: InformationInputInterface) {
  //FunctionExecuted on input change
  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);
  return (
    <input
      className="information-input"
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
