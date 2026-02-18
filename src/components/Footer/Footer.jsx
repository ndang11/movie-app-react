import React from "react";
import { Link } from "react-router-dom";
import Styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>

        <div className={Styles.logo}>
        <img width="64" height="64" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-movie-gamification-flaticons-lineal-color-flat-icons-2.png" alt="external-movie-gamification-flaticons-lineal-color-flat-icons-2"/>
        Royalty
          <p>Get the latest movies, trailers and updates for free.</p>
        </div>

        <div className={Styles.links}>
          <h3>Explore</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/popular">Popular</Link></li>
            <li><Link to="/top-rated">Top Rated</Link></li>
            <li><Link to="/upcoming">Upcoming</Link></li>
          </ul>
        </div>

        <div className={Styles.social}>
          <h3>Follow Us</h3>
          <div className={Styles.icons}>
            <a href="#"><img width="48" height="48" src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook-new"/></a>
            <a href="#"><img width="48" height="48" src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="instagram-new--v1"/></a>
            <a href="#"><img width="48" height="48" src="https://img.icons8.com/color/48/twitter--v1.png" alt="twitter--v1"/></a>
          </div>
        </div>
      </div>

      <div className={Styles.bottom}>
        <p>© {new Date().getFullYear()} Royalty. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
