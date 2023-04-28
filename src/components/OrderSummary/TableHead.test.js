import React from "react";
import TableHeader from "./TableHead";
import { render } from "@testing-library/react";

describe("TableHeader", () => {
  it("renders the table header", () => {
    const { getByText } = render(<TableHeader />);
    expect(getByText("Product")).toBeInTheDocument();
    expect(getByText("Price")).toBeInTheDocument();
    expect(getByText("Quantity")).toBeInTheDocument();
    expect(getByText("Total")).toBeInTheDocument();
  });
});
