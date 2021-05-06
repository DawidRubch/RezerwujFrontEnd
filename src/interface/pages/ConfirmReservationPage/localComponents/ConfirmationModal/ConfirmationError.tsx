import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AlertIcon } from "../../../../../images/alert-circle.svg";
import "./Confirmation.scss";

interface ConfirmationError {
  onClose: () => void;
}

export const ConfirmationError = ({ onClose }: ConfirmationError) => {
  return (
    <>
      <div className="modalIconContainer">
        <AlertIcon />
      </div>
      <div className="modalContent">
        <h6 className="modalContent__mainText">Ups! Coś poszło nie tak!</h6>
        <p className="modalContent__text">
          Nie udało się potwierdzić twojej rezerwacji. Sprawdź swoje połączenie
          internetowe i spróbuj ponownie.
        </p>
        <button className="modalContent__button" onClick={() => onClose()}>
          OK
        </button>
      </div>
    </>
  );
};
