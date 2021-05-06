import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CheckIcon } from "../../../../../images/check-circle.svg";
import "./Confirmation.scss";

export const ConfirmationSuccess = () => {
  return (
    <>
      <div className="modalIconContainer">
        <CheckIcon />
      </div>
      <div className="modalContent">
        <h6 className="modalContent__mainText">Dziękujemy za rezerwację!</h6>
        <p className="modalContent__text">
          Twoja rezerwacja w restauracji
          <mark className="modalContent__text__marked">RESTAURACJA</mark>w dniu
          <mark className="modalContent__text__marked">xx-xx-xxxx</mark>
          na
          <mark className="modalContent__text__marked">x osób</mark>
          została potwierdzona!
        </p>
        <span className="modalContent__redirectLabel">
          Za chwilę zostaniesz przekierowany do
          <Link className="modalContent__redirectLink" to="/">
            strony głównej.
          </Link>
        </span>
        <div className="modalContent__redirectBar"></div>
      </div>
    </>
  );
};
