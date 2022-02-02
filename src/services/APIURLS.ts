export const APIURLS = {
  serverAddress: process.env.WDS_SOCKET_HOST || "http://localhost:5000",
  reservation: {
    reservation: "/reservation",
    save: "/reservation/save",
    delete: "/reservation/delete",
  },
  getRestaurants: "/getRestaurants",
  findNextAvailable: "/findNextAvailable",
  getRoPAlternativeBookingHours: "/getRoPAlternativeBookingHours",
  getRestaurantInfoDescriptionPage: "/getRoPInfoDescriptionPage",
  getRestaurantInfoConfirmPage: "/getRoPInfoConfirmPage",
  getRestaurantInfo: "/getRestaurant/:name",
};
