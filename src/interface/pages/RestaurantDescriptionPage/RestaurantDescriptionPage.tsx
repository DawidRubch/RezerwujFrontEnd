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
      <div style={{ marginTop: "0.5em", borderRadius: "15px" }}>
        <ImageContainer information={information} />
        <div className="mainContainer">
          <RestaurantDescriptionContainer information={information} />
          <BookingContainer
            state={information}
            alternativeBookingHours={
              restaurantDescriptionPageFunctions.mappingAltBookingHoursToBookTimeComponents
            }
            nameString={information?.name}
          />
        </div>
      </div>
    );
  }
  return <div />;
}

//ImageContainer
const ImageContainer = ({ information }: any) => (
  <div className="imgContainer">
    <img
      style={{ height: "auto", width: "100%", borderRadius: "10px" }}
      src={information?.descriptionPageImg}
    />
  </div>
);
