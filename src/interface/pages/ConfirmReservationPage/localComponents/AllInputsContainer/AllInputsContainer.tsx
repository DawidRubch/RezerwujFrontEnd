import React from "react";
import { InformationInput } from "../InformationInput/InformationInput";
import "./AllInputsContainer.css";
export const AllInputsContainer = ({ inputObject }: any) => {
  return (
    <div className="input-container">
      <InformationInput
        autoComplete={"first name"}
        name="fname"
        placeHolder={"Imię"}
        onChange={inputObject.setNameInput}
        value={inputObject.nameInput}
      />
      <InformationInput
        autoComplete={"last name"}
        name="lname"
        placeHolder={"Nazwisko"}
        onChange={inputObject.setSurNameInput}
        value={inputObject.surNameInput}
      />
      <InformationInput
        autoComplete="tel"
        name="phone"
        placeHolder={"Telefon"}
        onChange={inputObject.setNumberInput}
        value={inputObject.numberInput}
      />
      <InformationInput
        autoComplete="email"
        name="email"
        placeHolder={"Email"}
        onChange={inputObject.setEmailInput}
        value={inputObject.emailInput}
      />
    </div>
  );
};
