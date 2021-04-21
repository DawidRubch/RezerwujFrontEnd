import React, { useEffect, useState } from "react";
import "./RestaurantDescriptionPage.css";
import { useLocation } from "react-router-dom";
import { BookingContainer } from "./localComponents/BookingContainer/BookingContainer";
import { useBookTimeAndNameSearchParams } from "../../../core/Helper/SearchQuery/useBookTimeSearchParams";
import { RestaurantDescriptionPageFunctions } from "../../../InterfaceFunctions/PagesFunctions/RestaurantDescriptionPage/RestaurantDescriptionPageFunctions";
import { RestaurantDescriptionContainer } from "./localComponents/RestaurantDescriptionContainer/RestaurantDescriptionContainer";

export default function RestaurantDescriptionPage() {
  //State passed from RestaurantArraysPage, when pressed on the restaurant name
  //Should have interfaces
  let { state }: any = useLocation();

  //Params from search query
  const { bookTime, name } = useBookTimeAndNameSearchParams();

  //Information consists of tags, descriptionPageImage,
  // name, type,shortDescription, alternative book time array
  //This should be implemented with a interface
  const [information, setInformation] = useState<any>();

  //Repository with Functions for this page
  let restaurantDescriptionPageFunctions = new RestaurantDescriptionPageFunctions(
    state,
    bookTime,
    name,
    setInformation,
    information
  );

  useEffect(restaurantDescriptionPageFunctions.manageState, []);

  if (information) {
    return (
      <>
        <ImageContainer information={information} />
        <div className="mainContainer">
          <RestaurantDescriptionContainer
            information={information}
            mobileBookingComponent={
              <BookingContainer
                state={information}
                alternativeBookingHours={
                  restaurantDescriptionPageFunctions.mappingAltBookingHoursToBookTimeComponents
                }
                nameString={information?.name}
              />
            }
          />
          <div className="restaurantBookingContainer">
            <BookingContainer
              state={information}
              alternativeBookingHours={
                restaurantDescriptionPageFunctions.mappingAltBookingHoursToBookTimeComponents
              }
              nameString={information?.name}
            />
          </div>
          <div className="viewportBottomFakeMargin"></div>
        </div>
      </>
    );
  }
  return (
    <h1 className="restaurantDescriptionAlert">Opis restauracji niedostępny</h1>
  );
}

//ImageContainer
const ImageContainer = ({ information }: any) => (
  <div className="imgContainer">
    <img className="restaurantImage" src={information?.descriptionPageImg} />
  </div>
);
