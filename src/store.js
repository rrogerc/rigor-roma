import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import rigorReducer from "./reducers/rigorReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    rigor: rigorReducer,
  },
});

export default store;
