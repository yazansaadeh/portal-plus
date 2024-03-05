import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const courseRegister = createAsyncThunk(
  "/api/course_register",
  async (values) => {
    const res = await axios.post("/api/course_register", values);
    return res.data;
  }
);

const createCourse = createAsyncThunk("/api/create_course", async (values) => {
  const res = await axios.post("/api/create_course", values);
  return res.data;
});

const getCourses = createAsyncThunk("/api/get_courses", async () => {
  const res = await axios.get("/api/get_courses");
  return res.data;
});
const getUserCourse = createAsyncThunk("/api/get_user_course", async () => {
  const res = await axios.get("/api/get_user_course");
  return res.data;
});

export { createCourse, courseRegister, getCourses, getUserCourse };
