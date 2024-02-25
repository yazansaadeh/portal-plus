import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/loginUser";

const userSlice = createSlice({
  name: "user",
  initialState: { content: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.content = action.payload;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const userReducer = userSlice.reducer;
