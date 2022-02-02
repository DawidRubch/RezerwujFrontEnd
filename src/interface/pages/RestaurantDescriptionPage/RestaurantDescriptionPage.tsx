import React from "react";
import { useLocation } from "react-router-dom";
import "./RestaurantDescriptionPage.scss";
import { Loader } from "interface/components";
import {
  BookingContainer,
  RestaurantDescriptionContainer,
  RestaurantDescriptionError,
} from "./localComponents";
import { useGetRestaurantQuery } from "hooks/ApiQueries/useGetRestaurantQuery";
import { RestaurantOrPub } from "core";

interface LocationState {
  state: {
    RoP: RestaurantOrPub;
  };
}

export function RestaurantDescriptionPage() {
  const { state }: LocationState = useLocation();
  const { data, isLoading, isError } = useGetRestaurantQuery();

  const BookingContainerComponent = (
    <BookingContainer RoP={state?.RoP || data} />
  );

  if (isLoading) {
    return <Loader marginTop={50} size={160} />;
  }

  return isError ? (
    <RestaurantDescriptionError />
  ) : (
    <>
      <ImageContainer descriptionPageImg={data?.descriptionPageImg} />
      <div className="mainContainer">
        <RestaurantDescriptionContainer
          information={data}
          mobileBookingComponent={BookingContainerComponent}
        />
        <section className="mainContainer__bookingContainer">
          {BookingContainerComponent}
        </section>
        <div className="mainContainer__viewportBottomFakeMargin" />
      </div>
    </>
  );
}

//ImageContainer
interface ImageContainerProps {
  descriptionPageImg?: string;
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
