import { createSlice } from "@reduxjs/toolkit";

/* export const getAllPizzas = createAsyncThunk("pizza/all", async () => {
  const response = await publicRequest.get("/pizza/all");
  return response.data;
}); */

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState: {
    pizzas: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getPizzasStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getPizzasSuccess: (state, action) => {
      state.isFetching = false;
      state.pizzas = action.payload;
    },
    getPizzasFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
  /* extraReducers: {
    [getAllPizzas.pending]: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    [getAllPizzas.fulfilled]: (state, action) => {
      state.pizzas = action.payload;

      state.isFetching = false;
      state.isLogged = true;
    },
    [getAllPizzas.rejected]: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  }, */
});

export const { getPizzasStart, getPizzasSuccess, getPizzasFailure } =
  pizzasSlice.actions;
export default pizzasSlice.reducer;
