import React, { useState, useEffect } from 'react';
import { getProducts } from './api';
import LoadingIcon from './LoadingIcon';

const Product = ({
  product,
  addProductToCart,
  removeProductFromCart,
  cartItems,
}) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItems, product]);

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p className="product-quantity">
        <button
          disabled={quantity >= product.quantity ? true : false}
          onClick={() => addProductToCart(product.id)}
        >
          Add
        </button>
        Quantity:
        <span>{product.quantity}</span>
        <button
          disabled={quantity === 0 ? true : false}
          onClick={() => removeProductFromCart(product.id)}
        >
          Remove
        </button>
      </p>
    </div>
  );
};

export const ProductList = ({
  products,
  addProductToCart,
  removeProductFromCart,
  cartItems,
}) => {
  return (
    <div>
      <h1>Health Products</h1>

      <div className="card-container">
        {products.map((product) => (
          <div key={product.id} className="card">
            <Product
              product={product}
              addProductToCart={addProductToCart}
              removeProductFromCart={removeProductFromCart}
              cartItems={cartItems}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [productCount, setProductCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProducts(data);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  const addProductToCart = (productId) => {
    // find the max-quantity for each product
    setProductCount(
      products.find((product) => product.id === productId).quantity
    );

    // copy items inside cart to a temp-cart variable
    const updatedCartItems = [...cartItems];

    // search if item already exists in cart
    const existingItemIndex = updatedCartItems.findIndex(
      (item) => item.id === productId
    );

    // if item already exists in temp-cart increase quantity and recalculate total
    if (existingItemIndex > -1) {
      updatedCartItems[existingItemIndex].quantity++;
      updatedCartItems[existingItemIndex].total =
        updatedCartItems[existingItemIndex].price *
        updatedCartItems[existingItemIndex].quantity;
    }
    // if its a new item create an object to represent it and push to temp-cart
    else {
      updatedCartItems.push({
        id: products.find((product) => product.id === productId).id,
        name: products.find((product) => product.id === productId).name,
        quantity: 1,
        price: products.find((product) => product.id === productId).price,
        total: products.find((product) => product.id === productId).price * 1,
      });
    }

    // save updated values from temp-cart to actual cart
    setCartItems(updatedCartItems);
  };

  const removeProductFromCart = (productId) => {
    // store cartitems in temp-cart variable
    const updatedCartItems = [...cartItems];

    // search for index of item in cart
    const itemIndex = updatedCartItems.findIndex(
      (item) => item.id === productId
    );

    // use index from the previous step to find item and reduce it's quantity
    if (itemIndex > -1) {
      if (updatedCartItems[itemIndex].quantity) {
        updatedCartItems[itemIndex].quantity--;
      }
    }

    // set temp cart items as cart items
    setCartItems(updatedCartItems);
  };

  // calculate subtotal/ order total
  let cartTotal = 0;

  cartItems.forEach((item) => {
    cartTotal += item.quantity * item.price;
  });

  // check to see if order total reaches discount criteria
  const discountApplied = cartTotal > 1000;

  // calculate discount to be applied based on discount criteria
  const discount = discountApplied ? cartTotal * 0.1 : 0;

  // calculate total after discount is applied
  const total = cartTotal - discount;

  return (
    <>
      {isLoading ? (
        <>
          {' '}
          <LoadingIcon />
        </>
      ) : (
        <>
          <div className="product-grid">
            <ProductList
              products={products}
              addProductToCart={addProductToCart}
              removeProductFromCart={removeProductFromCart}
              cartItems={cartItems}
            />
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
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <button
                        disabled={item.quantity <= 0 ? true : false}
                        onClick={() => removeProductFromCart(item.id)}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        disabled={item.quantity >= productCount ? true : false}
                        onClick={() => addProductToCart(item.id)}
                      >
                        +
                      </button>
                    </td>
                    <td>${item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Subtotal: ${cartTotal.toFixed(2)}</p>
            {discountApplied && <p>Discount (10%): ${discount.toFixed(2)}</p>}
            <p>Total: ${total.toFixed(2)}</p>
          </div>
        </>
      )}
    </>
  );
};

export default Checkout;
