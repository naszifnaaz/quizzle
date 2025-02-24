import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  createdQuizzes: {},
  attemptedQuizzes: {},
  availableQuizzes: {},
  currentQuiz: {},
  publishedURL: null,
  user: null,
  token: localStorage.getItem("token") || "",
  error: null,
};

const DEV_URL = "http://localhost:8080";
const PROD_URL = "https://quizzle-6urg.onrender.com";

// User auth thunks
export const userLogin = createAsyncThunk(
  "app/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PROD_URL}/api/user/login`, user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userRegister = createAsyncThunk(
  "app/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PROD_URL}/api/user/register`, user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const initializeUser = createAsyncThunk(
  "app/initializeUser",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No token found");

    try {
      const response = await axios.get(`${PROD_URL}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunks for fetching data
export const fetchMyQuizzes = createAsyncThunk(
  "app/fetchMyQuizzes",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PROD_URL}/api/user/my-quizzes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const response = await axios.get(`${PROD_URL}/api/user/my-attempts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const response = await axios.get(`${PROD_URL}/api/user/available`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const response = await axios.post(`${PROD_URL}/api/quiz/draft`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const response = await axios.post(
        `${PROD_URL}/api/quiz/publish`,
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

// Get quiz by id
export const getQuizById = createAsyncThunk(
  "app/getQuizById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${DEV_URL}/api/quiz/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle User Auth
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.user = {};
        state.token = "";
        localStorage.removeItem("token");
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.user = {};
        state.token = "";
        localStorage.removeItem("token");
      })

      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.user = {};
        state.token = "";
        localStorage.removeItem("token");
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.user = {};
        state.token = "";
        localStorage.removeItem("token");
      })

      .addCase(initializeUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(initializeUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.token = "";
        localStorage.removeItem("token"); // Remove invalid token
      })

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
      .addCase(publishQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publishedURL = action.payload.quizURL;
      })
      .addCase(publishQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getQuizById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getQuizById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentQuiz = action.payload.currentQuiz;
      })
      .addCase(getQuizById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
