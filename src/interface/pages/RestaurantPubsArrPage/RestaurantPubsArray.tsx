import React, { useState } from "react";
import "./RestaurantPubArr.scss";

import { Loader } from "interface/components";
import { RestaurantPubComponent, SearchBar } from "./localComponents";
import { useRestaurantsQuery } from "hooks/ApiQueries/useRestaurantsQuery";
import { useGetRestaurantsLandingQuery } from "hooks";

export function RestaurantPubsArrayPage() {
  const [shouldUpdate, setShouldUpdate] = useState<boolean>();

  const { data: restaurantsLanding, isLoading: isALoading } =
    useGetRestaurantsLandingQuery("");
  const { data: restaurants, isLoading } = useRestaurantsQuery({
    shouldUpdate,
  });

  return (
    <div className="restaurantPubContainer">
      <input type="checkbox" id="check" />
      <SearchBar
        getRoPArr={() =>
          setShouldUpdate((state) => {
            if (state === undefined) return true;
            return !state;
          })
        }
      />
      {isALoading ? (
        <Loader marginTop={50} size={160} />
      ) : (
        <RestaurantPubComponent
          restaurantPubArr={
            shouldUpdate === undefined ? restaurantsLanding : restaurants
          }
        />
      )}
    </div>
  );
}
