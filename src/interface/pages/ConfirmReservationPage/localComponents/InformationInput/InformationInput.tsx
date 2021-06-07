import React from "react";
import "./InformationInput.css";
interface InformationInputInterface {
  placeHolder: string;
  value: any;
  onChange: any;
  autoComplete: string;
  name: string;
}
export function InformationInput({
  placeHolder,
  value,
  onChange,
  autoComplete,
  name,
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
    />
  );
}
