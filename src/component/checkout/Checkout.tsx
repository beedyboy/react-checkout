import { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const {
    cartItems,
    subtotal,
    discount,
    itemCount,
    total,
    increase,
    decrease,
    removeProductFromCart,
  } = useContext(CartContext);

  const productTotal = (quantity: any, price: any) => {
    let _total: number = quantity * price;
    _total = parseFloat(_total.toFixed(2));

    return _total;
  };

  const totalValue = (value: any) => {
    let _total = parseFloat(value).toFixed(2);
    return _total;
  };



  const checkOutFunc = (itemCount: number) => {
    if (itemCount === 0) {
      toast.error('Please add Item(s)! to cart', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } else {
      toast.success('CheckOut Completed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="checkout-grid">
        <div className="checkout-head">
          <h1 className="checkout-title">Order Summary</h1>
          <a href="/" className="checkout-btn">
            View products
          </a>
        </div>
        <table className="order-summary-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    disabled={item.quantity === 1}
                    type="button"
                    onClick={() => {
                      decrease(item);
                    }}
                  >
                    -
                  </button>

                  {item.quantity}
                  <button
                    onClick={() => {
                      increase(item);
                    }}
                  >
                    +
                  </button>
                </td>
                <td>${productTotal(item.quantity, item.price)}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      removeProductFromCart(item);
                    }}
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-stn">
          <p className="sub-total">Item Count : {itemCount}</p>
          <p className="sub-total">Subtotal : ${totalValue(subtotal)}</p>
          <p className="discount">
            {discount > 0 ? (
              <p>
                You've recieved a discount of ${totalValue(discount)} on your
                order
              </p>
            ) : null}
          </p>
          <p className="total">Total : ${totalValue(total)}</p>
          <br></br>
          <br></br>
          <button
            className="check-btn"
            onClick={() => {
              checkOutFunc(itemCount);
            }}
          >
            Check Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
