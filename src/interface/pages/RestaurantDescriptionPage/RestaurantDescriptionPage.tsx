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

const restaurantOrPubRepository = new RestaurantOrPubRepository();

export function RestaurantDescriptionPage() {
  //Params from search query

  const { state }: { state: any } = useLocation();

  const { name, bookTime } = useSearchQuery();

  //Information consists of tags, descriptionPageImage,
  // name, type,shortDescription, alternative book time array

  const [information, setInformation] =
    useState<RestaurantDescriptionInfoResponse>();
  const [error, setError] = useState<AxiosError>();
  const [pending, setPending] = useState(true);

  const restaurantName = name?.toString() ?? "";

  const btArray = information
    ? information?.alternativeBookingHours.map((bt: any) =>
        bookTimeFromJson(bt)
      )
    : [];
  console.log(information);

  useEffect(() => {
    restaurantOrPubRepository
      .getRestaurantInfoDescriptionPage(restaurantName, bookTime)
      .then((res) => {
        setInformation(res);
        setPending(false);
      })
      .catch((err: AxiosError) => {
        setError(err);
        setPending(false);
      });
  }, []);

  const BookingContainerComponent = (
    <BookingContainer
      state={state?.RoP || information}
      alternativeBookingHours={btArray}
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
