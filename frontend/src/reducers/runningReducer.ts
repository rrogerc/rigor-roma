import {createSlice} from '@reduxjs/toolkit';

const runningSlice = createSlice({
  name: 'running',
  initialState: false,
  reducers: {
    setRunTrue: () => {
      return true;
    },
    setRunFalse: () => {
      return false;
    },
  },
});

export const {setRunTrue, setRunFalse} = runningSlice.actions;
export default runningSlice.reducer;
