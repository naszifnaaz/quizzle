import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  clerkId: "",
  createdQuizzes: [],
  attemptedQuizzes: [],
  status: "",
};

export const getQuizzes = createAsyncThunk(
  "getQuizzes",
  async (token, { rejectWithValue }) => {
    try {
      if (!token) {
        throw new Error("No authentication token available");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [createdResponse, attemptedResponse] = await Promise.all([
        axios.get("http://localhost:8080/api/quizzes/my-quizzes", config),
        axios.get("http://localhost:8080/api/quizzes/my-attempts", config),
      ]);

      return {
        createdQuizzes: createdResponse.data,
        attemptedQuizzes: attemptedResponse.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuizzes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getQuizzes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.createdQuizzes = action.payload.createdQuizzes;
        state.attemptedQuizzes = action.payload.attemptedQuizzes;
      })
      .addCase(getQuizzes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default quizSlice.reducer;
