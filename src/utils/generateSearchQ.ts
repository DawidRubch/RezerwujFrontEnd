import { SearchQParams } from "types";

export const generateSearchQ = (searchQParams: SearchQParams) => {
  let searchQ = "?";

  for (const [key, value] of Object.entries(searchQParams)) {
    searchQ += `&${key}=${value}`;
  }
  return searchQ;
};
