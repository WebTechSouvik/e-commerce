import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./slice/userSlice.js"
import cartSlice from "./slice/cartSlice.js"
import productSlice from "./slice/productSlice.js"
export const store = configureStore({
  reducer: {
    user:userSlice,
    cart:cartSlice,
    product:productSlice
  },
})