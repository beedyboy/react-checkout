import create from 'zustand';
import { persist } from 'zustand/middleware';
import { StoreState } from './types';

const useProductStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product: any) => {
        set((state) => {
          const productInCart = state.cart.find(
            (item: any) => item.id === product.id
          );
          if (productInCart) {
            if (product.quantity > productInCart.cartQty) {
              return {
                cart: state.cart.map((item: any) =>
                  item.id === product.id
                    ? { ...item, cartQty: item.cartQty + 1 }
                    : item
                ),
              };
            }
            return { cart: [...state.cart ] };
          } else {
            return { cart: [...state.cart, { ...product, cartQty: 1 }] };
          }
        });
      },
      removeFromCart: (product: any) => {
        set((state: any) => {
          if (product.cartQty === 1) {
            return {
              cart: state.cart.filter((item: any) => item.id !== product.id),
            };
          }
          return {
            cart: state.cart.map((item: any) =>
              item.id === product.id
                ? { ...item, cartQty: item.cartQty - 1 }
                : item
            ),
          };
        });
      },
    }),
    {
      name: 'product-storage',
    }
  )
);

export default useProductStore;
