import React, { FormEvent, useEffect, useState } from "react";
import "./ConfirmReservationPage.scss";
import { Loader } from "interface/components";
import { useLocation } from "react-router-dom";
import {
  AdditionalRestaurantInfo,
  ConfirmationModal,
  InformationInput,
  InputNames,
  RoPNameAndBookTimeInfo,
} from "./localComponents";
import { RestaurantOrPub } from "core";
import { useSearchQuery } from "hooks";
import { trackEvent } from "data";
import { RestaurantOrPubRepository } from "domain/index";
import { Action, Category } from "types/enums";
import { BookTime } from "types/types";

const restaurantOrPubRepository = new RestaurantOrPubRepository();

interface LocationState {
  restaurantOrPub: RestaurantOrPub;
  bookTime: BookTime;
}

export function ConfirmReservationPage(): JSX.Element {
  const { state } = useLocation<LocationState>();

  const { dateString, hour, people, name } = useSearchQuery();

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationSuccess, setConfirmationSuccess] = useState(false);
  const [personName, setName] = useState("");
  const [number, setNumber] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const restaurantName = name ? name.toString() : state.restaurantOrPub.name;

  const onConfirm = async (event: FormEvent) => {
    event.preventDefault();

    //Saving book time to database
    const response = await restaurantOrPubRepository.saveBookTime(
      state.bookTime,
      restaurantName,
      number,
      personName,
      additionalInfo
    );

    if (response.data === "Success") {
      setConfirmationSuccess(true);
    }
    setModalOpen(true);

    trackEvent({
      category: Category.RESERVATION,
      action: Action.SAVED_RESERVATION,
    });
  };

  if (state) {
    return (
      <>
        <main className="main-container">
          <div className="reservation-container">
            <header className="image-and-restaurant-info">
              <RoPImage locationState={state} />
              <RoPNameAndBookTimeInfo
                dateString={dateString.toString()}
                people={people.toString()}
                name={restaurantName}
                hour={hour.toString()}
              />
            </header>
            <form className="confirmation-form" onSubmit={onConfirm}>
              <InformationInput
                autoComplete="first name"
                name={InputNames.Name}
                placeHolder="Imię"
                onChange={setName}
                value={personName}
                required
              />
              <InformationInput
                autoComplete="tel"
                name={InputNames.phoneNumber}
                placeHolder="Telefon"
                onChange={setNumber}
                value={number}
                pattern=".{9,}"
                errorTitle="Numer musi składać się z 9 cyfr!"
                required
              />
              <InformationInput
                name={InputNames.additionalInfo}
                placeHolder="Dodatkowe informacje (opcjonalnie)"
                onChange={setAdditionalInfo}
                value={additionalInfo}
                required
                isAdditionalInfoInput
              />
              <button type="submit" className="confirm-reservation-button">
                Potwierdź rezerwację
              </button>
            </form>
          </div>
          <AdditionalRestaurantInfo />
        </main>
        <ConfirmationModal
          open={modalOpen}
          success={confirmationSuccess}
          onClose={() => setModalOpen(false)}
        />
      </>
    );
  }
  return <Loader />;
}

//Place image
const RoPImage = ({ locationState }: any) => (
  <img
    className="restaurant-image"
    alt="retaurant"
    src={locationState.image || locationState.restaurantOrPub.image}
  />
);
