import express, { Router, Request, Response, NextFunction } from "express";
import { getAllProducts, getSingleProduct } from "../controller/productController";

const router: Router = express.Router();

router.get("/products", (req: Request, res: Response, next:NextFunction) => getAllProducts(req, res, next));
router.get("/product/:id", (req: Request, res: Response, next:NextFunction) => getSingleProduct(req, res, next));

export default router;