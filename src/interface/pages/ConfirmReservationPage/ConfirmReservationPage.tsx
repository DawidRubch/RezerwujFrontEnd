import React, { useEffect } from "react";
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

export function ConfirmReservationPage(): JSX.Element {
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
            onClick={() =>
              confirmReservationFunctions.onClickConfirmReservation(
                name,
                InputObject
              )
            }
            className="confirm-reservation-button"
          >
            Potwierdź rezerwację
          </button>
        </div>
        <AdditionalRestaurantInfo />
      </div>
    );
  }

  //Tutaj activity indicator
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      Activity Indicator
    </div>
  );
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
