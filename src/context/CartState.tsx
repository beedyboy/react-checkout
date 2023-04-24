import React, { useReducer } from "react";
import CartReducer, { sumItems } from "./CartReducer";
import CartContext from "./CartContext";

const storage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems")!)
  : [];

interface CartStateProp {
  children: React.ReactNode;
}
const CartState = ({ children }: CartStateProp) => {
  // initial cart state

  const initialState = {
    cartItems: [],
    ...sumItems(storage),
    checkout: false,
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = (payload: any) => {
    dispatch({ type: "ADD_TO_CART", payload });
  };

  // function to handle if item is in the cart is added again

  const increase = (payload: any) => {
    dispatch({ type: "INCREASE", payload });
  };
  //Function to handle when an item is removed from the cart
  const decrease = (payload: any) => {
    dispatch({ type: "DECREASE", payload });
  };

  //Function to remove an item from the cart
  const removeFromCart = (payload: any) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  //Function to clear the cart
  const clearCart = () => {
    dispatch({
      type: "CLEAR",
      payload: {
        id: undefined,
      },
    });
  };

  //Function to handle when the user clicks the checkout button
  const handleCheckout = () => {
    dispatch({
      type: "CHECKOUT",
      payload: {
        id: undefined,
      },
    });
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        increase,
        decrease,
        handleCheckout,
        clearCart,
        ...state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
