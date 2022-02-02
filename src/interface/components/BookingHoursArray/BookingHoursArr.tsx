import React from "react";
import { useCallback } from "react";
import { useSearchQuery, useUpdateSearchQuery } from "hooks";
import { Routes } from "routes";
import "./BookingHoursArr.scss";
import { RestaurantOrPub } from "core";
import { getHourAndDateFromDateString } from "utils/getHourAndDateFromDateString";
import { BookTime } from "types/types";
interface BookingHoursComponentInterface {
  alternativeBookingHours: (BookTime | null | 0)[];
  type: "mobile" | "pc" | "universal";
  restaurantOrPub: RestaurantOrPub;
}

const cssMainClass = "booking-hours-component";

export function BookingHoursComponent({
  alternativeBookingHours,
  type,
  restaurantOrPub,
}: BookingHoursComponentInterface) {
  return (
    <div
      className={
        // type === "pc" ? "booking-hours-component-pc" : cssMainClassName
        `${cssMainClass}-${type === "pc" ? "pc" : "universal"}`
      }
    >
      <BookingHoursArr
        restaurantOrPub={restaurantOrPub}
        alternativeBookingHours={alternativeBookingHours}
      />
    </div>
  );
}

interface BookingHoursArrInterface {
  alternativeBookingHours: (BookTime | null | 0)[];
  restaurantOrPub: RestaurantOrPub;
}

function BookingHoursArr({
  alternativeBookingHours,
  restaurantOrPub,
}: BookingHoursArrInterface) {
  const updateSearchQuery = useUpdateSearchQuery();

  const { date } = useSearchQuery();

  const { hour } = getHourAndDateFromDateString(date.toString());

  //@todo refactor the bookReservation function
  const bookReservation = useCallback((bookTime: BookTime) => {
    const { hour } = getHourAndDateFromDateString(bookTime.date);
    updateSearchQuery({
      hour,
      pathname: Routes.CONFIRM_RESERVATION,
      state: { restaurantOrPub, bookTime },
    });
  }, []);

  if (alternativeBookingHours.length === 0) {
    return (
      <span className="booking-hours_unavailable">
        Brak możliwości rezerwacji w podanym terminie!
        <br />
        Wybierz inną datę i / lub godzinę.
      </span>
    );
  }

  return (
    <div className="book__buttons">
      {alternativeBookingHours?.map(
        (btZeroOrNull: BookTime | null | 0, index: number) => {
          if (btZeroOrNull === null) {
            return (
              <div
                data-testid="booked"
                key={index}
                className="book__buttons__button book__buttons__button--booked"
              />
            );
          }

          if (btZeroOrNull === 0) {
            return (
              <div
                data-testid="closed"
                key={index}
                className="book__buttons__button book__buttons__button--closed"
              />
            );
          }
          return (
            <button
              data-testid="free"
              onClick={() => bookReservation(btZeroOrNull)}
              key={index}
              className="book__buttons__button book__buttons__button--free"
            >
              {btZeroOrNull.hourString}
            </button>
          );
        }
      )}
    </div>
  );
}
