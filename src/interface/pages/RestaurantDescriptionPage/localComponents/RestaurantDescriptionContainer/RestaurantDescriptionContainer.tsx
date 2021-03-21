import React from "react";
import "./RestaurantDescriptionContainer.css";

interface RestaurantDescriptionContainerInterface {
  information: any;
}

export function RestaurantDescriptionContainer({
  information,
}: RestaurantDescriptionContainerInterface) {
  //Mapping place tags to JSX components
  const placeTagsMappingToJSXComponents: JSX.Element[] = information?.tags.map(
    (tag: any) => <div className="tag">{tag}</div>
  );

  return (
    <div className="restaurantContainer">
      <div className="restaurantName">{information?.name}</div>
      <div style={{ fontWeight: "bold", marginLeft: "10px" }}>
        {information?.type}
      </div>
      <div className="tagContainer">{placeTagsMappingToJSXComponents}</div>
      <hr className="restaurantContainerhr" />
      <div className="shortDescription">{information?.shortDescription}</div>
      <hr className="restaurantContainerhr" />
      <div className="restaurantMenuLink">
        Zobacz menu restauracji na stronie
      </div>
    </div>
  );
}
