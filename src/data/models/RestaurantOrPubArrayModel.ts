import { fromJson, RestaurantOrPub } from "../../core/Entities/RestaurantOrPub";

export function ROPArrayFromJson(data: RestaurantOrPub[]): RestaurantOrPub[] {
  return data.map((RoP: RestaurantOrPub) => fromJson(RoP));
}
