import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      state.user = action.payload;
    },
    handleLogout: (state) => {
      state.user = null;
    },
  },
});

export const { handleLogin, handleLogout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
