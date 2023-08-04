import { createSlice } from "@reduxjs/toolkit";
import userService from "../userService";

const rigorSlice = createSlice({
  name: "rigor",
  initialState: [],

  reducers: {
    addTime: (state, action) => {},
    set: (state, action) => {
      return action.payload;
    },
  },
});

const { addTime, set } = rigorSlice.actions;

export function initializeRigor() {
  return async (dispatch) => {
    dispatch(set(await userService.get()));
  };
}

export default rigorSlice.reducer;
