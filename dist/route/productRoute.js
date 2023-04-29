"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const router = express_1.default.Router();
router.get("/products", (req, res, next) => (0, productController_1.getAllProducts)(req, res, next));
router.get("/product/:id", (req, res, next) => (0, productController_1.getSingleProduct)(req, res, next));
exports.default = router;
