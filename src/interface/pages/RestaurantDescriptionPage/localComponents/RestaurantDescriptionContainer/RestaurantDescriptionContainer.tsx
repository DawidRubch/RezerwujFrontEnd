import React from "react";
import { ReactComponent as RestaurantMenuIcon } from "../../../../../images/restaurant-menu.svg";
import "./RestaurantDescriptionContainer.css";

interface RestaurantDescriptionContainerInterface {
  information: any;
  mobileBookingComponent: JSX.Element;
}

export function RestaurantDescriptionContainer({
  information,
  mobileBookingComponent,
}: RestaurantDescriptionContainerInterface) {
  //Mapping place tags to JSX components
  const placeTagsMappingToJSXComponents: JSX.Element[] = information?.tags.map(
    (tag: any) => <div className="tag">{tag}</div>
  );

  return (
    <div className="restaurantContainer">
      <div className="restaurantName">{information?.name}</div>
      <div className="restaurantType">{information?.type}</div>
      <div className="tagContainer">{placeTagsMappingToJSXComponents}</div>
      <hr className="restaurantContainerhr" />
      <div className="restaurantBookingContainer--mobile">
        {mobileBookingComponent}
      </div>
      <div className="shortDescription">{information?.shortDescription}</div>
      <hr className="restaurantContainerhr" />
      <div className="restaurantMenuLinkContainer">
        <a className="restaurantMenuLink" href="#">
          Zobacz menu restauracji
          <div className="restaurantMenuIconContainer">
            <RestaurantMenuIcon className="restaurantMenuIcon" />
          </div>
        </a>
      </div>
    </div>
  );
}
