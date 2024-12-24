import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  theme: "system",
};

const appSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
