import React, { useState, useEffect } from "react";
import { getProducts } from "../utils/api";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";

const Checkout = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data: any = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);
  // const addProductToCart = (productId) => {};

  // const removeProductFromCart = (productId) => {};
  return (
    <>
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
            {products?.map((item: any) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button>-</button>
                  {item.quantity}
                  <button>+</button>
                </td>
                <td>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Subtotal: $0</p>
        <p>Discount: $0</p>
        <p>Total: $0</p>
      </div>
    </>
  );
};

export default Checkout;
