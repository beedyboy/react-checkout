import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckoutContext } from "../../context/CheckoutContext";
import {
  addOrRemoveFromCart,
  disableButton,
} from "../../helpers/helpers";
import Product from "./Product";

// Mock product object
const product = {
  id: 1,
  name: "Test Product",
  description: "A test product",
  price: 10.0,
  quantity: 5,
};

// Mock cart state
const cartState = {
  cart: {
    [product.id]: 2,
  },
  products: [product],
};

// Mock addProductToCart and removeProductFromCart functions
const addProductToCart = jest.fn();
const removeProductFromCart = jest.fn();

// Mock CheckoutContext value
const contextValue = {
  state: cartState,
  addProductToCart,
  removeProductFromCart,
};

describe("Product", () => {
  it("renders product information", () => {
    render(
      <CheckoutContext.Provider value={contextValue}>
        <Product product={product} />
      </CheckoutContext.Provider>
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(
      screen.getByText(product.description)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Price: $${product.price.toFixed(2)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Total: $${(product.price * 2).toFixed(2)}`
      )
    ).toBeInTheDocument();
  });
});
