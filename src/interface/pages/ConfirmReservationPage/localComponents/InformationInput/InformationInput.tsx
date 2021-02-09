import React from "react";
import "./InformationInput.css";
interface InformationInputInterface {
  placeHolder: string;
}
export function InformationInput({ placeHolder }: InformationInputInterface) {
  return (
    <input
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
