import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "./context/product-context";
import CartContextProvider from "./context/cart-context";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <CartContextProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </CartContextProvider>
  </BrowserRouter>
);
reportWebVitals();
