import { combineReducers } from "@reduxjs/toolkit";
import product from "./products.slice";
import cart from "./cart.slice";

const rootReducer = combineReducers({
  product,
  cart
});

export default rootReducer;

