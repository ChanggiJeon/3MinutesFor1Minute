import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getAllMinutes from "../api/minutes";

const name = 'minutes';

export const fetchMinutesByComId = createAsyncThunk(
  `${name}/GET_ALL_MINUTES`,
  async (comId) => {
    const response = await getAllMinutes(comId);
    return response
  }
)

const minutes = createSlice({
  name,
  initialState: {
    allMinutes: [],
  },
  reducers: {
    // standard reducer logic
  },
  extraReducers: {
    [fetchMinutesByComId.fulfilled]: (state, action) => {
      state.allMinutes = action.payload;
    }
  }
});

export default minutes.reducer;