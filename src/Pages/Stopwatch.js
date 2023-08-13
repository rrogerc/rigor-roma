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
      }; // cleanup, runs when time changes outside
    }
  }, [time, isRunning, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setRunFalse());
    };
  }, [dispatch]);

  const toggleTimer = () => {
    if (!isRunning) {
      setTime(0);
      dispatch(setRunTrue());
    }
    if (isRunning) {
      const minutes = Math.floor(time / 60);
      if (minutes > 0) {
        dispatch(finishFocus(minutes));
        dispatch(addRigor(minutes));
      }
      dispatch(setRunFalse());
    }
    setIsRunning(!isRunning);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-95 flex-column mt-2">
      <h1 className="mb-3">Stopwatch</h1>
      {isRunning ? (
        <div className="mt-3 mb-3 d-flex align-items-center flex-column">
          <h6 className="display-6">{Math.floor(time / 60)} minutes</h6>
          <h6>{time % 60} seconds</h6>
        </div>
      ) : null}
      <Button className="mt-1" variant={isRunning ? "danger" : "primary"} onClick={toggleTimer}>
        {isRunning ? "Stop" : "Start"}
      </Button>
    </div>
  );
};

export default Stopwatch;
