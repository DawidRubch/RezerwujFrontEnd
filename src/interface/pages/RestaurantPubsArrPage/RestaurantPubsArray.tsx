import React, { useEffect, useState } from "react";
import "./RestaurantPubArr.scss";
import RestaurantOrPubRepository from "../../../domain/repository/RestaurantPubRepository";
import { BookTime, RestaurantOrPub } from "../../../core/Entities";
import { Loader } from "../../components/Loader/Loader";
import SearchBar from "./localComponents/SearchBar/SearchBar";
import RestaurantPubComponent from "./localComponents/RestaurantPubComponent/RestaurantPubComponent";
import { useSearchParams } from "../../../core/Helper/SearchQuery/useSearchParams";

export default function RestaurantPubsArrayPage() {
  //UseState

  const [RoPArray, setRoPArray] = useState<RestaurantOrPub[]>();
  const [loading, setLoading] = useState(true);
  const restaurantPubRep = new RestaurantOrPubRepository();

  let { dateParam, hourParam, peopleParam, locationParam } = useSearchParams();

  //Takes RoP array from api
  const getRoPArr = () => {
    if (!loading) {
      setLoading(true);
    }

    //Splitting hour and minutes
    const [hour, minutes] = hourParam.split(":");

    const day = dateParam.getDate();
    const month = dateParam.getMonth() + 1;
    const year = dateParam.getFullYear();

    //BookTime taken from search params
    let bookTime = new BookTime(+minutes, +hour, day, month, year, peopleParam);

    //Calling APi
    restaurantPubRep
      .getRoPArrayFromDb(bookTime, locationParam)
      .then((fetchedRoPArr) => {
        setRoPArray(fetchedRoPArr);
        setLoading(false);
      });
  };

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
