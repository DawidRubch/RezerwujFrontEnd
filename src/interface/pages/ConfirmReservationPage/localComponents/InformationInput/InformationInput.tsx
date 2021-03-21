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
      name={name}
      autoComplete={autoComplete}
      value={value}
      onChange={inputOnChange}
      style={{
        border: "solid 1px",
        height: "50px",
        width: "300px",
        padding: "2px 10px ",
        opacity: "0.51",
        borderRadius: "8px",
        fontSize: "20px",
      }}
      placeholder={placeHolder}
    />
  );
}
