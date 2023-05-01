import { combineReducers } from "@reduxjs/toolkit";
import product from "./products.slice";

const rootReducer = combineReducers({
  product,
});

export default rootReducer;

