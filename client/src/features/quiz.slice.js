import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  description: "",
  timeLimit: 10,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
});

export default quizSlice.reducer;
