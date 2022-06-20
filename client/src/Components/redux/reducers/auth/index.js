import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token") || "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = auth.actions;

export default auth.reducer;
