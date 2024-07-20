import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "./ColorSlice";

const store = configureStore({
  reducer: {
    colors: colorReducer,
  },
});

export default store;
