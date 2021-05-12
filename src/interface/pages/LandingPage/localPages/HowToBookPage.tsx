import React from "react";
import { StepToMakeReservation } from "../localComponents/StepToMakeReservation";
import "./HowToBookPage.css";
import { ReactComponent as EnterIcon } from "../../../../images/enter.svg";
import { ReactComponent as ListIcon } from "../../../../images/choices.svg";
import { ReactComponent as RestaurantIcon } from "../../../../images/restaurant.svg";
import { ReactComponent as TwoPeopleAtRestaurantVector } from "../../../../images/PeopleAtRestaurant.svg";
export default function HowToBookPage() {
  return (
    <div style={{ backgroundColor: "white" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "0px",
          flexDirection: "column",
        }}
      >
        <div className="topText">
          <div>Jak to działa?</div>
        </div>
        <b className="instructionHeading">
          Od zarezerwowania stolika dzielą cie 3 kroki!
        </b>
      </div>
      <div className="threePointsContainerWithVectorGraphic">
        <div className="threePointsContainer">
          <StepToMakeReservation
            SVG={EnterIcon}
            inputText="Wpisz datę, godzinę, liczbę osób. Opcjonalnie adres." 
            boldText= "Obecnie działamy tylko na terenie Szczecina."
            />                  
            <StepToMakeReservation
            SVG={ListIcon}
            inputText="Z listy miejsc wybierz te najbardziej odpowiednie i najlepiej pasujący dla ciebie termin!"
          />
          <StepToMakeReservation
            SVG={RestaurantIcon}
            inputText="Potwierdź swoje zamówienie i ciesz się przyjemnie spędzonym czasem!"
          />
        </div>
        <TwoPeopleAtRestaurantVector
          className="vectorGraphic"
        />
      </div>
    </div>
  );
}
