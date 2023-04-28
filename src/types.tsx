export interface ProductItem {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
  }
  
  export interface CheckOutProps {
    products: ProductItem[];
    addProductToCartToCart: (product: ProductItem) => void;
    removeFromCart: () => void;
    removeProductFromCartFromCart: () => void;
    data: [];
  }

  export interface ProductProps {
    product: ProductItem;
    // addProductToCartToCart: () => {};
    // removeFromCart: () => void;
    // removeProductFromCartFromCart: () => void;
  }

  export interface ProductListProps {
   
    addProductToCartToCart: (product: ProductItem) => void;
    removeFromCart: () => void;
    removeProductFromCartFromCart: () => void;
  }