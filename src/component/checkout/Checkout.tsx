import React, { useState, useEffect, FC, useReducer, useMemo } from "react";
import { getProducts } from "../../util/api";
import LoadingIcon from "../loadingicon/LoadingIcon";
import { Product as ProductInterface } from "../../interface/product.interface";
import ProductList from "../Product/ProductList";
import { AppState } from "../../interface/app.interface";

enum ACTION {
  UPDATE_PRODUCTS = "UPDATE_PRODUCTS",
  UPDATE_QUANTITY_IN_CART = "UPDATE_QUANTITY_IN_CART",
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  INCREASE_QUANTITY_IN_CART = "INCREASE_QUANTITY_IN_CART",
  DECREASE_QUANTITY_IN_CART = "DECREASE_QUANTITY_IN_CART"
}


type Action = { type: ACTION.DECREASE_QUANTITY_IN_CART, payload: ProductInterface[] } | { type: ACTION.INCREASE_QUANTITY_IN_CART, payload: ProductInterface[] } | { type: ACTION.REMOVE_FROM_CART, payload: ProductInterface[] } | { type: ACTION.ADD_TO_CART, payload: ProductInterface } | { type: ACTION.UPDATE_PRODUCTS, payload: ProductInterface[] } | { type: ACTION.UPDATE_QUANTITY_IN_CART, payload: ProductInterface[] }

const app: AppState = {
  products: [],
  cart: []
}

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case ACTION.ADD_TO_CART:
      return {
        ...state, cart: [...state.cart, action.payload]
      }

    case ACTION.REMOVE_FROM_CART:
      return {
        ...state, cart: action.payload
      }

    case ACTION.UPDATE_PRODUCTS:
      return { ...state, products: action.payload }

    case ACTION.UPDATE_QUANTITY_IN_CART:
      return { ...state, cart: action.payload }

    case ACTION.INCREASE_QUANTITY_IN_CART:
      return { ...state, cart:action.payload }

    case ACTION.DECREASE_QUANTITY_IN_CART:
      return { ...state, cart:action.payload }

    default:
      throw Error()
  }

}



const Checkout: FC = () => {
  const [state, dispatch] = useReducer(reducer, app)

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      //tracking the current quantity of product that is ordered with the current quantity variable
      const response: ProductInterface[] = data.map(el => ({
        id: el.id,
        description: el.description,
        name: el.name,
        price: el.price,
        quantity: el.quantity,
        currentQuantity: 0
      }))
      //setProducts(response);
      dispatch({ type: ACTION.UPDATE_PRODUCTS, payload: response }); //updating the products
    }
    fetchData();
  }, []);

  /* when adding to cart, we check if the id is in cart, is this is true we increase the quantity
     however if the quantity is not in the cart we add the item to cart
   */
  const addProductToCart = (productId: number) => {
    if (state.cart.length === 0) {
      let item: ProductInterface | undefined = state.products.find(el => el.id === productId)
      if (item) {
        // set the current quanitity to be 1
        item = {
          id: item.id,
          description: item.description,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          currentQuantity: item.currentQuantity + 1,
        }
        return dispatch({ type: ACTION.ADD_TO_CART, payload: item })
      }
    }

    if (state.cart.length > 0) {
      // checking if the productId id in cart
      const productInCart: ProductInterface | undefined = state.cart.find((el) => el.id === productId);
      if (productInCart) {
        const itemIndex = state.cart.findIndex(el => el.id === productId)
        state.cart[itemIndex] = {
          id: productInCart.id,
          description: productInCart.description,
          name: productInCart.name,
          price: productInCart.price,
          quantity: productInCart.quantity,
          currentQuantity: productInCart.currentQuantity + 1 > productInCart.quantity ? productInCart.quantity : productInCart.currentQuantity + 1,
        }
        return dispatch({ type: ACTION.UPDATE_QUANTITY_IN_CART, payload: state.cart })
      }

      // when the product is in cart
      if (!productInCart) {
        let item: ProductInterface | undefined = state.products.find(el => el.id === productId)
        if (item) {
          // set the current quanitity to be 1
          item = {
            id: item.id,
            description: item.description,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            currentQuantity: item.currentQuantity + 1,
          }
          dispatch({ type: ACTION.ADD_TO_CART, payload: item })
        } 
      }

    }

  };

  const removeProductFromCart = (productId: number) => {
    if (state.cart.length === 0) {
      return alert("Cart is Empty")
    }

    const productToRemove: ProductInterface | undefined = state.cart.find(el => el.id === productId);
    
    if (!productToRemove) {
      return alert(`product ${productId} is not in your order list`)
    }

    if (productToRemove) {
      let newCart: ProductInterface[] = state.cart.filter((el) => el.id !== productToRemove.id)
      return dispatch({ type: ACTION.REMOVE_FROM_CART, payload: newCart })
    }

  };

  // calculating the the quantity of product needed
  const addProductQuanityHandler = (productId: number) => {
    const productInCart: ProductInterface | undefined = state.cart.find((e: ProductInterface) => e.id === productId)
    const itemIndex = state.cart.findIndex((e: ProductInterface) => e.id === productId);

    if (productInCart) {
      state.cart[itemIndex] = {
        id: productInCart?.id,
        description: productInCart?.description,
        name: productInCart?.name,
        price: productInCart.price,
        quantity: productInCart.quantity - 1 < 0 ? 0 : productInCart.quantity - 1,
        currentQuantity: productInCart.currentQuantity + 1 > productInCart.quantity ? productInCart.quantity : productInCart.currentQuantity + 1,
      }
      return dispatch({ type: ACTION.INCREASE_QUANTITY_IN_CART, payload: state.cart })
    }
  }


  const reduceProductQuantityHandler = (productId: number) => {
    const productInCart: ProductInterface | undefined = state.cart.find((e: ProductInterface) => e.id === productId)
    const itemIndex = state.cart.findIndex((e: ProductInterface) => e.id === productId);
    if (productInCart) {
      state.cart[itemIndex] = {
        id: productInCart?.id,
        description: productInCart?.description,
        name: productInCart?.name,
        price: productInCart.price,
        quantity: productInCart.quantity,
        currentQuantity: productInCart.currentQuantity - 1 < 0 ? 0 : productInCart.currentQuantity - 1,
      }
      return dispatch({ type: ACTION.DECREASE_QUANTITY_IN_CART, payload: state.cart })
    }
  }
  
  
  const totalPriceInCart:number = useMemo(() => {
    let price:number = 0;
    if(state.cart.length === 0 ) {
      return price
    }

    const v:number = state.cart.reduce((accumalator:any, current:any) => {
      return (accumalator + (current?.price * current.currentQuantity))
    }, 0)

    return v

  }, [state])


  const totalPricewithDiscount:{price:number; discount:number} = useMemo(() => {
    if(totalPriceInCart >= 1000) {
      return {
        price:(totalPriceInCart - (totalPriceInCart * 0.1)),
        discount:totalPriceInCart * 0.1
      }
    }
    return {
      price:totalPriceInCart,
      discount:0
    }
  }, [totalPriceInCart])


  return (
    <>
      <div className="product-grid">
        <ProductList products={state.products} addProductToCart={addProductToCart} removeProductFromCart={removeProductFromCart} />
      </div>
      <div className="checkout-grid">
        <h1>Order Summary</h1>
        {state.cart.length > 0 ? (
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
              {state.cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => reduceProductQuantityHandler(item.id)} disabled={item.currentQuantity === 0 ? true : false}>-</button>
                    {item.currentQuantity}
                    <button onClick={() => addProductQuanityHandler(item.id)} disabled={item.currentQuantity === item.quantity ? true : false}>+</button>
                  </td>
                  <td>${(item.price * item.currentQuantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div> NO item in the cart</div>
        )}
        <p style={{ marginTop: "20px" }}>Subtotal: ${totalPriceInCart.toFixed(2)}</p>
        <p>Discount: ${totalPricewithDiscount.discount.toFixed(2)}</p>
        <p>Total: ${totalPricewithDiscount.price.toFixed(2)}</p>
      </div>
    </>
  );
};

export default Checkout;
