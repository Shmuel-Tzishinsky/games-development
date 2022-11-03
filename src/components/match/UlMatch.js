import CardMatch from "../../components/match/CardMatch";

import styles from "./ul.module.css";

function UlMatch({ cards }) {
  return (
    <ul className={styles.cards}>
      {cards.map((card, key) => (
        <li key={key}>
          <CardMatch {...{ path: card.path, src: card.src, title: card.title, descr: card.descr }} />
        </li>
      ))}
    </ul>
  );
}

export default UlMatch;
