import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../requestMetods";

export const registerUser = createAsyncThunk("users/register", async (user) => {
  const response = await publicRequest.post("auth/register", user);
  return response.data;
});

export const loginUser = createAsyncThunk("users/login", async (user) => {
  const response = await publicRequest.post("auth/login", user);
  return response.data;
});

export const updateUser = createAsyncThunk("users/update", async (user) => {
  console.log("userRedux", user);
  const response = await userRequest.put(`user/${user._id}`, {
    user,
  });
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      isLogged: false,
      accessToken: "",
    },
    pending: false,
    error: false,
  },
  reducers: {
    logout: (state) => {
      window.localStorage.removeItem("persist:root");
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
    [updateUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;

      state.pending = false;
      state.isLogged = true;
    },
    [updateUser.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

const setDataToStorage = (payload) => {
  window.localStorage.setItem("accessToken", payload.accessToken);
};

export const { logout } = userSlice.actions;
export default userSlice.reducer;
