import { createSlice } from "@reduxjs/toolkit";
import { storeTrainingFile } from "../thunks/training";

const trainingSlice = createSlice({
  name: "training",
  initialState: { data: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(storeTrainingFile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(storeTrainingFile.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(storeTrainingFile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const trainingReducer = trainingSlice.reducer;
