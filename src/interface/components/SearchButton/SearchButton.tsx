import React from "react";
import "./SearchButton.scss";
import { Link } from "react-router-dom";
import { useSearchQuery } from "hooks";
import { Routes } from "routes";
import { generateSearchQ } from "utils";

type AdditionalClassName =
  | "searchbar__list__search__button"
  | "searchButton--landing";
interface SearchButtonProps {
  searchParams?: string;
  onPressed?: () => void;
  additionalClassName?: AdditionalClassName;
}

const pathname = Routes.RESTAURANTS_ARRAY;

export function SearchButton({
  onPressed,
  additionalClassName,
}: SearchButtonProps) {
  const { people, date } = useSearchQuery();

  //Changing data to search query string
  const search = generateSearchQ({
    date,
    people,
  });

  return (
    <Link
      to={{
        pathname,
        search,
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
