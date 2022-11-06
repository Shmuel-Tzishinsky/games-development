import UlMatch from "../../components/match/UlMatch";
// Images
import firemanBg from "../../assets/images/img_nav/fireman.png";
import firstLetters from "../../assets/images/img_nav/first-letters.png";
import fullLetters from "../../assets/images/img_nav/full-letters.png";

function SelectMatch() {
  const cards = [
    { path: "/games-development/menuMatch/fireman", src: firemanBg, title: "סמי הכבאי", descr: "משחק חשיבה מהנה שמקנה לילד יכולת כתיבה ללא שגיאות כתיב" },
    { path: "/games-development/menuMatch/first-letters", src: firstLetters, title: "אות ראשונה", descr: "משחק חשיבה מהנה שמקנה לילד יכולת כתיבה ללא שגיאות כתיב" },
    { path: "/games-development/menuMatch/full-letters", src: fullLetters, title: "מילים שלמות", descr: "משחק חשיבה מהנה שמקנה לילד יכולת כתיבה ללא שגיאות כתיב" },
  ]

  return <UlMatch cards={cards} />;
}

export default SelectMatch;
