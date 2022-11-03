import { useEffect, useState } from "react";

function Seconds() {
  const [format, setFormat] = useState("");

  useEffect(() => {
    let seconds = -1;
    function formatTime() {
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds - hours * 3600) / 60);
      let second = seconds - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (second < 10) {
        second = "0" + second;
      }
      // const audio =new Audio('/sound/timer.ogg');
      // audio.play()
      setFormat((hours !== "00" ? hours + ":" : "") + minutes + ":" + second);
    }
    const interval = setInterval(() => {
      seconds = seconds + 1;
      formatTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [format]);
  return <div className="scoreboardItem clock">{format}</div>;
}

export default Seconds;
