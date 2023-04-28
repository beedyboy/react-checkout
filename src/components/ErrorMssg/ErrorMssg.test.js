import React from "react";
import { render } from "@testing-library/react";
import { ErrorMssg } from "./ErrorMssg";

describe("ErrorMssg", () => {
  it("renders the error message", () => {
    const { getByText } = render(<ErrorMssg />);
    const errorMsg = getByText(
      "Slow internet connection, try again"
    );
    expect(errorMsg).toBeInTheDocument();
  });
});
