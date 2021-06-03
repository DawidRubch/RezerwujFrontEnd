import { createStore } from "redux";
import combinedReducers from "./reducers";

const initialState = {
  date: new Date(),
  hour: "17:00",
  location: "",
  people: "4",
};

const store = createStore(
  combinedReducers,
  initialState,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export { store };
