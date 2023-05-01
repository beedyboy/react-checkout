import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface Item {
  id: number;
  name: string;
  price: number;
  stock: number;
  quantity: number;
}

interface CartState {
  items: Item[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity++;
        toast.success(`One more ${item.name} quantity added`);
      } else {
        state.items.push({ ...item, quantity: 1 });
        toast.success(`Added ${item.name} to cart`);
      }

      state.total += item.price;
    },
    removeFromCart: (state, action: PayloadAction<Item>) => {
      const item = action.payload;
      state.items = state.items.filter((i) => i.id !== item.id);
      state.total = state.total - Number(item.quantity) * Number(item.price);
    },
    addCartItemQuantity: (state, action: PayloadAction<Item>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity++;
        console.log(state.items);

        const total = state.items.reduce((accumulator, item) => {
          const itemTotal = item.price * item.quantity;
          return accumulator + itemTotal;
        }, 0);

        state.total = total > 1000 ? total - (total * 10) / 100 : total;
      }
    },

    subtractCartItemQuantity: (state, action: PayloadAction<Item>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity--;

        const total = state.items.reduce((accumulator, item) => {
          const itemTotal = item.price * item.quantity;
          return accumulator + itemTotal;
        }, 0);

        state.total = total > 1000 ? total - (total * 10) / 100 : total;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  addCartItemQuantity,
  subtractCartItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
