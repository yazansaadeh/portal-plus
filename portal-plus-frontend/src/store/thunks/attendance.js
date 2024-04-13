import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const generateQRCode = createAsyncThunk(
  "/api/generateQRCode",
  async (values) => {
    const res = await axios.post("/api/generateQRCode", values);
    return res.data;
  }
);
const scanQRCode = createAsyncThunk("/api/scanQRCode", async (values) => {
  const res = await axios.post("/api/scanQRCode", values);
  return res.data;
});

const takeAttendance = createAsyncThunk(
  "/api/takeAttendance",
  async (values) => {
    const res = await axios.post("/api/takeAttendance", values);
    return res.data;
  }
);

export { generateQRCode, scanQRCode, takeAttendance };
