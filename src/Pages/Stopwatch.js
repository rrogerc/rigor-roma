import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { finishFocus } from "../reducers/notificationReducer";

const Stopwatch = () => {
  const dispatch = useDispatch();

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => setTime(time + 1), 1000);
      return () => clearTimeout(timer); // cleanup, runs when time changes outside
    }
  }, [time, isRunning]);

  const toggleTimer = () => {
    if (!isRunning) setTime(0);

    if (isRunning) {
      const minutes = Math.floor(time / 60);
      dispatch(finishFocus(minutes));
    }
    setIsRunning(!isRunning);
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>{Math.floor(time / 60)} minutes</p>
      <p>{time % 60} seconds</p>
      <button onClick={toggleTimer}>{isRunning ? "Stop" : "Start"}</button>
    </div>
  );
};

export default Stopwatch;
