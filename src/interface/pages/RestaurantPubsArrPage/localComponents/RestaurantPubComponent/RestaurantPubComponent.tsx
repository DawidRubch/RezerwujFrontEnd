import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RestaurantOrPub } from "../../../../../core/Entities";
import { mapPropToSearchQuery } from "../../../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";
import { BookingHoursComponent } from "../../../../components/BookingHoursArray/BookingHoursArr";
import "./RestaurantPubComponent.scss";
interface RestaurantPubComponentProps {
  restaurantPubArr: RestaurantOrPub[] | undefined;
}
export default function RestaurantPubComponent({
  restaurantPubArr,
}: RestaurantPubComponentProps) {
  const { hour, people, date, location }: any = useSelector((state) => state);

  return (
    <div className="restaurantArray">
      {restaurantPubArr?.map((RoP: RestaurantOrPub, index: number) => {
        return (
          <div className="restaurantComponentWraper" key={index}>
            <div className="restaurantComponent">
              <div className="restaurantComponent__basicInfo_mobile">
                <Link
                  className="restaurantComponent__link"
                  to={{
                    pathname: "/opis-restauracji",
                    state: {
                      from: "lista-restauracji",
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
                  <b className="restaurantComponent__link__name">{RoP.name}</b>
                </Link>
                <span className="restaurantComponent__type">{RoP.type}</span>
              </div>
              <img
                className="restaurantComponent__img"
                alt="Restaurant"
                src={RoP.image}
              />
              <div className="restaurantComponent__additionalInfo">
                <div className="restaurantComponent__basicInfo_pc">
                  <Link
                    className="restaurantComponent__link"
                    to={{
                      pathname: "/opis-restauracji",
                      state: {
                        from: "lista-restauracji",
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
                    <b className="restaurantComponent__link__name">
                      {RoP.name}
                    </b>
                  </Link>
                  <div className="restaurantComponent__type">{RoP.type}</div>
                </div>
                <div className="restaurantComponent__additionalInfo__tagContainer">
                  {RoP.tags.map((tag, index: number) => {
                    return (
                      <span
                        key={index}
                        className="restaurantComponent__additionalInfo__tagContainer__tag"
                      >
                        {tag}
                      </span>
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
            <hr className="restaurantComponentWraper__hr" />
          </div>
        );
      })}
    </div>
  );
}
