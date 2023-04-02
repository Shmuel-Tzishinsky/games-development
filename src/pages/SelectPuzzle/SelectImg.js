import { useEffect, useState } from "react";
import spinner from "../../assets/images/spinner.gif";

import IMAGES_ARRAY from "../../data/IMAGES_ARRAY_PUZZLE_SMALL.json";

import styles from "./selectImg.module.css";

function SelectImg() {
  const [imgsLoaded, setImgsLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = require(`../../assets/images/puzzle/small/${image.url}`);
        loadImg.onload = (src) => resolve(loadImg);
        loadImg.onerror = (err) => reject(err);
      });
    };

    const loadAllImages = async () => {
      let img = [];

      for (let i = 0; i < IMAGES_ARRAY.length; i++) {
        img.push(await loadImage(IMAGES_ARRAY[i]));
      }
      setImgsLoaded(img);
    };
    loadAllImages();
  }, [setImgsLoaded]);

  return imgsLoaded ? (
    <div className={styles.select__img}>
      <h1 className={styles.h1}>אנא בחר רקע</h1>
      <div className={styles.cards}>
        {imgsLoaded.map((image, key) => (
          <a
            className={styles?.card}
            key={key}
            href={`/games-development/puzzle/${IMAGES_ARRAY[key]?.name}/4-2-50`}
          >
            <img className={styles?.card__img} src={image?.src} alt={IMAGES_ARRAY[key]?.name} />
          </a>
        ))}
      </div>
    </div>
  ) : (
    <div className="loading">
      <div className="load-svg">
        <img src={spinner} alt="spinner" />
        <p>...טוען</p>
      </div>
    </div>
  );
}

export default SelectImg;
