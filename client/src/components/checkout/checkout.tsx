import React, {useEffect, useState} from "react";

const Checkout = (): JSX.Element => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // async function fetchData() {
    //   // const data = await getProducts();
    //   setProducts(data);
    // }
    // fetchData();
  }, []);
//   const addProductToCart = (productId) => {};

//   const removeProductFromCart = (productId) => {};
  return (
    <>
      {/* <div className="product-grid">
        <ProductList products={products} addProductToCart={addProductToCart} removeProductFromCart={removeProductFromCart} />
      </div> */}
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
            {/* {products.map((item) => (
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
            ))} */}
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