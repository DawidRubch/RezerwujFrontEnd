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
import {
  useSaveBookTimeMutation,
  useSearchQuery,
  useGetRestaurantQuery,
} from "hooks";
import { trackEvent } from "services";
import { Action, Category } from "types/enums";
import { BookTime } from "types/types";
import { getHourAndDateFromDateString } from "utils/getHourAndDateFromDateString";

interface LocationState {
  restaurantOrPub: RestaurantOrPub;
  bookTime: BookTime;
}

export function ConfirmReservationPage(): JSX.Element {
  const { state } = useLocation<LocationState | undefined>();

  const { date, people, name, bookTime } = useSearchQuery();

  const { mutate } = useSaveBookTimeMutation();

  const { data, isLoading, isError } = useGetRestaurantQuery();

  const { hour, date: dateString } = getHourAndDateFromDateString(
    date as string
  );

  //@todo move this to some useForm hook
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationSuccess, setConfirmationSuccess] = useState(false);
  const [personName, setName] = useState("");
  const [number, setNumber] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const restaurantName = name?.toString() ?? "";

  const onConfirm = async (event: FormEvent) => {
    event.preventDefault();

    mutate(
      {
        bookTime,
        name: restaurantName,
        personName,
        number,
        additionalInfo,
      },
      {
        onSuccess: (data) => {
          if (data.status === 200) {
            setConfirmationSuccess(true);
            setModalOpen(true);
          }
        },
        onError: (error) => {
          alert(error);
        },
      }
    );

    trackEvent({
      category: Category.RESERVATION,
      action: Action.SAVED_RESERVATION,
    });
  };

  if (isLoading && !state) {
    return <Loader marginTop={50} size={150} />;
  }

  if (isError) {
    //@todo implement a error screen
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <main className="main-container">
        <div className="reservation-container">
          <header className="image-and-restaurant-info">
            <img
              className="restaurant-image"
              alt="retaurant"
              src={state?.restaurantOrPub.image || data?.image}
            />
            <RoPNameAndBookTimeInfo
              dateString={dateString.toString()}
              people={people.toString()}
              name={restaurantName}
              hour={hour.toString()}
            />
          </header>
          <form className="confirmation-form" onSubmit={onConfirm}>
            <InformationInput
              maxLength={10}
              autoComplete="first name"
              name={InputNames.Name}
              placeHolder="Imię"
              onChange={setName}
              value={personName}
              required
            />
            <InformationInput
              maxLength={9}
              autoComplete="tel"
              name={InputNames.phoneNumber}
              placeHolder="Numer telefonu"
              onChange={setNumber}
              value={number}
              pattern="[0-9]{9}"
              errorTitle="Numer musi składać się z 9 cyfr!"
              onlyNumber
              required
            />
            <InformationInput
              maxLength={40}
              name={InputNames.additionalInfo}
              placeHolder="Dodatkowe informacje (opcjonalnie)"
              onChange={setAdditionalInfo}
              value={additionalInfo}
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
