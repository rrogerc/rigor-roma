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

export const notify = (message, status) => {
  return async (dispatch) => {
    dispatch(set({ message, status }));
    setTimeout(() => {
      dispatch(clear());
    }, 5000);
  };
};

export default notificationSlice.reducer;
