import React from "react";
import "./SearchButton.scss";
import { Link } from "react-router-dom";
import { useGlobalVariables } from "../../../core/Helper/ReduxCustomHooks/useGlobalVariables";
import { mapPropToSearchQuery } from "../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";

interface SearchButtonProps {
  searchParams?: string;
  onPressed?: any;
  additionalClassName?: string;
}
export function SearchButton({
  onPressed,
  additionalClassName,
}: SearchButtonProps) {
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
      to={{
        pathname,
        search: mappingPropsToSearchQuery,
      }}
    >
      <button
        className={`search-button ${additionalClassName}`}
        onClick={onPressed}
      >
        Szukaj
      </button>
    </Link>
  );
}
