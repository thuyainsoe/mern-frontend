import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue }) => {
    console.log(info, "info data");
    try {
      // const { data } = await api.post("/admin-login", info, {
      //   withCredentials: true,
      // });
      // return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(admin_login.pending, (state) => {
    //   state.loader = true;
    // });
  },
});

export default authSlice.reducer;
