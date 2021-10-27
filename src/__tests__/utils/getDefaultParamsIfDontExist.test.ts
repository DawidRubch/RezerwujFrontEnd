import { SearchQParams } from "types";
import {
  DEFAULT_SEARCHQ_PARAMS,
  getDefaultParamsIfDontExist,
} from "../../utils/getDefaultParamsIfDontExist";

const tSearchQWithoutParams = "";

const tSearchQWithoutName = "?&date=2021-03-05T15:30&people=3";
const tSearchQ = tSearchQWithoutName + "&name=Fanaberia";

const tSearchQParamsWithoutName: SearchQParams = {
  people: "3",
  date: "2021-03-05T15:30",
};

const tSearchQParams = { ...tSearchQParamsWithoutName, name: "Fanaberia" };

describe("getDefaultParamsIfDontExist", () => {
  test("should return default Params if they dont exist", () => {
    expect(getDefaultParamsIfDontExist(tSearchQWithoutParams)).toStrictEqual(
      DEFAULT_SEARCHQ_PARAMS
    );
  });
  test("should return right params if they exist", () => {
    expect(getDefaultParamsIfDontExist(tSearchQWithoutName)).toStrictEqual(
      tSearchQParamsWithoutName
    );
  });
  test("should return right params if they exist, with name", () => {
    expect(getDefaultParamsIfDontExist(tSearchQ)).toStrictEqual(tSearchQParams);
  });
});

export {};
