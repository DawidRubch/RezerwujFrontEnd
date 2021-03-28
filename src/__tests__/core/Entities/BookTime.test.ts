import { BookTime, bookTimeFromJson } from "../../../core/Entities/BookTime";

const tBookTime = new BookTime(30, 12, 10, 3, 2020, 8);
const tToJsonFromBookTime = {
  minute: 30,
  hour: 12,
  day: 10,
  month: 3,
  year: 2020,
  people: 8,
  name: "",
};
describe("BookTimeEntity", () => {
  test("should return JSON object from BookTime model", () => {
    expect(tBookTime.toJson()).toStrictEqual(tToJsonFromBookTime);
  });

  test("should return BookTime model from JSON object", () => {
    expect(bookTimeFromJson(tBookTime)).toStrictEqual(tBookTime);
  });

  test("should return null from JSON Object, when bookTime is null", () => {
    expect(bookTimeFromJson(null)).toBe(null);
  });
});

export {};
