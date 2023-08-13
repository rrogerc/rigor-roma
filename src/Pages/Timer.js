import { useEffect, useState } from "react";

import { addRigor } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { finishFocus } from "../reducers/notificationReducer";
import { setRunFalse, setRunTrue } from "../reducers/runningReducer";

import { Form, Button } from "react-bootstrap";

const Timer = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);
  const [initial, setInitial] = useState(0);

  const setTimer = (e) => {
    e.preventDefault();

    const minutes = Number(e.target[0].value);
    setInitial(minutes);
    dispatch(setRunTrue());

    e.target[0].value = "";
    setTime(minutes * 60);
  };

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => {
        clearTimeout(timer);
        dispatch(setRunFalse());
      }; // cleanup, runs when time changes outside
    }
    if (time === 0 && initial !== 0) {
      dispatch(finishFocus(initial));
      dispatch(setRunFalse());
      dispatch(addRigor(initial));
      setInitial(0);
    }
  }, [time, initial, dispatch]);

  return (
    <div>
      <h1>Timer</h1>
      {time > 0 ? (
        <>
          <p>{Math.floor(time / 60)} Minutes</p>
          <p>{time % 60} seconds</p>
        </>
      ) : null}
      {time === 0 ? (
        <Form onSubmit={setTimer}>
          <input type="number" min="0" step="1" />
          <Button type="submit">Start</Button>
        </Form>
      ) : null}
    </div>
  );
};

export default Timer;
