import React, { useState, useEffect } from "react";
import { getProducts } from "./api";
import LoadingIcon from "./LoadingIcon";

const Product = ({ product, addProductToCart, removeFromCart }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p className="product-quantity">
        <button onClick={()=>addProductToCart(product.id)}>Add</button>
        Quantity:
        <span>{product.quantity}</span>
        <button onClick={()=>removeFromCart(product.id)}>Remove</button>
      </p>
    </div>
  );
};

export const ProductList = ({ products, addProductToCart, removeProductFromCart }) => {
  return (
    <div>
      <h1>Health Products</h1>

      <div className="card-container">
        {products.map((product) => (
          <div key={product.id} className="card">
            <Product product={product} addProductToCart={addProductToCart} removeFromCart={removeProductFromCart}/>
          </div>
        ))}
      </div>
    </div>
  );
};

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sub, setSub] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try{
      setLoading(true)
      const data = await getProducts();
      setProducts(data);
      setLoading(false)
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  }, []);


  const addProductToCart = (productId) => {
    //check if product is already in the cart
    const check = cart.findIndex((i) => i.id === productId);
            //if product is not present, add to cart and include a product QTY property
            //QTY of product can be used to compare product's actual quantity
            if(check >= 0){
              //if product is already in the cart
              //making sure the product's QTY doesn't exceed the product's quantity
              if(cart[check].QTY === cart[check].quantity){
                setCart((prev)=> [...prev])
              }else{
                //increment the product QTY by one
                cart[check].QTY += 1;
                setCart((prev)=> [...prev])
              }
            } else {
                //add a new product to cart from products list with a QTY property
                const itemArray = products.filter((i)=> i.id === productId);
                const item = {...itemArray[0], QTY: 1}
                setCart((prev)=> [...prev, item])
            }
  };
  

  const removeProductFromCart = (productId) => {
    //check if product is already in the cart
    const checkCart = cart.findIndex((i) => i.id === productId);
    //error checking if product is not in cart to avoid reference error
    const check = cart[checkCart]?.QTY;

    //if product QTY is less than zero, avoid negative values
    if(check > 1){
      //if product QTY is greater than 1 add 1
      cart[checkCart].QTY -= 1
      setCart((prev)=> [...prev])
      //remove discount if total price is less than $1000
      if(total < 1000){
        setDiscount(0)
      }
    }else if (check === 1){
      //if product QTY is less than one remove from cart
      const remove = cart.filter(el => el.id !== productId)
      setCart(remove)
      if(total < 1000){
        setDiscount(0)
      }
    }
  };

  
  const findTotal=()=>{
    let t=0;
    //get the total amount in the cart
    cart.forEach((item) => {
        t += (item.QTY * item.price) * 100 ;
    });
    //round the value to two decimal places
    const val = ((Math.floor(t))/100);

    //check when total price exceeds $1000 to add the discount of 10%
    if( val < 1000){
      setTotal(val);
      setSub(val)
    }else{
      const tot = val;
      const dis = (Math.floor(((10/100) * tot)* 100))/100;
      setTotal((Math.floor((tot - dis)* 100))/100)
      setDiscount(dis)
      setSub(val)
    }
    
  }

  //only calculate for the total when a value changes in the cart
  useEffect(()=>{
    findTotal()
  }, [cart])
  return (
    <>
      <div className="product-grid">
        {
          loading? <LoadingIcon/>:<ProductList products={products} addProductToCart={addProductToCart} removeProductFromCart={removeProductFromCart} />
        }
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
                  <button onClick={()=>removeProductFromCart(item.id)}>-</button>
                  {item.QTY}
                  <button onClick={()=>addProductToCart(item.id)}>+</button>
                </td>
                <td>${Math.floor((item.price * item.QTY)* 100)/100}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Subtotal: ${sub}</p>
        <p>Discount: ${discount}</p>
        <p>Total: ${total}</p>
      </div>
    </>
  );
};

export default Checkout;
