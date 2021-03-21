import React from "react";
import "./SearchButton.css";
import { Link } from "react-router-dom";
import { useGlobalVariables } from "../../../core/Helper/ReduxCustomHooks/useGlobalVariables";
import { mapPropToSearchQuery } from "../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";

interface SearchButtonProps {
  searchParams?: string;
  onPressed?: any;
}
export function SearchButton({ searchParams, onPressed }: SearchButtonProps) {
  const { hour, location, people, date } = useGlobalVariables();

  //Changing data to search query string
  const mappingPropsToSearchQuery = mapPropToSearchQuery(
    location,
    date.toString(),
    hour,
    people.toString()
  );
  const pathname = "/lista-restauracji";
  return (
    <Link
      style={{ width: "250px" }}
      to={{
        pathname,
        search: mappingPropsToSearchQuery,
      }}
    >
      <button className="search-button" onClick={onPressed}>
        Szukaj
      </button>
    </Link>
  );
}
