import React from "react";
import "./SearchButton.css";
import { Link } from "react-router-dom";

interface SearchButtonProps {
  onPressed?: any;
}
export default function SearchButton(props: SearchButtonProps) {
  return (
    <Link
      to={{
        pathname: "/lista-restauracji",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="search-button" onClick={props.onPressed}>
         Szukaj
        </button>
      </div>
    </Link>
  );
}
