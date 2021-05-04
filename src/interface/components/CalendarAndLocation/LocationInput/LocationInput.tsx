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

export function LocationInput() {
  //history hook is for redirecting or updating searchQuery
  const history = useHistory();
  //Redux hooks
  const dispatch = useDispatch();
  const { location, hour, date, people }: any = useSelector((state) => state);

  //React hooks
  const [searchOptions, setSearchOptions] = useState<any>();

  const settingSearchOptions = () => {
    //Location is created using latidute and longiture
    const location = new google.maps.LatLng(53.4289, 14.553);
    //Radius in meters
    const radius = 20000;

    //Array of location types, f.e. adress, restaurant etc.
    const types = ["address"];

    setSearchOptions({ location, radius, types });
  };

  useEffect(settingSearchOptions, []);

  //Method for location input
  const onChange = (value: string) => {
    dispatch(updateLocation(value));
    history.push({
      search: mapPropToSearchQuery(value, date, hour, people),
    });
  };

  //Function to generate options of locations to choose
  const generateLocationOptionsContainer = ({
    getInputProps,
    suggestions,
    getSuggestionItemProps,
  }: any) => (
    <>
      <CalendarLocationContainer
        className="menu-item location"
        leadingIcon={<PlaceIcon />}
      >
        <input className="calendarContainer__input"
          {...getInputProps({
            placeholder: "Adres, np. Plac Rodła",
          })}
        />
      </CalendarLocationContainer>

      <div style={{ position: "absolute", marginLeft: "19px" }}>
        {filterAndMapSuggestions(suggestions, getSuggestionItemProps)}
      </div>
    </>
  );

  return (
    <>
      <PlacesAutocomplete
        value={location}
        onChange={onChange}
        searchOptions={searchOptions}
      >
        {generateLocationOptionsContainer}
      </PlacesAutocomplete>
    </>
  );
}

function filterAndMapSuggestions(
  suggestions: readonly Suggestion[],
  getSuggestionItemProps: any
) {
  let suggestionsArray: JSX.Element[] = [];
  const suggestionsFromSzczecin = suggestions.filter((suggestion) =>
    suggestion.description.includes("Szczecin")
  );

  suggestionsFromSzczecin.map((suggestion) => {
    const style = {
      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",

      fontSize: "15px",
      width: "240px",
      margin: "1px",
      padding: "10px",
      borderColor: "grey",
      borderStyle: "ridge",
      borderWidth: "1px",
    };

    suggestionsArray.push(
      <div
        key={suggestion.id}
        {...getSuggestionItemProps(suggestion, { style })}
      >
        {suggestion.description.replace(", Poland", "")}
      </div>
    );
  });
  return suggestionsArray;
}
