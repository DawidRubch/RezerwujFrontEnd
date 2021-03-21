import React, { useEffect, useState } from "react";
import "./RestaurantPubArr.css";
import RestaurantOrPubRepository from "../../../domain/repository/RestaurantPubRepository";
import { BookTime, RestaurantOrPub } from "../../../core/Entities";
import NavBar from "./localComponents/Navbar/NavBar";
import RestaurantPubComponent from "./localComponents/RestaurantPubComponent/RestaurantPubComponent";
import { useSearchParams } from "../../../core/Helper/SearchQuery/useSearchParams";

export default function RestaurantPubsArrayPage() {
  //UseState

  const [RoPArray, setRoPArray] = useState<RestaurantOrPub[]>();
  const restaurantPubRep = new RestaurantOrPubRepository();

  let { dateParam, hourParam, peopleParam, locationParam } = useSearchParams();

  //Takes RoP array from api
  const getRoPArr = () => {
    //BookTime taken from search params
    let bookTime = new BookTime(
      +hourParam.split(":")[1],
      +hourParam.split(":")[0],
      dateParam.getDate(),
      dateParam.getMonth() + 1,
      dateParam.getFullYear(),
      peopleParam
    );

    //Calling APi
    restaurantPubRep
      .getRoPArrayFromDb(bookTime, locationParam)
      .then((fetchedRoPArr) => setRoPArray(fetchedRoPArr));
  };

  useEffect(getRoPArr, []);

  return (
    <div style={{ width: "100%" }}>
      <input type="checkbox" id="check" />
      <NavBar />

      <RestaurantPubComponent restaurantPubArr={RoPArray} />
    </div>
  );
}
