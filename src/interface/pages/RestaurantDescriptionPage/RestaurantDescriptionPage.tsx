import React, { useEffect, useState } from "react";
import "./RestaurantDescriptionPage.css";

import { useLocation } from "react-router-dom";

import { BookingContainer } from "./localComponents/BookingContainer/BookingContainer";
import RestaurantOrPubRepository from "../../../domain/repository/RestaurantPubRepository";
import { bookTimeFromJson } from "../../../core/Entities";
import { useBookTimeAndNameSearchParams } from "../../../core/Helper/SearchQuery/useBookTimeSearchParams";

export default function RestaurantDescriptionPage() {
  let { state }: any = useLocation();
  let restaurantOrPubRepository = new RestaurantOrPubRepository();

  const { bookTime, name } = useBookTimeAndNameSearchParams();
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
        //Tutaj call do api

        restaurantOrPubRepository
          .getRestaurantInfoDescriptionPage(name.toString(), bookTime)
          .then((res) => setInformation(res));
      }
    }
  }, []);

  if (information) {
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
            alternativeBookingHours={information?.alternativeBookingHours.map(
              (bt: any) => bookTimeFromJson(bt)
            )}
            nameString={information?.name}
          />
        </div>
      </div>
    );
  }
  return <div />;
}
