export function Level(props) {
  const img = props.match?.params?.img || props.img;
  return (
    <nav className="skew-menu">
      <ul>
        <li>
          <a href={"/games-development/puzzle/" + img + "/4-2-50"}>מתחילים</a>
        </li>
        <li>
          <a href={"/games-development/puzzle/" + img + "/9-3-33.333333333333336"}>קל</a>
        </li>
        <li>
          <a href={"/games-development/puzzle/" + img + "/16-4-25"}>בינוני</a>
        </li>
        <li>
          <a href={"/games-development/puzzle/" + img + "/25-5-20"}>מתקדמים</a>
        </li>
        <li>
          <a href={"/games-development/puzzle/" + img + "/36-6-16.666666666666668"}>קשה</a>
        </li>
        <li>
          <a href={"/games-development/puzzle/" + img + "/49-7-14.285714285714286"}>קשה מאוד</a>
        </li>
        <li>
          <a href={"/games-development/puzzle/" + img + "/64-8-12.5"}>מאתגר</a>
        </li>
      </ul>
    </nav>
  );
}
