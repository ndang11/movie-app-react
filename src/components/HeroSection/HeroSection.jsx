import React from "react";
import Styles from "./HeroSection.module.css";

export default function HeroSection({ videoSrc, poster, title, overview }) {
  return (
    <div className={Styles.hero}>
      <img src={poster} alt={title} className={Styles.poster} />
      <div className={Styles.watch}>
        <div className={Styles.overlay} />

        <div className={Styles.content}>
          <h1>{title}</h1>
          <p>{overview}</p>

          <button className={Styles.btn}>Watch Now</button>
        </div>
      </div>
    </div>
  );
}
