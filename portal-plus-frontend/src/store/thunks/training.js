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
    const res = await axios.post("/api/deleteTrainingFile", values);
    return res.data;
  }
);

const getTrainingFile = createAsyncThunk("/api/getTrainingFile", async () => {
  const res = await axios.get("/api/getTrainingFile");
  return res.data;
});

const getTrainingFileForOneStudent = createAsyncThunk(
  "/api/getTrainingFileForOneStudent",
  async () => {
    const res = await axios.get("/api/getTrainingFileForOneStudent");
    return res.data;
  }
);

const checkTrainingFile = createAsyncThunk(
  "/api/checkTrainingFile",
  async (values) => {
    const res = await axios.post("/api/checkTrainingFile", values);
    return res.data;
  }
);

const removeFileInDoctorPage = createAsyncThunk(
  "/api/removeFileInDoctorPage",
  async (values) => {
    const res = await axios.post("/api/removeFileInDoctorPage", values);
    return res.data;
  }
);

export {
  storeTrainingFile,
  deleteTrainingFile,
  getTrainingFile,
  getTrainingFileForOneStudent,
  checkTrainingFile,
  removeFileInDoctorPage,
};
