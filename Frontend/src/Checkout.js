// React import
import React, { useState, useEffect } from "react";

// internal import
import { getProducts, getApiProducts } from "./api";
import LoadingIcon from "./LoadingIcon";

// Product component
const Product = ({ product, addProductToCart, removeFromCart }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p className="product-quantity">
        <button onClick={addProductToCart}>Add</button>
        Quantity:
        <span>{product.quantity}</span>
        <button onClick={removeFromCart}>Remove</button>
      </p>
    </div>
  );
};

// ProductList component
export const ProductList = ({ products, addProductToCart, removeProductFromCart, isLoading }) => {
  return (
    <div>
      <h1>Health Products</h1>

      <div className="card-container">
        {isLoading ? <LoadingIcon /> :  products.map((product) => (
          <div key={product.id} className="card">
            <Product product={product} addProductToCart={() => addProductToCart(product.id)} removeFromCart={() => removeProductFromCart(product.id)}/>
          </div>
        ))}
      </div>
    </div>
  );
};

// Checkout component
const Checkout = () => {
  // Define state variables
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [isSubDisabled, setIsSubDisabled] = useState(false);
  const [isAddDisabled, setIsAddDisabled] = useState(false);

  // Fetch the product data on mount using useEffect
  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      const products = await getApiProducts();
      setProducts(products);
    }
    // Show the loading icon while the data is being fetched
    setIsLoading(true);
    fetchData();
    // Hide the loading icon once the data has loaded
    setIsLoading(false);
  }, []);

  // Add a product to the cart
  const addProductToCart = (productId) => {
    // Find the product in the products array
    const product = products[parseInt(productId) - 1];
    // Update the cart array with the new product, unless it's already in the cart
    setCart((prev) => {
      setIsAddDisabled(true);
      return cart.includes(product) ? [...prev] : [...prev, product];
    })
  };

  // Remove a product from the cart
  const removeProductFromCart = (productId) => {
    // Find the product in the products array
    const product = products[parseInt(productId) - 1];
    // Get the index of the product in the cart
    const index = cart.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      // Remove the product from the cart
      setCart(prev => {
        const front = [...prev].slice(0, index);
        const back = [...prev].slice(index + 1);
        return front.concat(back);
      })
    }
  };


  // Increase the quantity of a product in the cart
  const increaseQuantityInCart = (productId) => {
    // Find the product in the products array
    const product = products.find((p) => p.id === parseInt(productId));
      
    // get the index of the product in the cart
    const cartIndex = cart.findIndex((p) => p.id === product.id);

    // Enable the decrease button if the quantity is greater than zero
    if ({...cart[cartIndex]}.quantity > 0) {
      setIsSubDisabled(false);
    }
    // Update the quantity of the product
    const updatedProduct = { ...cart[cartIndex], quantity: cart[cartIndex].quantity + 1 };
    // Update the cart array
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((p) => p.id === productId);
      const updatedCart = [...prevCart];
      updatedCart[productIndex] = updatedProduct;
      return updatedCart;
    });

    // Disable the increase button if the updated quantity is equal to the product quantity
    if (updatedProduct.quantity >= product.quantity) {
      setIsAddDisabled(true);
    }
  }

  // Decrease the quantity of a product in the cart
  const reduceQuantityInCart = (productId) => {
    // Find the product in the products array
    const product = products.find((p) => p.id === parseInt(productId));
      
    // get the index of the product in the cart
    const cartIndex = cart.findIndex((p) => p.id === product.id);

    // Update the quantity of the product
    const updatedProduct = { ...cart[cartIndex], quantity: cart[cartIndex].quantity - 1 };

    // Update the cart array
    if (updatedProduct.quantity >= 0) {
      setCart((prevCart) => {
        // Find the index of the product in the previous cart array
        const productIndex = prevCart.findIndex((p) => p.id === productId);
        // Create a new cart array with the updated product quantity
        const updatedCart = [...prevCart];
        updatedCart[productIndex] = updatedProduct;
        return updatedCart;
      });
    }

    // Disable the decrease button if the updated quantity is equal to zero
    if (updatedProduct.quantity === 0) {
      setIsSubDisabled(true);
    }

    // Enable the increase button if the updated quantity is less than the product quantity
    if (updatedProduct.quantity <= product.quantity) {
      setIsAddDisabled(false);
    }
  }

  // Calculate the total price of a product based on its quantity and unit price
  const calculateTotalProductPrice = (quantity, unitPrice) => {
    return (unitPrice * quantity).toFixed(2); // Ensure that the result has 2 decimal places
  }

  // Calculate the subtotal of a shopping cart
  const calculateSubtotal = (cart) => {
    // Use reduce to iterate over each item in the cart and accumulate the subtotal
    return cart.reduce((accumulator, currentItem) => accumulator + (currentItem.quantity * currentItem.price), 0).toFixed(2);
  }

  // Apply a discount to the subtotal if it exceeds a certain amount
  const manageDiscount = (cart) => {
    const SubTotal = calculateSubtotal(cart);
    return SubTotal > 1000 ? (0.1 * SubTotal).toFixed(2) : null; // Return the discount if the subtotal is greater than 1000, otherwise return null
  }

  // Calculate the total price of the shopping cart, including any discounts
  const calculateTotal = (cart) => {
    const SubTotal = calculateSubtotal(cart);
    const discount = manageDiscount(cart);
    return discount ? (SubTotal - discount).toFixed(2) : SubTotal; // Subtract the discount from the subtotal if there is one, otherwise return the subtotal
  }

  return (
    <> 
      <div className="product-grid">
        <ProductList products={products} addProductToCart={addProductToCart} removeProductFromCart={removeProductFromCart} isLoading={isLoading}/>
      </div>
      <div className="checkout-grid">
        <h1>Order Summary</h1>
        <table className="order-summary-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => reduceQuantityInCart(item.id)} disabled={isSubDisabled}>-</button>
                  {item.quantity}
                  <button onClick={() => increaseQuantityInCart(item.id)} disabled={isAddDisabled}>+</button>
                </td>
                <td>${calculateTotalProductPrice(item.quantity, item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Subtotal: ${calculateSubtotal(cart)}</p>
        <p>Discount: {manageDiscount(cart) && `$${manageDiscount(cart)}`}</p>
        <p>Total: ${calculateTotal(cart)}</p>
      </div>
    </>
  );
};

export default Checkout;
