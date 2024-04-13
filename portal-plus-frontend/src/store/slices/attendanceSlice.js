import { createSlice } from "@reduxjs/toolkit";
import { generateQRCode, scanQRCode } from "../thunks/attendance";

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: { data: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(generateQRCode.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(generateQRCode.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(generateQRCode.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(scanQRCode.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(scanQRCode.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(scanQRCode.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const attendanceReducer = attendanceSlice.reducer;
