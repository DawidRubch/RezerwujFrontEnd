export enum Category {
  PARAMETER_CHOICE = "ParameterChoice",
  RESERVATION = "Reservation",
  PAGE_CHOICE = "PageChoice",
}

//Action used mostly for parameter type
export enum Action {
  SAVED_RESERVATION = "saved_reservation",
  PEOPLE = "changed_people_parameter",
  TIME = "changed_time_parameter",
  DATE = "changed_date_parameter",
}

//Label value in React-ga event, will be used as a page name
export enum Label {
  MAIN = "Main",
  ARRAY = "Array",
  DESCRIPTION = "Description",
  CONFIRM = "Confirm",
}
