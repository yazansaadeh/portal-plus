import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { courseReducer } from "./slices/courseSlice";
import { attendanceReducer } from "./slices/attendanceSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
    course: courseReducer,
    attendance: attendanceReducer,
  },
});

export { store };
export * from "./thunks/user";
export * from "./thunks/course";
export * from "./thunks/attendance";
