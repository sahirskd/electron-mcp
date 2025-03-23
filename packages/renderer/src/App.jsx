import { MemoryRouter as Router, Route, Routes } from "react-router";
import "./index.css";
import Home from "./screens/Home.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
