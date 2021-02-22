import React, { useEffect, useState } from "react";
import "./RestaurantDescriptionPage.css";

import { useLocation } from "react-router-dom";
import queryString from "querystring";
import { BookingContainer } from "./localComponents/BookingContainer/BookingContainer";
import RestaurantOrPubRepository from "../../../domain/repository/RestaurantPubRepository";
import { BookTime } from "../../../core/Entities";

export default function RestaurantDescriptionPage() {
  let { state, search }: any = useLocation();
  let restaurantOrPubRepository = new RestaurantOrPubRepository();
  let { name, dateString, hour, people } = queryString.parse(search);
  let dateSplited = dateString.toString().split(".");
  let bookTime = new BookTime(
    +hour.toString().split(":")[1],
    +hour.toString().split(":")[0],
    +dateSplited[0],
    +dateSplited[1] + 1,
    +dateSplited[2],
    +people.toString()
  );

  const [information, setInformation] = useState<any>();

  useEffect(() => {
    if (state) {
      localStorage.setItem("RoP", JSON.stringify(state));
      setInformation(state);
    }
    if (!state) {
      let getItem = localStorage.getItem("RoP");

      if (getItem) {
        state = JSON.parse(getItem);
        setInformation(state);
      } else {
        console.log("Api call");
        //Tutaj call do api
        restaurantOrPubRepository
          .getRestaurantInfoDescriptionPage(name.toString(), bookTime)
          .then((res) => setInformation(res));
      }
    }
  }, []);
  console.log(state);

  const alternativeBookingHours: (BookTime | null)[] = (
    information || state
  )?.alternativeBookingHours.map((bookTime: any) => {
    if (bookTime === null) return null;

    return new BookTime(
      bookTime.minute,
      bookTime.hour,
      bookTime.day,
      bookTime.month,
      bookTime.year,
      bookTime.people
    );
  });

  return (
    <div style={{ marginTop: "0.5em", borderRadius: "15px" }}>
      <div className="imgContainer">
        <img
          style={{ height: "auto", width: "100%", borderRadius: "10px" }}
          src={information?.descriptionPageImg}
        />
      </div>
      <div className="mainContainer">
        <div className="restaurantContainer">
          <div className="restaurantName">{information?.name}</div>
          <div style={{ fontWeight: "bold", marginLeft: "10px" }}>
            {information?.type}
          </div>
          <div className="tagContainer">
            {information?.tags.map((tag: any) => {
              return <div className="tag">{tag}</div>;
            })}
          </div>
          <hr className="restaurantContainerhr" />
          <div className="shortDescription">
            {information?.shortDescription}
          </div>
          <hr className="restaurantContainerhr" />
          <div className="restaurantMenuLink">
            Zobacz menu restauracji na stronie
          </div>
        </div>
        <BookingContainer
          state={information}
          alternativeBookingHours={alternativeBookingHours}
          name={information?.name}
        />
      </div>
    </div>
  );
}
