import { render, screen, waitFor } from "@testing-library/react";
import Checkout from "./Components/Checkout";

// get all products
test("Product List and Checkout Page", async () => {
  render(<Checkout />);
  const productList = await waitFor(() => screen.findAllByTestId("products"));
  expect(productList).toHaveLength(10);
});
