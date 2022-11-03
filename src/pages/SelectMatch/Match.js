import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FullScreen } from "../../components/FullScreen";
import MatchCard from "./Card";
import { NavData } from "./Nav";
import images from "./Images.json";
import Navbar from "../../components/Navbar";
import Confetti from "../../components/Confetti";
import "./match.css";

export default function Match() {
  const { select } = useParams();
  let framework_array = [];

  const [frameworks, setFrameworks] = useState([]);
  const [finalizedFrameworks, setFinalizedFrameworks] = useState([]);
  const [openedFrameworks, setOpenedFrameworks] = useState([]);
  const [win, setWin] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [reversalSpeed, setReversalSpeed] = useState(750);

  useEffect(() => {
    const body = document.querySelector("body");

    select === "fireman" ? body?.classList.add("background-fireMan", "Match-body") : body?.classList.add("Match-body");
    addCard(0);
    return () => {
      body.classList = "";
    };
  }, [select]);

  function checkWin() {
    if (finalizedFrameworks.filter((e) => e.complete === false).length === 0) {
      setWin(true);
      setTimeout(() => setMatches(0), 2000);
      if (select === "fireman") {
        UseAudio("/" + select + "/saund/level_completed.mp3");
      } else UseAudio(`/saund/level_completed.ogg`);
      addCard(2000);
    }
  }

  function UseAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  function check() {
    let event_finalizedFrameworks = finalizedFrameworks;

    if (openedFrameworks[0].name === openedFrameworks[1].name && openedFrameworks[0].index !== openedFrameworks[1].index) {
      document.querySelector(".cover")?.classList.remove("disBlock");
      event_finalizedFrameworks[openedFrameworks[0].index].complete = true;
      event_finalizedFrameworks[openedFrameworks[1].index].complete = true;
      setMatches((matches) => matches + 1);

      if (select === "fireman") {
        UseAudio("/" + select + "/saund/match.mp3");
      } else UseAudio(`/saund/match.ogg`);
      checkWin();
    } else {
      if (select === "fireman") {
        UseAudio("/" + select + "/saund/turn.mp3");
      } else UseAudio(`/saund/turn.ogg`);
      event_finalizedFrameworks[openedFrameworks[0].index].close = true;
      event_finalizedFrameworks[openedFrameworks[1].index].close = true;
    }
    setMoves((moves) => moves + 1);

    // console.log(event_finalizedFrameworks);
    setFinalizedFrameworks([...event_finalizedFrameworks]);
    setOpenedFrameworks([]);

    document.querySelector(".cover")?.classList.remove("disBlock");
  }

  function handleClick(name, index, saundIMG, saundTEXT) {
    let saundURL;
    if (saundTEXT && select === "first-lettres") {
      saundURL = "/" + select + "/saundTEXT/" + name.replace("png", "ogg");
    } else if (saundIMG && select === "first-lettres") {
      saundURL = "/" + select + "/saundIMG/" + name.replace("png", "ogg");
    } else {
      saundURL = `/saund/card.ogg`;
    }
    UseAudio(saundURL);

    if (openedFrameworks.length === 2) {
      document.querySelector(".cover")?.classList.add("disBlock");

      setTimeout(() => {
        check();
      }, reversalSpeed);
    } else {
      let framework = {
        name,
        index,
      };
      let event_finalizedFrameworks = finalizedFrameworks;
      let frameworks = openedFrameworks;
      frameworks.push(framework);
      event_finalizedFrameworks[index].close = false;

      // console.log(event_finalizedFrameworks);
      setOpenedFrameworks(frameworks);
      setFinalizedFrameworks([...event_finalizedFrameworks]);

      if (openedFrameworks.length === 2) {
        document.querySelector(".cover")?.classList.add("disBlock");
        // console.log(reversalSpeed);
        setTimeout(() => {
          check();
        }, reversalSpeed);
      }
    }
  }

  function start(newArray) {
    let finalizedFrameworks = [];
    let duplicatedFrameworks = newArray ? newArray.concat(newArray) : images[select].images.concat(images[select].images);
    let randomizedFrameworks = shuffle(duplicatedFrameworks);
    // console.log(randomizedFrameworks);
    randomizedFrameworks.forEach((name) => {
      finalizedFrameworks.push({
        name,
        close: true,
        complete: false,
        fail: false,
        images_text: images[select].images_text,
      });
    });

    setFrameworks(newArray ? newArray : images[select].images);
    setFinalizedFrameworks([...finalizedFrameworks]);
  }

  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function addCard(num) {
    setTimeout(() => {
      setWin(false);
      let newArray = frameworks;
      num = 1;
      while (images[select].images.length && num <= 3) {
        console.log(num);
        let index = Math.floor(Math.random() * images[select].images.length);
        newArray.push(images[select].images[index]);
        images[select].images.splice(index, 1);
        num++;
      }
      // console.log(newArray.length );
      if (newArray.length % 2 !== 0 && newArray.length !== 3) {
        // console.log(newArray);
        newArray = newArray.slice(1, newArray.length + 1);
      }
      start(newArray);
    }, num);
  }

  return (
    <div className="continer-match">
      {win ? <Confetti /> : ""}
      <div className="cover"></div>
      <FullScreen />
      {/* <Navbar params={props.match} /> */}

      <NavData matches={matches} moves={moves} setReversalSpeed={setReversalSpeed} frameworksLen={frameworks.length} />
      <div className="playground">
        {finalizedFrameworks.map((framework, i) => {
          framework_array.push(framework.name);
          const image_text = framework.images_text && framework_array.filter((names) => framework.name === names).length > 1;
          return (
            <MatchCard
              key={i}
              frameworks={frameworks.length}
              framework={framework.name}
              close={framework.close}
              complete={framework.complete}
              select={select}
              imagesText={image_text}
              click={() => handleClick(framework.name, i, framework.images_text, image_text)}
            />
          );
        })}
      </div>
    </div>
  );
}
