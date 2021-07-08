import React, { useEffect, useState } from "react";
import "./RestaurantDescriptionPage.scss";
import { BookingContainer } from "./localComponents/BookingContainer/BookingContainer";
import { useBookTimeAndNameSearchParams } from "../../../core/Helper/SearchQuery/useBookTimeSearchParams";
import { RestaurantDescriptionPageFunctions } from "../../../InterfaceFunctions/PagesFunctions/RestaurantDescriptionPage/RestaurantDescriptionPageFunctions";
import { RestaurantDescriptionInfoResponse } from "../../../core/Interfaces/RestaurantDescriptionInfoResponse";
import { RestaurantDescriptionContainer } from "./localComponents/RestaurantDescriptionContainer/RestaurantDescriptionContainer";
import { Loader } from "../../components/Loader/Loader";
import { RestaurantDescriptionError } from "./localComponents/RestaurantDescriptionError/RestaurantDescriptionError";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";

export default function RestaurantDescriptionPage() {
  //Params from search query

  const { state }: { state: any } = useLocation();

  const { bookTime, name } = useBookTimeAndNameSearchParams();

  //Information consists of tags, descriptionPageImage,
  // name, type,shortDescription, alternative book time array

  const [information, setInformation] =
    useState<RestaurantDescriptionInfoResponse>();
  const [error, setError] = useState<AxiosError>();
  const [pending, setPending] = useState(true);

  //Repository with Functions for this page
  const restaurantDescriptionPageFunctions =
    new RestaurantDescriptionPageFunctions(
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

  const BookingContainerComponent = (
    <BookingContainer
      state={state?.RoP || information}
      alternativeBookingHours={
        restaurantDescriptionPageFunctions.mappingAltBookingHoursToBookTimeComponents
      }
      nameString={information?.name}
    />
  );

  if (pending) {
    return <Loader />;
  }

  return error ? (
    <RestaurantDescriptionError />
  ) : (
    <>
      <ImageContainer descriptionPageImg={information?.descriptionPageImg} />
      <div className="mainContainer">
        <RestaurantDescriptionContainer
          information={information}
          mobileBookingComponent={BookingContainerComponent}
        />
        <section className="mainContainer__bookingContainer">
          {BookingContainerComponent}
        </section>
        <div className="mainContainer__viewportBottomFakeMargin"></div>
      </div>
    </>
  );
}

//ImageContainer
interface ImageContainerProps {
  descriptionPageImg: string | undefined;
}

const ImageContainer = ({ descriptionPageImg }: ImageContainerProps) => (
  <div className="mainContainer__imgContainer">
    <img
      className="mainContainer__imgContainer__img"
      src={descriptionPageImg}
      alt="restaurant"
    />
  </div>
);
