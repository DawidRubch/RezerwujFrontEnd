import { SearchQParams } from "types";
import { getUpdatedSearchQ } from "utils/getUpdatedSearchQ";

const tSearchQParams: SearchQParams = {
  date: "2021-08-04T12:30",
  people: "3",
};

const tSearchQParamsWithName: SearchQParams = {
  ...tSearchQParams,
  name: "Pub",
};
describe("getUpdatedSearchQ", () => {
  test("should return correctly updated searchQ with hour param passed", () => {
    expect(getUpdatedSearchQ({ hour: "15:30" }, tSearchQParams)).toBe(
      "?&date=2021-08-04T15:30&people=3"
    );
  });
  test("should return correctly updated searchQ with hour param passed and name", () => {
    expect(getUpdatedSearchQ({ hour: "15:30" }, tSearchQParamsWithName)).toBe(
      "?&date=2021-08-04T15:30&people=3&name=Pub"
    );
  });
  test("should return correctly updated searchQ with dateString param passed", () => {
    expect(
      getUpdatedSearchQ({ dateString: "2021-10-30" }, tSearchQParams)
    ).toBe("?&date=2021-10-30T12:30&people=3");
  });
  test("should return correctly updated searchQ with dateString param passed and name", () => {
    expect(
      getUpdatedSearchQ({ dateString: "2021-10-30" }, tSearchQParamsWithName)
    ).toBe("?&date=2021-10-30T12:30&people=3&name=Pub");
  });
});

export {};
