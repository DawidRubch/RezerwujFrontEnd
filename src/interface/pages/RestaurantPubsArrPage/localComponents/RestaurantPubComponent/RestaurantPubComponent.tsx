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
          <div className="restaurant-component-wraper" key={index}>
            <div className="restaurant-component">
              <div className="restaurant-basic-info-mobile">
                <Link
                  className="restaurant-description-link"
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
                  <b className="rop-name">{RoP.name}</b>
                </Link>

                <span className="restaurant-type">{RoP.type}</span>
              </div>
              <img alt="Restaurant" src={RoP.image} />
              <div className="rc-without-photo">
                <div className="restaurant-basic-info-pc">
                  <Link
                    className="restaurant-description-link"
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
                    <b className="rop-name">{RoP.name}</b>
                  </Link>

                  <div className="restaurant-type">{RoP.type}</div>
                </div>
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
    <div className="book-buttons">
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
