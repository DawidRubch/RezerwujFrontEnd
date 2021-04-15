import { BookTime } from "./BookTime";
import { DayOfTheWeekOpenHours } from "./DayOfTheWeek";
import { ROPLocation } from "./Location";

export class RestaurantOrPub {
  name: string;
  type: string;
  tags: string[];
  shortDescription: string;
  location: ROPLocation;
  distance: number;
  chairs: number;
  menuLink: string;
  bookTimeArray: BookTime[];
  image: string;
  descriptionPageImg: string;
  weekArray: Array<DayOfTheWeekOpenHours | null>;
  alternativeBookingHours: Array<BookTime | null>;

  constructor(
    name: string,
    type: string,
    //Tags such as 'miła atmosfera' or "dużo opcji wegetariańskich"
    tags: string[],
    shortDescription: string,
    location: ROPLocation,
    //Distance is -1 by default
    chairs: number,
    menuLink: string,
    //All of the reservations
    bookTimeArray: BookTime[],
    //Url to the image
    image: string,
    descriptionPageImg: string,
    //Day of the week is shown by indexes
    //0 is Sunday
    //1 is Monday
    //2 is Tuesday ...
    weekArray: Array<DayOfTheWeekOpenHours | null>
  ) {
    this.descriptionPageImg = descriptionPageImg;
    this.name = name;
    this.type = type;
    this.tags = tags;
    this.shortDescription = shortDescription;
    this.distance = -1;
    this.location = location;
    this.chairs = chairs;
    this.menuLink = menuLink;
    this.bookTimeArray = bookTimeArray;
    this.image = image;
    this.weekArray = weekArray;
    this.alternativeBookingHours = [];
  }
}
//Napisać testy pod t
export function fromJson(restaurantOrPubJSON: any): RestaurantOrPub {
  let location: ROPLocation = new ROPLocation(
    restaurantOrPubJSON.location.lat,
    restaurantOrPubJSON.location.long
  );
  let weekArray: Array<DayOfTheWeekOpenHours | null> = restaurantOrPubJSON.weekArray.map(
    _mapWeekDay
  );
  let bookTimeArray: BookTime[] = restaurantOrPubJSON.bookTimeArray.map(
    _mapBookTime
  );
  let restaurantOrPubEntity = new RestaurantOrPub(
    restaurantOrPubJSON.name,
    restaurantOrPubJSON.type,
    restaurantOrPubJSON.tags,
    restaurantOrPubJSON.shortDescription,
    location,
    restaurantOrPubJSON.chairs,
    restaurantOrPubJSON.menuLink,
    bookTimeArray,
    restaurantOrPubJSON.image,
    restaurantOrPubJSON.descriptionPageImg,
    weekArray
  );
  let alternativeBookingHours =
    restaurantOrPubJSON.length === 0
      ? restaurantOrPubJSON.alternativeBookingHours.map(
          _mapAlternativeBookingHours
        )
      : [];

  restaurantOrPubEntity.distance = restaurantOrPubJSON.distance;
  restaurantOrPubEntity.alternativeBookingHours = alternativeBookingHours;
  return restaurantOrPubEntity;
}
function _mapBookTime(bookTime: BookTime) {
  let restaurantBookTime = new BookTime(
    bookTime.minute,
    bookTime.hour,
    bookTime.day,
    bookTime.month,
    bookTime.year,
    bookTime.people
  );
  restaurantBookTime.name = bookTime.name;
  return restaurantBookTime;
}

function _mapWeekDay(weekDay: DayOfTheWeekOpenHours | null) {
  return weekDay === null
    ? null
    : new DayOfTheWeekOpenHours(
        weekDay.openHour,
        weekDay.openMinute,
        weekDay.closingHour,
        weekDay.closingMinute
      );
}

function _mapAlternativeBookingHours(btZeroOrNull: BookTime | null | 0) {
  if (btZeroOrNull === null) {
    return null;
  }
  if (btZeroOrNull === 0) {
    return 0;
  }

  //Destructing book time object
  const { minute, hour, day, month, year, people } = btZeroOrNull;

  return new BookTime(minute, hour, day, month, year, people);
}
