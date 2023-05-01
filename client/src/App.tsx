import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./routes/routesConfig";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
