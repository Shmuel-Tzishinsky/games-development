import UlMatch from "../../components/match/UlMatch";
// Images
import puzzleBg from "../../assets/images/img_nav/puzzle.png";
import firemanBg from "../../assets/images/img_nav/fireman.png";
import quizBg from "../../assets/images/img_nav/quiz.png";

function Home() {
  const cards = [
    { path: "/menuMatch", src: firemanBg, title: "משחק זכרון", descr: "משחק חשיבה מהנה שמקנה לילד יכולת כתיבה ללא שגיאות כתיב" },
    { path: "/puzzle", src: puzzleBg, title: "משחק פאזל", descr: "משחק חשיבה מהנה שמקנה לילד יכולת כתיבה ללא שגיאות כתיב" },
    { path: "/quiz", src: quizBg, title: "משחק טריוויה", descr: "משחק חשיבה מהנה שמקנה לילד יכולת כתיבה ללא שגיאות כתיב" },
  ];

  return <UlMatch cards={cards} />;
}

export default Home;
