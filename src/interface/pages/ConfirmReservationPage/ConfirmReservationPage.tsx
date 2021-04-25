import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./ConfirmReservationPage.css";
import { AdditionalRestaurantInfo } from "./localComponents/AdditionalRestaurantInfo/AdditionalRestaurantInfo";
import { BookTime } from "../../../core/Entities";
import {
  useConfirmPageSearchQueriesAndState,
  useInput,
} from "../../../InterfaceFunctions/PagesFunctions/ConfirmReservationPageFunctions/ConfirmReservationHooks";
import ConfirmReservationFunctions from "../../../InterfaceFunctions/PagesFunctions/ConfirmReservationPageFunctions/ConfirmReservationFunctions";
import { AllInputsContainer } from "./localComponents/AllInputsContainer/AllInputsContainer";
import { RoPNameAndBookTimeInfo } from "./localComponents/RoPNameAndBookTimeInfo/RoPNameAndBookTimeInfo";
import { ConfirmationModal } from "./localComponents/ConfirmationModal/ConfirmationModal";
import { Loader } from "../../components/Loader/Loader";

export function ConfirmReservationPage(): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationSuccess, setConfirmationSuccess] = useState(false);
  const [redirectToMainPage, setRedirectToMainPage] = useState(false);

  const {
    minute,
    hour,
    day,
    month,
    year,
    people,
    state,
    name,
  } = useConfirmPageSearchQueriesAndState();

  //Creating bookTime object out of search query data
  let bookTime = new BookTime(+minute, +hour, +day, +month, +year, +people);

  //Repository with all functions for this component
  let confirmReservationFunctions = new ConfirmReservationFunctions(bookTime);

  //Input use state hooks
  const InputObject = useInput(state);

  const onConfirm = async () => {
    const response = await confirmReservationFunctions.onClickConfirmReservation(
      name,
      InputObject
    );

    if (response.data === "Success") {
      setConfirmationSuccess(true);
      setTimeout(() => {
        setRedirectToMainPage(true);
      }, 6000);
    }
    setModalOpen(true);
  };

  //Function runs only on component initial render
  useEffect(() => {
    confirmReservationFunctions.callsApiIfItDoesntHavePassedData(
      state,
      name,
      InputObject.setLocationState
    );
  }, []);

  if (redirectToMainPage) {
    return <Redirect to="/" />;
  }

  if (InputObject.locationState) {
    return (
      <>
        <div className="main-container">
          <div className="reservation-container">
            <div className="image-and-restaurant-info">
              <RoPImage inputObject={InputObject} />
              <RoPNameAndBookTimeInfo
                name={name.toString()}
                confirmReservationFunctions={confirmReservationFunctions}
              />
            </div>
            <AllInputsContainer inputObject={InputObject} />
            <button
              onClick={() => onConfirm()}
              className="confirm-reservation-button"
            >
              Potwierdź rezerwację
            </button>
          </div>
          <AdditionalRestaurantInfo />
        </div>
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
  let { locationState } = inputObject;
  return (
    <img
      className="restaurant-image"
      alt="Restaurant photo"
      src={locationState.image || locationState.restaurantOrPub.image}
    />
  );
};
