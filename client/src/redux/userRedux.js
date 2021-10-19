import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../requestMetods";

export const registerUser = createAsyncThunk("users/register", async (user) => {
  const response = await publicRequest.post("auth/register", user);
  return response.data;
});

export const loginUser = createAsyncThunk("users/login", async (user) => {
  const response = await publicRequest.post("auth/login", user);
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      isLogged: false,
    },
    pending: false,
    error: false,
  },
  reducers: {
    logout: (state) => {
      window.localStorage.clear();
      state.currentUser = {
        isLogged: false,
      };
      state.isLogged = false;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      setDataToStorage(action.payload);
      state.pending = false;
      state.isLogged = true;
    },
    [loginUser.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
    [registerUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      setDataToStorage(action.payload);
      state.pending = false;
      state.isLogged = true;
    },
    [registerUser.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

const setDataToStorage = (payload) => {
  window.localStorage.setItem("CurrentUser", payload.currentUser);
};

/* const logout = () => {
  window.localStorage.clear();
}; */
export const { logout } = userSlice.actions;
export default userSlice.reducer;
