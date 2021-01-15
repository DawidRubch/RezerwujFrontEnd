export const updateDate = (date: Date) => {
  return { type: "Date", value: date };
};

export const updateHour = (hour: string) => {
  return {
    type: "Hour",
    value: hour,
  };
};

export const updatePeopleCount = (people: number) => {
  return {
    type: "People",
    value: people,
  };
};

export const updateLocation = (location: string) => {
  return {
    type: "Location",
    value: location,
  };
};
