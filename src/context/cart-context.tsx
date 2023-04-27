import { createContext, ReactNode, useReducer } from "react";
import { ProductItem } from "../types";
import cartReducer, { sumItems } from "./cart-reducer";

type CartContextType = {
  cartItems: ProductItem[];
  itemCount: number;
  total: number;
  discount: number;
  subtotal: number
  addProductToCart: (product: ProductItem) => void;
  increase: (product: ProductItem) => void;
  decrease: (product: ProductItem) => void;
  removeProductFromCart: (product: ProductItem) => void;
  // clearCart: () => void;
};
interface Props {
  children: ReactNode;
}

export interface Action {
  type: string;
  payload: ProductItem;
}
export const CartContext = createContext<CartContextType>({
  cartItems: [],
  itemCount: 0,
  total: 0,
  discount: 0,
  subtotal: 0,
  addProductToCart: () => {},
  increase: () => {},
  decrease: () => {},
  removeProductFromCart: () => {},
});

const cartFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : [];

const initialState = {
  ...sumItems(cartFromStorage),
  cartItems: cartFromStorage,
};

const CartContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addProductToCart = (product: ProductItem) =>
    dispatch({ type: "ADD_ITEM", payload: product });
  const increase = (product: ProductItem) =>
    dispatch({ type: "INCREASE", payload: product });
  const decrease = (product: ProductItem) =>
    dispatch({ type: "DECREASE", payload: product });
  const removeProductFromCart = (product: ProductItem) =>
    dispatch({ type: "REMOVE_ITEM", payload: product });
  const contextValues: CartContextType = {
    ...state,
    addProductToCart,
    increase,
    decrease,
    removeProductFromCart,

  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
