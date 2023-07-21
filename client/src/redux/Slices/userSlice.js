import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPIs from "redux/APIs/userService";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// 유저 정보 불러오기
export const getProfile = createAsyncThunk('users/get', async(userId, thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token;
    return await userAPIs.getProfile(userId, token)
  }catch(err){
    const message = (err.res && err.res.data && err.res.data) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// 유저 프로필 수정
export const updateProfile = createAsyncThunk('users/edit', async(userData, thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token
    return await userAPIs.updateProfile(userData, token)
  }catch(err){
    const message = (err.res && err.res.data && err.res.data) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = ''
    }
  }, extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        state.user = null;
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        state.user = null;
      })
  }
})

export const {reset} = userSlice.actions;
export default userSlice.reducer;