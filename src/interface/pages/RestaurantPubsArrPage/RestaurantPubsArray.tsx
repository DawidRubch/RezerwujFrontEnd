import React, { useState } from "react";
import "./RestaurantPubArr.scss";

import { Loader } from "interface/components";
import { RestaurantPubComponent, SearchBar } from "./localComponents";
import { useRestaurantsQuery } from "hooks/ApiQueries/useRestaurantsQuery";

export function RestaurantPubsArrayPage() {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const { data, isLoading } = useRestaurantsQuery({ shouldUpdate });

  return (
    <div className="restaurantPubContainer">
      <input type="checkbox" id="check" />
      <SearchBar getRoPArr={() => setShouldUpdate(!shouldUpdate)} />
      {isLoading ? (
        <Loader />
      ) : (
        <RestaurantPubComponent restaurantPubArr={data} />
      )}
    </div>
  );
}
