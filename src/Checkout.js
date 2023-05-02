import React, { useState, useEffect } from 'react';
// import { getProducts } from './api';
import axios from 'axios';
import LoadingIcon from './LoadingIcon';

const Product = ({ product, addProductToCart, removeProductFromCart, cartItem }) => {

  const [disableAdd, setDisableAdd] = useState(false);
  const [disableRemove, setDisableRemove] = useState(false);
  
  useEffect(() => {
    if(cartItem.length > 0 ) {
      setDisableRemove(false)
      if( cartItem[0].quantity >= product.quantity) {
        setDisableAdd(true)
      } else {
        setDisableAdd(false)
      }
    } else {
      setDisableRemove(true)
    }
  }, [cartItem]);
  
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p className="product-quantity">
        <button disabled={disableAdd} onClick={addProductToCart}>Add</button>
        Quantity:
        <span>{product.quantity}</span>
        <button disabled={disableRemove} onClick={removeProductFromCart}>Remove</button>
      </p>
    </div>
  );
};

export const ProductList = ({
  products,
  addProductToCart,
  removeProductFromCart,
  cart
}) => {
  return (
    <div>
      <h1>Health Products</h1>

      <div className="card-container">
        {products.map((product) => (
          <div key={product.id} className="card">
            <Product
              product={product}
              addProductToCart={() => addProductToCart(product.id)}
              removeProductFromCart={() => removeProductFromCart(product.id)}
              cartItem={cart.filter(item => item.id === product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const CartItem = (props) => {

  const [disableAdd, setDisableAdd] = useState(false);
  
  useEffect(() => {
      if( props.quantity >= props.product.quantity) {
        setDisableAdd(true)
      } else {
        setDisableAdd(false)
      }
    }, [props.quantity]);

  return (
    <tr key={props.id}>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td>
        <button onClick={props.onRemove}>-</button>
        {Number(props.quantity)}
        <button disabled={disableAdd} onClick={props.onAdd}>+</button>
      </td>
      <td>{(props.price* props.quantity).toFixed(2)}</td>
    </tr>
  );
};

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      // Using the provided JSON data
      // const data = await getProducts();
      // setProducts(data);
      /* Products from a mongodb node backend check how to start server in the readme file*/
      const { data } = await axios.get("http://localhost:4008/api/products")
      setProducts(data.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const getTotal = () => {
    const grossTotal = cartItems.reduce((a, b) => (b.price * b.quantity) + a, 0)

    setSubTotal(grossTotal)

    if (grossTotal > 1000) {
      const discountPercentAmount = grossTotal * 0.1;
      const discountedAmount = grossTotal - discountPercentAmount;
      setTotalAmount(discountedAmount)
      setDiscount(discountPercentAmount);
    } else {
      setTotalAmount(grossTotal)
    }
  }

  useEffect(() => {
    getTotal()
  }, [cartItems])

  const addProductToCart = (productId) => {

    let product = products.filter((item) => item.id === productId);

    const itemIndex = cartItems.findIndex(item => item.id === productId)

    const updatedItems = [...cartItems]
    if(itemIndex >= 0) {
      product = updatedItems[itemIndex]
      updatedItems[itemIndex] = {...product, quantity: product.quantity + 1}
    } else {
      updatedItems.push({...product[0], quantity: 1})
    }

    setCartItems(updatedItems);
  };

  const removeProductFromCart = (productId) => {

    const itemIndex = cartItems.findIndex(item => item.id === productId)

    let updatedItems = [...cartItems];

    if(itemIndex >= 0) {
      const product = updatedItems[itemIndex]
      if(product.quantity === 1) {
        updatedItems = cartItems.filter((item) => item.id !== productId)
      } else {
        updatedItems[itemIndex] = {...product, quantity: product.quantity - 1}
      }
    }

    setCartItems(updatedItems)
  };

  if (isLoading) {
    return (
      <section className="">
        <div>
          <LoadingIcon isLoading={isLoading} />
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="product-grid">
        <ProductList
          products={products}
          addProductToCart={addProductToCart}
          removeProductFromCart={removeProductFromCart}
          cart={cartItems}
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
            {cartItems.map((product) => (
              <CartItem
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                quantity={product.quantity}
                onRemove={removeProductFromCart.bind(null, product.id)}
                onAdd={addProductToCart.bind(null, product.id)}
                product={products.filter(item => item.id === product.id)[0]}
              />
            ))}
          </tbody>
        </table>
        <p>Subtotal: ${subTotal.toFixed(2)}</p>
        <p>Discount: ${discount.toFixed(2)}</p>
        <p>Total: ${totalAmount.toFixed(2)}</p>
      </div>
    </>
  );
};

export default Checkout;
