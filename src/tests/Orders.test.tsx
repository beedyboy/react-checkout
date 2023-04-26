import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "../App";
import { getProducts } from "../services";

describe("Order Tests", () => {
  beforeEach(() => {});
  // test("Increment Qty Btn is disabled at max qty of product", async () => {
  //   render(<App />);
  //   await waitFor(async () => {
  //     const product = (await getProducts())[0];
  //     const productId = product?.id;
  //     const cartAddBtn = screen.getByTestId(`btn-cart-add-${productId}`);
  //     expect(cartAddBtn).toBeInTheDocument();
  //     expect(screen.queryByTestId(`row-order-${productId}`)).toBeNull();
  //   });
  // });
  test("Decrease Order Quantity", async () => {
    render(<App />);
    await waitFor(async () => {
      const product = (await getProducts())[0];
      const productId = product?.id;
      const cartAddBtn = screen.getByTestId(`btn-cart-add-${productId}`);
      expect(cartAddBtn).toBeInTheDocument();
      act(() => {
        fireEvent.click(cartAddBtn);
      });
      expect(
        screen.queryByTestId(`row-order-${productId}`)
      ).toBeInTheDocument();
      const orderQtyIncBtn = screen.queryByTestId(
        `btn-order-increase-${productId}`
      );
      const orderQtyDecBtn = screen.queryByTestId(
        `btn-order-decrease-${productId}`
      );
      act(() => {
        if (orderQtyIncBtn) fireEvent.click(orderQtyIncBtn);
      });
      act(() => {
        if (orderQtyDecBtn) fireEvent.click(orderQtyDecBtn);
      });
      expect(
        Number(screen.queryByTestId(`qty-order-${productId}`)?.textContent)
      ).toBe(1);
    });
  });
  test("Increment Order Quantity", async () => {
    render(<App />);
    await waitFor(async () => {
      const product = (await getProducts())[0];
      const productId = product?.id;
      const cartAddBtn = screen.getByTestId(`btn-cart-add-${productId}`);
      expect(cartAddBtn).toBeInTheDocument();
      act(() => {
        fireEvent.click(cartAddBtn);
      });
      expect(
        screen.queryByTestId(`row-order-${productId}`)
      ).toBeInTheDocument();
      const orderQtyIncBtn = screen.queryByTestId(
        `btn-order-increase-${productId}`
      );
      act(() => {
        if (orderQtyIncBtn) fireEvent.click(orderQtyIncBtn);
      });
      expect(
        Number(screen.queryByTestId(`qty-order-${productId}`)?.textContent)
      ).toBeGreaterThan(1);
    });
  });
  test("Increment Qty Btn is disabled at max qty of product", async () => {
    render(<App />);
    await waitFor(async () => {
      const product = (await getProducts())[0];
      const productId = product?.id;
      const cartAddBtn = screen.getByTestId(`btn-cart-add-${productId}`);
      expect(cartAddBtn).toBeInTheDocument();
      expect(screen.queryByTestId(`row-order-${productId}`)).toBeNull();
      act(() => {
        fireEvent.click(cartAddBtn);
      });
      const orderQtyIncBtn = screen.queryByTestId(
        `btn-order-increase-${productId}`
      );
      act(() => {
        if (product && orderQtyIncBtn)
          for (let i = 1; i < product.quantity; i++) {
            fireEvent.click(orderQtyIncBtn);
          }
      });
      expect(orderQtyIncBtn).toBeDisabled();
    });
  });
  test("Decrement Qty Btn is disabled at minimum qty (1)", async () => {
    render(<App />);
    await waitFor(() => {
      const productId = 1;
      const cartAddBtn = screen.getByTestId(`btn-cart-add-${productId}`);
      expect(cartAddBtn).toBeInTheDocument();
      expect(screen.queryByTestId(`row-order-${productId}`)).toBeNull();
      act(() => {
        fireEvent.click(cartAddBtn);
      });
      expect(
        screen.queryByTestId(`row-order-${productId}`)
      ).toBeInTheDocument();
      const orderQtyDecBtn = screen.queryByTestId(
        `btn-order-decrease-${productId}`
      );
      expect(orderQtyDecBtn).toBeDisabled();
    });
  });
});
