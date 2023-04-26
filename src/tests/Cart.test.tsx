import {
  waitFor,
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import App from "../App";

describe("Cart Function Tests", () => {
  test("Remove Product from cart", async () => {
    render(<App />);
    await waitFor(() => {
      const productId = 1;
      const addButton = screen.getByTestId(`btn-cart-add-${productId}`);
      const removeButton = screen.getByTestId(`btn-cart-remove-${productId}`);
      expect(addButton).toBeInTheDocument();
      act(() => {
        fireEvent.click(addButton);
      });
      expect(
        screen.queryByTestId(`row-order-${productId}`)
      ).toBeInTheDocument();
      act(() => {
        fireEvent.click(removeButton);
      });
      expect(screen.queryByTestId(`row-order-${productId}`)).toBeNull();
    });
  });
  test("Add Product to cart", async () => {
    render(<App />);
    await waitFor(() => {
      const productId = 1;
      expect(screen.queryByTestId(`row-order-${productId}`)).toBeNull();
      const addButton = screen.getByTestId(`btn-cart-add-${productId}`);
      expect(addButton).toBeInTheDocument();
      act(() => {
        fireEvent.click(addButton);
      });
      expect(
        screen.queryByTestId(`row-order-${productId}`)
      ).toBeInTheDocument();
    });
  });
});
