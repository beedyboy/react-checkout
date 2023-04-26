import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import './App.css';
import Checkout from './pages/Checkout';
import NavBar from './components/NavBar/NavBar';
import Product from './pages/Product';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Product />} />
      <Route path="/checkout" element={<Checkout />} />
    </>
  )
);

function App() {
  return (
    <div className="App">
      <NavBar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
