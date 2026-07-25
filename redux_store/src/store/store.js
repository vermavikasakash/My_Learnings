import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../todo/todoSlice";
export const store = configureStore({
  reducer: todoSlice,
});
// above is registering todoSlice to reducer
