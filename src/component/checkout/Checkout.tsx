import { useEffect, FC, useReducer, useMemo } from "react";
import { getProducts } from "../../util/api";
import LoadingIcon from "../LoadingIcon";
import { Product as ProductInterface } from "../../interface/product.interface";
import ProductList from "../Product/ProductList";
import { AppState } from "../../interface/app.interface";

enum ACTION {
  UPDATE_PRODUCTS = "UPDATE_PRODUCTS",
  UPDATE_QUANTITY_IN_CART = "UPDATE_QUANTITY_IN_CART",
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  INCREASE_QUANTITY_IN_CART = "INCREASE_QUANTITY_IN_CART",
  DECREASE_QUANTITY_IN_CART = "DECREASE_QUANTITY_IN_CART",
  UPDATE_LOADING_STATE = "UPDATE_LOADING_STATE"
}


type Action = { type: ACTION.UPDATE_LOADING_STATE, payload: boolean }
  | { type: ACTION.DECREASE_QUANTITY_IN_CART, payload: ProductInterface[] }
  | { type: ACTION.INCREASE_QUANTITY_IN_CART, payload: ProductInterface[] }
  | { type: ACTION.REMOVE_FROM_CART, payload: {cart:ProductInterface[]; products:ProductInterface[]} }
  | { type: ACTION.ADD_TO_CART, payload: { cartItem: ProductInterface; products: ProductInterface[] } }
  | { type: ACTION.UPDATE_PRODUCTS, payload: ProductInterface[] }
  | { type: ACTION.UPDATE_QUANTITY_IN_CART, payload: { cart: ProductInterface[]; products: ProductInterface[] } }

const app: AppState = {
  products: [],
  cart: [],
  loading: false
}

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case ACTION.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload.cartItem],
        products: action.payload.products
      }

    case ACTION.REMOVE_FROM_CART:
      return {
        ...state, 
        cart: action.payload.cart,
        products:action.payload.products
      }

    case ACTION.UPDATE_PRODUCTS:
      return { ...state, products: action.payload }

    case ACTION.UPDATE_QUANTITY_IN_CART:
      return { ...state, cart: action.payload.cart, products: action.payload.products }

    case ACTION.INCREASE_QUANTITY_IN_CART:
      return { ...state, cart: action.payload }

    case ACTION.DECREASE_QUANTITY_IN_CART:
      return { ...state, cart: action.payload }

    case ACTION.UPDATE_LOADING_STATE:
      return { ...state, loading: action.payload }

    default:
      throw Error()
  }

}



const Checkout: FC = () => {
  const [state, dispatch] = useReducer(reducer, app)

  useEffect(() => {
    dispatch({ type: ACTION.UPDATE_LOADING_STATE, payload: true })

    async function fetchData() {
      const data = await getProducts();
      //tracking the current quantity of product that is ordered with the current quantity variable
      const response: ProductInterface[] = data.map(el => ({
        id: el.id,
        description: el.description,
        name: el.name,
        price: el.price,
        quantity: el.quantity,
        currentQuantity: 0,
        quantityRemaining: el.quantity
      }))
      dispatch({ type: ACTION.UPDATE_PRODUCTS, payload: response }); //updating the products
    }

    setTimeout(() => {
      fetchData();
      dispatch({ type: ACTION.UPDATE_LOADING_STATE, payload: false })
    }, 3000)

  }, []);


  // get the product item and index
  const getProductItemById = (id: number): { item: ProductInterface | undefined; index: number } => {
    return {
      index: state.products.findIndex(el => el.id === id),
      item: state.products.find(el => el.id === id)
    }
  }


  /* when adding to cart, we check if the id is in cart, is this is true we increase the quantity
     however if the quantity is not in the cart we add the item to cart
   */
  const addProductToCart = (productId: number) => {
    const productItem = getProductItemById(productId);

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

        if (productItem.item) {
          state.products[productItem.index] = {
            id: productItem.item.id,
            description: productItem.item.description,
            name: productItem.item.name,
            price: productItem.item.price,
            quantity: productItem.item.quantity,
            currentQuantity: item.currentQuantity + 1,
            quantityRemaining: productItem.item.quantity - 1 < 0 ? 0 : productItem.item.quantity - 1
          }
        }

        return dispatch({ type: ACTION.ADD_TO_CART, payload: { cartItem: item, products: state.products } })
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

        if (productItem.item) {
          state.products[productItem.index] = {
            id: productItem.item.id,
            description: productItem.item.description,
            name: productItem.item.name,
            price: productItem.item.price,
            quantity: productItem.item.quantity,
            currentQuantity: productInCart.currentQuantity + 1 > productInCart.quantity ? productInCart.quantity : productInCart.currentQuantity + 1,
            quantityRemaining: productItem.item.quantityRemaining ? (productItem.item.quantityRemaining - 1 < 0 ? 0 : productItem.item.quantityRemaining - 1) : 0
          }
        }

        return dispatch({ type: ACTION.UPDATE_QUANTITY_IN_CART, payload: { cart: state.cart, products: state.products } })
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

          if (productItem.item) {
            state.products[productItem.index] = {
              id: productItem.item.id,
              description: productItem.item.description,
              name: productItem.item.name,
              price: productItem.item.price,
              quantity: productItem.item.quantity,
              currentQuantity: item.currentQuantity + 1,
              quantityRemaining: productItem.item.quantity - 1 < 0 ? 0 : productItem.item.quantity - 1
            }
          }
          return dispatch({ type: ACTION.ADD_TO_CART, payload: { cartItem: item, products: state.products } })
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

    const productItem = getProductItemById(productId);
    if (productToRemove) {
      let newCart: ProductInterface[] = state.cart.filter((el) => el.id !== productToRemove.id)
      if (productItem.item) {
        state.products[productItem.index] = {
          id: productItem.item.id,
          description: productItem.item.description,
          name: productItem.item.name,
          price: productItem.item.price,
          quantity: productItem.item.quantity,
          currentQuantity: 0,
          quantityRemaining: productItem.item.quantity
        }
      }
      return dispatch({ type: ACTION.REMOVE_FROM_CART, payload: {cart:newCart,  products:state.products} })
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


  const totalPriceInCart: number = useMemo(() => {
    let price: number = 0;
    if (state.cart.length === 0) {
      return price
    }

    const v: number = state.cart.reduce((accumalator: any, current: any) => {
      return (accumalator + (current?.price * current.currentQuantity))
    }, 0)

    return v

  }, [state])


  const totalPricewithDiscount: { price: number; discount: number } = useMemo(() => {
    if (totalPriceInCart >= 1000) {
      return {
        price: (totalPriceInCart - (totalPriceInCart * 0.1)),
        discount: totalPriceInCart * 0.1
      }
    }
    return {
      price: totalPriceInCart,
      discount: 0
    }
  }, [totalPriceInCart])


  return (
    <>

      <div className="product-grid">
        {state.loading ? (
          <LoadingIcon isLoading={state.loading} />
        ) : (
          <ProductList products={state.products} addProductToCart={addProductToCart} removeProductFromCart={removeProductFromCart} />
        )}

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
