import { render } from "@testing-library/react";
import { SearchButton } from "../../../../interface/components/SearchButton/SearchButton";
import { ReduxProvider } from "../../../../stateManagment/ReduxProvider";
import { store } from "../../../../stateManagment/store";
import React from "react";
import { BrowserRouter } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockReturnValue({
    pathname: "/another-route",
    search: "",
    hash: "",
    state: null,
    key: "5nvxpbdafa",
  }),
  useHistory: jest.fn().mockReturnValue({
    push: () => {},
  }),
}));

describe("Search button", () => {
  const renderSearchButton = () =>
    render(
      <ReduxProvider store={store}>
        <BrowserRouter>
          <SearchButton />
        </BrowserRouter>
      </ReduxProvider>
    );

  test("should render search button", () => {
    renderSearchButton();
  });
});

export {};
