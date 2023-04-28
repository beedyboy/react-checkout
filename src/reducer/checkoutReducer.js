import CHECKOUT_ACTIONS from "../constant/objectConstant";

const checkoutReducer = (state, action) => {
  switch (action.type) {
    case CHECKOUT_ACTIONS.CART_ADD:
      return {
        ...state,
        cart: action.payload,
      };

    case CHECKOUT_ACTIONS.PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case CHECKOUT_ACTIONS.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case CHECKOUT_ACTIONS.CART_REMOVE:
      return {
        ...state,
        cart: action.payload,
      };

    case CHECKOUT_ACTIONS.ERROR_FETCHING:
      return {
        ...state,
        errorFetching: action.payload,
      };

    default:
      return state;
  }
};

export default checkoutReducer;
