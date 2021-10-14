import { BookingHoursComponent } from "interface/components";
import React, { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSearchQuery } from "hooks";
import { Routes } from "routes";
import "./RestaurantPubComponent.scss";
import { generateSearchQueryFromObject, RestaurantOrPub } from "core";
interface RestaurantPubComponentProps {
  restaurantPubArr: RestaurantOrPub[] | undefined;
}
interface LinkComponentProps {
  RoP: RestaurantOrPub;
}
interface BasicInfoProps {
  platform: "mobile" | "pc";
  RoP: RestaurantOrPub;
}

export function RestaurantPubComponent({
  restaurantPubArr,
}: RestaurantPubComponentProps) {
  const { hour, people, dateString, name } = useSearchQuery();

  const BasicInfo: FC<BasicInfoProps> = ({ RoP, platform }) => {
    return (
      <div className={`restaurantComponent__basicInfo_${platform}`}>
        <LinkComponent RoP={RoP} />
        <div className="restaurantComponent__type">{RoP.type}</div>
      </div>
    );
  };

  const LinkComponent: FC<LinkComponentProps> = useCallback(
    ({ RoP }) => {
      const searchQObject = { dateString, hour, people, name: RoP.name };
      const search = generateSearchQueryFromObject(searchQObject);
      return (
        <Link
          className="restaurantComponent__link"
          to={{
            pathname: Routes.RESTAURANT_INFO,
            state: {
              from: Routes.RESTAURANTS_ARRAY,
              RoP,
            },
            search,
          }}
        >
          <b className="restaurantComponent__link__name">{RoP.name}</b>
        </Link>
      );
    },
    [dateString, hour, people, name]
  );

  return (
    <main className="restaurantArray">
      {restaurantPubArr?.map((RoP: RestaurantOrPub, index: number) => (
        <div className="restaurantComponentWraper" key={index}>
          <div className="restaurantComponent">
            <BasicInfo platform="mobile" RoP={RoP} />
            <img
              className="restaurantComponent__img"
              alt="Restaurant"
              src={RoP.image}
            />
            <div className="restaurantComponent__additionalInfo">
              <BasicInfo platform="pc" RoP={RoP} />
              <TagsArray RoPTags={RoP.tags} />
              <BookingHoursComponent
                restaurantOrPub={RoP}
                type="pc"
                alternativeBookingHours={RoP.alternativeBookingHours}
              />
            </div>
          </div>
          <hr className="restaurantComponentWraper__hr" />
        </div>
      ))}
    </main>
  );
}

interface TagsArrayProps {
  RoPTags: string[];
}

const TagsArray: FC<TagsArrayProps> = ({ RoPTags }) => (
  <div className="restaurantComponent__additionalInfo__tagContainer">
    {RoPTags.map((tag, index: number) => (
      <span
        key={index}
        className="restaurantComponent__additionalInfo__tagContainer__tag"
      >
        {tag}
      </span>
    ))}
  </div>
);
