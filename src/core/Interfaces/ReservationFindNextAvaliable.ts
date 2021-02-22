export interface ReservationFindNextAvaliableJson {
  name: string;
  email?: string;
  number?: string;
  personName?: string;
  surName?: string;
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
