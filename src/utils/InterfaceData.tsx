export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  count: number;
  totalPrice: number;
}

export interface ProductListProps {
  products: ProductDetails[];
  addProductToCart: (productId: number) => void;
  removeProductFromCart: (productId: number) => void;
  addedIds: string[];
}

export interface ProductProps {
  product: ProductDetails;
  addProductToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  addedIds: string[];
}
