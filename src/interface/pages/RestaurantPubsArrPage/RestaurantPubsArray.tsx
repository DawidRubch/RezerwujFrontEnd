import React, { useEffect, useState } from "react";
import "./RestaurantPubArr.css";
import RestaurantOrPubRepository from "../../../domain/repository/RestaurantPubRepository";
import { BookTime, RestaurantOrPub } from "../../../core/Entities";

import NavBar from "../../components/NavBar/NavBar";
import RestaurantPubComponent from "../../components/RestaurantPubComponent/RestaurantPubComponent";

import {
  updateDate,
  updateHour,
  updatePeopleCount,
} from "../../../stateManagment/action";
import { useDispatch, useSelector } from "react-redux";

export default function RestaurantPubsArrayPage() {
  const dispatcher: any = useSelector((state) => state);
  //Redux Hooks

  const dispatch = useDispatch();
  //UseState
  const [address, setAddress] = useState("");
  const [value, onChange] = useState<Date>(dispatcher.date);
  const [time, setTime] = useState<string>(dispatcher.hour);
  const [people, setPeople] = useState<number>(dispatcher.people);
  const [RoPArray, setRoPArray] = useState<RestaurantOrPub[]>();
  const restaurantPubRep = new RestaurantOrPubRepository();
  let fetchedRoPArr: RestaurantOrPub[];

  useEffect(() => {
    (async () => {
      let bt = new BookTime(
        +dispatcher.hour.substring(dispatcher.hour.indexOf(":") + 1),
        +dispatcher.hour.split(":")[0],
        dispatcher.date.getDate(),
        dispatcher.date.getMonth() + 1,
        dispatcher.date.getFullYear(),
        dispatcher.people
      );
      fetchedRoPArr = await restaurantPubRep.mapROPArrayToJSX(
        bt,
        dispatcher.location
      );
      console.log(bt);

      setRoPArray(fetchedRoPArr);
    })();
  }, []);

  useEffect(() => {
    dispatch(updateDate(value));
    dispatch(updateHour(time));
    dispatch(updatePeopleCount(people));
  }, [time, value, people]);

  return (
    <div style={{ width: "100%" }}>
      <input type="checkbox" id="check" />
      <NavBar setAddress={setAddress} onChange={onChange}></NavBar>

      <RestaurantPubComponent
        restaurantPubArr={RoPArray}
      ></RestaurantPubComponent>
    </div>
  );
}
