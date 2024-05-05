import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  getName,
  isAuthenticated,
  getRule,
  logout,
} from "../thunks/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    content: null,
    isLoading: false,
    error: null,
    name: "",
    userId: "",
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
      state.name = action.payload.name;
      state.userId = action.payload.id;
    });
    builder.addCase(getName.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(isAuthenticated.rejected, (state, action) => {
      state.isLoading = false;
      localStorage.setItem("isLogin", false);
      state.error = action.error.message;
    });
    builder.addCase(isAuthenticated.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      // localStorage.setItem("isLogin", true);
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
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      localStorage.setItem("isLogin", false);
      state.error = action.error.message;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      localStorage.setItem("isLogin", false);
      state.content = null;
    });
    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const userReducer = userSlice.reducer;
