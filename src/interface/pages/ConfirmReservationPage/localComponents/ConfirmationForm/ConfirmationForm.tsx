import React from "react";
import {
  InformationInput,
  InputNames,
} from "../InformationInput/InformationInput";
import "./ConfirmationForm.scss";
export const ConfirmationForm = ({ inputObject, onSubmit }: any) => {
  return (
    <form className="confirmation-form" onSubmit={(event) => onSubmit(event)}>
      <InformationInput
        autoComplete="first name"
        name={InputNames.Name}
        placeHolder="Imię"
        onChange={inputObject.setNameInput}
        value={inputObject.nameInput}
        required
      />
      <InformationInput
        autoComplete="tel"
        name={InputNames.phoneNumber}
        placeHolder="Telefon"
        onChange={inputObject.onNumberInputChange}
        value={inputObject.numberInput}
        pattern=".{9,}"
        errorTitle="Numer musi składać się z 9 cyfr!"
        required
      />
      <InformationInput
        name={InputNames.additionalInfo}
        placeHolder="Dodatkowe informacje (opcjonalnie)"
        onChange={inputObject.setAdditionalInfo}
        value={inputObject.additionalInfo}
        required
        isAdditionalInfoInput
      />
      {/* <InformationInput
        autoComplete="email"
        name="email"
        placeHolder={"Email"}
        onChange={inputObject.setEmailInput}
        value={inputObject.emailInput}
      />
      <InformationInput
        autoComplete={"last name"}
        name="lname"
        placeHolder={"Nazwisko"}
        onChange={inputObject.setSurNameInput}
        value={inputObject.surNameInput}
        required={true}
      /> */}
      <button type="submit" className="confirm-reservation-button">
        Potwierdź rezerwację
      </button>
    </form>
  );
};
