import {
  changeDateStringToDate,
  changeDateToDateString,
} from "utils/interchangeDateToDateString";

const tDate = new Date(2021, 2, 3, 15, 30);
const tDateString = "2021-03-03T15:30";

const tDate2 = new Date(2020, 11, 25, 12, 30);
const tDateString2 = "2020-12-25T12:30";

const tDate3 = new Date(2020, 9, 2, 11, 0);
const tDateString3 = "2020-10-02T11:00";

describe("changeDateToDateString", () => {
  test("should change correctly date", () => {
    expect(changeDateToDateString(tDate)).toBe(tDateString);
  });
  test("should change correctly date", () => {
    expect(changeDateToDateString(tDate2)).toBe(tDateString2);
  });
});
test("should change correctly date", () => {
  expect(changeDateToDateString(tDate3)).toBe(tDateString3);
});

const tDate4 = new Date(2021, 9, 4, 15, 30);
const tDateString4 = "2021-10-04T15:30";

const todaysDate = new Date();
const tRandomString = "This is some text";

const tDate5 = new Date(2021, 4, 2, 8, 30);

const tDateString5 = "2021-05-02T08:30";

describe("changeDateStringToDate", () => {
  test("should change correctly dateString", () => {
    expect(changeDateStringToDate(tDateString4)).toStrictEqual(tDate4);
  });
  test("should return todays dateString, if given format is wrong", () => {
    expect(changeDateStringToDate(tRandomString).toString()).toBe(
      todaysDate.toString()
    );
  });
  test("should change correctly dateString", () => {
    expect(changeDateStringToDate(tDateString5)).toStrictEqual(tDate5);
  });
});

export {};
