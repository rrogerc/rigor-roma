import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Button} from 'react-bootstrap';

import {addRigor} from '../reducers/userReducer';
import {finishFocus, notify} from '../reducers/notificationReducer';
import {setRunFalse, setRunTrue} from '../reducers/runningReducer';
import {AppDispatch} from '../store';

const Timer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [time, setTime] = useState(0);
  const [initial, setInitial] = useState(0);

  const setTimer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const minutesInput = e.currentTarget.elements[0] as HTMLInputElement;
    const minutes = Number(minutesInput.value);

    if (minutes === 0) {
      dispatch(
        notify({msg: 'Time set be greater than 0 minutes', status: 'danger'})
      );
      return;
    }

    setInitial(minutes);
    dispatch(setRunTrue());

    minutesInput.value = '';
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
      const tmp_init = initial;
      dispatch(finishFocus(tmp_init));
      dispatch(setRunFalse());
      dispatch(addRigor(tmp_init));
      setInitial(0);
    }
    return () => {};
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
          <h6 className="display-6 text-primary">
            {Math.floor(time / 60)} Minutes
          </h6>
          <h6 className="text-warning"> {time % 60} seconds</h6>
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
