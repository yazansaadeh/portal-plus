import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const generateQRCode = createAsyncThunk(
  "/api/generateQRCode",
  async (values) => {
    const res = await axios.post("/api/generateQRCode", values);
    return res.data;
  }
);

export { generateQRCode };
