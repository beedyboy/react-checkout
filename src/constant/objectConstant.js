const CHECKOUT_ACTIONS = {
  CART_ADD: "CART_ADD",
  PRODUCTS: "PRODUCTS",
  IS_LOADING: "IS_LOADING",
  CART_REMOVE: "CART_REMOVE",
  ERROR_FETCHING: "ERROR_FETCHING",
};

export const INITIAL_STATE = {
  cart: {},
  products: [],
  isLoading: true,
  errorFetching: false,
};

export default CHECKOUT_ACTIONS;
