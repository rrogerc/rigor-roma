import { useEffect, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => setTime(time + 1), 1000);
      return () => clearTimeout(timer); // cleanup, runs when time changes outside
    }
  }, [time, isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (!isRunning) setTime(0);
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>{Math.floor(time / 60)} Minutes</p>
      <p>{time % 60} seconds</p>
      <button onClick={toggleTimer}>{isRunning ? "Stop" : "Start"}</button>
    </div>
  );
};

export default Stopwatch;
