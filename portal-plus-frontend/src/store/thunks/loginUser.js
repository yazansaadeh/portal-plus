import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const loginUser = createAsyncThunk("/login", async (values) => {
  const res = await axios.post("/api/login", values);
  return res.data;
});
export { loginUser };
