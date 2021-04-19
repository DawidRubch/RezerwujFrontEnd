import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { BookTime, RestaurantOrPub } from "../../../../../core/Entities";
import { mapPropToSearchQuery } from "../../../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";
import "./RestaurantPubComponent.css";
interface RestaurantPubComponent {
  restaurantPubArr: RestaurantOrPub[] | undefined;
}
export default function RestaurantPubComponent({
  restaurantPubArr,
}: RestaurantPubComponent) {
  const { hour, people, date, location }: any = useSelector((state) => state);
  return (
    <div className="restaurant-array">
      {restaurantPubArr?.map((RoP: RestaurantOrPub, index: number) => {
        return (
          <div key={index}>
            <div className="restaurant-component">
              <img alt="Restaurant" src={RoP.image} />
              <div className="rc-without-photo">
                <Link
                  to={{
                    pathname: "/opis-restauracji",
                    state: RoP,
                    search:
                      mapPropToSearchQuery(
                        location,
                        date.toString(),
                        hour,
                        people
                      ) + `&name=${RoP.name}`,
                  }}
                >
                  <b style={{ fontSize: "35px", color: "#e54949" }}>
                    {RoP.name}
                  </b>
                </Link>

                <div className="restaurant-type">{RoP.type}</div>
                <div className="tag-container pc">
                  {RoP.tags.map((tag, index: number) => {
                    return (
                      <div key={index} className="tag">
                        {tag}
                      </div>
                    );
                  })}
                </div>
                <BookingHoursComponent
                  restaurantOrPub={RoP}
                  type="pc"
                  alternativeBookingHours={RoP.alternativeBookingHours}
                />
              </div>
            </div>
            <div className="tag-container mobile">
              {RoP.tags.map((tag, index: number) => {
                return (
                  <div key={index} className="tag">
                    {tag}
                  </div>
                );
              })}
            </div>
            <BookingHoursComponent
              restaurantOrPub={RoP}
              type="mobile"
              alternativeBookingHours={RoP.alternativeBookingHours}
            />
            <hr />
          </div>
        );
      })}
    </div>
  );
}

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
  if (type === "mobile") {
    cssMainClassName = "booking-hours-component-mobile";
  } else if (type === "pc") {
    cssMainClassName = "booking-hours-component-pc";
  }

  return (
    <div className={cssMainClassName}>
      <BookingHoursArr
        restaurantOrPub={restaurantOrPub}
        alternativeBookingHours={alternativeBookingHours?.slice(0, 3)}
      />
      <BookingHoursArr
        restaurantOrPub={restaurantOrPub}
        alternativeBookingHours={alternativeBookingHours?.slice(3)}
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
    <div style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
      {alternativeBookingHours?.map(
        (btZeroOrNull: BookTime | null | 0, index: number) => {
          if (btZeroOrNull === null) {
            return <div key={index} className="book-button booked" />;
          }

          if (btZeroOrNull === 0) {
            return <button key={index} className="book-button closed" />;
          }
          return (
            <button
              onClick={() => bookReservation(btZeroOrNull)}
              key={index}
              className="book-button free"
            >
              {btZeroOrNull.hour}:{btZeroOrNull.minute === 30 ? "30" : "00"}
            </button>
          );
        }
      )}
    </div>
  );
}
