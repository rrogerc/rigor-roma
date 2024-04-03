import {configureStore} from '@reduxjs/toolkit';

import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import runningReducer from './reducers/runningReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    running: runningReducer,
  },
});

export default store;
