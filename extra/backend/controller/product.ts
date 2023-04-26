import { products } from "./data";
import express from "express";

const productRouter = express.Router();
// Route to get all transactions
productRouter.get("/products", (req, res) =>
  res.json({ data: products, error: null })
);
export default productRouter;
