import React from "react";
import "./StepToMakeReservation.css";

export function StepToMakeReservation({ SVG, inputText }: any) {
  return (
    <div className="textAndIconContainer">
      <SVG className="icon" />
      <div className="text">{inputText}</div>
    </div>
  );
}
