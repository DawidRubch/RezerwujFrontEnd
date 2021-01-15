/*global google*/
import React, { useEffect, useState } from "react";
import { ReactComponent as PlaceIcon } from "../../../images/placeIc.svg";
import PlacesAutocomplete, { Suggestion } from "react-places-autocomplete";
import "./LocationInput.css";
import CalendarLocationContainer from "../CalendarLocationContainer/CalendarLocationContainer";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../../../stateManagment/action";

interface LocationInputProps {
  address: string;
  setAddress: any;
}

export default function LocationInput(props: LocationInputProps) {
  //Redux hooks
  const dispatch = useDispatch();
  const dispatcher: any = useSelector((state) => state);

  //React hooks
  const [searchOptions, setSearchOptions] = useState<any>();

  useEffect(() => {
    setSearchOptions({
      location: new google.maps.LatLng(53.4289, 14.553),
      radius: 20000,
      types: ["address"],
    });
  }, []);

  useEffect(() => {
    dispatch(updateLocation(props.address));
  }, [props.address]);

  //Method for location input
  const onChange = (value: string) => {
    props.setAddress(value);
    dispatch(updateLocation(value));
  };

  return (
    <div>
      <PlacesAutocomplete
        value={dispatcher.location}
        onChange={onChange}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <CalendarLocationContainer
              className="menu-item location"
              leadingIcon={<PlaceIcon></PlaceIcon>}
              styling={{ borderRadius: loading ? "8px 8px 0 0" : "8px" }}
            >
              <input
                {...getInputProps({
                  placeholder: "Adres, np. Plac Rodła",
                })}
              />
            </CalendarLocationContainer>

            <div style={{ position: "absolute" }}>
              <div style={{ marginLeft: "19px" }}>
                {filterAndMapSuggestions(suggestions, getSuggestionItemProps)}
              </div>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
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
      <div {...getSuggestionItemProps(suggestion, { style })}>
        {suggestion.description.replace(", Poland", "")}
      </div>
    );
  });
  return suggestionsArray;
}
