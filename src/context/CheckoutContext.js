import {
  totalPrice,
  addOrRemoveProductFromCart,
} from "../helpers/helpers";
import CHECKOUT_ACTIONS, {
  INITIAL_STATE,
} from "../constant/objectConstant";
import { getProducts } from "../api/api";
import checkoutReducer from "../reducer/checkoutReducer";
import { createContext, useEffect, useReducer } from "react";

export const CheckoutContext = createContext();

const CheckoutDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    checkoutReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        dispatch({
          type: CHECKOUT_ACTIONS.PRODUCTS,
          payload: data,
        });
        dispatch({
          type: CHECKOUT_ACTIONS.IS_LOADING,
          payload: false,
        });
      } catch (err) {
        dispatch({
          type: CHECKOUT_ACTIONS.ERROR_FETCHING,
          payload: true,
        });
      }
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
