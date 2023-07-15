import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slices/authSlice'
import modeReducer from './Slices/modeSlice'

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    auth: authReducer
  }
})