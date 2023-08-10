import { createSlice } from "@reduxjs/toolkit";
import userService from "../Services/userService";
import loginService from "../Services/loginService";

function getDate() {
  const today = new Date();
  const curDay = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  );
  return curDay;
}

const userSlice = createSlice({
  name: "user",
  initialState: null,

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
    const loggedUser = window.localStorage.getItem("loggedUser");

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(set(user));
      userService.setToken(user.token);
    }
  };
}

export function attemptLogin(username, password) {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      userService.setToken(user.token);
      dispatch(set(user));
    } catch (error) {}
  };
}

export function addRigor(minutes) {
  return async (dispatch) => {
    dispatch(addTime(minutes));
  };
}

export default userSlice.reducer;
