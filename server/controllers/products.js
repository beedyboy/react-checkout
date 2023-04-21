"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
;
const products = [
    {
        id: 1,
        name: 'Product 1',
        description: 'This is the first product',
        price: 9.99,
        quantity: 10
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'This is the second product',
        price: 19.99,
        quantity: 20
    },
    {
        id: 3,
        name: 'Product 3',
        description: 'This is the third product',
        price: 29.99,
        quantity: 30
    },
    {
        id: 4,
        name: 'Product 4',
        description: 'This is the fourth product',
        price: 39.99,
        quantity: 40
    },
    {
        id: 5,
        name: 'Product 5',
        description: 'This is the fifth product',
        price: 49.99,
        quantity: 50
    },
    {
        id: 6,
        name: 'Product 6',
        description: 'This is the sixth product',
        price: 59.99,
        quantity: 60
    },
    {
        id: 7,
        name: 'Product 7',
        description: 'This is the seventh product',
        price: 69.99,
        quantity: 70
    },
    {
        id: 8,
        name: 'Product 8',
        description: 'This is the eighth product',
        price: 79.99,
        quantity: 80
    },
    {
        id: 9,
        name: 'Product 9',
        description: 'This is the ninth product',
        price: 89.99,
        quantity: 90
    },
    {
        id: 10,
        name: 'Product 10',
        description: 'This is the tenth product',
        price: 99.99,
        quantity: 100
    }
];
const Products = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(products);
});
exports.default = Products;
