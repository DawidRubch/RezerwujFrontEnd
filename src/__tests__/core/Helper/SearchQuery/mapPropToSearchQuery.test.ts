import { mapPropToSearchQuery } from "../../../../core/Helper/SearchQuery/mapPropertiesToSearchQuery";

const todaysDate = new Date();

const tSearchQuery = `&dateString=${todaysDate.getDate()}.${todaysDate.getMonth()}.${todaysDate.getFullYear()}&hour=23:00&people=4`;

const tSearchQueryWithLocation = `&location=Duńska,%20Szczecin,%20Poland${tSearchQuery}`;

const tSearchQueryWithLocationAndName = `&location=Duńska,%20Szczecin,%20Poland${tSearchQuery}&name=Ładoga`;

const tLocation = "Duńska,%20Szczecin,%20Poland";

const tDateString = todaysDate.toDateString();

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
