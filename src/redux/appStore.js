import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";

const appStore = configureStore({
  reducer: {
    menu: menuSlice,
  },
});

export default appStore;
