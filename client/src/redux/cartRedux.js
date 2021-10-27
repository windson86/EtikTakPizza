import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      //state.total += action.payload.pizza.price;
    },
    clearCart: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
    clearProductFromCartByIndex: (state, action) => {
      state.quantity -= 1;
      state.products.splice(action.payload.index, 1);
    },

    /* clearProductFromCart: (state, action) => {
      state.quantity -= 1;

      state.products.splice(state.products.indexOf(action.payload._id));
      state.total -= action.payload.price;
    }, */
  },
});

export const {
  addProduct,
  clearCart,
  clearProductFromCart,
  clearProductFromCartByIndex,
} = cartSlice.actions;
export default cartSlice.reducer;
