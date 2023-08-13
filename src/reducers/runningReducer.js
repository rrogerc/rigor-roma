import { createSlice } from "@reduxjs/toolkit";

const runningSlice = createSlice({
  name: "running",
  initialState: false,
  reducers: {
    setRunTrue: (state, action) => {
      return true;
    },
    setRunFalse: (state, action) => {
      return false;
    },
  },
});

export const { setRunTrue, setRunFalse } = runningSlice.actions;
export default runningSlice.reducer;
