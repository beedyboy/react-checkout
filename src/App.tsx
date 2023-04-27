import "./App.css";
import { Switch, Route } from "react-router-dom";
import Checkout from "./component/checkout/Checkout";
import ProductList from "./component/product-list/ProductList";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ProductList}></Route>
        <Route path="/checkout" component={Checkout}></Route>
      </Switch>
    </div>
  );
}

export default App;
