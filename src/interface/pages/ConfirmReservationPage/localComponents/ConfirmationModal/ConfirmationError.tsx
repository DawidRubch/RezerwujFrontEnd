import React from "react";
import { ReactComponent as AlertIcon } from "../../../../../images/alert-circle.svg";
import "./Confirmation.scss";

interface ConfirmationErrorProps {
  onClose: () => void;
}

export const ConfirmationError = ({ onClose }: ConfirmationErrorProps) => {
  return (
    <>
      <div className="modalIconContainer">
        <AlertIcon className="modalIconContainer__Icon" />
      </div>
      <div className="modalContent">
        <h6 className="modalContent__mainText modalContent__mainText_err">
          Ups! Coś poszło nie tak!
        </h6>
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
