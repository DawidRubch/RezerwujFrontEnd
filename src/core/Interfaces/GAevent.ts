export enum Category {
  PARAMETER_CHOICE = "ParameterChoice",
  RESERVATION = "Reservation",
}

//Action used mostly for parameter type
export enum Action {
  SAVED_RESERVATION = "SavedReservation",
  PEOPLE = "People",
  TIME = "Time",
  DATE = "Date",
}

//Label value in React-ga event, will be used as a page name
export enum Label {
  MAIN = "Main",
  ARRAY = "Array",
  DESCRIPTION = "Description",
  CONFIRM = "Confirm",
}

export interface GAevent {
  action: Action;
  category: Category;
  label?: Label;
}
