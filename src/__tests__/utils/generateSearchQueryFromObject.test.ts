import { generateSearchQueryFromObject } from "../../utils/generateSearchQueryFromObject";

const searchQuery = "?&a=1&b=2&c=2";

const tObject = {
  a: 1,
  b: 2,
  c: 2,
};

describe("generateSearchQueryFromObject", () => {
  test("should return proper searchQuery", () => {
    expect(generateSearchQueryFromObject(tObject)).toBe(searchQuery);
  });
});
export {};
