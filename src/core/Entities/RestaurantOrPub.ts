import { BookTime } from "./BookTime";
import { DayOfTheWeekOpenHours } from "./DayOfTheWeek";

export class RestaurantOrPub {
  name: string;
  type: string;
  tags: string[];
  shortDescription: string;
  distance: number;
  chairs: number;
  menuLink: string;
  bookTimeArray: BookTime[];
  image: string;
  descriptionPageImg: string;
  weekArray: Array<DayOfTheWeekOpenHours | null>;
  alternativeBookingHours: Array<BookTime | null | 0>;

  constructor(
    name: string,
    type: string,
    //Tags such as 'miła atmosfera' or "dużo opcji wegetariańskich"
    tags: string[],
    shortDescription: string,

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
    this.chairs = chairs;
    this.menuLink = menuLink;
    this.bookTimeArray = bookTimeArray;
    this.image = image;
    this.weekArray = weekArray;
    this.alternativeBookingHours = [];
  }
}
