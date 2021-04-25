import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AlertIcon } from "../../../../../images/alert-circle.svg";
import "./Confirmation.css";

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
        <h6 className="modalMainText">Ups! Coś poszło nie tak!</h6>
        <p className="modalSecondaryText">
          Nie udało się potwierdzić twojej rezerwacji. Sprawdź swoje połączenie
          internetowe i spróbuj ponownie.
        </p>
        <button className="modalCloseButton" onClick={() => onClose()}>
          OK
        </button>
      </div>
    </>
  );
};
