/*global google*/
import React, { useEffect, useState } from "react";
import { ReactComponent as PlaceIcon } from "../../../../images/placeIc.svg";
import PlacesAutocomplete, { Suggestion } from "react-places-autocomplete";
import "./LocationInput.css";
import CalendarLocationContainer from "../CalendarLocationContainer/CalendarLocationContainer";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../../../../stateManagment/action";
import { useSearchParams } from "../../../../core/Helper/SearchQuery/useSearchParams";
import { useHistory } from "react-router-dom";
import { mapPropToSearchQuery } from "../../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";

export function LocationInput() {
  const history = useHistory();
  //Redux hooks
  const dispatch = useDispatch();
  const { location, hour, date, people }: any = useSelector((state) => state);
  const { locationParam, hourParam }: any = useSearchParams();
  //React hooks
  const [searchOptions, setSearchOptions] = useState<any>();

  useEffect(() => {
    setSearchOptions({
      location: new google.maps.LatLng(53.4289, 14.553),
      radius: 20000,
      types: ["address"],
    });
  }, []);

  console.log(location, hour, date, people);

  //Method for location input
  const onChange = (value: string) => {
    dispatch(updateLocation(value));
    history.push({
      search: mapPropToSearchQuery(value, date, hour, people),
    });
  };

  return (
    <div>
      <PlacesAutocomplete
        value={location || locationParam}
        onChange={onChange}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <CalendarLocationContainer
              className="menu-item location"
              leadingIcon={<PlaceIcon />}
            >
              <input
                {...getInputProps({
                  placeholder: "Adres, np. Plac Rodła",
                })}
              />
            </CalendarLocationContainer>

            <div style={{ position: "absolute", marginLeft: "19px" }}>
              {filterAndMapSuggestions(suggestions, getSuggestionItemProps)}
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
