import React from "react";
import { Link } from "react-router-dom";
import { Level } from "./Level";

import next_level_gif from "../../assets/images/next_level.gif";

function NavPuzzle(props) {
  const nextLevelArrray = {
    4: "9-3-33.333333333333336",
    9: "16-4-25",
    16: "25-5-20",
    25: "36-6-16.666666666666668",
    36: "49-7-14.285714285714286",
    49: "64-8-12.5",
  };
  const level_title = ["מתחילים", "קל", "בינוני", "מתקדמים", "קשה", "קשה מאוד", "מאתגר"];

  const {
    levelProps,
    seconds,
    setSeconds,
    moves,
    setMoves,
    winn,
    setWinn,
    pause,
    setPause,
    tilesArray,
    generateTiles,
    setTilesArray,
    intrevalTimer,
    setIntrevalTimer,
    setMassageAlert,
    setLevel,
  } = props;

  function staertGame() {
    let newTilesArray = tilesArray;
    // randomize Array
    let length = newTilesArray.length;
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * (length - 1));
      let randomitemArray = newTilesArray.splice(random, 1);
      newTilesArray.push(randomitemArray[0]);
    }
    setTilesArray(newTilesArray);
    intrevalTimer__func();
    setMoves(0);
    setSeconds(0);
  }

  function intrevalTimer__func() {
    clearInterval(intrevalTimer);
    setPause(false);
    setIntrevalTimer(
      setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000)
    );
  }

  function pauseGame() {
    if (pause) {
      intrevalTimer__func();
      setMassageAlert(null);
    } else {
      clearInterval(intrevalTimer);
      setPause(true);
    }
  }

  function resetGame() {
    clearInterval(intrevalTimer);
    setMoves(0);
    setSeconds(0);
    setWinn(false);
    setPause(false);
    setIntrevalTimer(null);
    setMassageAlert(null);

    if (winn) {
      staertGame();
    } else generateTiles(true);
  }

  const levelNext = nextLevelArrray[levelProps[0][0]];

  return (
    <div className="toolbat">
      <div className="toolbat-level">
        <span>{`רמה: ${level_title[parseFloat(levelProps[0][1]) - 2]}`}</span>
        <Level img={levelProps[1]} />
      </div>
      <div className="toolbat-flex">
        <div className="toolbat-cont">
          <div className="toolbat-info">
            <div>
              <svg viewBox="0 0 24 24">
                <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path>
              </svg>
            </div>
            <span>{seconds}s</span>
          </div>

          <div className="toolbat-info">
            <div>
              <svg viewBox="0 0 24 24">
                <path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"></path>
              </svg>
            </div>
            <span>{moves}</span>
          </div>
        </div>

        <div className="toolbat-btns">
          <div className={seconds === 0 ? "menuButton pause" : "menuButton"}>
            <button onClick={() => resetGame()} title="R eset game" type="button" disabled={seconds === 0 ? true : false}>
              <svg viewBox="0 0 24 24">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path>
              </svg>
            </button>
          </div>
          <div className={(moves === 0 && !intrevalTimer) || winn ? "menuButton pause" : "menuButton"}>
            <button
              onClick={() => pauseGame()}
              title="Pause/Continue current game."
              disabled={(!pause && seconds === 0) || winn ? true : false}
              type="button"
            >
              {!pause || winn ? (
                <svg viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              )}
            </button>
          </div>
          <div className="menuButton">
            {winn && levelNext ? (
              <button onClick={() => setLevel(levelNext.split("-"))}>
                <Link to={`/games-development/puzzle/${levelProps[1]}/${levelNext}/nextLevel`}>
                  <img src={next_level_gif} alt="" />
                </Link>
              </button>
            ) : (
              <button onClick={() => staertGame()} title="Start the new game" type="button">
                <svg viewBox="0 0 24 24">
                  <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavPuzzle;
