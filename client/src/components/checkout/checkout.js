import React, { useEffect, useState } from "react";
const Checkout = () => {
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
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "checkout-grid" },
            React.createElement("h1", null, "Order Summary"),
            React.createElement("table", { className: "order-summary-table" },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Product"),
                        React.createElement("th", null, "Price"),
                        React.createElement("th", null, "Quantity"),
                        React.createElement("th", null, "Total"))),
                React.createElement("tbody", null)),
            React.createElement("p", null, "Subtotal: $0"),
            React.createElement("p", null, "Discount: $0"),
            React.createElement("p", null, "Total: $0"))));
};
export default Checkout;
