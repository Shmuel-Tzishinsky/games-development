import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import MenuMatch from "./MenuMatch";
import Puzzle from "./Puzzle";
import Quiz from "../pages/WritingPractice/Quiz";
import GuessPicture from "../pages/triviaLetters/Quiz";

function index() {
  return (
    <Routes>
      <Route path="/games-development/" element={<Home />} />
      <Route path="/games-development/menuMatch/*" element={<MenuMatch />} />
      <Route path="/games-development/puzzle/*" element={<Puzzle />} />
      <Route path="/games-development/quiz" element={<Quiz />} />
      <Route path="/games-development/guess-the-picture" element={<GuessPicture />} />
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}

export default index;
