import {createSlice} from '@reduxjs/toolkit';
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

export const finishFocus = (minutes: number) => {
  return async (dispatch: AppDispatch) => {
    let msg = `You completed ${minutes} minutes of focused work!`;
    if (minutes === 1) msg = `You completed ${minutes} minute of focused work!`;

    dispatch(set({message: msg, status: 'success'}));
    setTimeout(() => {
      dispatch(clear());
    }, 5000);
  };
};

export const notifyLogin = (success: boolean) => {
  return async (dispatch: AppDispatch) => {
    let msg: string;
    if (success === true)
      msg = 'Successfully logged in! You can now track your focus time.';
    else msg = 'Failed to log in. Please check your username and password.';

    const status = success ? 'success' : 'danger';

    dispatch(set({message: msg, status: status}));
    setTimeout(() => {
      dispatch(clear());
    }, 5000);
  };
};

export const notifyLogout = () => {
  return async (dispatch: AppDispatch) => {
    const msg = 'Successfully logged out!';

    dispatch(set({message: msg, status: 'success'}));
    setTimeout(() => {
      dispatch(clear());
    }, 5000);
  };
};

export const notify = (msg: string, status: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(set({message: msg, status: status}));

    setTimeout(() => {
      dispatch(clear());
    }, 5000);
  };
};
