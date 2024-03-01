import { createSlice } from "@reduxjs/toolkit";
import { courseRegister, createCourse, getCourses } from "../thunks/course";

const courseSlice = createSlice({
  name: "course",
  initialState: { data: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.data.push(...action.payload);
    });
    builder.addCase(createCourse.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(courseRegister.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(courseRegister.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.data.push(...action.payload);
    });
    builder.addCase(courseRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getCourses.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.data.push(...action.payload);
    });
    builder.addCase(getCourses.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const courseReducer = courseSlice.reducer;