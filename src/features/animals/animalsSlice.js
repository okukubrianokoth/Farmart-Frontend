import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AnimalService from "./AnimalService";

export const fetchAnimals = createAsyncThunk("animals/fetchAll", async (_, thunkAPI) => {
  try {
    return await AnimalService.getAll();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const animalsSlice = createSlice({
  name: "animals",
  initialState: { items: [], isLoading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimals.pending, (state) => { state.isLoading = true; })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      });
  },
});

export default animalsSlice.reducer;
