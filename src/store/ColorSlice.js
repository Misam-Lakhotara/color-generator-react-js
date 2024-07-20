import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
import { config } from "../config/config.js";

export const fetchColors = createAsyncThunk("colors/fetchColors", async () => {
  const response = await axios.get(`${config.API_URL}/api/colors/`);
  return response.data.colors;
});

export const addColor = createAsyncThunk(
  "colors/addColor",
  async (newColor, { rejectWithValue }) => {
    try {
      await axios.post(`${config.API_URL}/api/colors`, newColor);
      return newColor;
    } catch (error) {
      toast.error("Failed to add color");
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteColor = createAsyncThunk(
  "colors/deleteColor",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${config.API_URL}/api/colors/${id}`);
      toast.success("Color deleted successfully");
      return id;
    } catch (error) {
      toast.error("Failed to delete color");
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateColor = createAsyncThunk(
  "colors/updateColor",
  async ({ id, updatedColor }, { rejectWithValue }) => {
    try {
      await axios.put(`${config.API_URL}/api/colors/${id}`, updatedColor);
      return { id, updatedColor };
    } catch (error) {
      toast.error("Failed to update color");
      return rejectWithValue(error.response.data);
    }
  }
);

const colorSlice = createSlice({
  name: "colors",
  initialState: {
    colors: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.colors = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchColors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.colors.push(action.payload);
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.colors = state.colors.filter(
          (color) => color.id !== action.payload
        );
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        const { id, updatedColor } = action.payload;
        const existingColor = state.colors.find((color) => color.id === id);
        if (existingColor) {
          Object.assign(existingColor, updatedColor);
        }
      });
  },
});

export default colorSlice.reducer;
