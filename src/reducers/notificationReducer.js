import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    status: "",
  },

  reducers: {
    set: (state, action) => {
      return action.payload;
    },
    clear: () => {
      return { message: "", status: "" };
    },
  },
});

const { set, clear } = notificationSlice.actions;

export const finishFocus = (minutes) => {
  return async (dispatch) => {
    let msg = `You completed ${minutes} minutes of focused work!`;
    if (minutes === 1) msg = `You completed ${minutes} minute of focused work!`;

    dispatch(set({ message: msg, status: "success" }));
    setTimeout(() => {
      dispatch(clear());
    }, 5000);
  };
};

export default notificationSlice.reducer;
