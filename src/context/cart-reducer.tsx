export interface ProductItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface CartState {
  cartItems: ProductItem[];
  itemCount: number;
  total: number;
  discount: number;
  subtotal: number;
}

interface Action {
  type: string;
  payload: ProductItem;
}

export interface cartItemType {
  addProductToCart: (product: ProductItem) => void;
  increase: (product: ProductItem) => void;
  decrease: (product: ProductItem) => void;
  removeProductFromCart: (product: ProductItem) => void;
  clearCart: () => void;
  cartItems: ProductItem[];
  itemCount: number;
  total: number;
  subtotal: number;
}

let res: {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}[] = [];

res = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products")!)
  : [];

const storeCartItems = (cartItems: ProductItem[]): void => {
  const cart = cartItems.length > 0 ? cartItems : [];
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const sumItems = (cartItems: ProductItem[]): CartState => {
  storeCartItems(cartItems);
  let total_value = cartItems.reduce(
    (total, prod) => total + prod.price * prod.quantity,
    0
  );

  let subtotal = total_value;
  let discount = 0;
  if (total_value > 1000) {
    subtotal = total_value * 0.9;
    discount = total_value - subtotal;
  }
  return {
    itemCount: cartItems.reduce((total, prod) => total + prod.quantity, 0),
    total: total_value,
    discount: discount,
    cartItems: [...cartItems],
    subtotal: subtotal,
  };
};

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
      return {
        ...state,
        ...sumItems(state.cartItems),
      };
    case "INCREASE":
      const increaseIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[increaseIndex].quantity++;

      const productdetail = res.filter((item) => item.id === action.payload.id);

      if (
        productdetail[0].quantity <= state.cartItems[increaseIndex].quantity
      ) {
        state.cartItems[increaseIndex].quantity = productdetail[0].quantity;
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
      };
    case "DECREASE":
      const decreaseIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const product = state.cartItems[decreaseIndex];

      if (product.quantity > 1) {
        product.quantity--;
      }
      return {
        ...state,
        ...sumItems(state.cartItems),
      };
    case "REMOVE_ITEM":
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        ...sumItems(newCartItems),
      };
    case "CLEAR":
      localStorage.removeItem("cart");
      return {
        cartItems: [],
        itemCount: 0,
        total: 0,
        discount: 0,
        subtotal: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
