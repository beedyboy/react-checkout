export type ProductState = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  cartQty: number;
};

export type StoreState = {
  cart: ProductState[];
  addToCart: (product: ProductState) => void;
  removeFromCart: (product: ProductState) => void;
};

export type ProductListTypes = {
  products?: ProductState[];
  addProductToCart: (product: ProductState) => void;
  removeProductFromCart: (product: ProductState) => void;
  cart: ProductState[];
}