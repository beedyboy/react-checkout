import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Checkout from './pages/Checkout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Checkout />} />
    </>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
