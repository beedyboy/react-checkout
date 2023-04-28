import "./App.css";
import Checkout from "../Checkout/Checkout";
import CheckoutDataProvider from "../../context/CheckoutContext";

function App() {
  return (
    <CheckoutDataProvider>
      <div className="App">
        <Checkout />
      </div>
    </CheckoutDataProvider>
  );
}

export default App;
