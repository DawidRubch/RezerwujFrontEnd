export class BookTime {
  minute: number;
  hour: number;
  year: number;
  day: number;
  month: number;
  people: number;
  name: string;

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
    this.name = "";
  }
  toJson() {
    return {
      minute: this.minute,
      hour: this.hour,
      year: this.year,
      day: this.day,
      month: this.month,
      people: this.people,
      name: this.name,
    };
  }
}

interface BookTimeFromJson {
  minute: number;
  hour: number;
  day: number;
  month: number;
  year: number;
  people: number;
}

export function bookTimeFromJson(
  bookTimeOrNull: BookTimeFromJson | null
): BookTime | null {
  if (bookTimeOrNull === null) {
    return null;
  }
  let { minute, hour, day, month, year, people } = bookTimeOrNull;
  return new BookTime(minute, hour, day, month, year, people);
}
