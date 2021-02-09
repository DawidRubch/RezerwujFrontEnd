import React, { useEffect, useState } from "react";

import "./RestaurantPubArr.css";
import RestaurantOrPubRepository from "../../../domain/repository/RestaurantPubRepository";
import { BookTime, RestaurantOrPub } from "../../../core/Entities";

import NavBar from "./localComponents/Navbar/NavBar";
import RestaurantPubComponent from "./localComponents/RestaurantPubComponent/RestaurantPubComponent";

import {
  updateDate,
  updateHour,
  updateLocation,
  updatePeopleCount,
} from "../../../stateManagment/action";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "../../../core/Helper/SearchQuery/useSearchParams";

export default function RestaurantPubsArrayPage() {
  //Redux Hooks
  const { date, hour, people, location }: any = useSelector((state) => state);
  const dispatch = useDispatch();

  //UseState
  const [address, setAddress] = useState("");
  const [value, onChange] = useState<Date>(date);
  const [RoPArray, setRoPArray] = useState<RestaurantOrPub[]>();
  const restaurantPubRep = new RestaurantOrPubRepository();
  let fetchedRoPArr: RestaurantOrPub[];

  let { dateParam, hourParam, peopleParam, locationParam } = useSearchParams();

  useEffect(() => {
    (async () => {
      let bookTime = new BookTime(
        +hourParam.split(":")[1],
        +hourParam.split(":")[0],
        dateParam.getDate(),
        dateParam.getMonth() + 1,
        date.getFullYear(),
        peopleParam
      );

      fetchedRoPArr = await restaurantPubRep.mapROPArrayToJSX(
        bookTime,
        locationParam
      );

      setRoPArray(fetchedRoPArr);
    })();
  }, []);
  useEffect(() => {
    dispatch(updatePeopleCount(people));
  }, [value, people]);

  useEffect(() => {
    dispatch(updateDate(dateParam));
    dispatch(updatePeopleCount(peopleParam));
    dispatch(updateHour(hourParam));
    dispatch(updateLocation(locationParam));
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <input type="checkbox" id="check" />
      <NavBar onChange={onChange} />

      <RestaurantPubComponent  restaurantPubArr={RoPArray} />
    </div>
  );
}
