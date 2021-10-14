import { BookTime, bookTimeFromJson } from "../../../core/Entities/BookTime";

const tBookTime = new BookTime(30, 12, 10, 3, 2020, 8);

describe("BookTimeEntity", () => {
  test("should return BookTime model from JSON object", () => {
    expect(bookTimeFromJson(tBookTime)).toStrictEqual(tBookTime);
  });

  test("should return null from JSON Object, when bookTime is null", () => {
    expect(bookTimeFromJson(null)).toBe(null);
  });
});

export {};
