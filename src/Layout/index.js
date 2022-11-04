import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import MenuMatch from "./MenuMatch";
import Puzzle from "./Puzzle";

function index() {
  return (
    <Routes>
      <Route path="/games-development/" element={<Home />} />
      <Route path="/games-development/menuMatch/*" element={<MenuMatch />} />
      <Route path="/games-development/puzzle/*" element={<Puzzle />} />
      <Route path="/games-development/quiz" element={<h1>Hi quiz</h1>} />
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}

export default index;
