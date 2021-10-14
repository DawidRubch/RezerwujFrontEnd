import { getClosestTimeOr17 } from "../../../core/utils/getClosestTimeOr17";

const tFunctionToGenerateDate = (hour: number, minutes: number) =>
  new Date(2021, 2, 15, hour, minutes, 0);

const mockDateHour15Minutes0 = tFunctionToGenerateDate(15, 0);
const mockDateHour16Minutes59 = tFunctionToGenerateDate(16, 59);
const mockDateHour17Minutes0 = tFunctionToGenerateDate(17, 0);
const mockDateHour17Minutes31 = tFunctionToGenerateDate(17, 31);
const mockDateHour24Minutes31 = tFunctionToGenerateDate(24, 31);
const mockDateHour23Minutes31 = tFunctionToGenerateDate(23, 31);

describe("getClosestTimeOr17", () => {
  test("should return 17:00, if its 15:00", () => {
    expect(getClosestTimeOr17(mockDateHour15Minutes0)).toBe("17:00");
  });
  test("should return 17:00, if its 16:59", () => {
    expect(getClosestTimeOr17(mockDateHour16Minutes59)).toBe("17:00");
  });
  test("should return 17:30, if its 17:00", () => {
    expect(getClosestTimeOr17(mockDateHour17Minutes0)).toBe("17:30");
  });
  test("should return 18:00, if its 17:31", () => {
    expect(getClosestTimeOr17(mockDateHour17Minutes31)).toBe("18:00");
  });
  test("should return 18:00, if its 17:31", () => {
    expect(getClosestTimeOr17(mockDateHour17Minutes31)).toBe("18:00");
  });
  test("should return 17:00, if its 24:31", () => {
    expect(getClosestTimeOr17(mockDateHour24Minutes31)).toBe("17:00");
  });
  test("should return 24:00, if its 23:31", () => {
    expect(getClosestTimeOr17(mockDateHour23Minutes31)).toBe("24:00");
  });
});

export {};
