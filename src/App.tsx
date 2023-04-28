import "./App.css";
import { Switch, Route } from "react-router-dom";
import CheckOutPage from "./pages/CheckOutPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ProductPage}></Route>
        <Route path="/checkout" component={CheckOutPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
