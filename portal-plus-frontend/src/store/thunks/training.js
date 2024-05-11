import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const storeTrainingFile = createAsyncThunk(
  "/api/storeTrainingFile",
  async (values) => {
    const res = await axios.post("/api/storeTrainingFile", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
);

const deleteTrainingFile = createAsyncThunk(
  "/api/deleteTrainingFile",
  async (values) => {
    const res = await axios.post("/api/deleteTrainingFile", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
);

export { storeTrainingFile, deleteTrainingFile };
