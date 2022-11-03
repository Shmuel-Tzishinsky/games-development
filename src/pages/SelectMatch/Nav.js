import React from "react";
import Seconds from "./Seconds";


export function NavData({ matches, moves, frameworksLen, setReversalSpeed }) {
  function resetDelay(e) {
    switch (e.target.value) {
      case "מהיר":
        return 500;
      case "איטי":
        return 2500;
      default:
        return 750;
    }
  }

  return (
    <div className="scoreboard">
        <div className="scoreboardItem championship">
          %
          {(100 / moves) * matches ? ((100 / moves) * matches).toFixed(0) : 0}
        </div>
        <div className="scoreboardItem cardds">
          {frameworksLen}/{matches}
        </div>
        <div className="scoreboardItem moves">
        {moves}
        </div>
        <Seconds />
        <div className="scoreboardItem speed">
          <select
            defaultValue={"רגיל"}
            onChange={(e) => setReversalSpeed(resetDelay(e))}
          >
            <option>מהיר</option>
            <option>רגיל</option>
            <option>איטי</option>
          </select>
        </div>
        <div className="scoreboardItem pouse">
          עצור
        </div>
    </div>
  );
}
