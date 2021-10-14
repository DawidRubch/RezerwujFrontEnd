import React from "react";
import "./SearchButton.scss";
import { Link } from "react-router-dom";
import { useSearchQuery } from "hooks";
import { generateSearchQueryFromObject } from "core";
import { Routes } from "routes";

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
  const { hour, people, dateString } = useSearchQuery();

  //Changing data to search query string
  const search = generateSearchQueryFromObject({
    dateString,
    hour,
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
