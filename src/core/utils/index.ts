//Al index.ts with exports look like this due to error with TypeScript which I was not able to fix.
//Better syntax for this file would be:
//export * from "./A"
//export * from "./B"

import {
  generateSearchQFromBt,
  generateBtFromSearchQ,
} from "./interchangeBtAndSearchQ";
import { getClosestTimeOr17 } from "./getClosestTimeOr17";
import {
  getDateStringFromDate,
  getDateFromDateString,
} from "./interchangeDateAndDateString";
import { getDefaultParamsIfDontExist } from "./getDefaultParamsIfDontExist";
import { generateSearchQueryFromObject } from "./generateSearchQueryFromObject";
import { generateTimeArray } from "./generateTimeArray";
export {
  generateSearchQFromBt,
  getClosestTimeOr17,
  getDateStringFromDate,
  getDateFromDateString,
  getDefaultParamsIfDontExist,
  generateSearchQueryFromObject,
  generateTimeArray,
  generateBtFromSearchQ,
};
