import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("renders order summary title text", () => {
  render(<App />);
  const titleElement = screen.getByText(/order summary/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders products list", async () => {
  render(<App />);

  await waitFor(
    () => {
      const productCard = screen.getByText(/product/i);
      expect(productCard).toBeInTheDocument();
    },
    { timeout: 4000 }
  );
});
