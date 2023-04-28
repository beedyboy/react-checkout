import { Request, Response } from "express";
import { createProduct } from "./project.service";
import { InternalServerError } from "../../commons/error";
import ProductCRUD from '../../utils/db/userdb/productdb.manager';

class projectController {

  static async createProduct(req: Request, res: Response) {
    try{
      const productPayload = req.body;
      const newProduct = createProduct(productPayload);
      res.status(201).json({
        success: true,
        product: newProduct
      })
    } catch(e) {
      throw new InternalServerError()
    }
  }

  static async getProducts(req: Request, res: Response) {
    try{
      const products = ProductCRUD.readAll();
      res.status(200).json({
        success: true,
        products
      })
    } catch(e) {
      throw new InternalServerError()
    }
  }
}