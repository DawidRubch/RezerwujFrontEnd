export interface ReservationFindNextAvaliableJson {
  name: string;
  bookTime: {
    minute: number;
    hour: number;
    year: number;
    day: number;
    month: number;
    people: number;
    name: string;
  };
}
