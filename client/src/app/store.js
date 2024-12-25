import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import reducer from "../features/app.slice";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger),
});
