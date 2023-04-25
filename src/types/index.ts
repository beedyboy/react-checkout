export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
  };
  
  export type CartItemType = {
    id: string;
    quantity: number;
  };
  
  export type ProductListProps = {
    products: Product[];
    addProductToCart: (productId: string) => void;
    removeProductFromCart: (productId: string) => void;
  };
  
  export type ProductProps = {
    product: Product;
    addProductToCart: () => void;
    removeFromCart: () => void;
  };
  