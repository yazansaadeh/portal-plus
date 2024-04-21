import { createSlice } from "@reduxjs/toolkit";
import { login, getName, isAuthenticated } from "../thunks/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    content: null,
    isLoading: false,
    error: null,
    name: "",
    isLogin: Boolean(localStorage.getItem("isLogin")) || false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isLogin = false;
      console.log("action.payload1", action.payload);
      localStorage.setItem("isLogin", false);
      state.error = action.error.message;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.isLogin = true;
      console.log("action.payload2", action.payload);
      localStorage.setItem("isLogin", true);
      state.content = action.payload;
    });
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getName.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getName.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.name = action.payload;
    });
    builder.addCase(getName.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(isAuthenticated.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(isAuthenticated.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      console.log("action.payload3", action.payload);
      localStorage.setItem("isLogin", action.payload);
      state.isLogin = action.payload;
    });
    builder.addCase(isAuthenticated.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const userReducer = userSlice.reducer;
