import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import MenuMatch from "./MenuMatch";
import Quiz from "../pages/WritingPractice/Quiz";
import GuessPicture from "../pages/triviaLetters/Quiz";
import SelectImg from "../pages/SelectPuzzle/SelectImg";
import PuzzleGame from "../pages/SelectPuzzle/Puzzle";

function index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/games-development/" element={<Home />} />
        <Route path="/games-development/menuMatch/*" element={<MenuMatch />} />
        <Route path="/games-development/puzzle/" element={<SelectImg />} />
        <Route path="/games-development/puzzle/:imgName" element={<SelectImg />} />
        <Route path="/games-development/puzzle/:imgName/:level" element={<PuzzleGame />} />
        <Route path="/games-development/puzzle/:imgName/:level/:nextLevel" element={<PuzzleGame />} />
        <Route path="/games-development/quiz" element={<Quiz />} />
        <Route path="/games-development/guess-the-picture" element={<GuessPicture />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default index;
