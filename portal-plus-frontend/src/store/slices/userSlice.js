import { createSlice } from "@reduxjs/toolkit";
import { login, getName, isAuthenticated, getRule } from "../thunks/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    content: null,
    isLoading: false,
    error: null,
    name: "",
    isLogin: Boolean(localStorage.getItem("isLogin")) || false,
    rule: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isLogin = false;
      localStorage.setItem("isLogin", false);
      state.error = action.error.message;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.isLogin = true;
      console.log("login" + action.payload);
      localStorage.setItem("isLogin", action.payload);
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
      console.log("isAuthenticated" + action.payload);
      localStorage.setItem("isLogin", action.payload);
      state.isLogin = action.payload;
    });
    builder.addCase(isAuthenticated.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getRule.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getRule.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.rule = action.payload;
    });
    builder.addCase(getRule.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const userReducer = userSlice.reducer;
