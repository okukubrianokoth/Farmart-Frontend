import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "./AuthService";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await AuthService.login(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const register = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    return await AuthService.register(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.isLoading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
