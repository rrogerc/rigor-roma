import { createSlice } from "@reduxjs/toolkit";
import userService from "../userService";

function getDate() {
  const today = new Date();
  const curDay = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  );
  return curDay;
}

const userSlice = createSlice({
  name: "user",
  initialState: [],

  reducers: {
    addTime: async (state, action) => {
      state.rigor.push({ date: getDate(), minutesFocused: action.payload });
      await userService.addMinutes(action.payload, state._id);
    },
    set: (state, action) => {
      return action.payload;
    },
  },
});

const { addTime, set } = userSlice.actions;

export function initializeUser() {
  return async (dispatch) => {
    dispatch(set(await userService.getUser()));
  };
}

export function addRigor(minutes) {
  return async (dispatch) => {
    dispatch(addTime(minutes));
  };
}

export default userSlice.reducer;
