import {
  totalPrice,
  addOrRemoveProductFromCart,
} from "../helpers/helpers";
import { getProducts } from "../api/api";
import checkoutReducer from "../reducer/checkoutReducer";
import CHECKOUT_ACTIONS from "../constant/objectConstant";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  cart: {},
  products: [],
  isLoading: true,
};

export const CheckoutContext = createContext();

const CheckoutDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    checkoutReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    (async () => {
      const data = await getProducts();
      dispatch({
        type: CHECKOUT_ACTIONS.PRODUCTS,
        payload: data,
      });
      dispatch({
        type: CHECKOUT_ACTIONS.IS_LOADING,
        payload: false,
      });
    })();
  }, []);

  const { addProductToCart, removeProductFromCart } =
    addOrRemoveProductFromCart(state, dispatch);

  const { cartSubtotal, discount, total } = totalPrice(
    state.cart,
    state.products
  );

  const value = {
    state,
    total,
    dispatch,
    discount,
    cartSubtotal,
    addProductToCart,
    removeProductFromCart,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutDataProvider;
