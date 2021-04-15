import React from "react";
import "./CalendarLocationContainer.css";
interface CalendarLocationContainerProps {
  className: string;
  leadingIcon: JSX.Element;

  //Optional parameters
  onClick?: () => void;
  styling?: any;

  //Childrens are any additional elements that have to be put inside the element
  children?: React.ReactNode;
}

export default function CalendarLocationContainer({
  className,
  styling,
  onClick,
  leadingIcon,
  children,
}: CalendarLocationContainerProps) {
  return (
    <div style={{ cursor: "pointer" }}>
      <a
        data-testid="calendar-button"
        className={className}
        style={styling}
        onClick={onClick}
      >
        <span className="icon-button">{leadingIcon}</span>
        {children}
      </a>
    </div>
  );
}
