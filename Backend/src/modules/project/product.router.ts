import projectController from "./project.controller";
import { Router } from "express";

const productRouter: Router = Router();

productRouter.post("/" ,projectController.createProduct);
productRouter.get("/", projectController.getProducts);
productRouter.get("/:id", projectController.getProduct);

export default productRouter;