import { SearchQParams } from "types";
import { BookTime } from "../../core";
import {
  generateBtFromSearchQ,
  generateSearchQFromBt,
} from "../../utils/interchangeBtAndSearchQ";

const tSearchQ = `?&dateString=24.08.2021&hour=10:00&people=4&name=Fanaberia`;

const tBookTime = new BookTime(0, 10, 24, 8, 2021, 4);

const tSearchQParams: SearchQParams = {
  dateString: "24.08.2021",
  hour: "10:00",
  people: "4",
  date: new Date(),
};

describe("generateSearchQueryFromBt", () => {
  test("should generate SearchQuery from bookTime", () => {
    const expectedSearchQ = generateSearchQFromBt(tBookTime, "Fanaberia");
    expect(expectedSearchQ).toBe(tSearchQ);
  });
});

describe("generateBtFromSearchQ", () => {
  test("should generate BookTime from search query", () => {
    const expectedBt = generateBtFromSearchQ(tSearchQParams);
    expect(expectedBt).toStrictEqual(tBookTime);
  });
});
export {};
