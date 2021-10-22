import React from "react";
import { ReactComponent as RestaurantMenuIcon } from "images/restaurant-menu.svg";
import "./RestaurantDescriptionContainer.scss";
import { RestaurantDescriptionInfoResponse } from "types";
import { RestaurantOrPub } from "core";

interface RestaurantDescriptionContainerInterface {
  information: RestaurantOrPub | undefined;
  mobileBookingComponent: JSX.Element;
}

export function RestaurantDescriptionContainer({
  information,
  mobileBookingComponent,
}: RestaurantDescriptionContainerInterface) {
  //Mapping place tags to JSX components
  const placeTagsMappingToJSXComponents = information?.tags.map(
    (tag: string, index: number) => (
      <div className="restaurantDescription__tags__tag" key={index}>
        {tag}
      </div>
    )
  );

  return (
    <section className="restaurantDescription">
      <h1 className="restaurantDescription__name">{information?.name}</h1>
      <h6 className="restaurantDescription__type">{information?.type}</h6>
      <div className="restaurantDescription__tags">
        {placeTagsMappingToJSXComponents}
      </div>
      <hr className="restaurantDescription__hr" />
      <div className="restaurantDescription__bookingContainer_mobile">
        {mobileBookingComponent}
      </div>
      <p className="restaurantDescription__descriptionText">
        {information?.shortDescription}
      </p>
      <hr className="restaurantDescription__hr" />
      <div className="restaurantDescription__linkContainer"></div>
    </section>
  );
}
