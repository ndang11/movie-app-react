import React, { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./NavBar.module.css";
import SearchBar from "../search/SearchBar";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={Styles.nav}>
      <div className={Styles.logo}>
        <img width="64" height="64" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-movie-gamification-flaticons-lineal-color-flat-icons-2.png" alt="external-movie-gamification-flaticons-lineal-color-flat-icons-2"/>
        Royalty
      </div>

      <div
        className={`${Styles.hamburger} ${open ? Styles.active : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={Styles.box}>
        <ul className={`${Styles.navLinks} ${open ? Styles.active : ""}`}>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/popular" onClick={() => setOpen(false)}>Popular</Link>
          </li>
          <li>
            <Link to="/top-rated" onClick={() => setOpen(false)}>Top Rated</Link>
          </li>
          <li>
            <Link to="/upcoming" onClick={() => setOpen(false)}>Upcoming</Link>
          </li>
        </ul>
          <div className={Styles.bar}>
             <SearchBar />
          </div>
      </div>
    </nav>
  );
};

export default NavBar;
