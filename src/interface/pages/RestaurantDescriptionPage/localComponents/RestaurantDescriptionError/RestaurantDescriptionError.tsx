import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ErrorImage } from "../../../../../images/error.svg";
import "./RestaurantDescriptionError.scss";

export function RestaurantDescriptionError() {
    return (
        <div className="restaurantDescriptionError" >
            <div className="restaurantDescriptionError__imageContainer" >
                <ErrorImage className="restaurantDescriptionError__imageContainer__img" />
            </div>
            <p className="restaurantDescriptionError__message" >
                Przepraszamy, coś poszło nie tak!
                <br />
                Wróć do <Link className="restaurantDescriptionError__message_link" to="/"> strony głównej </Link> i spróbuj jeszcze raz!
            </p>
        </div>
    )
}
