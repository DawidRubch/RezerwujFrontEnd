import { generateSearchQ } from "utils/generateSearchQ";

const tSearchQParams = { date: "2020-03-04T15:30", people: "3" };
const tSearchQuery = "?&date=2020-03-04T15:30&people=3";

const tSearchQParamsWithName = {
  date: "2020-03-04T15:30",
  people: "3",
  name: "Pub",
};
const tSearchQueryWithName = "?&date=2020-03-04T15:30&people=3&name=Pub";

describe("generateSearchQ", () => {
  test("should generate correct search query without name", () => {
    expect(generateSearchQ(tSearchQParams)).toBe(tSearchQuery);
  });
  test("should generate correct search query without name", () => {
    expect(generateSearchQ(tSearchQParamsWithName)).toBe(tSearchQueryWithName);
  });
});

export {};
