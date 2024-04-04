import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../store';

import {NotificationState} from '../types';

const initialState: NotificationState = {
  message: '',
  status: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
    clear: () => {
      return {message: '', status: ''};
    },
  },
});

const {set, clear} = notificationSlice.actions;
export default notificationSlice.reducer;

export const finishFocus = createAsyncThunk(
  'notification/finishFocus',
  async (minutes: number, {dispatch}) => {
    let msg = `You completed ${minutes} minutes of focused work!`;
    if (minutes === 1) msg = `You completed ${minutes} minute of focused work!`;

    dispatch(set({message: msg, status: 'success'}));

    // Handle the clear action after a delay
    setTimeout(() => {
      dispatch(clear());
    }, 5000);
  }
);

export const notifyLogin = createAsyncThunk(
  'notification/notifyLogin',
  async (success: boolean, {dispatch}) => {
    const msg = success
      ? 'Successfully logged in! You can now track your focus time.'
      : 'Failed to log in. Please check your username and password.';
    const status = success ? 'success' : 'danger';

    dispatch(set({message: msg, status: status}));
    setTimeout(() => {
      dispatch(clear());
    }, 5000);
  }
);

export const notifyLogout = createAsyncThunk(
  'notification/notifyLogout',
  async (_, {dispatch}) => {
    const msg = 'Successfully logged out!';
    dispatch(set({message: msg, status: 'success'}));
    setTimeout(() => {
      dispatch(clear());
    }, 5000);
  }
);

export const notify = createAsyncThunk(
  'notification/notify',
  async ({msg, status}: {msg: string; status: string}, {dispatch}) => {
    dispatch(set({message: msg, status: status}));
    setTimeout(() => {
      dispatch(clear());
    }, 5000);
  }
);
