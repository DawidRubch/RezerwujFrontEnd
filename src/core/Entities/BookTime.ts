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

interface BookTimeFromJson {
  minute: number;
  hour: number;
  day: number;
  month: number;
  year: number;
  people: number;
}

//When bookTime is not free then it should return null
export function bookTimeFromJson(
  bTZeroOrNull: BookTimeFromJson | null | 0
): BookTime | null | 0 {
  if (bTZeroOrNull === null) {
    return null;
  }

  if (bTZeroOrNull === 0) {
    return 0;
  }
  const { minute, hour, day, month, year, people } = bTZeroOrNull;
  return new BookTime(minute, hour, day, month, year, people);
}
