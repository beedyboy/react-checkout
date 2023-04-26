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
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
};
