//BookTime model
//Should be rewritten to take only timeStamp and amount of people
export class BookTime {
  minute: number;
  hour: number;
  year: number;
  day: number;
  month: number;
  people: number;

  constructor(
    minute: number,
    hour: number,
    day: number,
    month: number,
    year: number,
    people: number
  ) {
    this.minute = minute;
    this.hour = hour;
    this.day = day;
    this.month = month;
    this.year = year;
    this.people = people;
  }
}
