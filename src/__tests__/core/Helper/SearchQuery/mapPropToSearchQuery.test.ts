import { mapPropToSearchQuery } from "../../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";

const tSearchQuery = "&dateString=25.2.2021&hour=23:00&people=4";

const tSearchQueryWithLocation =
  "&location=Duńska,%20Szczecin,%20Poland&dateString=25.2.2021&hour=23:00&people=4";

const tSearchQueryWithLocationAndName =
  "&location=Duńska,%20Szczecin,%20Poland&dateString=25.2.2021&hour=23:00&people=4&name=Ładoga";

const tLocation = "Duńska,%20Szczecin,%20Poland";

const tDateString =
  "Thu Mar 25 2021 21:39:51 GMT+0000 (Coordinated Universal Time)";

const tHour = "23:00";

const tPeople = "4";

const tName = "Ładoga";

describe("mapPropToSearchQuery", () => {
  test("should return query string from dateString,hour,people", () => {
    expect(mapPropToSearchQuery("", tDateString, tHour, tPeople)).toBe(
      tSearchQuery
    );
  });

  test("should return query string from dateString,hour,people,location", () => {
    expect(mapPropToSearchQuery(tLocation, tDateString, tHour, tPeople)).toBe(
      tSearchQueryWithLocation
    );
  });

  test("should return query string from dateString,hour,people,location,name", () => {
    expect(
      mapPropToSearchQuery(tLocation, tDateString, tHour, tPeople, tName)
    ).toBe(tSearchQueryWithLocationAndName);
  });
});

export {};
