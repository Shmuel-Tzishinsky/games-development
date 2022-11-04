import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import MenuMatch from "./MenuMatch";
import Puzzle from "./Puzzle";

function index() {
  return (
    <Routes>
      <Route path="/games-development/" element={<Home />} />
      <Route path="/menuMatch/*" element={<MenuMatch />} />
      <Route path="/puzzle/*" element={<Puzzle />} />
      <Route path="/quiz" element={<h1>Hi quiz</h1>} />
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}

export default index;
