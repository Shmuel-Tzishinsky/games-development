import React, { useEffect, useState } from "react";
import Timer from "./Timer";

import "./Letter.css";

// saund
import useSound from "use-sound";
import correct_saund from "../saund/correct.mp3";
import wrong_saund from "../saund/wrong.mp3";

export default function Trivia({ question, setNextLevel, aplletSaund, setAplletSaund, setShowLevels }) {
  // שלב של המשתמש ברמה שנבחרה
  const [questionAnswers, setQuestionAnswers] = useState(0);
  // השם של התמונה
  const [nameImg, setNameImg] = useState([]);
  // מציג את התמונה רק לאחר שהתמונה נטענה
  const [imgLoaded, setimgLoaded] = useState(null);
  // המערך המפוזר של כל המילים
  const [allLetter, setAllLetter] = useState([]);
  // ביטול הנסיון לאפס או לצאת מהשלב
  const [finishGame, setFinishGame] = useState(false);
  // המילים שנבחרו
  const [selectLetter, setSelectLetters] = useState({
    select: null,
    ind: [],
  });

  // ההצגה הראשונה של כל המילים
  useEffect(() => {
    let hebrow = [
      "א",
      "בּ",
      "ב",
      "ג",
      "ד",
      "ה",
      "ו",
      "ז",
      "ח",
      "ט",
      "י",
      "כּ",
      "כ",
      "ךּ",
      "ך",
      "ל",
      "מ",
      "ם",
      "נ",
      "ן",
      "ס",
      "ע",
      "פּ",
      "פ",
      "ף",
      "צ",
      "ץ",
      "ק",
      "ר",
      "שׁ",
      "שׂ",
      "תּ",
      "ת",
    ];
    const arr = [...question.questions[questionAnswers]?.name];
    setNameImg([...question.questions[questionAnswers]?.name].map((e) => (e = " ")));
    setSelectLetters({
      select: null,
      ind: [],
    });
    for (let i = 0; arr.length < 14; i++) {
      const element = hebrow[Math.floor(Math.random() * 33)];
      arr.push(element);
    }
    setAllLetter(shuffleArray(arr));
  }, [questionAnswers]);

  // מוסיף אותיות שנבחרו
  useEffect(() => {
    const arr = nameImg;
    if (selectLetter.select !== null) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === " ") {
          arr[i] = selectLetter.select;
          setNameImg([...arr]);
          break;
        }
      }
    }
  }, [selectLetter]);

  // בודק אם המשתמש מילא את השובה נכון
  useEffect(() => {
    if (selectLetter.ind.length === nameImg.length && !selectLetter.ind.includes(" ") && nameImg.length !== 0) {
      let ifAllGoot = false;

      for (let i = 0; i < nameImg.length; i++) {
        if (nameImg[i] !== question.questions[questionAnswers]?.name[i]) {
          ifAllGoot = false;
          break;
        } else ifAllGoot = true;
      }
      // console.log(selectLetter.ind.length);
      if (ifAllGoot) {
        setTimeout(() => {
          if (question.questions.length - 2 >= questionAnswers) {
            // הוסף את הבחירה של המשתמש למערך
            setQuestionAnswers((questionAnswers) => questionAnswers + 1);
          } else {
            // עובר לשלב הבאה
            setNextLevel();
          }
        }, 300);
      }
    }
  }, [selectLetter]);

  function removeLetter(ind) {
    nameImg[ind] = " ";
    setNameImg([...nameImg]);

    selectLetter.ind[ind] = " ";
    const obj = {
      select: null,
      ind: [...selectLetter.ind],
    };
    setSelectLetters(obj);
  }

  function hendelSelect(lett, ind) {
    let index = selectLetter.ind;
    if (index.length >= nameImg.length) {
      for (let i = 0; i < index.length; i++) {
        if (index[i] === " ") {
          index[i] = ind;
          break;
        }
      }
    } else {
      index = [...selectLetter.ind, ind];
    }

    setSelectLetters({
      select: lett,
      ind: index,
    });
  }

  // טוען את התמונה
  useEffect(() => {
    if (typeof window !== "undefined") {
      const actualPicture = new Image();
      actualPicture.addEventListener("load", () => {
        setimgLoaded(`${window.location.origin}/games-development/quiz-trivia-letters/${question.questions[questionAnswers]?.img}.jpg`);
      });

      actualPicture.src = `${window.location.origin}/games-development/quiz-trivia-letters/${question.questions[questionAnswers]?.img}.jpg`;
    }
  }, [imgLoaded, questionAnswers]);

  return (
    <div className="trivia">
      <div className={finishGame ? "trivia__blur trivia_con" : "trivia_con"}>
        <div
          className={`trivia__saund ${!aplletSaund ? "stopSaund" : ""}`}
          onClick={() => (aplletSaund ? setAplletSaund(false) : setAplletSaund(true))}
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
          </svg>
          <div></div>
        </div>
        <div className="question__level">שלב {question?.level || 0}</div>
        <div className="question_back letter_back" onClick={() => setFinishGame(true)}>
          <svg viewBox="0 0 24 24">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
          </svg>{" "}
          סיים משחק{" "}
        </div>
        <div className="nan">
          <img src={imgLoaded} alt="?" />
        </div>
        <div className="name-img">
          {nameImg.map((lett, i) => (
            <div onClick={() => removeLetter(i)} key={i}>
              {lett}
            </div>
          ))}
        </div>
        <div className="answers-letters">
          {allLetter.map((lett, i) => (
            <div
              key={i}
              className={`letter ${selectLetter?.ind?.includes(i) ? "visibility" : " "}`}
              onClick={() => nameImg.includes(" ") && hendelSelect(lett, i)}
            >
              {lett || " "}
            </div>
          ))}
        </div>
      </div>

      <div className={finishGame ? "trivia__back trivia__back__show" : "trivia__back"}>
        <div className="trivia__back__con">
          <div className="trivia__back__btn" onClick={() => setShowLevels(true)}>
            <div>סיים משחק</div>
            <svg viewBox="0 0 24 24">
              <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
            </svg>
          </div>
          <div className="trivia__back__btn" onClick={() => setFinishGame(false)}>
            <div className="">ביטול</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};
