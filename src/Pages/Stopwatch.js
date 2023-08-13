import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { finishFocus } from "../reducers/notificationReducer";
import { addRigor } from "../reducers/userReducer";
import { setRunFalse, setRunTrue } from "../reducers/runningReducer";

import { Button } from "react-bootstrap";

const Stopwatch = () => {
  const dispatch = useDispatch();

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => setTime(time + 1), 1000);
      return () => {
        clearTimeout(timer);
        dispatch(setRunFalse());
      }; // cleanup, runs when time changes outside
    }
  }, [time, isRunning, dispatch]);

  const toggleTimer = () => {
    if (!isRunning) {
      setTime(0);
      dispatch(setRunTrue());
    }
    if (isRunning) {
      const minutes = Math.floor(time / 60);
      if (minutes > 0) {
        dispatch(setRunFalse());
        dispatch(finishFocus(minutes));
        dispatch(addRigor(minutes));
      }
    }
    setIsRunning(!isRunning);
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>{Math.floor(time / 60)} minutes</p>
      <p>{time % 60} seconds</p>
      <Button variant={isRunning ? "danger" : "primary"} onClick={toggleTimer}>
        {isRunning ? "Stop" : "Start"}
      </Button>
    </div>
  );
};

export default Stopwatch;
