/*global google*/
import React from "react";
import { ReactComponent as PlaceIcon } from "../../../../images/placeIc.svg";
import "./LocationInput.scss";
import CalendarLocationContainer from "../CalendarLocationContainer/CalendarLocationContainer";

//Location Input component is currently usused

export const LocationInput = () => (
  <CalendarLocationContainer
    className="menu-item location"
    leadingIcon={<PlaceIcon />}
  >
    <select>
      <option>Szczecin</option>
    </select>
  </CalendarLocationContainer>
);
