import { render } from "@testing-library/react";
import React from "react";
import { Loader } from "../../../../interface/components/Loader/Loader";
import { ReduxProvider } from "../../../../stateManagment/ReduxProvider";
import { store } from "../../../../stateManagment/store";
describe("Loader", () => {
  const renderLoader = () =>
    render(
      <ReduxProvider store={store}>
        <Loader />
      </ReduxProvider>
    );

  test("should render Loader", () => {
    renderLoader();
  });
});

export {};
