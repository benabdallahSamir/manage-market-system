import { configureStore } from "@reduxjs/toolkit";
import user from "./user.js";
const store = configureStore({
  reducer: {
    user,
  },
});
export default store;
