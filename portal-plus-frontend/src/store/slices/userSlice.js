import { createSlice } from "@reduxjs/toolkit";
import { login, getName } from "../thunks/user";

const userSlice = createSlice({
  name: "user",
  initialState: { content: null, isLoading: false, error: null, name: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
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
  },
});

export const userReducer = userSlice.reducer;
