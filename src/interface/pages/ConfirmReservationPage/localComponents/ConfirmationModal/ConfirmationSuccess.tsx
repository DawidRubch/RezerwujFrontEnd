import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CheckIcon } from "../../../../../images/check-circle.svg";
import "./Confirmation.scss";

export const ConfirmationSuccess = () => {
  return (
    <>
      <div className="modalIconContainer">
        <CheckIcon className="modalIconContainer__Icon" />
      </div>
      <div className="modalContent">
        <h6 className="modalContent__mainText modalContent__mainText_success">
          Dziękujemy!
        </h6>
        <p className="modalContent__text">
          Wysłaliśmy zapytanie do restauracji. <br /> Proszę oczekiwać SMS z
          potwierdzeniem.
        </p>
        <span className="modalContent__redirectLabel">
          Powrót do
          <Link className="modalContent__redirectLink" to="/">
            strony głównej.
          </Link>
        </span>
      </div>
    </>
  );
};
