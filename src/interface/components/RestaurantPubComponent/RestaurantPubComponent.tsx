import React from "react";
import { Link } from "react-router-dom";
import { BookTime, RestaurantOrPub } from "../../../core/Entities";
import "./RestaurantPubComponent.css";
interface RestaurantPubComponent {
  restaurantPubArr: RestaurantOrPub[] | undefined;
}
export default function RestaurantPubComponent(props: RestaurantPubComponent) {
  return (
    <div className="restaurant-array">
      <div className="restaurant-array-searches-number">
        {props.restaurantPubArr?.length} wyniki
      </div>
      {props.restaurantPubArr?.map((RoP: RestaurantOrPub) => {
        return (
          <div>
            <div className="restaurant-component">
              <img src={RoP.image}></img>
              <div className="rc-without-photo">
                <Link to={{ pathname: "/opis-restauracji", state: RoP }}>
                  <b style={{ fontSize: "35px", color: "#e54949" }}>
                    {RoP.name}
                  </b>
                </Link>

                <div className="restaurant-type">{RoP.type}</div>
                <div className="tag-container pc">
                  {RoP.tags.map((tag) => {
                    return <div className="tag">{tag}</div>;
                  })}
                </div>
                <BookingHoursComponent
                  type="pc"
                  alternativeBookingHours={RoP.alternativeBookingHours}
                ></BookingHoursComponent>
              </div>
            </div>
            <div className="tag-container mobile">
              {RoP.tags.map((tag) => {
                return <div className="tag">{tag}</div>;
              })}
            </div>
            <BookingHoursComponent
              type="mobile"
              alternativeBookingHours={RoP.alternativeBookingHours}
            ></BookingHoursComponent>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

interface BookingHoursComponentInterface {
  alternativeBookingHours: (BookTime | null)[];
  type: "mobile" | "pc" | "universal";
}

export function BookingHoursComponent(props: BookingHoursComponentInterface) {
  let btArr = props.alternativeBookingHours;
  let cssMainClassName: string = "booking-hours-component-universal";
  if (props.type === "mobile") {
    cssMainClassName = "booking-hours-component-mobile";
  } else if (props.type === "pc") {
    cssMainClassName = "booking-hours-component-pc";
  }

  return (
    <div className={cssMainClassName}>
      <BookingHoursArr
        alternativeBookingHours={btArr.slice(0, 3)}
      ></BookingHoursArr>

      <BookingHoursArr
        alternativeBookingHours={btArr.slice(3)}
      ></BookingHoursArr>
    </div>
  );
}
interface BookingHoursArrInterface {
  alternativeBookingHours: (BookTime | null)[];
}

function BookingHoursArr(props: BookingHoursArrInterface) {
  let bookArr = props.alternativeBookingHours;

  return (
    <div style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
      {bookArr.map((btOrNull: BookTime | null) => {
        if (btOrNull === null) {
          return <button className="book-button booked"></button>;
        } else {
          return (
            <button className="book-button free">
              {btOrNull.hour}:{btOrNull.minute === 30 ? "30" : "00"}
            </button>
          );
        }
      })}
    </div>
  );
}
