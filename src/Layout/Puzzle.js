import { Routes, Route } from "react-router-dom";
import SelectImg from "../pages/SelectPuzzle/SelectImg";
import PuzzleGame from "../pages/SelectPuzzle/Puzzle";

function Puzzle() {
  return (
    <Routes>
      <Route index element={<SelectImg />} />
      <Route path=":imgName" element={<SelectImg />} />
      <Route path=":imgName/:level" element={<PuzzleGame />} />
      <Route path=":imgName/:level/:nextLevel" element={<PuzzleGame />} />
    </Routes>
  );
}

export default Puzzle;
