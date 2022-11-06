import { useEffect, useState } from "react";

import useSound from "use-sound";
import timer_saund from "../saund/timer.mp3"

export function NumTimer({ longTimer,setTimeOut,questionAnswers, stopTimer }) {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return setTimeOut(0);
    const interval = setInterval(() => {
      setTimer(timer => timer - 1);
      setTimeOut(timer -1)
    }, 1000);
    
    if (!stopTimer) {
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timer, setTimeOut, stopTimer]);
  
  useEffect(() => {
    setTimer(longTimer);
  }, [longTimer, questionAnswers, stopTimer]);
  return timer;
}



export default function Timer ({
        longTimer,
        questionAnswers,
        aplletSaund,
        setSelectAnswer,
        selectAnswer
      }) {

     // מספר השניות שנשארו עד התשובה
     const [timeOut, setTimeOutTimer] = useState(longTimer);
     const [stopTimer, setStopTimer] = useState(true);
          // צליל ה-5 שניות האחרונות של הטיימר
    const [TimerSaund] = useSound(timer_saund);

     useEffect(() => {
      //  עצירת הטיימר
       setStopTimer(!selectAnswer)
       // איפוס הטיימר
       if(!selectAnswer){
      setTimeOutTimer(longTimer);
    
    }
     }, [ longTimer, selectAnswer])

     useEffect(() => {
       if (timeOut === 0 ) {
         setSelectAnswer(false)
       }
      if (timeOut <= 5) {
        aplletSaund && TimerSaund()
      }
     }, [timeOut, setSelectAnswer, aplletSaund, TimerSaund])
     
  return(
    <div className="timer">
      <div className="chart" style={{
        background: `conic-gradient(${timeOut <=5 ? "#ff9800" : "#2196f3" },${100 / longTimer * timeOut}%, #02123C 0)`
      }}>
        </div>
            <div className="timer__con">
            <div className="timer__svg">
                <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                  <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                </svg>
            </div>
            <div className="timer__num">
              <NumTimer 
                longTimer={!selectAnswer ? longTimer :timeOut  }
                setTimeOut={setTimeOutTimer}
                questionAnswers={questionAnswers}
                stopTimer={stopTimer}
              />
            </div>
        </div>
      </div>
  )
}