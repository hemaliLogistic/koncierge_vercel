import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { saveData } from "@/utils/storage";
import { ForgetPasswordUser, LoginUser, RegisterUser, resetPassword } from "./services";

export const registerAction = createAsyncThunk(
  "authSlice/registerAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, status } = await RegisterUser(payload);
      console.log("data", data);
      saveData("user", data);
      return data;
    } catch (err) {
      // console.log("🚀 ~ err:", err);
      toast.error(err?.response?.data?.message || err.message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const loginAction = createAsyncThunk(
  "authSlice/loginAction",
  async (payload, { rejectWithValue }) => {
    try {
      // console.log("🚀 ~ payload:", payload);
      const { data, status } = await LoginUser(payload);
      console.log("data=====>", data);
      if (data?.token) {
        // localStorage.setItem("user", JSON.stringify(data));
        saveData("user", data);
      }
      return data;
    } catch (err) {
      console.log("🚀 ~ err:", err);
      toast.error(err?.response?.data?.message || err.message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const forgotPasswordAction = createAsyncThunk(
  "authSlice/forgotPasswordAction",
  async (payload, { rejectWithValue }) => {
    try {
      // console.log("🚀 ~ payload:", payload);
      const { data, status } = await ForgetPasswordUser(payload);

      return data;
    } catch (err) {
      console.log("🚀 ~ err:", err);
      toast.error(err?.response?.data?.message || err.message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const resetPasswordAction = createAsyncThunk(
  "authSlice/resetPasswordAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, status } = await resetPassword(payload);
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);
