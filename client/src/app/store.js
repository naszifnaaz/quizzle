import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user.slice";
import quizReducer from "../features/quiz.slice";
import globalReducer from "../features/global.slice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger),
});
