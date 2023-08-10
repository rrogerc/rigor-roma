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
import Login from "./Pages/Login";
import About from "./Pages/About";

// redux
import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from "./reducers/userReducer";

// debug
import Print from "./Print";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  if (user === null) {
    return (
      <div className="container">
        <Notification />
        <Login />
      </div>
    );
  }

  return (
    <div className="container">
      <Menu />
      <Notification />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
      {/* <Print /> */}
    </div>
  );
};
export default App;
