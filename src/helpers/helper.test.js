import {
  totalPrice,
  disableButton,
  addOrRemoveFromCart,
  addOrRemoveProductFromCart,
} from "./helpers";
import CHECKOUT_ACTIONS from "../constant/objectConstant";

describe("addOrRemoveProductFromCart", () => {
  let state;
  let dispatch;
  beforeEach(() => {
    state = { cart: { 1: 2, 2: 3 } };
    dispatch = jest.fn();
  });

  it("should add a product to the cart", () => {
    const { addProductToCart } = addOrRemoveProductFromCart(
      state,
      dispatch
    );
    addProductToCart(3);
    expect(dispatch).toHaveBeenCalledWith({
      type: CHECKOUT_ACTIONS.CART_ADD,
      payload: { 1: 2, 2: 3, 3: 1 },
    });
  });

  it("should remove a product from the cart", () => {
    const { removeProductFromCart } = addOrRemoveProductFromCart(
      state,
      dispatch
    );
    removeProductFromCart(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: CHECKOUT_ACTIONS.CART_REMOVE,
      payload: { 1: 2, 2: 2 },
    });
  });
});

describe("totalPrice", () => {
  it("should calculate the total price correctly", () => {
    const cart = { 1: 2, 2: 3 };
    const products = [
      { id: 1, price: 10 },
      { id: 2, price: 20 },
    ];
    const result = totalPrice(cart, products);
    expect(result).toEqual({
      cartSubtotal: 80,
      discount: 0,
      total: 80,
    });
  });

  it("should apply the discount correctly", () => {
    const cart = { 1: 2, 2: 3 };
    const products = [
      { id: 1, price: 100 },
      { id: 2, price: 100 },
    ];
    const result = totalPrice(cart, products);
    expect(result).toEqual({
      cartSubtotal: 500,
      discount: 0,
      total: 500,
    });
  });
});

describe("addOrRemoveFromCart", () => {
  it("should return functions to add or remove a product from the cart", () => {
    const product = { id: 1, quantity: 2 };
    const addProductToCart = jest.fn();
    const removeProductFromCart = jest.fn();
    const result = addOrRemoveFromCart(
      product,
      addProductToCart,
      removeProductFromCart
    );
    result.handleAddToCart();
    expect(addProductToCart).toHaveBeenCalledWith(1);
    result.handleRemoveFromCart();
    expect(removeProductFromCart).toHaveBeenCalledWith(1);
  });
});

describe("disableButton", () => {
  const product = {
    id: 1,
    quantity: 5,
  };

  test("should return disabled add button when product quantity is 0", () => {
    const cart = {};
    const { isAddDisabled } = disableButton(cart, {
      ...product,
      quantity: 0,
    });
    expect(isAddDisabled).toBe(true);
  });

  test("should return disabled add button when product quantity is already in cart", () => {
    const cart = { 1: 5 };
    const { isAddDisabled } = disableButton(cart, product);
    expect(isAddDisabled).toBe(true);
  });

  test("should return enabled add button when product quantity is not in cart", () => {
    const cart = { 2: 3 };
    const { isAddDisabled } = disableButton(cart, product);
    expect(isAddDisabled).toBe(false);
  });

  test("should return disabled remove button when product is not in cart", () => {
    const cart = {};
    const { isRemoveDisabled } = disableButton(cart, product);
    expect(isRemoveDisabled).toBe(true);
  });

  test("should return enabled remove button when product is in cart", () => {
    const cart = { 1: 3 };
    const { isRemoveDisabled } = disableButton(cart, product);
    expect(isRemoveDisabled).toBe(false);
  });
});
