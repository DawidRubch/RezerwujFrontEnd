import React, { FormEvent, useEffect, useState } from "react";
import "./ConfirmReservationPage.scss";
import { AdditionalRestaurantInfo } from "./localComponents/AdditionalRestaurantInfo/AdditionalRestaurantInfo";
import { BookTime } from "../../../core/Entities";
import {
  useConfirmPageSearchQueriesAndState,
  useInput,
} from "../../../InterfaceFunctions/PagesFunctions/ConfirmReservationPageFunctions/ConfirmReservationHooks";
import ConfirmReservationFunctions from "../../../InterfaceFunctions/PagesFunctions/ConfirmReservationPageFunctions/ConfirmReservationFunctions";
import { ConfirmationForm } from "./localComponents/ConfirmationForm/ConfirmationForm";
import { RoPNameAndBookTimeInfo } from "./localComponents/RoPNameAndBookTimeInfo/RoPNameAndBookTimeInfo";
import { ConfirmationModal } from "./localComponents/ConfirmationModal/ConfirmationModal";
import { Loader } from "../../components/Loader/Loader";
import GA from "../../../data/trackers/GA";
import { Action, Category } from "../../../core/Interfaces/GAevent";

export function ConfirmReservationPage(): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationSuccess, setConfirmationSuccess] = useState(false);

  const { minute, hour, day, month, year, people, state, name } =
    useConfirmPageSearchQueriesAndState();

  //Creating bookTime object out of search query data
  let bookTime = new BookTime(+minute, +hour, +day, +month, +year, +people);

  //Repository with all functions for this component
  let confirmReservationFunctions = new ConfirmReservationFunctions(bookTime);

  //Input use state hooks
  const InputObject = useInput(state);

  const onConfirm = async (event: FormEvent) => {
    event.preventDefault();

    const response =
      await confirmReservationFunctions.onClickConfirmReservation(
        name,
        InputObject
      );

    if (response.data === "Success") {
      setConfirmationSuccess(true);
    }
    setModalOpen(true);

    GA.trackEvent({
      category: Category.RESERVATION,
      action: Action.SAVED_RESERVATION,
    });
  };

  //Function runs only on component initial render
  useEffect(() => {
    confirmReservationFunctions.callsApiIfItDoesntHavePassedData(
      state,
      name,
      InputObject.setLocationState
    );
  }, []);

  if (InputObject.locationState) {
    return (
      <>
        <main className="main-container">
          <div className="reservation-container">
            <header className="image-and-restaurant-info">
              <RoPImage inputObject={InputObject} />
              <RoPNameAndBookTimeInfo
                name={name.toString()}
                confirmReservationFunctions={confirmReservationFunctions}
              />
            </header>
            <ConfirmationForm inputObject={InputObject} onSubmit={onConfirm} />
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

  //Tutaj activity indicator
  return <Loader />;
}

//Place image
const RoPImage = ({ inputObject }: any) => {
  const { locationState } = inputObject;
  return (
    <img
      className="restaurant-image"
      alt="retaurant"
      src={locationState.image || locationState.restaurantOrPub.image}
    />
  );
};
