import { createSlice } from "@reduxjs/toolkit";
import userService from "../Services/userService";
import loginService from "../Services/loginService";

const userSlice = createSlice({
  name: "user",
  initialState: null,

  reducers: {
    set: (state, action) => {
      return {
        username: action.payload.username,
        id: action.payload.id,
        rigor: action.payload.rigor,
      };
    },
    addTime: (state, action) => {
      const today = new Date();
      const curDay = new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth(),
          today.getUTCDate()
        )
      ).toISOString();
      
      const minutes = action.payload;
      const existingRigor = state.rigor.find((r) => r.date === curDay);

      // console.log(curDay);
      // console.log(JSON.parse(JSON.stringify(existingRigor)));
      // console.log(JSON.parse(JSON.stringify(state)));

      if (existingRigor) {
        existingRigor.minutesFocused += minutes;
      } else {
        state.rigor.push({
          date: curDay,
          minutesFocused: minutes,
        });
      }
      console.log(JSON.parse(JSON.stringify(existingRigor)));
    },
  },
});

const { addTime, set } = userSlice.actions;

export function fetchUser(id) {
  return async (dispatch) => {
    const user = await userService.getUser(id);
    dispatch(set(user));
  };
}

export function initializeUser() {
  return async (dispatch) => {
    const loggedUser = window.localStorage.getItem("loggedUser_riggorromma");

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
      window.localStorage.setItem(
        "loggedUser_riggorromma",
        JSON.stringify(user)
      );
      userService.setToken(user.token);
      dispatch(set(user));
    } catch (error) {}
  };
}

export function addRigor(minutes) {
  return async (dispatch, getState) => {
    const state = getState();
    await userService.addMinutes(minutes, state.user.id);
    dispatch(addTime(minutes));
    fetchUser(state.user.id);
  };
}

export default userSlice.reducer;
