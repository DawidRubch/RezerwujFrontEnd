export interface RestaurantDescriptionInfoResponse {
  descriptionPageImg: string;
  name: string;
  type: string;
  tags: string[];
  shortDescription: string;
  menuLink: string;
  alternativeBookingHours: {
    minute: number;
    hour: number;
    day: number;
    month: number;
    year: number;
    people: number;
  }[];
}
