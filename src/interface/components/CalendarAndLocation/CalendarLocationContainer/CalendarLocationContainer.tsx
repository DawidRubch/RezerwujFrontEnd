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
<<<<<<< HEAD
    <div data-testid="calendar-button" style={{ cursor: "pointer" }}>
=======
    <div className="calendarLocationContainer">
>>>>>>> 3a0b1598259530804f1c306250c3b5e84e08a75b
      <a className={className} style={styling} onClick={onClick}>
        <span className="icon-button">{leadingIcon}</span>
        {children}
      </a>
    </div>
  );
}
