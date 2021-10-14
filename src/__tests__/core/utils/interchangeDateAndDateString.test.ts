import {
  getDateFromDateString,
  getDateStringFromDate,
} from "../../../core/utils/interchangeDateAndDateString";

const tDate = new Date(2021, 5, 14);

const tDateString = "14.06.2021";

describe("getnDateStringFromDate", () => {
  test("should return correct date", () => {
    expect(getDateStringFromDate(tDate)).toBe(tDateString);
  });
});

describe("getDateFromDateString", () => {
  test("should return correct dateString", () => {
    const tReturnedDate = getDateFromDateString(tDateString);

    expect(tReturnedDate.getFullYear()).toBe(2021);
    expect(tReturnedDate.getMonth()).toBe(5);
    expect(tReturnedDate.getDate()).toBe(14);
  });
});

export {};
