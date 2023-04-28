import React from "react";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import TableRow from "./TableRow";
import { CheckoutContext } from "../../context/CheckoutContext";

describe("TableRow", () => {
  const mockAddProductToCart = jest.fn();
  const mockRemoveProductFromCart = jest.fn();
  const product = {
    id: 1,
    name: "Test Product",
    price: 9.99,
    quantity: 10,
  };
  const quantity = 3;
  const productId = 1;

  const renderTableRow = () => {
    return render(
      <CheckoutContext.Provider
        value={{
          addProductToCart: mockAddProductToCart,
          removeProductFromCart: mockRemoveProductFromCart,
        }}
      >
        <table>
          <tbody>
            <TableRow
              product={product}
              quantity={quantity}
              productId={productId}
            />
          </tbody>
        </table>
      </CheckoutContext.Provider>
    );
  };

  it("should render the product name", () => {
    renderTableRow();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should render the product price", () => {
    renderTableRow();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
  });

  it("should render the product quantity and add/remove buttons", () => {
    renderTableRow();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("should call the addProductToCart function when the + button is clicked", () => {
    renderTableRow();
    fireEvent.click(screen.getByText("+"));
    expect(mockAddProductToCart).toHaveBeenCalledWith(productId);
  });

  it("should call the removeProductFromCart function when the - button is clicked", () => {
    renderTableRow();
    fireEvent.click(screen.getByText("-"));
    expect(mockRemoveProductFromCart).toHaveBeenCalledWith(
      productId
    );
  });

  it("should render the total price", () => {
    renderTableRow();
    expect(screen.getByText("$29.97")).toBeInTheDocument();
  });
});
