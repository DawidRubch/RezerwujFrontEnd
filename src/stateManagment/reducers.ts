import { combineReducers } from "redux";

function getMaxTimeOr17() {
  let date = new Date();
  let hour = 17;
  let minutes = 0;
  if (date.getHours() > 17) {
    hour = date.getHours();
    if (date.getMinutes() > 30) {
      hour += 1;
      minutes = 0;
    }
  }
  return `${hour}:${minutes == 30 ? 30 : "00"}`;
}

const setNewDate = (date: Date = new Date(), action: any) => {
  switch (action.type) {
    case "Date":
      return action.value || date;
    default:
      return date;
  }
};
const setNewHour = (hourAndMinutes = getMaxTimeOr17(), action: any) => {
  switch (action.type) {
    case "Hour":
      return action.value || hourAndMinutes;
    default:
      return hourAndMinutes;
  }
};

const setPeople = (people = 2, action: any) => {
  switch (action.type) {
    case "People":
      return action.value || people;
    default:
      return people;
  }
};

const setLocation = (location = "", action: any) => {
  switch (action.type) {
    case "Location":
      return action.value !== undefined ? action.value : location;

    default:
      return location;
  }
};

const combinedReducers = combineReducers({
  date: setNewDate,
  hour: setNewHour,
  people: setPeople,
  location: setLocation,
});

export default combinedReducers;
