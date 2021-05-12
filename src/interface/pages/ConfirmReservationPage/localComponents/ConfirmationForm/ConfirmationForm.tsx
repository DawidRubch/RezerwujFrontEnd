import React from "react";
import { InformationInput } from "../InformationInput/InformationInput";
import "./ConfirmationForm.scss";
export const ConfirmationForm = ({ inputObject, onFormSubmit }: any) => {
  return (
    <form className="confirmation-form">
      <InformationInput
        autoComplete={"first name"}
        name="fname"
        placeHolder={"Imię"}
        onChange={inputObject.setNameInput}
        value={inputObject.nameInput}
        required={true}
      />
      <InformationInput
        autoComplete={"last name"}
        name="lname"
        placeHolder={"Nazwisko"}
        onChange={inputObject.setSurNameInput}
        value={inputObject.surNameInput}
        required={true}
      />
      <InformationInput
        autoComplete="tel"
        name="phone"
        placeHolder={"Telefon"}
        onChange={inputObject.setNumberInput}
        value={inputObject.numberInput}
        required={true}
      />
      <InformationInput
        autoComplete="email"
        name="email"
        placeHolder={"Email"}
        onChange={inputObject.setEmailInput}
        value={inputObject.emailInput}
      />
      <button
        onSubmit={() => onFormSubmit()}
        className="confirm-reservation-button"
      >
        Potwierdź rezerwację
      </button>
    </form>
  );
};
