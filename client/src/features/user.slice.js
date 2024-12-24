import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  clerkId: "",
  user: {},
  createdQuizzes: [],
  attemptedQuizzes: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.clerkId = action.payload.clerkId;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.clerkId = "";
    },
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
