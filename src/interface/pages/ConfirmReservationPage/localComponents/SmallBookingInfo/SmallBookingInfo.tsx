import React from "react";

interface SmallBookingInfoInterface {
  insideText: string;
  icon: JSX.Element;
}

export function SmallBookingInfo({
  insideText,
  icon,
}: SmallBookingInfoInterface) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {icon}
      <b style={{ margin: "10px" }}>{insideText}</b>
    </div>
  );
}
