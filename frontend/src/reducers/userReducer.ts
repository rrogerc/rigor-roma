import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {notifyLogin} from './notificationReducer';

import * as userService from '../Services/userService';
import * as loginService from '../Services/loginService';

import {UserState, Rigor} from '../types';

const initialState: UserState | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state: UserState | null, action: PayloadAction<UserState>) => {
      state = action.payload;
    },

    addTime: (state: UserState | null, action: PayloadAction<number>) => {
      if (state === null) return;

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

      if (existingRigor) existingRigor.minutesFocused += minutes;
      else
        state.rigor.push({
          date: curDay,
          minutesFocused: minutes,
        });
    },

    clearUser: () => {
      window.localStorage.removeItem('loggedUser_riggorromma');
      return initialState;
    },
  },
});

export const {addTime, set, clearUser} = userSlice.actions;

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (id: string) => {
    const user = await userService.getUser(id);
    return user;
  }
);

export const initializeUser = createAsyncThunk(
  'user/initializeUser',
  async (_, {dispatch}) => {
    const loggedUser = window.localStorage.getItem('loggedUser_riggorromma');
    if (loggedUser) {
      const user: UserState = JSON.parse(loggedUser);
      userService.setToken(user.token);
      await dispatch(fetchUser(user.id));
    }
  }
);

export const attemptLogin = createAsyncThunk(
  'user/attemptLogin',
  async (
    {username, password}: {username: string; password: string},
    {dispatch}
  ) => {
    try {
      const user = await loginService.login({username, password});
      window.localStorage.setItem(
        'loggedUser_riggorromma',
        JSON.stringify(user)
      );
      userService.setToken(user.token);
      await dispatch(fetchUser(user.id));
      await dispatch(notifyLogin(true));
    } catch (error) {
      await dispatch(notifyLogin(false));
      throw error;
    }
  }
);

export const addRigor = createAsyncThunk(
  'user/addRigor',
  async (minutes: number, {dispatch, getState}) => {
    const state = getState() as {user: UserState | null};
    if (!state.user) return;

    await userService.addMinutes(minutes, state.user.id);

    dispatch(addTime(minutes));
    await dispatch(fetchUser(state.user.id));
  }
);

export default userSlice.reducer;
