import React from "react";
import "./StepToMakeReservation.css";

export function StepToMakeReservation({ SVG, inputText }: any) {
  return (
    <div
      style={{
        display: "flex",

        alignItems: "center",
        margin: "70px",
      }}
    >
      <SVG style={{ fill: "#575F98", width: "80px", height: "80px" }} />
      <div
        style={{
          fontSize: "25px",
          marginLeft: "40px",
          wordWrap: "break-word",
          width: "40vw",
        }}
      >
        {inputText}
      </div>
    </div>
  );
}
