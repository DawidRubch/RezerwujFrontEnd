import React from "react";
import { Link } from 'react-router-dom';
import { ReactComponent as AlertIcon } from "../../../../../images/alert-circle.svg";
import "./RestaurantDescriptionError.css";

export function RestaurantDescriptionError() {
    return (
        <div className="RestaurantDescriptionError" >
            <AlertIcon className="DescriptionErrorIcon" />
            <p className="DescriptionErrorMessage" >
                Przepraszamy, coś poszło nie tak!
                <br />
                Wróć do <Link className="DescriptionErrorLink" to="/"> strony głównej </Link> i spróbuj jeszcze raz!
            </p>
        </div>
    )
}
