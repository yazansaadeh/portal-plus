import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const login = createAsyncThunk("/login", async (values) => {
  const res = await axios.post("/api/login", values);
  return res.data;
});
const logout = createAsyncThunk("/logout", async (values) => {
  const res = await axios.get("/api/logout");
  return res.data;
});

const getName = createAsyncThunk("/api/get_name", async () => {
  const res = await axios.get("/api/get_name");
  return res.data;
});
const isAuthenticated = createAsyncThunk("/api/isLogin", async () => {
  const res = await axios.get("/api/isLogin");
  return res.data;
});
const getRule = createAsyncThunk("/api/get_rule", async () => {
  const res = await axios.get("/api/get_rule");
  return res.data;
});

const storeOfficeDay = createAsyncThunk(
  "/api/storeOfficeDay",
  async (values) => {
    const res = await axios.post("/api/storeOfficeDay", values);
    return res.data;
  }
);

const storeOfficeHour = createAsyncThunk(
  "/api/storeOfficeHour",
  async (values) => {
    const res = await axios.post("/api/storeOfficeHour", values);
    return res.data;
  }
);

const getDoctorName = createAsyncThunk("/api/getDoctorName", async () => {
  const res = await axios.get("/api/getDoctorName");
  return res.data;
});

const getDoctorOfficeTime = createAsyncThunk(
  "/api/getDoctorOfficeTime",
  async () => {
    const res = await axios.get("/api/getDoctorOfficeTime");
    return res.data;
  }
);

export {
  login,
  logout,
  getName,
  isAuthenticated,
  getRule,
  storeOfficeDay,
  storeOfficeHour,
  getDoctorName,
  getDoctorOfficeTime,
};
