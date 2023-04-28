import CHECKOUT_ACTIONS from "../constant/objectConstant";

// Adds or removes a product from the cart
export const addOrRemoveProductFromCart = (state, dispatch) => {
  const addProductToCart = (productId) => {
    // Dispatch a cart add action with updated cart object
    dispatch({
      type: CHECKOUT_ACTIONS.CART_ADD,
      payload: (() => {
        const cart = state.cart;
        const newCart = { ...cart };
        newCart[productId] = (newCart[productId] || 0) + 1;
        return newCart;
      })(),
    });
  };

  const removeProductFromCart = (productId) => {
    // Dispatch a cart remove action with updated cart object
    dispatch({
      type: CHECKOUT_ACTIONS.CART_REMOVE,
      payload: (() => {
        const cart = state.cart;
        const newCart = { ...cart };
        if (newCart[productId] > 0) {
          newCart[productId] -= 1;
        }
        if (newCart[productId] === 0) {
          delete newCart[productId];
        }
        return newCart;
      })(),
    });
  };

  return { addProductToCart, removeProductFromCart };
};

// Calculates the cart subtotal, discount, and total price
export const totalPrice = (cart, products) => {
  // Calculate the cart subtotal
  const cartSubtotal = Object.keys(cart).reduce(
    (acc, productId) =>
      acc +
      products.find((p) => p.id === parseInt(productId)).price *
        cart[productId],
    0
  );

  // Calculate the discount if applicable
  const discount = cartSubtotal > 1000 ? cartSubtotal * 0.1 : 0;

  // Calculate the total price
  const total = cartSubtotal - discount;

  return { cartSubtotal, discount, total };
};

// Returns two functions to add or remove a product from the cart
export const addOrRemoveFromCart = (
  product,
  addProductToCart,
  removeProductFromCart
) => {
  // Handle adding the product to the cart
  const handleAddToCart = () => addProductToCart(product.id);

  // Handle removing the product from the cart
  const handleRemoveFromCart = () =>
    removeProductFromCart(product.id);

  return { handleAddToCart, handleRemoveFromCart };
};

// Returns whether the add or remove button should be disabled
export const disableButton = (cart, product) => {
  // Determine whether the add button should be disabled
  const isAddDisabled =
    product.quantity === 0 ||
    (cart[product.id] || 0) >= product.quantity;

  // Determine whether the remove button should be disabled
  const isRemoveDisabled = (cart[product.id] || 0) === 0;

  return { isAddDisabled, isRemoveDisabled };
};
