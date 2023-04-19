import { useState, useEffect } from "react";
import { getProducts } from "../data/api";
import { ProductDetails } from "../utils/InterfaceData";

import ProductList from "./ProductList";

const Checkout = () => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [cartItems, setCartItems] = useState<ProductDetails[]>([]);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  let subTotal = 0;

  // get product subTotal
  cartItems.map((item: ProductDetails) => {
    subTotal += item.totalPrice;
    return subTotal;
  });
  const discountedTotal = subTotal >= 1000 ? (subTotal * 10) / 100 : 0;
  const total = subTotal >= 1000 ? subTotal - discountedTotal : subTotal;

  useEffect(() => {
    async function fetchData() {
      const data: any = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);

  // add item to cart
  const addProductToCart = (productId: number) => {
    const cartItem: any = products?.find(
      (product: ProductDetails) => product?.id === productId
    );

    cartItem.count = 1;
    cartItem.totalPrice = cartItem.price;

    setCartItems((prevCartItems: any) => [...prevCartItems, { ...cartItem }]);
    setAddedIds((prevAddtedItems: any) => [
      ...prevAddtedItems,
      cartItem?.id.toString(),
    ]);
  };

  // remove item from cart
  const removeProductFromCart = (productId: number) => {
    const remainingItems = cartItems.filter(
      (cart: ProductDetails) => cart?.id !== productId
    );
    const remainingIds = addedIds.filter(
      (id: string) => parseInt(id) !== productId
    );
    setCartItems(remainingItems);
    setAddedIds(remainingIds);
  };

  // increment item in cart
  const incrementQty = (e: any) => {
    const id = e.target.value;
    cartItems?.map((item: ProductDetails) => {
      if (item?.id.toString() === id) {
        item.count++;
        item.totalPrice = item.price * item.count;
        item.totalPrice = parseFloat(item.totalPrice.toFixed(2));
      }
      return item;
    });
    setCartItems([...cartItems]);
  };

  // decrement item in cart
  const decrementQty = (e: any) => {
    const id = e.target.value;
    cartItems?.map((item: ProductDetails) => {
      let reducedPrice = 0;
      if (item?.id.toString() === id) {
        item.count--;
        reducedPrice = item.totalPrice - item.price;
        item.totalPrice = parseFloat(reducedPrice.toFixed(2));
      }
      return item;
    });
    setCartItems([...cartItems]);
  };

  return (
    <>
      <div className="product-grid">
        <ProductList
          products={products}
          addProductToCart={addProductToCart}
          removeProductFromCart={removeProductFromCart}
          addedIds={addedIds}
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
          <tbody data-testid="cartitems">
            {cartItems.map((item: ProductDetails) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    disabled={item.count === 1 ? true : false}
                    value={item?.id}
                    onClick={(e) => decrementQty(e)}
                    data-testid="decrement"
                  >
                    -
                  </button>
                  <span data-testid="count">{item.count}</span>
                  <button
                    disabled={item.count === item.quantity ? true : false}
                    value={item?.id}
                    onClick={(e) => incrementQty(e)}
                    data-testid="increment"
                  >
                    +
                  </button>
                </td>
                <td>${item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Subtotal: ${subTotal.toFixed(2)}</p>
        <p>
          Discount: ${discountedTotal.toFixed(2)}{" "}
          <small className={subTotal >= 1000 ? "discount-color" : ""}>
            {subTotal >= 1000 ? "10% discount applied" : ""}
          </small>
        </p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
    </>
  );
};

export default Checkout;
