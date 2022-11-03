import { Routes, Route } from "react-router-dom";
import Match from "../pages/SelectMatch/Match";
import SelectMatch from "../pages/SelectMatch/SelectMatch";

function MenuMatch() {
  return (
    <Routes>
      <Route index element={<SelectMatch />} />
      <Route path=":select" element={<Match />} />
    </Routes>
  );
}

export default MenuMatch;
