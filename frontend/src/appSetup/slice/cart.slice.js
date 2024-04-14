import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((id) => id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
