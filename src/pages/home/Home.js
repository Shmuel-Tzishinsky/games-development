import UlMatch from "../../components/match/UlMatch";
// Images
import puzzleBg from "../../assets/images/img_nav/puzzle.png";
import firemanBg from "../../assets/images/img_nav/fireman.png";
import quizBg from "../../assets/images/img_nav/quiz.png";
import guessPicture from "../../assets/images/img_nav/guess-the-picture.png";

function Home() {
  const cards = [
    { path: "/games-development/menuMatch", src: firemanBg, title: "משחק זכרון", descr: "משחק חשיבה מהנה שמקנה לילד יכולת כתיבה ללא שגיאות כתיב" },
    { path: "/games-development/puzzle", src: puzzleBg, title: "משחק פאזל", descr: "משחק חשיבה מהנה שמקנה לילד יכולת כתיבה ללא שגיאות כתיב" },
    { path: "/games-development/quiz", src: quizBg, title: "משחק טריוויה", descr: "משחק חשיבה מהנה שמקנה לילד יכולת כתיבה ללא שגיאות כתיב" },
    {
      path: "/games-development/guess-the-picture",
      src: guessPicture,
      title: "נחשו את התמונה",
      descr: "משחק חשיבה מהנה שמקנה לילד יכולת כתיבה ללא שגיאות כתיב",
    },
  ];

  return <UlMatch cards={cards} />;
}

export default Home;
