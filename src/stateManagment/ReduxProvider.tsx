import { Provider } from "react-redux";
import React from "react";
export const ReduxProvider = ({
  children,
  store,
}: {
  children: JSX.Element;
  store: any;
}) => {
  return <Provider store={store}>{children}</Provider>;
};
