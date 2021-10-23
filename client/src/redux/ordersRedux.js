import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../requestMetods";

export const fetchUserOrders = createAsyncThunk("orders/user", async (user) => {
  const response = await userRequest.get(`orders/${user._id}`);
  return response.data;
});

export const ordersSlice = createSlice({
  name: "order",
  initialState: {
    orders: null /* [
      {
        userId: "",
        products: [],
        address: { city: "", street: "", zip: "", floor: "" },
        date: "",
        status: "",
      },
    ], */,
    isFetching: false,
    error: null,
  },
  reducers: {
    fetchPendingOrdersStart: (state) => {
      state.isFetching = true;
    },

    fetchPendingOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.isFetching = false;
    },
    fetchPendingOrdersFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
  extraReducers: {
    [fetchUserOrders.pending]: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    [fetchUserOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;

      state.isFetching = false;
    },
    [fetchUserOrders.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPendingOrdersStart,
  fetchPendingOrdersSuccess,
  fetchPendingOrdersFailure,
} = ordersSlice.actions;
export default ordersSlice.reducer;
