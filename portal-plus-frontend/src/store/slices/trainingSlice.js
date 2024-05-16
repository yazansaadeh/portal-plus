import { createSlice } from "@reduxjs/toolkit";
import {
  storeTrainingFile,
  getTrainingFile,
  getTrainingFileForOneStudent,
  deleteTrainingFile,
  checkTrainingFile,
} from "../thunks/training";

const trainingSlice = createSlice({
  name: "training",
  initialState: {
    data: null,
    isLoading: false,
    error: null,
    trainingFile: [],
    userFile: null,
    checkStatus: null,
  },
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
    builder.addCase(getTrainingFile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTrainingFile.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.trainingFile = action.payload;
    });
    builder.addCase(getTrainingFile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTrainingFileForOneStudent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTrainingFileForOneStudent.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.userFile = action.payload;
    });
    builder.addCase(getTrainingFileForOneStudent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteTrainingFile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTrainingFile.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.userFile = null;
    });
    builder.addCase(deleteTrainingFile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(checkTrainingFile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(checkTrainingFile.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.checkStatus = action.payload;
    });
    builder.addCase(checkTrainingFile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const trainingReducer = trainingSlice.reducer;
