import CHECKOUT_ACTIONS from "../constant/objectConstant";

export const addOrRemoveProductFromCart = (state, dispatch) => {
  const addProductToCart = (productId) => {
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

export const totalPrice = (cart, products) => {
  const cartSubtotal = Object.keys(cart).reduce(
    (acc, productId) =>
      acc +
      products.find((p) => p.id === parseInt(productId)).price *
        cart[productId],
    0
  );
  const discount = cartSubtotal > 1000 ? cartSubtotal * 0.1 : 0;
  const total = cartSubtotal - discount;

  return { cartSubtotal, discount, total };
};

export const addOrRemoveFromCart = (
  product,
  addProductToCart,
  removeProductFromCart
) => {
  const handleAddToCart = () => addProductToCart(product.id);

  const handleRemoveFromCart = () =>
    removeProductFromCart(product.id);

  return { handleAddToCart, handleRemoveFromCart };
};

export const disableButton = (cart, product) => {
  const isAddDisabled =
    product.quantity === 0 ||
    (cart[product.id] || 0) >= product.quantity;
  const isRemoveDisabled = (cart[product.id] || 0) === 0;

  return { isAddDisabled, isRemoveDisabled };
};
