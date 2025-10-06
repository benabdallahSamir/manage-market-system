import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    initUser: (state, action) => {
      state = action.payload;
      return state;
    },
    clearUser: () => null,
  },
});
export const { initUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
