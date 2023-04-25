import { FC, memo, MouseEventHandler } from "react";
import { Product as ProductInterface } from "../../interface/product.interface";
import Product from "./Product";

const ProductList: FC<{ products: ProductInterface[]; addProductToCart: Function; removeProductFromCart: Function }> = ({ products, addProductToCart, removeProductFromCart }) => {
    return (
        <div>
            <h1>Health Products</h1>

            <div className="card-container">
                {products.map((product:ProductInterface) => (
                    <div key={product.id} className="card">
                        <Product product={product} addProductToCart={() => addProductToCart(product.id)} removeFromCart={removeProductFromCart} />
                    </div>
                ))}
            </div>
        </div>
    );
};


export default memo(ProductList)