import React, { useEffect, useState } from "react";
import "./RestaurantDescriptionPage.css";
import { useLocation, useHistory } from "react-router-dom";
import { BookingContainer } from "./localComponents/BookingContainer/BookingContainer";
import { useBookTimeAndNameSearchParams } from "../../../core/Helper/SearchQuery/useBookTimeSearchParams";
import { RestaurantDescriptionPageFunctions } from "../../../InterfaceFunctions/PagesFunctions/RestaurantDescriptionPage/RestaurantDescriptionPageFunctions";
import { RestaurantDescriptionContainer } from "./localComponents/RestaurantDescriptionContainer/RestaurantDescriptionContainer";
import { Loader } from '../../components/Loader/Loader';
import { RestaurantDescriptionError } from './localComponents/RestaurantDescriptionError/RestaurantDescriptionError';
import { AxiosError } from "axios";

export default function RestaurantDescriptionPage() {

  //State passed from RestaurantPubComponent, when pressed on the restaurant name.
  //Consists of previous location path. Used to prevent entering this page by pasting a URL in browser adress bar.

  const { state } = useLocation();

  //Params from search query

  const { bookTime, name } = useBookTimeAndNameSearchParams();

  //Information consists of tags, descriptionPageImage,
  // name, type,shortDescription, alternative book time array
  //This should be implemented with a interface

  const [information, setInformation] = useState<any>();
  const [error, setError] = useState<AxiosError>();
  const [pending, setPending] = useState(true);

  //Repository with Functions for this page
  let restaurantDescriptionPageFunctions = new RestaurantDescriptionPageFunctions(
    bookTime,
    name,
    setInformation,
    information,
    setError,
    error,
    setPending,
    pending
  );

  useEffect(restaurantDescriptionPageFunctions.manageState, []);

  if (pending) {
    return <Loader />
  }

  return (error || !state ? <RestaurantDescriptionError /> :
    <>
      <ImageContainer descriptionPageImg={information?.descriptionPageImg} />
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

//ImageContainer
const ImageContainer = ({ descriptionPageImg }: any) => (
  <div className="imgContainer">
    <img className="restaurantImage" src={descriptionPageImg} alt="restaurant" />
  </div>
);
