import React from "react";
import { StepToMakeReservation } from "../localComponents/StepToMakeReservation";
import "./HowToBookPage.scss";
import { ReactComponent as EnterIcon } from "../../../../images/enter.svg";
import { ReactComponent as ListIcon } from "../../../../images/choices.svg";
import { ReactComponent as RestaurantIcon } from "../../../../images/restaurant.svg";
import { ReactComponent as TwoPeopleAtRestaurantVector } from "../../../../images/PeopleAtRestaurant.svg";
export default function HowToBookPage() {
  return (
    <aside className="howToBookPage">
      <header className="howToBookPage__header">
        <h3 className="howToBookPage__header__primaryText">Jak to działa?</h3>
        <h2 className="howToBookPage__header__secondaryText">
          Od zarezerwowania stolika dzielą cie 3 kroki!
        </h2>
      </header>
      <div className="howToBookPage__mainContainer">
        <section className="howToBookPage__threeStepsContainer">
          <StepToMakeReservation
            SVG={EnterIcon}
            inputText="Wpisz datę, godzinę, liczbę osób. Opcjonalnie adres."
            boldText="Obecnie działamy tylko na terenie Szczecina."
          />
          <StepToMakeReservation
            SVG={ListIcon}
            inputText="Z listy miejsc wybierz te najbardziej odpowiednie i najlepiej pasujący dla ciebie termin!"
          />
          <StepToMakeReservation
            SVG={RestaurantIcon}
            inputText="Potwierdź swoje zamówienie i ciesz się przyjemnie spędzonym czasem!"
          />
        </section>
        <TwoPeopleAtRestaurantVector className="howToBookPage__vectorGraphic" />
      </div>
    </aside>
  );
}
