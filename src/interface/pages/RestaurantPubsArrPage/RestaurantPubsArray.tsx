import React, { useEffect, useState, useCallback } from "react";
import "./RestaurantPubArr.scss";
import { generateBtFromSearchQ, RestaurantOrPub } from "core";
import { useSearchQuery } from "hooks";
import { Loader } from "interface/components";
import { RestaurantPubComponent, SearchBar } from "./localComponents";
import { RestaurantOrPubRepository } from "domain/index";

const restaurantPubRep = new RestaurantOrPubRepository();

export function RestaurantPubsArrayPage() {
  const [RoPArray, setRoPArray] = useState<RestaurantOrPub[]>();
  const [loading, setLoading] = useState(true);

  const { dateString, hour, people } = useSearchQuery();

  //Takes RoP array from api
  const getRoPArr = useCallback(() => {
    if (!loading) {
      setLoading(true);
    }

    const bookTime = generateBtFromSearchQ({ dateString, hour, people });

    //Calling APi
    restaurantPubRep.getRoPArrayFromDb(bookTime, "").then((fetchedRoPArr) => {
      setRoPArray(fetchedRoPArr);
      setLoading(false);
    });
  }, [hour, dateString, people]);

  useEffect(getRoPArr, []);

  return (
    <div className="restaurantPubContainer">
      <input type="checkbox" id="check" />
      <SearchBar getRoPArr={getRoPArr} />
      {loading ? (
        <Loader />
      ) : (
        <RestaurantPubComponent restaurantPubArr={RoPArray} />
      )}
    </div>
  );
}
