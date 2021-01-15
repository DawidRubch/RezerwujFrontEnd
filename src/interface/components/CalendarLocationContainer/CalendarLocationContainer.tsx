import React from "react";
import "./CalendarLocationContainer.css";
interface CalendarLocationContainerProps {
  onClick?: () => void;
  styling?: any;
  className: string;
  leadingIcon: JSX.Element;
  //Child is an any additional elements that have to be put inside the element
  children?: React.ReactNode;
}

export default function CalendarLocationContainer(
  Props: CalendarLocationContainerProps
) {
  return (
    <a
      className={Props.className}
      style={Props.styling}
      href="#"
      onClick={Props.onClick}
    >
      <span className="icon-button">{Props.leadingIcon}</span>
      {Props.children}
    </a>
  );
}
