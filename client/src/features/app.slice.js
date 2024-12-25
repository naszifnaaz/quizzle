import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  pro: false,
  createdQuizzes: [],
  attemptedQuizzes: [],
};

const userSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
