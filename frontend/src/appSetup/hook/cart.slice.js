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
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      toast.error("Item Removed to Cart");
    },
    emptyCart: (state) => {
      state.cartItems = [];
    },
    updateCartQty: (state, action) => {
      const oldstate = state.cartItems;
      const newupdate = action.payload;
      const newArr = oldstate.map((obj) => {
        if (obj.id === newupdate.id) {
          return { ...obj, quantity: obj.quantity + newupdate.quantity };
        }
        return obj;
      });
      state.cartItems = newArr;
      toast.success("Qty Updated");
    },
  },
});

export const { addToCart, removeFromCart, updateCartQty, emptyCart } =
  cartSlice.actions;

export const cartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
