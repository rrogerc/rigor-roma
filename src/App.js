// Components
import Menu from "./Components/Menu";
import Notification from "./Components/Notification";

// Pages
import { Routes, Route } from "react-router-dom";
import Timer from "./Pages/Timer";
import Stopwatch from "./Pages/Stopwatch";
import Statistics from "./Pages/Statistics";

const App = () => {
  return (
    <div className="container">
      <Menu />
      <Notification />
      <Routes>
        <Route path="/timer" element={<Timer />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </div>
  );
};
export default App;
