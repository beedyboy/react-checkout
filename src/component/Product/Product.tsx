import { FC, memo } from "react";
import { Product as ProductInterface } from "../../interface/product.interface";


const Product: FC<{ product: ProductInterface; addProductToCart: Function; removeFromCart: Function }> = ({ product, addProductToCart, removeFromCart }) => {
    return (
        <div className="product-card">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p className="product-quantity">
                <button onClick={() => addProductToCart(product.id)} >Add</button>
                Quantity:
                <span>{product.quantity}</span>
                <button onClick={() => removeFromCart(product.id)} >Remove</button>
            </p>
        </div>
    );
};


export default memo(Product)