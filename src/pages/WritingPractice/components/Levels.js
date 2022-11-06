import React, { useEffect, useState } from "react";
import Header from "./Header";

import "./levels.css";

export default function Level({ selectLevel, Levels, showTrivia, setUserName }) {
  const score = [1, 1, 1];
  const [dataArray, setDataArray] = useState([]);
  useEffect(() => {
    let a = [],
      a2 = [];
    // מתחיל את הלולאה מהסוף להתחלה (הג'ייסון הפוך כדי שההתחלה תהיה למטה ולא למעלה)
    for (let i = 0; i < Levels.length; i++) {
      // אם נמצא בכפילות של 3 במיקום 0
      if (Levels[i] % 3 === 1) {
        a.push([Levels[i]]);
      } else {
        if (Levels[i] % 3 === 0) {
          a2.push(Levels[i]);
        } else {
          a2.push(Levels[i]);
          let ee = [];
          for (let ind = a2.length; ind > 0; ind--) ee.push(a2[ind - 1]);
          a.push(ee);
          a2 = [];
        }
      }
    }
    setDataArray(a);
  }, [Levels]);

  useEffect(() => {
    ScrollHandler();
  }, [dataArray]);

  const ScrollHandler = () => {
    document.querySelector("#current")?.scrollIntoView();
  };

  return (
    <>
      <Header title={"מסלול אתגרי"} typeFunck={null} backFunction={setUserName} />
      <div className="level-overflow">
        <div className="level-container">
          <div className="level-data">
            <div className="level-data-cont">
              {dataArray.map((e, i) => (
                // {/* level-line-one - אם זה שורה שמציגה  רק שלב אחד אז הקלאס יהיה  */}
                // {/* level-line-two - אם זה שורה שמציגה שני שלבים  אז הקלאס יהיה  */}
                <div key={i} className={`level-line level-line-${e[0] % 3 === 2 ? "two" : "one"}  `}>
                  {/*current - השלב הבא יסומן בקלאס  */}
                  {/*level-completed - השלב שבוצע בהצלחה יסומן בקלאס  */}
                  {/* level-completed  || after || before || current */}
                  {e.map((obj, ind) => (
                    <div
                      id={obj === selectLevel ? "current" : ""}
                      key={ind}
                      className={`level-line-afBfo level-${ind % 2 === 0 ? "before" : "after"}  ${
                        obj < selectLevel ? "level-completed " : obj === selectLevel ? "current" : ""
                      }`}
                    >
                      <div className="level " onClick={() => obj <= selectLevel && showTrivia(obj)}>
                        <div className="level-num">{obj <= selectLevel ? obj : LockedUp__icon()}</div>
                        {obj < selectLevel && (
                          <div className="level-starts">
                            {/*level-margin-top - אם יש שלושה כוכבים אז האמצעי יקבל את הקלאס  */}
                            {score.map((e, i) => (
                              <div key={i} className={`level-svg ${score.length === 3 ? (i === 1 ? "level-margin-top" : "") : "level-margin-top"} `}>
                                {start__icon()}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const LockedUp__icon = () => (
  <div className="level-locked">
    <svg viewBox="0 0 24 24">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
    </svg>
  </div>
);
const start__icon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
  </svg>
);
