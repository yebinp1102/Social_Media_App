import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPIs from "redux/APIs/authService";

// 유저 정보 로컬에서 가져오기 get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// 회원가입 register 
export const register = createAsyncThunk('auth/register', async(userData, thunkAPI) => {
  try{
    return await authAPIs.register(userData)
  }catch(err){
    const message = (err.res && err.res.data && err.res.data) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// 로그인 login
export const login = createAsyncThunk('auth/login', async(userData, thunkAPI) => {
  try {
    return await authAPIs.login(userData)
  } catch (err) {
    const message = (err.res && err.res.data && err.res.data) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// 로그아웃 logout
export const logout = createAsyncThunk('auth/logout', async() => {
  await authAPIs.logout();
})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = ''
    }
  }, extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
  }
})

export const {reset} = authSlice.actions
export default authSlice.reducer