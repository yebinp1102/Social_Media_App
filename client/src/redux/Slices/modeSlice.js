import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  dark : false
}

export const switchMode = createAsyncThunk('/mode/switch' , async(mode, thunkAPI) => {
  localStorage.setItem('mode', !mode);
  return !mode
})


export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(switchMode.fulfilled, (state, action) => {
        state.dark = action.payload
      })
  }
})

export default modeSlice.reducer