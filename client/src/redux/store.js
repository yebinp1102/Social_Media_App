import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slices/authSlice'
import modeReducer from './Slices/modeSlice'
import userReducer from './Slices/userSlice'

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    auth: authReducer,
    user : userReducer,
  }
})