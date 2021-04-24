import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CheckIcon } from "../../../../../images/check-circle.svg";
import "./Confirmation.css";

export const ConfirmationSuccess = () => {
  return (
    <>
      <div className="modalIconContainer">
        <CheckIcon />
      </div>
      <div className="modalContent">
        <h6 className="modalMainText">Dziękujemy za rezerwację!</h6>
        <p className="modalSecondaryText">
          Twoja rezerwacja w restauracji
          <mark className="modalMarkedText">RESTAURACJA</mark>w dniu
          <mark className="modalMarkedText">xx-xx-xxxx</mark>
          na
          <mark className="modalMarkedText">x osób</mark>
          została potwierdzona!
        </p>
        <span className="modalRedirectLabel">
          Za chwilę zostaniesz przekierowany do
          <Link className="modalRedirectLink" to="/">
            strony głównej.
          </Link>
        </span>
        <div className="modalRedirectProgressBar"></div>
      </div>
    </>
  );
};
