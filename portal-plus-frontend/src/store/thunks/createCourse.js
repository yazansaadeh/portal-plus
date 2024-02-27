import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const createCourse = createAsyncThunk("/api/create_course", async (values) => {
  const res = await axios.post("/api/create_course", values);
  return res.data;
});
export { createCourse };
