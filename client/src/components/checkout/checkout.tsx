import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatsch";
import {
  addCartItemQuantity,
  removeFromCart,
  subtractCartItemQuantity,
} from "../../redux/slice/cart.slice";
import Container from "../layouts/container/container";
import "./checkout.scss";
import { Link } from "react-router-dom";

const Checkout = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: { cart: any }) => state.cart);
  console.log(cartItems, "**cart");

  const handleaddCartItemQuantity = (item: any) => {
    dispatch(addCartItemQuantity(item));
  };

  const handlesubtractCartItemQuantity = (item: any) => {
    dispatch(subtractCartItemQuantity(item));
  };

  const handleRemoveClick = (item: any) => {
    dispatch(removeFromCart(item));
  };

  React.useEffect(() => {});

  return (
    <Container>
      <div className="checkout-table">
        <h1>Order Summary</h1>
        <table className="order-summary-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.items?.map((item: any) => (
              // <Link to={`/product/${item?.id}`} className="link">
              <tr key={item?.id}>
                <td>{item?.name}</td>
                <td>${item?.price}</td>
                <td>{item?.stock}</td>
                <td>
                  <button
                    onClick={() =>
                      item?.quantity > 1 &&
                      handlesubtractCartItemQuantity({
                        id: item?.id,
                        price: item?.price,
                        quantity: item?.quantity,
                      })
                    }
                  >
                    -
                  </button>
                  <span style={{ margin: "0px 5px" }}>{item?.quantity}</span>
                  <button
                    onClick={() =>
                      item?.stock > item?.quantity &&
                      handleaddCartItemQuantity({
                        id: item?.id,
                        price: item?.price,
                        quantity: item?.quantity,
                      })
                    }
                  >
                    +
                  </button>
                </td>
                <td>${parseFloat((item.price * item.quantity).toFixed(2))}</td>
                <td>
                  <button
                    onClick={() =>
                      handleRemoveClick({
                        id: item?.id,
                        price: item?.price,
                        quantity: item?.quantity,
                      })
                    }
                  >
                    Remove
                  </button>
                  <Link
                    style={{ marginLeft: "10px" }}
                    to={`/product/${item?.id}`}
                  >
                    view
                  </Link>
                </td>
              </tr>
              // </Link>
            ))}
          </tbody>
        </table>
        {/* <p>Subtotal: ${parseFloat(cartItems?.total.toFixed(2)) }</p> */}
        <p>
          Discount:
          {cartItems?.total  > 1000
            ? parseFloat(
                (
                  ((cartItems?.total + cartItems?.total * (10 / 100)) * 10) /
                  100
                ).toFixed(2)
              )
            : 0}
          $
        </p>
        <p>Total: ${parseFloat(cartItems?.total.toFixed(2))}</p>
      </div>
    </Container>
  );
};

export default Checkout;
