import { useEffect, useState } from "react";

import { addRigor } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { finishFocus, notify } from "../reducers/notificationReducer";
import { setRunFalse, setRunTrue } from "../reducers/runningReducer";

import { Form, Button } from "react-bootstrap";

const Timer = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);
  const [initial, setInitial] = useState(0);

  const setTimer = (e) => {
    e.preventDefault();

    const minutes = Number(e.target[0].value);

    if (minutes === 0) {
      dispatch(notify("Time set be be greater than 0 minutes", "danger"));
      return;
    }

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
      }; // cleanup, runs when time changes outside
    }
    if (time === 0 && initial !== 0) {
      dispatch(finishFocus(initial));
      dispatch(setRunFalse());
      dispatch(addRigor(initial));
      setInitial(0);
    }
  }, [time, initial, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setRunFalse());
    };
  }, [dispatch]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-95 flex-column mt-2">
      <h1>Timer</h1>
      {time > 0 ? (
        <div className="mt-3 d-flex align-items-center flex-column">
          <h6 className="display-6">{Math.floor(time / 60)} Minutes</h6>
          <h6> {time % 60} seconds</h6>
        </div>
      ) : null}
      {time === 0 ? (
        <>
          <Form onSubmit={setTimer} id="setForm">
            <input type="number" min="0" step="1" />
          </Form>
          <Button type="submit" form="setForm" className="mt-3">
            Start
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default Timer;
