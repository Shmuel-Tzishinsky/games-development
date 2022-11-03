import "../../assets/images/matches/first-letters/img/ט.png";
export default function MatchCard(props) {
  return (
    <div
      className={"card " + `w${props.frameworks}` + (!props.close ? " opened" : "") + (props.complete ? " matched" : "")}
      onClick={() => {
        if (props.close) {
          props.click();
        }
      }}
    >
      <div className="front">?</div>
      <div className="back">
        {!props.imagesText ? (
          <img src={require(`../../assets/images/matches/${props.select}/img/${props.framework}.png`)} alt={props.framework} />
        ) : (
          <img src={require(`../../assets/images/matches/${props.select}/text/${props.framework}.png`)} alt={props.framework} />
        )}
      </div>
    </div>
  );
}
