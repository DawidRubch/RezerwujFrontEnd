import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ErrorImage } from "../../../../../images/error.svg";
import "./RestaurantDescriptionError.css";

export function RestaurantDescriptionError() {
    return (
        <div className="RestaurantDescriptionError" >
            <div className="ErrorImageContainer" >
                <ErrorImage className="ErrorImage" />
            </div>
            <p className="ErrorMessage" >
                Przepraszamy, coś poszło nie tak!
                <br />
                Wróć do <Link className="ErrorMessage_Link" to="/"> strony głównej </Link> i spróbuj jeszcze raz!
            </p>
        </div>
    )
}
