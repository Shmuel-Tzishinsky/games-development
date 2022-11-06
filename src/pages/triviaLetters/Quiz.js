import { useEffect, useState } from "react";

import quizData from "./quiz-data.json";

import Strat from "./components/Start";
import Levels from "./components/Levels";
import Trivia from "./components/Trivia";
import { StartMessage, FinishSucceeded, FinishFails, SucceededEverything } from "./components/Message";

// coocis = saund(t/f), user name(string), level open(number),

// sound
import useSound from "use-sound";
import crowd_winner_saund from "./saund/crowd_winner.mp3";

export default function Quiz(props) {
  const [userName, setUserName] = useState();
  const [showLevels, setShowLevels] = useState(true);
  const [selectLevel, setSelectLevel] = useState(1);
  const [question, setQuestion] = useState(null);
  const [startMessage, setStartMessage] = useState(false);
  const [finishSucceeded, setFinishSucceeded] = useState(false);
  const [finishFails, setFinishFails] = useState(false);
  const [succeededEverything, setSucceededEverything] = useState(false);
  // sauns
  const [aplletSaund, setAplletSaund] = useState(true);
  const [CorrectWinnerSaund] = useSound(crowd_winner_saund);

  useEffect(() => {
    if (userName) {
      if (JSON.parse(window.localStorage.getItem(userName))) {
        setSelectLevel(JSON.parse(window.localStorage.getItem(userName)));
      }
    }
  }, [userName, setSelectLevel]);

  useEffect(() => {
    if (userName) {
      window.localStorage.setItem(userName, JSON.stringify(selectLevel));
    }
  }, [userName, selectLevel]);

  useEffect(() => {
    setQuestion(quizData.filter((e) => e.level === selectLevel)[0]);
  }, [selectLevel, question, startMessage, showLevels]);

  useEffect(() => {
    // רקע מיוחד ב-body בכיסה לדף הטריוויה
    const body = document.querySelector("body");
    body?.classList.add("background-WritingPractice");
    return () => {
      body.classList = "";
    };
  }, []);

  function showTrivia(level) {
    // פותח את דף ההודעה לפני הצגת שאלות הטריוויה
    setSelectLevel(level);
    setStartMessage(true);
    setShowLevels(false);
  }

  // הפונקצייה עוברת לשלב הבא אם לא נעשו טעוית
  function setNextLevel_func() {
    aplletSaund && CorrectWinnerSaund();
    //  כאשר נגמרו השלבים פותח את דף בחירת השלבים
    // שלב הבא כאשר נגמרו השלבים (פותח את דף בחירת השלבים)
    selectLevel >= quizData.length ? setSucceededEverything(true) : setFinishSucceeded(true);
    setSelectLevel((selectLevel) => selectLevel + 1);
    setShowLevels(true);
  }

  return (
    <div className="practice">
      {!userName ? (
        <Strat setUserName={setUserName} setSelectLevel={setSelectLevel} props={props} />
      ) : showLevels && !finishFails && !finishSucceeded && !succeededEverything ? (
        <Levels selectLevel={selectLevel} Levels={quizData.map((e) => e.level)} showTrivia={showTrivia} setUserName={setUserName} />
      ) : startMessage ? (
        <StartMessage data={question} setShowLevels={setShowLevels} setStartMessage={setStartMessage} level={selectLevel} />
      ) : finishFails ? (
        <FinishFails setFinishFails={setFinishFails} level={selectLevel} />
      ) : finishSucceeded ? (
        <FinishSucceeded setFinishSucceeded={setFinishSucceeded} level={selectLevel} />
      ) : succeededEverything ? (
        <SucceededEverything setSucceededEverything={setSucceededEverything} level={selectLevel} />
      ) : (
        <Trivia
          setShowLevels={setShowLevels}
          question={question}
          aplletSaund={aplletSaund}
          setAplletSaund={setAplletSaund}
          setNextLevel={setNextLevel_func}
        />
      )}
    </div>
  );
}
