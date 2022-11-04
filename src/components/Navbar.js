import { Link } from "react-router-dom";

function Navbar() {
  const img = "name";

  return (
    <nav style={{ width: "200px", float: "left" }}>
      <ul>
        <li>
          <Link to="/games-development/">Home</Link>
        </li>
        <li>
          <h1>Menu match</h1>
          <Link to="/games-development/MenuMatch">MenuMatch</Link>
          <h2>Match list</h2>
          <ul>
            <li>
              <Link to={"/games-development/MenuMatch/fireman"}>סמי הכבאי</Link>
            </li>
            <li>
              <Link to={"/games-development/MenuMatch/first-letters"}>אות ראשונה</Link>
            </li>
            <li>
              <Link to={"/games-development/MenuMatch/full-letters"}>אותיות שלמות</Link>
            </li>
          </ul>
        </li>
        <li>
          <h1>puzzle</h1>
          <Link to="/games-development/puzzle">puzzle</Link>
          <h2>level list</h2>
          <ul>
            <li>
              <Link to={"/games-development/puzzle/uniqrn"}>חד קרן</Link>
            </li>
            <li>
              <Link to={"/games-development/puzzle/hors"}>סוס</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to={"/games-development/puzzle/" + img + "/4-2-50"}>מתחילים</Link>
            </li>
            <li>
              <Link to={"/games-development/puzzle/" + img + "/9-3-33.333333333333336"}>קל</Link>
            </li>
            <li>
              <Link to={"/games-development/puzzle/" + img + "/16-4-25"}>בינוני</Link>
            </li>
            <li>
              <Link to={"/games-development/puzzle/" + img + "/25-5-20"}>מתקדמים</Link>
            </li>
            <li>
              <Link to={"/games-development/puzzle/" + img + "/36-6-16.666666666666668"}>קשה</Link>
            </li>
            <li>
              <Link to={"/games-development/puzzle/" + img + "/49-7-14.285714285714286"}>קשה מאוד</Link>
            </li>
            <li>
              <Link to={"/games-development/puzzle/" + img + "/64-8-12.5"}>מאתגר</Link>
            </li>
          </ul>
        </li>
        <li>
          <h1>Quiz</h1>
          <Link to="/games-development/quiz">quiz</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
