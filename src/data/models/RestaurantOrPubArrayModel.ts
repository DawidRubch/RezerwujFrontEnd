import { fromJson, RestaurantOrPub } from "../../core/Entities";

export class RestaurantOrPubArrayModel {
  restaurantOrPubArray: RestaurantOrPub[];

  constructor(restaurantOrPubArray: RestaurantOrPub[]) {
    this.restaurantOrPubArray = restaurantOrPubArray;
  }
}

export function ROPArrayFromJson(data: RestaurantOrPub[]): RestaurantOrPub[] {
  
  return data.map((RoP: RestaurantOrPub) => fromJson(RoP));
}
