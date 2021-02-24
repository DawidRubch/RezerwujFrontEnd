import React from "react";
import "./SearchButton.css";
import { Link } from "react-router-dom";

interface SearchButtonProps {
  searchParams: string;
  onPressed?: any;
}
export function SearchButton({ searchParams, onPressed }: SearchButtonProps) {
  return (
    <Link
      to={{
        pathname: "/lista-restauracji",
        search: searchParams,
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "left", marginLeft: "70px" }}
      >
        <button className="search-button" onClick={onPressed}>
          Szukaj
        </button>
      </div>
    </Link>
  );
}
