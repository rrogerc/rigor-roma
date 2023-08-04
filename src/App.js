// React
import { useEffect } from "react";

// Components
import Menu from "./Components/Menu";
import Notification from "./Components/Notification";

// Pages
import { Routes, Route } from "react-router-dom";
import Timer from "./Pages/Timer";
import Stopwatch from "./Pages/Stopwatch";
import Statistics from "./Pages/Statistics";

// redux
import { useDispatch } from "react-redux";
import { initializeRigor } from "./reducers/rigorReducer";

// debug
import Print from "./Print";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeRigor());
  }, [dispatch]);

  return (
    <div className="container">
      <Menu />
      <Notification />
      <Routes>
        <Route path="/timer" element={<Timer />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
      <Print />
    </div>
  );
};
export default App;
