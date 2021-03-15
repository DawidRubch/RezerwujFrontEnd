import React from "react";
import "./SearchButton.css";
import { Link } from "react-router-dom";

interface SearchButtonProps {
  searchParams: string;
  onPressed?: any;
}
export function SearchButton({ searchParams, onPressed }: SearchButtonProps) {
  return (
    <Link style={{width:"250px"}}
      to={{
        pathname: "/lista-restauracji",
        search: searchParams,
      }}
    >
      <button className="search-button" onClick={onPressed}>
        Szukaj
      </button>
    </Link>
  );
}
