/*global google*/
import React, { useEffect, useState } from "react";
import { ReactComponent as PlaceIcon } from "../../../../images/placeIc.svg";
import PlacesAutocomplete, { Suggestion } from "react-places-autocomplete";
import "./LocationInput.scss";
import CalendarLocationContainer from "../CalendarLocationContainer/CalendarLocationContainer";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../../../../stateManagment/action";
import { useHistory } from "react-router-dom";
import { mapPropToSearchQuery } from "../../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";

//Location Input component is currently usused
export function LocationInput() {
  //history hook is for redirecting or updating searchQuery
  const history = useHistory();
  //Redux hooks
  const dispatch = useDispatch();
  const { location, hour, date, people }: any = useSelector((state) => state);

  //Function to generate options of locations to choose

  return (
    <CalendarLocationContainer
      className="menu-item location"
      leadingIcon={<PlaceIcon />}
    >
      <select>
        <option>Szczecin</option>
      </select>
    </CalendarLocationContainer>
  );
}
