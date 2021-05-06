import { useHistory } from "react-router-dom";
import { BookTime } from "../../../core/Entities/BookTime";
import { RestaurantOrPub } from "../../../core/Entities/RestaurantOrPub";
import "./BookingHoursArr.scss";
import React from "react";
interface BookingHoursComponentInterface {
  alternativeBookingHours: (BookTime | null | 0)[];
  type: "mobile" | "pc" | "universal";
  restaurantOrPub: RestaurantOrPub;
}

export function BookingHoursComponent({
  alternativeBookingHours,
  type,
  restaurantOrPub,
}: BookingHoursComponentInterface) {
  let cssMainClassName: string = "booking-hours-component-universal";
  if (type === "pc") {
    cssMainClassName = "booking-hours-component-pc";
  }

  return (
    <div className={cssMainClassName}>
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
  let history = useHistory();

  const bookReservation = (bookTime: BookTime) => {
    history.push({
      pathname: "/potwierdz-rezerwacje",
      state: { restaurantOrPub, bookTime },
      search: `?&hour=${bookTime.hour}&minute=${bookTime.minute}&day=${bookTime.day}&month=${bookTime.month}&year=${bookTime.year}&people=${bookTime.people}&name=${restaurantOrPub.name}`,
    });
  };

  return (
    <div className="book__buttons">
      {alternativeBookingHours?.map(
        (btZeroOrNull: BookTime | null | 0, index: number) => {
          if (btZeroOrNull === null) {
            return (
              <div
                data-testid="booked"
                key={index}
                className="book__buttons__button--booked"
              />
            );
          }

          if (btZeroOrNull === 0) {
            return (
              <div
                data-testid="closed"
                key={index}
                className="book__buttons__button--closed"
              />
            );
          }
          return (
            <button
              data-testid="free"
              onClick={() => bookReservation(btZeroOrNull)}
              key={index}
              className="book__buttons__button--free"
            >
              {btZeroOrNull.hour}:{btZeroOrNull.minute === 30 ? "30" : "00"}
            </button>
          );
        }
      )}
    </div>
  );
}
