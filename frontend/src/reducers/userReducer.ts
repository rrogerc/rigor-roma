import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../store';
import {notifyLogin} from './notificationReducer';

import userService from '../Services/userService';
import loginService from '../Services/loginService';

import {UserState, Rigor} from '../types';

const initialState: UserState | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<UserState>) => action.payload,
    addTime: (state, action: PayloadAction<number>) => {
      if (!state) return;
      const today = new Date();
      const curDay = new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth(),
          today.getUTCDate()
        )
      ).toISOString();

      const minutes = action.payload;
      const existingRigor = state.rigor.find((r: Rigor) => r.date === curDay);

      if (existingRigor) {
        existingRigor.minutesFocused += minutes;
      } else {
        state.rigor.push({
          date: curDay,
          minutesFocused: minutes,
        });
      }
    },
    clear: () => {
      window.localStorage.removeItem('loggedUser_riggorromma');
      return initialState;
    },
  },
});

export const {addTime, set, clearUser} = userSlice.actions;

export const fetchUser = (id: string) => async (dispatch: AppDispatch) => {
  const user = await userService.getUser(id);
  dispatch(set(user));
};

export const initializeUser = () => async (dispatch: AppDispatch) => {
  const loggedUser = window.localStorage.getItem('loggedUser_riggorromma');

  if (loggedUser) {
    const user: UserState = JSON.parse(loggedUser);
    userService.setToken(user.token);
    dispatch(fetchUser(user.id));
  }
};

export const attemptLogin =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const user = await loginService.login({username, password});
      window.localStorage.setItem(
        'loggedUser_riggorromma',
        JSON.stringify(user)
      );
      userService.setToken(user.token);
      dispatch(fetchUser(user.id));
      dispatch(notifyLogin(true));
    } catch (error) {
      dispatch(notifyLogin(false));
    }
  };

export const addRigor =
  (minutes: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    if (!state.user) return;

    await userService.addMinutes(minutes, state.user.id);
    dispatch(addTime(minutes));
    dispatch(fetchUser(state.user.id));
  };

export default userSlice.reducer;
