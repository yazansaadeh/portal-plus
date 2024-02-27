import { createSlice } from "@reduxjs/toolkit";
import { createCourse } from "../thunks/createCourse";

const courseSlice = createSlice({
  name: "course",
  initialState: { content: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.content = action.payload;
    });
    builder.addCase(createCourse.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const courseReducer = courseSlice.reducer;
