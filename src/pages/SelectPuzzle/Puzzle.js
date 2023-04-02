import { useParams } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { FullScreen } from "../../components/FullScreen";
import NavPuzzle from "./Nav";
import Confetti from "../../components/Confetti";
import spinner from "../../assets/images/spinner.gif";
// import Navbar from "../../components/Navbar";
import "./Puzzle.css";

function Puzzle(props) {
  // const img = img;
  const { imgName, level, nextLevel } = useParams();
  // console.log("🚀 ~ file: Puzzle.js ~ line 14 ~ Puzzle ~ imgName, level, nextLevel", imgName, level, nextLevel);

  const [theLevel, setLevel] = useState(level.split("-"));
  const [tilesArray, setTilesArray] = useState([]);
  const [imgLoaded, setimgLoaded] = useState(false);
  const [selectedTileId, setSelectedTileId] = useState(null);
  const [tileSelected, setTileSelected] = useState(false);
  const [widthcContainer, setWidthcContainer] = useState(0);
  const [intrevalTimer, setIntrevalTimer] = useState(null);
  const [massageAlert, setMassageAlert] = useState(null);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [winn, setWinn] = useState(false);
  const [pause, setPause] = useState(false);

  // Finish loading Img
  function loadImg() {
    if (typeof window !== "undefined") {
      const actualPicture = new Image();
      actualPicture.addEventListener("load", () => {
        setimgLoaded(require(`../../assets/images/puzzle/hd/${imgName}.png`));
      });

      actualPicture.src = require(`../../assets/images/puzzle/hd/${imgName}.png`);
    }
  }

  // {לבדוק אם העדכונים למטה נחוצים}
  function generateTiles(resetThisLevel) {
    let widthEle = document.querySelector(".grid").offsetWidth;
    let newTilesArray = [];
    for (let i = 0; i < parseFloat(theLevel[0]); i++) {
      let newTile = {
        id: i,
        top: -Math.floor(i / theLevel[1]) * (widthEle / theLevel[1]),
        left: i < theLevel[1] ? -i * (widthEle / theLevel[1]) : -(i % theLevel[1]) * (widthEle / theLevel[1]),
      };

      newTilesArray.push(newTile);
    }

    setMoves(0);
    setWinn(false);
    setMassageAlert(null);
    setWidthcContainer(widthEle);
    setTilesArray(newTilesArray);

    if (nextLevel) {
      // randomize Array
      console.log(!resetThisLevel);
      if (!resetThisLevel) {
        let length = newTilesArray.length;
        for (let i = 0; i < length; i++) {
          let random = Math.floor(Math.random() * (length - 1));
          let randomitemArray = newTilesArray.splice(random, 1);
          newTilesArray.push(randomitemArray[0]);
        }

        setIntrevalTimer(
          setInterval(() => {
            setSeconds((seconds) => seconds + 1);
          }, 1000)
        );
      }
    } else setPause(false);
  }
  // {לסדר את הפונקציה מחדש}
  function addClassNsame(tileID, id) {
    let className = "";
    switch (tileID) {
      case id:
        className = "tilewrap rightPlace";
        break;
      case selectedTileId:
        className = "tilewrap selected";
        break;
      default:
        className = "tilewrap";
    }

    let tile = tilesArray;
    let allRightPlace = true;
    for (let i = 0; i < tile.length; i++) {
      if (tile[i].id !== i) {
        allRightPlace = false;
        break;
      }
    }
    if (selectedTileId === tileID && tileID === id) {
      className = "tilewrap selected rightPlace";
    }
    if (allRightPlace) {
      if (moves !== 0 && !winn) {
        clearInterval(intrevalTimer);
        setWinn(true);
        setIntrevalTimer(null);
      }
      className = "tilewrap allRightPlace";
    }
    return className;
  }

  function handleResize() {
    let widthEle = document.querySelector(".grid")?.offsetWidth;
    let newTilesArray = [];

    if (widthEle !== null) {
      for (let i = 0; i < theLevel[0]; i++) {
        let newTile = {
          id: i,
          top: -Math.floor(i / theLevel[1]) * (widthEle / theLevel[1]),
          left:
            i < theLevel[1] ? -i * (widthEle / theLevel[1]) : -(i % theLevel[1]) * (widthEle / theLevel[1]),
        };
        newTilesArray.push(newTile);
      }
      setWidthcContainer(widthEle);
      setTilesArray(newTilesArray);
    }
  }

  // {לבדוק אם העדכונים למטה נחוצים}
  function hendLeSwap(id) {
    if (tileSelected) {
      let newTiles = [...tilesArray];
      let index1 = tilesArray.findIndex((tile) => tile.id === selectedTileId);
      let index2 = tilesArray.findIndex((tile) => tile.id === id);
      let tile1 = { ...newTiles[index1] };
      let tile2 = { ...newTiles[index2] };
      newTiles[index2] = tile1;
      newTiles[index1] = tile2;

      setTilesArray(newTiles);
      setTileSelected(false);
      setSelectedTileId(null);
      setMoves(moves + 1);
    } else {
      setSelectedTileId(id);
      setTileSelected(true);
    }
  }

  function alertMassage() {
    if (!intrevalTimer) {
      setMassageAlert("התחל משחק");
    } else {
      setMassageAlert("המשחק עצור");
    }
    setTimeout(() => {
      setMassageAlert(null);
    }, 3000);
  }

  useEffect(() => {
    generateTiles();
    loadImg();
    setMoves(0);
    setSeconds(0);
    let doit;
    window.addEventListener("resize", () => {
      clearTimeout(doit);
      doit = setTimeout(handleResize, 500);
    });
    return () => {
      clearInterval(intrevalTimer);
      window.removeEventListener("resize", handleResize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theLevel]);

  return (
    <>
      <FullScreen />
      {/* <Navbar params={props.match} /> */}
      <div className="container">
        <NavPuzzle
          levelProps={[theLevel, imgName]}
          seconds={seconds}
          setSeconds={setSeconds}
          moves={moves}
          setMoves={setMoves}
          winn={winn}
          setWinn={setWinn}
          pause={pause}
          generateTiles={generateTiles}
          setPause={setPause}
          intrevalTimer={intrevalTimer}
          setIntrevalTimer={setIntrevalTimer}
          tilesArray={tilesArray}
          setTilesArray={setTilesArray}
          setMassageAlert={setMassageAlert}
          setLevel={setLevel}
        />
        <div className="grid">
          {winn ? <Confetti /> : ""}

          {massageAlert && (
            <div className="alertMassage">
              <div>
                <svg viewBox="0 0 512 512">
                  <defs>
                    <filter>
                      <filter values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0" />
                    </filter>
                    <mask id="mask">
                      <g>
                        <image />
                      </g>
                    </mask>
                  </defs>{" "}
                  <g>
                    <g>
                      {" "}
                      <path
                        d="M474,102.66c-7-7.2-44.67-12.21-54.59-13.87C372.77,81,331.73,56.62,298.14,23.92,288.82,14.84,271.68-.79,257.32,0,240.43,1,213.4,25.42,201.22,35.9c-27.32,23.46-59.13,41-94.23,49.68-17.7,4.34-34.67,6.41-52.62,9C51,95,38.85,96.73,36.14,98.92c-5.07,4.09-3.59,39-3.27,44.59,5.66,96.84,41,192,99.36,269.5,20.73,27.52,45.86,54.75,73.67,75.35,10.92,8.12,34.71,23.64,49,23.64,14.6,0,38.93-15.06,50.38-23.14,28.29-20,54-46.5,75.32-73.67,59.8-76.38,94.89-170.51,98.73-267.41C479.63,139.17,480.79,109.6,474,102.66Z"
                        fill="#f1f1f2"
                      />
                      <g mask="url(#mask)">
                        <g>
                          <path d="M474,102.66c-7-7.2-44.67-12.21-54.59-13.87C372.77,81,331.73,56.62,298.14,23.92,288.82,14.84,271.68-.79,257.32,0,240.43,1,213.4,25.42,201.22,35.9c-27.32,23.46-59.13,41-94.23,49.68-17.7,4.34-34.67,6.41-52.62,9C51,95,38.85,96.73,36.14,98.92c-5.07,4.09-3.59,39-3.27,44.59,5.66,96.84,41,192,99.36,269.5,20.73,27.52,45.86,54.75,73.67,75.35,10.92,8.12,34.71,23.64,49,23.64,14.6,0,38.93-15.06,50.38-23.14,28.29-20,54-46.5,75.32-73.67,59.8-76.38,94.89-170.51,98.73-267.41C479.63,139.17,480.79,109.6,474,102.66Z" />
                        </g>
                      </g>
                      <g>
                        <path
                          d="M276.66,360.94a29.73,29.73,0,0,1-41.32,0,26.84,26.84,0,0,1-8.79-20,27.3,27.3,0,0,1,8.79-20.22,29.38,29.38,0,0,1,41.32,0,27.28,27.28,0,0,1,8.77,20.22A26.82,26.82,0,0,1,276.66,360.94Z"
                          fill="#0088cf"
                        />
                        <path
                          d="M283.54,187.9c-1.49,6.94-3.37,15-5.58,24.34q-3.22,13.18-7.34,32.94t-8.71,48.72H250.12q-4.59-29.32-8.76-48.79c-2.74-13-5.18-23.9-7.33-32.7-1.94-8.11-3.7-16-5.37-23.72s-2.42-13.56-2.42-17.42a27,27,0,0,1,8.71-20.2,30.47,30.47,0,0,1,41.92,0,26.79,26.79,0,0,1,8.88,20.2A83.89,83.89,0,0,1,283.54,187.9Z"
                          fill="#0088cf"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              {massageAlert}
            </div>
          )}

          {tilesArray.map((tile, id) => (
            <div
              key={id}
              datatype={tile.id}
              className={addClassNsame(tile.id, id)}
              // className={selectedTileId === tile.id ? "tilewrap selected" : "tilewrap"}
              onClick={() => (!pause ? tile.id !== id && hendLeSwap(tile.id) : alertMassage())}
              style={{
                width:
                  (moves === 0 && !intrevalTimer) || winn ? `${theLevel[2]}%` : `calc(${theLevel[2]}% - 4px)`,
                paddingBottom:
                  (moves === 0 && !intrevalTimer) || winn ? `${theLevel[2]}%` : `calc(${theLevel[2]}% - 4px)`,
              }}
            >
              {imgLoaded ? (
                <img
                  src={imgLoaded}
                  alt="?"
                  style={{
                    width: widthcContainer,
                    top: tile.top,
                    left: tile.left,
                  }}
                />
              ) : (
                <div className="loading">
                  <div className="load-svg">
                    <img src={spinner} alt="?" />
                    <p>...טוען</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Puzzle;
