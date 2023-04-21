export interface ItemProps {
  [x: string]: any;
  id: number;
  name: string;
  description: string;
  price: number;
  count: number;
  quantity: number;
}

export interface ProductProps {
  [x: string]: any;
  id?: number;
  products?: ItemProps[] | any;
  carts: ItemProps[] | any;
  addProductToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}
