import { Request, Response } from "express";
import { createProduct } from "./project.service";
import { BadRequestError, InternalServerError } from "../../commons/error";
import ProductCRUD from '../../utils/db/product/productdb.manager';
import logger from "../../utils/logging/logger";

export default class projectController {

  static async createProduct(req: Request, res: Response) {
    try{
      const productPayload = req.body;
      const newProduct = await createProduct(productPayload);
      console.log(newProduct);
      res.status(201).json({
        success: true,
        product: newProduct
      })
    } catch(e) {
      throw new InternalServerError(e);
    }
  }

  static async getProducts(req: Request, res: Response) {
    try{
      const products = await ProductCRUD.readAll();
      res.status(200).json({
        success: true,
        products
      })
    } catch(e) {
      logger.error(e);
      throw new InternalServerError()
    }
  }
}