import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
      toast.success("Item Added to Cart");
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((id) => id !== action.payload);
      toast.error("Item Removed to Cart");
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
