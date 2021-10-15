import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import "./RestaurantDescriptionPage.scss";
import { Loader } from "interface/components";
import { useSearchQuery } from "hooks";
import { bookTimeFromJson } from "core";
import {
  BookingContainer,
  RestaurantDescriptionContainer,
  RestaurantDescriptionError,
} from "./localComponents";
import { RestaurantOrPubRepository } from "domain/index";
import { RestaurantDescriptionInfoResponse } from "types/interfaces";
import { useRestaurantsInfoConfirmQuery } from "hooks/ApiQueries/useRestaurantsInfoConfirmQuery";
import { useRestaurantsInfoDescriptionQuery } from "hooks/ApiQueries/useRestaurantsInfoDescriptionQuery";

export function RestaurantDescriptionPage() {
  const { state }: { state: any } = useLocation();
  const { data, isLoading, isError } = useRestaurantsInfoDescriptionQuery();

  const BookingContainerComponent = (
    <BookingContainer
      state={state?.RoP || data}
      alternativeBookingHours={data?.alternativeBookingHours ?? []}
      nameString={data?.name}
    />
  );

  if (isLoading) {
    return <Loader />;
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
