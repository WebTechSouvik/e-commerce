import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./slice/userSlice.js"
import cartSlice from "./slice/cartSlice.js"

export const store = configureStore({
  reducer: {
    user:userSlice,
    cart:cartSlice
  },
})