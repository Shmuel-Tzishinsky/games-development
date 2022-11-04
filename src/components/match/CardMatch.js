import { Link } from "react-router-dom";
import styles from "./cardMatch.module.css";

function CardMatch({ src, path, title, descr }) {
  return (
    <Link className={styles.card} to={path}>
      <div className={styles.card__cont}>
        <img className={styles.card__image} src={src} alt="fireman" />
        <div className={styles.card__context}>
          <h2 className={styles.card__title}>{title}</h2>
          <p className={styles.card__description}>{descr}</p>
        </div>
      </div>
    </Link>
  );
}

export default CardMatch;
