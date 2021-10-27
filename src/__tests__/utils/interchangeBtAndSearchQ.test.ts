import { SearchQParams } from "types";
import { BookTime } from "../../core";
import { generateSearchQFromBt } from "../../utils/interchangeBtAndSearchQ";

const tSearchQ = `?&dateString=24.08.2021&hour=10:00&people=4&name=Fanaberia`;

const tBookTime = new BookTime(0, 10, 24, 8, 2021, 4);

describe("generateSearchQueryFromBt", () => {
  test("should generate SearchQuery from bookTime", () => {
    const expectedSearchQ = generateSearchQFromBt(tBookTime, "Fanaberia");
    expect(expectedSearchQ).toBe(tSearchQ);
  });
});

export {};
