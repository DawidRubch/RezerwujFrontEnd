import React, { useState } from "react";
import { BookTime, RestaurantOrPub } from "core";
import {
  BookingHoursComponent,
  Loader,
  PeopleAmountPicker,
  ReactCalendar,
  TimePicker,
} from "interface/components";
import "./BookingContainer.scss";
import { useSearchQuery } from "hooks";
import { useAlternativeBookingHoursQuery } from "hooks/ApiQueries/useAlternativeBookingHoursQuery";
interface BookingContainerInterface {
  RoP?: RestaurantOrPub;
}

export function BookingContainer({ RoP }: BookingContainerInterface) {
  const { name } = useSearchQuery();

  const { data, isLoading, isError } = useAlternativeBookingHoursQuery();

  if (isError || !RoP) {
    //@todo implement a error screen
    return <div>Something went wrong</div>;
  }
  return (
    <div className="placeOrder">
      <div className="placeOrder__header">
        <b className="placeOrder__header__label">Złóż rezerwację w {name}</b>
      </div>
      <div className="placeOrder__innerContainer">
        <div className="placeOrder__innerContainer__param">
          <b className="placeOrder__innerContainer__param__label">Data</b>
        </div>
        <div className="placeOrder__innerContainer__inputContainer">
          <ReactCalendar />
        </div>
        <div className="placeOrder__innerContainer__param">
          <b className="placeOrder__innerContainer__param__label">Godzina</b>
        </div>
        <div className="placeOrder__innerContainer__inputContainer">
          <TimePicker />
        </div>
        <div className="placeOrder__innerContainer__param">
          <b className="placeOrder__innerContainer__param__label">Ilość osób</b>
        </div>
        <div className="placeOrder__innerContainer__inputContainer">
          <PeopleAmountPicker />
        </div>
        <div className="placeOrder__innerContainer__bookingHours">
          {isLoading ? (
            <Loader size={70} />
          ) : (
            <BookingHoursComponent
              restaurantOrPub={RoP}
              type="universal"
              alternativeBookingHours={data || []}
            />
          )}
        </div>
      </div>
    </div>
  );
}
