import { TimePickerFunctions } from "../../../../InterfaceFunctions/ComponentFunctions/TimePickerFunctions/TimePickerFunctions";

//Times array from 19:00
const tDatesArrayFrom19 = [
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "24:00",
];
//Full array
const tFullDatesArray = [
  "0:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00",
  "5:30",
  "6:00",
  "6:30",
  "7:00",
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  ...tDatesArrayFrom19,
];

//Date set to 18:47
const tDateWhenItIsHour18AndMinutes47 = new Date();
tDateWhenItIsHour18AndMinutes47.setHours(18, 47);

//Date set to 19:00
const tDateWhenItIsHour19 = new Date();
tDateWhenItIsHour19.setHours(19, 0);

//Date set the next day
const tDateTheNextDay = new Date();
const currentDay = tDateTheNextDay.getDate();

tDateTheNextDay.setDate(currentDay + 1);

const timePickerFunctions = new TimePickerFunctions();
describe("TimePickerFunctions", () => {
  test("should generate array of dates from 19:00, when it is 18:47", () => {
    const dateArray = timePickerFunctions.generateTime(
      tDateWhenItIsHour18AndMinutes47
    );

    expect(dateArray).toStrictEqual(tDatesArrayFrom19);
  });

  test("should generate array of dates from 19:30, when its 19:00", () => {
    const dateArray = timePickerFunctions.generateTime(tDateWhenItIsHour19);

    expect(dateArray).toStrictEqual(tDatesArrayFrom19.slice(1));
  });

  test("should return full array from 0:00, when it's the other day", () => {
    const dateArray = timePickerFunctions.generateTime(tDateTheNextDay);

    expect(dateArray).toStrictEqual(tFullDatesArray);
  });
});

export {};
