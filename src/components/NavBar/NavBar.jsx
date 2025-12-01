import React, { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./NavBar.module.css";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={Styles.nav}>
      <div className={Styles.logo}>🎬 MovieBox</div>
      <div className={Styles.box}>
        <div className={Styles.bar}>
              <ul className={`${Styles.navLinks} ${open ? Styles.active : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/popular">Popular</Link>
          </li>
          <li>
            <Link to="/top-rated">Top Rated</Link>
          </li>
          <li>
            <Link to="/upcoming">Upcoming</Link>
          </li>
        </ul>
        </div>
        {/* <div className={Styles.icons}>
          <img src="/search.svg" alt="Search" className={Styles.searchIcon} />
          <div className={Styles.menuIcon} onClick={() => setOpen(!open)}>
            ☰
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default NavBar;
