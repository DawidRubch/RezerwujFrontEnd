import { parse } from "path";
import { createStore } from "redux";
import combinedReducers from "./reducers";

function saveToLocalStorage(state: any) {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const localStorageItem = localStorage.getItem("state");
    console.log(localStorageItem);
    if (localStorageItem === null) return undefined;

    const parseLocalStorage = JSON.parse(localStorageItem);
    return {
      date: new Date(parseLocalStorage.date),
      hour: parseLocalStorage.hour,
      location: parseLocalStorage.location,
      people: parseLocalStorage.people,
    };
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const stateFromStorage = loadFromLocalStorage();

const store = createStore(combinedReducers, stateFromStorage);
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
export { store };
