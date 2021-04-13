import { cleanup, render } from "@testing-library/react";
import React from "react";
import { App } from "../../../../..";

afterEach(cleanup);
describe("Calendar", () => {
  test("should render", () => {
    const { getByPlaceholderText } = render(<App />);
  });
});
