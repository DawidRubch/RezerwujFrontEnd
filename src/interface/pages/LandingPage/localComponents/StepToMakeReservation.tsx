import React from "react";
import "./StepToMakeReservation.scss";

export function StepToMakeReservation({ SVG, inputText, boldText = "" }: any) {
  return (
    <div className="textAndIconContainer">
      <SVG className="textAndIconContainer__icon" />
      <div className="textAndIconContainer__text">
        {inputText}
        <br />
        <b>{boldText}</b>
      </div>
    </div>
  );
}
