import { DEFAULT_SEARCHQ_PARAMS } from "../../../core/ImportantVariables";
import { getDefaultParamsIfDontExist } from "../../../utils/getDefaultParamsIfDontExist";

const tSearchQWithoutParams = "";

const tSearchQWithoutName = "?&hour=17:00&dateString=25.02.2021&people=3";
const tSearchQ = tSearchQWithoutName + "&name=Fanaberia";

const tSearchQParamsWithoutName = {
  dateString: "25.02.2021",
  hour: "17:00",
  people: "3",
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
    expect(getDefaultParamsIfDontExist(tSearchQ)).toStrictEqual(
      tSearchQParams
    );
  });
});

export {};
