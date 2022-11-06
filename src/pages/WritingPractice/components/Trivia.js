import React, { useEffect, useState } from "react";
import Timer from "../../WritingPractice/components/Timer"


// saund
import useSound from "use-sound";
import correct_saund from "../saund/correct.mp3"
import wrong_saund from "../saund/wrong.mp3"



export default function Trivia({question, setNextLevel ,aplletSaund, setAplletSaund, setShowLevels}) {
    // השאלות אחרי עירבוב השאלות
    const [dataSortes, setdDtaSortes] = useState([])
     // כל התשובות של המשתמש
    const [questionAnswers, setQuestionAnswers] = useState([]); 
     // בתשובה של המשתמש
    const [selectAnswer, setSelectAnswer] = useState(null); 
     // ביטול הנסיון לאפס או לצאת מהשלב
    const [finishGame, setFinishGame] = useState(false); 
     // מציג למשתמש אם התשובה שהוא בחר נעונה ./ לא נכונה
    const [ansClassName, setClassName] = useState("answer"); 
     // במקרה שהמשתמש תעה מציג את התשובה הנכונה
    const [showCorectAnswer, setShowCorectAnswer] = useState("answer");
     //  מספר התשובות הנכונות
    const [succeeded, setSucceeded] = useState(0)
     // מספר הטעויות
    const [mistakes, setMistakes] = useState(0)
    // צליל תשובה הנכונה
    const [CorrectSaund] = useSound(correct_saund); 
     // צליל התובה השגויה
    const [WrongSaund] = useSound(wrong_saund); 
  // true - הוספת התשובה למערך רק אם
    const [isTrue, setIsTrue] = useState(false)
    // פונקצייה חיצונית לעיכוב זמן חשיפת התשובה
    const delay = (duration, callback) => {
        setTimeout(() => {
          callback();
        }, duration);
    };

    // מערבב את סדר השאלות
    useEffect(() => setdDtaSortes(shuffleArray(question?.questions)),[question])

    // מערבב את סדר התשובות מיד אחרי שסדר השאלות התערבבו
    useEffect(() => {
      let data = dataSortes;
      for (let i = 0; i < data.length; i++) {
        const sorst =shuffleArray(data[i].answers)
        data[i].answers = sorst
      }
    }, [dataSortes])


    // כשנוספה תשובה נכונה / לא נכונה
    useEffect(() => {
            // עובר לשאלה הבאה  או לשלב הבא (אחרי 1500 שניות)
            if (selectAnswer !== null && isTrue) {
              setIsTrue(false)

              // בודק אם זה התשובה האחרונה בשלב זה
              delay(1500 , () => {
                 // אם נגמרו השאלות בשלב הזה
                if (question.questions.length -2 >= questionAnswers.length ) {
                  if (succeeded >= question.succeeded || mistakes >= question.mistakes) {
                    // עובר לשלב הבאה
                    setNextLevel(succeeded, mistakes);
                  }else {
                    // הסתר תשובה נכונה מהמשתמש
                    setShowCorectAnswer("answer");
                    // הסר את התשובה מה-סטייט
                    setSelectAnswer(null); 
                    // הוסף את הבחירה של המשתמש למערך

                    setQuestionAnswers(questionAnswers => [...questionAnswers, selectAnswer])
                  }
                }else {
                  // עובר לשלב הבאה
                  setNextLevel(succeeded, mistakes);
                }
              })
            }
    }, [ succeeded, mistakes, question.mistakes,isTrue, question.questions.length, question.succeeded, questionAnswers.length, selectAnswer, setNextLevel])



    // מופעל בעיקר כשהמתמש עונה תשובה
    useEffect(() => {
        if (selectAnswer !== null) {
          setIsTrue(true)
            // אם התשובה לא נכונה
            if (!selectAnswer.correct) {
                // הפעל צלילים אם הצלילים לא על השתק
                aplletSaund && WrongSaund()
                // חשיפת התשובה הנכונה (דרך קלאס)
                setShowCorectAnswer("answer corect");
                // הוסף טעות לחשבון
                setMistakes(mistakes => mistakes + 1)
            }else{
                // הפעל צלילים אם הצלילים לא על השתק
                aplletSaund && CorrectSaund()
                // הוסף תשובה נכונה לחשבון
                setSucceeded(succeeded => succeeded + 1)
            }
       }
    }, [selectAnswer, aplletSaund, CorrectSaund, WrongSaund])


    function handleAnswer(answer) {
       // הוסף את התשובה לסטייט
      setSelectAnswer(answer); 
      // אם התשובה נכונה הוסף קלאס בהתאם
      setClassName(answer.correct ? "answer corect" : "answer wrong");
    }

  return (
    <div className="trivia">
        <div className={finishGame ? "trivia__blur trivia_con": 'trivia_con'}>
            <div className={`trivia__saund ${!aplletSaund ? "stopSaund" : ''}`} onClick={() => aplletSaund ? setAplletSaund(false): setAplletSaund(true)}>
              <svg viewBox="0 0 24 24" >
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
              </svg>
              <div></div>
            </div>
              <Timer
                longTimer={question.timer}
                questionAnswers={questionAnswers}
                aplletSaund={aplletSaund}
                setSelectAnswer={setSelectAnswer}
                selectAnswer={selectAnswer}
               />
                <div className="question__level">שלב {question?.level ||0}</div>
            <div className="question">
                <div className="question_back" onClick={() => setFinishGame(true)}><svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg> סיים משחק </div>
                <div className="question_num">{succeeded}/{question.succeeded} נכונות</div> 
                <div className="question_num">{mistakes}/{question.mistakes} טעויות</div> 
                <h2>{dataSortes[questionAnswers.length]?.question}</h2>
            </div>
            <div className="answers">
             
                {dataSortes[questionAnswers.length]?.answers.map((answer, i) => (
                  <div
                    key={i}
                      className={
                        
                        selectAnswer === answer
                        ? ansClassName
                        : answer.correct && showCorectAnswer !== "answer"
                        ? showCorectAnswer
                        : "answer"
              
                    }
                    // צריך לחסום אפשרות לענות במקרה שהמשתמש ענה כבר תשובה
                    onClick={() => !selectAnswer && handleAnswer(answer)}
                  >
                    {answer.text}
                </div>
                ))}
            </div>
        </div>

      <div className={finishGame ? "trivia__back trivia__back__show": "trivia__back"}>
        <div className="trivia__back__con">
          <div className="trivia__back__btn" onClick={ () => setShowLevels(true)}>
              <div>סיים משחק</div>
                <svg  viewBox="0 0 24 24">
                  <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                </svg>
          </div>
          <div  className="trivia__back__btn" onClick={() => {
            setMistakes(0)
            setSucceeded(0)
            setQuestionAnswers([])
             setFinishGame(false)}}>
             <div> התחל מחדש</div>
                <svg focusable="false"   viewBox="0 0 24 24">
                  <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path>
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
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
