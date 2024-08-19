import { configureStore } from "@reduxjs/toolkit";
import cartListReducer from "./features/cartListSlice";


export const store = configureStore({
    reducer: {
      cart: cartListReducer,
    },
  });





