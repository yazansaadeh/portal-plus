import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { courseReducer } from "./slices/courseSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
    course: courseReducer,
  },
});

export { store };
export * from "./thunks/loginUser";
export * from "./thunks/course";
