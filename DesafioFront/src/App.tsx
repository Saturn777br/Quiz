import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Finish from "./components/Finish";
import "./App.css"; // Estilos globais

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/start/:sessionId" element={<Start />} />
        <Route path="/quiz/:sessionId/:questionIndex" element={<Quiz />} />
        <Route path="/finish" element={<Finish />} />
      </Routes>
    </Router>
  );
};

export default App;
