export interface RoPAlternativeBookingHoursResponse {
  alternativeBookingHours: {
    minute: number;
    hour: number;
    day: number;
    month: number;
    year: number;
    people: number;
  }[];
}
