import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  pro: false,
  createdQuizzes: {},
  attemptedQuizzes: {},
  availableQuizzes: {},
  error: null,
};

// Async thunks for fetching data
export const fetchMyQuizzes = createAsyncThunk(
  "app/fetchMyQuizzes",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/my-quizzes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMyAttempts = createAsyncThunk(
  "app/fetchMyAttempts",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/my-attempts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAvailableQuizzes = createAsyncThunk(
  "app/fetchAvailableQuizzes",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/available",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunks for saving and publishing quizzes
export const saveQuizDraft = createAsyncThunk(
  "app/saveQuizDraft",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      console.log("slice", payload);
      const response = await axios.post(
        "http://localhost:8080/api/quiz/draft",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const publishQuiz = createAsyncThunk(
  "app/publishQuiz",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      console.log(payload);
      const response = await axios.post(
        "http://localhost:8080/api/quiz/publish",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchMyQuizzes
      .addCase(fetchMyQuizzes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyQuizzes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createdQuizzes = action.payload;
      })
      .addCase(fetchMyQuizzes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle fetchMyAttempts
      .addCase(fetchMyAttempts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyAttempts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attemptedQuizzes = action.payload;
      })
      .addCase(fetchMyAttempts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle fetchAvailableQuizzes
      .addCase(fetchAvailableQuizzes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAvailableQuizzes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.availableQuizzes = action.payload;
      })
      .addCase(fetchAvailableQuizzes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle save quiz as draft
      .addCase(saveQuizDraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveQuizDraft.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(saveQuizDraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle publish quiz
      .addCase(publishQuiz.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(publishQuiz.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(publishQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
