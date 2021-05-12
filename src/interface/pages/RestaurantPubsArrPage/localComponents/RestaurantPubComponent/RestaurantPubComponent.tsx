import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RestaurantOrPub } from "../../../../../core/Entities";
import { mapPropToSearchQuery } from "../../../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";
import { BookingHoursComponent } from "../../../../components/BookingHoursArray/BookingHoursArr";
import "./RestaurantPubComponent.css";
interface RestaurantPubComponentProps {
  restaurantPubArr: RestaurantOrPub[] | undefined;
}
export default function RestaurantPubComponent({
  restaurantPubArr,
}: RestaurantPubComponentProps) {
  const { hour, people, date, location }: any = useSelector((state) => state);
  return (
    <div className="restaurant-array">
      {restaurantPubArr?.map((RoP: RestaurantOrPub, index: number) => {
        return (
          <div className="restaurant-component-wraper" key={index}>
            <div className="restaurant-component">
              <div className="restaurant-basic-info-mobile">
                <Link
                  className="restaurant-description-link"
                  to={{
                    pathname: "/opis-restauracji",
                    state: {
                      from: 'lista-restauracji'
                    },
                    search:
                      mapPropToSearchQuery(
                        location,
                        date.toString(),
                        hour,
                        people
                      ) + `&name=${RoP.name}`,
                  }}
                >
                  <b className="rop-name">{RoP.name}</b>
                </Link>

                <span className="restaurant-type">{RoP.type}</span>
              </div>
              <img alt="Restaurant" src={RoP.image} />
              <div className="rc-without-photo">
                <div className="restaurant-basic-info-pc">
                  <Link
                    className="restaurant-description-link"
                    to={{
                      pathname: "/opis-restauracji",
                      state: {
                        from: 'lista-restauracji'
                      },
                      search:
                        mapPropToSearchQuery(
                          location,
                          date.toString(),
                          hour,
                          people
                        ) + `&name=${RoP.name}`,
                    }}
                  >
                    <b className="rop-name">{RoP.name}</b>
                  </Link>

                  <div className="restaurant-type">{RoP.type}</div>
                </div>
                <div className="tag-container pc">
                  {RoP.tags.map((tag, index: number) => {
                    return (
                      <div key={index} className="tag">
                        {tag}
                      </div>
                    );
                  })}
                </div>
                <BookingHoursComponent
                  restaurantOrPub={RoP}
                  type="pc"
                  alternativeBookingHours={RoP.alternativeBookingHours}
                />
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
