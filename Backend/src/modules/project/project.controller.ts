import { Request, Response } from "express";
import { createProduct } from "./project.service";
import { InternalServerError } from "../../commons/error";
import ProductCRUD from '../../utils/db/userdb/productdb.manager';
import logger from "../../utils/logging/logger";

export default class projectController {

  static async createProduct(req: Request, res: Response) {
    try{
      const productPayload = req.body;
      console.log(productPayload);
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
      throw new InternalServerError()
    }
  }
}